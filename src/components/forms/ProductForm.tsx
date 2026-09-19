"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  productSchema,
  type ProductFormData,
} from "@/src/lib/validations/product";

import {
  useCreateProductMutation,
  useGetCategoriesQuery,
} from "@/src/lib/services/productApi";

import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Textarea } from "@/src/components/ui/textarea";
import { Label } from "@/src/components/ui/label";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select";

export default function ProductForm() {
  const router = useRouter();

  // ==============================
  // CREATE PRODUCT MUTATION
  // ==============================

  const [
    createProduct,
    {
      isLoading: isCreating,
    },
  ] = useCreateProductMutation();

  // ==============================
  // GET CATEGORIES
  // ==============================

  const {
    data: categories = [],
    isLoading: categoriesLoading,
    isError: categoriesError,
  } = useGetCategoriesQuery();

  // ==============================
  // FORM
  // ==============================

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: {
      errors,
      isSubmitting,
    },
  } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),

    defaultValues: {
      title: "",
      price: 0,
      categoryId: 0,
      description: "",
      image: "",
    },
  });

  // IMPORTANT:
  // Always return a string.
  // Never return undefined.
  const categoryId = watch(
    "categoryId"
  );

  const selectedCategory =
    categoryId > 0
      ? String(categoryId)
      : "";

  // ==============================
  // SUBMIT
  // ==============================

  const onSubmit = async (
    data: ProductFormData
  ) => {
    console.log(
      "========== FORM DATA =========="
    );

    console.log(data);

    // Make absolutely sure values
    // sent to API are correct types.
    const payload = {
      title: data.title.trim(),

      price: Number(data.price),

      description:
        data.description.trim(),

      categoryId:
        Number(data.categoryId),

      images: [
        data.image.trim(),
      ],
    };

    console.log(
      "========== API PAYLOAD =========="
    );

    console.log(
      JSON.stringify(
        payload,
        null,
        2
      )
    );

    // ==============================
    // EXTRA VALIDATION
    // ==============================

    if (!payload.title) {
      alert(
        "Product name is required."
      );

      return;
    }

    if (
      !Number.isFinite(
        payload.price
      ) ||
      payload.price <= 0
    ) {
      alert(
        "Price must be greater than 0."
      );

      return;
    }

    if (
      !payload.categoryId ||
      payload.categoryId <= 0
    ) {
      alert(
        "Please select a category."
      );

      return;
    }

    if (!payload.description) {
      alert(
        "Description is required."
      );

      return;
    }

    if (!payload.images[0]) {
      alert(
        "Image URL is required."
      );

      return;
    }

    // ==============================
    // CREATE
    // ==============================

    try {
      console.log(
        "========== SENDING REQUEST =========="
      );

      const result =
        await createProduct(
          payload
        ).unwrap();

      console.log(
        "========== CREATE SUCCESS =========="
      );

      console.log(
        "API RESPONSE:",
        result
      );

      alert(
        "Product created successfully!"
      );

      // Go back to dashboard.
      router.push("/dashboard");

    } catch (error: any) {
      console.error(
        "========== CREATE FAILED =========="
      );

      console.error(
        "Raw error:",
        error
      );

      console.error(
        "Error status:",
        error?.status
      );

      console.error(
        "Error data:",
        error?.data
      );

      console.error(
        "Error message:",
        error?.message
      );

      // RTK Query fetchBaseQuery
      // normally returns:
      //
      // {
      //   status: 400,
      //   data: ...
      // }

      let message =
        "Failed to create product.";

      if (
        typeof error?.data ===
        "string"
      ) {
        message =
          error.data;
      } else if (
        error?.data?.message
      ) {
        message =
          error.data.message;
      } else if (
        error?.error
      ) {
        message =
          error.error;
      } else if (
        error?.message
      ) {
        message =
          error.message;
      }

      alert(message);
    }
  };

  // ==============================
  // RENDER
  // ==============================

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle>
          Create New Product
        </CardTitle>
      </CardHeader>

      <CardContent>
        <form
          onSubmit={handleSubmit(
            onSubmit
          )}
          className="space-y-6"
        >
          {/* ========================= */}
          {/* PRODUCT NAME */}
          {/* ========================= */}

          <div className="space-y-2">
            <Label htmlFor="title">
              Product Name
            </Label>

            <Input
              id="title"
              placeholder="Enter product name"
              {...register("title")}
            />

            {errors.title && (
              <p className="text-sm text-red-500">
                {
                  errors.title
                    .message
                }
              </p>
            )}
          </div>

          {/* ========================= */}
          {/* PRICE */}
          {/* ========================= */}

          <div className="space-y-2">
            <Label htmlFor="price">
              Price
            </Label>

            <Input
              id="price"
              type="number"
              min="0"
              step="0.01"
              placeholder="100"
              {...register(
                "price",
                {
                  valueAsNumber:
                    true,
                }
              )}
            />

            {errors.price && (
              <p className="text-sm text-red-500">
                {
                  errors.price
                    .message
                }
              </p>
            )}
          </div>

          {/* ========================= */}
          {/* CATEGORY */}
          {/* ========================= */}

          <div className="space-y-2">
            <Label>
              Category
            </Label>

            <Select
              value={
                selectedCategory
              }
              onValueChange={(
                value
              ) => {
                setValue(
                  "categoryId",
                  Number(value),
                  {
                    shouldValidate:
                      true,

                    shouldDirty:
                      true,

                    shouldTouch:
                      true,
                  }
                );
              }}
              disabled={
                categoriesLoading ||
                isCreating
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue
                  placeholder={
                    categoriesLoading
                      ? "Loading categories..."
                      : "Select category"
                  }
                />
              </SelectTrigger>

              <SelectContent>
                {categories.map(
                  (category) => (
                    <SelectItem
                      key={
                        category.id
                      }
                      value={String(
                        category.id
                      )}
                    >
                      {
                        category.name
                      }
                    </SelectItem>
                  )
                )}
              </SelectContent>
            </Select>

            {errors.categoryId && (
              <p className="text-sm text-red-500">
                {
                  errors
                    .categoryId
                    .message
                }
              </p>
            )}

            {categoriesError && (
              <p className="text-sm text-red-500">
                Failed to load
                categories.
              </p>
            )}
          </div>

          {/* ========================= */}
          {/* DESCRIPTION */}
          {/* ========================= */}

          <div className="space-y-2">
            <Label htmlFor="description">
              Description
            </Label>

            <Textarea
              id="description"
              rows={5}
              placeholder="Enter product description"
              {...register(
                "description"
              )}
            />

            {errors.description && (
              <p className="text-sm text-red-500">
                {
                  errors
                    .description
                    .message
                }
              </p>
            )}
          </div>

          {/* ========================= */}
          {/* IMAGE */}
          {/* ========================= */}

          <div className="space-y-2">
            <Label htmlFor="image">
              Image URL
            </Label>

            <Input
              id="image"
              type="url"
              placeholder="https://example.com/image.jpg"
              {...register(
                "image"
              )}
            />

            {errors.image && (
              <p className="text-sm text-red-500">
                {
                  errors.image
                    .message
                }
              </p>
            )}
          </div>

          {/* ========================= */}
          {/* BUTTONS */}
          {/* ========================= */}

          <div className="flex justify-end gap-3">
            <Button
              type="button"
              variant="outline"
              disabled={
                isCreating
              }
              onClick={() =>
                router.back()
              }
            >
              Cancel
            </Button>

            <Button
              type="submit"
              disabled={
                isCreating ||
                isSubmitting ||
                categoriesLoading
              }
            >
              {isCreating
                ? "Creating..."
                : "Create Product"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
