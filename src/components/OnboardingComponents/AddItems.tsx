// import { useState } from "react";
// import { Formik, Form, FormikHelpers } from "formik";
// import * as Yup from "yup";
// import Button from "../FormComponents/Button";
// import InputField from "../FormComponents/InputField";
// import {
//   FaChevronRight,
//   FaFile,
//   FaFileAlt,
//   FaFileArchive,
// } from "react-icons/fa";
// import { useOnboardingStore, useUserStore } from "../../store/AppStore";
// import { FiFileText } from "react-icons/fi";

// // Define TypeScript type for a item
// interface Item {
//   item_name: string;
//   services: {
//     service_id: string | number;
//     service_name: string;
//     price: number | string;
//     estimated_hours: number | string;
//   }[];
// }

// const AddItems = () => {
//   const { setStep } = useOnboardingStore();
//   const { services, setServices, items, setItems } = useUserStore();

//   // const [items, setItems] = useState<Item[]>([]);
//   const [showModal, setShowModal] = useState(false);
//   const [editIndex, setEditIndex] = useState<number | null>(null);

//   const validationSchema = Yup.object().shape({
//     item_name: Yup.string().required("Item name is required"),
//   });

//   const handleSubmit = (values: Item, { resetForm }: FormikHelpers<Item>) => {
//     if (editIndex !== null) {
//       // Update existing Item
//       const updatedItems = [...items];
//       updatedItems[editIndex] = values;
//       setItems(updatedItems);
//       setEditIndex(null);
//     } else {
//       setItems([...items, values]);
//     }

//     setShowModal(false);
//     resetForm();
//     // Add new item
//   };

//   return (
//     <div className="flex flex-col items-center space-y-4 w-full max-w-lg mx-auto p-4 relative">
//       <h2 className="text-2xl font-brand-bold text-brand text-center">
//         Add your Item Types
//       </h2>
//       <p className="text-gray-600 text-center mt-2">
//         Add the items you deal with below to complete your store setup
//       </p>
//       <Button label="Add a item" onClick={() => setShowModal(true)} />

//       <div className="mt-1 w-full flex flex-col justify-start text-black h-[200px] max-w-[300px] min-w-[300px] overflow-y-auto">
//         {items.map((item, index) => (
//           <div
//             key={index}
//             className="bg-brand-100 p-3 rounded-md mt-2 text-left flex items-center gap-2 w-full"
//           >
//             <div className="bg-brand-200 p-3 rounded-full">
//               <FiFileText className="text-quick-action-icon h-6 w-6" />
//             </div>
//             <div className="w-full">
//               <p>{item.item_name}</p>
//               <p className="text-[12px] text-gray-800">Washing, Iron</p>
//             </div>
//             <div className="float-right">
//               <FaChevronRight className="text-black" />
//             </div>
//           </div>
//         ))}
//       </div>

//       <p className="text-gray-600 text-xs text-center mt-6">
//         Click the “Add a item” button to add the type of items you render in
//         your laundry store
//       </p>

//       <Button
//         label="Next"
//         className={`${items.length === 0 ? "hidden bg-blue-200" : "bg-brand"}`}
//         disabled={items.length === 0}
//         onClick={() => setStep("onboarding complete")}
//       />

//       {showModal && (
//         <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
//           <div className="bg-white p-6 rounded-[25px] shadow-lg w-[380px] max-w-md">
//             <h3 className="text-[30px] text-left text-black font-bold mb-4">
//               {editIndex !== null ? "Edit item" : "Add new item"}
//             </h3>

//             <Formik
//               initialValues={
//                 editIndex !== null ? items[editIndex] : { item_name: "" }
//               }
//               validationSchema={validationSchema}
//               onSubmit={handleSubmit}
//               enableReinitialize
//             >
//               {() => (
//                 <Form className="space-y-2">
//                   <InputField
//                     type="text"
//                     placeholder="item name e.g Trouser, Shirt, suits, Agbada etc..."
//                     name="item_name"
//                   />
//                   <Button
//                     type="submit"
//                     label={editIndex !== null ? "Update item" : "Add item"}
//                   />
//                   <button
//                     type="button"
//                     onClick={() => {
//                       setShowModal(false);
//                       setEditIndex(null);
//                     }}
//                     className="mt-2 text-red-500"
//                   >
//                     Cancel
//                   </button>
//                 </Form>
//               )}
//             </Formik>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default AddItems;

// 2nd attempt

// import { useState } from "react";
// import { Formik, Form, Field, FieldArray, FormikHelpers } from "formik";
// import * as Yup from "yup";
// import Button from "../FormComponents/Button";
// import InputField from "../FormComponents/InputField";
// import { FaChevronRight } from "react-icons/fa";
// import { useOnboardingStore, useUserStore } from "../../store/AppStore";
// import { FiFileText } from "react-icons/fi";
// import apiClient from "../../utils/AxiosInstance";

