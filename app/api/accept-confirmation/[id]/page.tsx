import Link from "next/link";
import { CheckCircle, Calendar, Clock, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Component() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4 font-montserratSans">
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
          {/* <div className="bg-green-50 border border-green-200 rounded-lg p-4 space-y-2">
            <h2 className="font-semibold text-green-800">
              Cleaning Service Details:
            </h2>
            <div className="flex items-center text-gray-600">
              <Calendar className="mr-2" size={18} />
              <span>Date: November 5, 2024</span>
            </div>
            <div className="flex items-center text-gray-600">
              <Clock className="mr-2" size={18} />
              <span>Time: 10:00 AM - 2:00 PM</span>
            </div>
            <div className="flex items-center text-gray-600">
              <MapPin className="mr-2" size={18} />
              <span>Location: 123 Main St, Anytown, USA</span>
            </div>
          </div> */}
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
  );
}
