"use client"

import { EmployeeType } from '@/types/types'
import { useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { Field, FieldGroup } from '../ui/field'
import { employeeValidationSchema } from '@/lib/zod'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Button } from '../ui/button'

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
  const submit = async (values: any) => {
    try {
      console.log(values)
      if (employee === null) {
        createEmployeeMutation.mutate(values)
      } else {
        updateEmployeeMutation.mutate(employee._id, values)
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
          <Field>

          </Field>
        )} />
        <Controller name='email' control={control} render={({ field, fieldState }) => (
          <Field>

          </Field>
        )} />
        <Controller name='phone' control={control} render={({ field, fieldState }) => (
          <Field>

          </Field>
        )} />
        <Controller name='salaryType' control={control} render={({ field, fieldState }) => (
          <Field>

          </Field>
        )} />
        <Controller name='salaryAmount' control={control} render={({ field, fieldState }) => (
          <Field>

          </Field>
        )} />
        <Controller name='role' control={control} render={({ field, fieldState }) => (
          <Field>

          </Field>
        )} />
        <Controller name='joiningDate' control={control} render={({ field, fieldState }) => (
          <Field>

          </Field>
        )} />
        <Controller name='isActive' control={control} render={({ field, fieldState }) => (
          <Field>

          </Field>
        )} />
        <Controller name='avatar' control={control} render={({ field, fieldState }) => (
          <Field>

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