"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";

import { Button } from "@/src/components/ui/button";

import type { Product } from "@/src/types/product";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({
  product,
}: ProductCardProps) {
  // Get first product image
  const imageUrl =
    product.images &&
    product.images.length > 0
      ? product.images[0]
      : "https://placehold.co/600x400?text=No+Image";

  return (
    <Card className="group overflow-hidden transition-shadow hover:shadow-lg">

      {/* ========================= */}
      {/* PRODUCT IMAGE */}
      {/* ========================= */}

      <div className="relative h-52 w-full overflow-hidden bg-muted">
        <img
          src={imageUrl}
          alt={product.title}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          onError={(event) => {
            event.currentTarget.src =
              "https://placehold.co/600x400?text=No+Image";
          }}
        />
      </div>

      {/* ========================= */}
      {/* PRODUCT HEADER */}
      {/* ========================= */}

      <CardHeader>
        <CardTitle className="line-clamp-1 min-h-6">
          {product.title}
        </CardTitle>
      </CardHeader>

      {/* ========================= */}
      {/* PRODUCT CONTENT */}
      {/* ========================= */}

      <CardContent className="space-y-3">

        {/* Category */}
        {product.category && (
          <div>
            <span className="rounded-full bg-muted px-3 py-1 text-xs text-muted-foreground">
              {product.category.name}
            </span>
          </div>
        )}

        {/* Description */}
        {product.description && (
          <p className="line-clamp-2 min-h-10 text-sm text-muted-foreground">
            {product.description}
          </p>
        )}

        {/* Price */}
        <p className="text-xl font-bold">
          ${product.price}
        </p>
      </CardContent>

      {/* ========================= */}
      {/* FOOTER */}
      {/* ========================= */}

      <CardFooter>
        <Button className="w-full">
          View Product
        </Button>
      </CardFooter>
    </Card>
  );
}
