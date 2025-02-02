"use client";

import { useServiceCategory } from "@/features/service-categories/api/use-service-categories";
import CategoryForm from "@/features/service-categories/components/category-form";
import Loading from "@/components/ui/loading";
import Error from "@/components/ui/error";

const ViewServiceCategory = ({ params }: { params: { id: number } }) => {
  const {
    data: serviceCategoryData,
    isPending,
    isFetching,
    isError,
  } = useServiceCategory(params.id);

  if (isPending || isFetching) {
    return <Loading />;
  }
  if (isError) {
    return <Error />;
  }
  return (
    <div className="pb-5">
      <p className="font-medium mb-4">View style</p>
      <CategoryForm
        serviceCategory={{
          category_name: serviceCategoryData?.category_name ?? "",
          status: serviceCategoryData?.status ?? "active",
          items: serviceCategoryData?.servicecategoryitems
            ? serviceCategoryData?.servicecategoryitems.map((item) => ({
                item_name: item.item_name,
                price: parseInt(item.price),
                status: item.status,
                id: item.id,
              }))
            : [
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
