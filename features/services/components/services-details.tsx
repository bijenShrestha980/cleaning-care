"use client";
import { DataTable } from "@/components/ui/data-table";
import Loading from "@/components/ui/loading";
import { serviceColumns } from "@/components/admin/module/service-columns";
import { useServices } from "@/features/services/api/use-service";

const ServicesDetails = () => {
  const { data: servicesData, isPending } = useServices();

  if (isPending) {
    return <Loading />;
  }
  return (
    <DataTable
      data={servicesData ? servicesData : []}
      columns={serviceColumns}
    />
  );
};

export default ServicesDetails;
