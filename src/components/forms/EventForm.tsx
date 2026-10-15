"use client"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { EVENT_CATEGORIES } from "@/lib/constants";
import { eventValidationSchema } from '@/lib/zod';
import { eventType, venueType } from '@/types/types';
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "../ui/button";
import { Field, FieldError, FieldGroup, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";

type Props = {
  event: eventType | null,
  btnTitle: string,
  onSuccess: () => void
}
const sampleVenues: venueType[] = [
  {
    name: "vanue01",
    city: "kolkata",
  },
  {
    name: "venue02",
    city: "mumbai",
  },
];
const apiURL = ""

const EventForm = ({ event, btnTitle, onSuccess }: Props) => {
  const queryClient = useQueryClient()
  const [venues, setVenues] = useState<venueType[]>(sampleVenues)
  const { register, control, handleSubmit, setValue, reset, formState: { isSubmitting } } = useForm<z.infer<typeof eventValidationSchema>>({
    resolver: zodResolver(eventValidationSchema),
    defaultValues: { ...event }
  })
  const submit = (values: z.infer<eventType>) => {
    try {
      console.log(values)
    } catch (error) {
      console.log(error)
    } finally {
      reset()
      onSuccess()
    }
  }
  const createEventMutataion = useMutation({
    mutationFn: async (body: any) => {
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["event"] })
    }
  })
  const updateEventMutation = useMutation({
    mutationFn: async ({ id, body }: { id: string, body: any }) => {
      console.log(body)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["event"] })
    }
  })
  useEffect(() => {
    return () => { }
  }, [])
  return (
    <form onSubmit={handleSubmit(submit)} className="space-y-4" {...register}>
      <FieldGroup className='space-y-0'>
        <Controller name="title"
          control={control}
          render={({ field, fieldState }) => (
            <Field className="">
              <FieldLabel htmlFor={field.name}>Event Title</FieldLabel>
              <Input
                {...field}
                id={field.name}
                type="text"
                className=""
                value={field.value}
                placeholder=""
              />
              {fieldState.invalid && (
                <FieldError errors={[fieldState.error]} />
              )}
            </Field>
          )}
        />

        <div className="flex gap-2">
          <Controller name="budget"
            control={control}
            render={({ field, fieldState }) => (
              <Field className="">
                <FieldLabel htmlFor={field.name}>{field.name}</FieldLabel>
                <Input
                  {...field}
                  id={field.name}
                  type="number"
                  className=""
                  value={field.value}
                />
                {fieldState.invalid && (<FieldError errors={[fieldState.error]} />)}
              </Field>
            )}
          />

          <Controller name="guestCount"
            control={control}
            render={({ field, fieldState }) => (
              <Field className="">
                <FieldLabel htmlFor={field.name}>{field.name}</FieldLabel>
                <Input
                  {...field}
                  id={field.name}
                  type="number"
                  className=""
                  value={field.value}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </div>

        <Controller name="category"
          control={control}
          render={({ field, fieldState }) => (
            <Field className="">
              <FieldLabel htmlFor={field.name}>{field.name}</FieldLabel>
              <Select
                value={String(field.value)}
                onValueChange={field.onChange}
                onOpenChange={() => field.onBlur()}
              >
                <SelectTrigger className="">
                  <SelectValue placeholder="Category" >{field.value}</SelectValue>
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {EVENT_CATEGORIES.map((item, i) => (
                      <SelectItem key={i} value={item}>
                        {item}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              {fieldState.invalid && (<FieldError errors={[fieldState.error]} />
              )}
            </Field>
          )}
        />

        <Controller name="venue"
          control={control}
          render={({ field, fieldState }) => (
            <Field className="">
              <FieldLabel htmlFor={field.name}>{field.name}</FieldLabel>
              <Select
                value={String(field.value)}
                onValueChange={field.onChange}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select venue" />
                </SelectTrigger>
                <SelectContent>
                  {venues.map((venue, i) => (
                    <SelectItem key={i} value={venue.name}>
                      {`${venue.name} — ${venue.city ? venue.city : ""}`}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {fieldState.invalid && (<FieldError errors={[fieldState.error]} />)}
            </Field>
          )}
        />

      </FieldGroup>
      <FieldGroup>
        <Button type="submit" variant={"default"} disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : btnTitle}
        </Button>
      </FieldGroup>
    </form>
  )
}

export default EventForm