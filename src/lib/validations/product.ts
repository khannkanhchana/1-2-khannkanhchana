import { z } from "zod";

export const productSchema = z.object({
  title: z
    .string()
    .trim()
    .min(
      2,
      "Product name must be at least 2 characters"
    ),

  price: z
    .number({
      message: "Price is required",
    })
    .positive(
      "Price must be greater than 0"
    ),

  categoryId: z
    .number({
      message: "Please select a category",
    })
    .positive(
      "Please select a category"
    ),

  description: z
    .string()
    .trim()
    .min(
      5,
      "Description must be at least 5 characters"
    ),

  image: z
    .string()
    .trim()
    .url(
      "Please enter a valid image URL"
    ),
});

export type ProductFormData =
  z.infer<typeof productSchema>;
