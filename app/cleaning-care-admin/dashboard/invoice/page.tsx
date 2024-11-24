import Link from "next/link";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import InvoiceDetails from "@/features/invoice/components/invoice-details";

const Invoice = () => {
  return (
    <section>
      <div className="w-full flex justify-between mb-3">
        <p className="font-medium mb-4">Invoice</p>
        {/* <Link href="/cleaning-care-admin/dashboard/why-choose-us/features/add-features">
          <Button animation={"scale_in"}>
            <Plus size={20} className="mr-2" />
            Add
          </Button>
        </Link> */}
      </div>
      <InvoiceDetails />
    </section>
  );
};

export default Invoice;
