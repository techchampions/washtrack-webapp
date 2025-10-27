import { Header } from "@/components/DashboardComponents";
import OrderItemLoading from "@/components/DashboardComponents/OrderItemLoading";
import SmallLoader from "@/components/GeneralComponents/SmallLoader";
import { useReadNotification } from "@/hooks/mutations/useReadNotification";
import { useGetNotification } from "@/hooks/query/useNotifications";
import { useModal } from "@/store/useModal.store";
import { formatDate } from "@/utils/formatter";
import { showError } from "@/utils/toast";
import { Bell } from "lucide-react";
import React from "react";

const NotificationsPage = () => {
  const { data, isLoading } = useGetNotification();
  const { mutate: read, isPending } = useReadNotification();
  const modal = useModal();
  const notifications = data?.notifications ?? [];
  if (isLoading) {
    return <OrderItemLoading />;
  }
  const notification = data?.notifications[0];
  const viewDetail = (item: typeof notification) => {
    try {
      if (item?.id) {
        read(item.id);
        if (isPending) {
          modal.openModal(<SmallLoader />);
        } else {
          modal.openModal(
            <div className="text-left max-w-xs">
              <h3 className="text-xl font-bold mb-3">{item?.title}</h3>
              <p>{item?.content}</p>
            </div>
          );
        }
      }
    } catch (error) {
      showError(String(error));
    }
  };
  return (
    <div>
      <Header />
      <div className="">
        <h3 className="text-3xl font-bold mb-3 text-left">Notifications</h3>
        <div className="space-y-2">
          {notifications.map((item, i) => (
            <div
              className="bg-brand-100 relative text-left text-[12px] md:text-[16px] p-2 rounded-lg border cursor-pointer border-gray-200 flex flex-row items-center gap-4"
              key={i}
              onClick={() => viewDetail(item)}
            >
              <div className="bg-brand-200 p-2 rounded-full">
                <Bell size={25} />
              </div>
              <div className="flex-1">
                <div className="font-medium line-clamp-1">{item.title}</div>
                <div className="text-gray-700 line-clamp-1">{item.content}</div>
              </div>
              <div className="text-right flex flex-col items-end justify-start">
                <div className="line-clamp-1">
                  {formatDate(item.created_at)}
                </div>
                <div className="">...</div>
              </div>
              {item.is_read === 0 && (
                <div
                  className={`h-3 w-3 bg-red-500 rounded-full absolute -top-1 -right-0`}
                ></div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NotificationsPage;
