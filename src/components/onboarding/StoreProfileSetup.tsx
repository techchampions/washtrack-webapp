import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../common/Button';
import landingBannerImage from "@/assets/images/landing-banner-image.png";
import { LoadScript } from "@react-google-maps/api";
import { BiSolidCameraPlus } from "react-icons/bi";
import { Upload, User } from 'lucide-react';
import { MdOutlineFileUpload } from "react-icons/md";
import { Form, Formik } from 'formik';
import PlacesAutocomplete from 'react-places-autocomplete';
import { FaMapMarkerAlt, FaFileAlt } from "react-icons/fa";

const GOOGLE_MAPS_API_KEY = "AIzaSyBPIyWllHG8je77s56Pyp69b5mzlghzD9U";

const StoreProfileSetup = () => {
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [bannerFiles, setBannerFiles] = useState<(File | null)[]>([
    null,
    null,
    null,
  ]);
  const [storeLocation, setStoreLocation] = useState("");


  const navigate = useNavigate();

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

        // setStore({
        //   state: state,
        //   country: country,
        // });
      }
    });
  };


  return (
    <LoadScript
      googleMapsApiKey={GOOGLE_MAPS_API_KEY}
      libraries={["places"]}>
      <div
        className="min-h-screen min-w-screen md:min-h-0 overflow-hidden flex items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: `url(${landingBannerImage})` }}
      >
        <div className="flex items-center justify-center min-h-0 overflow-hidden">

          <div
            className="bg-white  rounded-2xl max-w-md md:max-w-2xl sm:h-auto md:h-[90vh] lg:h-[100%] md:rounded-3xl p-3 sm:p-3 md:p-5 lg:px-12 shadow-xl overflow-x-hidden">
            <div className="text-center mb-3">
              <h2 className="text-lg md:text-2xl font-bold text-brand mb-1 md:mb-2">Setup your store</h2>
              <p className="text-dark text-sm md:text-lg lg:text-sm">Fill in the information's below to setup your store</p>
            </div>
            <div className="mb-3">

              {/* <div className="w-10 h-10 md:w-15 md:h-15 bg-brand rounded-full flex items-center justify-center mx-auto mb-2">
                <User className="w-3 w-3 md:w-8 md:h-8 text-white" />
              </div> */}

              <label className="flex cursor-pointer relative items-center justify-center mx-auto mb-2">
                <input
                  type="file"
                  className="border border-red-500 absolute h-20 hidden"
                  accept="image/*"
                  onChange={(e) => handleImageUpload(e, "logo")}
                />
                <div className="w-18 h-18 flex items-center justify-center relative">
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
                  <BiSolidCameraPlus className="absolute h-5 w-5 right-1 bottom-1  text-white" />

                </div>
              </label>
              <p className="text-center text-sm text-dark">Upload your store logo</p>
            </div>
            <Formik
              initialValues={{
                storeLocation: "",
                storeDescription: "",
              }}

              onSubmit={async (values) => {
                console.log("Submit it")
              }}
            >

              {() => (
                <Form>


                  <div className="space-y-3  flex flex-col px-3 w-full md:w-[60vw] lg:w-[30vw] lg:max-w-lg">
                    <PlacesAutocomplete
                      value={storeLocation}
                      onChange={setStoreLocation}
                      onSelect={handleSelect}
                    >
                      {({ getInputProps, suggestions, getSuggestionItemProps }) => (
                        <div className='relative'>
                          <div>
                            <label className="block text-left text-sm  font-medium text-[#090A0A] mb-2">Store Location</label>
                            <input
                              {...getInputProps({
                                name: "storeLocation",
                                placeholder: "Enter your location",
                                className: "w-full px-4 py-3 md:px2 md:py-2 border border-gray-300 rounded-xl focus:ring-1 focus:ring-brand focus:border-transparent outline-none"

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

                    <div>
                      <label className="block text-left text-sm font-medium text-[#090A0A] mb-2">Store Description</label>
                      <textarea
                        placeholder="Enter Store description"
                        rows={3}
                        className="w-full px-4 h-15 md:py-3 md:px2 md:py-2 border border-gray-300 rounded-xl focus:ring-1 focus:ring-brand focus:border-transparent outline-none resize-none"
                      />
                    </div>

                    <div className=''>
                      <label className="block md:hidden text-left text-sm font-medium text-[#090A0A] mb-2">Upload store banner</label>
                      <p className="text-xs text-left md:hidden text-gray-500 mb-3">Add your store banner</p>
                      <div className="flex overflow-x-auto space-x-2 pb-2 scrollbar-hide">
                        {[0, 1, 2].map((index) => (
                          <label
                            key={index}
                            className="min-w-[45%] max-w-[45%] flex-shrink-0 relative cursor-pointer border border-gray-200 rounded-md p-4 h-32 flex items-center justify-center text-black"
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
                      {/* <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <div className="border-2 lg:w-50 lg:h-20 border-dashed border-gray-300 rounded-xl px-3 py-2 md:p-4 text-center">
                    <Upload className="w-4 h-4 md:w-8 md:h-8 lg:h-3 text-gray-400 mx-auto lg:mb-1" />
                    <p className="hidden lg:block text-sm md:text-xs leading-tight text-[#090A0A]">Upload Store Image</p>
                    <p className="text-xs hidden lg:block text-[#090A0A] leading-tight">(Recommended Dimensions: 930*1365)</p>
                  </div>

                </div> */}
                    </div>
                  </div>

                  <Button
                    style={{ "borderRadius": "40px" }}
                    type="submit"
                    className="w-5/6 md:w-8/9 mb-1 mt-6"
                    size="md"
                    onClick={() => navigate('/onboarding/add-services-setup')}

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

}

export default StoreProfileSetup;