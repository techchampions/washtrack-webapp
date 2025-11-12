// import React, {
//   useState,
//   useRef,
//   useEffect,
//   ChangeEvent,
//   KeyboardEvent,
// } from "react";
// import { useOnboardingStore, useAuthStore } from "@/store/onboardingStore";
// import Toast from "../../components/GeneralComponents/Toast";
// import Button from "../../components/FormComponents/Button";
// import { useVerifyEmail } from "@/hooks/auth/useVerifyEmail";
// interface OTPProps {
//   length?: number;
// }

// const OTP: React.FC<OTPProps> = ({ length = 4 }) => {
//   const { mutate: verifyEmail, isPending, status, data } = useVerifyEmail();
//   const { setStep } = useOnboardingStore();
//   const { resendOTP, otpResponse, verifyOTP } = useAuthStore();
//   const [otp, setOtp] = useState<string[]>(new Array(length).fill(""));
//   const [timer, setTimer] = useState<number>(59);
//   const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
//   const [isDisabled, setIsDisabled] = useState<boolean>(true);
//   const [showToast, setShowToast] = useState(false);
//   const [toastMsg, setToastMsg] = useState("");
//   const [toastType, setToastType] = useState<"success" | "error">("success");

//   const inputRefs = useRef<(HTMLInputElement | null)[]>(
//     new Array(length).fill(null)
//   );

//   useEffect(() => {
//     if (timer > 0) {
//       const interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
//       return () => clearInterval(interval);
//     }
//   }, [timer]);

//   useEffect(() => {
//     setIsDisabled(otp.includes(""));
//   }, [otp]);

//   const handleChange = (index: number, e: ChangeEvent<HTMLInputElement>) => {
//     const value = e.target.value.replace(/[^0-9]/g, "");
//     if (value.length > 1) return;

//     const newOtp = [...otp];
//     newOtp[index] = value;
//     setOtp(newOtp);

//     if (value && index < length - 1) {
//       inputRefs.current[index + 1]?.focus();
//     }
//   };

//   const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
//     if (e.key === "Backspace") {
//       if (otp[index] !== "") {
//         const newOtp = [...otp];
//         newOtp[index] = "";
//         setOtp(newOtp);
//       } else if (index > 0) {
//         inputRefs.current[index - 1]?.focus();
//       }
//     }
//   };

//   const handleSubmit = () => {
//     const enteredOtp = parseInt(otp.join(""), 10);

//     if (isNaN(enteredOtp) || otp.some((digit) => digit === "")) {
//       setToastMsg("Please enter all digits of the OTP");
//       setToastType("error");
//       setShowToast(true);
//       return;
//     }

//     verifyEmail(
//       { otp: enteredOtp },
//       {
//         onSuccess: (resp) => {
//           console.log(resp);
//         },
//         onError: (resp) => {
//           console.log(resp);
//         },
//       }
//     );
//   };

//   useEffect(() => {
//     console.log(isPending, "__________isPending_________");
//     console.log(data, "___________data__________");
//   }, [data]);

//   const handleSubmit1 = async () => {
//     const enteredOtp = parseInt(otp.join(""), 10);

//     if (isNaN(enteredOtp) || otp.some((digit) => digit === "")) {
//       return;
//     }

//     console.log("Entered OTP:", typeof enteredOtp);
//     const storedOtp = localStorage.getItem("otp");
//     console.log(typeof storedOtp);

//     if (enteredOtp === storedOtp) {
//       try {
//         const response = await verifyOTP({ otp: enteredOtp });
//         setIsSubmitting(true);

//         if (response.data.success) {
//           setToastMsg("OTP verified successfully!");
//           setToastType("success");
//           setShowToast(true);
//           setStep("signup completed");
//         }
//       } catch (error) {
//         setToastMsg("OTP verification failed. Please try again.");
//         setToastType("error");
//         setShowToast(true);
//         console.error("OTP verification failed:", error);
//       }
//       setIsSubmitting(false);
//     }
//   };

//   const handleResendOTP = async () => {
//     try {
//       const response = await apiClient.post("/resend-otp");

//       if (response.data.success) {
//         setToastMsg("OTP resent successfully!");
//         setToastType("success");
//         setShowToast(true);
//         setTimer(59);
//         localStorage.setItem("otp", response.data.otp);
//         console.log(response.data.otp);
//       } else {
//         throw new Error("Failed to resend OTP");
//       }
//     } catch (error) {
//       setToastMsg("Failed to resend OTP. Please try again.");
//       setToastType("error");
//       setShowToast(true);
//     }
//   };

//   return (
//     <div className="flex flex-col items-center space-y-4 w-full m-auto">
//       <h2 className="text-3xl font-brand-bold text-brand">
//         00:{timer < 10 ? `0${timer}` : timer}
//       </h2>
//       <p className="text-gray-500 text-sm mb-8 w-[200px] text-center">
//         Type the verification code sent to your email
//       </p>

//       <div className="flex space-x-3">
//         {otp.map((value, index) => (
//           <input
//             key={index}
//             ref={(el) => (inputRefs.current[index] = el)}
//             type="text"
//             value={value}
//             maxLength={1}
//             placeholder="0"
//             onChange={(e) => handleChange(index, e)}
//             onKeyDown={(e) => handleKeyDown(index, e)}
//             className={`w-12 h-13 border-2 text-center text-lg text-gray-500 font-brand-bold rounded-lg focus:outline-none transition-all mb-20 focus:border-brand active:text-brand ${
//               value ? "bg-brand text-white border-brand" : "border-gray-300"
//             }`}
//           />
//         ))}
//       </div>

//       <div className="flex rounded-full w-62 overflow-hidden gap-2">
//         <Button
//           label="Proceed"
//           className={`w-full py-2 font-medium rounded-sm transition ${
//             isDisabled
//               ? "bg-gray-300 cursor-not-allowed"
//               : "bg-brand text-white hover:bg-blue-600"
//           }`}
//           onClick={handleSubmit}
//           disabled={isDisabled}
//           isLoading={isPending}
//         />
//         {/* <button
//           className={`w-full py-2 font-medium rounded-sm transition ${
//             isDisabled
//               ? "bg-gray-300 cursor-not-allowed"
//               : "bg-brand text-white hover:bg-blue-600"
//           }`}
//           disabled={isDisabled}
//           onClick={handleSubmit}
//         >
//           Proceed
//         </button> */}
//       </div>

//       <p className="text-sm text-gray-500">
//         Didn’t get the code?{" "}
//         <button
//           className="text-blue-500"
//           onClick={handleResendOTP}
//           disabled={timer > 0}
//         >
//           {timer > 0 ? `Resend in ${timer}s` : "Send again"}
//         </button>
//       </p>

//       {showToast && (
//         <Toast
//           message={toastMsg}
//           type={toastType}
//           onClose={() => setShowToast(false)}
//         />
//       )}
//     </div>
//   );
// };

// export default OTP;
