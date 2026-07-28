# Meta Ads — Creative Design Insights

**Period:** 17 Mar → 26 May 2026 · 72 creatives · ₹2,90,108 spend · 187 backend purchases (Mixpanel-confirmed, since 12 May) · 960 Meta-attributed purchases
**Source files:**
- `data/meta_ads_full_report_2026-03-17_to_2026-05-26.xlsx` — lifetime
- `data/meta_ads_funnel_2026-05-24.xlsx` — single-day cross-section (24 May, 20 ads, ₹5,145 spend, 16 backend purchases)
**Joined data:** `data/creatives_joined.csv` (with `bucket` column)
**Thumbnails:** `data/creative_thumbnails/*.png`

---

## TL;DR — the eight things you should act on

1. **Hairstyling is the working hook, not makeup.** Every Mixpanel-confirmed Winner pitches hairstyling. The two makeup-led creatives (Skill-V5-Test face close-up, 2nd Set - Video2 eyeshadow) only worked when the makeup framing was paired with a "catch attention" identity hook — and even Skill-V5-Test sits as the *highest CPC* among winners (₹11.8 vs ₹6.8 group median). Bottom-line: stop testing makeup-first creatives, move all makeup angles into hairstyling-result framing.

2. **The Loser pattern is "good CTR, broken intent."** Median CTR is *higher* for Losers (3.23%) than Winners (3.19%) — and *higher CPM* (₹261 vs ₹218 — Meta is charging more to serve these because relevance is bad). Losers fail at **PP→Initiate (25% vs 60%)** and **Initiate→Success (0% vs 80%)**. The ad sells a different promise than the landing page delivers.

3. **Specific outcome + specific number wins.** Top 5 winners all have a quantified promise on the creative: "Perfect Curls in **10 Minutes**", "Create such looks in **15 mins**", "**Gota Patti** Hairstyle", "Trending Hairstyles AT JUST **₹299**", "**5-Day** Hairstyle Class". No vague "Learn hairstyling".

4. **Skill-A82 is the textbook anti-pattern — kill it now.** Lipstick-shop product display creative. Looks like a price-shock retail ad. Click-bait conversion: 4.25% CTR (top quartile) but 65 homepage visits → 0 payment-page → 0 purchase. Anyone who clicked thought they were getting cheap lipsticks. ₹302 spent so far; pull from rotation today.

5. **News-clipping / sticky-note "curiosity" creatives are CTR-trap.** Skill-A74 (BREAKING news red banner), Skill-A80 (sticky note on floor), Skill-A68 (newspaper-clipping collage), Skill-A78 (Bollywood tabloid) — high CTR (4–5%), low CPC (some sub-₹3), but they pull a curiosity-clicker audience that bounces. Skill-A74's CPC of ₹2.65 is *suspiciously cheap* — that's Meta optimizing on a wrong-intent audience.

6. **The "—Winner" suffix is mostly survivorship-bias renaming, not durable performance.** Re-launched winners (Skill-A63–Winner, Self-A30–Winner, Skill-A72-Winner, Skill-A78-Winner) underperformed their originals. Only Skill-V8–Winner held up (15 pur, same as the original). Recommendation: when promoting a test to a Winner ad set, *don't* re-upload as a new creative — duplicate-keep the original ad-ID and just scale the budget.

7. **Pre-12-May spend was 92% of the budget but conversion truth is unknown.** ₹2.66 lakh out of ₹2.90 lakh ran before Mixpanel was installed. Sales Ad - A/B alone burned ₹1.05 lakh on Meta-reported 395 purchases — but Source Comparison says Meta inflates by ~5× (960 vs 187 lifetime). Best-guess real return on that creative: ~70–80 purchases at ~₹1300/purchase, not the ₹265 Meta shows.

8. **Day-of-mix matters more than you'd think.** Same creative pool can deliver 0.83% CR (18 May) or 5.85% CR (21 May) depending on which subset is funded. The worst day put 47% of spend on Winner-Campaign rename duplicates and starved the actual winners. **Action: hardcode a daily checklist — at least 60% of spend must go to the 5 MP-confirmed winners; cut anything zero-conv after ₹300 same-day spend.**

---

## Bucket performance — the table that runs the playbook

