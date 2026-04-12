"use client";

import { useState } from "react";
import { mutate } from "swr";
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
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { SearchInput } from "@/components/shared/search-input";
import { DateRangePicker } from "@/components/shared/date-range-picker";
import { QuickDateFilter } from "@/components/shared/quick-date-filter";
import { TrendChart } from "@/components/shared/trend-chart";
import { Pagination } from "@/components/shared/pagination";
import { ExportCsvButton } from "@/components/shared/export-csv-button";
import { useProfiles, useProfileTrends, useProfileFacets } from "@/hooks/use-profiles";
import { formatDate } from "@/lib/utils";
import { buildUrl, API_URL } from "@/lib/api";
import { Filter, Trash2Icon } from "lucide-react";
import type { Profile } from "@/lib/types";

export default function CustomersPage() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [gender, setGender] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [occupation, setOccupation] = useState("");
  const [purchaseStatus, setPurchaseStatus] = useState("");
  const [source, setSource] = useState("");
  const todayStr = new Date().toISOString().slice(0, 10);
  const [dateFrom, setDateFrom] = useState(todayStr);
  const [dateTo, setDateTo] = useState(todayStr);

  // Delete state
  const [deleteTarget, setDeleteTarget] = useState<Profile | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const filters = {
    page,
    search: search || undefined,
    gender: gender || undefined,
    city: city || undefined,
    state: state || undefined,
    occupation: occupation || undefined,
    hasPurchasedCourse: purchaseStatus || undefined,
    source: source || undefined,
    dateFrom: dateFrom || undefined,
    dateTo: dateTo || undefined,
  };

  const { data, isLoading } = useProfiles(filters);
  const { data: trendsData, isLoading: trendsLoading } = useProfileTrends(30);
  const { data: facets } = useProfileFacets();

  const exportUrl = buildUrl("/api/admin/profiles", {
    search: search || undefined,
    gender: gender || undefined,
    city: city || undefined,
    state: state || undefined,
    occupation: occupation || undefined,
    hasPurchasedCourse: purchaseStatus || undefined,
    source: source || undefined,
    dateFrom: dateFrom || undefined,
    dateTo: dateTo || undefined,
  });

  function clearFilters() {
    setGender("");
    setCity("");
    setState("");
    setOccupation("");
    setPurchaseStatus("");
    setSource("");
    setDateFrom("");
    setDateTo("");
    setPage(1);
  }

  async function handleDelete() {
    if (!deleteTarget) return;
    setIsDeleting(true);
    try {
      await fetch(`${API_URL}/api/admin/profiles/${deleteTarget._id}`, {
        method: "DELETE",
      });
      setDeleteTarget(null);
      mutate((key: unknown) => typeof key === "string" && key.includes("/api/admin/profiles"));
    } finally {
      setIsDeleting(false);
    }
  }

  const hasFilters = gender || city || state || occupation || purchaseStatus || source || dateFrom || dateTo;

  const filterControls = (
    <div className="space-y-4">
      <div>
        <label className="text-sm font-medium mb-1 block">Gender</label>
        <Select value={gender} onValueChange={(v: string | null) => { setGender(!v || v === "all" ? "" : v); setPage(1); }}>
          <SelectTrigger><SelectValue placeholder="All genders" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All genders</SelectItem>
            {facets?.genders.map((g) => (
              <SelectItem key={g} value={g}>{g}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div>
        <label className="text-sm font-medium mb-1 block">City</label>
        <Select value={city} onValueChange={(v: string | null) => { setCity(!v || v === "all" ? "" : v); setPage(1); }}>
          <SelectTrigger><SelectValue placeholder="All cities" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All cities</SelectItem>
            {facets?.cities.map((c) => (
              <SelectItem key={c} value={c}>{c}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div>
        <label className="text-sm font-medium mb-1 block">State</label>
        <Select value={state} onValueChange={(v: string | null) => { setState(!v || v === "all" ? "" : v); setPage(1); }}>
          <SelectTrigger><SelectValue placeholder="All states" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All states</SelectItem>
            {facets?.states.map((s) => (
              <SelectItem key={s} value={s}>{s}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div>
        <label className="text-sm font-medium mb-1 block">Occupation</label>
        <Select value={occupation} onValueChange={(v: string | null) => { setOccupation(!v || v === "all" ? "" : v); setPage(1); }}>
          <SelectTrigger><SelectValue placeholder="All occupations" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All occupations</SelectItem>
            {facets?.occupations.map((o) => (
              <SelectItem key={o} value={o}>{o}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div>
        <label className="text-sm font-medium mb-1 block">Purchase Status</label>
        <Select value={purchaseStatus} onValueChange={(v: string | null) => { setPurchaseStatus(!v || v === "all" ? "" : v); setPage(1); }}>
          <SelectTrigger><SelectValue placeholder="All" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="true">Purchased</SelectItem>
            <SelectItem value="false">Not Purchased</SelectItem>
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
        <h1 className="text-2xl font-bold">Customers</h1>
        <ExportCsvButton fetchUrl={exportUrl} filename="customers.csv" dataKey="profiles" />
      </div>

      {/* Delete confirmation dialog */}
      <Dialog open={!!deleteTarget} onOpenChange={(open) => { if (!open) setDeleteTarget(null); }}>
        <DialogContent showCloseButton={false}>
          <DialogHeader>
            <DialogTitle>Delete Customer</DialogTitle>
            <DialogDescription>
              This will soft-delete the customer profile. The data is not permanently removed.
            </DialogDescription>
          </DialogHeader>
          {deleteTarget && (
            <div className="px-4 space-y-1 text-sm">
              <div><span className="font-medium">Name:</span> {deleteTarget.name || "—"}</div>
              <div><span className="font-medium">Phone:</span> {deleteTarget.phone}</div>
              <div><span className="font-medium">Email:</span> {deleteTarget.email || "—"}</div>
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

      <Card>
        <CardHeader>
          <CardTitle>Registrations (Last 30 Days)</CardTitle>
        </CardHeader>
        <CardContent>
          {trendsLoading ? (
            <Skeleton className="h-[250px] w-full" />
          ) : (
            <TrendChart data={trendsData?.trends || []} type="registrations" />
          )}
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <div className="flex-1">
              <SearchInput
                placeholder="Search by name, email, phone..."
                value={search}
                onChange={(v) => { setSearch(v); setPage(1); }}
              />
            </div>

            <div>
              <Sheet>
                <SheetTrigger render={<Button variant="outline" size="sm" />}>
                  <Filter className="h-4 w-4 mr-1" />
                  Filters
                  {hasFilters && <Badge variant="secondary" className="ml-1">{[gender, city, state, occupation, purchaseStatus, source, dateFrom].filter(Boolean).length}</Badge>}
                </SheetTrigger>
                <SheetContent side="right" className="p-4 overflow-y-auto">
                  <SheetTitle className="mb-4">Filters</SheetTitle>
                  {filterControls}
                </SheetContent>
              </Sheet>
            </div>
          </div>

          {/* Desktop table */}
          <div className="hidden md:block">
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
                    <TableHead>WhatsApp</TableHead>
                    <TableHead>Gender</TableHead>
                    <TableHead>City</TableHead>
                    <TableHead>State</TableHead>
                    <TableHead>Occupation</TableHead>
                    <TableHead>Source</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead className="w-10">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data?.profiles.map((p, index) => (
                    <TableRow key={p._id}>
                      <TableCell className="text-muted-foreground">{(data.page - 1) * 50 + index + 1}</TableCell>
                      <TableCell className="font-medium">{p.name || "-"}</TableCell>
                      <TableCell>{p.phone}</TableCell>
                      <TableCell className="max-w-[200px] truncate">{p.email || "-"}</TableCell>
                      <TableCell>{p.whatsappPhone || "-"}</TableCell>
                      <TableCell>{p.gender || "-"}</TableCell>
                      <TableCell>{p.city || "-"}</TableCell>
                      <TableCell>{p.state || "-"}</TableCell>
                      <TableCell>{p.occupation || "-"}</TableCell>
                      <TableCell>
                        {p.source ? (
                          <Badge variant="secondary" className={p.source === "whatsapp" ? "bg-green-100 text-green-800" : "bg-blue-100 text-blue-800"}>
                            {p.source}
                          </Badge>
                        ) : "-"}
                      </TableCell>
                      <TableCell>
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
                      </TableCell>
                      <TableCell className="whitespace-nowrap">{formatDate(p.timestamp)}</TableCell>
                      <TableCell>
                        <Button
                          variant="ghost"
                          size="icon-sm"
                          className="text-destructive hover:text-destructive"
                          onClick={() => setDeleteTarget(p)}
                        >
                          <Trash2Icon className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                  {data?.profiles.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={13} className="text-center text-muted-foreground py-8">
                        No customers found
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
                <Skeleton key={i} className="h-24 w-full" />
              ))
            ) : (
              data?.profiles.map((p, index) => (
                <div key={p._id} className="border rounded-lg p-3 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">#{(data.page - 1) * 50 + index + 1} {p.name || p.phone}</span>
                    <div className="flex items-center gap-2">
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
                      <Button
                        variant="ghost"
                        size="icon-sm"
                        className="text-destructive hover:text-destructive"
                        onClick={() => setDeleteTarget(p)}
                      >
                        <Trash2Icon className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="text-sm text-muted-foreground space-y-0.5">
                    <div>{p.phone}{p.email ? ` | ${p.email}` : ""}</div>
                    {p.city && <div>{p.city}{p.state ? `, ${p.state}` : ""}</div>}
                    {p.gender && <div>{p.gender}{p.occupation ? ` | ${p.occupation}` : ""}</div>}
                    {p.source && <div className="text-xs capitalize">{p.source}</div>}
                    <div className="text-xs">{formatDate(p.timestamp)}</div>
                  </div>
                </div>
              ))
            )}
            {data?.profiles.length === 0 && (
              <p className="text-center text-muted-foreground py-8">No customers found</p>
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
