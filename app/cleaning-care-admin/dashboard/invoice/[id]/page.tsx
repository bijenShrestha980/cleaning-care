"use client";
import { Fragment } from "react";
import { format } from "date-fns";
import { Download, LoaderCircle, Send } from "lucide-react";

import Loading from "@/components/ui/loading";
import Error from "@/components/ui/error";
import { CustomImage } from "@/components/ui/custom-image";
import { Button } from "@/components/ui/button";
import { logoColor } from "@/constants/icons";
import {
  useInvoiceById,
  useInvoiceDownload,
  useInvoiceSend,
} from "@/features/invoice/api/use-invoice";
import { useAllFundamental } from "@/features/fundamentals/api/use-fundamental";
import InvoiceGenerate from "@/features/invoice/components/invoice-generate";
import { useDeleteInvoice } from "@/features/invoice/api/use-delete-invoice";
import { useBankAccountDetails } from "@/features/bank/api/use-bank";

const ViewInvoice = ({ params }: { params: { id: number } }) => {
  const {
    data: invoiceData,
    isPending,
    isError,
    isFetching,
  } = useInvoiceById(params.id);

  const {
    isSuccess: invoiceIsSuccess,
    refetch: refetchInvoice,
    isError: invoiceIsError,
    isFetching: invoiceIsFetching,
  } = useInvoiceSend(params.id);

  const {
    data: fundamentalData,
    isPending: fundamentalIsPending,
    isError: fundamentalIsError,
  } = useAllFundamental();

  const {
    data: bankData,
    isPending: bankIsPending,
    isError: bankIsError,
  } = useBankAccountDetails();

  const {
    refetch,
    isPending: downloadIsPending,
    isFetching: downloadIsFetching,
  } = useInvoiceDownload(params.id);

  const { mutate: deleteInvoice, isPending: deleteIsPending } =
    useDeleteInvoice();

  // Group items by service_category.category_name
  const groupedItems =
    invoiceData &&
    invoiceData?.invoice_items?.reduce(
      (acc: { [key: string]: typeof invoiceData.invoice_items }, item) => {
        const categoryName = item.service_category.category_name;
        if (!acc[categoryName]) {
          acc[categoryName] = [];
        }
        acc[categoryName].push(item);
        return acc;
      },
      {}
    );

  if (isPending || isFetching || fundamentalIsPending || bankIsPending) {
    return <Loading />;
  }
  if (isError || fundamentalIsError || bankIsError) {
    return <Error />;
  }
  return (
    <div className="pb-5">
      <p className="font-medium mb-4">View invoice</p>
      <div className="max-w-[85rem] sm:px-6 lg:px-8 mx-auto my-4 sm:my-10">
        <div className="w-full md:w-11/12 lg:w-3/4 mx-auto">
          <div className="flex flex-col p-4 sm:p-10 bg-white rounded-xl shadow-[rgba(0,0,0,0.15)_0px_5px_15px_0px]">
            <div className="border-b pb-2">
              <CustomImage
                src={logoColor}
                alt="logo"
                fill
                sizes="(max-width: 640px) 100px, 100px"
                containerClassName="w-[140px] h-[105px]"
              />
              <div className="flex justify-center">
                <h2 className="text-md md:text-3xl font-semibold text-gray-800">
                  Invoice
                </h2>
              </div>
              <div className="text-end">
                <span className="mt-1 block text-gray-500">
                  {invoiceData.send_user_quote_id}
                </span>
                <address className="mt-4 not-italic text-gray-800">
                  {fundamentalData.site_address}
                </address>
                <span className="mt-1 block text-gray-500">
                  {fundamentalData.contact_number1}
                  {fundamentalData.contact_number2
                    ? `/${fundamentalData.contact_number2}`
                    : ""}
                </span>
                <span className="mt-1 block text-gray-500">
                  {fundamentalData.email1}
                  {fundamentalData.email2 ? `/${fundamentalData.email2}` : ""}
                </span>
                <span className="mt-1 block text-gray-500">
                  www.cleaningcare.au
                </span>
              </div>
            </div>

            <div className="mt-8 grid sm:grid-cols-2 gap-3">
              <div>
                <h3 className="text-lg font-semibold text-gray-800">
                  Bill to:
                </h3>
                <p className="text-lg text-gray-600">
                  {invoiceData.send_user_quote?.full_name}
                </p>
                <address className="text-md text-gray-600">
                  {invoiceData.send_user_quote?.address}
                </address>
              </div>

              <div className="sm:text-end space-y-2">
                <div className="grid grid-cols-2 sm:grid-cols-1 gap-3 sm:gap-2">
                  <h3 className="text-lg font-semibold text-gray-800">
                    Invoice Details:
                  </h3>
                  <dl className="grid sm:grid-cols-5 gap-x-3">
                    <dt className="col-span-3 font-semibold text-gray-800">
                      Invoice Number:
                    </dt>
                    <dd className="col-span-2 text-gray-500">
                      {invoiceData.invoice_number}
                    </dd>
                  </dl>
                  <dl className="grid sm:grid-cols-5 gap-x-3">
                    <dt className="col-span-3 font-semibold text-gray-800">
                      Date:
                    </dt>
                    <dd className="col-span-2 text-gray-500">
                      {invoiceData.created_at
                        ? format(new Date(invoiceData.created_at), "dd/MM/yyyy")
                        : "N/A"}
                    </dd>
                  </dl>
                  <dl className="grid sm:grid-cols-5 gap-x-3">
                    <dt className="col-span-3 font-semibold text-gray-800">
                      Due date:
                    </dt>
                    <dd className="col-span-2 text-gray-500">
                      {invoiceData.due_date
                        ? format(invoiceData.due_date, "dd/MM/yyyy")
                        : "N/A"}
                    </dd>
                  </dl>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <div className="border border-gray-200 rounded-md">
                <div className="hidden sm:grid sm:grid-cols-3 bg-[#f8fafc] p-4">
                  <div className="sm:col-span-2 text-xs font-semibold uppercase">
                    S.N. Service
                  </div>
                  <div className="text-end text-xs font-semibold uppercase">
                    Price (AUD)
                  </div>
                </div>
                {groupedItems &&
                  Object.keys(groupedItems).map((categoryName) => (
                    <div key={categoryName}>
                      <div className="px-4 py-1 border-y bg-[#edf2f7]">
                        <p className="text-lg font-semibold">{categoryName}</p>
                      </div>
                      {groupedItems[categoryName].map((item, index) => (
                        <Fragment key={index}>
                          <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 items-end border-y px-4 py-1">
                            <div className="col-span-full sm:col-span-2">
                              <p className="font-medium text-gray-800">
                                &nbsp;&nbsp;&nbsp;{index + 1}
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                {item.service_category_item.item_name}
                              </p>
                            </div>
                            <div>
                              <p className="text-gray-800">
                                {item.service_category_item.price}
                              </p>
                            </div>
                            <div>
                              <h5 className="sm:hidden text-xs font-medium text-gray-500 uppercase">
                                &nbsp;&nbsp;&nbsp;Price (AUD)
                              </h5>
                              <p className="sm:text-end text-gray-800">
                                &nbsp;&nbsp;&nbsp;{item.price}
                              </p>
                            </div>
                          </div>
                        </Fragment>
                      ))}
                    </div>
                  ))}
              </div>
            </div>

            <div className="mt-8 flex sm:justify-end">
              <div className="w-full max-w-2xl sm:text-end space-y-2">
                <div className="grid grid-cols-2 sm:grid-cols-1 gap-3 sm:gap-2">
                  <dl className="grid sm:grid-cols-5 gap-x-3">
                    <dt className="col-span-4 text-gray-500">
                      Subtotal (including HST):
                    </dt>
                    <dd className="col-span-1 text-gray-500">
                      AUD {invoiceData.subtotal}
                    </dd>
                  </dl>

                  <dl className="grid sm:grid-cols-5 gap-x-3">
                    <dt className="col-span-4 text-gray-500">Discount:</dt>
                    <dd className="col-span-1 text-gray-500">
                      {invoiceData.discount}%
                    </dd>
                  </dl>

                  <dl className="grid sm:grid-cols-5 gap-x-3">
                    <dt className="col-span-4 text-gray-500">Surge fee:</dt>
                    <dd className="col-span-1 text-gray-500">
                      {invoiceData.surge_fee}%
                    </dd>
                  </dl>

                  <dl className="grid sm:grid-cols-5 gap-x-3">
                    <dt className="col-span-4 text-gray-500">
                      Total Amount Due:
                    </dt>
                    <dd className="col-span-1 text-gray-500">
                      AUD {invoiceData.total_amount}
                    </dd>
                  </dl>
                </div>
              </div>
            </div>

            <div className="mt-8 sm:mt-12 bg-[#f8fafc] rounded-md border p-2">
              <p className="font-semibold text-gray-900 mb-2">Bank Details</p>
              <div className="flex gap-2 items-center">
                <p className="block font-medium text-gray-800">Bank Name:</p>
                <p className="block text-gray-800">{bankData.bank_name}</p>
              </div>
              <div className="flex gap-2 items-center">
                <p className="block font-medium text-gray-800">
                  Account Number:
                </p>
                <p className="block text-gray-800">{bankData.account_number}</p>
              </div>
              <div className="flex gap-2 items-center">
                <p className="block font-medium text-gray-800">Account BSB:</p>
                <p className="block text-gray-800">{bankData.account_bsb}</p>
              </div>
            </div>
          </div>

          <div className="w-full mt-6 flex flex-col md:flex-row justify-end gap-3">
            <Button
              variant={"ghost"}
              animation={"scale_in"}
              className="w-full md:w-[86px]"
              disabled={deleteIsPending}
              type="button"
              onClick={() => invoiceData.id && deleteInvoice(invoiceData.id)}
            >
              {deleteIsPending ? (
                <LoaderCircle className="animate-spin" width={20} height={20} />
              ) : (
                "Delete"
              )}
            </Button>
            <Button
              variant={"outline"}
              className="flex gap-2 md:w-[156px]"
              type="button"
              disabled={downloadIsFetching}
              onClick={() => refetch()}
            >
              {downloadIsFetching ? (
                <LoaderCircle className="animate-spin" width={20} height={20} />
              ) : (
                <>
                  <Download size={16} />
                  Invoice PDF
                </>
              )}
            </Button>
            <Button
              className="flex gap-2 md:w-[156px] bg-gradient-to-r from-slate-600 to-slate-500"
              // variant={"success"}
              type="button"
              disabled={invoiceIsFetching}
              onClick={() => refetchInvoice()}
            >
              {invoiceIsFetching ? (
                <LoaderCircle className="animate-spin" width={20} height={20} />
              ) : (
                <>
                  <Send size={16} />
                  Send Invoice
                </>
              )}
            </Button>
            <InvoiceGenerate
              id={Number(params.id)}
              invoice={{
                discount: invoiceData.discount,
                due_date: invoiceData.due_date,
              }}
              invoice_items={invoiceData.invoice_items}
            />
            {/* <Button className="flex gap-2" >
              <Printer size={16} />
              Print
            </Button> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewInvoice;