Bucketing rule (Mixpanel = source of truth, since 12 May):
- **WINNER** = ≥5 backend purchases AND ≥4% CR
- **LOSER** = ≥₹500 spend AND ≤1 purchase (with ≥50 homepage visits)
- **MID** = everything else with MP data
- **WINNER_META_ONLY / PRE_MP** = ran only before 12 May, can't ground-truth

| Bucket            | N  | Spend     | Median CTR | Median CPC | Median CPM | Pur (truth) | Median CR |
|-------------------|----|-----------|-----------:|-----------:|-----------:|------------:|----------:|
| **WINNER**        | 7  | ₹21,655   | **3.19%**  | **₹6.84**  | **₹219**   | **88**      | **5.97%** |
| MID               | 23 | ₹16,542   | 2.66%      | ₹8.52      | ₹232       | 40          | 3.70%     |
| **LOSER**         | 7  | ₹4,023    | **3.23%**  | ₹8.87      | **₹262**   | **3**       | **0.0%**  |
| WINNER_META_ONLY  | 6  | ₹1,78,742 | 2.74%      | ₹6.02      | ₹179       | 654 (Meta)  | n/a       |
| PRE_MP (rest)     | 23 | ₹58,196   | 3.21%      | ₹7.48      | ₹239       | 163 (Meta)  | n/a       |
| LEADGEN           | 4  | ₹6,915    | 2.29%      | ₹2.93      | ₹68        | 0           | n/a       |

### Funnel-stage diagnostic (the punchline)

| Stage          | WINNERS | MID   | **LOSERS** |
|----------------|--------:|------:|-----------:|
| H → Pay-Page   | 11.0%   | 8.3%  | 9.1%       |
| PP → Initiate  | **60.0%** | 50.0% | **25.0%** |
| Initiate → Success | **80.0%** | 71.4% | **0.0%** |

**Losers don't lose at the top of the funnel — they lose at the bottom.** Their clicks and homepage traffic look fine. They die at the payment page. That's a *promise mismatch*, not a *creative weakness*.

---

## Winner playbook — the visual recipe

What every Mixpanel-confirmed Winner has in common (verified by viewing each thumbnail):

| Element | Pattern |
|---|---|
| **Topic** | Hairstyling (7 / 7) |
| **Outcome shown** | Finished hairstyle in image — curls, bun, partition, intricate updo |
| **Quantified promise** | "10 mins" / "15 mins" / "5 days" / "₹299" baked into the creative |
| **Headline format** | Short, problem-led, often Hindi-English mixed ("Apke Hairstyles main Finishing nahi hai?") |
| **Composition** | Portrait orientation, real photo (not stock), pink/coral banner top or bottom |
| **CTA** | Visible "Join Hairstyle Class" / "₹299" button or callout |
| **Identity** | "You / Apke" second-person framing, not "We teach" |

### Specific winners and what makes each work

| Ad | Backend Pur | CR | CPC | The design move |
|---|---:|---:|---:|---|
| **Skill-V5-Test** | 26 | 8.1% | ₹11.8 | Tight face close-up + "Start Makeup, Catch Everyone's [eye]" — the *only* makeup angle that landed, and only because it framed makeup as an identity/attention outcome, not a skill |
| **Skill-V8 / Skill-V8–Winner** | 30 (combined) | 5.3–6.7% | ₹4.9–7.1 | Hands holding completed curls + "Trending Hairstyles AT JUST ₹299" — result + price together on one frame |
| **Skill-A72** | 8 | **7.9%** | ₹6.2 | "Say Bye to Expensive Hairstyle Courses" + reviews screenshot + ₹299 — social proof + price anchor. Most efficient creative of all 72 (₹151/purchase) |
| **Self-A30** | 8 | 6.0% | ₹10.5 | "Make Perfect Curls in 10 Minutes" + behind-the-scenes phone-and-ringlight shot — aspirational *and* relatable home setup |
| **Skill-A71** | 8 | 5.2% | ₹6.7 | "Partitioning + Sectioning = Perfect Hairstyles" — names a specific technique, splits the visual to show the steps |
| **Skill-A63** | 8 | 5.2% | ₹6.8 | "Apke Hairstyles main Finishing nahi hai?" + multiple finished hairstyles — problem-aware Hindi hook, result grid |

### High-volume Meta-only Winners (treat as directional)

