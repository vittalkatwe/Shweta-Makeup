import useSWR from "swr";
import { fetcher } from "@/lib/api";
import type { DashboardStats } from "@/lib/types";

export function useDashboardStats() {
  return useSWR<{ success: boolean } & DashboardStats>(
    "/api/admin/dashboard",
    fetcher,
    { refreshInterval: 30000, keepPreviousData: true }
  );
}
