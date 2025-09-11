import React, { useEffect, useState } from "react";
import { Button } from "../common/Button";
import * as Yup from "yup";
import landingBannerImage from "@/assets/images/landing-banner-image.png";
import { LoadScript } from "@react-google-maps/api";
import { BiSolidCameraPlus } from "react-icons/bi";
import { MdOutlineFileUpload } from "react-icons/md";
import { Form, Formik } from "formik";
import PlacesAutocomplete from "react-places-autocomplete";
import { useOnboardingStore } from "@/store/onboarding.store";
import { useAuthStore } from "@/store/auth.store";
// import { useCreateStore } from "@/hooks/auth/useOnboarding";
import { FormField } from "../forms/FormField";
import { useGetUserProfile } from "@/hooks/query/useGetUserProfile";
import Loader from "@/components/GeneralComponents/Loader";
import { useSoosarCreateStore } from "@/hooks/auth/useOnboarding";

const GOOGLE_MAPS_API_KEY = "AIzaSyBPIyWllHG8je77s56Pyp69b5mzlghzD9U";

const StoreProfileSetup = () => {
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [bannerFiles, setBannerFiles] = useState<(File | null)[]>([
    null,
    null,
    null,
  ]);
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
  const profileStoreImages = profileData?.user.store?.store_images ?? [];
  const initialValues = {
    storeLocation: profileData?.user.address,
    storeDescription: profileData?.user.description,
  };
  const validationSchema = Yup.object().shape({
    storeLocation: Yup.string().required("Store location is required"),
    storeDescription: Yup.string().required("Description is required"),
  });

  const handleImageUpload = (
    event: React.ChangeEvent<HTMLInputElement>,
    type: "logo" | "banner",
    index?: number
  ) => {
    console.log(event.target.files, "-----files-------");
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

  const handleSelect = async (address: string, setFieldValue: any) => {
    console.log(address, "selected address");
    setStoreLocation(address);
    setFieldValue("storeLocation", address);
    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ address }, (results, status) => {
      if (status === "OK" && results[0]) {
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
  // Function to get image source for each banner slot
  const getBannerImageSource = (index: number) => {
    // If user uploaded a new file, show that
    if (bannerFiles[index]) {
      return URL.createObjectURL(bannerFiles[index]!);
    }
    // If no new file but there's an existing image at this index, show it
    if (profileStoreImages[index]) {
      return profileStoreImages[index];
    }
    // Otherwise return null to show upload placeholder
    return null;
  };

  // Function to get logo image source
  const getLogoImageSource = () => {
    if (logoFile) {
      return URL.createObjectURL(logoFile);
    }
    // Check if there's a logo in profile store images (you might need to adjust this logic)
    // Often the first image is the logo, or you might need to identify it differently
    if (profileStoreImages.length > 0) {
      return profileStoreImages[0]; // Assuming first image is logo
    }
    return "../images/profile-img.png";
  };

  return (
    <LoadScript
      loadingElement={<Loader />}
      googleMapsApiKey={GOOGLE_MAPS_API_KEY}
      libraries={["places"]}
    >
      <div
        className="flex items-center justify-center min-h-screen overflow-hidden bg-center bg-cover min-w-screen md:min-h-0"
        style={{ backgroundImage: `url(${landingBannerImage})` }}
      >
        <div className="flex items-center justify-center min-h-0 overflow-hidden">
          <div className="bg-white  rounded-2xl max-w-md md:max-w-2xl sm:h-auto md:h-[90vh] lg:h-[100%] md:rounded-3xl p-3 sm:p-3 md:p-5 lg:px-12 shadow-xl overflow-x-hidden scrollbar-hide">
            <div className="flex items-center justify-center h-0 p-0 mt-2 mb-7 ">
              <img
                src="/src/assets/images/logo.png"
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
            <div className="mb-0">
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

                if (
                  user?.store_name !== undefined &&
                  user?.store_name !== null
                ) {
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

                if (logoFile) {
                  console.log("logo file append", logoFile);
                  formData.append("store_images[]", logoFile);
                }
                console.log(bannerFiles, "______bannerFiles");
                bannerFiles.forEach((file) => {
                  console.log("I am here noow banner file append", file);
                  if (file) {
                    formData.append("store_images[]", file);
                  }
                });

                for (const [key, value] of formData.entries()) {
                  console.log("in form data show loop________", key, value);
                }

                soosarCreateStore(formData);
              }}
            >
              {({ isValid, setFieldValue }) => (
                <Form>
                  <div className="space-y-3  flex flex-col px-3 w-full md:w-[60vw] lg:w-[30vw] lg:max-w-lg">
                    <PlacesAutocomplete
                      value={storeLocation}
                      onChange={(value) => {
                        setStoreLocation(value);
                        setFieldValue("storeLocation", value);
                      }}
                      onSelect={(address) =>
                        handleSelect(address, setFieldValue)
                      }
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
                            <label className="block text-left text-sm  font-medium text-[#090A0A] mb-2">
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
                      <label className="block text-left text-sm font-medium text-[#090A0A] mb-2">
                        Store Description
                      </label>
                      {/* <textarea
                      name='storeDescription'
                        placeholder="Enter Store description"
                        rows={3}
                        className="w-full px-4 border border-gray-300 outline-none resize-none h-15 md:py-3 md:px2 md:py-2 rounded-xl focus:ring-1 focus:ring-brand focus:border-transparent"
                      /> */}

                      <FormField
                        name="storeDescription"
                        placeholder="Enter Store Description"
                        type="textarea"
                        inputClassName="!text-black"
                      />
                    </div>

                    <div className="">
                      <div className="block text-left text-sm font-medium text-[#090A0A] mb-2">
                        Upload store banner
                      </div>
                      <p className="mb-3 text-xs text-left text-gray-500 md:hidden">
                        Add your store banner
                      </p>
                      <div className="flex pb-2 space-x-2 overflow-x-auto scrollbar-hide">
                        {/* {[0, 1, 2].map((index) => (
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
                            {bannerFiles[index] ? (
                              <img
                                src={URL.createObjectURL(bannerFiles[index]!)}
                                alt="Banner"
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
                        ))} */}
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
    </LoadScript>
  );
};

export default StoreProfileSetup;
