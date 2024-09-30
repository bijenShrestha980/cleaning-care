"use client";
import { DataTable } from "@/components/ui/data-table";
import { categoryColumns } from "@/components/admin/module/category-columns";
import Loading from "@/components/ui/loading";
import Error from "@/components/ui/error";
import { useAllServiceCategory } from "@/features/service-categories/api/use-service-categories";

const ServiceCategoriesDetails = () => {
  const {
    data: serviceCategoriesData,
    isPending,
    isError,
  } = useAllServiceCategory();

  if (isPending) {
    return <Loading />;
  }
  if (isError) {
    return <Error />;
  }
  return (
    <DataTable
      data={serviceCategoriesData ? serviceCategoriesData : []}
      columns={categoryColumns}
    />
  );
};

export default ServiceCategoriesDetails;
