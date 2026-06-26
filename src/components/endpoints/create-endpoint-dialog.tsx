"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { createEndpoint } from "@/actions/endpoint/create-endpoint";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Plus, Link2, Clock3, Globe, Loader2, Send } from "lucide-react";

import { toast } from "sonner";
import { EndpointSchema } from "@/validators/endpoint-validator";

interface Props {
  projectId?: string;
}

export default function AddEndpointDialog({ projectId }: Props) {
  const router = useRouter();

  const [open, setOpen] = useState(false);

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    url: "",
    method: "GET",
    interval: "5m",
  });

  async function handleSubmit() {
    const validated = EndpointSchema.safeParse(form);

    if (!validated.success) {
      toast.error(validated.error.issues[0]?.message ?? "Validation failed");

      return;
    }

    setLoading(true);

    try {
      const result = await createEndpoint(projectId ?? null, validated.data);

      if (!result.success) {
        toast.error(result.message || "Failed to create endpoint");

        return;
      }

      toast.success(`${form.name} created successfully`);

      setOpen(false);

      setForm({
        name: "",
        url: "",
        method: "GET",
        interval: "5m",
      });

      router.refresh();
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Add Endpoint
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <Globe className="h-5 w-5 text-primary" />
            Create Endpoint
          </DialogTitle>

          <DialogDescription>
            Monitor an API endpoint and receive status updates in real-time.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-5 py-2">
          {/* Endpoint Name */}
          <div className="space-y-2">
            <Label>Endpoint Name</Label>

            <Input
              placeholder="Users API"
              value={form.name}
              onChange={(e) =>
                setForm({
                  ...form,
                  name: e.target.value,
                })
              }
            />
          </div>

          {/* Endpoint URL */}
          <div className="space-y-2">
            <Label>Endpoint URL</Label>

            <div className="relative">
              <Link2 className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

              <Input
                className="pl-9"
                placeholder="https://api.example.com/users"
                value={form.url}
                onChange={(e) =>
                  setForm({
                    ...form,
                    url: e.target.value,
                  })
                }
              />
            </div>
          </div>

          {/* Method + Interval */}
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label>Request Method</Label>

              <Select
                value={form.method}
                onValueChange={(value) =>
                  setForm({
                    ...form,
                    method: value,
                  })
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="GET">GET</SelectItem>

                  <SelectItem value="POST">POST</SelectItem>

                  <SelectItem value="PUT">PUT</SelectItem>

                  <SelectItem value="PATCH">PATCH</SelectItem>

                  <SelectItem value="DELETE">DELETE</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Check Interval</Label>

              <Select
                value={form.interval}
                onValueChange={(value) =>
                  setForm({
                    ...form,
                    interval: value,
                  })
                }
              >
                <SelectTrigger>
                  <Clock3 className="mr-2 h-4 w-4 text-muted-foreground" />
                  <SelectValue />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="1m">Every 1 Minute</SelectItem>

                  <SelectItem value="5m">Every 5 Minutes</SelectItem>

                  <SelectItem value="15m">Every 15 Minutes</SelectItem>

                  <SelectItem value="30m">Every 30 Minutes</SelectItem>

                  <SelectItem value="1h">Every 1 Hour</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Info Box */}
          <div className="rounded-xl border bg-muted/30 p-4 text-sm text-muted-foreground">
            PingoAPI will periodically ping this endpoint and monitor:
            <ul className="mt-2 list-disc pl-5 space-y-1">
              <li>Uptime Status</li>
              <li>Response Time</li>
              <li>Downtime Events</li>
              <li>Health Checks</li>
            </ul>
          </div>

          <Button
            className="w-full gap-2"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Creating Endpoint...
              </>
            ) : (
              <>
                <Send className="h-4 w-4" />
                Create Endpoint
              </>
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
