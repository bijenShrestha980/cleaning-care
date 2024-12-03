import Link from "next/link";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import HeroSectionDetails from "@/features/hero-sections/components/hero-section-details";

const LandingPage = () => {
  return (
    <section>
      <div className="flex flex-col gap-4">
        <div className="w-full flex justify-between items-center">
          <p className="font-medium mb-4">Hero Section</p>
          <Link href="/cleaning-care-admin/dashboard/settings/landing-page/add-hero-section">
            <Button animation={"scale_in"}>
              <Plus size={20} className="mr-2" />
              Add
            </Button>
          </Link>
        </div>
        <HeroSectionDetails />
      </div>
    </section>
  );
};

export default LandingPage;
