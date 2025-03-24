import { useState } from "react";
import { Formik, Form, FormikHelpers } from "formik";
import * as Yup from "yup";
import Button from "../FormComponents/Button";
import InputField from "../FormComponents/InputField";
import { FaRegTrashCan } from "react-icons/fa6";
import { FaEdit } from "react-icons/fa";
import { useOnboardingStore } from "../../store/AppStore";

// Define TypeScript type for a service
interface Service {
  serviceName: string;
  price: number;
  hours: number;
}

const AddServices = () => {
  const { setStep } = useOnboardingStore();
  const [services, setServices] = useState<Service[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editIndex, setEditIndex] = useState<number | null>(null);

  const validationSchema = Yup.object().shape({
    serviceName: Yup.string().required("Service name is required"),
    price: Yup.number()
      .typeError("Price must be a number")
      .required("Price is required"),
    hours: Yup.number()
      .typeError("Estimated hours must be a number")
      .required("Estimated hours are required"),
  });

  const handleSubmit = (
    values: Service,
    { resetForm }: FormikHelpers<Service>
  ) => {
    if (editIndex !== null) {
      // Update existing service
      const updatedServices = [...services];
      updatedServices[editIndex] = values;
      setServices(updatedServices);
      setEditIndex(null);
    } else {
      // Add new service
      setServices([...services, values]);
    }

    setShowModal(false);
    resetForm();
  };

  const handleDelete = (index: number) => {
    setServices(services.filter((_, i) => i !== index));
  };

  const handleEdit = (index: number) => {
    setEditIndex(index);
    setShowModal(true);
  };

  return (
    <div className="flex flex-col items-center space-y-4 w-full max-w-lg mx-auto p-4 relative">
      <h2 className="text-2xl font-bold text-brand text-center">
        Add your services
      </h2>
      <p className="text-gray-600 text-center mt-2">
        Add the services you render below to complete your store setup
      </p>
      <Button label="Add a service" onClick={() => setShowModal(true)} />

      {services.length > 0 && (
        <div className="w-full max-w-2xl mt-6 overflow-x-hidden max-h-[300px] overflow-y-auto">
          <table className="w-full border-collapse bg-white">
            <thead className="bg-gray-100">
              <tr className="text-left text-gray-600 font-bold text-[12px]">
                <th className="px-4 py-3 rounded-s-lg">Service</th>
                <th className="px-4 py-3">Price</th>
                <th className="px-4 py-3">Est. Hours</th>
                <th className="px-4 py-3 rounded-e-lg text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {services.map((service, index) => (
                <tr
                  key={index}
                  className="text-gray-700 odd:bg-white even:bg-gray-50 hover:bg-blue-50 text-[12px]">
                  <td className="px-4 py-3">{service.serviceName}</td>
                  <td className="px-4 py-3">
                    ₦{service.price.toLocaleString()}
                  </td>
                  <td className="px-4 py-3">{service.hours} hours</td>
                  <td className="px-4 py-3 flex justify-center space-x-2">
                    <FaEdit
                      className="text-blue-500 hover:text-blue-700 cursor-pointer"
                      onClick={() => handleEdit(index)}
                    />
                    <FaRegTrashCan
                      className="text-red-500 hover:text-red-700 cursor-pointer"
                      onClick={() => handleDelete(index)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <p
        className={`${
          services.length === 0
            ? "hidden"
            : "text-gray-600 text-center text-[10px] mt-6"
        }`}>
        Click the “Add a service” button to add the type of services you render
        in your laundry store
      </p>

      <Button
        label="Next"
        className={`${
          services.length === 0 ? "hidden bg-blue-200" : "bg-brand"
        }`}
        disabled={services.length === 0}
        onClick={() => setStep("add items")}
      />

      {showModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h3 className="text-[30px] text-left text-black font-bold mb-4">
              {editIndex !== null ? "Edit service" : "Add new service"}
            </h3>

            <Formik
              initialValues={
                editIndex !== null
                  ? services[editIndex]
                  : { serviceName: "", price: 0, hours: 0 }
              }
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
              enableReinitialize>
              {() => (
                <Form>
                  <InputField
                    type="text"
                    placeholder="Service name e.g wash, starch, iron"
                    name="serviceName"
                  />
                  <InputField
                    type="number"
                    placeholder="Enter your designated price"
                    name="price"
                  />
                  <InputField
                    type="number"
                    placeholder="Estimated Hours"
                    name="hours"
                  />

                  <Button
                    type="submit"
                    label={
                      editIndex !== null ? "Update service" : "Add service"
                    }
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setShowModal(false);
                      setEditIndex(null);
                    }}
                    className="mt-2 text-red-500">
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
