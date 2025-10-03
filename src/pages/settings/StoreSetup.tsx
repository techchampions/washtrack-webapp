import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import { Form, Formik, FormikHelpers } from "formik";
import PlacesAutocomplete from "react-places-autocomplete";
import { useOnboardingStore } from "@/store/onboarding.store";
import { useAuthStore } from "@/store/auth.store";
import { useGetUserProfile } from "@/hooks/query/useGetUserProfile";
import ImageUploadField from "@/components/FormComponents/ImageInput";
import RoundImageUpload from "@/components/FormComponents/RoundImageInput";
import { Button, InputField } from "@/components/FormComponents";
import { Header, RightSideBar } from "@/components/DashboardComponents";
import { useSettingStoreSetup } from "@/hooks/mutations/useSettingStoreSetup";
import SettingStoreSetupLoading from "@/components/DashboardComponents/LoadingComponents/SettingsStoreSetupLoading";
interface FormValues {
  store_name: string;
  profile_picture: string | File;
  storeLocation: string;
  storeDescription: string;
  store_banner1: string | File;
  store_banner2: string | File;
  store_banner3: string | File;
}
const SettingStoreSetup = () => {
  const { store, setStore } = useOnboardingStore();
  const { user } = useAuthStore();
  const { data: profileData, isLoading: isLoadingProfile } =
    useGetUserProfile();
  const { mutate: updateStore, isPending } = useSettingStoreSetup();
  const [storeLocation, setStoreLocation] = useState("");
  useEffect(() => {
    if (profileData?.user.address) {
      setStoreLocation(profileData.user.address);
    }
  }, [profileData]);
  if (isLoadingProfile) {
    return <SettingStoreSetupLoading />;
  }
  let profileStoreImages: string[] = [];

  try {
    const storeImagesString = profileData?.user.store?.store_images;
    if (
      storeImagesString &&
      typeof storeImagesString === "string" &&
      storeImagesString.trim() !== ""
    ) {
      profileStoreImages = JSON.parse(storeImagesString);
    }
  } catch (error) {
    console.error("Error parsing store images:", error);
    profileStoreImages = [];
  }
  const initialValues: FormValues = {
    store_name: profileData?.user.store_name || "",
    profile_picture: profileData?.user.profile_picture || "",
    storeLocation: profileData?.user.address || "",
    storeDescription: profileData?.user.description || "",
    store_banner1: profileStoreImages[0],
    store_banner2: profileStoreImages[1],
    store_banner3: profileStoreImages[2],
  };
  const validationSchema = Yup.object().shape({
    store_name: Yup.string().required("Store Name is required"),
    storeLocation: Yup.string().required("Store location is required"),
    storeDescription: Yup.string().required("Description is required"),
  });
  console.log("store_banner", profileStoreImages);

  const handleSelect = async (
    address: string,
    setFieldValue: FormikHelpers<FormValues>["setFieldValue"]
  ) => {
    console.log(address, "selected address");
    setStoreLocation(address);
    setFieldValue("storeLocation", address);
    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ address }, (results, status) => {
      if (status === "OK" && results && results[0]) {
        const location = results[0].geometry.location;
        const latitude = location.lat();
        const longitude = location.lng();
        let state = "";
        let country = "";

        results[0].address_components.forEach((component) => {
          if (component.types.includes("administrative_area_level_1")) {
            console.log(
              component.long_name,
              component.short_name,
              " in address setting"
            );
            state = component.long_name;
          }
          if (component.types.includes("country")) {
            console.log(
              component.long_name,
              component.short_name,
              " in address setting"
            );

            country = component.long_name;
          }
        });
        console.log(state, country, " ________in handle select________");
        setStore({
          state: state,
          country: country,
          latitude: latitude,
          logitude: longitude,
        });
      }
    });
  };

  return (
    <div className="">
      <Header />
      <div className="flex flex-col gap-6 md:flex-row">
        <div className="w-full lg:w-2/3">
          <div className="mb-3 text-center">
            <h1 className="mb-1 text-lg font-bold md:text-2xl text-brand md:mb-2">
              Update your store
            </h1>
            <p className="text-xs text-gray-500">
              Fill in the information's below to setup your store
            </p>
          </div>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={async (values) => {
              const formData = new FormData();
              if (user?.store_name !== undefined && user?.store_name !== null) {
                formData.append("store_name", values.store_name);
                console.log(formData, "form data");
              }
              // formData.set("store_name", user?.store_name || "");
              formData.append("store_location", storeLocation);
              if (values.storeDescription) {
                formData.append("description", values.storeDescription);
              }
              if (store?.state && store.country) {
                formData.append("state", store?.state);
                formData.append("country", store?.country);
              }
              if (store?.latitude && store.logitude) {
                formData.append("longitude", String(store.logitude));
                formData.append("latitude", String(store.latitude));
              }
              if (
                values.profile_picture &&
                typeof values.profile_picture !== "string"
              ) {
                formData.append("profile_picture", values.profile_picture);
              }
              if (
                values.store_banner1 &&
                typeof values.store_banner1 !== "string"
              ) {
                formData.append("store_images[]", values.store_banner1);
              }
              if (
                values.store_banner2 &&
                typeof values.store_banner2 !== "string"
              ) {
                formData.append("store_images[]", values.store_banner2);
              }
              if (
                values.store_banner3 &&
                typeof values.store_banner3 !== "string"
              ) {
                formData.append("store_images[]", values.store_banner3);
              }
              // if (logoFile) {
              //   console.log("logo file append", logoFile);
              //   formData.append("store_images[]", logoFile);
              // }
              // console.log(bannerFiles, "______bannerFiles");
              // bannerFiles.forEach((file) => {
              //   console.log("I am here noow banner file append", file);
              //   if (file) {
              //     formData.append("store_images[]", file);
              //   }
              // });

              // for (const [key, value] of formData.entries()) {
              //   console.log("in form data show loop________", key, value);
              // }

              updateStore(formData);
            }}
          >
            {({ isValid, setFieldValue }) => (
              <Form>
                <div className="py-2">
                  <RoundImageUpload
                    name="profile_picture"
                    className="flex justify-center"
                    width={100}
                    height={100}
                  />
                </div>
                <div className="flex flex-col w-full px-3 space-y-3">
                  <div className="">
                    <label className="block text-left text-sm font-medium text-[#090A0A] mb-1">
                      Store Name
                    </label>

                    <InputField
                      name="store_name"
                      placeholder="Enter Store Name"
                      className="!text-black"
                    />
                  </div>
                  <PlacesAutocomplete
                    value={storeLocation}
                    onChange={(value) => {
                      setStoreLocation(value);
                      setFieldValue("storeLocation", value);
                    }}
                    onSelect={(address) => handleSelect(address, setFieldValue)}
                    // onChange={setStoreLocation}
                    // onSelect={handleSelect}
                  >
                    {({
                      getInputProps,
                      suggestions,
                      getSuggestionItemProps,
                    }) => (
                      <div className="relative">
                        <div>
                          <label className="block text-left text-sm  font-medium text-[#090A0A] mb-1">
                            Store Location
                          </label>
                          <input
                            {...getInputProps({
                              name: "storeLocation",
                              placeholder: "Enter your location",
                              className:
                                "text-black w-full px-4 py-3 md:px2 md:py-2 border border-gray-300 rounded-xl focus:ring-1 focus:ring-brand focus:border-transparent outline-none",
                            })}
                          />
                        </div>

                        {suggestions.length > 0 && (
                          <ul className="absolute z-10 w-full mt-1 text-left bg-white border border-gray-200 rounded-md shadow-lg">
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

                  <div>
                    <label className="block text-left text-sm font-medium text-[#090A0A] mb-1">
                      Store Description
                    </label>

                    <InputField
                      name="storeDescription"
                      placeholder="Enter Store Description"
                      type="textarea"
                      className="!text-black"
                    />
                  </div>

                  <div className="">
                    <div className="block text-left text-sm font-medium text-[#090A0A] mb-2">
                      Upload store banner
                    </div>
                    <p className="mb-3 text-xs text-left text-gray-500 md:hidden">
                      Add your store banner
                    </p>
                    <div className="flex gap-4 overflow-x-scroll scrollbar-hide md:grid md:grid-cols-3">
                      <ImageUploadField
                        name="store_banner1"
                        height={100}
                        width={200}
                      />
                      <ImageUploadField
                        name="store_banner2"
                        height={100}
                        width={200}
                      />
                      <ImageUploadField
                        name="store_banner3"
                        height={100}
                        width={200}
                      />
                    </div>
                  </div>
                </div>

                <Button
                  label="Submit"
                  type="submit"
                  className="mt-5 !w-fit px-10"
                  isLoading={isPending}
                  disabled={isPending || !isValid}
                />
              </Form>
            )}
          </Formik>
        </div>
        <RightSideBar />
      </div>
    </div>
  );
};

export default SettingStoreSetup;
