"use client";

import Loading from "@/components/ui/loading";
import Error from "@/components/ui/error";
import FeaturesForm from "@/features/why-choose-us-features/components/why-chooose-us-features-form";
import { useWhyChooseUsFeaturesById } from "@/features/why-choose-us-features/api/use-features";

const ViewWhyChooseFeature = ({ params }: { params: { id: number } }) => {
  const {
    data: featureData,
    isPending,
    isFetching,
    isError,
  } = useWhyChooseUsFeaturesById(params.id);

  if (isPending || isFetching) {
    return <Loading />;
  }
  if (isError) {
    return <Error />;
  }
  return (
    <div className="pb-5">
      <p className="font-medium mb-4">View why choose us features</p>
      <FeaturesForm
        whyChooseUs={{
          why_choose_us_id: String(featureData?.why_choose_us_id),
          feature_title: featureData?.feature_title,
          feature_short_description: featureData?.feature_short_description,
          icon: null,
        }}
        id={featureData?.id}
      />
    </div>
  );
};

export default ViewWhyChooseFeature;
