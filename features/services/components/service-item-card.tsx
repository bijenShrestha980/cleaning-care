"use client";

import { useState } from "react";
import { CustomImage } from "@/components/ui/custom-image";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

type ServiceItemCardProps = {
  iconUrl?: string | null;
  itemName?: string | null;
  shortDescription?: string | null;
  fallbackAlt: string;
};

const ServiceItemCard = ({
  iconUrl,
  itemName,
  shortDescription,
  fallbackAlt,
}: ServiceItemCardProps) => {
  const [open, setOpen] = useState(false);
  const name = itemName || fallbackAlt;

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label={`View details about ${name}`}
        className="group w-full sm:w-[280px] p-5 flex flex-col items-center gap-4 rounded-2xl bg-white border border-[#E5EFF7] shadow-[0_2px_8px_rgba(16,24,40,0.04)] hover:shadow-[0_12px_28px_rgba(16,24,40,0.10)] hover:-translate-y-1 hover:border-primary/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary transition-all duration-300 cursor-pointer text-left"
      >
        <div className="relative">
          <span className="absolute inset-0 rounded-full bg-[#F2FAFF] scale-100 group-hover:scale-110 transition-transform duration-300" />
          <CustomImage
            src={iconUrl || ""}
            alt={name}
            fill
            loading="lazy"
            sizes="160px"
            containerClassName="relative w-[140px] h-[140px] md:w-[160px] md:h-[160px]"
            className="rounded-full w-full h-full object-cover object-center ring-4 ring-white"
          />
        </div>
        <h3 className="text-primary text-lg md:text-xl font-semibold text-center line-clamp-2">
          {itemName}
        </h3>
        <p className="text-sm md:text-base text-[#646464] text-center line-clamp-3">
          {shortDescription}
        </p>
        <span className="mt-auto inline-flex items-center gap-1 text-sm font-medium text-primary opacity-80 group-hover:opacity-100 group-hover:gap-2 transition-all duration-300">
          Read more
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
          </svg>
        </span>
      </button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[560px] p-0 overflow-hidden">
          <div className="relative w-full h-48 md:h-56 bg-[#F2FAFF] flex items-center justify-center">
            <CustomImage
              src={iconUrl || ""}
              alt={name}
              fill
              sizes="160px"
              containerClassName="w-[140px] h-[140px] md:w-[160px] md:h-[160px]"
              className="rounded-full w-full h-full object-cover object-center ring-8 ring-white shadow-md"
            />
          </div>
          <div className="p-6 md:p-8">
            <DialogHeader>
              <DialogTitle className="text-primary text-2xl md:text-3xl font-semibold">
                {itemName}
              </DialogTitle>
              <DialogDescription className="text-[#191919] opacity-70 text-base md:text-lg leading-relaxed pt-2 whitespace-pre-line">
                {shortDescription}
              </DialogDescription>
            </DialogHeader>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ServiceItemCard;
