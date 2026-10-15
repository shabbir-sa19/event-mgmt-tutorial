"use client"

import { ACCEPTED_IMAGE_TYPES } from '@/lib/constants';
import { venueValidationSchema } from '@/lib/zod';
import { venueType } from '@/types/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import * as z from "zod";
import { Button } from "../ui/button";
import { Field, FieldError, FieldGroup, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";

type Props = {
  venue: venueType | null,
  btnTitle: string,
  onSuccess: () => void
}
const apiUrl = "";

const VenueForm = ({ venue, btnTitle, onSuccess }: Props) => {
  const queryClient = useQueryClient()

  const { register, control, handleSubmit, setValue, reset, formState: { isSubmitting } } = useForm<z.infer<typeof venueValidationSchema>>({
    resolver: zodResolver(venueValidationSchema),
    defaultValues: { ...venue },
  });
  const submit = async (value: any) => {
    try {
      console.log(value)
    } catch (error) {
      console.log(error)
    } finally {
      reset()
      onSuccess()
    }
  }
  const createVenueMutataion = useMutation({
    mutationFn: async (body: any) => {
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["venue"] })
    }
  })
  const updateVenueMutation = useMutation({
    mutationFn: async ({ id, body }: { id: string, body: any }) => {
      console.log(body)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["venue"] })
    }
  })
  useEffect(() => {

    return () => { }
  }, [])

  return (
    <form {...register} onSubmit={handleSubmit(submit)} className="space-y-4">
      <FieldGroup className="space-y-0">
        <Controller name="name"
          control={control}
          render={({
            field: { name, onChange, onBlur, value, ref },
            fieldState: { invalid, error },
          }) => (
            <Field className="">
              <FieldLabel className="" htmlFor={name}>Name</FieldLabel>
              <Input
                id={name}
                onChange={onChange}
                onBlur={onBlur}
                value={value || ""}
                ref={ref}
              />
              {invalid && <FieldError errors={[error]} />}
            </Field>
          )}
        />
        <Controller name="city"
          control={control}
          render={({
            field: { name, onChange, onBlur, value, ref },
            fieldState: { invalid, error },
          }) => (
            <Field className="">
              <FieldLabel className="" htmlFor={name}>City</FieldLabel>
              <Input
                id={name}
                onChange={onChange}
                onBlur={onBlur}
                value={value || ""}
                ref={ref}
              />
              {invalid && <FieldError errors={[error]} />}
            </Field>
          )}
        />
        <Controller name="address"
          control={control}
          render={({
            field: { name, onChange, onBlur, value, ref },
            fieldState: { invalid, error },
          }) => (
            <Field className="">
              <FieldLabel className="" htmlFor={name}>Address</FieldLabel>
              <Textarea
                className=""
                id={name}
                onChange={onChange}
                onBlur={onBlur}
                value={value || ""}
                ref={ref}
              />
              {invalid && <FieldError errors={[error]} />}
            </Field>
          )}
        />
        <Controller name="image"
          control={control}
          render={({
            field: { name, onBlur, ref },
            fieldState: { invalid, error },
          }) => (
            <Field className="">
              <FieldLabel className="" htmlFor={name}>Image (Optional)</FieldLabel>
              <Input
                className=""
                id={name}
                type="file"
                onBlur={onBlur}
                ref={ref}
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file && ACCEPTED_IMAGE_TYPES.includes(file.type)) {
                    setValue("image", file, { shouldValidate: true });
                  }
                }}
              />
              {invalid && <FieldError errors={[error]} />}
            </Field>
          )}
        />
      </FieldGroup>
      <FieldGroup className="">
        <Button type="submit" className="" disabled={isSubmitting}>
          {isSubmitting ? "Loading..." : btnTitle}
        </Button>
      </FieldGroup>
    </form>
  )
}

export default VenueForm