import { InputHTMLAttributes, ReactNode } from 'react';

export interface FormFieldProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
    /**
     * Field name for Formik
     */
    name: string;

    /**
     * Field label
     */
    label?: ReactNode;

    /**
     * Input type
     */
    type?: 'text' | 'email' | 'password' | 'tel' | 'url' | 'search' | 'number' | 'checkbox';

    /**
     * Placeholder text
     */
    placeholder?: string;

    /**
     * Icon to display on the left side
     */
    icon?: ReactNode;

    /**
     * Icon to display on the right side (e.g., show/hide password)
     */
    rightIcon?: ReactNode;

    /**
     * Additional CSS classes for the container
     */
    containerClassName?: string;

    /**
     * Additional CSS classes for the label
     */
    labelClassName?: string;

    /**
     * Additional CSS classes for the input
     */
    inputClassName?: string;

    /**
     * Additional CSS classes for the error message
     */
    errorClassName?: string;

    /**
     * Whether the field is required
     */
    required?: boolean;
}