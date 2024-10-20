import Link from "next/link";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import WhyChooseUsDetails from "@/features/why-choose-us-heading/components/why-choose-us-details";

const Heading = () => {
  return (
    <section>
      <div className="w-full flex justify-between mb-3">
        <p className="font-medium mb-4">Heading</p>
        <Link href="/admin/dashboard/why-choose-us/heading/add-heading">
          <Button animation={"scale_in"}>
            <Plus size={20} className="mr-2" />
            Add
          </Button>
        </Link>
      </div>
      <WhyChooseUsDetails />
    </section>
  );
};

export default Heading;
