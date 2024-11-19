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
          service_category_id:
            serviceData?.service_category_id.toString() ?? null,
          banner_image: null,
          banner_image_url: serviceData?.banner_image_url,
          section_one_title: serviceData?.section_one_title ?? "",
          section_one_description: serviceData?.section_one_description ?? "",
          section_one_image: null,
          section_one_image_url: serviceData?.section_one_image_url,
          section_two_title: serviceData?.section_one_image_url ?? "",
          section_two_description: serviceData?.section_two_description ?? "",
          service_items: serviceData?.serviceitems
            ? serviceData?.serviceitems.map((item) => ({
                item_name: item.item_name,
                short_description: item.short_description,
                icon: null,
                icon_url: item.icon_url,
              }))
            : [
                {
                  item_name: "",
                  short_description: "",
                  icon: null,
                },
              ],
        }}
        id={serviceData?.id}
      />
    </div>
  );
};

export default ViewService;
