import React, { useEffect, useState } from "react";
import { Button } from "../common/Button";
import * as Yup from "yup";
import landingBannerImage from "@/assets/images/landing-banner-image.png";
import { Form, Formik, FormikHelpers } from "formik";
import PlacesAutocomplete from "react-places-autocomplete";
import { useOnboardingStore } from "@/store/onboarding.store";
import { useAuthStore } from "@/store/auth.store";
// import { useCreateStore } from "@/hooks/auth/useOnboarding";
// import { FormField } from "../forms/FormField";
import { useGetUserProfile } from "@/hooks/query/useGetUserProfile";
import Loader from "@/components/GeneralComponents/Loader";
import { useSoosarCreateStore } from "@/hooks/auth/useOnboarding";
import ImageUploadField from "@/components/FormComponents/ImageInput";
import RoundImageUpload from "@/components/FormComponents/RoundImageInput";
import { InputField } from "@/components/FormComponents";

// const GOOGLE_MAPS_API_KEY = "AIzaSyBPIyWllHG8je77s56Pyp69b5mzlghzD9U";

// const LIBRARIES: Libraries = ["places"];
const StoreProfileSetup = () => {
  // const [logoFile, setLogoFile] = useState<File | null>(null);
  // const [bannerFiles, setBannerFiles] = useState<(File | null)[]>([
  //   null,
  //   null,
  //   null,
  // ]);
  const { store, setStore } = useOnboardingStore();
  const { user } = useAuthStore();
  const { data: profileData, isLoading: isLoadingProfile } =
    useGetUserProfile();
  const { mutate: soosarCreateStore, isPending } = useSoosarCreateStore();
  const [storeLocation, setStoreLocation] = useState("");
  // const { isPending, mutateAsync: createEstoreAsync, data } = useCreateStore();
  useEffect(() => {
    if (profileData?.user.address) {
      setStoreLocation(profileData.user.address);
    }
  }, [profileData]);
  if (isLoadingProfile) {
    return <Loader />;
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
  interface FormValues {
    profile_picture: string;
    storeLocation: string;
    storeDescription: string;
    store_banner1: string;
    store_banner2: string;
    store_banner3: string;
  }
  const initialValues = {
    profile_picture: profileData?.user.profile_picture || "",
    storeLocation: profileData?.user.address,
    storeDescription: profileData?.user.description,
    store_banner1: profileStoreImages[0],
    store_banner2: profileStoreImages[1],
    store_banner3: profileStoreImages[2],
  };
  const validationSchema = Yup.object().shape({
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
    <div
      className="flex items-center justify-center min-h-screen overflow-hidden bg-center bg-cover min-w-screen md:min-h-0"
      style={{ backgroundImage: `url(${landingBannerImage})` }}
    >
      <div className="flex items-center justify-center min-h-0 overflow-hidden">
        <div className="bg-white  rounded-2xl max-w-md md:max-w-2xl sm:h-auto md:h-[90vh] lg:h-[100%] md:rounded-3xl p-3 sm:p-3 md:p-5 lg:px-12 shadow-xl overflow-x-hidden scrollbar-hide">
          <div className="flex items-center justify-center h-0 p-0 mt-2 mb-7 ">
            <img
              src="/images/logo(black).png"
              alt="Wash Track"
              className="w-25 h-25"
            />
            <div className="ml-5" />
          </div>

          <div className="mb-3 text-left">
            <h1 className="mb-1 text-lg font-bold md:text-2xl text-brand md:mb-2">
              Setup your store
            </h1>
            <p className="text-xs text-gray-500">
              Fill in the information's below to setup your store
            </p>
          </div>
          {/* <div className="mb-0">
            <label className="relative flex items-center justify-center mx-auto mb-2 cursor-pointer">
              <input
                type="file"
                className="absolute hidden h-20 border border-red-500"
                accept="image/*"
                onChange={(e) => handleImageUpload(e, "logo")}
              />
              <div className="relative flex items-center justify-center w-18 h-18">
                {logoFile ? (
                  <img
                    src={URL.createObjectURL(logoFile)}
                    alt="Store Logo"
                    className="object-cover w-full h-full rounded-full"
                  />
                ) : (
                  <img
                    src="../images/profile-img.png"
                    className="object-cover w-full h-full rounded-full"
                    alt=""
                  />
                )}
                <BiSolidCameraPlus className="absolute w-5 h-5 text-white right-1 bottom-1" />
              </div>
            </label>
            <p className="text-sm text-center text-dark">
              Upload your store logo
            </p>
          </div> */}
          {/* <div className="mb-0">
              <label className="relative flex items-center justify-center mx-auto mb-2 cursor-pointer">
                <input
                  type="file"
                  className="absolute hidden h-20 border border-red-500"
                  accept="image/*"
                  onChange={(e) => handleImageUpload(e, "logo")}
                />
                <div className="relative flex items-center justify-center w-18 h-18">
                  {logoFile || profileStoreImages.length > 0 ? (
                    <img
                      src={getLogoImageSource()}
                      alt="Store Logo"
                      className="object-cover w-full h-full rounded-full"
                    />
                  ) : (
                    <img
                      src="../images/profile-img.png"
                      className="object-cover w-full h-full rounded-full"
                      alt=""
                    />
                  )}
                  <BiSolidCameraPlus className="absolute w-5 h-5 text-white right-1 bottom-1" />
                </div>
              </label>
              <p className="text-sm text-center text-dark">
                Upload your store logo
              </p>
            </div> */}
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={async (values) => {
              console.log("Submit it, I am here now");
              const formData = new FormData();
              // console.log(formData, "_______form data")
              // console.log(storeLocation, user?.store_name, values.storeDescription, store?.country, store?.state, "______store name")

              if (user?.store_name !== undefined && user?.store_name !== null) {
                formData.append("store_name", user?.store_name);
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

              soosarCreateStore(formData);
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
                <div className="space-y-3  flex flex-col px-3 w-full md:w-[60vw] lg:w-[30vw] lg:max-w-lg">
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
                    {/* <div className="flex pb-2 space-x-2 overflow-x-auto scrollbar-hide">
                      {[0, 1, 2].map((index) => {
                        const imageSrc = getBannerImageSource(index);
                        return (
                          <label
                            key={index}
                            className="min-w-[45%] max-w-[45%] md:max-h-[80px] flex-shrink-0 relative cursor-pointer border border-gray-200 rounded-md p-4 h-32 flex items-center justify-center text-black"
                          >
                            <input
                              type="file"
                              className="hidden"
                              accept="image/*"
                              onChange={(e) =>
                                handleImageUpload(e, "banner", index)
                              }
                            />
                            {imageSrc ? (
                              <img
                                src={imageSrc}
                                alt={`Banner ${index + 1}`}
                                className="object-cover w-full h-full text-black"
                              />
                            ) : (
                              <div className="flex flex-col items-center justify-center">
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
                        );
                      })}
                    </div> */}
                    <div className="flex space-x-2 overflow-x-auto scrollbar-hide">
                      <ImageUploadField
                        name="store_banner1"
                        height={100}
                        width={240}
                      />
                      <ImageUploadField
                        name="store_banner2"
                        height={100}
                        width={240}
                      />
                      <ImageUploadField
                        name="store_banner3"
                        height={100}
                        width={240}
                      />
                    </div>
                  </div>
                </div>

                <Button
                  style={{ borderRadius: "40px" }}
                  type="submit"
                  className="w-5/6 mt-6 mb-1 md:w-8/9"
                  size="md"
                  loading={isPending}
                  disabled={isPending || !isValid}
                >
                  Continue
                </Button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default StoreProfileSetup;
