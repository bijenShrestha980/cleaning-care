import { DataTable } from "@/components/ui/data-table";
import { categoryData } from "@/constants/fakeData";
import { categoryColumns } from "@/components/admin/module/category-columns";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

const Categories = () => {
  return (
    <section>
      <div className="w-full flex justify-between mb-3">
        <p className="font-medium mb-4">Categories</p>
        <Link href="/admin/dashboard/service/categories/view-category">
          <Button animation={"scale_in"}>
            <Plus size={20} className="mr-2" />
            Add
          </Button>
        </Link>
      </div>
      <DataTable data={categoryData} columns={categoryColumns} />
    </section>
  );
};

export default Categories;
