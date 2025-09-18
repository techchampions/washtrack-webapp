import React from "react";
import { Field, ErrorMessage, useField } from "formik";
import { FaExclamationCircle } from "react-icons/fa";

export interface RadioOption {
  value: string | number;
  label: string;
  disabled?: boolean;
}

interface RadioSelectProps {
  name: string;
  options: RadioOption[];
  label?: string;
  orientation?: "horizontal" | "vertical";
  className?: string;
  disabled?: boolean;
  required?: boolean;
}

const RadioSelect: React.FC<RadioSelectProps> = ({
  name,
  options,
  label,
  orientation = "vertical",
  className = "",
  disabled = false,
  required = false,
}) => {
  const [field, meta] = useField(name);
  const hasError = meta.touched && meta.error;

  return (
    <div className={`w-full ${className}`}>
      {/* Label */}
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      {/* Radio Options */}
      <div
        className={`flex ${
          orientation === "horizontal"
            ? "flex-row gap-4 flex-wrap"
            : "flex-col gap-2"
        }`}
        role="radiogroup"
        aria-labelledby={label ? `${name}-label` : undefined}
      >
        {options.map((option) => (
          <label
            key={option.value}
            className={`flex items-center cursor-pointer ${
              disabled || option.disabled
                ? "cursor-not-allowed opacity-60"
                : "cursor-pointer"
            }`}
          >
            <Field
              type="radio"
              name={name}
              value={option.value}
              disabled={disabled || option.disabled}
              className="hidden"
            />
            <div
              className={`flex items-center justify-center w-5 h-5 rounded-full border-2 mr-3 transition-colors ${
                field.value === option.value
                  ? "border-blue-500 bg-blue-500"
                  : "border-gray-300 bg-white"
              } ${
                hasError ? "border-red-500" : ""
              } focus-within:ring-2 focus-within:ring-blue-200`}
            >
              <div
                className={`w-2 h-2 rounded-full transition-all ${
                  field.value === option.value
                    ? "bg-white scale-100"
                    : "bg-transparent scale-0"
                }`}
              />
            </div>
            <span
              className={`text-sm ${
                disabled || option.disabled ? "text-gray-400" : "text-gray-700"
              }`}
            >
              {option.label}
            </span>
          </label>
        ))}
      </div>

      {/* Error Message */}
      <ErrorMessage
        name={name}
        component="p"
        className="text-red-500 text-xs mt-1 text-left"
      />

      {/* Error Icon (floating) */}
      {hasError && (
        <div className="absolute right-0 top-0 mt-2 mr-3">
          <FaExclamationCircle className="w-4 h-4 text-red-500" />
        </div>
      )}
    </div>
  );
};

export default RadioSelect;
