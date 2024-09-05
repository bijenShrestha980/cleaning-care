import Link from "next/link";
import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { heroSectionColumns } from "@/components/admin/module/hero-section-columns";
import DescriptionForm from "@/components/admin/module/description-form";
import { heroSectionData } from "@/constants/fakeData";

const LandingPage = () => {
  return (
    <div>
      <Tabs defaultValue="hero">
        <TabsList>
          <TabsTrigger value="hero">Hero section</TabsTrigger>
          <TabsTrigger value="description">Description</TabsTrigger>
        </TabsList>
        <TabsContent
          value="hero"
          className="z-20 w-full mt-1 bg-white px-4 py-6 rounded-b-[8px] shadow-[0px_10px_10px_0px_#00000014]"
        >
          <div className="flex flex-col gap-4">
            <div className="w-full flex justify-end">
              <Link href="/admin/dashboard/settings/landing-page/view-hero-section">
                <Button animation={"scale_in"}>
                  <Plus size={20} className="mr-2" />
                  Add
                </Button>
              </Link>
            </div>
            <DataTable data={heroSectionData} columns={heroSectionColumns} />
          </div>
        </TabsContent>
        <TabsContent
          value="description"
          className="z-20 w-full mt-1 bg-white px-4 py-6 rounded-b-[8px] shadow-[0px_10px_10px_0px_#00000014]"
        >
          <DescriptionForm />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default LandingPage;
