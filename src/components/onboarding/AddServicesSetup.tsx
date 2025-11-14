/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import landingBannerImage from "@/assets/images/landing-banner-image.png";
// import { FormField } from "../forms/FormField";
import { Form, Formik } from "formik";
// import { Button } from "../common/Button";
import * as Yup from "yup";
import { FaEdit } from "react-icons/fa";
import { useOnboardingStore } from "@/store/onboarding.store";
import { useNavigate } from "react-router-dom";
import { X } from "lucide-react";
import { Button, InputField } from "@/components/FormComponents";

const ServicesList = ({
  handleEdit,
  handleDelete,
  name,
  price,
  estimated_hours,
  index,
  id,
}: any) => {
  return (
    <div className="relative mt-3">
      <div className="grid grid-cols-4 text-sm min-w-0 bg-[#EBF7FC] border-none rounder-lg gap-4 items-center py-2 px-2 border-b border-gray-100">
        <div className="text-[#232323] line-clamp-1">{name}</div>
        <div className="text-[#232323]"> ₦{price?.toLocaleString()} </div>
        <div className="text-[#232323]"> {estimated_hours} hours </div>
        <div className="flex items-center justify-end space-x-3 border-none w-18">
          <button
            className="text-brand hover:text-brand-dark"
            onClick={() => handleEdit(index)}
          >
            <FaEdit className="w-6 h-6 text-blue-500 cursor-pointer hover:text-blue-700" />
          </button>
          <button
            className="text-red-500 hover:text-red-700"
            onClick={() => handleDelete(id)}
          >
            <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 20 20">
              <path
                fill-rule="evenodd"
                d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

const AddServicesSetup = ({
  handleSubmit,
  services,
  editIndex,
  showForm,
  toggleFormDisplay,
  handleEdit,
  handleDelete,
  loading,
}: any) => {
  const { setStep } = useOnboardingStore();
  const navigate = useNavigate();

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Service name is required"),
    price: Yup.number()
      .typeError("Price must be a number")
      .required("Price is required"),
    estimated_hours: Yup.number()
      .typeError("Estimated hours must be a number")
      .required("Estimated hours are required"),
  });

  return (
    <div
      className="flex items-center justify-center min-h-screen overflow-hidden bg-center bg-cover min-w-screen md:min-h-0"
      style={{ backgroundImage: `url(${landingBannerImage})` }}
    >
      <div className="bg-white  relative  rounded-3xl overflow-hidden  shadow-lg p-8 max-w-md md:max-w-lg  w-[90%] text-center">
        <div className="flex items-center justify-center h-0 p-0 mt-2 mb-7 ">
          <img
            src="/images/logo(black).png"
            alt="Wash Track"
            className="w-25 h-25"
          />
          <div className="ml-5" />
        </div>

        <h2 className="text-[#00BCFF] text-3xl font-bold text-left">
          Add your services
        </h2>
        <p className="mt-2 text-sm text-left text-gray-500">
          Add the services you render below to complete your store setup
        </p>

        <button
          onClick={toggleFormDisplay}
          className="mt-6 w-full rounded-full bg-[#00BCFF] py-3 text-white font-medium hover:bg-[#00A8E4] transition"
        >
          Add a service
        </button>

        <div className=" min-h-[35vh] ">
          {services?.length > 0 && (
            <>
              <div className="grid grid-cols-4 mt-8  bg-[#F8F8F8] py-2 rounded-xl  gap-4 text-sm font-bold tex-lg mb-4 px-2">
                <div className="text-lg text-[#232323] ">Services</div>
                <div className="text-lg text-[#232323] ">Price</div>
                <div className="text-lg text-[#232323] ">Est. Hours</div>
                <div className="text-lg text-[#232323] ">Actions</div>
              </div>
              <div className="max-h-[200px] overflow-y-scroll scrollbar-hide">
                {services.map((service: any, index: any) => (
                  <ServicesList
                    handleDelete={handleDelete}
                    handleEdit={handleEdit}
                    index={index}
                    name={service.name}
                    price={service.price}
                    estimated_hours={service.estimated_hours}
                    id={service.id}
                  />
                ))}
              </div>
            </>
          )}
        </div>

        {/* Info */}
        <p className="mt-6 text-xs text-gray-400">
          Click the “Add a service” button to add the type of services you
          render in your laundry store
        </p>

        <button
          disabled={services?.length === 0}
          onClick={() => {
            setStep("ADD_ITEMS");
            navigate("/onboarding/add-items-setup");
          }}
          className={`${
            services?.length === 0
              ? " bg-[#00BCFF]/30  cursor-not-allowed"
              : "bg-brand cursor-pointer"
          } mt-4 w-full rounded-full py-3 text-white font-medium`}
        >
          Next
        </button>

        {showForm && (
          <div
            className="absolute inset-0 bg-black/40"
            onClick={toggleFormDisplay}
          ></div>
        )}

        {showForm && (
          <div
            className={`bg-white z-10 ${
              showForm ? "block" : "hidden"
            }  absolute inset-0  rounded-tl-4xl rounded-tr-4xl  top-50 max-w-md md:max-w-lg  w-[100%] h-[70%]`}
          >
            <div className="flex-col flex-1">
              <div className="flex items-center justify-between">
                <h3 className="text-[#3F3F3F] px-5 py-4 font-bold text-3xl  text-left  leading-tight">
                  Add new services{" "}
                </h3>
                <div className="px-4">
                  <X
                    onClick={toggleFormDisplay}
                    className="cursor-pointer text-gray-500 hover:text-black"
                  />
                </div>
              </div>

              <div>
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
                  {({ isValid }) => (
                    <Form className="space-y-6  h-[100vh]">
                      <div className="px-4 mb-2 space-y-5 w-full">
                        <InputField
                          name="name"
                          type="text"
                          // style={{ boxShadow: "none" }}
                          placeholder="Service name e.g iron"
                          className="text-[#090A0A] shadow-none placeholder:text-gray-400  bg-white border border-gray-300  text-lg placeholder:text-lg  font-medium  rounded-lg block w-full px-2.5   outline-none resize-none"
                        />
                        <InputField
                          type="number"
                          name="price"
                          placeholder="Enter price"
                          // style={{ boxShadow: "none" }}
                          className="text-[#090A0A] shadow-none placeholder:text-gray-400   bg-white border border-gray-300  text-lg  placeholder:text-lg  rounded-lg block w-full px-2.5   outline-none resize-none"
                        />
                        <InputField
                          type="text"
                          name="estimated_hours"
                          placeholder="Estimated hours"
                          // style={{ boxShadow: "none" }}
                          className=" bg-white border text-[#090A0A] shadow-none placeholder:text-gray-400   border-gray-300  text-lg  placeholder:text-lg  rounded-lg block w-full px-2.5   outline-none resize-none"
                        />
                      </div>

                      <div className=" px-7 pb-3 flex flex-col  h-[200px] justify-center  items-center">
                        {/* <Button
                          style={{ borderRadius: "40px" }}
                          type="submit"
                          disabled={isSubmiting}
                          loading={isSubmiting}
                          loadingText="Saving"
                          className="w-full p-0 m-0"
                          size="lg"
                        >
                          {`${
                            editIndex !== null
                              ? "Update service"
                              : "Add service"
                          }`}
                        </Button> */}
                        <Button
                          disabled={loading || !isValid}
                          loadingText="Saving"
                          isLoading={loading}
                          type="submit"
                          label={`${
                            editIndex !== null
                              ? "Update service"
                              : "Add service"
                          }`}
                        />
                      </div>
                    </Form>
                  )}
                </Formik>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddServicesSetup;
