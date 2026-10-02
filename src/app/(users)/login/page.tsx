"use client"

import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { authClient } from '@/lib/auth-client'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'

type Props = {}

const loginSchema = z.object({
  email: z.email("Enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  rememberMe: z.boolean(),
  callbackURL: z.string().optional(),
});

const LoginPage = (props: Props) => {
  const { data } = authClient.useSession()
  const router = useRouter()
  const { register, control, handleSubmit, formState: { isSubmitting } } = useForm<z.infer<typeof loginSchema>>({
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    }
  })
  const login = async (value: z.infer<typeof loginSchema>) => {
    await authClient.signIn.email({
      email: value.email,
      password: value.password,
      rememberMe: value.rememberMe,
      fetchOptions: {
        onSuccess: () => {
          router.push("/dashboard")
        }
      }
    })
  }
  useEffect(() => {
    if (data?.user) { router.push("/dashboard") }
  }, [data])

  return (
    <section className="w-full">
      <div className="flex flex-col justify-center items-center max-w-xl mx-auto border rounded-xl px-4 py-2 my-2">
        <div className="w-full mb-8">
          <h2 className="text-2xl mt-2 text-center font-bold leading-loose lg:text-3xl">
            Log into your account
          </h2>
          <p className="text-sm p-4 font-light text-muted-foreground text-center">
            Don't have an account?
            <Link
              href="/signup"
              className="pl-2 font-medium hover:underline"
            >
              Sign up here
            </Link>
          </p>
          <p className="text-center text-sm text-destructive-foreground">{ }</p>
        </div>
        <div className="w-full px-2 py-4">
          <form onSubmit={handleSubmit(login)} className="space-y-8" id="LoginForm" {...register}>
            <FieldGroup className="mx-auto">
              <Controller name='email' control={control} render={({ field, fieldState }) => (
                <Field className=''>
                  <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                  <Input {...field} id={field.name} type='email' value={field.value || ""} />
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
              <Controller name="rememberMe" control={control} render={({ field, fieldState }) => (
                <Field className="" orientation={'horizontal'}>
                  <FieldLabel htmlFor={field.name} className="order-2">Remember Me</FieldLabel>
                  <Checkbox id={field.name} onBlur={field.onBlur} name={field.name} className="order-1" checked={field.value} onCheckedChange={field.onChange} />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )} />
            </FieldGroup>
            <FieldGroup className="">
              <Button type="submit" disabled={isSubmitting} variant={'default'}>
                {isSubmitting ? 'Logging in...' : 'Login'}
              </Button>
            </FieldGroup>
          </form>
        </div>
      </div>
    </section>
  )
}

export default LoginPage