| Ad | Meta Pur | Spend | CPM | Note |
|---|---:|---:|---:|---|
| Sales Ad - A/B | 395 | ₹1.05L | ₹125 | Multi-image hairstyle collage with ₹99 features — was the workhorse, but real purchases likely ~70–80 |
| 2nd Set - Video1 | 79 | ₹24.5k | ₹185 | Salon shot, stylist working — in-action realness |
| Still - HM2 | 53 | ₹12.1k | ₹133 | "Learn Hairstyling from Home" + feature checklist + "Start Earning" CTA — infographic structure |
| 2nd Set - Video2 | 49 | ₹15k | ₹206 | Eyeshadow close-up — **only makeup creative that got real volume**, and it ran in the legacy makeup-positioned funnel |

---

## Loser failure modes — segmented by where they break

### Type 1: Off-theme / wrong-promise (clickbait wrong audience)
- **Skill-A82** — lipstick shop product display. CTR 4.25%, 65 visits, 0 purchases. The image promises *cheap makeup products*; the landing page sells a *hairstyling course*. **Action: kill.**
- **Skill-A74** — "BREAKING news" red tabloid banner. Suspiciously cheap clicks (₹2.65 CPC), 113 visits, only 1 purchase. Meta is finding curiosity-clickers, not learners. **Action: kill.**
- **Skill-A80** — handwritten sticky note on a wood floor. Looks like a personal post, not an ad. High curiosity, zero commercial intent. **Action: kill.**

### Type 2: Generic / no specific outcome
- **General-C1** — generic salon stock photo + "5 Reasons to join". CTR 2.95%, 22 visits, 0 purchases. No outcome shown, no specificity. **Action: kill, no salvage.**
- **Skill-A55** — multi-hairstyle collage but buried small text "Want to Learn Celebrity Hairstyle Techniques?". Visual is fine; hook is too soft. **Action: rewrite headline with specific outcome + price, retest.**

### Type 3: Process-pain without aspirational result
- **Skill-A52** — "Still Practising on Dummy?" — names the pain but shows an unfinished practice scene; visitor doesn't see what success looks like. **Action: pair this hook with a *finished-style result* image, retest.**
- **Skill-A21** — text-only yellow warning box, no visual. Reads like a forum post. **Action: kill, won't scale at any spend.**

### Type 4: News-clipping / Bollywood tabloid (CTR-trap)
- **Skill-A68, Skill-A78** — newspaper/tabloid styling. Both got *some* purchases (3 and 2) so not pure loss, but the audience quality is mixed. **Action: cap budget at ₹500–800, don't scale; use as cheap top-of-funnel only if budget allows.**

### Type 5: "—Winner" survivor-bias re-uploads
- **Skill-A63–Winner, Self-A30–Winner, Skill-A72-Winner, Skill-A78-Winner** — all underperformed their originals (most got 0 purchases on the Winner version while originals had 8). The re-upload reset Meta's learning. **Action: stop creating "—Winner" duplicates; promote by duplicating the ad ID into a higher-budget ad set instead.**

---

## What each metric is actually telling you

### CTR — measures hook strength, not buy intent
- WINNER median 3.19% vs LOSER median 3.23% — **CTR alone cannot tell you a creative will convert.**
- Highest CTRs of the test bucket belong to Losers: Skill-A74 (5.08%), Skill-A82 (4.25%), Skill-A80 (4.07%), Skill-A52 (4.13%).
- Best signal: CTR ≥ 2.5% is necessary but not sufficient; combine with PP→Init rate to filter out curiosity-clickers.

### CPC — cheap is suspect when paired with no conversions
- Median CPC winners ₹6.8, losers ₹8.9. **But the outliers tell a different story:** Skill-A74 at ₹2.65 CPC has 1 purchase on 113 visits. Lead-gen ads at ₹2.93 median CPC get 0 LPV (no tracking on the lead form, so technically un-judged here).
- Rule of thumb: if CPC < ₹4 and no funnel data 24h after launch, expect garbage traffic.

### CPM — the cleanest "Meta hates this" signal
- LOSER median CPM ₹262 vs WINNER ₹219 (+20%). Meta charges more to serve creatives with poor on-platform engagement (low video watch %, low post reactions, low time-on-ad).
- Pre-MP top spenders had CPM ₹125–₹206 — when CPM creeps above ₹250 on a new ad, it's a leading indicator the creative will underperform on the funnel side too.

