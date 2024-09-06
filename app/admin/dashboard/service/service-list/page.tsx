import Link from "next/link";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { serviceData } from "@/constants/fakeData";
import { serviceColumns } from "@/components/admin/module/service-columns";

const Services = () => {
  return (
    <section>
      <div className="w-full flex justify-between mb-3">
        <p className="font-medium mb-4">Services</p>
        <Link href="/admin/dashboard/service/service-list/view-service">
          <Button animation={"scale_in"}>
            <Plus size={20} className="mr-2" />
            Add
          </Button>
        </Link>
      </div>
      <DataTable data={serviceData} columns={serviceColumns} />
    </section>
  );
};

export default Services;
