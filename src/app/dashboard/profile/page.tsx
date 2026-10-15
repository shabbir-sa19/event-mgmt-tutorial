"use client";

import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { authClient } from "@/lib/auth-client";
import { userProfileSchema } from "@/lib/zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

export default function ProfilePage() {
  const { data: session, isPending } = authClient.useSession();
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const { control, handleSubmit, reset, formState: { isSubmitting } } = useForm<z.infer<typeof userProfileSchema>>({
    resolver: zodResolver(userProfileSchema),
    defaultValues: { name: "", phone: "" },
  });

  useEffect(() => {
    if (session?.user) {
      reset({
        name: session.user.name,
        phone: session.user.phone ?? "",
      });
    }
  }, [reset, session]);

  const saveProfile = async (values: z.infer<typeof userProfileSchema>) => {
    setSubmitError(null);
    setSuccessMessage(null);
    try {
      const { error } = await authClient.updateUser(values);
      if (error) {
        setSubmitError(error.message || "Unable to update your profile.");
        return;
      }
      setSuccessMessage("Your profile has been updated.");
    } catch {
      setSubmitError("Unable to update your profile right now. Please try again.");
    }
  };

  if (isPending) {
    return <p className="p-4 text-muted-foreground">Loading profile...</p>;
  }

  return (
    <section className="w-full">
      <header className="mb-8 flex items-center gap-4 rounded-xl border p-2">
        <SidebarTrigger />
        <Separator orientation="vertical" className="my-auto mr-2 data-[orientation=vertical]:h-8" />
        <h2 className="text-lg font-semibold leading-tight">My Profile</h2>
      </header>

      <div className="mx-auto w-full max-w-2xl space-y-6 rounded-xl border p-6">
        <div>
          <h3 className="text-xl font-semibold">{session?.user.name}</h3>
          <p className="text-sm text-muted-foreground">{session?.user.email}</p>
        </div>

        <dl className="grid gap-4 rounded-lg bg-muted/40 p-4 sm:grid-cols-2">
          <div>
            <dt className="text-sm text-muted-foreground">User ID</dt>
            <dd className="font-medium">{session?.user.userID || "Not assigned"}</dd>
          </div>
          <div>
            <dt className="text-sm text-muted-foreground">Account role</dt>
            <dd className="font-medium">
              {session?.user.role === "admin" ? "Administrator" : "Employee"}
            </dd>
          </div>
        </dl>

        <form onSubmit={handleSubmit(saveProfile)} className="space-y-6">
          <FieldGroup>
            <Controller
              name="name"
              control={control}
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel htmlFor={field.name}>Name</FieldLabel>
                  <Input {...field} id={field.name} autoComplete="name" />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />
            <Controller
              name="phone"
              control={control}
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel htmlFor={field.name}>Mobile number</FieldLabel>
                  <Input {...field} id={field.name} type="tel" autoComplete="tel" placeholder="+14155552671" />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />
          </FieldGroup>

          {submitError && <p className="text-sm text-destructive" role="alert">{submitError}</p>}
          {successMessage && <p className="text-sm text-green-700 dark:text-green-400" role="status">{successMessage}</p>}
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Saving..." : "Save profile"}
          </Button>
        </form>
      </div>
    </section>
  );
}
