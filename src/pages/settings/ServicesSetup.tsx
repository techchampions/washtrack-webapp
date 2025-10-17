import { Header, RightSideBar } from "@/components/DashboardComponents";
import AddService from "@/components/DashboardComponents/SettingsComponents/AddService";
import EditService from "@/components/DashboardComponents/SettingsComponents/EditService";
import { Button } from "@/components/FormComponents";
import LinkButton from "@/components/GeneralComponents/LinkButton";
import { useDeleteService } from "@/hooks/mutations/useMutateServices";
import { useGetServices } from "@/hooks/query/useGetServices";
import { useModal } from "@/store/useModal.store";
import { formatPrice } from "@/utils/formatter";
import { ArrowLeft, Edit, Trash } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";

const ServicesSetup = () => {
  const { data } = useGetServices();
  const { mutate: deleteService } = useDeleteService();
  const modal = useModal();
  const navigate = useNavigate();
  const services = data?.service ?? [];
  const handleDelete = (id: number) => {
    const payload = { id: id };
    deleteService(payload);
  };
  return (
    <div>
      <Header />
      <div className="flex flex-col gap-6 lg:flex-row">
        <div className="w-full lg:w-2/3">
          <div className="flex items-center justify-between mb-5">
            <div className="text-left">
              <h3 className="text-2xl font-bold">My Services</h3>
              <p className="text-xs text-gray-500">
                Add or edit the services you render in your store.
              </p>
            </div>
            <Button
              label="Add Services"
              className="!w-fit px-5 text-sm"
              onClick={() => modal.openModal(<AddService />)}
            />
          </div>
          <div className="flex-1">
            <div className="grid grid-cols-4 p-2 text-lg font-medium text-white bg-brand rounded-xl">
              <div className="">Name</div>
              <div className="">Price</div>
              <div className="">Est. Hours</div>
              <div className="">Action</div>
            </div>
            {services.map((service, index) => (
              <div
                className="grid grid-cols-4 p-2 text-sm odd:bg-brand-100 rounded-xl"
                key={index}
              >
                <div className="">{service.name}</div>
                <div className="">{formatPrice(service.price)}</div>
                <div className="">{service.estimated_hours}</div>
                <div className="flex items-center justify-center gap-4 cursor-pointer">
                  <Edit
                    size={15}
                    color="blue"
                    onClick={() =>
                      modal.openModal(<EditService service={service} />)
                    }
                  />
                  <Trash
                    size={15}
                    color="red"
                    onClick={() => handleDelete(service.id)}
                  />
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
              href="/dashboard/settings/items-setup"
              label="Add Items"
              className="!w-fit px-6 rounded-xl"
            />
          </div>
        </div>
        <RightSideBar />
      </div>
    </div>
  );
};

export default ServicesSetup;
