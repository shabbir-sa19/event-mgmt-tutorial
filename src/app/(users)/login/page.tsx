"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { loginSchema } from "@/lib/zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { authClient } from "@/lib/auth-client";

const LoginPage = () => {
  const { data } = authClient.useSession();
  const router = useRouter();
  const [submitError, setSubmitError] = useState<string | null>(null);
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      identifier: "",
      password: "",
      rememberMe: false,
    },
  });

  const login = async (value: z.infer<typeof loginSchema>) => {
    setSubmitError(null);
    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(value),
      });
      const result = await response.json();

      if (!response.ok) {
        setSubmitError(result.message || "Invalid login details.");
        return;
      }

      await authClient.getSession();
      router.push("/dashboard");
      router.refresh();
    } catch {
      setSubmitError("Unable to sign in right now. Please try again.");
    }
  };

  useEffect(() => {
    if (data?.user) router.push("/dashboard");
  }, [data, router]);

  return (
    <section className="w-full">
      <div className="mx-auto my-2 flex max-w-xl flex-col items-center justify-center rounded-xl border px-4 py-2">
        <div className="mb-8 w-full">
          <h2 className="mt-2 text-center text-2xl font-bold leading-loose lg:text-3xl">
            Log into your account
          </h2>
          <p className="p-4 text-center text-sm font-light text-muted-foreground">
            Don&apos;t have an account?
            <Link href="/signup" className="pl-2 font-medium hover:underline">
              Sign up here
            </Link>
          </p>
          {submitError && (
            <p className="text-center text-sm text-destructive" role="alert">
              {submitError}
            </p>
          )}
        </div>
        <div className="w-full px-2 py-4">
          <form onSubmit={handleSubmit(login)} className="space-y-8" id="LoginForm">
            <FieldGroup className="mx-auto">
              <Controller
                name="identifier"
                control={control}
                render={({ field, fieldState }) => (
                  <Field>
                    <FieldLabel htmlFor={field.name}>User ID, email, or mobile</FieldLabel>
                    <Input
                      {...field}
                      id={field.name}
                      type="text"
                      autoComplete="username"
                      placeholder="Enter your user ID, email, or mobile"
                    />
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                  </Field>
                )}
              />
              <Controller
                name="password"
                control={control}
                render={({ field, fieldState }) => (
                  <Field>
                    <FieldLabel htmlFor={field.name}>Password</FieldLabel>
                    <Input {...field} id={field.name} type="password" autoComplete="current-password" />
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                  </Field>
                )}
              />
              <Controller
                name="rememberMe"
                control={control}
                render={({ field, fieldState }) => (
                  <Field orientation="horizontal">
                    <FieldLabel htmlFor={field.name} className="order-2">Remember Me</FieldLabel>
                    <Checkbox
                      id={field.name}
                      onBlur={field.onBlur}
                      name={field.name}
                      className="order-1"
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                  </Field>
                )}
              />
            </FieldGroup>
            <FieldGroup>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Logging in..." : "Login"}
              </Button>
            </FieldGroup>
          </form>
        </div>
      </div>
    </section>
  );
};

export default LoginPage;
