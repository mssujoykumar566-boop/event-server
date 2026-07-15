import { z } from "zod";

export const createEventValidation = z.object({
  title: z
    .string()
    .min(3, "Title must be at least 3 characters"),

  shortDescription: z
    .string()
    .min(10, "Short description must be at least 10 characters"),

  description: z
    .string()
    .min(20, "Description must be at least 20 characters"),

  category: z
    .string()
    .min(2, "Category is required"),

  location: z
    .string()
    .min(2, "Location is required"),

  date: z
    .string(),

  price: z
    .number()
    .min(0, "Price cannot be negative"),

  image: z
    .string()
    .url("Invalid image URL"),

  organizer: z
    .string()
    .min(2, "Organizer name required"),

  featured: z
    .boolean()
    .optional(),
});