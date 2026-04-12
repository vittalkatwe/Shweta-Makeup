import useSWR from "swr";
import { fetcher, buildUrl } from "@/lib/api";
import type { Payment, PaymentTrendPoint } from "@/lib/types";

interface PaymentFilters {
  page?: number;
  limit?: number;
  status?: string;
  source?: string;
  search?: string;
  dateFrom?: string;
  dateTo?: string;
  amount?: number;
}

interface PaymentsResponse {
  success: boolean;
  payments: Payment[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export function usePayments(filters: PaymentFilters = {}) {
  const url = buildUrl("/api/admin/payments", {
    page: filters.page || 1,
    limit: filters.limit || 50,
    status: filters.status,
    source: filters.source,
    search: filters.search,
    dateFrom: filters.dateFrom,
    dateTo: filters.dateTo,
    amount: filters.amount,
  });

  return useSWR<PaymentsResponse>(url, fetcher, {
    refreshInterval: 30000,
    keepPreviousData: true,
  });
}

export function usePaymentTrends(days = 30) {
  return useSWR<{ success: boolean; trends: PaymentTrendPoint[] }>(
    `/api/admin/payments/trends?days=${days}`,
    fetcher,
    { refreshInterval: 30000, keepPreviousData: true }
  );
}
