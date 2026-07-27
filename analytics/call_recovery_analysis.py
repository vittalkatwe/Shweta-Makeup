#!/usr/bin/env python3
"""Join the admin call log with website drop-offs and WhatsApp conversions.

Window: drop-offs Jun 12 - Jul 12 2026 (IST). Calls considered up to Jul 12 EOD.
Conversions counted up to Jul 12 (primary) with a Jul 13-26 supplementary line.
"""
import csv
import json
import statistics
import sys
import urllib.request
from collections import defaultdict
from datetime import datetime, timedelta

API = "https://shwetamakeover.online/api/admin/payments"
CALL_LOG = "/Users/tusharpal/Downloads/call_log_1785059139118.csv"  # machine-specific export; replace with your own call-log CSV path
OUT_CSV = "analytics/call_recovery_joined.csv"  # run from repo root

WINDOW_START = datetime(2026, 6, 12, 0, 0, 0)          # IST
CUTOFF = datetime(2026, 7, 12, 23, 59, 59)             # IST, primary cut
OBS_END = datetime(2026, 7, 26, 23, 59, 59)            # IST, supplementary

IST = timedelta(hours=5, minutes=30)


def norm_phone(p):
    if not p:
        return None
    digits = "".join(c for c in str(p) if c.isdigit())
    return digits[-10:] if len(digits) >= 10 else None


def parse_api_ts(ts):
    """UTC ISO string -> IST naive datetime."""
    return datetime.fromisoformat(ts.replace("Z", "+00:00")).replace(tzinfo=None) + IST


def fetch_payments(date_from, date_to):
    out, page = [], 1
    while True:
        url = f"{API}?dateFrom={date_from}&dateTo={date_to}&limit=100&page={page}"
        with urllib.request.urlopen(url, timeout=60) as r:
            data = json.load(r)
        out.extend(data["payments"])
        if page >= data.get("totalPages", 1):
            break
        page += 1
    return out


def parse_duration(d):
    """'1h 2m 3s' / '1m 54s' / '0s' -> seconds."""
    secs = 0
    for part in d.split():
        part = part.strip()
        if part.endswith("h"):
            secs += int(part[:-1]) * 3600
        elif part.endswith("m"):
            secs += int(part[:-1]) * 60
        elif part.endswith("s"):
            secs += int(part[:-1])
    return secs


def load_calls():
    """Rows with unquoted commas in Name shift columns; take the last 4 fields."""
    calls = []
    with open(CALL_LOG) as f:
        reader = csv.reader(f)
        header = next(reader)
        for row in reader:
            if len(row) < 5:
                continue
            number, date, duration, calltype = row[-4], row[-3], row[-2], row[-1]
            phone = norm_phone(number)
            if not phone:
                continue
            try:
                ts = datetime.strptime(date.strip(), "%Y-%m-%d %H:%M:%S")
            except ValueError:
                continue
            calls.append({
                "phone": phone,
                "ts": ts,
                "secs": parse_duration(duration.strip()),
                "type": calltype.strip(),
            })
    return calls


def hours(td):
    return td.total_seconds() / 3600


def dist(vals):
    if not vals:
        return "n/a"
    s = sorted(vals)
    p90 = s[min(len(s) - 1, int(0.9 * len(s)))]
    return (f"median {statistics.median(s):.1f}h, avg {statistics.mean(s):.1f}h, "
            f"p90 {p90:.1f}h (n={len(s)})")


