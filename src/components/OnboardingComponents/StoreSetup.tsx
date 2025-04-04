import React, { useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import PlacesAutocomplete from "react-places-autocomplete";
import { useOnboardingStore, useUserStore } from "../../store/AppStore";
import { FaMapMarkerAlt, FaFileAlt } from "react-icons/fa";
import { MdOutlineFileUpload } from "react-icons/md";
import { BiSolidCameraPlus } from "react-icons/bi";
import InputField from "../FormComponents/InputField";
import Button from "../FormComponents/Button";
import apiClient from "../../utils/AxiosInstance";
import { LoadScript } from "@react-google-maps/api";

const GOOGLE_MAPS_API_KEY = "AIzaSyBPIyWllHG8je77s56Pyp69b5mzlghzD9U"; // Will put in .env later

const StoreSetup = () => {
  const { setStep } = useOnboardingStore();
  const { store } = useUserStore();
  const setStore = useUserStore((state) => state.setStore);
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [bannerFiles, setBannerFiles] = useState<(File | null)[]>([null, null]);
  const [storeLocation, setStoreLocation] = useState("");

  const validationSchema = Yup.object({
    // storeLocation: Yup.string().required("Store location is required"),
    storeDescription: Yup.string().required("Store description is required"),
  });

  const handleImageUpload = (
    event: React.ChangeEvent<HTMLInputElement>,
    type: "logo" | "banner",
    index?: number
  ) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      if (type === "logo") {
        setLogoFile(file);
      } else if (type === "banner" && index !== undefined) {
        const newBannerFiles = [...bannerFiles];
        newBannerFiles[index] = file;
        setBannerFiles(newBannerFiles);
      }
    }
  };

  const handleSelect = async (address: string) => {
    setStoreLocation(address);

    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ address }, (results, status) => {
      if (status === "OK" && results[0]) {
        let state = "";
        let country = "";

        results[0].address_components.forEach((component) => {
          if (component.types.includes("administrative_area_level_1")) {
            state = component.long_name;
          }
          if (component.types.includes("country")) {
            country = component.long_name;
          }
        });

        setStore({
          state: state,
          country: country,
        });
      }
    });
  };

  return (
    <LoadScript
      googleMapsApiKey={GOOGLE_MAPS_API_KEY}
      libraries={["places"]} // Ensure 'places' library is loaded
    >
      <div className="flex flex-col items-center space-y-4 w-full max-w-lg mx-auto p-4 pt-0">
        <h2 className="text-[30px] font-brand-bold text-blue-500">
          Setup your store
        </h2>
        <p className="text-gray-500 text-xs text-center">
          Fill in the information below to setup your store
        </p>

        {/* Store Logo Upload */}
        <label className="relative cursor-pointer">
          <input
            type="file"
            className="hidden"
            accept="image/*"
            onChange={(e) => handleImageUpload(e, "logo")}
          />
          <div className="w-24 h-24 flex items-center justify-center bg-blue-100 rounded-full border border-blue-300">
            {logoFile ? (
              <img
                src={URL.createObjectURL(logoFile)}
                alt="Store Logo"
                className="w-full h-full rounded-full object-cover"
              />
            ) : (
              <img
                src="../images/profile-img.png"
                className="w-full h-full rounded-full object-cover"
                alt=""
              />
            )}
          </div>
          <BiSolidCameraPlus className="absolute right-4 bottom-4 text-white" />
        </label>
        <p className="text-sm text-gray-500">Upload your store logo</p>

        {/* Formik Form */}
        <Formik
          initialValues={{
            storeLocation: "",
            storeDescription: "",
          }}
          validationSchema={validationSchema}
          onSubmit={async (values) => {
            try {
              const formData = new FormData();
              formData.append("store_name", store?.name || "");
              formData.append("store_location", storeLocation);
              formData.append("description", values.storeDescription);
              formData.append("state", store?.state || ""); // Add state
              formData.append("country", store?.country || ""); // Add country

              console.log(formData);

              if (logoFile) {
                formData.append("store_images[]", logoFile);
              }

              bannerFiles.forEach((file) => {
                if (file) {
                  formData.append("store_images[]", file);
                }
              });

              const response = await apiClient.post(
                "/profile/update",
                formData,
                {
                  headers: { "Content-Type": "multipart/form-data" },
                }
              );

              console.log("Store Setup Success:", response.data);
              setStore({
                id: response.data["store detaills"].id.toString(),
                name: response.data["store detaills"].store_name,
                description: response.data["store detaills"].description,
                address: response.data["store detaills"].store_location,
                state: response.data["store detaills"].state, // Save state
                country: response.data["store detaills"].country, // Save country
                logoUrl: response.data["store detaills"].store_images[0] || "",
              });
              setStep("add services");
            } catch (error) {
              console.error(
                "Store Setup Error:",
                error.response?.data || error
              );
            }
          }}
        >
          {({ handleChange, isSubmitting }) => (
            <Form className="w-full flex flex-col space-y-4">
              {/* Google Places Autocomplete for Store Location */}
              <PlacesAutocomplete
                value={storeLocation}
                onChange={setStoreLocation}
                onSelect={handleSelect}
              >
                {({ getInputProps, suggestions, getSuggestionItemProps }) => (
                  <div className="relative">
                    <div className="flex justify-start items-center px-3 w-full border border-gray-300 rounded-md text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <FaMapMarkerAlt className="text-gray-500" />
                      <input
                        {...getInputProps({
                          placeholder: "Enter store location",
                          name: "storeLocation",
                          className:
                            "w-full p-2.5 text-gray-600 outline-none focus:ring-0 ",
                        })}
                      />
                    </div>
                    {suggestions.length > 0 && (
                      <ul className="absolute z-10 w-full bg-white border border-gray-200 rounded-md shadow-lg mt-1 text-left">
                        {suggestions.map((suggestion, index) => (
                          <li
                            {...getSuggestionItemProps(suggestion)}
                            key={index}
                            className="p-2 text-gray-700 cursor-pointer hover:bg-gray-100"
                          >
                            {suggestion.description}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                )}
              </PlacesAutocomplete>

              {/* Store Description */}
              <InputField
                name="storeDescription"
                placeholder="Enter store description"
                icon={<FaFileAlt className="text-gray-500" />}
                type="textarea"
                rows={2}
              />

              {/* Store Banners */}
              <div className="flex flex-col">
                <label className="text-md font-semibold text-gray-500 text-left">
                  Upload store banners
                </label>
                <p className="text-xs text-gray-400 text-left mb-2">
                  Add your store banner, discounts and Ads here
                </p>
                <div className="flex justify-between space-x-2">
                  {[0, 1].map((index) => (
                    <label
                      key={index}
                      className="relative cursor-pointer border border-gray-200 rounded-md p-4 w-1/2 h-32 flex items-center justify-center text-black"
                    >
                      <input
                        type="file"
                        className="hidden"
                        accept="image/*"
                        onChange={(e) => handleImageUpload(e, "banner", index)}
                      />
                      {bannerFiles[index] ? (
                        <img
                          src={URL.createObjectURL(bannerFiles[index]!)}
                          alt="Banner"
                          className="w-full h-full object-cover text-black"
                        />
                      ) : (
                        <div className="flex flex-col justify-center items-center">
                          <MdOutlineFileUpload
                            size={35}
                            className="text-gray-500"
                          />
                          <p className="text-xs text-black">
                            Upload Store Image
                          </p>
                          <p className="text-[6px] text-black mt-[2px]">
                            (Recommended Dimensions: 930*1163)
                          </p>
                        </div>
                      )}
                    </label>
                  ))}
                </div>
              </div>

              <Button
                label="Continue"
                type="submit"
                isLoading={isSubmitting}
                disabled={isSubmitting}
              />
            </Form>
          )}
        </Formik>
      </div>
    </LoadScript>
  );
};

export default StoreSetup;
