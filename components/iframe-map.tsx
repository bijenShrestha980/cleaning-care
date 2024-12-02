import { cn } from "@/lib/utils";

const IframeMap = ({
  iframeHtml,
  className,
}: {
  iframeHtml: string;
  className?: string;
}) => {
  if (!iframeHtml) return null;

  return (
    <div className={cn("w-full h-[450px] relative", className)}>
      <div
        dangerouslySetInnerHTML={{ __html: iframeHtml }}
        className="absolute top-0 left-0 w-full h-full"
      />
    </div>
  );
};

export default IframeMap;
