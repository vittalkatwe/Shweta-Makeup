import useSWR from "swr";
import { fetcher, buildUrl } from "@/lib/api";
import type { MetaAdsSummary, MetaAdsDailySpend, MetaAdsAdSetResponse, MetaAdsAdResponse } from "@/lib/types";

interface MetaAdsParams {
  dateFrom?: string;
  dateTo?: string;
  days?: number;
}

export function useMetaAdsSummary({ dateFrom, dateTo, days = 30 }: MetaAdsParams = {}) {
  const url = buildUrl("/api/admin/meta-ads/summary", {
    dateFrom: dateFrom || undefined,
    dateTo: dateTo || undefined,
    days: dateFrom && dateTo ? undefined : days,
  });
  return useSWR<MetaAdsSummary>(url, fetcher, { refreshInterval: 5 * 60 * 1000, keepPreviousData: true });
}

export function useMetaAdsDaily({ dateFrom, dateTo, days = 30 }: MetaAdsParams = {}) {
  const url = buildUrl("/api/admin/meta-ads/daily", {
    dateFrom: dateFrom || undefined,
    dateTo: dateTo || undefined,
    days: dateFrom && dateTo ? undefined : days,
  });
  return useSWR<{ success: boolean; daily: MetaAdsDailySpend[] }>(url, fetcher, { refreshInterval: 5 * 60 * 1000, keepPreviousData: true });
}

export function useMetaAdsAdsets(campaignId: string, { dateFrom, dateTo, days = 30 }: MetaAdsParams = {}) {
  const url = campaignId
    ? buildUrl(`/api/admin/meta-ads/campaign/${campaignId}/adsets`, {
        dateFrom: dateFrom || undefined,
        dateTo: dateTo || undefined,
        days: dateFrom && dateTo ? undefined : days,
      })
    : null;
  return useSWR<MetaAdsAdSetResponse>(url, fetcher, { refreshInterval: 5 * 60 * 1000, keepPreviousData: true });
}

export function useMetaAdsAds(adsetId: string, { dateFrom, dateTo, days = 30 }: MetaAdsParams = {}) {
  const url = adsetId
    ? buildUrl(`/api/admin/meta-ads/adset/${adsetId}/ads`, {
        dateFrom: dateFrom || undefined,
        dateTo: dateTo || undefined,
        days: dateFrom && dateTo ? undefined : days,
      })
    : null;
  return useSWR<MetaAdsAdResponse>(url, fetcher, { refreshInterval: 5 * 60 * 1000, keepPreviousData: true });
}