### CR % — the only metric that matters when MP is on
- WINNER median 5.97% vs MID 3.70% vs LOSER 0.0%. Sitewide CR is 4.02%, so any creative below 3% needs the budget cap; below 1% needs killing.
- Read the funnel stages together: a 7.9% Init→Success WITH a 25% PP→Init still means a broken offer/page mismatch.

### Cost / Purchase — winners cluster ₹150–₹300
- Best: Skill-A72 (₹151), Skill-V8 (₹156), Skill-V8–Winner (₹273), Skill-V5-Test (₹275), Self-A30 (₹288).
- Above ₹400/purchase = cut. Skill-A27-WIN1 at ₹455 is the upper bound of acceptable; Self-A34 (₹857), Self-A31 (₹557) should be paused.

---

## Action recommendations

### Scale immediately (next 7 days)
- **Skill-A72** — best CR (7.9%) and best ₹/purchase (₹151). Only ₹1.2k spent so far — has room to 10× before fatigue. Reuse the **same ad ID**, don't duplicate as "—Winner".
- **Skill-V8 + Skill-V8–Winner** — combined 30 purchases at 5–7% CR. Continue both, but stop creating new "—Winner" duplicates of any other ad until you've validated this isn't a one-off.
- **Self-A30** — 6% CR with the home-setup angle is differentiated from the result-shot family; protect it as a portfolio diversifier.

### Test next (production within 2 weeks)
- **Specific-technique angle** is undertested — only Skill-A71 (Partitioning), Skill-A51 (Gota Patti), Skill-A57 (Clean Hair Partition) tried it. Build 4–5 more on named techniques: Juda, Khopa, Messy Bun, Front-Puff, Reception Hairstyle.
- **₹299 anchor + finished-style + 5-day promise** — the trifecta in Skill-A72 / V8 — replicate with at least 3 new visual variants (different hairstyles, different models, same headline + price + duration formula).
- **One controlled makeup test** to confirm the "makeup is dead" hypothesis: same pricing + same hook + same composition as Skill-V8, but with a finished-makeup look. If it doesn't beat 4% CR in 7 days, retire makeup permanently as a hook.

### Kill now (zero salvage)
- Skill-A82 (lipstick shop) · Skill-A21 (text-only warning) · Skill-A80 (sticky note) · Skill-A74 (BREAKING news) · General-C1 (generic salon) · Skill-A81 (notebook).
- Cumulative spend on these six: ₹2,733 with 0 confirmed purchases. Stop refreshing them.

### Cap, don't kill (low-CR but cheap top-of-funnel)
- Skill-A68 (newspaper) · Skill-A78 (Bollywood tabloid) · Skill-A55 (collage) — cap at ₹500/wk each; they bring some volume but at unstable conversion quality.

### Daily snapshot validation (24 May 2026)

The single-day funnel report independently confirms the lifetime ranking:

| Ad | 24 May CR | 24 May ₹/Pur | Lifetime CR | Lifetime ₹/Pur | Verdict |
|---|---:|---:|---:|---:|---|
| **Skill-A72** | **10.7%** | **₹111** | 7.9% | ₹151 | Performance is *improving* over time — scale it |
| **Skill-V8** | 9.4% | ₹148 | 6.7% | ₹156 | Stable winner |
| **Self-A30** | 8.7% | ₹244 | 6.0% | ₹288 | Stable but watch CPC (jumped to ₹14.78 single-day from ₹10.5 lifetime — fatigue signal) |
| Skill-V8– Winner | 4.4% | ₹335 | 5.3% | ₹273 | **Slipping** — Winner duplicate may be running out of fresh audience |
| Skill-A74 | 0.0% | — | 0.9% | ₹501 | Daily CTR was 4.81% (highest of any ad) with 61 homepage visits and zero purchases — confirms the "curiosity click, broken intent" diagnosis |

Same five money losers on 24 May as lifetime: Skill-A55, Skill-A78, Skill-A74, Skill-A79, Skill-A21. ₹1,328 burned on these in one day alone. **Pulling them earlier would have funded another full day of Skill-A72.**

### Daily mix is the hidden lever (per-day report finding)

`meta_ads_per_day_report.xlsx` has one sheet per day. Day-level CR ranges from **0.83% (18 May) to 5.85% (21 May)** — a 7× swing on the *same creative pool*. The differentiator isn't fatigue or audience — it's **which subset is being funded that day**:

