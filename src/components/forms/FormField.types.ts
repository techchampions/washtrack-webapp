export type FormFieldProps =
  | ({
      type?: "text" | "email" | "password" | "number";
    } & React.InputHTMLAttributes<HTMLInputElement>)
  | ({
      type: "checkbox";
    } & React.InputHTMLAttributes<HTMLInputElement>)
  | ({
      type: "textarea";
    } & React.TextareaHTMLAttributes<HTMLTextAreaElement>);

interface CommonProps {
  name: string;
  label?: string;
  icon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  className?: string;
  containerClassName?: string;
  labelClassName?: string;
  inputClassName?: string;
  errorClassName?: string;
  disabled?: boolean;
  required?: boolean;
}

export type FinalFormFieldProps = FormFieldProps & CommonProps;
