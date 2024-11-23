import Link from "next/link";
import { Plus } from "lucide-react";
import { DataTable } from "@/components/ui/data-table";
import { Button } from "@/components/ui/button";
import { testimonialData } from "@/constants/fakeData";
import { testimonialColumns } from "@/components/admin/module/testimonial-columns";

const Testimonials = () => {
  return (
    <section>
      <div className="w-full flex justify-between mb-3">
        <p className="font-medium mb-4">Testimonials</p>
        <Link href="/cleaning-care-admin/dashboard/settings/testimonial/view-testimonial">
          <Button animation={"scale_in"}>
            <Plus size={20} className="mr-2" />
            Add
          </Button>
        </Link>
      </div>
      <DataTable data={testimonialData} columns={testimonialColumns} />
    </section>
  );
};

export default Testimonials;
