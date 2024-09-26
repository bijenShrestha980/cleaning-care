"use client";
import { LoaderCircle } from "lucide-react";
import { DataTable } from "@/components/ui/data-table";
import { categoryColumns } from "@/components/admin/module/category-columns";
import { useAllCategories } from "@/feature/categories/api/use-categories";

const CategoriesDetails = () => {
  const { data: categoriesData, isPending } = useAllCategories();

  if (isPending) {
    return (
      <div className="w-full h-[200px] flex justify-center items-center">
        <LoaderCircle className="w-12 h-12 animate-spin" />
      </div>
    );
  }
  return (
    <DataTable
      data={categoriesData ? categoriesData : []}
      columns={categoryColumns}
      headerColor="bg-secondary-100"
    />
  );
};

export default CategoriesDetails;
