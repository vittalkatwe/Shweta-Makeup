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
import { useMetaAdsAds } from "@/hooks/use-meta-ads";
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

export default function AdSetAdsPage() {
  const params = useParams();
  const campaignId = params.campaignId as string;
  const adsetId = params.adsetId as string;

  const [dateFrom, setDateFrom] = useState(defaultFrom);
  const [dateTo, setDateTo] = useState(defaultTo);
  const { data, isLoading } = useMetaAdsAds(adsetId, { dateFrom, dateTo });

  const ads = data?.ads ?? [];
  const totalImpressions = ads.reduce((s, a) => s + a.impressions, 0);
  const totalClicks = ads.reduce((s, a) => s + a.clicks, 0);
  const totalPurchases = ads.reduce((s, a) => s + a.purchases, 0);

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
        <Link
          href={`/meta-ads/${campaignId}`}
          className="hover:underline text-blue-600 dark:text-blue-400 truncate max-w-[200px]"
        >
          {campaignId}
        </Link>
        <span>/</span>
        <span className="font-medium text-foreground truncate max-w-[200px]">{adsetId}</span>
      </nav>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <h1 className="text-2xl font-bold">Ads</h1>
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
          <CardTitle>Ads ({dateFrom} – {dateTo})</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="space-y-2">
              {[...Array(3)].map((_, i) => (
                <Skeleton key={i} className="h-10 w-full" />
              ))}
            </div>
          ) : ads.length === 0 ? (
            <p className="text-sm text-muted-foreground py-8 text-center">
              No ad data available for this period.
            </p>
          ) : (
            <div className="overflow-x-auto">
              <Table className="min-w-[1400px]">
                <TableHeader>
                  <TableRow>
                    <TableHead>Creative</TableHead>
                    <TableHead>Ad Name</TableHead>
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
                  {ads.map((ad) => (
                    <TableRow key={ad.adId}>
                      <TableCell>
                        {ad.thumbnailUrl ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={ad.thumbnailUrl}
                            alt={ad.title ?? ad.adName}
                            width={40}
                            height={40}
                            className="rounded object-cover w-10 h-10"
                          />
                        ) : (
                          <div className="w-10 h-10 rounded bg-muted flex items-center justify-center text-muted-foreground text-xs">
                            Ad
                          </div>
                        )}
                      </TableCell>
                      <TableCell className="max-w-[180px]">
                        <div className="font-medium truncate">{ad.adName}</div>
                        {ad.body && (
                          <div className="text-xs text-muted-foreground truncate mt-0.5">
                            {ad.body}
                          </div>
                        )}
                      </TableCell>
                      <TableCell className="text-right">{formatCurrency(ad.spend)}</TableCell>
                      <TableCell className="text-right">{fmt(ad.reach, 0)}</TableCell>
                      <TableCell className="text-right">{fmt(ad.impressions, 0)}</TableCell>
                      <TableCell className="text-right">{formatCurrency(ad.cpm)}</TableCell>
                      <TableCell className="text-right">{fmt(ad.clicks, 0)}</TableCell>
                      <TableCell className="text-right">{fmt(ad.linkClicks, 0)}</TableCell>
                      <TableCell className="text-right">{fmt(ad.ctr)}%</TableCell>
                      <TableCell className="text-right">{formatCurrency(ad.cpc)}</TableCell>
                      <TableCell className="text-right">{fmt(ad.frequency)}</TableCell>
                      <TableCell className="text-right">{ad.purchases}</TableCell>
                      <TableCell className="text-right">
                        {ad.costPerPurchase ? formatCurrency(ad.costPerPurchase) : "—"}
                      </TableCell>
                      <TableCell className="text-right">{fmt(ad.landingPageViews ?? 0, 0)}</TableCell>
                      <TableCell className="text-right">{formatCurrency(ad.costPerLandingPageView ?? 0)}</TableCell>
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
