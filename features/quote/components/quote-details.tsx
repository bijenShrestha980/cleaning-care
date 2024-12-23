"use client";
import { DataTable } from "@/components/ui/data-table";
import { quoteColumns } from "@/components/admin/module/quote-columns";
import Error from "@/components/ui/error";
import Loading from "@/components/ui/loading";
import { useAllQuote } from "../api/use-user-quotes";

const QuoteDetails = () => {
  const {
    data: quoteData,
    isPending: quoteIsPending,
    isError: quoteIsError,
    isFetching: quoteIsFetching,
  } = useAllQuote();

  if (quoteIsPending || quoteIsFetching) {
    return <Loading />;
  }
  if (quoteIsError) {
    return <Error />;
  }
  return (
    <DataTable
      data={quoteData?.map((quote) => ({
        ...quote,
        quoteStatus: quote.status,
        status: undefined,
      }))}
      columns={quoteColumns}
    />
  );
};

export default QuoteDetails;
