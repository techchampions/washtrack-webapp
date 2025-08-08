import React from 'react';
import { useField } from 'formik';
import { FormFieldProps } from './FormField.types';

export const FormField: React.FC<FormFieldProps> = ({
  name,
  label,
  type = 'text',
  placeholder,
  icon,
  rightIcon,
  className = '',
  containerClassName = '',
  labelClassName = '',
  inputClassName = '',
  errorClassName = '',
  disabled = false,
  required = false,
  ...props
}) => {
  const [field, meta, helpers] = useField(name);
  const hasError = meta.touched && meta.error;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (type === 'checkbox') {
      helpers.setValue(e.target.checked);
    } else {
      helpers.setValue(e.target.value);
    }
    field.onChange(e);
  };

  const inputId = `field-${name}`;

  const baseInputStyles = `
    block w-full rounded-lg border-gray-300 shadow-sm
    transition-colors duration-200
    focus:border-gray-200 focus:ring-gray-200
    disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed
    ${hasError ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : ''}
    ${icon ? 'pl-10' : 'pl-4'}
    ${rightIcon ? 'pr-10' : 'pr-4'}
    py-3
  `;

  const checkboxStyles = `
    h-4 w-4 text-indigo-600 border-gray-300 rounded
    focus:ring-indigo-500 focus:ring-offset-0
    transition-colors duration-200
    ${hasError ? 'border-red-300' : ''}
  `;

  if (type === 'checkbox') {
    return (
      <div className={`flex items-center ${containerClassName}`}>
        <input
          {...field}
          {...props}
          id={inputId}
          type="checkbox"
          checked={field.value || false}
          onChange={handleChange}
          disabled={disabled}
          className={`${checkboxStyles} ${inputClassName}`}
        />
        {label && (
          <label 
            htmlFor={inputId} 
            className={`ml-3 text-sm font-medium text-gray-700 cursor-pointer ${labelClassName}`}
          >
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}
        {hasError && (
          <p className={`ml-3 text-sm text-red-600 ${errorClassName}`}>
            {meta.error}
          </p>
        )}
      </div>
    );
  }

  return (
    <div className={`space-y-1 ${containerClassName}`}>
      {label && (
        <label 
          htmlFor={inputId} 
          className={`block text-sm font-medium text-gray-700 ${labelClassName}`}
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      
      <div className="relative">
        {icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            {icon}
          </div>
        )}
        
        <input
          {...field}
          {...props}
          id={inputId}
          type={type}
          placeholder={placeholder}
          onChange={handleChange}
          disabled={disabled}
          className={`${baseInputStyles} ${inputClassName}`}
        />
        
        {rightIcon && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
            {rightIcon}
          </div>
        )}
      </div>
      
      {hasError && (
        <p className={`text-sm text-red-600 ${errorClassName}`}>
          {meta.error}
        </p>
      )}
    </div>
  );
};