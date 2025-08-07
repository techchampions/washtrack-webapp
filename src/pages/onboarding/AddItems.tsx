import { useState, useEffect } from "react";
import { useOrderStore } from "@/store/orderStore";
import { useEstoreStore } from "@/store/eStore"
import { useOnboardingStore } from "@/store/onboardingStore";
import Button from "@/components/FormComponents/Button"
import InputField from "@/components/FormComponents/InputField";
import { FiFileText } from "react-icons/fi";
import { FaChevronRight, FaTrash } from "react-icons/fa";
import Toast from "@/components/GeneralComponents/Toast";
import { Service } from "@/types/GeneralTypes/ordertypes";
import { Form, FieldArray, Formik, FormikHelpers } from "formik";
import * as Yup from "yup";

// {
//     "id": 195,
//     "store_id": 189,
//     "name": "Shirt",
//     "services": [
//         {
//             "id": 475,
//             "service_name": "wash",
//             "item_id": 195,
//             "price": 500
//         },
//         {
//             "id": 476,
//             "service_name": "Iron",
//             "item_id": 195,
//             "price": 900
//         }
//     ]
// }
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
const AddItemServices = () => {
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
  const { setStep } = useOnboardingStore();
  const { fetchStoreItems, updateStoreItem, storeItems, postStoreItem, fetchStoreItem, isLoading } = useEstoreStore();

  const { services,fetchServices } = useOrderStore();

  useEffect(() => {
    // console.log("Edit index name", storeItems.itemType[editIndex]['name'])
    console.log("Store Items ItemType:", services, "Edit Index:", editIndex);
  }, [storeItems])

  useEffect(() => {
    const fetchItems = async () => {
      await fetchStoreItems();
      await fetchServices(1);
    };
    fetchItems();
  }, [editIndex]);

  const validationSchema = Yup.object().shape({
    item_name: Yup.string().required("Item name is required"),
  });

  const handleDeleteService = () => {

    return;
  }

  // const handleSubmit1 = () => {
  //   return;
  // }

  const handleSubmit = async (
    values: ItemFormValues,
    { resetForm }: FormikHelpers<ItemFormValues>
  ) => {
    try {
      if (editIndex !== null) {
        // EDIT mode
        const currentItemServices = storeItems?.itemType[editIndex]?.services;
        console.log(currentItemServices, "------ currentItemServices")

        // this is an array of services for the item being edited
        console.log(values.services, "------ values.services")
        const payload = values.services.map((service, idx) => {
          const original = currentItemServices?.find(
            (s) => s.service_id === service.service_id
          );
          return {
            id: service.service_id,
            item_id: service?.item_id,
            item_name: values.item_name,
            service_id: service.service_id,
            service_name: service.service_name,
            price: Number(service.price),
            estimated_hours: Number(service.estimated_hours),
          };
        });

        console.log(payload)
        // return

        const response = await updateStoreItem(payload);
        console.log(response, "-------------response---------")

        if (response.success) {
          showToastMessage(response.message, "success");
          setShowModal(false);
          setEditIndex(null);
          resetForm();
        }
      } else {
        console.log("I am here")
        console.log(values.services, "value services")
        // return;
        const payload = {
          item_name: values.item_name,
          services: services.map((s) => ({
            service_id: s.id,
            service_name: s.name,
            price: Number(s.price),
            estimated_hours: Number(s.estimated_hours),
          })),
        };

        console.log(payload)
        // return;

        const response = await postStoreItem(payload);

        if (response.success) {

          showToastMessage(response?.message, "success");
          setShowModal(false);
          resetForm();
        }
      }
    } catch (err: any) {
      showToastMessage(err.response.data.message, "error");
    } finally {
       setShowModal(false);
          setEditIndex(null);
          resetForm();
      fetchStoreItems();

    }
  };


  const getServicesItem = (data: any) => {
    const item = data[editIndex];
    console.log(`Item in getservicesitem: ${typeof item}`);

    const servicesToEdit = [];
    const seenIds = new Set();

    if (item?.services && Array.isArray(item?.services)) {
      item.services.forEach((service: any) => {
        if (!seenIds.has(service.id)) {
          seenIds.add(service.id);
          servicesToEdit.push({
            id: service.id,
            service_id: service.item_id,
            estimated_hours: service.estimated_hours,
            service_name: service.service_name,
            price: service.price,
          });
        }
      });
    }
    return servicesToEdit;
  };

  // {
  //     "id": 205,
  //     "store_id": 189,
  //     "user_id": 222,
  //     "name": "wash",
  //     "price": "500",
  //     "estimated_hours": 2,
  //     "created_at": "2025-07-28T10:34:05.000000Z",
  //     "updated_at": "2025-07-28T11:15:18.000000Z",
  //     "store_type": null,
  //     "item_id": null,
  //     "service_type": 1
  // }


  // {
  //     "item_name": "Shirt",
  //     "service_id": 195,
  //     "service_name": "wash",
  //     "price": 500,
  //     "estimated_hours": 2,
  //     id: undefined,
  //     store_id: undefined,
  //     user_id: undefined,
  //     item_id: undefined,

  // }
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
        {storeItems?.itemType.map((item, index) => (
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
              <p className="text-sm">{item.name}</p>
              <p className="text-xs text-gray-800">
                {item["services"].map((s) => s.service_name).join(", ")}
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
        className={`${services.length === 0 ? "hidden bg-blue-200" : "bg-brand"}`}
        disabled={services.length === 0}
        onClick={() => setStep("onboarding complete")}
      />

      {showModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
  

          <div className="bg-white p-6 rounded-[25px] shadow-lg w-[380px] max-w-md max-h-[90vh] overflow-y-auto">
            <h3 className="text-[24px] font-bold text-black mb-4">
              {editIndex !== null ? "Edit item" : "Add new item"}
            </h3>

            <Formik
              key={editIndex !== null ? `edit-${editIndex}` : "create"}
              initialValues={{
                item_name:
                  editIndex !== null ? storeItems?.itemType[editIndex]?.name : "",

                services: getServicesItem(storeItems?.itemType) || []
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
                                  values.services[index].id
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

      {showToast && (
        <Toast
          message={toastMsg}
          type={toastType}
          onClose={() => setShowToast(false)}
        />
      )}
    </div>
  );
}

export default AddItemServices;