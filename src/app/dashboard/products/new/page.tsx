import ProductForm from "@/src/components/forms/ProductForm";

export default function NewProductPage() {
  return (
    <main className="min-h-screen p-6">
      <div className="mx-auto max-w-4xl">
        <div className="mb-6">
          <h1 className="text-2xl font-bold tracking-tight">
            Create Product
          </h1>

          <p className="mt-1 text-sm text-muted-foreground">
            Add a new product to the system.
          </p>
        </div>

        <ProductForm />
      </div>
    </main>
  );
}
