"use client";

import * as React from "react";
import {
  BadgeDollarSign,
  Check,
  ChevronsUpDown,
  LoaderCircle,
  ShieldCheck,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Quote } from "@/components/admin/data/schema";
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
import { cn } from "@/lib/utils";
import { quoteStatuses } from "@/constants/table-data";
import { useUpdateUserQuoteStatus } from "@/features/quote/api/use-update-user-quote";
import InvoiceGenerate from "@/features/invoice/components/invoice-generate";

const QuoteStatus = ({ quote }: { quote: Quote }) => {
  const [value, setValue] = React.useState<string>(
    quote?.quoteStatus || quote?.status || ""
  );
  const [open, setOpen] = React.useState(false);

  const {
    mutate: updateUserQuoteStatus,
    isPending: updateUserQuoteStatusIsPending,
    isError: updateUserQuoteStatusIsError,
    isSuccess: updateUserQuoteStatusIsSuccess,
  } = useUpdateUserQuoteStatus(quote.id);

  const quoteStatus = quote?.status || quote?.quoteStatus;
  const quoteConfirmation = quote?.confirmation;

  React.useEffect(() => {
    setValue(quoteStatus as string);
  }, [quoteStatus, setValue, updateUserQuoteStatusIsError]);

  React.useEffect(() => {
    if (updateUserQuoteStatusIsSuccess) {
      location.reload();
      // setUpdateStatus(updateUserQuoteStatusIsSuccess);
    }
  }, [updateUserQuoteStatusIsSuccess]);

  const handleSelect = async (currentValue: string) => {
    updateUserQuoteStatus({
      data: { status: currentValue as any },
      id: quote.id as string | number,
    });
    setValue(currentValue === value ? "" : currentValue);
    setOpen(false);
  };

  if (
    value === "received_from_user" ||
    value === "payment_complete" ||
    (value === "quote_sent_to_user" && quoteConfirmation !== "accept")
  ) {
    return (
      <Badge variant={"outline"} className="w-max h-8 px-3 justify-between">
        {quoteStatuses.find((status) => status.value === value)?.label}
      </Badge>
    );
  }
  if (
    (quoteStatus === "quote_sent_to_user" && quoteConfirmation === "accept") ||
    quoteStatus === "work_in_process" ||
    quoteStatus === "invoice_sent"
  ) {
    return (
      <>
        {updateUserQuoteStatusIsPending ? (
          <Skeleton className="w-[134px] h-8" />
        ) : (
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                size={"sm"}
                role="combobox"
                aria-expanded={open}
                className="justify-between w-max"
              >
                {value
                  ? quoteStatuses.find((status) => status.value === value)
                      ?.label
                  : "Select status..."}
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
              <Command>
                <CommandInput placeholder="Search status..." />
                <CommandList>
                  <CommandEmpty>No status found.</CommandEmpty>
                  {quoteStatus === "quote_sent_to_user" &&
                    quoteConfirmation === "accept" && (
                      <CommandGroup>
                        <CommandItem
                          value={"work_in_process"}
                          onSelect={handleSelect as (value: string) => void}
                        >
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4",
                              value === "work_in_process"
                                ? "opacity-100"
                                : "opacity-0"
                            )}
                          />
                          <div className="w-full flex justify-between items-center">
                            Work in progress
                            <LoaderCircle className="h-4 w-4" />
                          </div>
                        </CommandItem>
                      </CommandGroup>
                    )}
                  {quoteStatus === "work_in_process" && (
                    <CommandGroup>
                      <CommandItem
                        value={"completed"}
                        onSelect={handleSelect as (value: string) => void}
                      >
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            value === "completed" ? "opacity-100" : "opacity-0"
                          )}
                        />
                        <div className="w-full flex justify-between items-center">
                          Completed
                          <ShieldCheck className="h-4 w-4" />
                        </div>
                      </CommandItem>
                    </CommandGroup>
                  )}
                  {quoteStatus === "invoice_sent" && (
                    <CommandGroup>
                      <CommandItem
                        value={"payment_complete"}
                        onSelect={handleSelect as (value: string) => void}
                      >
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            value === "payment_complete"
                              ? "opacity-100"
                              : "opacity-0"
                          )}
                        />
                        <div className="w-full flex justify-between items-center">
                          Payment complete
                          <BadgeDollarSign className="h-4 w-4" />
                        </div>
                      </CommandItem>
                    </CommandGroup>
                  )}
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        )}
      </>
    );
  }
  if (quoteStatus === "completed" && quote?.id) {
    return <InvoiceGenerate id={quote?.id} />;
  }
};

export default QuoteStatus;
