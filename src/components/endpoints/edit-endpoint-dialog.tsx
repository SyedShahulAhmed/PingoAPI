"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { updateEndpoint } from "@/actions/endpoint/update-endpoint";

import { EndpointSchema } from "@/validators/endpoint-validator";

import { toast } from "sonner";

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

import { Pencil, Link2, Clock3, Globe, Loader2, Save } from "lucide-react";

interface Props {
  endpoint: any;
}

export default function EditEndpointDialog({ endpoint }: Props) {
  const router = useRouter();

  const [open, setOpen] = useState(false);

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: endpoint.name,
    url: endpoint.url,
    method: endpoint.method,
    interval: endpoint.interval,
  });

  async function handleUpdate() {
    const validated = EndpointSchema.safeParse(form);

    if (!validated.success) {
      toast.error(validated.error.issues[0]?.message || "Validation failed");

      return;
    }

    setLoading(true);

    try {
      const result = await updateEndpoint(
        endpoint._id,
        endpoint.projectId,
        validated.data,
      );

      if (!result.success) {
        toast.error("Failed to update endpoint");

        return;
      }

      toast.success("Endpoint updated successfully");

      setOpen(false);

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
        <Button size="sm" variant="outline" className="gap-2">
          <Pencil className="h-4 w-4" />
          Edit
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <Globe className="h-5 w-5 text-primary" />
            Edit Endpoint
          </DialogTitle>

          <DialogDescription>
            Update endpoint settings and monitoring configuration.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-5 py-2">
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

                  <SelectItem value="1h">Every 1 Hour</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button
            className="w-full gap-2"
            disabled={loading}
            onClick={handleUpdate}
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Updating Endpoint...
              </>
            ) : (
              <>
                <Save className="h-4 w-4" />
                Save Changes
              </>
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
