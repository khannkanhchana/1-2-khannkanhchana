import {
  createApi,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";

import type { Product } from "@/src/types/product";

export interface Category {
  id: number;
  name: string;
  image: string;
}

export interface CreateProductRequest {
  title: string;
  price: number;
  description: string;
  categoryId: number;
  images: string[];
}

export const productApi = createApi({
  reducerPath: "productApi",

  baseQuery: fetchBaseQuery({
    baseUrl:
      "https://api.escuelajs.co/api/v1",
  }),

  tagTypes: [
    "Products",
    "Categories",
  ],

  endpoints: (builder) => ({

    // =========================
    // GET PRODUCTS
    // =========================

    getProducts: builder.query<
      Product[],
      void
    >({
      query: () => "/products",

      providesTags: (result) =>
        result
          ? [
              ...result.map(
                ({ id }) => ({
                  type:
                    "Products" as const,
                  id,
                })
              ),

              {
                type:
                  "Products" as const,
                id: "LIST",
              },
            ]
          : [
              {
                type:
                  "Products" as const,
                id: "LIST",
              },
            ],
    }),

    // =========================
    // GET CATEGORIES
    // =========================

    getCategories: builder.query<
      Category[],
      void
    >({
      query: () => "/categories",

      providesTags: [
        "Categories",
      ],
    }),

    // =========================
    // CREATE PRODUCT
    // =========================

    createProduct: builder.mutation<
      Product,
      CreateProductRequest
    >({
      query: (body) => ({
        url: "/products",
        method: "POST",
        body,
      }),

      invalidatesTags: [
        {
          type: "Products",
          id: "LIST",
        },
      ],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetCategoriesQuery,
  useCreateProductMutation,
} = productApi;
