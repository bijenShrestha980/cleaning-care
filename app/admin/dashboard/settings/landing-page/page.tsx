import Link from "next/link";
import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DescriptionForm from "@/components/admin/module/description-form";
import HeroSectionDetails from "@/features/hero-sections/components/hero-section-details";

const LandingPage = () => {
  return (
    <Tabs defaultValue="hero">
      <TabsList className="inline gap-1 space-y-2 md:space-y-0">
        <TabsTrigger value="hero">Hero section</TabsTrigger>
        <TabsTrigger value="description">Description</TabsTrigger>
      </TabsList>
      <TabsContent
        value="hero"
        className="z-20 w-full mt-1 bg-white px-4 py-6 rounded-b-[8px] shadow-[0px_10px_10px_0px_#00000014]"
      >
        <div className="flex flex-col gap-4">
          <div className="w-full flex justify-end">
            <Link href="/admin/dashboard/settings/landing-page/add-hero-section">
              <Button animation={"scale_in"}>
                <Plus size={20} className="mr-2" />
                Add
              </Button>
            </Link>
          </div>
          <HeroSectionDetails />
        </div>
      </TabsContent>
      <TabsContent
        value="description"
        className="z-20 w-full mt-1 bg-white px-4 py-6 rounded-b-[8px] shadow-[0px_10px_10px_0px_#00000014]"
      >
        <DescriptionForm />
      </TabsContent>
    </Tabs>
  );
};

export default LandingPage;
