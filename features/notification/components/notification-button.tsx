"use client";
import { Bell } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useNotification } from "../api/use-notification";

const NotificationButton = () => {
  const {
    data: notificationData,
    isPending: notificationIsPending,
    isError: notificationIsError,
  } = useNotification();

  const unreadCount = notificationData?.reduce(
    (count: number, notification: { is_read: number }) => {
      return notification.is_read === 0 ? count + 1 : count;
    },
    0
  );

  if (notificationIsPending) {
    return <Skeleton className="w-10 h-10 rounded-full" />;
  }
  if (notificationIsError) {
    return <Skeleton className="w-10 h-10 rounded-full" />;
  }
  return (
    <Link href="/cleaning-care-admin/dashboard/notification">
      <Button
        animation={"scale_in"}
        type="button"
        className="shadow-[rgba(255, 255, 255, 0.945)_0px_7px_29px_0px] bg-gradient-to-r from-slate-600 to-slate-500 rounded-full p-0 w-10 h-10 relative"
      >
        <Bell size={20} className="text-primary-foreground" />
        {unreadCount > 0 && (
          <span className="absolute -bottom-1 -right-1 h-5 w-5 rounded-full bg-slate-500 flex justify-center items-center">
            <p className="text-primary-foreground text-xs">{unreadCount}</p>
          </span>
        )}
      </Button>
    </Link>
  );
};

export default NotificationButton;
