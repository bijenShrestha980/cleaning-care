"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Skeleton } from "@/components/ui/skeleton";
import { quoteStatuses } from "@/constants/table-data";
import { cn } from "@/lib/utils";
import { useUpdateUserQuoteStatus } from "@/features/quote/api/use-update-user-quote";
import { Badge } from "@/components/ui/badge";
import { Quote } from "@/components/admin/data/schema";

const QuoteStatus = ({ quote }: { quote: Quote }) => {
  const {
    mutate: updateUserQuoteStatus,
    isPending: updateUserQuoteStatusIsPending,
    isError: updateUserQuoteStatusIsError,
    isSuccess: updateUserQuoteStatusIsSuccess,
  } = useUpdateUserQuoteStatus(quote?.id);
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");
  const quoteStatus = quote?.status || quote?.quoteStatus;
  const quoteConfirmation = quote?.confirmation;

  React.useEffect(() => {
    setValue(quoteStatus as string);
  }, [quoteStatus, updateUserQuoteStatusIsError]);

  // React.useEffect(() => {
  //   setStatus(value);
  // }, [value]);

  const handleSelect = async (currentValue: string) => {
    updateUserQuoteStatus({
      data: { status: currentValue as any },
      // @ts-ignore
      id: quote?.id,
    });
    setValue(currentValue === value ? "" : currentValue);
    setOpen(false);
  };

  if (updateUserQuoteStatusIsPending) {
    return <Skeleton className="w-[150px] h-8" />;
  }
  return (
    <>
      {quoteStatus === "received_from_user" ||
      quoteStatus === "payment_complete" ||
      (quoteStatus === "quote_sent_to_user" &&
        quoteConfirmation !== "accept") ? (
        <Badge
          variant={"outline"}
          className="w-[150px] h-8 px-3 justify-between"
        >
          {quoteStatuses.find((status) => status.value === value)?.label}
        </Badge>
      ) : (
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              size={"sm"}
              role="combobox"
              aria-expanded={open}
              className="w-[150px] justify-between"
            >
              {value
                ? quoteStatuses.find((status) => status.value === value)?.label
                : "Select status..."}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[200px] p-0">
            <Command>
              <CommandInput placeholder="Search framework..." />
              <CommandList>
                <CommandEmpty>No status found.</CommandEmpty>
                <CommandGroup>
                  {quoteStatuses
                    .filter(
                      (el) =>
                        el.value !== "received_from_user" &&
                        el.value !== "quote_sent_to_user"
                    )
                    .map((status) => (
                      <CommandItem
                        key={status.value}
                        value={status.value}
                        onSelect={handleSelect as (value: string) => void}
                      >
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            value === status.value ? "opacity-100" : "opacity-0"
                          )}
                        />
                        <div className="w-full flex justify-between">
                          {status.label}
                          {status.icon && (
                            <status.icon className="ml-2 h-4 w-4" />
                          )}
                        </div>
                      </CommandItem>
                    ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      )}
    </>
  );
};

export default QuoteStatus;
