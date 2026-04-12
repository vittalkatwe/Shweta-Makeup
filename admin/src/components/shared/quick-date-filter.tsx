"use client";

import { Button } from "@/components/ui/button";

type Preset = "today" | "yesterday" | "last-week" | "last-month";

interface QuickDateFilterProps {
  dateFrom: string;
  dateTo: string;
  onChange: (from: string, to: string) => void;
}

function toISODate(d: Date): string {
  return d.toISOString().slice(0, 10);
}

function getPresetDates(preset: Preset): { from: string; to: string } {
  const today = new Date();
  const todayStr = toISODate(today);

  switch (preset) {
    case "today":
      return { from: todayStr, to: todayStr };
    case "yesterday": {
      const y = new Date(today);
      y.setDate(y.getDate() - 1);
      const yStr = toISODate(y);
      return { from: yStr, to: yStr };
    }
    case "last-week": {
      const w = new Date(today);
      w.setDate(w.getDate() - 6);
      return { from: toISODate(w), to: todayStr };
    }
    case "last-month": {
      const m = new Date(today);
      m.setDate(m.getDate() - 29);
      return { from: toISODate(m), to: todayStr };
    }
  }
}

function getActivePreset(dateFrom: string, dateTo: string): Preset | null {
  if (!dateFrom || !dateTo) return null;
  const presets: Preset[] = ["today", "yesterday", "last-week", "last-month"];
  for (const p of presets) {
    const { from, to } = getPresetDates(p);
    if (from === dateFrom && to === dateTo) return p;
  }
  return null;
}

const LABELS: Record<Preset, string> = {
  today: "Today",
  yesterday: "Yesterday",
  "last-week": "Last Week",
  "last-month": "Last Month",
};

export function QuickDateFilter({ dateFrom, dateTo, onChange }: QuickDateFilterProps) {
  const active = getActivePreset(dateFrom, dateTo);
  const presets: Preset[] = ["today", "yesterday", "last-week", "last-month"];

  function handleClick(preset: Preset) {
    if (active === preset) {
      onChange("", "");
    } else {
      const { from, to } = getPresetDates(preset);
      onChange(from, to);
    }
  }

  return (
    <div className="flex gap-1 flex-wrap">
      {presets.map((p) => (
        <Button
          key={p}
          variant={active === p ? "default" : "outline"}
          size="sm"
          className="text-xs h-8 px-2"
          onClick={() => handleClick(p)}
        >
          {LABELS[p]}
        </Button>
      ))}
    </div>
  );
}
