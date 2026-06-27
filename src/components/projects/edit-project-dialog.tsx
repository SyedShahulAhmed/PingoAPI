"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { Loader2, Pencil } from "lucide-react";

import { toast } from "sonner";

import { updateProject } from "@/actions/project/update-project";

import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";

import { Textarea } from "@/components/ui/textarea";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";
import { ProjectSchema } from "@/validators/project-validator";

interface Props {
  project: {
    _id: string;
    name: string;
    description: string;
  };
}

export default function EditProjectDialog({ project }: Props) {
  const router = useRouter();

  const [open, setOpen] = useState(false);

  const [loading, setLoading] = useState(false);

  const [name, setName] = useState(project.name);

  const [description, setDescription] = useState(project.description);

  async function handleUpdate() {
    const validated = ProjectSchema.safeParse({
      name,
      description,
    });

    if (!validated.success) {
      toast.error(validated.error.issues[0]?.message || "Validation failed");

      return;
    }

    setLoading(true);

    try {
      const result = await updateProject(project._id, validated.data);

      if (result.success) {
        toast.success("Project updated", {
          description: "Changes have been saved successfully.",
        });

        setOpen(false);

        router.refresh();
      } else {
        toast.error(result.message || "Failed to update project");
      }
    } catch {
      toast.error("Something went wrong while updating the project.");
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
        <DialogHeader className="space-y-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl border bg-muted">
            <Pencil className="h-5 w-5 text-primary" />
          </div>

          <div>
            <DialogTitle className="text-xl">Edit Project</DialogTitle>

            <DialogDescription className="mt-1">
              Update your project details and description.
            </DialogDescription>
          </div>
        </DialogHeader>

        <div className="space-y-6 py-2">
          <div className="space-y-2">
            <label className="text-sm font-medium">Project Name</label>

            <Input
              value={name}
              placeholder="Project Name"
              className="mt-2"
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Description</label>

            <Textarea
              rows={5}
              value={description}
              className="mt-2"
              placeholder="Project description..."
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <Button
            size="lg"
            className="w-full"
            disabled={loading || !name.trim()}
            onClick={handleUpdate}
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Updating Project...
              </>
            ) : (
              <>
                <Pencil className="mr-2 h-4 w-4" />
                Save Changes
              </>
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
