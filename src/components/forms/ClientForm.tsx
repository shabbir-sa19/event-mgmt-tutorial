"use client";
import { Controller, useForm } from "react-hook-form";
import { Button } from "../ui/button";
import { Field, FieldError, FieldGroup, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import * as z from 'zod';
import { type clientType } from '@/types/types';
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { clientVallidationSchema } from "@/lib/zod";

type Props = {
  client: clientType | null,
  btnTitle: string,
  onSuccess: () => void,
}

const ClientForm = ({ client, btnTitle, onSuccess }: Props) => {

  const { register, control, reset, handleSubmit, formState: { isSubmitting } } = useForm<z.infer<typeof clientVallidationSchema>>({
    resolver: zodResolver(clientVallidationSchema),
    defaultValues: { ...client },
  })
  const queryClient = useQueryClient()

  const onSubmit = async (values: any) => {
    try {
      console.log(values)
    } catch (error) {
      console.log(error)
    } finally {
      reset()
      onSuccess()
    }
  }

  const createClientMutataion = useMutation({
    mutationFn: async (body: any) => {
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["client"] })
    }
  })
  const updateClientMutation = useMutation({
    mutationFn: async ({ id, body }: { id: string, body: any }) => {
      console.log(body)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["client"] })
    }
  })

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" {...register}>
      <FieldGroup className="-space-y-2">
        {/* Name */}
        <Controller
          name="name"
          control={control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>Name</FieldLabel>
              <Input {...field} id={field.name} type="text" />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        {/* Email */}
        <Controller
          name="email"
          control={control}
          render={({ field, fieldState }) => (
            <Field className="">
              <FieldLabel htmlFor={field.name}>Email</FieldLabel>
              <Input {...field} id={field.name} type="email" />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        {/* Address */}
        <Controller
          name="address"
          control={control}
          render={({ field, fieldState }) => (
            <Field className="">
              <FieldLabel htmlFor={field.name}>Address</FieldLabel>
              <Input {...field} id={field.name} type="text" />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        {/* Phone */}
        <Controller
          name="phone"
          control={control}
          render={({ field, fieldState }) => (
            <Field className="">
              <FieldLabel htmlFor={field.name}>Phone</FieldLabel>
              <Input {...field} id={field.name} type="tel" />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        {/* Notes */}
        <Controller
          name="notes"
          control={control}
          render={({ field, fieldState }) => (
            <Field className="">
              <FieldLabel htmlFor={field.name}>Notes (optional)</FieldLabel>
              <Textarea
                {...field}
                id={field.name}
                rows={6}
                placeholder="Add your description here."
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </FieldGroup>
      <FieldGroup>
        <Field orientation={"responsive"} className="">
          <Button type="submit" variant={"default"} disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : btnTitle}
          </Button>
          <Button type="reset" variant="outline" onClick={() => reset({ ...client })} disabled={isSubmitting}>
            Reset
          </Button>
        </Field>
      </FieldGroup>
    </form>
  )
}

export default ClientForm