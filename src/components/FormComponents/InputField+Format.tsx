import { ErrorMessage, Field, useField } from "formik";
import React, { useEffect, useState } from "react";
import { FaExclamationCircle } from "react-icons/fa";

interface InputFieldFormattedProps {
  type?:
    | "text"
    | "email"
    | "tel"
    | "password"
    | "number"
    | "checkbox"
    | "textarea";
  placeholder?: string;
  label?: string;
  name: string;
  icon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  className?: string;
  rows?: number;
  isReadOnly?: boolean;
  autocomplete?: string;
  formatAsNaira?: boolean;
}

const formatToNaira = (value: string | number | null | undefined): string => {
  if (value === null || value === undefined || value === "") return "";

  const numberValue = parseFloat(value.toString().replace(/[^0-9.]/g, ""));
  if (isNaN(numberValue)) return "";

  return (
    "₦" + numberValue.toLocaleString("en-NG", { minimumFractionDigits: 0 })
  );
};

const InputFieldFormatted: React.FC<InputFieldFormattedProps> = ({
  type = "text",
  placeholder,
  label,
  name,
  icon,
  rightIcon,
  className = "",
  rows = 4,
  isReadOnly = false,
  autocomplete,
  formatAsNaira = false,
}) => {
  const [field, meta, helpers] = useField(name);
  const { setValue } = helpers;
  const [displayValue, setDisplayValue] = useState<string>("");

  const isTextarea = type === "textarea";
  const hasError = meta.touched && meta.error;

  useEffect(() => {
    if (formatAsNaira && field.value !== undefined) {
      setDisplayValue(formatToNaira(field.value));
    }
  }, [field.value, formatAsNaira]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputVal = e.target.value.replace(/[^0-9]/g, "");
    if (formatAsNaira) {
      setValue(inputVal);
      setDisplayValue(formatToNaira(inputVal));
    } else {
      setValue(inputVal);
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    field.onBlur(e); // Mark field as touched
  };

  return (
    <div className="w-full">
      {label && (
        <div className="text-gray-800 mb-0.5 text-xs sm:text-sm text-left font-medium">
          {label}
        </div>
      )}
      <div
        className={`w-full relative flex ${
          isTextarea ? "flex-col" : "flex-row"
        } border bg-white rounded-lg py-px ${
          hasError ? "border-red-500" : "border-gray-300"
        } ${className}`}
      >
        {/* Left Icon */}
        {icon && !isTextarea && (
          <div className="flex items-center px-3">{icon}</div>
        )}

        {/* Field */}
        {formatAsNaira ? (
          <input
            type="text"
            name={name}
            value={displayValue}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder={placeholder}
            readOnly={isReadOnly}
            autoComplete={autocomplete}
            className={` text-gray-900 text-sm rounded-lg focus:ring-0 block w-full p-2.5 outline-none resize-none`}
          />
        ) : (
          <Field
            as={isTextarea ? "textarea" : "input"}
            {...field}
            type={isTextarea ? undefined : type}
            placeholder={placeholder}
            rows={isTextarea ? rows : undefined}
            readOnly={isReadOnly}
            autoComplete={autocomplete}
            className={` text-gray-900 text-base rounded-lg focus:ring-0 block w-full px-5 outline-none resize-none h-4 placeholder:text-sm ${
              isTextarea ? "min-h-[60px]" : ""
            }`}
          />
        )}

        {/* Error Icon */}
        {!isTextarea && hasError && (
          <div className="flex items-center px-3">
            <FaExclamationCircle className="w-5 h-5 text-red-500" />
          </div>
        )}

        {/* Right Icon */}
        {rightIcon && <div className="flex items-center pr-3">{rightIcon}</div>}
      </div>

      {/* Error Message */}
      <ErrorMessage
        name={name}
        component="p"
        className="mt-1 ml-5 text-xs text-left text-red-500"
      />
    </div>
  );
};

export default InputFieldFormatted;
