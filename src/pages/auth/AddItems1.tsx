import { useState } from "react";
import { Formik, Form, FieldArray, FormikHelpers } from "formik";
import * as Yup from "yup";
import Button from "../../components/FormComponents/Button";
import InputField from "../../components/FormComponents/InputField";
import { FaChevronRight, FaTrash } from "react-icons/fa";
import { useUserStore } from "../../store/AppStore";
import { useOnboardingStore } from "@/store/onboardingStore"
import { useEstoreStore } from "@/store/eStore";
import { useOrderStore } from "@/store/orderStore"
import { FiFileText } from "react-icons/fi";
import apiClient from "../../utils/AxiosInstance";
import Toast from "../../components/GeneralComponents/Toast";
import { ItemService, UpdateService } from "@/types/GeneralTypes/estoreTypes";

interface ServiceInput {
  service_id: string;
  service_name: string;
  price: number | string;
  estimated_hours: number | string;
}

interface ItemFormValues {
  item_name: string;
  services: ServiceInput[];
}

const AddItems = () => {
  const { setStep } = useOnboardingStore();
  const { items, setItems, addItem, removeService } = useUserStore();
  const { services, deleteServices, isLoading, error } = useOrderStore();
  const { updateStoreItem, postStoreItem, storeItems } = useEstoreStore()

  const [showModal, setShowModal] = useState(false);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [showToast, setShowToast] = useState(false);
  const [toastMsg, setToastMsg] = useState("");
  const [toastType, setToastType] = useState<"success" | "error">("success");
  const showToastMessage = (msg: string, type: "success" | "error") => {
    setToastMsg(msg);
    setToastType(type);
    setShowToast(true);
  };

  const handleDeleteService = async (serviceId: string) => {

    try {
      const response = await deleteServices({ id: serviceId })

      if (response.status === 200) {
        showToastMessage("Service deleted successfully", "success");
      }
    } catch (err: any) {
      console.error("Error deleting service:", err);
      showToastMessage(err.message, "error");
    }
  };

  const validationSchema = Yup.object().shape({
    item_name: Yup.string().required("Item name is required"),
  });

  const handleSubmit = async (
    values: ItemFormValues,
    { resetForm }: FormikHelpers<ItemFormValues>
  ) => {
    try {
      if (editIndex !== null) {
        // EDIT mode
        const currentItemServices = items[editIndex]; // this is an array of services for the item being edited
        const payload = values.services.map((service, idx) => {
          const original = currentItemServices.find(
            (s) => s.service_id === service.service_id
          );

          return {
            id: original?.id,
            item_id: original?.item_id,
            user_id: original?.user_id,
            store_id: original?.store_id,
            item_name: values.item_name,
            service_id: service.service_id,
            service_name: service.service_name,
            price: Number(service.price),
            estimated_hours: Number(service.estimated_hours),
          }
        });

        const response = await updateStoreItem(payload);

        // const response = await apiClient.put("/item-services/update", payload); // note corrected "upate" typo

        if (response.status === 200) {
          // const updatedItem = response.data.item_services;

          showToastMessage(response.data.message, "success");

          setShowModal(false);
          setEditIndex(null);
          resetForm();
        }
      } else {
        // CREATE mode
        const payload: ItemService = {
          item_name: values.item_name,
          services: values.services.map((s) => ({
            service_id: Number(s.service_id),
            service_name: s.service_name,
            price: Number(s.price),
            estimated_hours: Number(s.estimated_hours),
          })),
        };
        const response = await postStoreItem(payload);

        if (response.status === 201 || response.status === 200) {
          showToastMessage(response.message, "success");
          setShowModal(false);
          resetForm();
        } else {
          console.log(response, "Error in add item post func");
        }
      }
    } catch (error: any) {
      const errorMessage = error.message;
      showToastMessage(errorMessage, "error");
    }
  };

  return (
    <div className="flex flex-col items-center space-y-4 w-full max-w-lg mx-auto p-4 relative">
      <h2 className="text-[20px] font-brand-bold text-brand text-center">
        Add your Item Types
      </h2>
      <p className="text-gray-600 text-center text-xs mt-2">
        Add the items you deal with below to complete your store setup
      </p>

      <Button
        label="Add a item"
        onClick={() => {
          setEditIndex(null);
          setShowModal(true);
        }}
      />

      <div className="mt-1 w-full flex flex-col justify-start text-black h-[200px] max-w-full min-w-[300px] overflow-y-auto">
        {items.map((item, index) => (
          <div
            key={index}
            className="bg-brand-100 p-2 rounded-md mt-2 text-left flex items-center gap-2 w-full"
            onClick={() => {
              setEditIndex(index);
              setShowModal(true);
            }}
          >
            <div className="bg-brand-200 p-2 rounded-full">
              <FiFileText className="text-quick-action-icon h-4 w-4" />
            </div>
            <div className="w-full">
              <p className="text-sm">{item[0]?.item_name}</p>
              <p className="text-xs text-gray-800">
                {item.map((s) => s.service_name).join(", ")}
              </p>
            </div>
            <div className="float-right">
              <FaChevronRight className="text-black" />
            </div>
          </div>
        ))}
      </div>

      <p className="text-gray-600 text-xs text-center mt-6">
        Click the “Add a item” button to add the type of items you render in
        your laundry store
      </p>

      <Button
        label="Next"
        className={`${items.length === 0 ? "hidden bg-blue-200" : "bg-brand"}`}
        disabled={items.length === 0}
        onClick={() => setStep("onboarding complete")}
      />

      {showModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          {showToast && (
            <Toast
              message={toastMsg}
              type={toastType}
              onClose={() => setShowToast(false)}
            />
          )}

          <div className="bg-white p-6 rounded-[25px] shadow-lg w-[380px] max-w-md max-h-[90vh] overflow-y-auto">
            <h3 className="text-[24px] font-bold text-black mb-4">
              {editIndex !== null ? "Edit item" : "Add new item"}
            </h3>

            <Formik
              key={editIndex !== null ? `edit-${editIndex}` : "create"}
              initialValues={{
                item_name:
                  editIndex !== null ? items[editIndex][0]?.item_name : "",
                // services: services.map((service) => {
                //   const existing =
                //     editIndex !== null
                //       ? items[editIndex].find(
                //           (s) => s.service_id === service.id
                //         )
                //       : null;

                //   return {
                //     service_id: service.id,
                //     service_name: service.name,
                //     price: existing ? existing.price : "",
                //     estimated_hours: existing ? existing.estimated_hours : "",
                //   };
                // }),
                services: services.map((service) => {
                  const existing =
                    editIndex !== null
                      ? items[editIndex].find(
                        (s) => s.service_id === service.id
                      )
                      : null;

                  return {
                    service_id: service.id,
                    service_name: service.name,
                    price:
                      existing !== null ? existing.price : service.price ?? "", // 👈 fallback to global state price
                    estimated_hours:
                      existing !== null
                        ? existing.estimated_hours
                        : service.estimated_hours ?? "", // 👈 fallback to global state hours
                  };
                }),
              }}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
              enableReinitialize
            >
              {({ values, isSubmitting }) => (
                <Form className="space-y-4">
                  <InputField
                    type="text"
                    placeholder="Item name e.g Trouser, Shirt, Agbada"
                    name="item_name"
                  />
                  <div className="text-left text-lg text-black">Services</div>
                  <FieldArray name="services">
                    {() => (
                      <div className="space-y-3">
                        {values.services.map((_, index) => (
                          <div
                            key={index}
                            className="border border-gray-300 py-[3px] px-2 rounded-md flex items-center text-left text-black"
                          >
                            <p className="text-sm font-medium mb-2 flex-grow">
                              {values.services[index].service_name}
                            </p>
                            <div className="grid grid-cols-2 gap-2">
                              <InputField
                                name={`services[${index}].price`}
                                type="number"
                                placeholder="Price"
                                className="max-w-[70px]"
                              />
                              <InputField
                                name={`services[${index}].estimated_hours`}
                                type="number"
                                placeholder="Hours"
                                className="max-w-[70px]"
                              />
                            </div>
                            <FaTrash
                              className="w-3 text-red-500 ml-2 cursor-pointer"
                              onClick={(e) => {
                                e.stopPropagation(); // prevent opening modal
                                handleDeleteService(
                                  values.services[index].service_id
                                );
                              }}
                            />
                          </div>
                        ))}
                      </div>
                    )}
                  </FieldArray>

                  <Button
                    type="submit"
                    label={editIndex !== null ? "Update item" : "Add item"}
                    isLoading={isSubmitting}
                    disabled={isSubmitting}
                  />

                  <button
                    type="button"
                    onClick={() => {
                      setShowModal(false);
                      setEditIndex(null);
                    }}
                    className="mt-2 text-red-500"
                  >
                    Cancel
                  </button>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddItems;
