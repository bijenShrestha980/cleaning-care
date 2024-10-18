"use client";
import { DataTable } from "@/components/ui/data-table";
import Error from "@/components/ui/error";
import Loading from "@/components/ui/loading";
import { requestCallbackColumns } from "@/components/admin/module/request-callback-columns";
import { useAllRequestCallbacks } from "../api/use-request-callback";

const RequestCallbackDetails = () => {
  const {
    data: requestCallbackData,
    isPending: requestCallbackIsPending,
    isError: requestCallbackIsError,
  } = useAllRequestCallbacks();

  if (requestCallbackIsPending) {
    return <Loading />;
  }
  if (requestCallbackIsError) {
    return <Error />;
  }
  return (
    <DataTable data={requestCallbackData} columns={requestCallbackColumns} />
  );
};

export default RequestCallbackDetails;
