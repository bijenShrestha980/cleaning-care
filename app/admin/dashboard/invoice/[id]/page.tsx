"use client";
import { format } from "date-fns";
import { Download, LoaderCircle, Printer } from "lucide-react";

import Loading from "@/components/ui/loading";
import Error from "@/components/ui/error";
import { CustomImage } from "@/components/ui/custom-image";
import { Button } from "@/components/ui/button";
import { logoColor } from "@/constants/icons";
import {
  useInvoiceById,
  useInvoiceDownload,
} from "@/features/invoice/api/use-invoice";
import { useAllFundamental } from "@/features/fundamentals/api/use-fundamental";
import InvoiceGenerate from "@/features/invoice/components/invoice-generate";
import { useDeleteInvoice } from "@/features/invoice/api/use-delete-invoice";

const ViewInvoice = ({ params }: { params: { id: number } }) => {
  const {
    data: invoiceData,
    isPending,
    isError,
    isFetching,
  } = useInvoiceById(params.id);

  const {
    data: fundamentalData,
    isPending: fundamentalIsPending,
    isError: fundamentalIsError,
  } = useAllFundamental();

  const {
    refetch,
    isPending: downloadIsPending,
    isFetching: downloadIsFetching,
  } = useInvoiceDownload(Number(params.id));

  const { mutate: deleteInvoice, isPending: deleteIsPending } =
    useDeleteInvoice();

  if (isPending || isFetching || fundamentalIsPending) {
    return <Loading />;
  }
  if (isError || fundamentalIsError) {
    return <Error />;
  }
  return (
    <div className="pb-5">
      <p className="font-medium mb-4">View invoice</p>
      <div className="max-w-[85rem] sm:px-6 lg:px-8 mx-auto my-4 sm:my-10">
        <div className="w-full md:w-11/12 lg:w-3/4 mx-auto">
          <div className="flex flex-col p-4 sm:p-10 bg-white rounded-xl shadow-[rgba(0,0,0,0.15)_0px_5px_15px_0px]">
            <div className="flex justify-between">
              <div>
                <CustomImage
                  src={logoColor}
                  alt="logo"
                  fill
                  containerClassName="w-[100px] h-[75px]"
                />
              </div>

              <div className="text-end">
                <h2 className="text-2xl md:text-3xl font-semibold text-gray-800">
                  Invoice # {invoiceData.invoice_number}
                </h2>
                <span className="mt-1 block text-gray-500">
                  {invoiceData.send_user_quote_id}
                </span>

                <address className="mt-4 not-italic text-gray-800">
                  {fundamentalData.site_address}
                </address>
              </div>
            </div>

            <div className="mt-8 grid sm:grid-cols-2 gap-3">
              <div>
                <h3 className="text-lg font-semibold text-gray-800">
                  Bill to:
                </h3>
                <h3 className="text-lg font-semibold text-gray-800">
                  {invoiceData.send_user_quote?.full_name}
                </h3>
                <address className="mt-2 not-italic text-gray-500">
                  {invoiceData.send_user_quote?.address}
                </address>
              </div>

              <div className="sm:text-end space-y-2">
                <div className="grid grid-cols-2 sm:grid-cols-1 gap-3 sm:gap-2">
                  <dl className="grid sm:grid-cols-5 gap-x-3">
                    <dt className="col-span-3 font-semibold text-gray-800">
                      Invoice date:
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
              <div className="border border-gray-200 p-4 rounded-lg space-y-4">
                <div className="hidden sm:grid sm:grid-cols-4">
                  <div className="sm:col-span-2 text-xs font-medium text-gray-500 uppercase">
                    Item
                  </div>
                  {/* <div className="text-start text-xs font-medium text-gray-500 uppercase">
                    Qty
                  </div> */}
                  <div className="text-start text-xs font-medium text-gray-500 uppercase">
                    Rate
                  </div>
                  <div className="text-end text-xs font-medium text-gray-500 uppercase">
                    Amount
                  </div>
                </div>

                <div className="hidden sm:block border-b border-gray-200"></div>

                {invoiceData.invoice_items &&
                  invoiceData.invoice_items.map((item, index) => (
                    <>
                      <div
                        className="grid grid-cols-3 sm:grid-cols-4 gap-2"
                        key={index}
                      >
                        <div className="col-span-full sm:col-span-2">
                          <h5 className="sm:hidden text-xs font-medium text-gray-500 uppercase">
                            Item
                          </h5>
                          <p className="font-medium text-gray-800">
                            {item.service_category_item.item_name}
                          </p>
                        </div>
                        {/* <div>
                          <h5 className="sm:hidden text-xs font-medium text-gray-500 uppercase">
                            Qty
                          </h5>
                          <p className="text-gray-800">1</p>
                        </div> */}
                        <div>
                          <h5 className="sm:hidden text-xs font-medium text-gray-500 uppercase">
                            Rate
                          </h5>
                          <p className="text-gray-800">
                            {item.service_category_item.price}
                          </p>
                        </div>
                        <div>
                          <h5 className="sm:hidden text-xs font-medium text-gray-500 uppercase">
                            Amount
                          </h5>
                          <p className="sm:text-end text-gray-800">
                            ${item.price}
                          </p>
                        </div>
                      </div>
                      <div
                        className={`sm:hidden border-b border-gray-200
                        ${
                          invoiceData?.invoice_items &&
                          index !== invoiceData?.invoice_items.length - 1
                            ? ""
                            : "hidden"
                        }
                          `}
                      ></div>
                    </>
                  ))}
              </div>
            </div>

            <div className="mt-8 flex sm:justify-end">
              <div className="w-full max-w-2xl sm:text-end space-y-2">
                <div className="grid grid-cols-2 sm:grid-cols-1 gap-3 sm:gap-2">
                  <dl className="grid sm:grid-cols-5 gap-x-3">
                    <dt className="col-span-3 font-semibold text-gray-800">
                      Subtotal:
                    </dt>
                    <dd className="col-span-2 text-gray-500">
                      ${invoiceData.subtotal}
                    </dd>
                  </dl>

                  <dl className="grid sm:grid-cols-5 gap-x-3">
                    <dt className="col-span-3 font-semibold text-gray-800">
                      Surge fee:
                    </dt>
                    <dd className="col-span-2 text-gray-500">
                      ${invoiceData.surge_fee}
                    </dd>
                  </dl>

                  <dl className="grid sm:grid-cols-5 gap-x-3">
                    <dt className="col-span-3 font-semibold text-gray-800">
                      Discount:
                    </dt>
                    <dd className="col-span-2 text-gray-500">
                      {invoiceData.discount}%
                    </dd>
                  </dl>

                  <dl className="grid sm:grid-cols-5 gap-x-3">
                    <dt className="col-span-3 font-semibold text-gray-800">
                      Total:
                    </dt>
                    <dd className="col-span-2 text-gray-500">
                      ${invoiceData.total_amount}
                    </dd>
                  </dl>
                </div>
              </div>
            </div>

            <div className="mt-8 sm:mt-12">
              <h4 className="text-lg font-semibold text-gray-800">
                Thank you!
              </h4>
              <p className="text-gray-500">
                If you have any questions concerning this invoice, use the
                following contact information:
              </p>
              <div className="mt-2">
                <p className="block text-sm font-medium text-gray-800">
                  {fundamentalData.email1}
                </p>
                <p className="block text-sm font-medium text-gray-800">
                  {fundamentalData.email2}
                </p>
                <p className="block text-sm font-medium text-gray-800">
                  {fundamentalData.contact_number1}
                </p>
                <p className="block text-sm font-medium text-gray-800">
                  {fundamentalData.contact_number2}
                </p>
              </div>
            </div>

            <p className="mt-5 text-sm text-gray-500">
              {fundamentalData.copyright}
            </p>
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
              className="flex gap-2"
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
            <InvoiceGenerate
              id={Number(params.id)}
              invoice={{
                discount: invoiceData.discount,
                due_date: invoiceData.due_date,
              }}
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