// interface Item {
//   item_name: string;
//   service_id: string;
//   service_name: string;
//   price: number | string;
//   estimated_hours: number | string;
// }

// const AddItems = () => {
//   const { setStep } = useOnboardingStore();
//   const { services, items, setItems, addItem } = useUserStore();

//   const [showModal, setShowModal] = useState(false);
//   const [editIndex, setEditIndex] = useState<number | null>(null);

//   const initialItemValues: Item = {
//     item_name: "",
//     };

//   const validationSchema = Yup.object().shape({
//     item_name: Yup.string().required("Item name is required"),
//     services: Yup.array().of(
//       Yup.object().shape({
//         price: Yup.number().required("Price required"),
//         estimated_hours: Yup.number().required("Estimated time required"),
//       })
//     ),
//   });

//   const handleSubmit = async (
//     values: Item,
//     { resetForm }: FormikHelpers<Item>
//   ) => {
//     try {
//       console.log(values);
//       const response = await apiClient.post("/item-services/create", values);
//       console.log("API response:", response.data);

//       if (response.status === 201 || response.status === 200) {
//         const newItem = response.data.item_services;

//         if (editIndex !== null) {
//           const updated = [...items];
//           updated[editIndex] = newItem;
//           setItems(updated);
//         } else {
//           addItem(newItem);
//         }

//         setShowModal(false);
//         setEditIndex(null);
//         resetForm();
//       }
//     } catch (err) {
//       console.error(err);
//       alert("Failed to save item. Please try again.");
//     }
//   };

//   return (
//     <div className="flex flex-col items-center space-y-4 w-full max-w-lg mx-auto p-4 relative">
//       <h2 className="text-2xl font-brand-bold text-brand text-center">
//         Add your Item Types
//       </h2>
//       <p className="text-gray-600 text-center mt-2">
//         Add the items you deal with below to complete your store setup
//       </p>
//       {/* <Button label="Add a item" onClick={() => setShowModal(true)} /> */}
//       <Button
//         label="Add a item"
//         onClick={() => {
//           setEditIndex(null); // ✅ reset edit mode
//           setShowModal(true);
//         }}
//       />

//       <div className="mt-1 w-full flex flex-col justify-start text-black h-[200px] max-w-[300px] min-w-[300px] overflow-y-auto">
//         {items.map((item, index) => (
//           <div
//             key={index}
//             className="bg-brand-100 p-3 rounded-md mt-2 text-left flex items-center gap-2 w-full"
//             onClick={() => {
//               setEditIndex(index);
//               setShowModal(true);
//             }}
//           >
//             <div className="bg-brand-200 p-3 rounded-full">
//               <FiFileText className="text-quick-action-icon h-6 w-6" />
//             </div>
//             <div className="w-full">
//               <p>{item.item_name}</p>
//               <p className="text-[12px] text-gray-800">
//                 {item.services.map((s) => s.service_name).join(", ")}
//               </p>
//             </div>
//             <div className="float-right">
//               <FaChevronRight className="text-black" />
//             </div>
//           </div>
//         ))}
//       </div>

//       <p className="text-gray-600 text-xs text-center mt-6">
//         Click the “Add a item” button to add the type of items you render in
//         your laundry store
//       </p>

//       <Button
//         label="Next"
//         className={`${items.length === 0 ? "hidden bg-blue-200" : "bg-brand"}`}
//         disabled={items.length === 0}
//         onClick={() => setStep("onboarding complete")}
//       />

//       {showModal && (
//         <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
//           <div className="bg-white p-6 rounded-[25px] shadow-lg w-[380px] max-w-md max-h-[90vh] overflow-y-auto">
//             <h3 className="text-[24px] font-bold text-black mb-4">
//               {editIndex !== null ? "Edit item" : "Add new item"}
//             </h3>

//             <Formik
//               key={editIndex !== null ? `edit-${editIndex}` : "create"}
//               initialValues={{
//                 item_name: editIndex !== null ? items[editIndex].item_name : "",
//                 services: services.map((service) => {
//                   const existing =
//                     editIndex !== null
//                       ? items[editIndex].services.find(
//                           (s) => s.service_id === service.id
//                         )
//                       : null;

//                   return {
//                     service_id: service.id,
//                     service_name: service.name,
//                     price: existing ? existing.price : "",
//                     estimated_hours: existing ? existing.estimated_hours : "",
//                   };
//                 }),
//               }}
//               validationSchema={validationSchema}
//               onSubmit={handleSubmit}
//               enableReinitialize
//             >
//               {({ values }) => (
//                 <Form className="space-y-4">
//                   <InputField
//                     type="text"
//                     placeholder="Item name e.g Trouser, Shirt, Agbada"
//                     name="item_name"
//                   />

