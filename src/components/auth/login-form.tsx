"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail, Lock, Eye, EyeOff, CircleUserRound } from "lucide-react";
import { toast } from "sonner";

import { login } from "@/actions/auth/login";
import { LoginInput, LoginSchema } from "@/validators/login-validator";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function LoginForm() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const [showPassword, setShowPassword] = useState(false);

  const [serverError, setServerError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInput>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: LoginInput) {
    try {
      setLoading(true);
      setServerError("");

      const result = await login(values);

      if (!result.success) {
        setServerError(result.message || "Login failed");

        toast.error(result.message || "Login failed");

        return;
      }

      toast.success("Login successful. Welcome back!");

      router.push("/dashboard");

      router.refresh();
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

        <h1 className="text-2xl font-bold sm:text-3xl">Welcome Back</h1>

        <p className="mt-2 text-sm text-muted-foreground sm:text-base">
          Sign in to your PingoAPI account
        </p>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4 sm:space-y-5"
      >
        <div>
          <label className="mb-2 block text-sm font-medium">Email</label>

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
          {loading ? "Signing In..." : "Sign In"}
        </Button>

        <div className="text-center text-sm text-muted-foreground">
          Don&apos;t have an account?{" "}
          <Link
            href="/signup"
            className="font-medium text-primary hover:underline"
          >
            Create Account
          </Link>
        </div>
      </form>
    </div>
  );
}
