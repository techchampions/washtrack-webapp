// import React, { useState } from "react";
// import { Formik, Form } from "formik";
// import * as Yup from "yup";
// import { useOnboardingStore } from "../../store/AppStore";
// import { FaMapMarkerAlt, FaFileAlt } from "react-icons/fa"; // Icons for inputs
// import { MdOutlineFileUpload } from "react-icons/md";
// import { BiSolidCameraPlus } from "react-icons/bi";
// import InputField from "../FormComponents/InputField";
// import Button from "../FormComponents/Button";

// const StoreSetup = () => {
//   const { setStep } = useOnboardingStore();
//   const [logo, setLogo] = useState<string | null>(null);
//   const [banners, setBanners] = useState<(string | null)[]>([null, null]);

//   const validationSchema = Yup.object({
//     storeLocation: Yup.string().required("Store location is required"),
//     storeDescription: Yup.string().required("Store description is required"),
//   });

//   const handleImageUpload = (
//     event: React.ChangeEvent<HTMLInputElement>,
//     type: "logo" | "banner",
//     index?: number
//   ) => {
//     if (event.target.files && event.target.files[0]) {
//       const reader = new FileReader();
//       reader.onload = () => {
//         if (type === "logo") {
//           setLogo(reader.result as string);
//         } else if (type === "banner" && index !== undefined) {
//           const newBanners = [...banners];
//           newBanners[index] = reader.result as string;
//           setBanners(newBanners);
//         }
//       };
//       reader.readAsDataURL(event.target.files[0]);
//     }
//   };

//   return (
//     <div className="flex flex-col items-center space-y-4 w-full max-w-lg mx-auto p-4">
//       <h2 className="text-[30px] font-brand-bold text-blue-500">
//         Setup your store
//       </h2>
//       <p className="text-gray-500 text-xs text-center">
//         Fill in the information below to setup your store
//       </p>

//       {/* Store Logo Upload */}
//       <label className="relative cursor-pointer">
//         <input
//           type="file"
//           className="hidden"
//           accept="image/*"
//           onChange={(e) => handleImageUpload(e, "logo")}
//         />
//         <div className="w-24 h-24 flex items-center justify-center bg-blue-100 rounded-full border border-blue-300">
//           {logo ? (
//             <img
//               src={logo}
//               alt="Store Logo"
//               className="w-full h-full rounded-full object-cover"
//             />
//           ) : (
//             <img
//               src="../images/profile-img.png"
//               className="w-full h-full rounded-full object-cover"
//               alt=""
//             />
//           )}
//         </div>
//         <BiSolidCameraPlus className="absolute right-4 bottom-4 text-white" />
//       </label>
//       <p className="text-sm text-gray-500">Upload your store logo</p>

//       {/* Formik Form */}
//       <Formik
//         initialValues={{ storeLocation: "", storeDescription: "" }}
//         validationSchema={validationSchema}
//         onSubmit={(values) => {
//           console.log("Store Data:", values);
//           setStep("add services"); // Redirect user after setup
//         }}>
//         {() => (
//           <Form className="w-full flex flex-col space-y-4">
//             {/* Store Location */}
//             <InputField
//               name="storeLocation"
//               placeholder="Enter your location"
//               icon={<FaMapMarkerAlt className="text-gray-500" />}
//             />

//             {/* Store Description */}
//             <InputField
//               name="storeDescription"
//               placeholder="Enter store description"
//               icon={<FaFileAlt className="text-gray-500" />}
//             />

//             {/* Store Banners */}
//             <div className="flex flex-col">
//               <label className="text-md font-semibold text-gray-500 text-left">
//                 Upload store banners
//               </label>
//               <p className="text-xs text-gray-400 text-left mb-2">
//                 Add your store banner, discounts and Ads here
//               </p>
//               <div className="flex justify-between space-x-2">
//                 {[0, 1].map((index) => (
//                   <label
//                     key={index}
//                     className="relative cursor-pointer border border-gray-200 rounded-md p-4 w-1/2 h-32 flex items-center justify-center text-black">
//                     <input
//                       type="file"
//                       className="hidden"
//                       accept="image/*"
//                       onChange={(e) => handleImageUpload(e, "banner", index)}
//                     />

