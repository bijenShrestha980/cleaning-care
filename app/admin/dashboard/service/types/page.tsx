import Link from "next/link";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { typeColumns } from "@/components/admin/module/type-columns";
import { typeData } from "@/constants/fakeData";

const Types = () => {
  return (
    <section>
      <div className="w-full flex justify-between mb-3">
        <p className="font-medium mb-4">Types</p>
        <Link href="/admin/dashboard/service/types/view-type">
          <Button animation={"scale_in"}>
            <Plus size={20} className="mr-2" />
            Add
          </Button>
        </Link>
      </div>
      <DataTable data={typeData} columns={typeColumns} />
    </section>
  );
};

export default Types;
