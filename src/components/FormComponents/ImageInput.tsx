import React, { useCallback, useRef } from "react";
import { ErrorMessage, useField } from "formik";
import { FaExclamationCircle } from "react-icons/fa";
import { IoTrash } from "react-icons/io5";
import { ImageUp } from "lucide-react";
import { showError } from "@/utils/toast";

interface ImageUploadFieldProps {
  name: string;
  label?: string;
  infoText?: string;
  text?: string;
  className?: string;
  acceptedFileTypes?: string[];
  maxFileSize?: number; // in bytes
  aspectRatio?: string;
  width?: number | string;
  height?: number | string;
}

const ImageUploadField: React.FC<ImageUploadFieldProps> = ({
  name,
  label,
  infoText,
  className = "",
  text = "Upload Image",
  acceptedFileTypes = ["image/jpeg", "image/png", "image/gif", "image/bmp"],
  maxFileSize = 5 * 1024 * 1024, // 5MB
  aspectRatio = "9/16",
  width = 225,
  height = 250,
}) => {
  const [field, meta, helpers] = useField(name);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const hasError = meta.touched && meta.error;

  const validateFile = useCallback(
    (file: File) => {
      if (!acceptedFileTypes.includes(file.type)) {
        return "Unsupported file format";
      }
      if (file.size > maxFileSize) {
        return `File size too large (max ${maxFileSize / 1024 / 1024}MB)`;
      }
      return null;
    },
    [acceptedFileTypes, maxFileSize]
  );

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const error = validateFile(file);
      if (error) {
        helpers.setError(error);
        showError(error);
        return;
      }
      helpers.setValue(file);
    }
  };

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    helpers.setValue(null);
    // Reset the file input
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className={`w-full ${className}`}>
      {label && <div className="mb-1 font-medium text-black">{label}</div>}

      {infoText && (
        <div className="flex items-start mb-2 text-xs text-gray-500">
          <span className="flex-1">{infoText}</span>
        </div>
      )}

      <div
        className={`relative border rounded-2xl overflow-hidden bg-gray-100 ${
          hasError ? "border-red-500" : "border-0"
        }`}
        style={{
          width: typeof width === "number" ? `${width}px` : width,
          height: typeof height === "number" ? `${height}px` : height,
          aspectRatio,
        }}
      >
        <label className="block w-full h-full cursor-pointer">
          <input
            type="file"
            name={name}
            accept={acceptedFileTypes.join(",")}
            className="hidden"
            onChange={handleFileChange}
            ref={fileInputRef}
          />

          {field.value ? (
            <>
              <img
                src={
                  field.value instanceof File
                    ? URL.createObjectURL(field.value)
                    : field.value
                }
                alt="Uploaded preview"
                className="object-cover w-full h-full"
              />
              <button
                type="button"
                className="absolute p-1 text-white bg-red-500 rounded-full top-2 right-2"
                onClick={handleRemove}
              >
                <IoTrash size={16} />
              </button>
            </>
          ) : (
            <div className="flex items-center justify-center w-full h-full text-gray-400 rounded-xl">
              <div className="flex flex-col items-center gap-2 p-4 text-center">
                {/* <div className="text-lg">+</div> */}
                <ImageUp />
                <div className="text-xs">{text}</div>
              </div>
            </div>
          )}
        </label>

        {hasError && (
          <div className="absolute top-2 right-2">
            <FaExclamationCircle className="w-5 h-5 text-red-500" />
          </div>
        )}
      </div>

      <ErrorMessage
        name={name}
        component="p"
        className="mt-1 text-xs text-left text-red-500"
      />
    </div>
  );
};

export default ImageUploadField;