//                     {banners[index] ? (
//                       <img
//                         src={banners[index]}
//                         alt="Banner"
//                         className="w-full h-full object-cover text-black"
//                       />
//                     ) : (
//                       <div className="flex flex-col justify-center items-center">
//                         <MdOutlineFileUpload
//                           size={35}
//                           className="text-gray-500"
//                         />
//                         <p className="text-xs text-black">Upload Store Image</p>
//                         <p className="text-[6px] text-black mt-[2px]">
//                           (Recommended Dimensions: 930*1163)
//                         </p>
//                       </div>
//                     )}
//                   </label>
//                 ))}
//               </div>
//             </div>

//             {/* Submit Button */}
//             <Button label="Continue" type="submit" />
//           </Form>
//         )}
//       </Formik>
//     </div>
//   );
// };

// export default StoreSetup;
import React, { useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useOnboardingStore, useUserStore } from "../../store/AppStore";
import { FaMapMarkerAlt, FaFileAlt } from "react-icons/fa";
import { MdOutlineFileUpload } from "react-icons/md";
import { BiSolidCameraPlus } from "react-icons/bi";
import InputField from "../FormComponents/InputField";
import Button from "../FormComponents/Button";
import apiClient from "../../utils/AxiosInstance";

const StoreSetup = () => {
  const { setStep } = useOnboardingStore();
  const { store, setStore } = useUserStore();
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [bannerFiles, setBannerFiles] = useState<(File | null)[]>([null, null]);

  const validationSchema = Yup.object({
    country: Yup.string().required("Store Country is required"),
    state: Yup.string().required("Store State is required"),
    storeLocation: Yup.string().required("Store location is required"),
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

  return (
    <div className="flex flex-col items-center space-y-4 w-full max-w-lg mx-auto p-4">
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
          country: "",
          state: "",
          storeLocation: "",
          storeDescription: "",
        }}
        validationSchema={validationSchema}
        onSubmit={async (values) => {
          try {
            const formData = new FormData();
            formData.append("country", values.country);
            formData.append("state", values.state);
            formData.append("store_name", store?.name || "");
            formData.append("store_location", values.storeLocation);
            formData.append("description", values.storeDescription);
            console.log(formData);

            if (logoFile) {
              formData.append("store_images[]", logoFile);
            }

            bannerFiles.forEach((file) => {
              if (file) {
                formData.append("store_images[]", file);
              }
            });

            const response = await apiClient.post("/profile/update", formData, {
              headers: { "Content-Type": "multipart/form-data" },
            });

            console.log("Store Setup Success:", response.data);
            // ✅ Update only the necessary fields while keeping other store data
            setStore({
              id: response.data["store detaills"].id.toString(),
              name: response.data["store detaills"].store_name,
              description: response.data["store detaills"].description,
              address: response.data["store detaills"].store_location,
              state: response.data["store detaills"].state,
              country: response.data["store detaills"].country,
              logoUrl: response.data["store detaills"].store_images[0] || "", // Store first image as logo
            });
            setStep("add services");
          } catch (error) {
            console.error("Store Setup Error:", error.response?.data || error);
          }
        }}
      >
        {() => (
          <Form className="w-full flex flex-col space-y-4">
            <div className="grid grid-cols-2 gap-1">
              <InputField
                name="country"
                placeholder="Country"
                icon={<FaMapMarkerAlt className="text-gray-500" />}
              />
              <InputField
                name="state"
                placeholder="State"
                icon={<FaMapMarkerAlt className="text-gray-500" />}
              />
            </div>
            <InputField
              name="storeLocation"
              placeholder="Enter your location"
              icon={<FaMapMarkerAlt className="text-gray-500" />}
            />
            <InputField
              name="storeDescription"
              placeholder="Enter store description"
              icon={<FaFileAlt className="text-gray-500" />}
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
                        <p className="text-xs text-black">Upload Store Image</p>
                        <p className="text-[6px] text-black mt-[2px]">
                          (Recommended Dimensions: 930*1163)
                        </p>
                      </div>
                    )}
                  </label>
                ))}
              </div>
            </div>
            <Button label="Continue" type="submit" />
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default StoreSetup;
