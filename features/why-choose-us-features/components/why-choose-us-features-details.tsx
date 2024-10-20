"use client";
import Loading from "@/components/ui/loading";
import Error from "@/components/ui/error";
import { DataTable } from "@/components/ui/data-table";
import { whyChooseUsFeaturesColumns } from "@/components/admin/module/why-choose-us-features-columns";
import { useWhyChooseUsFeatures } from "../api/use-features";

const WhyChooseUsFeaturesDetails = () => {
  const {
    data: whyChooseUsFeaturesData,
    isPending: whyChooseUsFeaturesIsPending,
    isError: whyChooseUsFeaturesIsError,
  } = useWhyChooseUsFeatures();

  console.log(whyChooseUsFeaturesColumns);

  if (whyChooseUsFeaturesIsPending) {
    return <Loading />;
  }
  if (whyChooseUsFeaturesIsError) {
    return <Error />;
  }
  return (
    <DataTable
      data={whyChooseUsFeaturesData}
      columns={whyChooseUsFeaturesColumns}
    />
  );
};

export default WhyChooseUsFeaturesDetails;
