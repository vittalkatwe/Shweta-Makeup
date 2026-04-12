"use client";

import { useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DateRangePicker } from "@/components/shared/date-range-picker";
import { QuickDateFilter } from "@/components/shared/quick-date-filter";
import { useMetaAdsSummary } from "@/hooks/use-meta-ads";
import { formatCurrency } from "@/lib/utils";
import { Target, Eye, MousePointer, Users, TrendingUp, DollarSign } from "lucide-react";

function fmt(n: number, decimals = 2) {
  return n.toLocaleString("en-IN", { maximumFractionDigits: decimals });
}

function toISODate(d: Date) {
  return d.toISOString().slice(0, 10);
}

const defaultTo = toISODate(new Date());
const defaultFrom = toISODate(new Date());

export default function MetaAdsPage() {
  const [dateFrom, setDateFrom] = useState(defaultFrom);
  const [dateTo, setDateTo] = useState(defaultTo);
  const { data, isLoading } = useMetaAdsSummary({ dateFrom, dateTo });

  const campaigns = data?.campaigns ?? [];
  const totalImpressions = campaigns.reduce((s, c) => s + c.impressions, 0);
  const totalClicks = campaigns.reduce((s, c) => s + c.clicks, 0);
  const totalReach = campaigns.reduce((s, c) => s + c.reach, 0);
  const avgCtr = campaigns.length
    ? campaigns.reduce((s, c) => s + c.ctr, 0) / campaigns.length
    : 0;
  const avgCpc = campaigns.length
    ? campaigns.reduce((s, c) => s + c.cpc, 0) / campaigns.length
    : 0;

  const kpis = [
    { label: "Total Spend", value: formatCurrency(data?.totalSpend ?? 0), icon: DollarSign },
    { label: "Impressions", value: fmt(totalImpressions, 0), icon: Eye },
    { label: "Clicks", value: fmt(totalClicks, 0), icon: MousePointer },
    { label: "Reach", value: fmt(totalReach, 0), icon: Users },
    { label: "Avg CTR", value: `${fmt(avgCtr)}%`, icon: TrendingUp },
    { label: "Avg CPC", value: formatCurrency(avgCpc), icon: Target },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <h1 className="text-2xl font-bold">Meta Ads</h1>
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
          <QuickDateFilter
            dateFrom={dateFrom}
            dateTo={dateTo}
            onChange={(from, to) => { setDateFrom(from); setDateTo(to); }}
          />
          <DateRangePicker
            dateFrom={dateFrom}
            dateTo={dateTo}
            onDateFromChange={setDateFrom}
            onDateToChange={setDateTo}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        {kpis.map((kpi) => (
          <Card key={kpi.label}>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-xs font-medium text-muted-foreground">
                {kpi.label}
              </CardTitle>
              <kpi.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <Skeleton className="h-7 w-20" />
              ) : (
                <div className="text-xl font-bold">{kpi.value}</div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Campaigns ({dateFrom} – {dateTo})</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="space-y-2">
              {[...Array(3)].map((_, i) => (
                <Skeleton key={i} className="h-10 w-full" />
              ))}
            </div>
          ) : campaigns.length === 0 ? (
            <p className="text-sm text-muted-foreground py-8 text-center">
              No campaign data available for this period.
            </p>
          ) : (
            <div className="overflow-x-auto">
              <Table className="min-w-[1300px]">
                <TableHeader>
                  <TableRow>
                    <TableHead>Campaign</TableHead>
                    <TableHead className="text-right">Spend</TableHead>
                    <TableHead className="text-right">Reach</TableHead>
                    <TableHead className="text-right">Impressions</TableHead>
                    <TableHead className="text-right">CPM</TableHead>
                    <TableHead className="text-right">Clicks</TableHead>
                    <TableHead className="text-right">Link Clicks</TableHead>
                    <TableHead className="text-right">CTR</TableHead>
                    <TableHead className="text-right">CPC</TableHead>
                    <TableHead className="text-right">Freq</TableHead>
                    <TableHead className="text-right">Purchases</TableHead>
                    <TableHead className="text-right">Cost/Purchase</TableHead>
                    <TableHead className="text-right">LPV</TableHead>
                    <TableHead className="text-right">Cost/LPV</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {campaigns.map((c) => (
                    <TableRow key={c.campaignId}>
                      <TableCell className="font-medium max-w-[200px]">
                        <Link
                          href={`/meta-ads/${c.campaignId}`}
                          className="hover:underline text-blue-600 dark:text-blue-400 truncate block"
                        >
                          {c.campaignName}
                        </Link>
                      </TableCell>
                      <TableCell className="text-right">{formatCurrency(c.spend)}</TableCell>
                      <TableCell className="text-right">{fmt(c.reach, 0)}</TableCell>
                      <TableCell className="text-right">{fmt(c.impressions, 0)}</TableCell>
                      <TableCell className="text-right">{formatCurrency(c.cpm)}</TableCell>
                      <TableCell className="text-right">{fmt(c.clicks, 0)}</TableCell>
                      <TableCell className="text-right">{fmt(c.linkClicks ?? 0, 0)}</TableCell>
                      <TableCell className="text-right">{fmt(c.ctr)}%</TableCell>
                      <TableCell className="text-right">{formatCurrency(c.cpc)}</TableCell>
                      <TableCell className="text-right">{fmt(c.frequency ?? 0)}</TableCell>
                      <TableCell className="text-right">{c.purchases}</TableCell>
                      <TableCell className="text-right">
                        {c.costPerPurchase ? formatCurrency(c.costPerPurchase) : "—"}
                      </TableCell>
                      <TableCell className="text-right">{fmt(c.landingPageViews ?? 0, 0)}</TableCell>
                      <TableCell className="text-right">{formatCurrency(c.costPerLandingPageView ?? 0)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
