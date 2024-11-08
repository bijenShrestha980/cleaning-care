"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { CheckCircle, CircleOff, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  useAcceptConfirmation,
  useDeclinedConfirmation,
} from "@/features/confirmation/api/use-confirmation";
import { toast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";

export default function Confirmation({ params }: { params: { id: number } }) {
  const [confirmationState, setConfirmationState] = useState("pending");
  const {
    data: acceptConfirmationData,
    isFetching: acceptConfirmationIsFetching,
    isError: acceptConfirmationIsError,
    refetch: refetchAcceptConfirmation,
  } = useAcceptConfirmation(params.id);

  const {
    data: declineConfirmationData,
    isFetching: declineConfirmationIsFetching,
    isError: declineConfirmationIsError,
    refetch: refetchDeclineConfirmation,
  } = useDeclinedConfirmation(params.id);

  useEffect(() => {
    if (acceptConfirmationIsError) {
      toast({
        title: "Error accepting quote",
        variant: "destructive",
      });
    }
  }, [acceptConfirmationIsError]);

  useEffect(() => {
    if (declineConfirmationIsError) {
      toast({
        title: "Error declining quote",
        variant: "destructive",
      });
    }
  }, [declineConfirmationIsError]);

  useEffect(() => {
    if (declineConfirmationData?.message === "Quote declined successfully.") {
      setConfirmationState("declined");
    }
  }, [declineConfirmationData]);

  useEffect(() => {
    if (acceptConfirmationData?.message === "Quote accepted successfully.") {
      setConfirmationState("accepted");
    }
  }, [acceptConfirmationData]);

  return (
    <>
      <div
        className={cn(
          "min-h-screen bg-gray-100 flex items-center justify-center p-4 font-montserratSans",
          confirmationState === "declined"
            ? "animate-in slide-in-from-top-2 opacity-100"
            : "opacity-0 hidden -z-10"
        )}
      >
        <Card className="max-w-lg w-full">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold text-destructive flex items-center justify-center">
              <CircleOff className="mr-2" />
              Quote Declined
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 space-y-2">
              <ul className="list-inside text-gray-600 space-y-1">
                <li>
                  We&apos;re sorry to hear that you have declined the quote. If
                  you have any questions or would like to discuss further,
                  please feel free to contact us.
                </li>
              </ul>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col sm:flex-row justify-end gap-4">
            <Button
              asChild
              variant="outline"
              className="w-full sm:w-auto border-destructive text-destructive hover:bg-red-500 hover:border-red-500 hover:text-destructive-foreground"
            >
              <Link href="/contact">Contact Us</Link>
            </Button>
            <Button
              asChild
              className="w-full sm:w-auto text-white"
              variant={"destructive"}
            >
              <Link href="/">Return Home</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
      <div
        className={cn(
          "min-h-screen bg-gray-100 flex items-center justify-center p-4 font-montserratSans",
          confirmationState === "pending"
            ? "animate-in slide-in-from-top-2 opacity-100"
            : "opacity-0 hidden -z-10"
        )}
      >
        <Card className="max-w-lg w-full">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold text-success flex items-center justify-center">
              <Quote className="mr-2" />
              Quote Request
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 space-y-2">
              <ul className="list-inside text-gray-600 space-y-1">
                <li>
                  Thank you for considering our company for your services.
                  We&apos;re pleased to present you with this customized quote
                  based on your requirements. Our team has carefully prepared
                  this offer to provide you with the best value and quality of
                  service. Should you have any questions or need further
                  clarification, please don&apos;t hesitate to reach out to us.
                  We&apos;re here to ensure you have all the information you
                  need to make an informed decision.
                </li>
              </ul>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col sm:flex-row justify-end gap-4">
            {declineConfirmationIsFetching ? (
              <Skeleton className="w-full h-9" />
            ) : (
              <Button
                className="w-full text-white"
                variant={"destructive"}
                disabled={
                  acceptConfirmationIsFetching || declineConfirmationIsFetching
                }
                onClick={() => {
                  refetchDeclineConfirmation();
                }}
              >
                Decline Quote
              </Button>
            )}
            {acceptConfirmationIsFetching ? (
              <Skeleton className="w-full h-9" />
            ) : (
              <Button
                className="w-full text-white"
                variant={"success"}
                disabled={
                  acceptConfirmationIsFetching || declineConfirmationIsFetching
                }
                onClick={() => {
                  refetchAcceptConfirmation();
                }}
              >
                Accept Quote
              </Button>
            )}
          </CardFooter>
        </Card>
      </div>
      <div
        className={cn(
          "min-h-screen bg-gray-100 flex items-center justify-center p-4 font-montserratSans",
          confirmationState === "accepted"
            ? "animate-in slide-in-from-top-2 opacity-100"
            : "opacity-0 hidden -z-10"
        )}
      >
        <Card className="max-w-lg w-full">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold text-success flex items-center justify-center">
              <CheckCircle className="mr-2" />
              Quote Accepted
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-600 text-center">
              Thank you for accepting the quote. We appreciate your business and
              will be in touch shortly to confirm the details of your cleaning
              service.
            </p>
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 space-y-2">
              <h3 className="font-semibold text-gray-700">Next Steps:</h3>
              <ul className="list-disc list-inside text-gray-600 space-y-1">
                <li>Our team will contact you to confirm the appointment</li>
                <li>
                  We&apos;ll arrive with all necessary cleaning supplies and
                  equipment
                </li>
              </ul>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col sm:flex-row justify-end gap-4">
            <Button
              asChild
              variant="outline"
              className="w-full sm:w-auto border-success text-success hover:bg-success-foreground hover:border-[#71c00a] hover:text-[#71c00a]"
            >
              <Link href="/contact">Contact Us</Link>
            </Button>
            <Button
              asChild
              className="w-full sm:w-auto text-white"
              variant={"success"}
            >
              <Link href="/">Return Home</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </>
  );
}
