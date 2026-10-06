"use client";

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Textarea } from '@/components/ui/textarea';
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { Controller, useForm } from 'react-hook-form';
import * as z from "zod";

type AppointmentFormData = z.infer<typeof appoinmentValidationSchema>;

const appoinmentValidationSchema = z.object({
  name: z.string().min(2, "Enter a Valid Name").max(64, "Value too Long"),
  email: z.email("Enter a Valid email"),
  phone: z.e164().optional(),
  category: z.string().min(1, "You must select a spesific Event Type"),
  date: z.date().min(new Date(), "Date should be in future"),
  guestCount: z.number().optional(),
  budgetRange: z.array(z.number()).optional(),
  message: z.string().optional(),
  source: z.literal("website").optional(),
});

const types = [
  { lable: "Wedding", value: "wedding" },
  { lable: "Corporate", value: "corporate" },
  { lable: "Private Party", value: "private" },
  { lable: "Other", value: "other" },
];

export default function AppoinmentPage() {
  const MIN = 1;
  const MAX = 99;
  const defaultValue = [20, 50]

  const { control, handleSubmit, formState: { isSubmitting } } = useForm<AppointmentFormData>({
    resolver: zodResolver(appoinmentValidationSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      category: "",
      guestCount: 0,
      date: undefined,
      message: "",
      budgetRange: [0, 0],
      source: 'website',
    }
  });

  const bookAppoinmentHandler = async (data: AppointmentFormData) => {
    const formData = new FormData();

    Object.entries(data).forEach(([key, value]) => {
      if (value instanceof Date) {
        formData.append(key, value.toISOString());
        return;
      }

      if (Array.isArray(value)) {
        formData.append(key, value.join(','));
        return;
      }

      if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') {
        formData.append(key, String(value));
      }

      // formData.forEach((v, k) => {
      //   console.log(k.toString(), v.toString())
      // })

    });
  }
  return (
    <section className="w-full">
      <div className="flex flex-col justify-center items-center max-w-xl mx-auto border rounded-xl px-4 py-2 my-2">
        <div className="">
          <h2 className='text-2xl mt-2 text-center font-bold leading-loose lg:text-3xl'>Book an Appoinment</h2>
        </div>
        <div className="w-full px-2 py-4 space-y-4">
          <form className="space-y-8" onSubmit={handleSubmit(bookAppoinmentHandler)}>
            <FieldGroup className='space-y-0'>
              <Controller name='name' control={control} render={({ field, fieldState }) => (
                <Field className=''>
                  <FieldLabel htmlFor={field.name}>Name</FieldLabel>
                  <Input {...field} id={field.name} />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )} />
              <Controller name='email' control={control} render={({ field, fieldState }) => (
                <Field className=''>
                  <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                  <Input {...field} id={field.name} />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )} />
              <Controller name='phone' control={control} render={({ field, fieldState }) => (
                <Field className=''>
                  <FieldLabel htmlFor={field.name}>Phone/Mobile no.</FieldLabel>
                  <Input {...field} id={field.name} type="tel" placeholder="+91 9999999999" />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )} />
              <Controller name="category"
                control={control}
                render={({ field, fieldState }) => (
                  <Field className="">
                    <FieldLabel htmlFor={field.name}>Event Type</FieldLabel>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger className="w-full rounded-lg border border-input bg-background px-4 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50">
                        <SelectValue placeholder="Category" />
                      </SelectTrigger>
                      <SelectContent className="">
                        <SelectGroup>
                          {types.map((item) => (
                            <SelectItem key={item.value} value={item.value}>
                              {item.lable}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                    {fieldState.invalid && (<FieldError errors={[fieldState.error]} />)}
                  </Field>
                )}
              />
              <Controller name='budgetRange' control={control} render={({ field, fieldState }) => (
                <Field className=''>
                  <FieldLabel htmlFor={field.name}>Budget Range</FieldLabel>
                  <div className="flex items-center gap-8">
                    <span className='text-center w-32'>{field.value ? field.value[0] : defaultValue[0]}L</span>
                    <Slider id={field.name}
                      defaultValue={[defaultValue[0], defaultValue[1]]}
                      min={MIN}
                      max={MAX}
                      step={1}
                      value={field.value}
                      onValueChange={field.onChange} />
                    <span className='w-32 text-center'>{field.value && field.value[1] || defaultValue[1]}L</span>
                  </div>
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )} />
              <div className="flex justify-between w-full gap-4">
                <Controller name='date' control={control} render={({ field, fieldState }) => (
                  <Field className=''>
                    <FieldLabel htmlFor={field.name}>Pick a date</FieldLabel>
                    <Popover>
                      <PopoverTrigger
                        render={
                          <Button
                            variant="outline"
                            className="justify-start text-left font-normal data-[empty=true]:text-muted-foreground"
                          />
                        }>
                        <CalendarIcon />
                        {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar mode="single" selected={field.value} onSelect={field.onChange} />
                      </PopoverContent>
                    </Popover>
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                  </Field>
                )} />
                <Controller name='guestCount' control={control} render={({ field, fieldState }) => (
                  <Field className=''>
                    <FieldLabel htmlFor={field.name}>Guest Count</FieldLabel>
                    <Input
                      {...field}
                      id={field.name}
                      type='number'
                      value={field.value ?? ''}
                      onChange={(event) => {
                        const value = event.target.value;
                        field.onChange(value === '' ? undefined : Number(value));
                      }}
                    />
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                  </Field>
                )} />
              </div>
              <Controller name='message' control={control} render={({ field, fieldState }) => (
                <Field className=''>
                  <FieldLabel htmlFor={field.name}>Message</FieldLabel>
                  <Textarea className='' {...field} id={field.name} />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )} />
            </FieldGroup>
            <FieldGroup className=''>
              <Button className={""} type='submit' disabled={isSubmitting}>
                {isSubmitting ? "Please wait..." : "Book appoinment"}
              </Button>
            </FieldGroup>
          </form>
          <p className="text-center text-muted-foreground">
            We&apos;ll respond within 24 hours to confirm.
          </p>
        </div>
      </div>
    </section>
  )
}
