"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  ShoppingBag,
  ArrowRight,
  Sparkles,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";

import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Button } from "../../components/ui/button";

import {
  loginSchema,
  type LoginFormData,
} from "../../lib/validations/auth";

export default function LoginForm() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: {
      errors,
      isSubmitting,
    },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),

    defaultValues: {
      username: "",
      email: "",
    },
  });

  const onSubmit = async (
    data: LoginFormData
  ) => {
    console.log("Login data:", data);

    // Demo authentication
    localStorage.setItem(
      "isLoggedIn",
      "true"
    );

    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-100">

      {/* ========================= */}
      {/* HEADER */}
      {/* ========================= */}

      <header className="border-b border-blue-100 bg-white/80 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-7xl items-center px-6">

          <button
            type="button"
            onClick={() => router.push("/")}
            className="flex items-center gap-2"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-purple-600 text-white shadow-md">
              <ShoppingBag className="h-5 w-5" />
            </div>

            <span className="text-xl font-bold text-slate-900">
              My Shop
            </span>
          </button>

        </div>
      </header>

      {/* ========================= */}
      {/* LOGIN */}
      {/* ========================= */}

      <main className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 py-12 sm:px-6 lg:px-8">

        <div className="grid w-full max-w-5xl overflow-hidden rounded-3xl border border-white/60 bg-white shadow-2xl shadow-blue-200/40 md:grid-cols-2">

          {/* ========================= */}
          {/* LEFT SIDE */}
          {/* ========================= */}

          <div className="relative hidden overflow-hidden bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 p-10 text-white md:flex md:flex-col md:justify-between lg:p-14">

            {/* Decorations */}
            <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-white/10" />

            <div className="absolute -bottom-28 -left-24 h-80 w-80 rounded-full bg-white/10" />

            <div className="relative z-10">

              <div className="mb-8 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15 backdrop-blur">
                <ShoppingBag className="h-7 w-7" />
              </div>

              <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-sm backdrop-blur">
                <Sparkles className="h-4 w-4 text-cyan-200" />
                Welcome back
              </div>

              <h1 className="max-w-md text-4xl font-extrabold leading-tight lg:text-5xl">
                Welcome back to
                <span className="block text-cyan-200">
                  My Shop
                </span>
              </h1>

              <p className="mt-6 max-w-md leading-7 text-blue-100">
                Sign in to continue exploring
                our products and manage your
                account.
              </p>

            </div>

            <p className="relative z-10 text-sm text-blue-100/80">
              Discover products you'll love.
            </p>

          </div>

          {/* ========================= */}
          {/* RIGHT SIDE */}
          {/* ========================= */}

          <div className="flex items-center justify-center p-8 sm:p-12 lg:p-16">

            <Card className="w-full max-w-md border-0 bg-transparent shadow-none">

              <CardHeader className="px-2 pt-2">

                {/* Mobile logo */}
                <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 text-white shadow-md md:hidden">
                  <ShoppingBag className="h-6 w-6" />
                </div>

                <CardTitle className="text-3xl font-bold text-slate-900">
                  Sign in
                </CardTitle>

                <CardDescription className="mt-2 text-slate-500">
                  Enter your information to
                  access your account.
                </CardDescription>

              </CardHeader>

              <CardContent className="px-2 pb-2">

                <form
                  onSubmit={handleSubmit(
                    onSubmit
                  )}
                  className="mt-6 space-y-5"
                >

                  {/* Username */}
                  <div className="space-y-2">

                    <Label
                      htmlFor="username"
                      className="font-medium text-slate-700"
                    >
                      Username
                    </Label>

                    <Input
                      id="username"
                      placeholder="Enter your username"
                      autoComplete="username"
                      className="h-12 border-slate-200 bg-white shadow-sm transition-all placeholder:text-slate-400 focus:border-blue-500 focus:ring-blue-500"
                      {...register(
                        "username"
                      )}
                    />

                    {errors.username && (
                      <p className="text-sm text-red-500">
                        {
                          errors.username
                            .message
                        }
                      </p>
                    )}

                  </div>

                  {/* Email */}
                  <div className="space-y-2">

                    <Label
                      htmlFor="email"
                      className="font-medium text-slate-700"
                    >
                      Email
                    </Label>

                    <Input
                      id="email"
                      type="email"
                      placeholder="example@email.com"
                      autoComplete="email"
                      className="h-12 border-slate-200 bg-white shadow-sm transition-all placeholder:text-slate-400 focus:border-blue-500 focus:ring-blue-500"
                      {...register(
                        "email"
                      )}
                    />

                    {errors.email && (
                      <p className="text-sm text-red-500">
                        {
                          errors.email
                            .message
                        }
                      </p>
                    )}

                  </div>

                  {/* Login */}
                  <Button
                    type="submit"
                    disabled={
                      isSubmitting
                    }
                    className="h-12 w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/20 transition-all hover:from-blue-700 hover:to-indigo-700"
                  >
                    {isSubmitting
                      ? "Signing in..."
                      : (
                        <>
                          Sign in
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </>
                      )}
                  </Button>

                </form>

                {/* Register */}
                <p className="mt-7 text-center text-sm text-slate-500">
                  Don't have an account?{" "}

                  <button
                    type="button"
                    onClick={() =>
                      router.push(
                        "/register"
                      )
                    }
                    className="font-semibold text-blue-600 hover:text-blue-700 hover:underline"
                  >
                    Create account
                  </button>
                </p>

                {/* Home */}
                <button
                  type="button"
                  onClick={() =>
                    router.push("/")
                  }
                  className="mt-4 block w-full text-center text-sm text-slate-400 transition-colors hover:text-blue-600"
                >
                  ← Back to home
                </button>

              </CardContent>
            </Card>

          </div>
        </div>
      </main>
    </div>
  );
}
