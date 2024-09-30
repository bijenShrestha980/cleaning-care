"use client";

import ServiceForm from "@/features/services/components/service-form";
import Loading from "@/components/ui/loading";
import Error from "@/components/ui/error";
import { useService } from "@/features/services/api/use-service";

const ViewService = ({ params }: { params: { id: number } }) => {
  const { data: serviceData, isPending, isError } = useService(params.id);

  if (isPending) {
    return <Loading />;
  }
  if (isError) {
    return <Error />;
  }
  return (
    <div className="pb-5">
      <p className="font-medium mb-4">View style</p>
      <ServiceForm
        service={{
          service_name: serviceData?.service_name ?? "",
          short_description: serviceData?.short_description ?? "",
          long_description: serviceData?.long_description ?? "",
          status: serviceData?.status ?? "active",
          service_category_id: serviceData?.service_category_id ?? null,
          banner_image: serviceData?.banner_image ?? "",
          section_one_title: serviceData?.section_one_title ?? "",
          section_one_description: serviceData?.section_one_description ?? "",
          section_one_image: serviceData?.section_one_image ?? "",
          section_two_title: serviceData?.section_two_title ?? "",
          section_two_description: serviceData?.section_two_description ?? "",
          service_items: serviceData?.service_items ?? [
            {
              item_name: "",
              price: 0,
              status: "active",
            },
          ],
        }}
        id={serviceData?.id}
      />
    </div>
  );
};

export default ViewService;