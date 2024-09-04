import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { heroSectionData } from "@/constants/fakeData";
import { DataTable } from "@/components/ui/data-table";
import { heroSectionColumns } from "@/components/admin/module/hero-section-columns";
import DescriptionForm from "@/components/admin/module/description-form";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

const LandingPage = () => {
  return (
    <div>
      <Tabs defaultValue="hero">
        <TabsList className="inline gap-1 space-y-2 md:space-y-0">
          <TabsTrigger
            value="hero"
            className="h-[46px] w-[220px] p-3 rounded-t-[8px] bg-grey-40 data-[state=active]:bg-white data-[state=active]:border-b-0 data-[state=active]:text-[#5065F6] mr-2 shadow-[0px_-5px_10px_0px_#00000014]"
          >
            Hero section
          </TabsTrigger>
          <TabsTrigger
            value="description"
            className="h-[46px] w-[220px] p-3 rounded-t-[8px] bg-grey-40 data-[state=active]:bg-white data-[state=active]:border-b-0 data-[state=active]:text-[#5065F6] mr-2 shadow-[0px_-5px_10px_0px_#00000014]"
          >
            Description
          </TabsTrigger>
        </TabsList>
        <TabsContent
          value="hero"
          className="z-20 w-full mt-1 bg-white px-4 py-6 rounded-b-[8px] shadow-[0px_10px_10px_0px_#00000014] flex flex-col gap-4"
        >
          <div className="w-full flex justify-end">
            <Link href="/admin/settings/landing-page/view-hero-section">
              <Button variant={"blue"} animation={"scale_in"}>
                <Plus size={20} className="mr-2" />
                Add
              </Button>
            </Link>
          </div>
          <DataTable data={heroSectionData} columns={heroSectionColumns} />
        </TabsContent>
        <TabsContent
          value="description"
          className="z-20 w-full mt-1 bg-white px-4 py-6 rounded-b-[8px] shadow-[0px_10px_10px_0px_#00000014] outline-0"
        >
          <DescriptionForm />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default LandingPage;
