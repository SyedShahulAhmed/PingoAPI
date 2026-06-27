"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FolderPlus, Loader2 } from "lucide-react";

import { createProject } from "@/actions/project/create-project";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { ProjectSchema } from "@/validators/project-validator";

export default function CreateProjectDialog() {
  const router = useRouter();

  const [open, setOpen] = useState(false);

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    description: "",
  });

  async function handleSubmit() {
    const validated = ProjectSchema.safeParse(form);

    if (!validated.success) {
      validated.error.issues.forEach((issue) => {
        toast.error(issue.message);
      });

      return;
    }

    setLoading(true);

    try {
      const result = await createProject(validated.data);

      if (!result.success) {
        toast.error(result.message || "Failed to create project");

        return;
      }

      toast.success("Project created", {
        description: "Your project has been created successfully.",
      });

      setOpen(false);

      setForm({
        name: "",
        description: "",
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
          <FolderPlus className="h-4 w-4" />
          Create Project
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-lg border">
            <FolderPlus className="h-5 w-5 text-primary" />
          </div>

          <DialogTitle className="text-lg font-semibold">
            Create Project
          </DialogTitle>

          <DialogDescription className="text-md">
            Create a new project to organize and monitor your API endpoints.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 pt-2">
          <div className="space-y-2">
            <label className="text-sm font-medium">Project Name</label>

            <Input
              placeholder="My Project"
              value={form.name}
              className="mt-2"
              onChange={(e) =>
                setForm({
                  ...form,
                  name: e.target.value,
                })
              }
            />
          </div>

          <div className="space-y-3 ">
            <label className="text-sm font-medium ">Description</label>

            <Textarea
              placeholder="Short description about this project..."
              rows={4}
              className="mt-2"
              value={form.description}
              onChange={(e) =>
                setForm({
                  ...form,
                  description: e.target.value,
                })
              }
            />
          </div>

          <Button
            className="w-full"
            disabled={loading || !form.name.trim()}
            onClick={handleSubmit}
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Creating Project...
              </>
            ) : (
              <>
                <FolderPlus className="mr-2 h-4 w-4" />
                Create Project
              </>
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
