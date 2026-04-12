"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
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
import { useMetaAdsAdsets } from "@/hooks/use-meta-ads";
import { formatCurrency } from "@/lib/utils";
import { DollarSign, Eye, MousePointer, ShoppingCart } from "lucide-react";

function fmt(n: number, decimals = 2) {
  return n.toLocaleString("en-IN", { maximumFractionDigits: decimals });
}

function toISODate(d: Date) {
  return d.toISOString().slice(0, 10);
}

const defaultTo = toISODate(new Date());
const defaultFrom = toISODate(new Date());

export default function CampaignAdSetsPage() {
  const params = useParams();
  const campaignId = params.campaignId as string;

  const [dateFrom, setDateFrom] = useState(defaultFrom);
  const [dateTo, setDateTo] = useState(defaultTo);
  const { data, isLoading } = useMetaAdsAdsets(campaignId, { dateFrom, dateTo });

  const adsets = data?.adsets ?? [];
  const totalImpressions = adsets.reduce((s, a) => s + a.impressions, 0);
  const totalClicks = adsets.reduce((s, a) => s + a.clicks, 0);
  const totalPurchases = adsets.reduce((s, a) => s + a.purchases, 0);

  const kpis = [
    { label: "Total Spend", value: formatCurrency(data?.totalSpend ?? 0), icon: DollarSign },
    { label: "Impressions", value: fmt(totalImpressions, 0), icon: Eye },
    { label: "Clicks", value: fmt(totalClicks, 0), icon: MousePointer },
    { label: "Purchases", value: fmt(totalPurchases, 0), icon: ShoppingCart },
  ];

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <nav className="text-sm text-muted-foreground flex items-center gap-1">
        <Link href="/meta-ads" className="hover:underline text-blue-600 dark:text-blue-400">
          Meta Ads
        </Link>
        <span>/</span>
        <span className="font-medium text-foreground truncate max-w-[300px]">{campaignId}</span>
      </nav>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <h1 className="text-2xl font-bold">Ad Sets</h1>
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

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
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
          <CardTitle>Ad Sets ({dateFrom} – {dateTo})</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="space-y-2">
              {[...Array(3)].map((_, i) => (
                <Skeleton key={i} className="h-10 w-full" />
              ))}
            </div>
          ) : adsets.length === 0 ? (
            <p className="text-sm text-muted-foreground py-8 text-center">
              No ad set data available for this period.
            </p>
          ) : (
            <div className="overflow-x-auto">
              <Table className="min-w-[1300px]">
                <TableHeader>
                  <TableRow>
                    <TableHead>Ad Set</TableHead>
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
                  {adsets.map((a) => (
                    <TableRow key={a.adsetId}>
                      <TableCell className="font-medium max-w-[200px]">
                        <Link
                          href={`/meta-ads/${campaignId}/${a.adsetId}`}
                          className="hover:underline text-blue-600 dark:text-blue-400 truncate block"
                        >
                          {a.adsetName}
                        </Link>
                      </TableCell>
                      <TableCell className="text-right">{formatCurrency(a.spend)}</TableCell>
                      <TableCell className="text-right">{fmt(a.reach, 0)}</TableCell>
                      <TableCell className="text-right">{fmt(a.impressions, 0)}</TableCell>
                      <TableCell className="text-right">{formatCurrency(a.cpm)}</TableCell>
                      <TableCell className="text-right">{fmt(a.clicks, 0)}</TableCell>
                      <TableCell className="text-right">{fmt(a.linkClicks, 0)}</TableCell>
                      <TableCell className="text-right">{fmt(a.ctr)}%</TableCell>
                      <TableCell className="text-right">{formatCurrency(a.cpc)}</TableCell>
                      <TableCell className="text-right">{fmt(a.frequency)}</TableCell>
                      <TableCell className="text-right">{a.purchases}</TableCell>
                      <TableCell className="text-right">
                        {a.costPerPurchase ? formatCurrency(a.costPerPurchase) : "—"}
                      </TableCell>
                      <TableCell className="text-right">{fmt(a.landingPageViews ?? 0, 0)}</TableCell>
                      <TableCell className="text-right">{formatCurrency(a.costPerLandingPageView ?? 0)}</TableCell>
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
