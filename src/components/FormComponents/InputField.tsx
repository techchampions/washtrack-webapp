// import React from "react";
// import { Field, ErrorMessage, useField } from "formik";
// import { FaExclamationCircle } from "react-icons/fa"; // Error Icon

// interface InputFieldProps {
//   type?: "text" | "email" | "password" | "number" | "checkbox";
//   placeholder?: string;
//   name: string;
//   icon?: React.ReactNode; // Allows any React icon
//   rightIcon?: React.ReactNode; // Allows any React icon
//   className?: string;
// }

// const InputField: React.FC<InputFieldProps> = ({
//   type = "text",
//   placeholder,
//   name,
//   icon,
//   rightIcon,
//   className = "",
// }) => {
//   const [field, meta] = useField(name); // Get Formik field state

//   return (
//     <div className="w-full ">
//       <div
//         className={`w-full relative flex flex-row border rounded-lg py-[1px] ${
//           meta.touched && meta.error ? "border-red-500" : "border-gray-300"
//         } ${className}`}
//       >
//         {/* Left Icon */}
//         {icon && <div className="flex items-center px-3">{icon}</div>}

//         {/* Input Field */}
//         <Field
//           {...field}
//           type={type}
//           placeholder={placeholder}
//           className={`bg-white text-gray-900 text-sm rounded-lg focus:ring-0 block w-full p-2.5 outline-none `}
//         />

//         {/* Error Icon */}
//         {meta.touched && meta.error && (
//           <div className="flex items-center px-3">
//             <FaExclamationCircle className="w-5 h-5 text-red-500" />
//           </div>
//         )}
//         {/* Right Icon */}
//         {rightIcon && <div className="flex items-center pr-3">{rightIcon}</div>}
//       </div>

//       {/* Error Message */}
//       <ErrorMessage
//         name={name}
//         component="p"
//         className="mt-1 text-xs text-left text-red-500"
//       />
//     </div>
//   );
// };

// export default InputField;

import React from "react";
import { Field, ErrorMessage, useField } from "formik";
import { FaExclamationCircle } from "react-icons/fa"; // Error Icon

interface InputFieldProps {
  type?: "text" | "email" | "password" | "number" | "checkbox" | "textarea";
  placeholder?: string;
  size?: "sm" | "md" | "lg";
  name: string;
  editable?: boolean;
  icon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  className?: string;
  rows?: number; // for textarea
}

const InputField: React.FC<InputFieldProps> = ({
  type = "text",
  placeholder,
  size = "md",
  name,
  editable = true,
  icon,
  rightIcon,
  className = "",
  rows = 4,
}) => {
  const [field, meta] = useField(name);

  const isTextarea = type === "textarea";

  return (
    <div className="w-full">
      <div
        className={`w-full relative flex bg-white ${
          isTextarea ? "flex-col" : "flex-row"
        } border rounded-lg ${
          size === "sm" ? "py-0" : size === "lg" ? "py-1" : "py-[1px]"
        } ${
          meta.touched && meta.error ? "border-red-500" : "border-gray-300"
        } ${className}`}
      >
        {/* Icon */}
        {icon && !isTextarea && (
          <div className="flex items-center px-3">{icon}</div>
        )}

        {/* Input or Textarea */}
        <Field
          as={isTextarea ? "textarea" : "input"}
          {...field}
          disabled={!editable}
          type={isTextarea ? undefined : type}
          placeholder={placeholder}
          rows={isTextarea ? rows : undefined}
          className={` text-gray-900 text-sm rounded-lg focus:ring-0 block w-full ${
            size === "sm" ? "p-1" : size === "lg" ? "p-4" : "p-2.5"
          } outline-none resize-none`}
        />

        {/* Error Icon */}
        {!isTextarea && meta.touched && meta.error && (
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
        className="mt-1 text-xs text-left text-red-500"
      />
    </div>
  );
};

export default InputField;
