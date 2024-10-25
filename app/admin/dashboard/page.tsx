import InvoiceDetails from "@/features/invoice/components/invoice-details";
import QuoteDetails from "@/features/quote/components/quote-details";

const Dashboard = () => {
  return (
    <div>
      <section className="grid grid-cols-2 gap-8">
        <div className="w-full col-span-2 md:col-span-1">
          <div className="flex justify-between items-center mb-4">
            <p className="text-sm font-medium">Quotes</p>
          </div>
          <QuoteDetails />
        </div>
        <div className="w-full col-span-2 md:col-span-1">
          <div className="flex justify-between items-center mb-4">
            <p className="text-sm font-medium">Invoice</p>
          </div>

          <InvoiceDetails />
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
