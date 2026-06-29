"use client";

import { useMemo, useState } from "react";

import { CheckCircle2, XCircle, Filter } from "lucide-react";

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

interface Props {
  logs: any[];
}

type StatusFilter = "ALL" | "SUCCESS" | "FAILED";

type PeriodFilter = "1H" | "24H" | "7D" | "30D" | "ALL";

function formatDate(date: string) {
  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(date));
}
export default function ChecksTable({ logs }: Props) {
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("ALL");

  const [periodFilter, setPeriodFilter] = useState<PeriodFilter>("24H");

  const filteredLogs = useMemo(() => {
    let result = [...logs];

    if (statusFilter === "SUCCESS") {
      result = result.filter((log) => log.success);
    }

    if (statusFilter === "FAILED") {
      result = result.filter((log) => !log.success);
    }

    if (periodFilter !== "ALL") {
      const now = new Date().getTime();

      const periods = {
        "1H": 60 * 60 * 1000,
        "24H": 24 * 60 * 60 * 1000,
        "7D": 7 * 24 * 60 * 60 * 1000,
        "30D": 30 * 24 * 60 * 60 * 1000,
      };

      result = result.filter((log) => {
        if (!log.checkedAt) return false;

        const checkedAt = new Date(log.checkedAt).getTime();

        return now - checkedAt <= periods[periodFilter];
      });
    }

    return result;
  }, [logs, statusFilter, periodFilter]);

  if (!logs?.length) {
    return (
      <div className="rounded-xl border p-10 text-center">
        <h3 className="text-lg font-semibold">No Monitoring Data Yet</h3>

        <p className="mt-2 text-muted-foreground">
          The monitoring worker has not checked this endpoint yet.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border">
      <div className="flex flex-col gap-4 border-b p-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h3 className="text-lg font-semibold">Monitoring History</h3>

          <p className="text-sm text-muted-foreground">
            Showing {filteredLogs.length} checks
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-muted-foreground" />

            <span className="text-sm text-muted-foreground">Filters</span>
          </div>

          <Select
            value={statusFilter}
            onValueChange={(value) => setStatusFilter(value as StatusFilter)}
          >
            <SelectTrigger className="w-35">
              <SelectValue />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="ALL">All Status</SelectItem>

              <SelectItem value="SUCCESS">Success</SelectItem>

              <SelectItem value="FAILED">Failed</SelectItem>
            </SelectContent>
          </Select>

          <Select
            value={periodFilter}
            onValueChange={(value) => setPeriodFilter(value as PeriodFilter)}
          >
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="1H">Last Hour</SelectItem>

              <SelectItem value="24H">Last 24 Hours</SelectItem>

              <SelectItem value="7D">Last 7 Days</SelectItem>

              <SelectItem value="30D">Last 30 Days</SelectItem>

              <SelectItem value="ALL">All Time</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {filteredLogs.length === 0 ? (
        <div className="p-10 text-center">
          <h3 className="font-semibold">No Logs Found</h3>

          <p className="mt-2 text-muted-foreground">
            No monitoring checks match the selected filters.
          </p>
        </div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Checked At</TableHead>

              <TableHead>Status Code</TableHead>

              <TableHead>Response Time</TableHead>

              <TableHead>Result</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {filteredLogs.map((log) => (
              <TableRow key={log._id}>
                <TableCell>
                  {log.checkedAt ? formatDate(log.checkedAt) : "Unknown"}
                </TableCell>

                <TableCell>{log.statusCode ?? "---"}</TableCell>

                <TableCell>
                  {log.responseTime ? `${log.responseTime} ms` : "---"}
                </TableCell>

                <TableCell>
                  <span
                    className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium ${
                      log.success
                        ? "bg-green-500/10 text-green-500"
                        : "bg-red-500/10 text-red-500"
                    }`}
                  >
                    {log.success ? (
                      <CheckCircle2 className="h-3 w-3" />
                    ) : (
                      <XCircle className="h-3 w-3" />
                    )}

                    {log.success ? "SUCCESS" : "FAILED"}
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
}
