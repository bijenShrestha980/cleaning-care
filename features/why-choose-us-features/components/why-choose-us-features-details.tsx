"use client";
import Loading from "@/components/ui/loading";
import Error from "@/components/ui/error";
import { DataTable } from "@/components/ui/data-table";
import { heroSectionColumns } from "@/components/admin/module/hero-section-columns";
import { useCreateWhyChooseUsFeatures } from "../api/use-create-feature";

const WhyChooseUsFeaturesDetails = () => {
  const {
    data: whyChooseUsFeaturesData,
    isPending: whyChooseUsFeaturesIsPending,
    isError: whyChooseUsFeaturesIsError,
  } = useCreateWhyChooseUsFeatures();

  if (whyChooseUsFeaturesIsPending) {
    return <Loading />;
  }
  if (whyChooseUsFeaturesIsError) {
    return <Error />;
  }
  return (
    <DataTable data={whyChooseUsFeaturesData} columns={heroSectionColumns} />
  );
};

export default WhyChooseUsFeaturesDetails;
