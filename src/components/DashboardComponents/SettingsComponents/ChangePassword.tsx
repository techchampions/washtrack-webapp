import * as Yup from "yup";
import React, { useState } from "react";
import { Form, Formik } from "formik";
import { Button, InputField } from "@/components/FormComponents";
import { useModal } from "@/store/useModal.store";
import { useChangePassword } from "@/hooks/mutations/useChangePassword";
import { ChangePasswordData } from "@/types/auth.types";
import { FaEye, FaEyeSlash } from "react-icons/fa";
// import { formatDate } from "@/utils/formatter";

const ChangePassword = () => {
  const { mutate: change, isPending } = useChangePassword();
  const modal = useModal();
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);

  const initialValues = {
    new_password: "",
    password_confirmation: "",
  };
  const validationSchema = Yup.object().shape({
    new_password: Yup.string().required("required"),
    password_confirmation: Yup.string().required("required"),
  });
  const handleChange = (values: typeof initialValues) => {
    const payload: ChangePasswordData = {
      password: values.new_password,
      password_confirmation: values.password_confirmation,
    };
    change(payload, {
      onSuccess() {
        modal.closeModal();
      },
    });
  };
  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);
  const togglePasswordVisibility2 = () => setShowPassword2((prev) => !prev);

  return (
    <div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleChange}
      >
        {({ isValid }) => (
          <Form className="space-y-5">
            <h2 className="text-2xl font-bold text-left">Change Password</h2>
            <div className="space-y-2">
              <InputField
                name="new_password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter New password"
                rightIcon={
                  showPassword ? (
                    <FaEye
                      className="text-gray-500 w-5 h-5 cursor-pointer"
                      onClick={togglePasswordVisibility}
                    />
                  ) : (
                    <FaEyeSlash
                      className="text-gray-500 w-5 h-5 cursor-pointer"
                      onClick={togglePasswordVisibility}
                    />
                  )
                }
              />
              <InputField
                name="password_confirmation"
                type={showPassword2 ? "text" : "password"}
                placeholder="Confirm password"
                rightIcon={
                  showPassword2 ? (
                    <FaEye
                      className="text-gray-500 w-5 h-5 cursor-pointer"
                      onClick={togglePasswordVisibility2}
                    />
                  ) : (
                    <FaEyeSlash
                      className="text-gray-500 w-5 h-5 cursor-pointer"
                      onClick={togglePasswordVisibility2}
                    />
                  )
                }
              />
            </div>
            <Button
              label="Save"
              type="submit"
              disabled={!isValid || isPending}
              isLoading={isPending}
            />
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ChangePassword;
