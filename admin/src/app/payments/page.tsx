"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { SearchInput } from "@/components/shared/search-input";
import { DateRangePicker } from "@/components/shared/date-range-picker";
import { QuickDateFilter } from "@/components/shared/quick-date-filter";
import { TrendChart } from "@/components/shared/trend-chart";
import { Pagination } from "@/components/shared/pagination";
import { ExportCsvButton } from "@/components/shared/export-csv-button";
import { usePayments, usePaymentTrends } from "@/hooks/use-payments";
import { formatCurrency, formatDate } from "@/lib/utils";
import { buildUrl } from "@/lib/api";
import { Filter } from "lucide-react";

const statusColors: Record<string, string> = {
  paid: "bg-green-100 text-green-800",
  failed: "bg-red-100 text-red-800",
  pending: "bg-yellow-100 text-yellow-800",
  created: "bg-blue-100 text-blue-800",
};

export default function PaymentsPage() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [source, setSource] = useState("");
  const todayStr = new Date().toISOString().slice(0, 10);
  const [dateFrom, setDateFrom] = useState(todayStr);
  const [dateTo, setDateTo] = useState(todayStr);
  const [amount, setAmount] = useState("");

  const filters = {
    page,
    search: search || undefined,
    status: status || undefined,
    source: source || undefined,
    dateFrom: dateFrom || undefined,
    dateTo: dateTo || undefined,
    amount: amount ? Number(amount) : undefined,
  };

  const { data, isLoading } = usePayments(filters);
  const { data: trendsData, isLoading: trendsLoading } = usePaymentTrends(30);

  const exportUrl = buildUrl("/api/admin/payments", {
    search: search || undefined,
    status: status || undefined,
    source: source || undefined,
    dateFrom: dateFrom || undefined,
    dateTo: dateTo || undefined,
    amount: amount || undefined,
  });

  function clearFilters() {
    setStatus("");
    setSource("");
    setDateFrom("");
    setDateTo("");
    setAmount("");
    setPage(1);
  }

  const hasFilters = status || source || dateFrom || dateTo || amount;

  const filterControls = (
    <div className="space-y-4">
      <div>
        <label className="text-sm font-medium mb-1 block">Status</label>
        <Select value={status} onValueChange={(v: string | null) => { setStatus(!v || v === "all" ? "" : v); setPage(1); }}>
          <SelectTrigger><SelectValue placeholder="All statuses" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All statuses</SelectItem>
            <SelectItem value="paid">Paid</SelectItem>
            <SelectItem value="failed">Failed</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="created">Created</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <label className="text-sm font-medium mb-1 block">Source</label>
        <Select value={source} onValueChange={(v: string | null) => { setSource(!v || v === "all" ? "" : v); setPage(1); }}>
          <SelectTrigger><SelectValue placeholder="All sources" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All sources</SelectItem>
            <SelectItem value="website">Website</SelectItem>
            <SelectItem value="whatsapp">WhatsApp</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <label className="text-sm font-medium mb-1 block">Quick Date</label>
        <QuickDateFilter
          dateFrom={dateFrom}
          dateTo={dateTo}
          onChange={(from, to) => { setDateFrom(from); setDateTo(to); setPage(1); }}
        />
      </div>
      <div>
        <label className="text-sm font-medium mb-1 block">Date Range</label>
        <DateRangePicker
          dateFrom={dateFrom}
          dateTo={dateTo}
          onDateFromChange={(v) => { setDateFrom(v); setPage(1); }}
          onDateToChange={(v) => { setDateTo(v); setPage(1); }}
        />
      </div>
      <div>
        <label className="text-sm font-medium mb-1 block">Amount (₹)</label>
        <Select value={amount} onValueChange={(v: string | null) => { setAmount(!v || v === "all" ? "" : v); setPage(1); }}>
          <SelectTrigger><SelectValue placeholder="All amounts" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All amounts</SelectItem>
            <SelectItem value="199">₹199</SelectItem>
            <SelectItem value="299">₹299</SelectItem>
            <SelectItem value="499">₹499</SelectItem>
            <SelectItem value="799">₹799</SelectItem>
            <SelectItem value="999">₹999</SelectItem>
          </SelectContent>
        </Select>
      </div>
      {hasFilters && (
        <Button variant="ghost" size="sm" onClick={clearFilters} className="w-full">
          Clear filters
        </Button>
      )}
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Payments</h1>
        <ExportCsvButton fetchUrl={exportUrl} filename="payments.csv" dataKey="payments" />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Revenue, Orders & Failed (Last 30 Days)</CardTitle>
        </CardHeader>
        <CardContent>
          {trendsLoading ? (
            <Skeleton className="h-[250px] w-full" />
          ) : (
            <TrendChart data={trendsData?.trends || []} type="revenue" />
          )}
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <div className="flex-1">
              <SearchInput
                placeholder="Search by email, phone, order ID..."
                value={search}
                onChange={(v) => { setSearch(v); setPage(1); }}
              />
            </div>

            <div>
              <Sheet>
                <SheetTrigger render={<Button variant="outline" size="sm" />}>
                  <Filter className="h-4 w-4 mr-1" />
                  Filters
                  {hasFilters && <Badge variant="secondary" className="ml-1">{[status, source, dateFrom, dateTo, amount].filter(Boolean).length}</Badge>}
                </SheetTrigger>
                <SheetContent side="right" className="p-4 overflow-y-auto">
                  <SheetTitle className="mb-4">Filters</SheetTitle>
                  {filterControls}
                </SheetContent>
              </Sheet>
            </div>
          </div>

          {/* Desktop table */}
          <div className="hidden md:block overflow-x-auto">
            {isLoading ? (
              <div className="space-y-2">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Skeleton key={i} className="h-12 w-full" />
                ))}
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-10">#</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Phone</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Source</TableHead>
                    <TableHead>Order ID</TableHead>
                    <TableHead>Payment ID</TableHead>
                    <TableHead>Email Sent</TableHead>
                    <TableHead>Error</TableHead>
                    <TableHead>Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data?.payments.map((p, index) => (
                    <TableRow key={p._id}>
                      <TableCell className="text-muted-foreground">{(data.page - 1) * 50 + index + 1}</TableCell>
                      <TableCell className="font-medium">{p.name || "-"}</TableCell>
                      <TableCell>{p.phone}</TableCell>
                      <TableCell className="max-w-[180px] truncate">{p.email || "-"}</TableCell>
                      <TableCell>{formatCurrency(p.amount)}</TableCell>
                      <TableCell>
                        <Badge variant="secondary" className={statusColors[p.status]}>
                          {p.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {p.source ? (
                          <Badge variant="secondary" className={p.source === "whatsapp" ? "bg-green-100 text-green-800" : "bg-blue-100 text-blue-800"}>
                            {p.source}
                          </Badge>
                        ) : "-"}
                      </TableCell>
                      <TableCell className="text-xs font-mono max-w-[140px] truncate">
                        {p.razorpayOrderId || "-"}
                      </TableCell>
                      <TableCell className="text-xs font-mono max-w-[140px] truncate">
                        {p.razorpayPaymentId || "-"}
                      </TableCell>
                      <TableCell>{p.emailSent ? "Yes" : "No"}</TableCell>
                      <TableCell className="max-w-[180px] truncate text-xs">
                        {p.errorDescription || "-"}
                      </TableCell>
                      <TableCell className="whitespace-nowrap">{formatDate(p.timestamp)}</TableCell>
                    </TableRow>
                  ))}
                  {data?.payments.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={12} className="text-center text-muted-foreground py-8">
                        No payments found
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            )}
          </div>

          {/* Mobile card list */}
          <div className="md:hidden space-y-3">
            {isLoading ? (
              Array.from({ length: 5 }).map((_, i) => (
                <Skeleton key={i} className="h-28 w-full" />
              ))
            ) : (
              data?.payments.map((p, index) => (
                <div key={p._id} className="border rounded-lg p-3 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">#{(data.page - 1) * 50 + index + 1} {p.name || p.phone}</span>
                    <div className="flex items-center gap-1">
                      {p.source && (
                        <Badge variant="secondary" className={p.source === "whatsapp" ? "bg-green-100 text-green-800" : "bg-blue-100 text-blue-800"}>
                          {p.source}
                        </Badge>
                      )}
                      <Badge variant="secondary" className={statusColors[p.status]}>
                        {p.status}
                      </Badge>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold">{formatCurrency(p.amount)}</span>
                    {p.emailSent && (
                      <Badge variant="secondary" className="bg-blue-50 text-blue-700">
                        Email Sent
                      </Badge>
                    )}
                  </div>
                  <div className="text-sm text-muted-foreground space-y-0.5">
                    <div>{p.phone}{p.email ? ` | ${p.email}` : ""}</div>
                    {p.razorpayOrderId && (
                      <div className="text-xs font-mono truncate">Order: {p.razorpayOrderId}</div>
                    )}
                    {p.errorDescription && (
                      <div className="text-xs text-red-600">{p.errorDescription}</div>
                    )}
                    <div className="text-xs">{formatDate(p.timestamp)}</div>
                  </div>
                </div>
              ))
            )}
            {data?.payments.length === 0 && (
              <p className="text-center text-muted-foreground py-8">No payments found</p>
            )}
          </div>

          {data && (
            <div className="mt-4">
              <Pagination
                page={data.page}
                totalPages={data.totalPages}
                onPageChange={setPage}
              />
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
