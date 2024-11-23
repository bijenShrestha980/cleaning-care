import Link from "next/link";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import ServiceCategoriesDetails from "@/features/service-categories/components/categories-details";

const Categories = () => {
  return (
    <section>
      <div className="w-full flex justify-between mb-3">
        <p className="font-medium mb-4">Categories</p>
        <Link href="/cleaning-care-admin/dashboard/service/categories/add-category">
          <Button animation={"scale_in"}>
            <Plus size={20} className="mr-2" />
            Add
          </Button>
        </Link>
      </div>
      <ServiceCategoriesDetails />
    </section>
  );
};

export default Categories;
