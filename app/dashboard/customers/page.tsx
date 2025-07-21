import CustomersTable from "@/app/ui/customers/table";
import { InvoicesTableSkeleton } from "@/app/ui/skeletons";
import { Suspense } from "react";
import { fetchFilteredCustomers } from "@/app/lib/data";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Customers",
};

export default async function Page(props: {
  searchParams?: Promise<{
    query?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || "";

  return (
    <div className="w-full">
      <Suspense key={query} fallback={<InvoicesTableSkeleton />}>
        <CustomersTableWrapper query={query} />
      </Suspense>
    </div>
  );
}

async function CustomersTableWrapper({ query }: { query: string }) {
  const customers = await fetchFilteredCustomers(query);

  return <CustomersTable customers={customers} />;
}
