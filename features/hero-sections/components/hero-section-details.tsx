"use client";
import Loading from "@/components/ui/loading";
import Error from "@/components/ui/error";
import { useHeroSections } from "../api/use-hero-sections";
import { DataTable } from "@/components/ui/data-table";
import { heroSectionColumns } from "@/components/admin/module/hero-section-columns";

const HeroSectionDetails = () => {
  const {
    data: heroSectionData,
    isPending: heroSectionIsPending,
    isError: heroSectionIsError,
  } = useHeroSections();

  if (heroSectionIsPending) {
    return <Loading />;
  }
  if (heroSectionIsError) {
    return <Error />;
  }
  return <DataTable data={heroSectionData} columns={heroSectionColumns} />;
};

export default HeroSectionDetails;
