import FaqForm from "@/components/admin/module/faq-form";

const FaqView = () => {
  return (
    <div>
      <p className="font-medium mb-4">Manage FAQs</p>
      <div className="p-4 rounded-[8px] shadow-md">
        <FaqForm />
      </div>
    </div>
  );
};

export default FaqView;
