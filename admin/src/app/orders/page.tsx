"use client";

import { useState } from "react";
import { mutate } from "swr";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { SearchInput } from "@/components/shared/search-input";
import { DateRangePicker } from "@/components/shared/date-range-picker";
import { QuickDateFilter } from "@/components/shared/quick-date-filter";
import { TrendChart } from "@/components/shared/trend-chart";
import { Pagination } from "@/components/shared/pagination";
import { ExportCsvButton } from "@/components/shared/export-csv-button";
import { useOrders } from "@/hooks/use-orders";
import { usePaymentTrends } from "@/hooks/use-payments";
import { useMetaAdsSummary, useMetaAdsDaily } from "@/hooks/use-meta-ads";
import { formatCurrency, formatDate } from "@/lib/utils";
import { buildUrl, API_URL } from "@/lib/api";
import { Filter, PlusIcon, Trash2Icon } from "lucide-react";
import type { Order } from "@/lib/types";

const INDIAN_STATES = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
  "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka",
  "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram",
  "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu",
  "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal",
  "Delhi", "Jammu and Kashmir", "Ladakh", "Puducherry", "Chandigarh",
];

export default function OrdersPage() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [gender, setGender] = useState("");
  const [state, setState] = useState("");
  const [source, setSource] = useState("");
  const todayStr = new Date().toISOString().slice(0, 10);
  const [dateFrom, setDateFrom] = useState(todayStr);
  const [dateTo, setDateTo] = useState(todayStr);
  const [amount, setAmount] = useState("");

  // Create order state
  const [createOpen, setCreateOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [createPhone, setCreatePhone] = useState("");
  const [createAmount, setCreateAmount] = useState("");
  const [createName, setCreateName] = useState("");
  const [createEmail, setCreateEmail] = useState("");
  const [createWhatsapp, setCreateWhatsapp] = useState("");
  const [createRemark, setCreateRemark] = useState("");
  const [createGender, setCreateGender] = useState("");
  const [createCity, setCreateCity] = useState("");
  const [createState, setCreateState] = useState("");
  const [createOccupation, setCreateOccupation] = useState("");

  // Delete order state
  const [deleteTarget, setDeleteTarget] = useState<Order | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const filters = {
    page,
    search: search || undefined,
    gender: gender || undefined,
    state: state || undefined,
    source: source || undefined,
    dateFrom: dateFrom || undefined,
    dateTo: dateTo || undefined,
    amount: amount ? Number(amount) : undefined,
  };

  const { data, isLoading } = useOrders(filters);
  const { data: trendsData, isLoading: trendsLoading } = usePaymentTrends(30);
  const { data: metaAdsSummary } = useMetaAdsSummary({ dateFrom, dateTo });
  const { data: metaAdsDaily } = useMetaAdsDaily({ dateFrom, dateTo });

  const exportUrl = buildUrl("/api/admin/orders", {
    search: search || undefined,
    gender: gender || undefined,
    state: state || undefined,
    source: source || undefined,
    dateFrom: dateFrom || undefined,
    dateTo: dateTo || undefined,
    amount: amount || undefined,
  });

  function clearFilters() {
    setGender("");
    setState("");
    setSource("");
    setDateFrom("");
    setDateTo("");
    setAmount("");
    setPage(1);
  }

  function resetCreateForm() {
    setCreatePhone("");
    setCreateAmount("");
    setCreateName("");
    setCreateEmail("");
    setCreateWhatsapp("");
    setCreateRemark("");
    setCreateGender("");
    setCreateCity("");
    setCreateState("");
    setCreateOccupation("");
  }

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    if (!createPhone || !createAmount) return;
    setIsSubmitting(true);
    try {
      await fetch(`${API_URL}/api/admin/orders`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          phone: createPhone,
          amount: Number(createAmount),
          name: createName || undefined,
          email: createEmail || undefined,
          whatsappPhone: createWhatsapp || undefined,
          remark: createRemark || undefined,
          gender: createGender || undefined,
          city: createCity || undefined,
          state: createState || undefined,
          occupation: createOccupation || undefined,
          source: "whatsapp",
        }),
      });
      resetCreateForm();
      setCreateOpen(false);
      mutate((key: unknown) => typeof key === "string" && key.includes("/api/admin/orders"));
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleDelete() {
    if (!deleteTarget) return;
    setIsDeleting(true);
    try {
      await fetch(`${API_URL}/api/admin/payments/${deleteTarget._id}`, {
        method: "DELETE",
      });
      setDeleteTarget(null);
      mutate((key: unknown) => typeof key === "string" && key.includes("/api/admin/orders"));
    } finally {
      setIsDeleting(false);
    }
  }

  const hasFilters = gender || state || source || dateFrom || dateTo || amount;

  const totalRevenue = data?.totalRevenue ?? 0;
  const avgOrderValue = data?.avgOrderValue ?? 0;
  const totalProfit = totalRevenue - (metaAdsSummary?.totalSpend ?? 0);

  const filterControls = (
    <div className="space-y-4">
      <div>
        <label className="text-sm font-medium mb-1 block">Gender</label>
        <Select value={gender} onValueChange={(v: string | null) => { setGender(!v || v === "all" ? "" : v); setPage(1); }}>
          <SelectTrigger><SelectValue placeholder="All genders" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All genders</SelectItem>
            <SelectItem value="Female">Female</SelectItem>
            <SelectItem value="Male">Male</SelectItem>
            <SelectItem value="Other">Other</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <label className="text-sm font-medium mb-1 block">State</label>
        <Select value={state} onValueChange={(v: string | null) => { setState(!v || v === "all" ? "" : v); setPage(1); }}>
          <SelectTrigger><SelectValue placeholder="All states" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All states</SelectItem>
            {INDIAN_STATES.map((s) => (
              <SelectItem key={s} value={s}>{s}</SelectItem>
            ))}
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
        <h1 className="text-2xl font-bold">Orders</h1>
        <div className="flex items-center gap-2">
          <Sheet open={createOpen} onOpenChange={setCreateOpen}>
            <SheetTrigger render={<Button size="sm" />}>
              <PlusIcon className="h-4 w-4 mr-1" />
              Create Order
            </SheetTrigger>
            <SheetContent side="right" className="p-0 overflow-y-auto w-full sm:max-w-md">
              <form onSubmit={handleCreate} className="flex flex-col h-full">
                <SheetHeader className="p-4 border-b">
                  <SheetTitle>Create Order</SheetTitle>
                  <SheetDescription>Manually add a WhatsApp or walk-in order.</SheetDescription>
                </SheetHeader>
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">Source:</span>
                    <Badge className="bg-green-100 text-green-800">whatsapp</Badge>
                  </div>
                  <div className="space-y-3">
                    <p className="text-xs font-semibold uppercase text-muted-foreground tracking-wide">Required</p>
                    <div>
                      <label className="text-sm font-medium mb-1 block">Phone *</label>
                      <input
                        className="w-full border rounded-md px-3 py-2 text-sm"
                        type="tel"
                        placeholder="10-digit phone"
                        value={createPhone}
                        onChange={(e) => setCreatePhone(e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-1 block">Amount (₹) *</label>
                      <input
                        className="w-full border rounded-md px-3 py-2 text-sm"
                        type="number"
                        placeholder="e.g. 499"
                        value={createAmount}
                        onChange={(e) => setCreateAmount(e.target.value)}
                        required
                        min={1}
                      />
                    </div>
                  </div>
                  <div className="space-y-3">
                    <p className="text-xs font-semibold uppercase text-muted-foreground tracking-wide">Contact (optional)</p>
                    <div>
                      <label className="text-sm font-medium mb-1 block">Name</label>
                      <input
                        className="w-full border rounded-md px-3 py-2 text-sm"
                        placeholder="Customer name"
                        value={createName}
                        onChange={(e) => setCreateName(e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-1 block">Email</label>
                      <input
                        className="w-full border rounded-md px-3 py-2 text-sm"
                        type="email"
                        placeholder="email@example.com"
                        value={createEmail}
                        onChange={(e) => setCreateEmail(e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-1 block">WhatsApp Phone</label>
                      <input
                        className="w-full border rounded-md px-3 py-2 text-sm"
                        type="tel"
                        placeholder="If different from phone"
                        value={createWhatsapp}
                        onChange={(e) => setCreateWhatsapp(e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-1 block">Remark</label>
                      <input
                        className="w-full border rounded-md px-3 py-2 text-sm"
                        placeholder="Internal note"
                        value={createRemark}
                        onChange={(e) => setCreateRemark(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="space-y-3">
                    <p className="text-xs font-semibold uppercase text-muted-foreground tracking-wide">Profile (optional)</p>
                    <div>
                      <label className="text-sm font-medium mb-1 block">Gender</label>
                      <Select value={createGender} onValueChange={(v: string | null) => setCreateGender(!v || v === "none" ? "" : v)}>
                        <SelectTrigger><SelectValue placeholder="Select gender" /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="none">—</SelectItem>
                          <SelectItem value="Female">Female</SelectItem>
                          <SelectItem value="Male">Male</SelectItem>
                          <SelectItem value="Other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-1 block">City</label>
                      <input
                        className="w-full border rounded-md px-3 py-2 text-sm"
                        placeholder="City"
                        value={createCity}
                        onChange={(e) => setCreateCity(e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-1 block">State</label>
                      <Select value={createState} onValueChange={(v: string | null) => setCreateState(!v || v === "none" ? "" : v)}>
                        <SelectTrigger><SelectValue placeholder="Select state" /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="none">—</SelectItem>
                          {INDIAN_STATES.map((s) => (
                            <SelectItem key={s} value={s}>{s}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-1 block">Occupation</label>
                      <input
                        className="w-full border rounded-md px-3 py-2 text-sm"
                        placeholder="Occupation"
                        value={createOccupation}
                        onChange={(e) => setCreateOccupation(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
                <SheetFooter className="border-t">
                  <SheetClose render={<Button type="button" variant="outline" />}>Cancel</SheetClose>
                  <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Saving..." : "Submit"}
                  </Button>
                </SheetFooter>
              </form>
            </SheetContent>
          </Sheet>
          <ExportCsvButton fetchUrl={exportUrl} filename="orders.csv" dataKey="orders" />
        </div>
      </div>

      {/* Delete confirmation dialog */}
      <Dialog open={!!deleteTarget} onOpenChange={(open) => { if (!open) setDeleteTarget(null); }}>
        <DialogContent showCloseButton={false}>
          <DialogHeader>
            <DialogTitle>Delete Order</DialogTitle>
            <DialogDescription>
              This will soft-delete the order and its linked profile. The data is not permanently removed.
            </DialogDescription>
          </DialogHeader>
          {deleteTarget && (
            <div className="px-4 space-y-1 text-sm">
              <div><span className="font-medium">Name:</span> {deleteTarget.name || "—"}</div>
              <div><span className="font-medium">Phone:</span> {deleteTarget.phone}</div>
              <div><span className="font-medium">Amount:</span> {formatCurrency(deleteTarget.amount)}</div>
              <div><span className="font-medium">Date:</span> {formatDate(deleteTarget.timestamp)}</div>
            </div>
          )}
          <DialogFooter>
            <DialogClose render={<Button variant="outline" />}>Cancel</DialogClose>
            <Button variant="destructive" onClick={handleDelete} disabled={isDeleting}>
              {isDeleting ? "Deleting..." : "Delete"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Summary stat cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-sm text-muted-foreground">Total Orders</div>
            <div className="text-2xl font-bold">{data?.total ?? "-"}</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-sm text-muted-foreground">Total Revenue</div>
            <div className="text-2xl font-bold">{formatCurrency(totalRevenue)}</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-sm text-muted-foreground">Avg Order Value</div>
            <div className="text-2xl font-bold">{data?.total ? formatCurrency(avgOrderValue) : "-"}</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-sm text-muted-foreground">Total Profit</div>
            <div className={`text-2xl font-bold ${totalProfit < 0 ? "text-destructive" : ""}`}>
              {formatCurrency(totalProfit)}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Revenue, Orders & Failed (Last 30 Days)</CardTitle>
        </CardHeader>
        <CardContent>
          {trendsLoading ? (
            <Skeleton className="h-[250px] w-full" />
          ) : (
            <TrendChart
              data={(trendsData?.trends || []).map((point) => {
                const spend = metaAdsDaily?.daily?.find((d) => d.date === point.date)?.spend ?? 0;
                return { ...point, spend, profit: point.revenue - spend };
              })}
              type="revenue"
              showSpend
              showProfit
            />
          )}
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <div className="flex-1">
              <SearchInput
                placeholder="Search by name, phone, email..."
                value={search}
                onChange={(v) => { setSearch(v); setPage(1); }}
              />
            </div>

            <div>
              <Sheet>
                <SheetTrigger render={<Button variant="outline" size="sm" />}>
                  <Filter className="h-4 w-4 mr-1" />
                  Filters
                  {hasFilters && <Badge variant="secondary" className="ml-1">{[gender, state, source, dateFrom, dateTo, amount].filter(Boolean).length}</Badge>}
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
                    <TableHead>Source</TableHead>
                    <TableHead>WhatsApp</TableHead>
                    <TableHead>Gender</TableHead>
                    <TableHead>City</TableHead>
                    <TableHead>State</TableHead>
                    <TableHead>Occupation</TableHead>
                    <TableHead>Payment ID</TableHead>
                    <TableHead>Order ID</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead className="w-10">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data?.orders.map((o, index) => (
                    <TableRow key={o._id}>
                      <TableCell className="text-muted-foreground">{(data.page - 1) * 50 + index + 1}</TableCell>
                      <TableCell className="font-medium">{o.name || "-"}</TableCell>
                      <TableCell>{o.phone}</TableCell>
                      <TableCell className="max-w-[180px] truncate">{o.email || "-"}</TableCell>
                      <TableCell>{formatCurrency(o.amount)}</TableCell>
                      <TableCell>
                        {o.source ? (
                          <Badge variant="secondary" className={o.source === "whatsapp" ? "bg-green-100 text-green-800" : "bg-blue-100 text-blue-800"}>
                            {o.source}
                          </Badge>
                        ) : "-"}
                      </TableCell>
                      <TableCell>{o.whatsappPhone || "-"}</TableCell>
                      <TableCell>{o.gender || "-"}</TableCell>
                      <TableCell>{o.city || "-"}</TableCell>
                      <TableCell>{o.state || "-"}</TableCell>
                      <TableCell>{o.occupation || "-"}</TableCell>
                      <TableCell className="text-xs font-mono max-w-[140px] truncate">
                        {o.razorpayPaymentId || "-"}
                      </TableCell>
                      <TableCell className="text-xs font-mono max-w-[140px] truncate">
                        {o.razorpayOrderId || "-"}
                      </TableCell>
                      <TableCell className="whitespace-nowrap">{formatDate(o.timestamp)}</TableCell>
                      <TableCell>
                        <Button
                          variant="ghost"
                          size="icon-sm"
                          className="text-destructive hover:text-destructive"
                          onClick={() => setDeleteTarget(o)}
                        >
                          <Trash2Icon className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                  {data?.orders.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={15} className="text-center text-muted-foreground py-8">
                        No orders found
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
              data?.orders.map((o, index) => (
                <div key={o._id} className="border rounded-lg p-3 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">#{(data.page - 1) * 50 + index + 1} {o.name || o.phone}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-bold">{formatCurrency(o.amount)}</span>
                      <Button
                        variant="ghost"
                        size="icon-sm"
                        className="text-destructive hover:text-destructive"
                        onClick={() => setDeleteTarget(o)}
                      >
                        <Trash2Icon className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="text-sm text-muted-foreground space-y-0.5">
                    <div>{o.phone}{o.email ? ` | ${o.email}` : ""}</div>
                    {(o.city || o.state) && <div>{[o.city, o.state].filter(Boolean).join(", ")}</div>}
                    {o.gender && <div>{o.gender}{o.occupation ? ` | ${o.occupation}` : ""}</div>}
                    {o.source && <div className="text-xs capitalize">{o.source}</div>}
                    <div className="text-xs">{formatDate(o.timestamp)}</div>
                  </div>
                </div>
              ))
            )}
            {data?.orders.length === 0 && (
              <p className="text-center text-muted-foreground py-8">No orders found</p>
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
