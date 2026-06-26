"use client";

import { useState } from "react";

import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";

import { Label } from "@/components/ui/label";

import {
  Dialog,
  DialogContent,
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
import { createEndpoint } from "@/actions/endpoint/create-endpoint";

interface Props {
  projectId: string;
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
    setLoading(true);

    const result = await createEndpoint(projectId, form);

    setLoading(false);

    if (result.success) {
      setOpen(false);

      setForm({
        name: "",
        url: "",
        method: "GET",
        interval: "5m",
      });

      router.refresh();
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Add Endpoint</Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Endpoint</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <Label>Name</Label>

            <Input
              value={form.name}
              onChange={(e) =>
                setForm({
                  ...form,
                  name: e.target.value,
                })
              }
            />
          </div>

          <div>
            <Label>URL</Label>

            <Input
              value={form.url}
              onChange={(e) =>
                setForm({
                  ...form,
                  url: e.target.value,
                })
              }
            />
          </div>

          <div>
            <Label>Method</Label>

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

          <div>
            <Label>Interval</Label>

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
                <SelectValue />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="1m">1 Minute</SelectItem>

                <SelectItem value="5m">5 Minutes</SelectItem>

                <SelectItem value="1h">1 Hour</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button className="w-full" onClick={handleSubmit} disabled={loading}>
            {loading ? "Creating..." : "Create Endpoint"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
