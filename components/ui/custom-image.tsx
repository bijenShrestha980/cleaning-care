import React from "react";
import Image, { ImageProps } from "next/image";
import { cn } from "@/lib/utils";

interface CustomImageProps extends ImageProps {
  containerClassName?: string;
}

const CustomImage = React.forwardRef<HTMLImageElement, CustomImageProps>(
  ({ className, src, alt, containerClassName, ...props }, ref) => {
    return (
      <div className={cn("relative w-full", containerClassName)}>
        <Image src={src} alt={alt} className={className} ref={ref} {...props} />
      </div>
    );
  }
);

CustomImage.displayName = "CustomImage";

export { CustomImage };
