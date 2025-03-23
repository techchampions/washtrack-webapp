import { useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import Button from "../FormComponents/Button";
import InputField from "../FormComponents/InputField";
import { FaRegTrashCan } from "react-icons/fa6";
import { FaEdit } from "react-icons/fa";

const AddServices = () => {
  const [services, setServices] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editIndex, setEditIndex] = useState(null); // Track the index of the service being edited

  const validationSchema = Yup.object().shape({
    serviceName: Yup.string().required("Service name is required"),
    price: Yup.number().required("Price is required"),
    hours: Yup.number().required("Estimated hours are required"),
  });

  const handleSubmit = (values, { resetForm }) => {
    if (editIndex !== null) {
      // Editing an existing service
      const updatedServices = [...services];
      updatedServices[editIndex] = values;
      setServices(updatedServices);
      setEditIndex(null);
    } else {
      // Adding a new service
      setServices([...services, values]);
    }

    setShowModal(false);
    resetForm();
  };

  const handleDelete = (index) => {
    setServices(services.filter((_, i) => i !== index));
  };

  const handleEdit = (index) => {
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

      {/* Services Table */}
      {services.length > 0 && (
        <div className="w-full max-w-2xl mt-6 overflow-x-auto">
          <table className="w-full border-collapse bg-white space-y-4">
            <thead className="bg-gray-100 rounded-full">
              <tr className="text-left text-gray-600 rounded-full">
                <th className="rounded-s-lg px-4 py-2">Services</th>
                <th className="px-4 py-2">Price</th>
                <th className="px-4 py-2">Est. Hours</th>
                <th className="rounded-e-lg px-4 py-2 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {services.map((service, index) => (
                <tr
                  key={index}
                  className="text-gray-700 odd:bg-white even:bg-gray-50 hover:bg-blue-50 overflow-x-hidden">
                  <td className="rounded-s-lg px-4 py-3">
                    {service.serviceName}
                  </td>
                  <td className="px-4 py-3">
                    ₦{service.price.toLocaleString()}
                  </td>
                  <td className="px-4 py-3">{service.hours} hours</td>
                  <td className="rounded-e-lg px-4 py-3 flex justify-center space-x-2">
                    {/* Edit Button */}
                    <FaEdit
                      className="text-blue-500 hover:text-blue-700 cursor-pointer"
                      onClick={() => handleEdit(index)}
                    />
                    {/* Delete Button */}
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

      <p className="text-gray-600 text-center mt-6">
        Click the “Add a service” button to add the type of services you render
        in your laundry store
      </p>

      <Button
        label="Next"
        className={`${services.length === 0 ? "bg-blue-200" : "bg-brand"}`}
        disabled={services.length === 0}
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
                  ? services[editIndex] // Prefill the form with the service being edited
                  : { serviceName: "", price: "", hours: "" }
              }
              validationSchema={validationSchema}
              onSubmit={handleSubmit}>
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
