"use client"
import { Button } from '@/components/ui/button'
import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { authClient } from '@/lib/auth-client'
import { ACCEPTED_IMAGE_TYPES, MAX_FILE_SIZE } from '@/lib/constants'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'

type Props = {}

const signupSchema = z.object({
  email: z.email("Enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  name: z.string(),
  image: z.instanceof(File)
    .refine((file) => ACCEPTED_IMAGE_TYPES.includes(file.type), {
      error: "Only JPG, PNG, and WebP files are allowed.",
    })
    .refine((file) => file.size <= MAX_FILE_SIZE, {
      error: "Image size must be 5MB or less.",
    })
    .optional(),
});

const SignupPage = (props: Props) => {
  const { data } = authClient.useSession()
  const router = useRouter()
  const { register, control, handleSubmit, setValue, formState: { isSubmitting } } = useForm<z.infer<typeof signupSchema>>({
    defaultValues: {
      email: "",
      password: "",
      name: "",
      image: undefined,
    }
  })

  const signup = async (value: z.infer<typeof signupSchema>) => {
    await authClient.signUp.email({
      email: value.email,
      name: value.name,
      password: value.password,
      fetchOptions: {
        onRequest: () => {
          if (value.image && ACCEPTED_IMAGE_TYPES.includes(value.image.type)) {
            console.log("Valid Image")
          }
        },
        onSuccess: () => {
          router.push("/login")
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
          <form onSubmit={handleSubmit(signup)} {...register} id="SignupForm" className="space-y-8">
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
                      setValue('image', file, { shouldValidate: true })
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