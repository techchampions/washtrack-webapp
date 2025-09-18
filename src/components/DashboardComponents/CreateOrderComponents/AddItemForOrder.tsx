// import { Button, InputField } from "@/components/FormComponents";
// import { Form, Formik } from "formik";
// import * as Yup from "yup";
// import React from "react";
// import ImageUploadField from "@/components/FormComponents/ImageInput";
// import { useModal } from "@/store/useModal.store";
// import { useGetItemService } from "@/hooks/query/useGetItemService";
// import Loader from "@/components/GeneralComponents/Loader";
// import SelectField from "@/components/FormComponents/SelectField";
// import SmallLoader from "@/components/GeneralComponents/SmallLoader";

// const AddItemForOrder = () => {
//   const initialValues = {
//     image: "",
//     service: "",
//     item_name: "",
//   };
//   const validationSchema = Yup.object({
//     item_name: Yup.string().required("required"),
//     service: Yup.string().required("required"),
//     image: Yup.mixed().required("required"),
//   });
//   const addItems = () => {};
//   const modal = useModal();
//   const { data, isLoading, isError } = useGetItemService();
//   if (isLoading) {
//     return <SmallLoader />;
//   }
//   if (isError) {
//     return <p className="text-red-500">Failed to get items</p>;
//   }
//   const itemTypes = data?.itemType ?? [];
//   const itemtypesOption = itemTypes.map((item) => ({
//     value: item.id,
//     label: item.name,
//   }));
//   return (
//     <div>
//       <h3 className="text-[30px] text-left text-black font-bold mb-4">
//         Add Item
//       </h3>

//       <Formik
//         initialValues={initialValues}
//         validationSchema={validationSchema}
//         onSubmit={addItems}
//         enableReinitialize
//       >
//         {({ values, isValid }) => {
//           const selectedItem = values.item_name
//             ? itemTypes.find((item) => item.id === Number(values.item_name))
//             : null;

//           console.log(selectedItem);
//           const serviceOptions =
//             selectedItem?.services?.map((service) => ({
//               value: service.id,
//               label: service.service_name,
//             })) || [];
//           return (
//             <Form className="space-y-2">
//               <SelectField
//                 options={itemtypesOption}
//                 name="item_name"
//                 placeholder="Select Item"
//               />
//               <SelectField
//                 options={serviceOptions}
//                 placeholder="Select service e.g wash, iron, starch"
//                 name="service"
//                 disabled={!values.item_name || isLoading}
//               />
//               <InputField
//                 type="number"
//                 placeholder="Quantity"
//                 name="quantity"
//               />
//               <div className="flex gap-2 flex-wrap py-2">
//                 <div className="w-full text-gray-700 text-left">Add Photo</div>
//                 <ImageUploadField
//                   text=""
//                   name="image"
//                   width={70}
//                   height={70}
//                   className="!w-fit"
//                 />
//                 <ImageUploadField
//                   name="image"
//                   text=""
//                   width={70}
//                   height={70}
//                   className="!w-fit"
//                 />
//                 <ImageUploadField
//                   name="image"
//                   text=""
//                   width={70}
//                   height={70}
//                   className="!w-fit"
//                 />
//               </div>

//               <Button type="submit" label="Add Item" disabled={!isValid} />
//               <button
//                 type="button"
//                 onClick={() => {
//                   modal.closeModal();
//                 }}
//                 className="mt-2 text-red-500"
//               >
//                 Cancel
//               </button>
//             </Form>
//           );
//         }}
//       </Formik>
//     </div>
//   );
// };

// export default AddItemForOrder;

import { Button, InputField } from "@/components/FormComponents";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import React from "react";
import ImageUploadField from "@/components/FormComponents/ImageInput";
import { useModal } from "@/store/useModal.store";
import { useGetItemService } from "@/hooks/query/useGetItemService";
import SelectField from "@/components/FormComponents/SelectField";
import SmallLoader from "@/components/GeneralComponents/SmallLoader";
import { useAddItemForOrder } from "@/hooks/mutations/useAddItemForOrder";

export interface ItemFormData {
  image: File | string;
  image2: File | string;
  image3: File | string;
  service: string;
  item_name: string;
  quantity: number;
  item_id: number;
  price: number;
  service_name: string;
  item_type: string;
}

interface AddItemForOrderProps {
  onAddItem: (item: ItemFormData) => void;
  editingIndex?: number | null;
  initialItemData?: Partial<ItemFormData>;
}

const AddItemForOrder: React.FC<AddItemForOrderProps> = ({
  onAddItem,
  editingIndex = null,
  initialItemData = {},
}) => {
  const { mutate: addItemForOrder, isPending } = useAddItemForOrder();
  const initialValues: ItemFormData = {
    image: "",
    image2: "",
    image3: "",
    service: "",
    item_name: "",
    quantity: 1,
    item_id: 0,
    price: 0,
    service_name: "",
    item_type: "",
    ...initialItemData,
  };

  const validationSchema = Yup.object({
    item_name: Yup.string().required("Item selection is required"),
    service: Yup.string().required("Service selection is required"),
    quantity: Yup.number()
      .required("Quantity is required")
      .min(1, "Quantity must be at least 1"),
    // image: Yup.mixed().required("At least one photo is required"),
  });

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

  const handleSubmit = (values: ItemFormData) => {
    // Find the selected item and service to get their names
    const selectedItem = itemTypes.find(
      (item) => item.id.toString() === values.item_name
    );
    const selectedService = selectedItem?.services.find(
      (service) => service.id.toString() === values.service
    );

    const itemData: ItemFormData = {
      ...values,
      item_id: parseInt(values.item_name),
      service_name: selectedService?.service_name || "",
      item_type: selectedItem?.name || "",
      price: selectedService?.price || 0,
    };
    const createItemPayload = {
      service_name: selectedService?.service_name,
      no_of_items: values.quantity,
      item_type: selectedItem?.name,
      photos: [""],
    };
    addItemForOrder(createItemPayload);
    onAddItem(itemData);
    modal.closeModal();
  };

  return (
    <div>
      <h3 className="text-[30px] text-left text-black font-bold mb-4">
        {editingIndex !== null ? "Edit Item" : "Add Item"}
      </h3>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        {({ values, isValid }) => {
          const selectedItem = values.item_name
            ? itemTypes.find((item) => item.id.toString() === values.item_name)
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
                name="item_name"
                placeholder="Select Item"
              />
              <SelectField
                options={serviceOptions}
                placeholder="Select service"
                name="service"
                disabled={!values.item_name}
              />
              <InputField
                type="number"
                placeholder="Quantity"
                name="quantity"
              />
              <div className="flex gap-2 flex-wrap py-2">
                <div className="w-full text-gray-700 text-left">Add Photo</div>
                <ImageUploadField
                  name="image"
                  text=""
                  width={70}
                  height={70}
                  className="!w-fit"
                />
                <ImageUploadField
                  name="image2"
                  text=""
                  width={70}
                  height={70}
                  className="!w-fit"
                />
                <ImageUploadField
                  name="image3"
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
                  label={editingIndex !== null ? "Update Item" : "Add Item"}
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

export default AddItemForOrder;
