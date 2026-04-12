"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { TrendChart } from "@/components/shared/trend-chart";
import { useDashboardStats } from "@/hooks/use-dashboard-stats";
import { usePayments, usePaymentTrends } from "@/hooks/use-payments";
import { useProfiles } from "@/hooks/use-profiles";
import { useMetaAdsSummary, useMetaAdsDaily } from "@/hooks/use-meta-ads";
import { formatCurrency, formatDate } from "@/lib/utils";
import { Users, IndianRupee, ShoppingCart, Target, TrendingUp } from "lucide-react";
import Link from "next/link";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001";

const statusColors: Record<string, string> = {
  paid: "bg-green-100 text-green-800",
  failed: "bg-red-100 text-red-800",
  pending: "bg-yellow-100 text-yellow-800",
  created: "bg-blue-100 text-blue-800",
};

export default function DashboardPage() {
  const { data: stats, isLoading: statsLoading } = useDashboardStats();
  const { data: trendsData, isLoading: trendsLoading } = usePaymentTrends(30);
  const { data: paymentsData } = usePayments({ limit: 5 });
  const { data: profilesData } = useProfiles({ limit: 5 });
  const { data: metaAdsSummary, isLoading: metaAdsLoading } = useMetaAdsSummary({ days: 30 });
  const { data: metaAdsDaily } = useMetaAdsDaily({ days: 30 });

  const [syncing, setSyncing] = useState(false);
  const [syncResult, setSyncResult] = useState<string | null>(null);

  async function handleSyncSource() {
    setSyncing(true);
    setSyncResult(null);
    try {
      const res = await fetch(`${API_URL}/api/admin/sync-source`, { method: "POST" });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Request failed");
      setSyncResult(`✓ ${data.updated} profiles updated (${data.skipped} skipped)`);
    } catch {
      setSyncResult("Error syncing source");
    } finally {
      setSyncing(false);
    }
  }

  const chartData = (trendsData?.trends || []).map((point) => ({
    ...point,
    spend: metaAdsDaily?.daily?.find((d) => d.date === point.date)?.spend ?? 0,
  }));
  const revenue30d = (trendsData?.trends || []).reduce((s, t) => s + t.revenue, 0);
  const spend30d = metaAdsSummary?.totalSpend ?? 0;
  const profit30d = revenue30d - spend30d;

  const kpis = [
    {
      label: "Today's Customers",
      value: stats?.today.customers,
      allTime: stats?.allTime.customers,
      icon: Users,
      format: (v: number) => v.toLocaleString(),
    },
    {
      label: "Today's Revenue",
      value: stats?.today.revenue,
      allTime: stats?.allTime.revenue,
      icon: IndianRupee,
      format: formatCurrency,
    },
    {
      label: "Today's Orders",
      value: stats?.today.orders,
      allTime: stats?.allTime.orders,
      icon: ShoppingCart,
      format: (v: number) => v.toLocaleString(),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <div className="flex items-center gap-3">
          {syncResult && (
            <span className="text-sm text-muted-foreground">{syncResult}</span>
          )}
          <button
            onClick={handleSyncSource}
            disabled={syncing}
            className="px-3 py-1.5 text-sm rounded-md border bg-background hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {syncing ? "Syncing…" : "Sync Source"}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {kpis.map((kpi) => (
          <Card key={kpi.label}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {kpi.label}
              </CardTitle>
              <kpi.icon className="h-5 w-5 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              {statsLoading ? (
                <Skeleton className="h-8 w-24" />
              ) : (
                <>
                  <div className="text-2xl font-bold">
                    {kpi.format(kpi.value ?? 0)}
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    All time: {kpi.format(kpi.allTime ?? 0)}
                  </p>
                </>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Ad Spend (30d)</CardTitle>
            <Target className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {metaAdsLoading ? (
              <Skeleton className="h-8 w-24" />
            ) : (
              <div className="text-2xl font-bold">{formatCurrency(spend30d)}</div>
            )}
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Revenue (30d)</CardTitle>
            <IndianRupee className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {trendsLoading ? (
              <Skeleton className="h-8 w-24" />
            ) : (
              <div className="text-2xl font-bold">{formatCurrency(revenue30d)}</div>
            )}
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Profit (30d)</CardTitle>
            <TrendingUp className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {trendsLoading || metaAdsLoading ? (
              <Skeleton className="h-8 w-24" />
            ) : (
              <div className={`text-2xl font-bold ${profit30d >= 0 ? "text-green-600" : "text-red-600"}`}>
                {formatCurrency(profit30d)}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Revenue & Orders (Last 30 Days)</CardTitle>
        </CardHeader>
        <CardContent>
          {trendsLoading ? (
            <Skeleton className="h-[250px] w-full" />
          ) : (
            <TrendChart data={chartData} type="revenue" showSpend={true} />
          )}
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Recent Payments</CardTitle>
            <Link href="/payments" className="text-sm text-primary hover:underline">
              View all
            </Link>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {paymentsData?.payments.map((p) => (
                <div key={p._id} className="flex items-center justify-between text-sm">
                  <div>
                    <div className="font-medium">{p.name || p.phone}</div>
                    <div className="text-xs text-muted-foreground">
                      {formatDate(p.timestamp)}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{formatCurrency(p.amount)}</span>
                    <Badge variant="secondary" className={statusColors[p.status]}>
                      {p.status}
                    </Badge>
                  </div>
                </div>
              ))}
              {!paymentsData?.payments.length && (
                <p className="text-sm text-muted-foreground">No payments yet</p>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Recent Customers</CardTitle>
            <Link href="/customers" className="text-sm text-primary hover:underline">
              View all
            </Link>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {profilesData?.profiles.map((p) => (
                <div key={p._id} className="flex items-center justify-between text-sm">
                  <div>
                    <div className="font-medium">{p.name || p.phone}</div>
                    <div className="text-xs text-muted-foreground">
                      {p.city && p.state ? `${p.city}, ${p.state}` : p.phone}
                    </div>
                  </div>
                  <Badge
                    variant="secondary"
                    className={
                      p.hasPurchasedCourse
                        ? "bg-green-100 text-green-800"
                        : "bg-gray-100 text-gray-600"
                    }
                  >
                    {p.hasPurchasedCourse ? "Purchased" : "Lead"}
                  </Badge>
                </div>
              ))}
              {!profilesData?.profiles.length && (
                <p className="text-sm text-muted-foreground">No customers yet</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
