import QuoteDetails from "@/features/quote/components/quote-details";

const Quotes = () => {
  return (
    <section>
      <div className="w-full flex justify-between mb-3">
        <p className="font-medium mb-4">Quotes</p>
      </div>
      <QuoteDetails />
    </section>
  );
};

export default Quotes;
