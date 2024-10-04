"use client";

import Loading from "@/components/ui/loading";
import Error from "@/components/ui/error";
import QuotActionForm from "@/features/quote/components/quote-action-form";
import { useQuote } from "@/features/quote/api/use-user-quotes";
import { useAllServiceCategory } from "@/features/service-categories/api/use-service-categories";

const ViewQuote = ({ params }: { params: { id: number } }) => {
  const {
    data: quoteData,
    isPending: quoteIsPending,
    isFetching: quoteIsFetching,
    isError: quoteIsError,
  } = useQuote(params.id);

  const {
    data: serviceCategoriesData,
    isPending: serviceCategoriesIsPending,
    isError: serviceCategoriesIsError,
  } = useAllServiceCategory();

  if (quoteIsPending || quoteIsFetching || serviceCategoriesIsPending) {
    return <Loading />;
  }
  if (quoteIsError || serviceCategoriesIsError) {
    return <Error />;
  }
  return (
    <div className="pb-5">
      <p className="font-medium mb-4">View quote</p>
      <QuotActionForm
        quote={{
          full_name: quoteData?.full_name,
          email: quoteData?.email,
          phone_number: quoteData?.phone_number,
          address: quoteData?.address,
          postal_code: quoteData?.postal_code,
          quote: quoteData?.quote,
          senduserquoteservice: quoteData?.senduserquoteservice,
          status: quoteData?.status,
          id: quoteData?.id,
        }}
        serviceCategoriesData={serviceCategoriesData}
      />
    </div>
  );
};

export default ViewQuote;
