"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import QuoteForm from "./quote-form";
import { useAllServiceCategories } from "@/features/service-categories/api/use-service-categories";

const QuoteDialogue = ({
  service_category_id,
}: {
  service_category_id?: number;
}) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const {
    data: serviceCategoryData,
    isPending: serviceCategoryIsPending,
    isError: serviceCategoryIsError,
  } = useAllServiceCategories();

  if (serviceCategoryIsPending) {
    return <Skeleton className="w-[188px] h-9" />;
  }
  if (serviceCategoryIsError) {
    return (
      <Badge variant={"destructive"}>
        <p>Error loading quote!</p>
      </Badge>
    );
  }
  return (
    <Dialog
      open={isDialogOpen}
      onOpenChange={(isOpen) => !isOpen && setIsDialogOpen(false)}
    >
      <DialogTrigger asChild onClick={() => setIsDialogOpen(true)}>
        <Button
          variant="success"
          size="lg"
          className="h-10 rounded-xl transition-all duration-300 ease-in-out hover:shadow-xl hover:scale-105 hover:-translate-y-1"
        >
          Get service quote
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[750px] h-dvh rounded-lg overflow-y-scroll no-scrollbar">
        <DialogHeader className="items-center">
          <DialogTitle className="text-[42px] font-normal font-inter">
            Get the Quote
          </DialogTitle>
          <DialogDescription className="text-base font-normal font-inter">
            Fill the form & get your quote emailed
          </DialogDescription>
        </DialogHeader>
        <QuoteForm
          categories={serviceCategoryData.map((category) => ({
            id: category.id,
            label: category.category_name,
            value: category.category_name,
          }))}
          service_category_id={service_category_id}
          setIsDialogOpen={setIsDialogOpen}
        />
      </DialogContent>
    </Dialog>
  );
};

export default QuoteDialogue;
