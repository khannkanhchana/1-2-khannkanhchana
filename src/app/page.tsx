"use client";

import { useState } from "react";

import Navbar from "@/src/components/navbar";
import ProductCard from "@/src/components/ProductCard";

import { Button } from "@/src/components/ui/button";

import { useGetProductsQuery } from "@/src/lib/services/productApi";

import {
  ChevronLeft,
  ChevronRight,
  ShoppingBag,
  Sparkles,
} from "lucide-react";

export default function Home() {
  const {
    data: products = [],
    isLoading,
    isError,
  } = useGetProductsQuery();

  // =========================
  // PAGINATION
  // =========================

  const [currentPage, setCurrentPage] =
    useState(1);

  const productsPerPage = 8;

  const totalPages = Math.ceil(
    products.length / productsPerPage
  );

  const startIndex =
    (currentPage - 1) *
    productsPerPage;

  const currentProducts =
    products.slice(
      startIndex,
      startIndex + productsPerPage
    );

  // =========================
  // PREVIOUS PAGE
  // =========================

  const previousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(
        currentPage - 1
      );

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  // =========================
  // NEXT PAGE
  // =========================

  const nextPage = () => {
    if (
      currentPage < totalPages
    ) {
      setCurrentPage(
        currentPage + 1
      );

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">

      {/* ========================= */}
      {/* NAVBAR */}
      {/* ========================= */}

      <Navbar />

      {/* ========================= */}
      {/* HERO */}
      {/* ========================= */}

      <section className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700">

        {/* Decorations */}
        <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-white/10" />

        <div className="absolute -bottom-32 -left-20 h-80 w-80 rounded-full bg-white/10" />

        <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">

          <div className="max-w-3xl">

            {/* Badge */}
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-sm font-medium text-white backdrop-blur-sm">
              <Sparkles className="h-4 w-4" />
              Discover something amazing
            </div>

            {/* Title */}
            <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
              Welcome to
              <span className="block text-cyan-200">
                My Shop
              </span>
            </h1>

            {/* Description */}
            <p className="mt-6 max-w-2xl text-lg leading-8 text-blue-100">
              Discover amazing products,
              explore our collection, and
              find something perfect for you.
            </p>

            {/* Button */}
            <div className="mt-8">
              <Button
                size="lg"
                className="bg-white text-blue-700 shadow-lg hover:bg-blue-50"
                onClick={() => {
                  document
                    .getElementById("products")
                    ?.scrollIntoView({
                      behavior: "smooth",
                    });
                }}
              >
                <ShoppingBag className="mr-2 h-5 w-5" />
                Explore Products
              </Button>
            </div>

          </div>
        </div>
      </section>

      {/* ========================= */}
      {/* MAIN */}
      {/* ========================= */}

      <main
        id="products"
        className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8"
      >

        {/* ========================= */}
        {/* PRODUCTS HEADER */}
        {/* ========================= */}

        <section>

          <div className="mb-8">

            <div className="mb-2 flex items-center gap-2">

              <div className="h-1 w-8 rounded-full bg-blue-600" />

              <span className="text-sm font-semibold uppercase tracking-wider text-blue-600">
                Our Collection
              </span>

            </div>

            <h2 className="text-3xl font-bold tracking-tight text-slate-900">
              Featured Products
            </h2>

            {!isLoading &&
              !isError && (
                <p className="mt-2 text-sm text-slate-500">
                  {products.length} products
                  available
                </p>
              )}

          </div>

          {/* ========================= */}
          {/* LOADING */}
          {/* ========================= */}

          {isLoading && (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">

              {Array.from({
                length: 8,
              }).map((_, index) => (
                <div
                  key={index}
                  className="h-96 animate-pulse rounded-2xl bg-gradient-to-br from-slate-200 to-slate-100"
                />
              ))}

            </div>
          )}

          {/* ========================= */}
          {/* ERROR */}
          {/* ========================= */}

          {isError && (
            <div className="rounded-2xl border border-red-200 bg-red-50 p-8 text-center">

              <p className="font-semibold text-red-600">
                Failed to load products.
              </p>

              <p className="mt-1 text-sm text-red-500">
                Please try again later.
              </p>

            </div>
          )}

          {/* ========================= */}
          {/* PRODUCTS */}
          {/* ========================= */}

          {!isLoading &&
            !isError &&
            currentProducts.length > 0 && (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">

                {currentProducts.map(
                  (product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                    />
                  )
                )}

              </div>
            )}

          {/* ========================= */}
          {/* NO PRODUCTS */}
          {/* ========================= */}

          {!isLoading &&
            !isError &&
            products.length === 0 && (
              <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center">

                <ShoppingBag className="mx-auto mb-4 h-10 w-10 text-slate-400" />

                <p className="font-medium text-slate-600">
                  No products found.
                </p>

              </div>
            )}

          {/* ========================= */}
          {/* PAGINATION */}
          {/* Same style as Dashboard */}
          {/* ========================= */}

          {!isLoading &&
            !isError &&
            totalPages > 1 && (
              <div className="mt-8 flex items-center justify-between">

                {/* Page Information */}
                <p className="text-sm text-muted-foreground">
                  Page{" "}
                  {currentPage}{" "}
                  of{" "}
                  {totalPages}
                </p>

                {/* Buttons */}
                <div className="flex items-center gap-2">

                  {/* Previous */}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={
                      previousPage
                    }
                    disabled={
                      currentPage === 1
                    }
                  >
                    <ChevronLeft className="mr-1 h-4 w-4" />
                    Previous
                  </Button>

                  {/* Next */}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={
                      nextPage
                    }
                    disabled={
                      currentPage ===
                      totalPages
                    }
                  >
                    Next
                    <ChevronRight className="ml-1 h-4 w-4" />
                  </Button>

                </div>

              </div>
            )}

        </section>
      </main>

      {/* ========================= */}
      {/* FOOTER */}
      {/* ========================= */}

      <footer className="mt-12 border-t bg-slate-900">

        <div className="mx-auto max-w-7xl px-4 py-8 text-center sm:px-6 lg:px-8">

          <div className="flex items-center justify-center gap-2 text-white">

            <ShoppingBag className="h-5 w-5 text-blue-400" />

            <span className="font-bold">
              My Shop
            </span>

          </div>

          <p className="mt-2 text-sm text-slate-400">
            Discover products you'll love.
          </p>

          <p className="mt-4 text-xs text-slate-500">
            © {new Date().getFullYear()} My Shop.
            All rights reserved.
          </p>

        </div>

      </footer>

    </div>
  );
}
