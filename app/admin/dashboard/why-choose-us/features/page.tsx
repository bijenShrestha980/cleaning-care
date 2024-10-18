import Link from "next/link";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import ServiceCategoriesDetails from "@/features/service-categories/components/categories-details";

const Features = () => {
  return (
    <section>
      <div className="w-full flex justify-between mb-3">
        <p className="font-medium mb-4">Features</p>
        <Link href="/admin/dashboard/why-choose-us/features/add-features">
          <Button animation={"scale_in"}>
            <Plus size={20} className="mr-2" />
            Add
          </Button>
        </Link>
      </div>
      {/* <ServiceFeaturesDetails /> */}
    </section>
  );
};

export default Features;
