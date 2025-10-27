import { Button, InputField } from "@/components/FormComponents";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import React from "react";
import ImageUploadField from "@/components/FormComponents/ImageInput";
import { useModal } from "@/store/useModal.store";
import { useGetItemService } from "@/hooks/query/useGetItemService";
import SelectField from "@/components/FormComponents/SelectField";
import SmallLoader from "@/components/GeneralComponents/SmallLoader";
import {
  useDeleteItemForOrder,
  useEditItemForOrder,
} from "@/hooks/mutations/useAddItemForOrder";
import { OrderItem } from "@/hooks/query/useGetOrderItem";
import { Trash2 } from "lucide-react";

export interface ItemFormData {
  photo1: File | string;
  photo2: File | string;
  photo3: File | string;
  quantity: number;
  service_name: string;
  item_type: string;
}

interface Props {
  item: OrderItem;
}

const EditItemForOrder: React.FC<Props> = ({ item }) => {
  const { mutate: update, isPending } = useEditItemForOrder();
  const { mutate: deleteItem, isPending: isDeleting } = useDeleteItemForOrder();

  const modal = useModal();
  const { data, isLoading, isError } = useGetItemService();

  if (isLoading) {
    return <SmallLoader />;
  }
  if (isError) {
    return <p className="text-red-500">Failed to get items</p>;
  }
  const itemTypes = data?.itemType ?? [];
  const itemtypesOption = itemTypes.map((item) => ({
    value: item.id.toString(),
    label: item.name,
  }));

  // Find the initial selected item
  const initialSelectedItem = itemTypes.find(
    (itemType) => itemType.name === item.item_type
  );

  // Find the initial selected service
  const initialSelectedService = initialSelectedItem?.services.find(
    (service) => service.service_name === item.service_name
  );
  const photos = JSON.parse(item.photos);
  console.log(photos);
  const initialValues: ItemFormData = {
    photo1: photos[0] || "",
    photo2: photos[1] || "",
    photo3: photos[2] || "",
    service_name: initialSelectedService?.id.toString() || "",
    item_type: initialSelectedItem?.id.toString() || "",
    quantity: item.no_of_items,
  };
  const validationSchema = Yup.object({
    item_type: Yup.string().required("Item selection is required"),
    service_name: Yup.string().required("Service selection is required"),
    quantity: Yup.number()
      .required("Quantity is required")
      .min(1, "Quantity must be at least 1"),
    // image: Yup.mixed().required("At least one photo is required"),
  });

  const handleSubmit = (values: ItemFormData) => {
    // Find the selected item and service to get their names
    const selectedItem = itemTypes.find(
      (item) => item.id.toString() === values.item_type
    );
    const selectedService = selectedItem?.services.find(
      (service) => service.id.toString() === values.service_name
    );
    const Payload = new FormData();
    if (
      item.id &&
      selectedService?.service_name &&
      values.quantity &&
      selectedItem?.name
    ) {
      Payload.append("id", String(item.id));
      Payload.append("service_name", selectedService.service_name);
      Payload.append("no_of_items", String(values.quantity));
      Payload.append("item_type", selectedItem.name);
      if (typeof values.photo1 !== "string") {
        Payload.append("photos[]", values.photo1);
      }
      if (typeof values.photo2 !== "string") {
        Payload.append("photos[]", values.photo2);
      }
      if (typeof values.photo3 !== "string") {
        Payload.append("photos[]", values.photo3);
      }
      // photos: [""],
    }
    update(Payload, {
      onSuccess() {
        modal.closeModal();
      },
    });
  };

  return (
    <div>
      <div
        className="flex items-center gap-1 text-red-500 cursor-pointer absolute top-4 left-4 text-sm"
        onClick={() =>
          deleteItem(item.id, {
            onSuccess() {
              modal.closeModal();
            },
          })
        }
      >
        <span>Delete</span>
        <Trash2 size={15} />
      </div>
      {isDeleting && (
        <div className="absolute inset-0 bg-black/50 z-50 rounded-[25px] flex flex-col justify-center items-center">
          <SmallLoader className="!bg-transparent" height="50px" width="50px" />
          <p>Deleting...</p>
        </div>
      )}
      <h3 className="text-[30px] text-left text-black font-bold mb-4">
        Update Item
      </h3>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        {({ values, isValid }) => {
          const selectedItem = values.item_type
            ? itemTypes.find((item) => item.id.toString() === values.item_type)
            : null;

          const serviceOptions =
            selectedItem?.services?.map((service) => ({
              value: service.id.toString(),
              label: service.service_name,
            })) || [];

          return (
            <Form className="space-y-2">
              <SelectField
                options={itemtypesOption}
                name="item_type"
                placeholder="Select Item"
              />
              <SelectField
                options={serviceOptions}
                placeholder="Select service"
                name="service_name"
                disabled={!values.item_type}
              />
              <InputField
                type="number"
                placeholder="Quantity"
                name="quantity"
              />
              <div className="flex gap-2 flex-wrap py-2">
                <div className="w-full text-gray-700 text-left">Add Photo</div>
                <ImageUploadField
                  name="photo1"
                  text=""
                  width={70}
                  height={70}
                  className="!w-fit"
                />
                <ImageUploadField
                  name="photo2"
                  text=""
                  width={70}
                  height={70}
                  className="!w-fit"
                />
                <ImageUploadField
                  name="photo3"
                  text=""
                  width={70}
                  height={70}
                  className="!w-fit"
                />
              </div>

              <div className="space-y-1">
                <Button
                  type="submit"
                  isLoading={isPending}
                  label="Update Item"
                  disabled={!isValid || isPending}
                />
                <button
                  type="button"
                  onClick={() => modal.closeModal()}
                  className="px-4 py-2 text-red-500"
                >
                  Cancel
                </button>
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default EditItemForOrder;
