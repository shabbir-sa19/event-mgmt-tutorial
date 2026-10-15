"use client"
import { Button } from '@/components/ui/button'
import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { authClient } from '@/lib/auth-client'
import { ACCEPTED_IMAGE_TYPES } from '@/lib/constants'
import { signupSchema } from '@/lib/zod'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'

const SignupPage = () => {
  const { data } = authClient.useSession()
  const router = useRouter()
  const [submitError, setSubmitError] = useState<string | null>(null)
  const { control, handleSubmit, setValue, formState: { isSubmitting } } = useForm<z.infer<typeof signupSchema>>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      email: "",
      phone: "",
      password: "",
      name: "",
      image: undefined,
    }
  })

  const signup = async (value: z.infer<typeof signupSchema>) => {
    setSubmitError(null)
    try {
      const { error } = await authClient.signUp.email({
        email: value.email,
        name: value.name,
        password: value.password,
        phone: value.phone,
        fetchOptions: {
          onSuccess: () => router.push("/login"),
        },
      })
      if (error) setSubmitError(error.message || "Unable to create your account.")
    } catch {
      setSubmitError("Unable to create your account right now. Please try again.")
    }
  }
  useEffect(() => {
    if (data?.user) { router.push("/dashboard") }
  }, [data, router])
  return (
    <section className="w-full">
      <div className="flex flex-col justify-center items-center max-w-xl mx-auto border rounded-xl px-4 py-2 my-2">
        <div className="w-full mb-8">
          <h2 className="text-2xl text-center font-bold leading-loose lg:text-3xl">
            Create an account
          </h2>
          <p className="text-sm text-center text-muted-foreground">
            Already have an account?
            <Link
              href="/login"
              className="font-medium pl-2 hover:underline"
            >
              Login here
            </Link>
          </p>
        </div>
        <div className="w-full px-2 py-4">
          {submitError && <p className="text-center text-sm text-destructive" role="alert">{submitError}</p>}
          <form onSubmit={handleSubmit(signup)} id="SignupForm" className="space-y-8">
            <FieldGroup className="mx-auto">
              <Controller name='name' control={control} render={({ field, fieldState }) => (
                <Field className=''>
                  <FieldLabel htmlFor={field.name}>Name</FieldLabel>
                  <Input {...field} id={field.name} type='text' />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )} />
              <Controller name='email' control={control} render={({ field, fieldState }) => (
                <Field className=''>
                  <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                  <Input {...field} id={field.name} type='email' />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )} />
              <Controller name='phone' control={control} render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel htmlFor={field.name}>Mobile number</FieldLabel>
                  <Input {...field} id={field.name} type='tel' autoComplete='tel' placeholder='+14155552671' />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )} />
              <Controller name='password' control={control} render={({ field, fieldState }) => (
                <Field className=''>
                  <FieldLabel htmlFor={field.name}>Password</FieldLabel>
                  <Input {...field} id={field.name} type='password' />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )} />
              <Controller name='image' control={control} render={({ field, fieldState }) => (
                <Field className=''>
                  <FieldLabel htmlFor={field.name}>Profile Image (Optional)</FieldLabel>
                  <Input
                    id={field.name}
                    type='file'
                    accept={ACCEPTED_IMAGE_TYPES.join(',')}
                    onBlur={field.onBlur}
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) setValue('image', file, { shouldValidate: true })
                    }}

                  />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )} />
            </FieldGroup>
            <FieldGroup className="">
              <Button type='submit' variant={'default'} disabled={isSubmitting}>
                {isSubmitting ? 'Creating Account...' : 'Create Account'}
              </Button>
            </FieldGroup>
          </form>
        </div>
      </div>
    </section>
  )
}

export default SignupPage