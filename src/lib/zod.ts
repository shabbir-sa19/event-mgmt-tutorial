import * as z from "zod";
import { ACCEPTED_IMAGE_TYPES, EVENT_CATEGORIES, EXPENSE_CATEGORY, MAX_FILE_SIZE, PAYMENT_METHODS } from "./constants";

export const appoinmentValidationSchema = z.object({
  name: z.string().min(2, "Enter a Valid Name").max(64, "Value too Long"),
  email: z.email("Enter a Valid email"),
  // eventType: z.string().min(1, "You must select a spesific Event Type"),
  category: z.string().min(1, "You must select a spesific Event Type"),
  date: z.date().min(new Date(), "Date should be in future"),
  guestCount: z.number().optional(),
  phone: z.e164().optional(),
});
export const imageUploadSchema = z.object({
  title: z.string()
    .min(3, "Title must be at least 3 characters.")
    .max(80, "Title must be under 80 characters."),
  alt: z.string()
    .min(5, "Alt text must be at least 5 characters.")
    .max(120, "Alt text must be under 120 characters.")
    .optional(),
  category: z.enum(EVENT_CATEGORIES, "Please select a valid category."),
  // tags: z.array(z.string()).optional(),
  tags: z.string().optional(),
  image: z.instanceof(File, { message: "Please select an image file." })
    .refine((file) => ACCEPTED_IMAGE_TYPES.includes(file.type), {
      message: "Only JPG, PNG, and WebP files are allowed.",
    })
    .refine((file) => file.size <= MAX_FILE_SIZE, {
      message: "Image size must be 5MB or less.",
    }),
});
export const clientVallidationSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.email(),
  phone: z.e164(),
  address: z.string().max(300).optional().or(z.literal("")),
  notes: z.string().max(1000).optional().or(z.literal("")),
});
export const venueValidationSchema = z.object({
  name: z.string().min(2, "Enter a Valid Name").max(64, "Value too Long"),
  address: z.string(),
  city: z.string(),
  image: z.instanceof(File, { message: "Please select an image file." })
    .refine((file) => ACCEPTED_IMAGE_TYPES.includes(file.type), {
      error: "Only JPG, PNG, and WebP files are allowed.",
    })
    .refine((file) => file.size <= MAX_FILE_SIZE, {
      error: "Image size must be 5MB or less.",
    })
    .optional(),
});
export const eventCreateSchema = z.object({
  title: z.string().min(3).max(150),
  category: z.enum(EVENT_CATEGORIES, { message: "Please select a valid category." }),
  clientId: z.string().min(1).optional(),
  venueId: z.string().optional().or(z.literal("")),
  eventDate: z.string(),
  startTime: z.string().optional().or(z.literal("")),
  endTime: z.string().optional().or(z.literal("")),
  guestCount: z.number().int().positive().max(10000),
  budget: z.number().nonnegative().optional(),
  serviceType: z.enum(["event", "catering", "both"]),
  status: z
    .enum(["lead", "confirmed", "in_progress", "completed", "cancelled"])
    .default("lead"),
  assignedEmployees: z.array(z.string()).optional().default([]),
  notes: z.string().max(2000).optional().or(z.literal("")),
});
export const eventValidationSchema = z.object({
  _id: z.any().optional(),
  title: z.string().min(1, "Input a valid title").max(32, "Title too long"),
  category: z.enum(EVENT_CATEGORIES),
  clientId: z.any().optional(),
  eventDate: z.date().optional(),
  startTime: z.string().optional(),
  endTime: z.string().optional(),
  venue: venueValidationSchema.optional(),
  guestCount: z.number().optional(),
  budget: z.number().optional(),
  serviceType: z
    .union([z.literal("event"), z.literal("catering"), z.literal("both")])
    .optional(),
  status: z
    .union([
      z.literal("lead"),
      z.literal("confirmed"),
      z.literal("in_progress"),
      z.literal("completed").optional(),
      z.literal("cancelled"),
    ])
    .optional(),
  assignedEmployees: z.array(z.any()).optional(),
  message: z.string().optional(),
  createdBy: z.any().optional(),
});
export const expenseValidationSchema = z.object({
  _id: z.any().optional(),
  title: z.string().min(2, "Enter a Valid title").max(80, "Title must be under 80 characters."),
  amount: z.number({ error: "Amount must be a valid number" }).nonnegative(),
  category: z.enum(EXPENSE_CATEGORY),
  expenseDate: z.date().optional(),
  vendor: z.string().optional(),
  paymentMethod: z.enum(PAYMENT_METHODS),
  eventId: z.any().optional(),
  note: z.string().optional(),
  createdBy: z.any().optional(),
});
export const loginSchema = z.object({
  identifier: z.string().trim().min(1, "Enter your user ID, email, or mobile number"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  rememberMe: z.boolean(),
  callbackURL: z.string().optional(),
});
export const signupSchema = z.object({
  email: z.email("Enter a valid email"),
  phone: z.e164("Enter a mobile number in international format, e.g. +14155552671"),
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

export const userProfileSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters").max(100),
  phone: z.e164("Enter a mobile number in international format, e.g. +14155552671"),
});

export const employeeValidationSchema = z.object({
  userID: z.string(),
  passwordHash: z.string(),
  name: z.string(),
  phone: z.e164().max(10),
  email: z.email("Enter a valid email").optional(),
  role: z.union([
    z.literal("chef"),
    z.literal("server"),
    z.literal("coordinator"),
    z.literal("decor"),
    z.literal("driver"),
  ]),
  salaryType: z.union([
    z.literal("monthly"),
    z.literal("daily"),
    z.literal("contract"),
  ]),
  salaryAmount: z.number({ error: "Amount must be a valid number" }).nonnegative(),
  availabilityStatus: z.union([
    z.literal("available"),
    z.literal("busy"),
    z.literal("leave"),
  ]),
  joiningDate: z.date().optional(),
  avatar: z.string().optional(),
  isActive: z.boolean(),
});