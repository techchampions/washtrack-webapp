/* eslint-disable @typescript-eslint/no-explicit-any */
import { useAuthStore } from "@/store/auth.store";
import { ArrowLeft } from "lucide-react";
import React, { useEffect, useState } from "react";

const CountdownTimer = ({ initialTime = 59, onExpire }: any) => {
  const [timeLeft, setTimeLeft] = useState(initialTime);

  useEffect(() => {
    if (timeLeft <= 0) {
      onExpire?.();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev: any) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, onExpire]);

  const formatTime = (seconds: any) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <div className="mb-2 text-2xl font-bold text-brand">
      {formatTime(timeLeft)}
    </div>
  );
};

const CodeInput = ({ value, onChange, length = 4 }: any) => {
  const [focusedIndex, setFocusedIndex] = useState(0);

  const handleInputChange = (index: any, inputValue: any) => {
    const newValue = value.split("");
    newValue[index] = inputValue;
    const updatedValue = newValue.join("");
    onChange(updatedValue);

    if (inputValue && index < length - 1) {
      setFocusedIndex(index + 1);
    }
  };

  const handleKeyDown = (index: any, e: any) => {
    if (e.key === "Backspace" && !value[index] && index > 0) {
      setFocusedIndex(index - 1);
    }
  };

  return (
    <div className="flex justify-center gap-3 mb-6">
      {Array.from({ length }, (_, index) => (
        <input
          key={index}
          type="text"
          maxLength={1}
          value={value[index] || ""}
          onChange={(e) => handleInputChange(index, e.target.value)}
          onKeyDown={(e) => handleKeyDown(index, e)}
          onFocus={() => setFocusedIndex(index)}
          className={`
            w-10 h-10 text-lg font-bold text-center rounded-2xl border-1
            focus:outline-none transition-all duration-200
            ${
              value[index]
                ? "bg-brand text-white border-brand"
                : focusedIndex === index
                ? "border-brand bg-white"
                : "border-gray-200 bg-gray-50 hover:border-gray-300"
            }
          `}
          autoFocus={index === 0}
        />
      ))}
    </div>
  );
};

const Keypad = ({ onKeyPress }: any) => {
  const keys = [
    ["1", "2", "3"],
    ["4", "5", "6"],
    ["7", "8", "9"],
    ["", "0", "backspace"],
  ];

  const handleKeyPress = (key: any) => {
    if (key === "") return;
    onKeyPress(key);
  };

  return (
    <div className="grid w-3/4 grid-cols-3 mx-auto gap-y-0 gap-x-0 place-items-center">
      {keys.flat().map((key, index) => {
        if (key === "") {
          return <div key={index} className="w-16 h-16 bg-white"></div>;
        }

        if (key === "backspace") {
          return (
            <button
              key={index}
              onClick={() => handleKeyPress(key)}
              className="flex items-center justify-center w-6 h-6 bg-white hover:bg-white"
            >
              <ArrowLeft className="w-4 h-4 text-gray-600" />
            </button>
          );
        }

        return (
          <button
            key={index}
            onClick={() => handleKeyPress(key)}
            className="w-6 h-6 text-lg font-semibold text-black bg-white"
          >
            {key}
          </button>
        );
      })}
    </div>
  );
};

const ActionButton = ({
  onClick,
  disabled,
  loading,
  children,
  variant = "primary",
}: any) => {
  const baseClasses =
    "w-full py-1 rounded-full font-semibold text-lg transition-all duration-200 disabled:opacity-50";

  const variants: any = {
    primary: "bg-brand hover:bg-brand text-white disabled:hover:bg-brand",
    secondary:
      "bg-gray-200 hover:bg-gray-300 text-gray-700 disabled:hover:bg-gray-200",
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled || loading}
      className={`${baseClasses} ${variants[variant]}`}
    >
      {loading ? (
        <div className="flex items-center justify-center">
          <div className="w-6 h-6 mr-2 border-b-2 border-white rounded-full animate-spin"></div>
          Verifying...
        </div>
      ) : (
        children
      )}
    </button>
  );
};

// const Header = ({ onBack, title }) => {
//   return (
//     <div className="flex items-center justify-between px-6 pt-6 mb-8">
//       <div className="flex items-center">
//         <div className="flex items-center justify-center w-8 h-8 mr-3 bg-white rounded-full">
//           <div className="flex items-center justify-center w-6 h-6 bg-gray-800 rounded-full">
//             <div className="w-3 h-3 bg-white rounded-full"></div>
//           </div>
//         </div>
//         <span className="text-xl font-bold text-white">{title}</span>
//       </div>
//     </div>
//   );
// };

const OTPForm = ({
  onSubmit,
  resendOtp,
  isLoading,
  reSending,
}: {
  onSubmit: (code: string) => Promise<void>;
  resendOtp: () => Promise<void>;
  isLoading: boolean;
  reSending: boolean;
}) => {
  const [timer, setTimer] = useState(59);
  const [code, setCode] = useState("");
  // const [loading, setLoading] = useState(false);
  // const [error, setError] = useState("");
  const { user } = useAuthStore();

  const handleKeyPress = (key: any) => {
    if (key === "backspace") {
      setCode((prev) => prev.slice(0, -1));
    } else if (code.length < 4) {
      setCode((prev) => prev + key);
    }
  };

  const handleProceed = () => {
    if (code.length !== 4) return;
    onSubmit(code);
  };

  // const handleSendAgain = () => {
  //   setTimer(59);
  //   setCode("");
  //   setError("");
  // };

  const onExpire = () => {
    setTimer(59);
  };

  return (
    <div className="w-full pt-5 bg-white border-white rounded-none shadow-xl lg:max-w-md sm:max-w-xs md:border md:rounded-3xl lg:px-10 md:pb-10">
      <div className="mb-6 text-center">
        <CountdownTimer initialTime={timer} onExpire={onExpire} />
        <p className="text-sm leading-relaxed text-gray-600">
          Type the verification code
          <br />
          sent to <span className="text-blue-500">{user?.email}</span>
        </p>
      </div>
      <div className="mb-8 text-center">
        <p className="text-xs text-gray-500">
          This code will expire in{" "}
          <span className="font-semibold">60 secs</span>
        </p>
      </div>
      <CodeInput value={code} onChange={setCode} />

      <Keypad onKeyPress={handleKeyPress} />
      <div className="lg:px-12 md:px-8">
        <ActionButton
          onClick={handleProceed}
          disabled={code.length !== 4}
          loading={isLoading}
        >
          Proceed
        </ActionButton>
      </div>

      <div className="mt-6 text-center">
        <span className="text-sm text-gray-500">Didn't get code? </span>
        <button
          onClick={() => reSending && resendOtp()}
          className="text-sm font-medium transition-colors text-brand hover:text-brand"
        >
          {reSending ? "Sending OTP" : "Send again"}
        </button>
      </div>
    </div>
  );
};

export default OTPForm;