| Date | Spend | Ads Live | CR % | What was running |
|---|---:|---:|---:|---|
| **21 May (best)** | ₹2,477 | 13 | **5.85%** | Top spenders = pure MP-confirmed winners (Skill-V8, Self-A30, Skill-A71, Skill-A63, Self-A34, Skill-A51). No Winner-rename duplicates. |
| **13 May** | ₹6,287 | 16 | 5.10% | Big bets on legacy: SKUP1-WIN-V (₹1,613), SUB1-TEST-V (₹1,210), Skill-A27-WIN1 (₹1,087). High concentration in proven pre-MP creatives. |
| **23 May** | ₹4,468 | 19 | 5.11% | Winner family + Skill-A72 / Skill-V8 dominant. |
| **22 May** | ₹4,742 | **18** | **2.91%** | ₹1,900+ went to General-C1 (0 conv), Skill-A57/A59/A2 (0 conv each), Self-A30–Winner / Skill-A63–Winner / Skill-A71–Winner duplicates (low conv). Real winners diluted to ~₹275 each. |
| **18 May (worst)** | ₹1,557 | 12 | **0.83%** | 47% of spend on Winner Campaign rename-duplicates (SKUP1-WIN-V ₹298, Self-A24-WIN1 ₹284, Skill-A27-WIN1 ₹157). None of the high-CR Skill-A* generation (A63, A71, A72) running. Only Skill-V5-Test got 1 purchase. |

**Implication:** The biggest available CR lift isn't from a new creative test — it's from *concentrating daily spend on the 5–7 known winners and stopping the others entirely.* If 22 May had run only Skill-V8 + Self-A30 + Skill-A72 + Skill-A63 + Skill-A71 (₹275 each = ₹1,375) and dropped the rest, projected purchases ≈ 11 at ~₹125/pur — versus the 10 purchases at ₹474/pur it actually delivered. ~70% cost reduction on the same conversion volume.

### Tracking / data hygiene
- Lead-gen campaigns (Interest ad, Non Interest ad, 1k Interest ad, 1k Non Interest ad) have **zero LPV tracking** — they spent ₹6,915 with no funnel visibility at all. Either instrument LP for these or stop running them. They're flying blind.
- "—Winner" re-uploads should be banned in the naming convention; budget the original ad-ID instead. Right now you can't tell true creative fatigue from naming-induced learning resets.

---

## Caveats — read before you act

- **Mixpanel was installed 12 May 2026, 15 days before report end.** 92% of spend ran *before* MP tracking. All conclusions about pre-12-May creatives are *directional only* — Meta over-counts purchases ~5× (960 Meta vs 187 MP lifetime).
- **The Notes sheet flags 4 ads without thumbnails** — the four lead-gen campaign ads (Interest ad, Non Interest ad, 1k Interest ad, 1k Non Interest ad). These were excluded from visual classification.
- **utm_content mismatches** were already normalized by the report builder, but Skill-A52 vs Skill-A52–TEST and similar TEST/Winner pairs may share creative DNA — the funnel performance differences could be ad-set-targeting effects, not creative effects. Worth a separate split test before trusting the rename-bias claim.
- **CPM differences between buckets** could partially be audience-targeting effects (Winner ad sets often use lookalikes that are cheaper). The ₹262 vs ₹219 gap is real but not pure-creative-quality signal.
- **Some "Self-*" creatives may have been priced higher (₹399 visible in Skill-A79)** — the price-anchor on the creative itself isn't always consistent with the live ₹299 charge. That mismatch alone could explain part of the PP→Init drop. Worth auditing all price callouts vs the live Remote Config `course_price`.

---

## Appendix: where the data lives

- `data/creatives_joined.csv` — 72 rows, all metrics + `bucket` column
- `data/creative_thumbnails/<ad_name>.png` — 68 viewable thumbnails (4 lead-gen ads have none)
- `data/meta_ads_full_report_2026-03-17_to_2026-05-26.xlsx` — lifetime report (9 sheets, includes Funnel - Lifetime breakdown by utm_content)
- `data/meta_ads_funnel_2026-05-24.xlsx` — 24 May daily snapshot (5 sheets, 20 ads, validates lifetime winners)
- `data/meta_ads_per_day_report.xlsx` — full per-day creative breakdown (one sheet per day, 17 Mar → 26 May, source for the daily-mix analysis)
