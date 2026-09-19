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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";

import {
  registerSchema,
  type RegisterFormData,
} from "../../lib/validations/auth";

export default function RegisterForm() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: {
      errors,
      isSubmitting,
    },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),

    defaultValues: {
      fullName: "",
      gender: "",
      dateOfBirth: "",
      password: "",
      confirmPassword: "",
    },
  });

  const gender = watch("gender");

  const onSubmit = async (
    data: RegisterFormData
  ) => {
    console.log("Register data:", data);

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
      {/* REGISTER */}
      {/* ========================= */}

      <main className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 py-12 sm:px-6 lg:px-8">

        <div className="grid w-full max-w-5xl overflow-hidden rounded-3xl border border-white/60 bg-white shadow-2xl shadow-purple-200/40 md:grid-cols-2">

          {/* ========================= */}
          {/* LEFT */}
          {/* ========================= */}

          <div className="relative hidden overflow-hidden bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 p-10 text-white md:flex md:flex-col md:justify-between lg:p-14">

            <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-white/10" />

            <div className="absolute -bottom-28 -left-24 h-80 w-80 rounded-full bg-white/10" />

            <div className="relative z-10">

              <div className="mb-8 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15 backdrop-blur">
                <ShoppingBag className="h-7 w-7" />
              </div>

              <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-sm backdrop-blur">
                <Sparkles className="h-4 w-4 text-cyan-200" />
                Join our community
              </div>

              <h1 className="max-w-md text-4xl font-extrabold leading-tight lg:text-5xl">
                Create your
                <span className="block text-cyan-200">
                  My Shop
                </span>
                account
              </h1>

              <p className="mt-6 max-w-md leading-7 text-blue-100">
                Create your account and
                start discovering amazing
                products today.
              </p>

            </div>

            <p className="relative z-10 text-sm text-blue-100/80">
              Your shopping journey starts here.
            </p>

          </div>

          {/* ========================= */}
          {/* RIGHT */}
          {/* ========================= */}

          <div className="flex items-center justify-center p-8 sm:p-12 lg:p-14">

            <Card className="w-full max-w-md border-0 bg-transparent shadow-none">

              <CardHeader className="px-2 pt-2">

                <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 text-white shadow-md md:hidden">
                  <ShoppingBag className="h-6 w-6" />
                </div>

                <CardTitle className="text-3xl font-bold text-slate-900">
                  Create account
                </CardTitle>

                <CardDescription className="mt-2 text-slate-500">
                  Enter your information to
                  create your account.
                </CardDescription>

              </CardHeader>

              <CardContent className="px-2 pb-2">

                <form
                  onSubmit={handleSubmit(
                    onSubmit
                  )}
                  className="mt-6 space-y-4"
                >

                  {/* Full Name */}
                  <div className="space-y-2">

                    <Label
                      htmlFor="fullName"
                      className="font-medium text-slate-700"
                    >
                      Full Name
                    </Label>

                    <Input
                      id="fullName"
                      placeholder="John Doe"
                      autoComplete="name"
                      className="h-11 border-slate-200 bg-white shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      {...register(
                        "fullName"
                      )}
                    />

                    {errors.fullName && (
                      <p className="text-sm text-red-500">
                        {
                          errors.fullName
                            .message
                        }
                      </p>
                    )}

                  </div>

                  {/* Gender */}
                  <div className="space-y-2">

                    <Label className="font-medium text-slate-700">
                      Gender
                    </Label>

                    <Select
                      value={
                        gender || ""
                      }
                      onValueChange={(
                        value
                      ) =>
                        setValue(
                          "gender",
                          value as RegisterFormData["gender"],
                          {
                            shouldValidate:
                              true,
                            shouldDirty:
                              true,
                          }
                        )
                      }
                    >

                      <SelectTrigger className="h-11 w-full border-slate-200 bg-white shadow-sm focus:ring-blue-500">
                        <SelectValue placeholder="Select gender" />
                      </SelectTrigger>

                      <SelectContent>
                        <SelectItem value="male">
                          Male
                        </SelectItem>

                        <SelectItem value="female">
                          Female
                        </SelectItem>

                        <SelectItem value="other">
                          Other
                        </SelectItem>
                      </SelectContent>

                    </Select>

                    {errors.gender && (
                      <p className="text-sm text-red-500">
                        {
                          errors.gender
                            .message
                        }
                      </p>
                    )}

                  </div>

                  {/* Date */}
                  <div className="space-y-2">

                    <Label
                      htmlFor="dateOfBirth"
                      className="font-medium text-slate-700"
                    >
                      Date of Birth
                    </Label>

                    <Input
                      id="dateOfBirth"
                      type="date"
                      className="h-11 border-slate-200 bg-white shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      {...register(
                        "dateOfBirth"
                      )}
                    />

                    {errors.dateOfBirth && (
                      <p className="text-sm text-red-500">
                        {
                          errors.dateOfBirth
                            .message
                        }
                      </p>
                    )}

                  </div>

                  {/* Password */}
                  <div className="space-y-2">

                    <Label
                      htmlFor="password"
                      className="font-medium text-slate-700"
                    >
                      Password
                    </Label>

                    <Input
                      id="password"
                      type="password"
                      placeholder="Enter password"
                      autoComplete="new-password"
                      className="h-11 border-slate-200 bg-white shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      {...register(
                        "password"
                      )}
                    />

                    {errors.password && (
                      <p className="text-sm text-red-500">
                        {
                          errors.password
                            .message
                        }
                      </p>
                    )}

                  </div>

                  {/* Confirm Password */}
                  <div className="space-y-2">

                    <Label
                      htmlFor="confirmPassword"
                      className="font-medium text-slate-700"
                    >
                      Confirm Password
                    </Label>

                    <Input
                      id="confirmPassword"
                      type="password"
                      placeholder="Confirm password"
                      autoComplete="new-password"
                      className="h-11 border-slate-200 bg-white shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      {...register(
                        "confirmPassword"
                      )}
                    />

                    {errors.confirmPassword && (
                      <p className="text-sm text-red-500">
                        {
                          errors
                            .confirmPassword
                            .message
                        }
                      </p>
                    )}

                  </div>

                  {/* Register */}
                  <Button
                    type="submit"
                    disabled={
                      isSubmitting
                    }
                    className="mt-2 h-11 w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/20 hover:from-blue-700 hover:to-indigo-700"
                  >
                    {isSubmitting
                      ? "Creating account..."
                      : (
                        <>
                          Create account
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </>
                      )}
                  </Button>

                </form>

                {/* Login */}
                <p className="mt-6 text-center text-sm text-slate-500">
                  Already have an account?{" "}

                  <button
                    type="button"
                    onClick={() =>
                      router.push(
                        "/login"
                      )
                    }
                    className="font-semibold text-blue-600 hover:text-blue-700 hover:underline"
                  >
                    Sign in
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
