import { Header, RightSideBar } from "@/components/DashboardComponents";
import AddItem from "@/components/DashboardComponents/SettingsComponents/AddItem";
import EditItem from "@/components/DashboardComponents/SettingsComponents/EditItem";
import { Button } from "@/components/FormComponents";
import LinkButton from "@/components/GeneralComponents/LinkButton";
import { useGetItemService } from "@/hooks/query/useGetItemService";
import { useModal } from "@/store/useModal.store";
import { ArrowLeft, Check, ChevronRight } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";

const ItemsSetup = () => {
  const { data } = useGetItemService();
  const modal = useModal();
  const navigate = useNavigate();
  const items = data?.itemType ?? [];
  return (
    <div>
      <Header />
      <div className="flex flex-col gap-6 lg:flex-row">
        <div className="w-full lg:w-2/3">
          <div className="flex items-center justify-between mb-5">
            <div className="text-left">
              <h3 className="text-2xl font-bold">My Items Types</h3>
              <p className="text-xs text-gray-500">
                Add or edit the items you deal with in your store.
              </p>
            </div>
            <Button
              label="Add Item Type"
              className="!w-fit px-5 text-sm"
              onClick={() => modal.openModal(<AddItem />)}
            />
          </div>
          <div className="flex-1">
            {items.map((item, index) => (
              <div
                className="flex items-center justify-between px-4 py-2 mt-1 rounded-lg cursor-pointer bg-brand-100"
                key={index}
                onClick={() => modal.openModal(<EditItem item={item} />)}
              >
                <div className="flex items-center gap-4">
                  <img
                    src="/images/order-icon.png"
                    className="object-cover w-10 h-10 rounded"
                    alt={item.name}
                  />
                  <div className="text-left">
                    <p className="font-semibold text-quick-action-icon">
                      {item.name}
                    </p>
                    <div className="text-sm text-gray-500 line-clamp-1">
                      {item.services.map(
                        (service) => `${service.service_name}, `
                      )}
                    </div>
                  </div>
                </div>
                <div className="">
                  <div className="flex items-center justify-end gap-1 text-sm cursor-pointer text-quick-action-icon hover:text-blue-700">
                    <ChevronRight />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-14">
            <Button
              onClick={() => navigate(-1)}
              label="Back"
              className="!w-fit px-6 bg-gray-500 flex hover:!bg-black rounded-xl"
              icon={<ArrowLeft />}
            />
            <LinkButton
              href="/dashboard/settings"
              label="Done"
              className="!w-fit px-6 rounded-xl"
              rightIcon={<Check />}
            />
          </div>
        </div>
        <RightSideBar />
      </div>
    </div>
  );
};

export default ItemsSetup;
