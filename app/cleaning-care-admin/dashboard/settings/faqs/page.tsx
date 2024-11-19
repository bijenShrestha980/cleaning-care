import Link from "next/link";
import { Plus } from "lucide-react";

import { DataTable } from "@/components/ui/data-table";
import { Button } from "@/components/ui/button";
import { faqData } from "@/constants/fakeData";
import { faqColumns } from "@/components/admin/module/faq-columns";

const FAQ = () => {
  return (
    <section>
      <div className="w-full flex justify-between mb-3">
        <p className="font-medium mb-4">FAQs</p>
        <Link href="/admin/dashboard/settings/faqs/view-faqs">
          <Button animation={"scale_in"}>
            <Plus size={20} className="mr-2" />
            Add
          </Button>
        </Link>
      </div>
      <DataTable data={faqData} columns={faqColumns} />
    </section>
  );
};

export default FAQ;
