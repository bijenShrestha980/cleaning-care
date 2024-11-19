import TestimonialForm from "@/components/admin/module/testimonial-form";

const TestimonialView = () => {
  return (
    <section>
      <div className="w-full flex justify-between mb-3">
        <p className="font-medium mb-4">Manage Testimonials</p>
      </div>
      <TestimonialForm />
    </section>
  );
};

export default TestimonialView;
