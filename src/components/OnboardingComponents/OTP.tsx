// import { useState, useRef, useEffect, ChangeEvent, KeyboardEvent } from "react";
// import { useOnboardingStore } from "../../store/AppStore";

// interface OTPProps {
//   length?: number;
//   onComplete: (otp: string) => void;
// }

// const OTP: React.FC<OTPProps> = ({ length = 4, onComplete }) => {
//   const { setStep } = useOnboardingStore();
//   const [otp, setOtp] = useState<string[]>(new Array(length).fill(""));
//   const [timer, setTimer] = useState<number>(60);
//   const inputRefs = useRef<(HTMLInputElement | null)[]>(
//     new Array(length).fill(null)
//   );

//   useEffect(() => {
//     if (timer > 0) {
//       const interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
//       return () => clearInterval(interval);
//     }
//   }, [timer]);

//   const handleChange = (index: number, e: ChangeEvent<HTMLInputElement>) => {
//     const value = e.target.value.replace(/[^0-9]/g, "");
//     if (value.length > 1) return;
//     const newOtp = [...otp];
//     newOtp[index] = value;
//     setOtp(newOtp);

//     if (value && index < length - 1) {
//       inputRefs.current[index + 1]?.focus();
//     }

//     if (newOtp.every((digit) => digit !== "")) {
//       onComplete(newOtp.join(""));
//     }
//   };

//   const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
//     if (e.key === "Backspace" && !otp[index] && index > 0) {
//       inputRefs.current[index - 1]?.focus();
//     }
//   };

//   return (
//     <div className="flex flex-col items-center space-y-4 w-full m-auto">
//       <h2 className="text-lg font-semibold text-blue-500">
//         00:{timer < 10 ? `0${timer}` : timer}
//       </h2>
//       <p className="text-gray-500 text-sm mb-8">
//         Type the verification code sent to your email
//       </p>

//       <div className="flex space-x-3">
//         {otp.map((value, index) => (
//           <input
//             key={index}
//             ref={(el) => {
//               inputRefs.current[index] = el; // ✅ No return value
//             }}
//             type="text"
//             value={value}
//             maxLength={1}
//             onChange={(e) => handleChange(index, e)}
//             onKeyDown={(e) => handleKeyDown(index, e)}
//             className={`w-12 h-12 border-2 text-center text-lg font-bold rounded-lg focus:outline-none transition-all mb-20 ${
//               value
//                 ? "bg-blue-500 text-white border-blue-500"
//                 : "border-gray-300"
//             }`}
//           />
//         ))}
//       </div>
//       <div className="flex rounded-full w-62 overflow-hidden gap-2">
//         <button
//           className="w-full bg-brand text-white py-2 font-medium rounded-sm hover:bg-blue-600 transition"
//           onClick={() => setStep("signup completed")}>
//           Proceed
//         </button>
//       </div>

//       <p className="text-sm text-gray-500">
//         Didn’t get the code?{" "}
//         <button className="text-blue-500">Send again</button>
//       </p>
//     </div>
//   );
// };

// export default OTP;
import { useState, useRef, useEffect, ChangeEvent, KeyboardEvent } from "react";
import { useOnboardingStore } from "../../store/AppStore";

interface OTPProps {
  length?: number;
}

const OTP: React.FC<OTPProps> = ({ length = 4 }) => {
  const { setStep } = useOnboardingStore();
  const [otp, setOtp] = useState<string[]>(new Array(length).fill(""));
  const [timer, setTimer] = useState<number>(60);
  const [isDisabled, setIsDisabled] = useState<boolean>(true);
  const inputRefs = useRef<(HTMLInputElement | null)[]>(
    new Array(length).fill(null)
  );

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  useEffect(() => {
    // Disable button if OTP is incomplete
    setIsDisabled(otp.includes(""));
  }, [otp]);

  const handleChange = (index: number, e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, "");
    if (value.length > 1) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  return (
    <div className="flex flex-col items-center space-y-4 w-full m-auto">
      <h2 className="text-lg font-semibold text-blue-500">
        00:{timer < 10 ? `0${timer}` : timer}
      </h2>
      <p className="text-gray-500 text-sm mb-8">
        Type the verification code sent to your email
      </p>

      <div className="flex space-x-3">
        {otp.map((value, index) => (
          <input
            key={index}
            ref={(el) => {
              inputRefs.current[index] = el;
            }}
            type="text"
            value={value}
            maxLength={1}
            onChange={(e) => handleChange(index, e)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            className={`w-12 h-12 border-2 text-center text-lg font-bold rounded-lg focus:outline-none transition-all mb-20 ${
              value
                ? "bg-blue-500 text-white border-blue-500"
                : "border-gray-300"
            }`}
          />
        ))}
      </div>
      <div className="flex rounded-full w-62 overflow-hidden gap-2">
        <button
          className={`w-full py-2 font-medium rounded-sm transition ${
            isDisabled
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-brand text-white hover:bg-blue-600"
          }`}
          disabled={isDisabled}
          onClick={() => setStep("signup completed")}>
          Proceed
        </button>
      </div>

      <p className="text-sm text-gray-500">
        Didn’t get the code?{" "}
        <button className="text-blue-500">Send again</button>
      </p>
    </div>
  );
};

export default OTP;
