"use client";
import Loading from "@/components/ui/loading";
import Error from "@/components/ui/error";
import { DataTable } from "@/components/ui/data-table";
import { useWhyChooseUs } from "../api/use-why-choose-us";
import { whyChooseUsColumns } from "@/components/admin/module/why-choose-us-columns";

const WhyChooseUsDetails = () => {
  const {
    data: whyChooseUsData,
    isPending: whyChooseUsIsPending,
    isError: whyChooseUsIsError,
  } = useWhyChooseUs();

  if (whyChooseUsIsPending) {
    return <Loading />;
  }
  if (whyChooseUsIsError) {
    return <Error />;
  }
  return <DataTable data={whyChooseUsData} columns={whyChooseUsColumns} />;
};

export default WhyChooseUsDetails;
