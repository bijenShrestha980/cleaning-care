"use client";

import Loading from "@/components/ui/loading";
import Error from "@/components/ui/error";
import { useHeroSection } from "@/features/hero-sections/api/use-hero-sections";
import HeroSectionForm from "@/features/hero-sections/components/hero-section-form";

const ViewHeroSection = ({ params }: { params: { id: number } }) => {
  const {
    data: heroSectionData,
    isPending,
    isFetching,
    isError,
  } = useHeroSection(params.id);

  if (isPending || isFetching) {
    return <Loading />;
  }
  if (isError) {
    return <Error />;
  }
  return (
    <div className="pb-5">
      <p className="font-medium mb-4">View style</p>
      <HeroSectionForm
        heroSection={{
          title: heroSectionData?.title,
          description: heroSectionData?.description,
          order: heroSectionData?.order,
          status: heroSectionData?.status,
          hero_image: heroSectionData?.hero_image,
        }}
        id={heroSectionData?.id}
      />
    </div>
  );
};

export default ViewHeroSection;
