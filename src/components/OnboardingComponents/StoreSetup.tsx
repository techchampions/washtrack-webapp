import React, { useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useOnboardingStore } from "../../store/AppStore";
import { FaMapMarkerAlt, FaFileAlt } from "react-icons/fa"; // Icons for inputs
import { MdOutlineFileUpload } from "react-icons/md";
import InputField from "../FormComponents/InputField";

const StoreSetup = () => {
  const { setStep } = useOnboardingStore();
  const [logo, setLogo] = useState<string | null>(null);
  const [banners, setBanners] = useState<(string | null)[]>([null, null]);

  const validationSchema = Yup.object({
    storeLocation: Yup.string().required("Store location is required"),
    storeDescription: Yup.string().required("Store description is required"),
  });

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>, type: "logo" | "banner", index?: number) => {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = () => {
        if (type === "logo") {
          setLogo(reader.result as string);
        } else if (type === "banner" && index !== undefined) {
          const newBanners = [...banners];
          newBanners[index] = reader.result as string;
          setBanners(newBanners);
        }
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  };

  return (
    <div className="flex flex-col items-center space-y-4 w-full max-w-lg mx-auto p-4">
      <h2 className="text-xl font-bold text-blue-500">Setup your store</h2>
      <p className="text-gray-500 text-center">Fill in the information below to setup your store</p>

      {/* Store Logo Upload */}
      <label className="relative cursor-pointer">
        <input type="file" className="hidden" accept="image/*" onChange={(e) => handleImageUpload(e, "logo")} />
        <div className="w-24 h-24 flex items-center justify-center bg-blue-100 rounded-full border border-blue-300">
          {logo ? <img src={logo} alt="Store Logo" className="w-full h-full rounded-full object-cover" /> : "📷"}
        </div>
      </label>
      <p className="text-sm text-gray-500">Upload your store logo</p>

      {/* Formik Form */}
      <Formik
        initialValues={{ storeLocation: "", storeDescription: "" }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log("Store Data:", values);
          setStep("Get Started"); // Redirect user after setup
        }}
      >
        {({ handleSubmit }) => (
          <Form className="w-full flex flex-col space-y-4">
            {/* Store Location */}
            <InputField
              name="storeLocation"
              placeholder="Enter your location"
              icon={<FaMapMarkerAlt className="text-gray-500" />}
            />

            {/* Store Description */}
            <InputField
              name="storeDescription"
              placeholder="Enter store description"
              icon={<FaFileAlt className="text-gray-500" />}
            />

            {/* Store Banners */}
            <div className="flex justify-between space-x-2">
              {[0, 1].map((index) => (
                <label key={index} className="relative cursor-pointer border border-gray-500 rounded-md p-4 w-1/2 h-32 flex items-center justify-center text-black">
                  <input type="file" className="hidden" accept="image/*" onChange={(e) => handleImageUpload(e, "banner", index)} />

                  {banners[index] ? 
                //   <img src="./images/" alt="Banner" className="w-full h-full object-cover text-black" /> 
                <MdOutlineFileUpload/>
                  : "📷 Upload"}
                </label>
              ))}
            </div>

            {/* Submit Button */}
            <button type="submit" className="w-full bg-blue-500 text-white py-2 font-medium rounded mt-4">
              Next
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default StoreSetup;
