import useSWR from "swr";
import { fetcher, buildUrl } from "@/lib/api";
import type { Profile, ProfileTrendPoint, Facets } from "@/lib/types";

interface ProfileFilters {
  page?: number;
  limit?: number;
  gender?: string;
  city?: string;
  state?: string;
  occupation?: string;
  hasPurchasedCourse?: string;
  source?: string;
  search?: string;
  dateFrom?: string;
  dateTo?: string;
}

interface ProfilesResponse {
  success: boolean;
  profiles: Profile[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export function useProfiles(filters: ProfileFilters = {}) {
  const url = buildUrl("/api/admin/profiles", {
    page: filters.page || 1,
    limit: filters.limit || 50,
    gender: filters.gender,
    city: filters.city,
    state: filters.state,
    occupation: filters.occupation,
    hasPurchasedCourse: filters.hasPurchasedCourse,
    source: filters.source,
    search: filters.search,
    dateFrom: filters.dateFrom,
    dateTo: filters.dateTo,
  });

  return useSWR<ProfilesResponse>(url, fetcher, {
    refreshInterval: 30000,
    keepPreviousData: true,
  });
}

export function useProfileTrends(days = 30) {
  return useSWR<{ success: boolean; trends: ProfileTrendPoint[] }>(
    `/api/admin/profiles/trends?days=${days}`,
    fetcher,
    { refreshInterval: 30000, keepPreviousData: true }
  );
}

export function useProfileFacets() {
  return useSWR<{ success: boolean } & Facets>(
    "/api/admin/profiles/facets",
    fetcher,
    { refreshInterval: 60000, keepPreviousData: true }
  );
}
