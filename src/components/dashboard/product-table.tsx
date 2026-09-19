"use client";

import * as React from "react";

import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  type ColumnDef,
  type SortingState,
  type ColumnFiltersState,
  useReactTable,
} from "@tanstack/react-table";

import {
  ArrowUpDown,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";

import {
  Card,
  CardContent,
} from "../../components/ui/card";

import {
  useGetCategoriesQuery,
  useGetProductsQuery,
} from "../../lib/services/productApi";

import type { Product } from "../../types/product";

export default function ProductTable() {
  const {
    data: products = [],
    isLoading,
    isError,
  } = useGetProductsQuery();

  const {
    data: categories = [],
  } = useGetCategoriesQuery();

  const [sorting, setSorting] =
    React.useState<SortingState>([]);

  const [columnFilters, setColumnFilters] =
    React.useState<ColumnFiltersState>([]);

  const columns = React.useMemo<ColumnDef<Product>[]>(
    () => [
      // ID
      {
        accessorKey: "id",
        header: () => (
          <span className="font-semibold text-slate-700">
            ID
          </span>
        ),
        cell: ({ row }) => (
          <span className="font-medium text-slate-500">
            #{row.getValue("id")}
          </span>
        ),
      },

      // Product Name
      {
        accessorKey: "title",

        header: ({ column }) => (
          <Button
            variant="ghost"
            className="font-semibold text-slate-700 hover:bg-blue-50 hover:text-blue-600"
            onClick={() =>
              column.toggleSorting(
                column.getIsSorted() === "asc"
              )
            }
          >
            Product Name

            <ArrowUpDown className="ml-2 h-4 w-4 text-blue-500" />
          </Button>
        ),

        cell: ({ row }) => (
          <div className="max-w-[300px]">
            <p
              className="truncate font-medium text-slate-800"
              title={row.getValue("title")}
            >
              {row.getValue("title")}
            </p>
          </div>
        ),
      },

      // Category
      {
        accessorKey: "category.name",

        id: "category",

        header: () => (
          <span className="font-semibold text-slate-700">
            Category
          </span>
        ),

        cell: ({ row }) => {
          const category =
            row.original.category?.name;

          return (
            <span className="inline-flex rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700">
              {category || "No Category"}
            </span>
          );
        },
      },

      // Price
      {
        accessorKey: "price",

        header: ({ column }) => (
          <Button
            variant="ghost"
            className="font-semibold text-slate-700 hover:bg-blue-50 hover:text-blue-600"
            onClick={() =>
              column.toggleSorting(
                column.getIsSorted() === "asc"
              )
            }
          >
            Price

            <ArrowUpDown className="ml-2 h-4 w-4 text-blue-500" />
          </Button>
        ),

        cell: ({ row }) => {
          const price =
            row.getValue<number>("price");

          return (
            <span className="font-bold text-emerald-600">
              ${price.toFixed(2)}
            </span>
          );
        },
      },
    ],
    []
  );

  const table = useReactTable({
    data: products,
    columns,

    state: {
      sorting,
      columnFilters,
    },

    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,

    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),

    initialState: {
      pagination: {
        pageSize: 10,
      },
    },
  });

  // Loading
  if (isLoading) {
    return (
      <Card className="border-blue-100 shadow-sm">
        <CardContent className="p-6">
          <div className="flex items-center justify-center py-10">
            <p className="text-blue-600">
              Loading products...
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Error
  if (isError) {
    return (
      <Card className="border-red-200 bg-red-50 shadow-sm">
        <CardContent className="p-6">
          <div className="text-center">
            <p className="font-medium text-red-600">
              Failed to load products.
            </p>

            <p className="mt-1 text-sm text-red-500">
              Please try again later.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="overflow-hidden border-blue-100 bg-white shadow-md">

      <CardContent className="space-y-5 p-6">

        {/* Search + Filter */}
        <div className="flex flex-col gap-3 md:flex-row md:items-center">

          {/* Search */}
          <div className="relative max-w-sm flex-1">
            <Input
              placeholder="Search product name..."
              value={
                (table
                  .getColumn("title")
                  ?.getFilterValue() as string) ?? ""
              }
              onChange={(event) =>
                table
                  .getColumn("title")
                  ?.setFilterValue(
                    event.target.value
                  )
              }
              className="border-blue-200 bg-blue-50/30 focus-visible:ring-blue-500"
            />
          </div>

          {/* Category Filter */}
          <Select
            value={
              (table
                .getColumn("category")
                ?.getFilterValue() as string) ??
              "all"
            }
            onValueChange={(value) => {
              table
                .getColumn("category")
                ?.setFilterValue(
                  value === "all"
                    ? undefined
                    : value
                );
            }}
          >
            <SelectTrigger className="w-[220px] border-blue-200 bg-blue-50/30 focus:ring-blue-500">
              <SelectValue placeholder="Filter category" />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="all">
                All Categories
              </SelectItem>

              {categories.map((category) => (
                <SelectItem
                  key={category.id}
                  value={category.name}
                >
                  {category.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Table */}
        <div className="overflow-hidden rounded-xl border border-blue-100">

          <Table>

            {/* Header */}
            <TableHeader>
              {table
                .getHeaderGroups()
                .map((headerGroup) => (
                  <TableRow
                    key={headerGroup.id}
                    className="border-blue-100 bg-blue-50 hover:bg-blue-50"
                  >
                    {headerGroup.headers.map(
                      (header) => (
                        <TableHead
                          key={header.id}
                          className="h-12"
                        >
                          {header.isPlaceholder
                            ? null
                            : flexRender(
                                header.column
                                  .columnDef
                                  .header,
                                header.getContext()
                              )}
                        </TableHead>
                      )
                    )}
                  </TableRow>
                ))}
            </TableHeader>

            {/* Body */}
            <TableBody>
              {table.getRowModel().rows.length ? (
                table
                  .getRowModel()
                  .rows.map((row, index) => (
                    <TableRow
                      key={row.id}
                      className={`
                        border-blue-50
                        transition-colors
                        hover:bg-blue-50/50
                        ${
                          index % 2 === 0
                            ? "bg-white"
                            : "bg-slate-50/50"
                        }
                      `}
                    >
                      {row
                        .getVisibleCells()
                        .map((cell) => (
                          <TableCell
                            key={cell.id}
                            className="py-4"
                          >
                            {flexRender(
                              cell.column
                                .columnDef.cell,
                              cell.getContext()
                            )}
                          </TableCell>
                        ))}
                    </TableRow>
                  ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-32 text-center"
                  >
                    <div className="flex flex-col items-center gap-2">
                      <p className="font-medium text-slate-600">
                        No products found
                      </p>

                      <p className="text-sm text-slate-400">
                        Try changing your search or
                        category filter.
                      </p>
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>

          </Table>
        </div>

        {/* Pagination */}
        <div className="flex flex-col gap-4 border-t border-blue-100 pt-5 sm:flex-row sm:items-center sm:justify-between">

          {/* Page Information */}
          <div>
            <p className="text-sm text-slate-500">
              Page{" "}
              <span className="font-semibold text-blue-600">
                {table.getState().pagination.pageIndex + 1}
              </span>{" "}
              of{" "}
              <span className="font-semibold text-slate-700">
                {table.getPageCount()}
              </span>
            </p>
          </div>

          {/* Buttons */}
          <div className="flex items-center gap-2">

            {/* Previous */}
            <Button
              variant="outline"
              size="sm"
              className="border-blue-200 text-blue-600 hover:bg-blue-50 hover:text-blue-700"
              onClick={() =>
                table.previousPage()
              }
              disabled={
                !table.getCanPreviousPage()
              }
            >
              <ChevronLeft className="mr-1 h-4 w-4" />
              Previous
            </Button>

            {/* Next */}
            <Button
              size="sm"
              className="bg-blue-600 text-white hover:bg-blue-700"
              onClick={() =>
                table.nextPage()
              }
              disabled={
                !table.getCanNextPage()
              }
            >
              Next
              <ChevronRight className="ml-1 h-4 w-4" />
            </Button>

          </div>
        </div>

      </CardContent>
    </Card>
  );
}
