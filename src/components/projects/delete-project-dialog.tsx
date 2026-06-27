"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import {
  Loader2,
  Trash2,
  TriangleAlert,
} from "lucide-react";

import { toast } from "sonner";

import { deleteProject } from "@/actions/project/delete-project";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface Props {
  projectId: string;
}

export default function DeleteProjectDialog({
  projectId,
}: Props) {
  const router = useRouter();

  const [loading, setLoading] =
    useState(false);

  const [confirmation, setConfirmation] =
    useState("");

  async function handleDelete() {
    if (
      confirmation !== "DELETE"
    ) {
      return;
    }

    setLoading(true);

    try {
      const result =
        await deleteProject(
          projectId
        );

      if (result.success) {
        toast.success(
          "Project deleted",
          {
            description:
              "The project and all associated monitoring data have been permanently removed.",
          }
        );

        router.refresh();
      } else {
        toast.error(
          "Delete failed",
          {
            description:
              result.message ||
              "Something went wrong while deleting the project.",
          }
        );
      }
    } catch {
      toast.error(
        "Delete failed",
        {
          description:
            "Something went wrong while deleting the project.",
        }
      );
    } finally {
      setLoading(false);
      setConfirmation("");
    }
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          size="sm"
          variant="destructive"
          className="gap-2"
        >
          <Trash2 className="h-4 w-4" />
          Delete
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent className="sm:max-w-lg">
        <AlertDialogHeader>
          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl border border-destructive/20 bg-destructive/10">
            <TriangleAlert className="h-7 w-7 text-destructive" />
          </div>

          <AlertDialogTitle className="text-xl">
            Delete Project
          </AlertDialogTitle>

          <AlertDialogDescription>
            This action is permanent and
            cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <div className="space-y-4">
          <div className="rounded-xl border border-destructive/20 bg-destructive/5 p-4">
            <p className="mb-3 font-medium text-foreground">
              The following data will be
              permanently deleted:
            </p>

            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                • All endpoints inside this
                project
              </li>

              <li>
                • Activity logs and
                monitoring history
              </li>

              <li>
                • Uptime statistics and
                response time data
              </li>

              <li>
                • Health check records
              </li>

              <li>
                • Endpoint status history
              </li>

              <li>
                • Project configuration and
                settings
              </li>
            </ul>
          </div>

          <div className="rounded-xl border p-4">
            <p className="mb-3 text-sm text-muted-foreground">
              To confirm deletion, type
              <span className="mx-1 rounded bg-muted px-2 py-1 font-mono font-semibold text-foreground">
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

        <AlertDialogFooter className="mt-2">
          <AlertDialogCancel
            disabled={loading}
          >
            Cancel
          </AlertDialogCancel>

          <AlertDialogAction
            onClick={(e) => {
              e.preventDefault();
              handleDelete();
            }}
            disabled={
              loading ||
              confirmation !==
                "DELETE"
            }
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Deleting...
              </>
            ) : (
              <>
                <Trash2 className="mr-2 h-4 w-4" />
                Delete Project
              </>
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}