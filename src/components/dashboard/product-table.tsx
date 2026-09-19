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

import { Card, CardContent } from "../../components/ui/card";

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
      {
        accessorKey: "id",
        header: "ID",
      },

      {
        accessorKey: "title",

        header: ({ column }) => {
          return (
            <Button
              variant="ghost"
              onClick={() =>
                column.toggleSorting(
                  column.getIsSorted() === "asc"
                )
              }
            >
              Product Name

              <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          );
        },
      },

      {
        accessorKey: "category.name",

        id: "category",

        header: "Category",
      },

      {
        accessorKey: "price",

        header: ({ column }) => {
          return (
            <Button
              variant="ghost"
              onClick={() =>
                column.toggleSorting(
                  column.getIsSorted() === "asc"
                )
              }
            >
              Price

              <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          );
        },

        cell: ({ row }) => {
          const price = row.getValue<number>("price");

          return `$${price}`;
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

    getFilteredRowModel:
      getFilteredRowModel(),

    getSortedRowModel:
      getSortedRowModel(),

    getPaginationRowModel:
      getPaginationRowModel(),

    initialState: {
      pagination: {
        pageSize: 10,
      },
    },
  });

  if (isLoading) {
    return (
      <Card>
        <CardContent className="p-6">
          Loading products...
        </CardContent>
      </Card>
    );
  }

  if (isError) {
    return (
      <Card>
        <CardContent className="p-6 text-red-500">
          Failed to load products.
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardContent className="space-y-4 p-6">

        {/* Search + Filter */}
        <div className="flex flex-col gap-3 md:flex-row">
          <Input
            placeholder="Search product name..."
            value={
              (table
                .getColumn("title")
                ?.getFilterValue() as string) ??
              ""
            }
            onChange={(event) =>
              table
                .getColumn("title")
                ?.setFilterValue(event.target.value)
            }
            className="max-w-sm"
          />

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
                  value === "all" ? undefined : value
                );
            }}
          >
            <SelectTrigger className="w-[220px]">
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
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              {table
                .getHeaderGroups()
                .map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map(
                      (header) => (
                        <TableHead key={header.id}>
                          {header.isPlaceholder
                            ? null
                            : flexRender(
                                header.column.columnDef
                                  .header,
                                header.getContext()
                              )}
                        </TableHead>
                      )
                    )}
                  </TableRow>
                ))}
            </TableHeader>

            <TableBody>
              {table.getRowModel().rows.length ? (
                table
                  .getRowModel()
                  .rows.map((row) => (
                    <TableRow key={row.id}>
                      {row
                        .getVisibleCells()
                        .map((cell) => (
                          <TableCell key={cell.id}>
                            {flexRender(
                              cell.column.columnDef.cell,
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
                    className="h-24 text-center"
                  >
                    No products found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Page{" "}
            {table.getState().pagination.pageIndex + 1}{" "}
            of {table.getPageCount()}
          </p>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              <ChevronLeft />
              Previous
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              Next
              <ChevronRight />
            </Button>
          </div>
        </div>

      </CardContent>
    </Card>
  );
}
