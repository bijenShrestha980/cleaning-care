"use client";

import Loading from "@/components/ui/loading";
import Error from "@/components/ui/error";
import { useWhyChooseUsById } from "@/features/why-choose-us-heading/api/use-why-choose-us";
import WhyChooseUsForm from "@/features/why-choose-us-heading/components/why-chooose-us-form";

const ViewWhyChooseUs = ({ params }: { params: { id: number } }) => {
  const {
    data: whyChooseUsData,
    isPending,
    isFetching,
    isError,
  } = useWhyChooseUsById(params.id);

  if (isPending || isFetching) {
    return <Loading />;
  }
  if (isError) {
    return <Error />;
  }
  return (
    <div className="pb-5">
      <p className="font-medium mb-4">View style</p>
      <WhyChooseUsForm
        whyChooseUs={{
          title: whyChooseUsData?.title,
          short_description: whyChooseUsData?.short_description,
          type: whyChooseUsData?.type,
        }}
        id={whyChooseUsData?.id}
      />
    </div>
  );
};

export default ViewWhyChooseUs;
