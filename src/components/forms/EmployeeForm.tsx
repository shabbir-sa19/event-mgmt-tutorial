"use client"

import { EmployeeType } from '@/types/types'
import { useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { Field, FieldError, FieldGroup, FieldLabel } from '../ui/field'
import { employeeValidationSchema } from '@/lib/zod'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '../ui/select'

type Props = {
  employee: EmployeeType | null,
  btnTitle: string,
  onSuccess: () => void,
}

const EmployeeForm = ({ employee, btnTitle, onSuccess }: Props) => {
  const queryClient = useQueryClient()
  const { register, control, handleSubmit, reset, formState: { isSubmitting } } = useForm<z.infer<typeof employeeValidationSchema>>({
    resolver: zodResolver(employeeValidationSchema),
    defaultValues: { ...employee }
  });
  const submit = async (values: z.infer<typeof employeeValidationSchema>) => {
    try {
      console.log(values)
      if (employee === null) {
        createEmployeeMutation.mutate(values)
      } else {
        updateEmployeeMutation.mutate({ id: employee._id, body: values })
      }
    } catch (error) {
      console.log(error)
    } finally {
      reset()
      onSuccess()
    }
  }

  const createEmployeeMutation = useMutation({
    mutationFn: async (body: any) => {
      console.log(body)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["employee"] })
    }
  })
  const updateEmployeeMutation = useMutation({
    mutationFn: async ({ id, body }: { id: any, body: any }) => {
      console.log(body)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["employee"] })
    }
  })

  useEffect(() => {
    return () => { }
  }, [])

  return (
    <form onSubmit={handleSubmit(submit)} className='space-y-4' {...register}>
      <FieldGroup className='space-y-0'>
        <Controller name="name" control={control} render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor={field.name}>Name</FieldLabel>
            <Input {...field} id={field.name} type="text" />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )} />
        <Controller name='email' control={control} render={({ field, fieldState }) => (
          <Field>
            <FieldLabel htmlFor={field.name}>Email</FieldLabel>
            <Input {...field} id={field.name} type="email" />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )} />
        <Controller name='phone' control={control} render={({ field, fieldState }) => (
          <Field>
            <FieldLabel htmlFor={field.name}>Name</FieldLabel>
            <Input {...field} id={field.name} type="tel" inputMode="numeric" maxLength={10} />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )} />
        <Controller name='salaryType' control={control} render={({ field, fieldState }) => (
          <Field className="">
            <FieldLabel htmlFor={field.name}>Name</FieldLabel>
            <Select value={field.value} onValueChange={field.onChange}>
              <SelectTrigger className="w-full rounded-lg border border-input bg-background px-4 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent className="">
                <SelectGroup>
                  {employeeValidationSchema.shape.salaryType.options.map((option, i) => (
                    <SelectItem key={i} value={option}>{option.value}</SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )} />
        <Controller name='salaryAmount' control={control} render={({ field, fieldState }) => (
          <Field>
            <FieldLabel htmlFor={field.name}>Name</FieldLabel>
            <Input {...field} id={field.name} type="number"
              onChange={(e) => {
                const value = e.target.value;
                field.onChange(value ? Number(value) : "")
              }}
            />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )} />
        <Controller name='role' control={control} render={({ field, fieldState }) => (
          <Field>
            <FieldLabel htmlFor={field.name}>Name</FieldLabel>
            <Input {...field} id={field.name} type="text" />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )} />
        <Controller name='joiningDate' control={control} render={({ field, fieldState }) => (
          <Field>
            <FieldLabel htmlFor={field.name}>Name</FieldLabel>
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )} />
        <Controller name='isActive' control={control} render={({ field, fieldState }) => (
          <Field>
            <FieldLabel htmlFor={field.name}>Name</FieldLabel>
            <Input id={field.name} type="" />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )} />

      </FieldGroup>
      <FieldGroup>
        <Button type="submit" variant={"default"} disabled={isSubmitting}>
          {isSubmitting ? "Loading..." : btnTitle}
        </Button>
      </FieldGroup>
    </form >
  )
}

export default EmployeeForm