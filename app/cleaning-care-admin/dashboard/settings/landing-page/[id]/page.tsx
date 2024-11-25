"use client";

import { useEffect, useState } from "react";
import Loading from "@/components/ui/loading";
import Error from "@/components/ui/error";
import { useHeroSections } from "@/features/hero-sections/api/use-hero-sections";
import HeroSectionForm from "@/features/hero-sections/components/hero-section-form";
import { HeroSection } from "@/components/admin/data/schema";

const ViewHeroSection = ({ params }: { params: { id: number } }) => {
  const [isHero, setIsHero] = useState<HeroSection>();
  const {
    data: heroSectionData,
    isPending,
    isFetching,
    isError,
  } = useHeroSections();

  useEffect(() => {
    if (heroSectionData && !isPending && !isFetching && !isError) {
      heroSectionData?.map((data) => data.id == params.id && setIsHero(data));
    }
  }, [heroSectionData, isError, isFetching, isPending, params.id]);

  if (isPending || isFetching || !isHero) {
    return <Loading />;
  }
  if (isError) {
    return <Error />;
  }
  return (
    <div className="pb-16">
      <p className="font-medium mb-4">View style</p>
      <HeroSectionForm
        heroSection={{
          title: isHero?.title,
          description: isHero?.description,
          order: isHero?.order,
          status: isHero?.status,
          hero_image_url: isHero?.hero_image_url,
        }}
        id={params.id}
      />
    </div>
  );
};

export default ViewHeroSection;
