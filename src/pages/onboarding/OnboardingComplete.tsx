// import Button from "../../components/FormComponents/Button";
// import { FaCheckCircle } from "react-icons/fa";
// import { DotLottieReact } from "@lottiefiles/dotlottie-react";
// import { useNavigate } from "react-router-dom";
// import {useOnboardingStore, useAuthStore} from "@/store/onboardingStore"

// const OnboardingComplete = () => {
//   const { setHasCompletedOnboarding } = useOnboardingStore();
//   const { setIsLoggedIn } = useAuthStore();
//   const navigate = useNavigate();
//   const handleCompleteOnboarding = () => {
//     setHasCompletedOnboarding(true);
//     setIsLoggedIn(true);
//     navigate("/dashboard");
//   };

//   return (
//     <div className="w-full h-full m-auto">
//       <div className="flex flex-col items-center justify-center space-y-1 w-full max-w-lg mx-auto p-4 relative">
//         <DotLottieReact
//           src="../images/animation.lottie"
//           autoplay
//           className="absolute w-[600px] top-0"
//         />
//         <img
//           src="../images/check.png"
//           alt=""
//           className="h-[150px] w-[150px] mb-5"
//         />
//         {/* <FaCheckCircle className="text-brand h-[150px] w-[150px] mb-5" /> */}
//         <h2 className="text-[30px] font-brand-bold text-black text-center">
//           Congratulations!
//         </h2>
//         <p className="text-brand font-brand-bold text-center">
//           Your setup is complete
//         </p>

//         <p className="text-gray-600 text-center mt-12 mb-6">
//           You’re all set to start managing your laundry business with WashTrack
//         </p>

//         <Button label="Go to Home" onClick={handleCompleteOnboarding} />
//       </div>
//     </div>
//   );
// };

// export default OnboardingComplete;