def main():
    print("Fetching payments Jun 12 - Jul 26 ...", file=sys.stderr)
    payments = fetch_payments("2026-06-12", "2026-07-26")
    print(f"  {len(payments)} records", file=sys.stderr)

    by_phone = defaultdict(list)
    for p in payments:
        ph = norm_phone(p.get("phone"))
        if not ph:
            continue
        p["_ts"] = parse_api_ts(p["timestamp"])
        p["_phone"] = ph
        by_phone[ph].append(p)

    # --- drop-off cohort: website records in window, none paid by cutoff ---
    cohort = {}
    for ph, recs in by_phone.items():
        web = [r for r in recs if r.get("source") == "website" and r["_ts"] <= CUTOFF]
        web_in_window = [r for r in web if r["_ts"] >= WINDOW_START]
        if not web_in_window:
            continue
        if any(r["status"] == "paid" for r in web):
            continue
        dropoff = min(r["_ts"] for r in web_in_window)
        dtype = "failed" if any(r["status"] == "failed" for r in web_in_window) else "created-only"
        cohort[ph] = {"dropoff": dropoff, "type": dtype, "attempts_web": len(web_in_window)}

    # --- conversions ---
    for ph, c in cohort.items():
        wa_paid = sorted(
            (r["_ts"] for r in by_phone[ph]
             if r.get("source") == "whatsapp" and r["status"] == "paid"
             and r["_ts"] >= c["dropoff"]),
        )
        c["conv_ts"] = None
        c["conv_late"] = False
        primary = [t for t in wa_paid if t <= CUTOFF]
        if primary:
            c["conv_ts"] = primary[0]
        elif wa_paid:  # converted only after Jul 12
            c["conv_ts"] = wa_paid[0]
            c["conv_late"] = True

    # --- calls ---
    calls = load_calls()
    calls_by_phone = defaultdict(list)
    for cl in calls:
        calls_by_phone[cl["phone"]].append(cl)

    for ph, c in cohort.items():
        after = [cl for cl in calls_by_phone.get(ph, [])
                 if c["dropoff"] <= cl["ts"] <= CUTOFF]
        out = [cl for cl in after if cl["type"] == "Outgoing"]
        inc = [cl for cl in after if cl["type"] in ("Incoming", "Missed", "Rejected", "Blocked")]
        pre = [cl for cl in calls_by_phone.get(ph, [])
               if cl["ts"] < c["dropoff"] and cl["ts"] <= CUTOFF]
        c["out_calls"] = sorted(out, key=lambda x: x["ts"])
        c["inc_calls"] = inc
        c["pre_calls"] = len(pre)
        c["called"] = len(out) > 0
        c["connected"] = any(cl["secs"] > 0 for cl in out)
        c["first_call"] = c["out_calls"][0]["ts"] if out else None

    # ================= REPORT =================
    n = len(cohort)
    called = [c for c in cohort.values() if c["called"]]
    not_called = [c for c in cohort.values() if not c["called"]]

    def conv(group, include_late=False):
        return [c for c in group if c["conv_ts"] and (include_late or not c["conv_late"])]

    print(f"\n=== DROP-OFF COHORT (Jun 12 - Jul 12, IST) ===")
    print(f"Total drop-offs (gave phone, never paid on website): {n}")
    for t in ("failed", "created-only"):
        print(f"  {t}: {sum(1 for c in cohort.values() if c['type'] == t)}")

    print(f"\n=== CALLED vs NOT CALLED ===")
    print(f"Called (>=1 outgoing call after drop-off): {len(called)} ({len(called)/n*100:.0f}%)")
    print(f"Never called: {len(not_called)} ({len(not_called)/n*100:.0f}%)")

    for label, grp in (("CALLED", called), ("NOT CALLED", not_called)):
        cv = conv(grp)
        cv_late = [c for c in grp if c["conv_late"]]
        print(f"\n=== {label} ({len(grp)}) ===")
        if grp:
            print(f"Converted via WhatsApp by Jul 12: {len(cv)} ({len(cv)/len(grp)*100:.0f}%)")
            print(f"Did not convert: {len(grp)-len(cv)-len(cv_late)}")
            if cv_late:
                print(f"(+{len(cv_late)} converted after Jul 12 - censored, not in primary count)")

    connected = [c for c in called if c["connected"]]
    never_ans = [c for c in called if not c["connected"]]
    print(f"\n=== CALL OUTCOME (among called) ===")
    print(f"Connected (>0s talk): {len(connected)}, of which converted: {len(conv(connected))} "
          f"({len(conv(connected))/len(connected)*100:.0f}%)" if connected else "Connected: 0")
    print(f"Never answered (all 0s): {len(never_ans)}, of which converted: {len(conv(never_ans))} "
          f"({len(conv(never_ans))/len(never_ans)*100:.0f}%)" if never_ans else "Never answered: 0")

    by_attempts = defaultdict(list)
    for c in called:
        k = min(len(c["out_calls"]), 3)
        by_attempts["3+" if k == 3 else str(k)].append(c)
    print(f"\nBy number of call attempts:")
    for k in ("1", "2", "3+"):
        g = by_attempts.get(k, [])
        if g:
            print(f"  {k} attempts: {len(g)} users, converted {len(conv(g))} ({len(conv(g))/len(g)*100:.0f}%)")

    print(f"\n=== TIMING (called users) ===")
    print(f"Drop-off -> first call: {dist([hours(c['first_call']-c['dropoff']) for c in called])}")
    cvd = conv(called)
    print(f"Drop-off -> conversion (called+converted): "
          f"{dist([hours(c['conv_ts']-c['dropoff']) for c in cvd])}")
    print(f"First call -> conversion: "
          f"{dist([hours(c['conv_ts']-c['first_call']) for c in cvd if c['conv_ts'] >= c['first_call']])}")
    before_call = [c for c in cvd if c["conv_ts"] < c["first_call"]]
    print(f"Converted BEFORE first call (call was after payment): {len(before_call)}")
    ncvd = conv(not_called)
    print(f"Drop-off -> conversion (not-called/organic): "
          f"{dist([hours(c['conv_ts']-c['dropoff']) for c in ncvd])}")

    print(f"\n=== CONVERSION RATE by SPEED OF FIRST CALL ===")
    buckets = [("<1h", 0, 1), ("1-4h", 1, 4), ("4-24h", 4, 24), ("1-3d", 24, 72), (">3d", 72, 1e9)]
    for label, lo, hi in buckets:
        g = [c for c in called if lo <= hours(c["first_call"] - c["dropoff"]) < hi]
        if g:
            cg = conv(g)
            print(f"  called {label:>5} after drop-off: {len(g):3} users, converted {len(cg):3} "
                  f"({len(cg)/len(g)*100:.0f}%)")

    # correlation: time-to-call vs time-to-convert among called+converted (conv after call)
    pairs = [(hours(c["first_call"] - c["dropoff"]), hours(c["conv_ts"] - c["dropoff"]))
             for c in cvd if c["conv_ts"] >= c["first_call"]]
    if len(pairs) >= 3:
        xs, ys = zip(*pairs)
        r = statistics.correlation(xs, ys)
        print(f"\nPearson r (hrs to first call vs hrs to conversion): {r:.2f} (n={len(pairs)})")

    inc_only = [c for c in not_called if c["inc_calls"]]
    print(f"\nNot-called users who called US (incoming/missed): {len(inc_only)}, "
          f"converted: {len(conv(inc_only))}")
    pre = sum(1 for c in cohort.values() if c["pre_calls"])
    print(f"Cohort users with calls BEFORE their drop-off time: {pre}")

    # ---- export ----
    with open(OUT_CSV, "w", newline="") as f:
        w = csv.writer(f)
        w.writerow(["phone", "dropoff_time_ist", "dropoff_type", "web_attempts", "called",
                    "first_call_ist", "call_attempts", "connected", "incoming_calls",
                    "converted_by_jul12", "converted_late", "conversion_time_ist",
                    "hours_to_first_call", "hours_to_convert"])
        for ph, c in sorted(cohort.items(), key=lambda kv: kv[1]["dropoff"]):
            w.writerow([
                ph, c["dropoff"], c["type"], c["attempts_web"],
                "yes" if c["called"] else "no",
                c["first_call"] or "", len(c["out_calls"]),
                "yes" if c["connected"] else "no", len(c["inc_calls"]),
                "yes" if (c["conv_ts"] and not c["conv_late"]) else "no",
                "yes" if c["conv_late"] else "no",
                c["conv_ts"] or "",
                f"{hours(c['first_call']-c['dropoff']):.2f}" if c["first_call"] else "",
                f"{hours(c['conv_ts']-c['dropoff']):.2f}" if c["conv_ts"] else "",
            ])
    print(f"\nPer-user rows written to {OUT_CSV}")


if __name__ == "__main__":
    main()
