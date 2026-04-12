import useSWR from "swr";
import { fetcher, buildUrl } from "@/lib/api";
import type { OrdersResponse } from "@/lib/types";

interface OrderFilters {
  page?: number;
  limit?: number;
  search?: string;
  dateFrom?: string;
  dateTo?: string;
  gender?: string;
  state?: string;
  amount?: number;
  source?: string;
}

export function useOrders(filters: OrderFilters = {}) {
  const url = buildUrl("/api/admin/orders", {
    page: filters.page || 1,
    limit: filters.limit || 50,
    search: filters.search,
    dateFrom: filters.dateFrom,
    dateTo: filters.dateTo,
    gender: filters.gender,
    state: filters.state,
    amount: filters.amount,
    source: filters.source,
  });

  return useSWR<OrdersResponse>(url, fetcher, {
    refreshInterval: 30000,
    keepPreviousData: true,
  });
}
