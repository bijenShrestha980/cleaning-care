import Link from "next/link";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import ServicesDetails from "@/features/services/components/services-details";

const Services = () => {
  return (
    <section>
      <div className="w-full flex justify-between mb-3">
        <p className="font-medium mb-4">Services</p>
        <Link href="/cleaning-care-admin/dashboard/service/service-list/view-service">
          <Button animation={"scale_in"}>
            <Plus size={20} className="mr-2" />
            Add
          </Button>
        </Link>
      </div>
      <ServicesDetails />
    </section>
  );
};

export default Services;
