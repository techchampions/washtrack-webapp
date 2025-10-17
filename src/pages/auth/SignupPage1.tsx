// import React, { useState } from "react";
// import { Formik, Form } from "formik";
// import * as Yup from "yup";
// import InputField from "../../components/FormComponents/InputField";
// import { FaUser, FaEnvelope, FaLock, FaPhone } from "react-icons/fa6";
// import Button from "../../components/FormComponents/Button";
// import { FaEye, FaEyeSlash } from "react-icons/fa";
// import Toast from "../../components/GeneralComponents/Toast";
// import { useAuthStore, useOnboardingStore } from "@/store/onboardingStore"

// const SignUp: React.FC = () => {
//   const { setStep } = useOnboardingStore();
//   // const { setToken, setStore, setPlanID, setReferralCode, setPhoneNumber } =
//   //   useUserStore();
//   const { registerUser, fieldErrors } = useAuthStore();
//   const [showPassword, setShowPassword] = React.useState(false);
//   const [showToast, setShowToast] = useState(false);
//   const [toastMsg, setToastMsg] = useState("");
//   const [toastType, setToastType] = useState<"success" | "error">("success");

//   const handleSignup = async (
//     values: {
//       store_name: string;
//       phone_num: string;
//       email: string;
//       password: string;
//     },
//     { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
//   ) => {
//     //  setToastMsg("An Error Occured")
//     //   setToastType("error");
//     //   setShowToast(true)
//     console.log(values, "log values signup");

//     try {
//       const response = await registerUser({ ...values, user_type: 2 });
//       console.log(response, " response sign up")
//       if (response?.success) {
//         setToastMsg(response.message);
//         setToastType("success");
//         setShowToast(true);
//         setStep("verify OTP");
//       }
//     } catch (error) {
//       console.log(fieldErrors, error, "in sign up")

//       setToastMsg(error.response?.data?.message)
//       setToastType("error");
//       setShowToast(true)
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   return (
//     <Formik
//       initialValues={{
//         store_name: "",
//         phone_num: "",
//         email: "",
//         password: "",
//       }}
//       validationSchema={Yup.object({
//         store_name: Yup.string().required("Business Name is required"),
//         phone_num: Yup.string()
//           .matches(/^\d+$/, "Phone number must be numeric")
//           .min(10, "Phone number must be at least 10 digits")
//           .required("Phone number is required"),
//         email: Yup.string()
//           .email("Invalid email address")
//           .required("Email is required"),
//         password: Yup.string()
//           .min(6, "Password must be at least 6 characters")
//           .required("Password is required"),
//       })}
//       validateOnMount={true}
//       onSubmit={handleSignup}
//     >
//       {({ isSubmitting, isValid }) => (
//         <div className=" w-full">
//           <div className="flex flex-col justify-center mb-10 mt-6">
//             <h3 className="text-[20px] text-center font-brand-bold text-brand">
//               Create Account
//             </h3>
//             <p className="mt-2 text-gray-400">
//               Sign Up via your Phone Number and Email
//             </p>
//           </div>
//           <Form className="flex flex-col mt-4 space-y-3">
//             <InputField
//               name="store_name"
//               placeholder="Business Name"
//               icon={<FaUser className="text-brand w-5 h-5" />}
//             />
//             <InputField
//               name="phone_num"
//               placeholder="Phone Number"
//               icon={<FaPhone className="text-brand w-5 h-5" />}
//             />
//             <InputField
//               name="email"
//               type="email"
//               placeholder="Email Address"
//               icon={<FaEnvelope className="text-brand w-5 h-5" />}
//             />
//             <InputField
//               name="password"
//               type={showPassword ? "text" : "password"}
//               placeholder="Password"
//               icon={<FaLock className="text-brand w-5 h-5" />}
//               rightIcon={
//                 showPassword ? (
//                   <FaEyeSlash
//                     className="text-gray-500 w-5 h-5 cursor-pointer"
//                     onClick={() => setShowPassword(false)}
//                   />
//                 ) : (
//                   <FaEye
//                     className="text-gray-500 w-5 h-5 cursor-pointer"
//                     onClick={() => setShowPassword(true)}
//                   />
//                 )
//               }
//             />
//             <div className="flex items-center mb-8">
//               <input
//                 type="checkbox"
//                 name="agree"
//                 className="mr-2 text-brand bg-brand"
//                 required
//               />
//               <p className="text-gray-500 text-[10px]">
//                 By continuing, you agree to our
//                 <a
//                   href="/terms"
//                   className="text-brand mx-1"
//                   target="_blank"
//                   rel="noreferrer"
//                 >
//                   Terms of Service
//                 </a>
//                 and
//                 <a
//                   href="/terms"
//                   className="text-brand mx-1"
//                   target="_blank"
//                   rel="noreferrer"
//                 >
//                   Privacy Policy
//                 </a>
//               </p>
//             </div>

//             <Button
//               label="Sign Up"
//               type="submit"
//               disabled={isSubmitting || !isValid}
//               isLoading={isSubmitting}
//               className="mt-[70px]"
//             />
//             <p className="text-gray-500 mt-4 text-center text-sm font-medium">
//               Have an account?
//               <span
//                 className="text-brand cursor-pointer ml-1"
//                 onClick={() => setStep("login")}
//               >
//                 Sign In
//               </span>
//             </p>
//           </Form>
//           {showToast && (
//             <Toast
//               message={toastMsg}
//               type={toastType}
//               onClose={() => setShowToast(false)}
//             />
//           )}
//         </div>
//       )}
//     </Formik>
//   );
// };

// export default SignUp;
