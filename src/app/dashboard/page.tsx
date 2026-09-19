"use client";

import Link from "next/link";

import { AppSidebar } from "../../components/app-sidebar";
import { SiteHeader } from "../../components/site-header";
import ProductTable from "../../components/dashboard/product-table";

import {
  SidebarInset,
  SidebarProvider,
} from "../../components/ui/sidebar";

import { Button } from "../../components/ui/button";

export default function DashboardPage() {
  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width":
            "calc(var(--spacing) * 72)",
          "--header-height":
            "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" />

      <SidebarInset>
        <SiteHeader />

        <main className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">

              {/* Page Header */}
              <div className="flex items-center justify-between px-4 lg:px-6">

                {/* Title */}
                <div>
                  <h1 className="text-2xl font-bold">
                    Products
                  </h1>

                  <p className="text-muted-foreground">
                    Manage your product data.
                  </p>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2">

                  {/* Home Button */}
                  <Button
                    variant="outline"
                    asChild
                  >
                    <Link href="/">
                      Home
                    </Link>
                  </Button>

                  {/* Add Product Button */}
                  <Button asChild>
                    <Link href="/dashboard/products/new">
                      Add Product
                    </Link>
                  </Button>

                </div>
              </div>

              {/* Product Table */}
              <div className="px-4 lg:px-6">
                <ProductTable />
              </div>

            </div>
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
