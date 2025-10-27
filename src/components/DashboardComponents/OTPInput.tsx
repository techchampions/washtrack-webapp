/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { FaBackspace } from "react-icons/fa";

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
              <FaBackspace className="w-4 h-4 text-gray-600" />
            </button>
          );
        }

        return (
          <button
            key={index}
            onClick={() => handleKeyPress(key)}
            className="w-6 h-6 text-lg font-semibold text-black bg-white rounded-lg hover:bg-gray-200"
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
    "w-full py-1 rounded-lg font-semibold text-lg transition-all duration-200 disabled:opacity-50";

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
          <div className="w-4 h-4 mr-2 border-b-2 border-white rounded-full animate-spin"></div>
          Verifying...
        </div>
      ) : (
        children
      )}
    </button>
  );
};

const OTPForm = ({
  onSubmit,
  isLoading,
  customerEmail,
  customerPhone,
}: // isLoading = false,
{
  onSubmit: (code: string, paidAmount: number) => void;
  isLoading: boolean;
  customerEmail?: string;
  customerPhone?: string;
}) => {
  const [code, setCode] = useState("");
  const [paidAmount, setPaidAmount] = useState(0);
  // const [loading, setLoading] = useState(false);
  // const [error, setError] = useState("");

  const handleKeyPress = (key: any) => {
    if (key === "backspace") {
      setCode((prev) => prev.slice(0, -1));
    } else if (code.length < 4) {
      setCode((prev) => prev + key);
    }
  };

  const handleProceed = () => {
    if (code.length !== 4) return;
    onSubmit(code, paidAmount);
  };

  return (
    <div className="">
      <div className="mb-4 text-center">
        <p className="text-sm text-gray-600">
          Enter pickup verification code sent to{" "}
          <span className="font-medium text-blue-500">{customerPhone} </span>
          and <span className="text-blue-500">{customerEmail}</span>
        </p>
      </div>
      <CodeInput value={code} onChange={setCode} />

      <Keypad onKeyPress={handleKeyPress} />
      <div className="">
        <div className="flex items-center gap-2 p-2 border border-gray-300 rounded-lg">
          <div className="">₦</div>
          <input
            type="number"
            className="flex-1 border-none outline-none"
            placeholder="Enter Balance (optional)"
            onChange={(e) => setPaidAmount(Number(e.target.value))}
          />
        </div>
        <div className="text-gray-400 text-[9px]">
          Enter the outstanding balance in the box above if the customer has
          made payment
        </div>
      </div>

      <div className="">
        <ActionButton
          onClick={handleProceed}
          disabled={code.length !== 4}
          loading={isLoading}
        >
          Confirm Completion
        </ActionButton>
      </div>
    </div>
  );
};

export default OTPForm;
