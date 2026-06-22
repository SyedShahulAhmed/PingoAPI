"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { User, Mail, Lock, Eye, EyeOff, CircleUserRound } from "lucide-react";
import { toast } from "sonner";

import { signup } from "@/actions/auth/signup";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { SignupInput, SignupSchema } from "@/validators/signup-validator";

export default function SignupForm() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const [showPassword, setShowPassword] = useState(false);

  const [serverError, setServerError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupInput>({
    resolver: zodResolver(SignupSchema),

    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: SignupInput) {
    try {
      setLoading(true);

      setServerError("");

      const result = await signup(values);

      if (!result.success) {
        setServerError(result.message);

        toast.error(result.message);

        return;
      }

      toast.success("Account created successfully!");

      router.push("/login");
    } catch {
      setServerError("Something went wrong");

      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="rounded-2xl border border-border/50 bg-card p-5 shadow-xl sm:p-6 md:p-8">
      <div className="mb-6 text-center md:mb-8">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 sm:h-14 sm:w-14">
          <CircleUserRound className="h-6 w-6 text-primary sm:h-7 sm:w-7" />
        </div>

        <h1 className="text-2xl font-bold sm:text-3xl">Create Account</h1>

        <p className="mt-2 text-sm text-muted-foreground sm:text-base">
          Start monitoring your APIs with PingoAPI
        </p>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4 sm:space-y-5"
      >
        <div>
          <label className="mb-2 block text-sm font-medium">Name</label>

          <div className="relative">
            <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

            <Input
              placeholder="John Doe"
              className="h-10 pl-10 sm:h-11"
              {...register("name")}
            />
          </div>

          {errors.name && (
            <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>
          )}
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">
            Email
          </label>

          <div className="relative">
            <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

            <Input
              type="email"
              placeholder="john@example.com"
              className="h-10 pl-10 sm:h-11"
              {...register("email")}
            />
          </div>

          {errors.email && (
            <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">Password</label>

          <div className="relative">
            <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

            <Input
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              className="h-10 pl-10 pr-10 sm:h-11"
              {...register("password")}
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </button>
          </div>

          {errors.password && (
            <p className="mt-1 text-sm text-red-500">
              {errors.password.message}
            </p>
          )}
        </div>

        {serverError && (
          <div className="rounded-lg border border-red-500/20 bg-red-500/10 p-3 text-sm text-red-500">
            {serverError}
          </div>
        )}

        <Button
          type="submit"
          className="h-10 w-full sm:h-11"
          disabled={loading}
        >
          {loading ? "Creating Account..." : "Create Account"}
        </Button>

        <div className="text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-medium text-primary hover:underline"
          >
            Sign In
          </Link>
        </div>
      </form>
    </div>
  );
}
