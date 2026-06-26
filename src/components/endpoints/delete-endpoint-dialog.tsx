"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import {
  Trash2,
  Loader2,
  AlertTriangle,
} from "lucide-react";

import { toast } from "sonner";

import { deleteEndpoint } from "@/actions/endpoint/delete-endpoint";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface Props {
  endpointId: string;
  projectId: string;
}

export default function DeleteEndpointDialog({
  endpointId,
  projectId,
}: Props) {
  const router = useRouter();

  const [open, setOpen] =
    useState(false);

  const [loading, setLoading] =
    useState(false);

  const [confirmation, setConfirmation] =
    useState("");

  async function handleDelete() {
    setLoading(true);

    try {
      const result =
        await deleteEndpoint(
          endpointId,
          projectId
        );

      if (!result.success) {
        toast.error(
          result.message ||
            "Failed to delete endpoint"
        );

        return;
      }

      toast.success(
        "Endpoint deleted successfully"
      );

      setConfirmation("");
      setOpen(false);

      router.refresh();
    } catch {
      toast.error(
        "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(value) => {
        setOpen(value);

        if (!value) {
          setConfirmation("");
        }
      }}
    >
      <DialogTrigger asChild>
        <Button
          size="sm"
          variant="destructive"
          className="gap-2"
        >
          <Trash2 className="h-4 w-4" />
          Delete
        </Button>
      </DialogTrigger>

      <DialogContent className="overflow-hidden p-0 sm:max-w-lg">
        <div className="border-b bg-red-500/5 px-6 py-5">
          <DialogHeader className="space-y-0">
            <div className="flex items-start gap-4">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-red-500/20 bg-red-500/10">
                <AlertTriangle className="h-7 w-7 text-red-500" />
              </div>

              <div className="space-y-1">
                <DialogTitle className="text-xl">
                  Delete Endpoint
                </DialogTitle>

                <DialogDescription>
                  This action is permanent and
                  cannot be undone.
                </DialogDescription>
              </div>
            </div>
          </DialogHeader>
        </div>

        <div className="space-y-5 px-6 py-5">
          <div className="rounded-xl border border-red-500/20 bg-red-500/5 p-4">
            <div className="flex gap-3">
              <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-red-500" />

              <div className="space-y-2 text-sm">
                <p className="font-medium text-foreground">
                  The following data will be
                  permanently deleted:
                </p>

                <ul className="list-disc space-y-1 pl-4 text-muted-foreground">
                  <li>
                    Endpoint configuration
                  </li>
                  <li>
                    Monitoring history
                  </li>
                  <li>
                    Activity logs
                  </li>
                  <li>
                    Uptime statistics
                  </li>
                  <li>
                    Response time records
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="rounded-xl border bg-muted/40 p-4">
            <p className="mb-3 text-sm text-muted-foreground">
              To confirm deletion, type
              <span className="mx-1 rounded bg-background px-2 py-1 font-mono font-semibold text-foreground">
                DELETE
              </span>
              below.
            </p>

            <Input
              value={confirmation}
              onChange={(e) =>
                setConfirmation(
                  e.target.value
                )
              }
              placeholder="Type DELETE"
              autoComplete="off"
            />
          </div>
        </div>

        <DialogFooter className="border-t px-6 py-4">
          <div className="flex w-full flex-col-reverse gap-2 sm:flex-row sm:justify-end">
            <Button
              variant="outline"
              disabled={loading}
              onClick={() =>
                setOpen(false)
              }
            >
              Cancel
            </Button>

            <Button
              variant="destructive"
              disabled={
                loading ||
                confirmation !==
                  "DELETE"
              }
              onClick={handleDelete}
              className="min-w-47.5"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Deleting...
                </>
              ) : (
                <>
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete Permanently
                </>
              )}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}