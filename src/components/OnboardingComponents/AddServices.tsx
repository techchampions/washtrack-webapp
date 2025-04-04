import { useState } from "react";
import { Formik, Form, FormikHelpers } from "formik";
import * as Yup from "yup";
import Button from "../FormComponents/Button";
import InputField from "../FormComponents/InputField";
import { FaRegTrashCan } from "react-icons/fa6";
import { FaEdit } from "react-icons/fa";
import { useOnboardingStore, useUserStore } from "../../store/AppStore";
import apiClient from "../../utils/AxiosInstance";
import Toast from "../GeneralComponents/Toast";

// Define TypeScript type for a service
interface Service {
  name: string;
  price: number | string;
  estimated_hours: number | string;
  service_type: number | string;
  id: string;
}

const AddServices = () => {
  const { setStep } = useOnboardingStore();
  const { addService, services, setServices } = useUserStore();
  // const [services, setServices] = useState<Service[]>([]);
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

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Service name is required"),
    price: Yup.number()
      .typeError("Price must be a number")
      .required("Price is required"),
    estimated_hours: Yup.number()
      .typeError("Estimated hours must be a number")
      .required("Estimated hours are required"),
  });

  const handleSubmit = async (
    values: Service,
    { resetForm }: FormikHelpers<Service>
  ) => {
    try {
      // Base payload without id
      const payload: any = {
        name: values.name,
        price: values.price,
        estimated_hours: values.estimated_hours,
        service_type: 1,
      };

      let response;

      if (editIndex !== null) {
        // Include ID when updating
        payload.id = services[editIndex].id;
        response = await apiClient.post(`/upate/service`, payload);
      } else {
        // Create new service
        response = await apiClient.post("/create/service", payload);
      }

      if (response.status === 201 || response.status === 200) {
        const newService = response.data.service;

        if (editIndex !== null) {
          const updatedServices = [...services];
          updatedServices[editIndex] = newService;
          setServices(updatedServices);
          setToastMsg("Service updated successfully");
          setToastType("success");
          setShowToast(true);
        } else {
          addService(newService);
          showToastMessage("Service created successfully", "success");
        }

        setShowModal(false);
        resetForm();
        setEditIndex(null);
      }
    } catch (error: any) {
      const errorMessage =
        error?.response?.data?.message || "Error saving service... try again";
      showToastMessage(errorMessage, "error");

      console.error("Error saving service:", error);
    }
  };

  const handleEdit = (index: number) => {
    setEditIndex(index);
    setShowModal(true);
  };

  const handleDelete = async (id: string) => {
    try {
      await apiClient.post(`/delete/service`, { id });
      const updatedServices = services.filter((service) => service.id !== id);
      setServices(updatedServices);
    } catch (error) {
      console.error("Error deleting service:", error);
    }
  };

  return (
    <div className="flex flex-col justify-between h-full w-full max-w-lg mx-auto p-4 relative">
      <div className="flex flex-col items-center space-y-4">
        <h2 className="text-2xl font-brand-bold text-brand text-center">
          Add your services
        </h2>
        <p className="text-gray-600 text-center mt-2 text-xs">
          Add the services you render below to complete your store setup
        </p>
        <Button label="Add a service" onClick={() => setShowModal(true)} />

        {services.length > 0 && (
          <div className="w-full max-w-2xl mt-6 overflow-x-hidden h-[300px] min-h-[300px] max-h-[300px] overflow-y-auto">
            <table className="w-full border-collapse border-spacing-y-4 bg-white">
              <thead className="bg-gray-100">
                <tr className="text-left text-gray-600 font-bold text-[12px]">
                  <th className="px-4 py-3 rounded-s-lg">Service</th>
                  <th className="px-4 py-3">Price</th>
                  <th className="px-4 py-3">Est. Hours</th>
                  <th className="px-4 py-3 rounded-e-lg text-center">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {services.map((service, index) => (
                  <tr
                    key={index}
                    className="text-gray-700 rounded-lg odd:bg-white even:border even:border-gray-100 hover:bg-blue-50 text-[12px]"
                  >
                    <td className="px-4 py-3 rounded-s-lg">{service.name}</td>
                    <td className="px-4 py-3">
                      ₦{service.price?.toLocaleString()}
                    </td>
                    <td className="px-4 py-3">
                      {service.estimated_hours} hours
                    </td>
                    <td className="px-4 py-3 flex justify-center space-x-2">
                      <FaEdit
                        className="text-blue-500 hover:text-blue-700 cursor-pointer"
                        onClick={() => handleEdit(index)}
                      />
                      <FaRegTrashCan
                        className="text-red-500 hover:text-red-700 cursor-pointer"
                        // onClick={() => handleDelete(index)}
                        onClick={() => handleDelete(service.id)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <div className="flex flex-col gap-0.5">
        <p
          className={`${
            services.length === 0
              ? "hidden"
              : "text-gray-600 text-center text-[10px] mt-6"
          }`}
        >
          Click the “Add a service” button to add the type of services you
          render in your laundry store
        </p>

        <Button
          label="Next"
          className={`${
            services.length === 0 ? "hidden bg-blue-200" : "bg-brand"
          }`}
          disabled={services.length === 0}
          onClick={() => setStep("add items")}
        />
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          {showToast && (
            <Toast
              message={toastMsg}
              type={toastType}
              onClose={() => setShowToast(false)}
            />
          )}

          <div className="bg-white p-6 rounded-[25px] shadow-lg max-w-md w-[380px]">
            <h3 className="text-[30px] text-left text-black font-bold mb-4">
              {editIndex !== null ? "Edit service" : "Add new service"}
            </h3>

            <Formik
              initialValues={
                editIndex !== null
                  ? services[editIndex]
                  : { name: "", price: "", estimated_hours: "" }
              }
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
              enableReinitialize
            >
              {({ isSubmitting }) => (
                <Form className="space-y-2">
                  <InputField
                    type="text"
                    placeholder="Service name e.g wash, starch, iron"
                    name="name"
                  />
                  <InputField
                    type="number"
                    placeholder="Enter your designated price"
                    name="price"
                  />
                  <InputField
                    type="number"
                    placeholder="Estimated Hours"
                    name="estimated_hours"
                  />

                  <Button
                    type="submit"
                    label={
                      editIndex !== null ? "Update service" : "Add service"
                    }
                    disabled={isSubmitting}
                    isLoading={isSubmitting}
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

export default AddServices;