//                   <FieldArray name="services">
//                     {() => (
//                       <div className="space-y-3">
//                         {values.services.map((_, index) => (
//                           <div
//                             key={index}
//                             className="bg-gray-100 p-3 rounded-md"
//                           >
//                             <p className="text-sm font-medium mb-2">
//                               {values.services[index].service_name}
//                             </p>
//                             <div className="grid grid-cols-2 gap-2">
//                               <InputField
//                                 name={`services[${index}].price`}
//                                 type="number"
//                                 placeholder="Price"
//                               />
//                               <InputField
//                                 name={`services[${index}].estimated_hours`}
//                                 type="number"
//                                 placeholder="Estimated Hours"
//                               />
//                             </div>
//                           </div>
//                         ))}
//                       </div>
//                     )}
//                   </FieldArray>

//                   <Button
//                     type="submit"
//                     label={editIndex !== null ? "Update item" : "Add item"}
//                   />

//                   {/* <button
//                     type="button"
//                     onClick={() => {
//                       setShowModal(false);
//                       setEditIndex(null);
//                     }}
//                     className="mt-2 text-red-500"
//                   >
//                     Cancel
//                   </button> */}
//                   <button
//                     type="button"
//                     onClick={() => {
//                       setShowModal(false);
//                       setEditIndex(null); // ✅ reset
//                     }}
//                     className="mt-2 text-red-500"
//                   >
//                     Cancel
//                   </button>
//                 </Form>
//               )}
//             </Formik>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default AddItems;

// 3rd attempt
import { useState } from "react";
import { Formik, Form, FieldArray, FormikHelpers } from "formik";
import * as Yup from "yup";
import Button from "../FormComponents/Button";
import InputField from "../FormComponents/InputField";
import { FaChevronRight } from "react-icons/fa";
import { useOnboardingStore, useUserStore } from "../../store/AppStore";
import { FiFileText } from "react-icons/fi";
import apiClient from "../../utils/AxiosInstance";

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
  const { services, items, setItems, addItem } = useUserStore();

  const [showModal, setShowModal] = useState(false);
  const [editIndex, setEditIndex] = useState<number | null>(null);

  const validationSchema = Yup.object().shape({
    item_name: Yup.string().required("Item name is required"),
    services: Yup.array().of(
      Yup.object().shape({
        price: Yup.number().required("Price required"),
        estimated_hours: Yup.number().required("Estimated time required"),
      })
    ),
  });

  const handleSubmit = async (
    values: ItemFormValues,
    { resetForm }: FormikHelpers<ItemFormValues>
  ) => {
    try {
      const payload = {
        item_name: values.item_name,
        services: values.services.map((s) => ({
          service_id: s.service_id,
          service_name: s.service_name,
          price: Number(s.price),
          estimated_hours: Number(s.estimated_hours),
        })),
      };

      const response = await apiClient.post("/item-services/create", payload);

      if (response.status === 201 || response.status === 200) {
        const newItemServices = response.data.item_services;

        if (editIndex !== null) {
          const updated = [...items];
          updated[editIndex] = newItemServices;
          setItems(updated);
        } else {
          addItem(newItemServices);
        }

        setShowModal(false);
        setEditIndex(null);
        resetForm();
      }
    } catch (err) {
      console.error(err);
      alert("Failed to save item. Please try again.");
    }
  };

  return (
    <div className="flex flex-col items-center space-y-4 w-full max-w-lg mx-auto p-4 relative">
      <h2 className="text-2xl font-brand-bold text-brand text-center">
        Add your Item Types
      </h2>
      <p className="text-gray-600 text-center mt-2">
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
            className="bg-brand-100 p-3 rounded-md mt-2 text-left flex items-center gap-2 w-full"
            onClick={() => {
              setEditIndex(index);
              setShowModal(true);
            }}
          >
            <div className="bg-brand-200 p-3 rounded-full">
              <FiFileText className="text-quick-action-icon h-6 w-6" />
            </div>
            <div className="w-full">
              <p>{item[0]?.item_name}</p>
              <p className="text-[12px] text-gray-800">
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
          <div className="bg-white p-6 rounded-[25px] shadow-lg w-[380px] max-w-md max-h-[90vh] overflow-y-auto">
            <h3 className="text-[24px] font-bold text-black mb-4">
              {editIndex !== null ? "Edit item" : "Add new item"}
            </h3>

            <Formik
              key={editIndex !== null ? `edit-${editIndex}` : "create"}
              initialValues={{
                item_name:
                  editIndex !== null ? items[editIndex][0]?.item_name : "",
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
                    price: existing ? existing.price : "",
                    estimated_hours: existing ? existing.estimated_hours : "",
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
                            className="border border-gray-300 p-1 rounded-md flex text-left text-black"
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
                                placeholder="Estimated Hours"
                                className="max-w-[70px]"
                              />
                            </div>
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
