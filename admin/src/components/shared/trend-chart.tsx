"use client";

import {
  ResponsiveContainer,
  ComposedChart,
  Area,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  AreaChart,
} from "recharts";
import { formatShortDate } from "@/lib/utils";

interface TrendChartProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any[];
  type: "revenue" | "registrations";
  showSpend?: boolean;
  showProfit?: boolean;
}

export function TrendChart({ data, type, showSpend, showProfit }: TrendChartProps) {
  if (data.length === 0) {
    return (
      <div className="flex items-center justify-center h-[250px] text-muted-foreground">
        No data available
      </div>
    );
  }

  if (type === "registrations") {
    return (
      <ResponsiveContainer width="100%" height={250}>
        <AreaChart data={data}>
          <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
          <XAxis
            dataKey="date"
            tickFormatter={(v) => formatShortDate(v)}
            fontSize={12}
            className="fill-muted-foreground"
          />
          <YAxis fontSize={12} className="fill-muted-foreground" allowDecimals={false} />
          <Tooltip
            labelFormatter={(v) => formatShortDate(v as string)}
            contentStyle={{ borderRadius: 8, border: "1px solid var(--border)" }}
          />
          <Area
            type="monotone"
            dataKey="count"
            name="Registrations"
            stroke="hsl(210, 80%, 55%)"
            fill="hsl(210, 80%, 55%)"
            fillOpacity={0.15}
          />
        </AreaChart>
      </ResponsiveContainer>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={250}>
      <ComposedChart data={data}>
        <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
        <XAxis
          dataKey="date"
          tickFormatter={(v) => formatShortDate(v)}
          fontSize={12}
          className="fill-muted-foreground"
        />
        <YAxis yAxisId="left" fontSize={12} className="fill-muted-foreground" />
        <YAxis yAxisId="right" orientation="right" fontSize={12} className="fill-muted-foreground" allowDecimals={false} />
        <Tooltip
          labelFormatter={(v) => formatShortDate(v as string)}
          contentStyle={{ borderRadius: 8, border: "1px solid var(--border)" }}
        />
        <Area
          yAxisId="left"
          type="monotone"
          dataKey="revenue"
          name="Revenue (₹)"
          stroke="hsl(142, 60%, 45%)"
          fill="hsl(142, 60%, 45%)"
          fillOpacity={0.15}
        />
        <Bar yAxisId="right" dataKey="orders" name="Orders" fill="hsl(210, 80%, 55%)" opacity={0.7} barSize={16} />
        <Line yAxisId="right" type="monotone" dataKey="failed" name="Failed" stroke="hsl(0, 80%, 55%)" strokeDasharray="4 4" dot={false} />
        {showSpend && (
          <Line yAxisId="left" type="monotone" dataKey="spend" name="Ad Spend (₹)" stroke="hsl(270, 70%, 55%)" strokeDasharray="5 3" dot={false} />
        )}
        {showProfit && (
          <Line yAxisId="left" type="monotone" dataKey="profit" name="Profit (₹)" stroke="hsl(38, 90%, 50%)" strokeWidth={2} dot={false} />
        )}
      </ComposedChart>
    </ResponsiveContainer>
  );
}
