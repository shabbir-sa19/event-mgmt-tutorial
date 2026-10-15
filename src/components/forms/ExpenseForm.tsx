"use client"
import { EXPENSE_CATEGORY, PAYMENT_METHODS } from "@/lib/constants";
import { titleCase } from '@/lib/utils';
import { expenseValidationSchema } from '@/lib/zod';
import { eventType, expenseType } from '@/types/types';
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { format } from 'date-fns';
import { Calendar1 } from "lucide-react";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "../ui/button";
import { Calendar } from "../ui/calendar";
import { Field, FieldError, FieldGroup, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Textarea } from "../ui/textarea";

type Props = {
  expense: expenseType | null,
  btnTitle: string,
  onSuccess: () => void
}
const SampleEvents: eventType[] = [
  {
    title: "Client 01 Wedding",
    category: "wedding",
  },
  {
    title: "Client 02 Wedding",
    category: "wedding",
  },
]
const apiUrl = "";

const ExpenseForm = ({ expense, btnTitle, onSuccess }: Props) => {
  const queryClient = useQueryClient()
  const [events, setEvents] = useState<eventType[] | null>(SampleEvents)
  const { register, control, handleSubmit, setValue, reset, formState: { isSubmitting } } = useForm<z.infer<typeof expenseValidationSchema>>({
    resolver: zodResolver(expenseValidationSchema),
    defaultValues: { ...expense }
  })
  const submit = async (values: any) => {
    try {
      console.log(values)
    } catch (error) {
      console.log(error)
    } finally {
      reset()
      onSuccess()
    }
  }
  const createExpenseMutataion = useMutation({
    mutationFn: async (body: any) => {
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["expense"] })
    }
  })
  const updateExpenseMutation = useMutation({
    mutationFn: async ({ id, body }: { id: string, body: any }) => {
      console.log(body)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["expense"] })
    }
  })
  useEffect(() => {
    return () => { }
  }, [])

  return (
    <form onSubmit={handleSubmit(submit)} className="space-y-4" {...register}>
      <FieldGroup className="space-y-0">
        <Controller control={control} name="title"
          render={({ field, fieldState }) => (
            <Field className="">
              <FieldLabel htmlFor={field.name}>Expense Name</FieldLabel>
              <Input id={field.name}
                type="text"
                placeholder="Metro Cash & Carry"
                value={field.value}
                onChange={field.onChange}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>)}
        />

        <Controller control={control} name="amount"
          render={({ field, fieldState }) => (
            <Field className="">
              <FieldLabel htmlFor={field.name}>Amount</FieldLabel>
              <Input id={field.name} {...field}
                type="number"
                value={field.value}
                onChange={(event) => {
                  event.preventDefault()
                  setValue(field.name, Number(event.target.value))
                  field.onChange(Number(event.target.value))
                }}
                onBlur={field.onBlur}
                ref={field.ref}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller control={control} name="category"
          render={({ field, fieldState }) => (
            <Field className="">
              <FieldLabel htmlFor={field.name}>Category/Type</FieldLabel>
              <Select
                name={field.name}
                value={field.value ?? ""}
                onValueChange={field.onChange}
              >
                <SelectTrigger id="category">
                  <SelectValue placeholder="category" />
                </SelectTrigger>
                <SelectContent>
                  {EXPENSE_CATEGORY.map((c) => (
                    <SelectItem key={c} value={c}>
                      {`${titleCase(c)}`}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>)}
        />

        <Controller control={control} name="paymentMethod"
          render={({ field, fieldState }) => (
            <Field className="">
              <FieldLabel htmlFor={field.name}>Payment Method</FieldLabel>
              <Select name={field.name} value={field.value} onValueChange={field.onChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Payment Method" />
                </SelectTrigger>
                <SelectContent>
                  {PAYMENT_METHODS.map((pm) => (
                    <SelectItem key={pm} value={pm}>
                      {titleCase(pm)}
                    </SelectItem>))}
                </SelectContent>
              </Select>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>)}
        />

        <Controller control={control} name="eventId"
          render={({ field, fieldState }) => (
            <Field className="">
              <FieldLabel htmlFor={field.name}>Select Event</FieldLabel>
              <Select name={field.name} value={String(field.value)} onValueChange={field.onChange}>
                <SelectTrigger>
                  <SelectValue placeholder="" />
                </SelectTrigger>
                <SelectContent>
                  {events?.map((e, i) => (
                    <SelectItem key={i} value={e.title}>
                      {titleCase(e.title)}
                    </SelectItem>))}
                </SelectContent>
              </Select>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>)}
        />

        <Controller control={control} name="expenseDate"
          render={({ field, fieldState }) => (
            <Field className="">
              <FieldLabel htmlFor={field.name}>Date</FieldLabel>
              <Popover>
                <PopoverTrigger render={
                  <Button className="flex justify-start gap-2" variant={"outline"}>
                    <Calendar1 />
                    <span>
                      {field.value ? (format(field.value, "PPP")) : ("Pick A Date")}
                    </span>
                  </Button>
                }>
                </PopoverTrigger>
                <PopoverContent>
                  <Calendar
                    mode="single"
                    selected={new Date(field.value ? field.value : "")}
                    onSelect={field.onChange} />
                </PopoverContent>
              </Popover>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>)}
        />

        <Controller control={control} name="vendor"
          render={({ field, fieldState }) => (
            <Field className="">
              <FieldLabel htmlFor={field.name}>Vendor</FieldLabel>
              <Input name={field.name}
                type="text"
                placeholder=""
                value={field.value}
                onChange={field.onChange}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller control={control} name="note"
          render={({ field, fieldState }) => (
            <Field className="">
              <FieldLabel htmlFor={field.name}>Message (Optional)</FieldLabel>
              <Textarea name={field.name}
                placeholder=""
                value={field.value}
                onChange={field.onChange}
                onBlur={field.onBlur}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>)}
        />
      </FieldGroup>
      <FieldGroup>
        <Field className="">
          <Button type="submit" className="" disabled={isSubmitting}>
            {isSubmitting ? "loading..." : btnTitle}
          </Button>
        </Field>
      </FieldGroup>
    </form>
  )
}

export default ExpenseForm