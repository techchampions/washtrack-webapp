import SettingStoreSetupLoading from "@/components/DashboardComponents/LoadingComponents/SettingsStoreSetupLoading";
import { Button, InputField } from "@/components/FormComponents";
import { useCreateBranch } from "@/hooks/mutations/useBranch";
import { useGetUserProfile } from "@/hooks/query/useGetUserProfile";
import { useModal } from "@/store/useModal.store";
import { Form, Formik, FormikHelpers } from "formik";
import { ArrowLeft } from "lucide-react";
import React, { useState } from "react";
import PlacesAutocomplete from "react-places-autocomplete";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
const CreateBranch = () => {
  const { closeModal } = useModal();
  const navigate = useNavigate();
  const { data: profileData, isLoading: isLoadingProfile } =
    useGetUserProfile();
  const { mutate: createBranch, isPending } = useCreateBranch();
  const [storeLocation, setStoreLocation] = useState("");
  // useEffect(() => {
  //   if (profileData?.user.address) {
  //     setStoreLocation(profileData.user.address);
  //   }
  // }, [profileData]);
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
  const initialValues: CreateBranchPayload = {
    store_name: "",
    phone: "",
    store_images: "",
    store_location: "",
    state: "",
    country: "",
    description: "",
    parent_store_id: profileData?.user.store_id || null,
  };
  const validationSchema = Yup.object().shape({
    store_name: Yup.string().required("Store Name is required"),
    phone: Yup.string().required("Phone No. is required"),
    store_location: Yup.string().required("Store location is required"),
    description: Yup.string().required("Description is required"),
    parent_store_id: Yup.number().required("No Parent store id"),
  });
  console.log("store_banner", profileStoreImages);

  const handleSelect = async (
    address: string,
    setFieldValue: FormikHelpers<CreateBranchPayload>["setFieldValue"]
  ) => {
    console.log(address, "selected address");
    setStoreLocation(address);
    setFieldValue("storeLocation", address);
    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ address }, (results, status) => {
      if (status === "OK" && results && results[0]) {
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
        setFieldValue("state", state);
        setFieldValue("country", country);
      }
    });
  };

  const handleSubmit = (values: typeof initialValues) => {
    createBranch(values, {
      onSuccess() {
        closeModal();
      },
    });
  };

  return (
    <div className="w-xs sm:w-md">
      <div className="mb-3 text-center">
        <h1 className="mb-1 text-lg font-bold md:text-2xl text-brand md:mb-2">
          Create New Branch
        </h1>
        <p className="text-xs text-gray-500">
          Fill in the information's below to setup your new branch
        </p>
      </div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        validateOnMount
        onSubmit={handleSubmit}
      >
        {({ isValid, setFieldValue }) => (
          <Form>
            {/* <div className="py-2">
              <RoundImageUpload
                name="store_images"
                className="flex justify-center"
                width={100}
                height={100}
              />
            </div> */}
            <div className="flex flex-col w-full px-3 space-y-3">
              <div className="grid grid-cols-2 gap-2">
                <div className="">
                  <label className="block text-left text-sm font-medium text-[#090A0A] mb-1">
                    Branch Name
                  </label>

                  <InputField
                    name="store_name"
                    placeholder="Enter Store Name"
                    className="!text-black"
                  />
                </div>
                <div className="">
                  <label className="block text-left text-sm font-medium text-[#090A0A] mb-1">
                    Phone No.
                  </label>

                  <InputField
                    name="phone"
                    placeholder="Enter Phone No."
                    className="!text-black"
                  />
                </div>
              </div>
              <PlacesAutocomplete
                value={storeLocation}
                onChange={(value) => {
                  setStoreLocation(value);
                  setFieldValue("store_location", value);
                }}
                onSelect={(address) => handleSelect(address, setFieldValue)}
                // onChange={setStoreLocation}
                // onSelect={handleSelect}
              >
                {({ getInputProps, suggestions, getSuggestionItemProps }) => (
                  <div className="relative">
                    <div>
                      <label className="block text-left text-sm  font-medium text-[#090A0A] mb-1">
                        Branch Location
                      </label>
                      <input
                        {...getInputProps({
                          name: "store_location",
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
                  Description
                </label>

                <InputField
                  name="description"
                  placeholder="Enter Store Description"
                  type="textarea"
                  className="!text-black"
                />
              </div>
            </div>
            <div className="flex justify-between mt-14">
              <Button
                onClick={() => navigate(-1)}
                label="Back"
                className="!w-fit px-6 bg-black flex hover:!bg-gray-700 rounded-xl"
                icon={<ArrowLeft />}
              />

              <Button
                label="Submit"
                type="submit"
                className="!w-fit px-10 rounded-xl"
                isLoading={isPending}
                disabled={isPending || !isValid}
              />
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default CreateBranch;
