"use client";

import Link from "next/link";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    if (process.env.NODE_ENV !== "production") {
      console.error(error);
    }
  }, [error]);

  return (
    <main className="min-h-[70vh] flex items-center justify-center px-5 py-20">
      <div className="max-w-xl w-full text-center">
        <h1 className="text-3xl md:text-4xl font-semibold text-primary mb-3">
          Something went wrong
        </h1>
        <p className="text-base text-[#191919] opacity-70 mb-8">
          We hit an unexpected error loading this page. Please try again or
          head back to the homepage.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button onClick={reset} variant="success" size="lg">
            Try again
          </Button>
          <Link href="/">
            <Button variant="outline" size="lg">
              Back to homepage
            </Button>
          </Link>
        </div>
      </div>
    </main>
  );
}
