"use client";

import { useServiceCategory } from "@/features/service-categories/api/use-service-categories";
import CategoryForm from "@/features/service-categories/components/category-form";
import Loading from "@/components/ui/loading";
import Error from "@/components/ui/error";

const ViewServiceCategory = ({ params }: { params: { id: number } }) => {
  const {
    data: serviceCategoryData,
    isPending,
    isError,
  } = useServiceCategory(params.id);

  if (isPending) {
    return <Loading />;
  }
  if (isError) {
    return <Error />;
  }
  return (
    <div>
      <p className="font-medium mb-4">View style</p>
      <CategoryForm
        serviceCategory={{
          category_name: serviceCategoryData?.category_name ?? "",
          status: serviceCategoryData?.status ?? "active",
          items: serviceCategoryData?.items ?? [
            {
              item_name: "",
              price: 0,
              status: "active",
            },
          ],
        }}
        id={serviceCategoryData?.id}
      />
    </div>
  );
};

export default ViewServiceCategory;
