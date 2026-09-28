import { EVENT_CATEGORIES, EXPENSE_CATEGORY, PAYMENT_METHODS } from "@/lib/constants";

export type eventCategory = typeof EVENT_CATEGORIES[number];
export type expenseCategory = typeof EXPENSE_CATEGORY[number];
export type paymentMethod = typeof PAYMENT_METHODS[number];


export interface EmployeeType {
  _id?: mongoose.Types.ObjectId;
  userID: string;
  passwordHash: string;
  name: string;
  phone: string;
  email?: string;
  role: "chef" | "server" | "coordinator" | "decor" | "driver";
  salaryType: "monthly" | "daily" | "contract";
  salaryAmount: number;
  availabilityStatus: "available" | "busy" | "leave";
  joiningDate?: Date;
  avatar?: string;
  isActive: boolean;
}

export interface clientType {
  _id?: mongoose.Types.ObjectId;
  name: string;
  email: string;
  phone?: string;
  address?: string;
  notes?: string;
  createdBy?: mongoose.Types.ObjectId;
}

export interface venueType {
  _id?: mongoose.Types.ObjectId;
  name: string;
  address?: string;
  city?: string;
  imageUrl?: string;
}

export interface expenseType {
  _id?: mongoose.Types.ObjectId;
  title: string;
  amount: number;
  category: expenseCategory;
  expenseDate?: Date;
  vendor?: string;
  paymentMethod: paymentMethod;
  eventId?: mongoose.Types.ObjectId;
  note?: string;
  createdBy?: mongoose.Types.ObjectId;
}

export interface appointmentType {
  name: string;
  email: string;
  phone?: string;
  category: eventCategory;
  preferredDate?: string;
  guestCount?: number;
  budgetRange?: string;
  message?: string;
  status?: "new" | "contacted" | "converted" | "closed";
  source?: "website";
}

export interface eventType {
  _id?: mongoose.Types.ObjectId;
  title: string;
  category: eventCategory;
  clientId?: mongoose.Types.ObjectId;
  eventDate?: Date;
  startTime?: string;
  endTime?: string;
  venue?: venueType;
  guestCount?: number;
  budget?: number;
  serviceType?: "event" | "catering" | "both";
  status?: "lead" | "confirmed" | "in_progress" | "completed" | "cancelled";
  assignedEmployees?: mongoose.Types.ObjectId[];
  message?: string;
  createdBy?: mongoose.Types.ObjectId;
}

export interface Images {
  _id: string;
  kind: string;
  mimeType: string;
  name: string;
}

export type GalleryItemType = {
  _id?: mongoose.Types.ObjectId;
  title: string;
  imageUrl: string;
  thumbnailUrl?: string;
  altText?: string;
  width: number;
  height: number;
  category: eventCategory;
  isPublished: boolean;
  sortOrder?: number;
  tags?: string[];
  size: number;
};
