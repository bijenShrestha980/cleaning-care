"use client";
import { Info, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import Error from "@/components/ui/error";
import Loading from "@/components/ui/loading";
import { useNotification } from "../api/use-notification";
import { useDeleteNotification } from "../api/use-delete-notification";
import { useReadNotification } from "../api/use-create-notification";

const NotificationDetails = () => {
  const router = useRouter();
  const {
    data: notificationData,
    isPending: notificationIsPending,
    isError: notificationIsError,
  } = useNotification();
  const { mutate: readNotification } = useReadNotification();
  const { mutate: deleteNotification, isPending: deleteIsPending } =
    useDeleteNotification();

  const handleClicked = ({
    send_user_quote_id,
    id,
  }: {
    send_user_quote_id: number;
    id: number;
  }) => {
    router.push(`/cleaning-care-admin/dashboard/quote/${send_user_quote_id}`);
    readNotification({
      data: {
        id,
      },
      id,
    });
  };

  if (notificationIsPending) {
    return <Loading />;
  }
  if (notificationIsError) {
    return <Error />;
  }
  return (
    <div className="pb-16">
      <p className="font-medium mb-4">Notifications</p>
      {notificationData?.length === 0 ? (
        <div className="flex items-center justify-center">
          <p className="text-gray-500">No notifications found</p>
        </div>
      ) : (
        <ul className="space-y-4">
          {notificationData?.map((notification: any, index: number) =>
            deleteIsPending ? (
              <Skeleton key={index} className="h-[72px] w-full" />
            ) : (
              <li
                className={`flex items-start space-x-4 p-4 rounded-lg cursor-pointer ${
                  notification.is_read === 0 ? "bg-gray-100" : "bg-white"
                }`}
                key={notification.id}
                onClick={() =>
                  handleClicked({
                    send_user_quote_id: notification.send_user_quote_id,
                    id: notification.id,
                  })
                }
              >
                <div className="flex-shrink-0">
                  <Info className="h-5 w-5 text-blue-500" />
                </div>
                <div className="flex-grow">
                  <h3 className="text-sm font-medium">#{notification.id}</h3>
                  <p className="text-sm text-gray-500">
                    {notification.message}
                  </p>
                </div>
                <div className="flex-shrink-0 space-x-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteNotification(notification.id);
                    }}
                    className="z-40"
                  >
                    <Trash2 className="h-4 w-4" />
                    <span className="sr-only">Delete</span>
                  </Button>
                </div>
              </li>
            )
          )}
        </ul>
      )}
    </div>
  );
};

export default NotificationDetails;
