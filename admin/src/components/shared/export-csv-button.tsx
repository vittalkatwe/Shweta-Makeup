"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { exportToCsv } from "@/lib/utils";

interface ExportCsvButtonProps {
  fetchUrl: string;
  filename: string;
  dataKey: "payments" | "profiles" | "orders";
}

export function ExportCsvButton({ fetchUrl, filename, dataKey }: ExportCsvButtonProps) {
  const [loading, setLoading] = useState(false);

  async function handleExport() {
    setLoading(true);
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001";
      // Fetch all records (high limit)
      const url = new URL(`${apiUrl}${fetchUrl}`);
      url.searchParams.set("limit", "10000");
      url.searchParams.set("page", "1");

      const res = await fetch(url.toString());
      const data = await res.json();
      const rows = data[dataKey] || [];
      if (rows.length > 0) {
        exportToCsv(filename, rows);
      }
    } catch (err) {
      console.error("Export failed:", err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Button variant="outline" size="sm" onClick={handleExport} disabled={loading}>
      <Download className="h-4 w-4 mr-1" />
      {loading ? "Exporting..." : "Export CSV"}
    </Button>
  );
}
