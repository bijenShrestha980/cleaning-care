import { DataTable } from "@/components/ui/data-table";
import { quoteData } from "@/constants/fakeData";
import { quoteColumns } from "@/components/admin/module/quote-columns";

const Quotes = () => {
  return (
    <section>
      <div className="w-full flex justify-between mb-3">
        <p className="font-medium mb-4">Quotes</p>
      </div>
      <DataTable data={quoteData} columns={quoteColumns} />
    </section>
  );
};

export default Quotes;
