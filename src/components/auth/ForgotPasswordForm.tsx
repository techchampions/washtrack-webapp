import { Form, Formik } from "formik";
import * as Yup from "yup";
import logoImage from "@/assets/images/logo.png";
import React from "react";
import { Button, InputField } from "@/components/FormComponents";
import { FaEnvelope } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useForgotPassword } from "@/hooks/mutations/useChangePassword";
import { ForgotPasswordData } from "@/types/auth.types";
import { useModal } from "@/store/useModal.store";
import OTPforgotPassword from "@/pages/auth/ChangePassword";

const ForgotPasswordForm = () => {
  const { mutate, isPending } = useForgotPassword();
  const modal = useModal();
  const initialValues = {
    email: "",
  };
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .required("Email is required")
      .email("Invalid email address"),
    // .matches(
    //   /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    //   'Email can only contain letters, numbers, dots, hyphens, and underscores'
    // ),
  });
  const handleSubmit = (values: typeof initialValues) => {
    const payload: ForgotPasswordData = {
      email: values.email,
    };
    mutate(payload, {
      onSuccess() {
        modal.openModal(<OTPforgotPassword />);
      },
    });
  };

  return (
    <div className="flex items-center justify-center bg-transparent">
      <div className="px-8 py-10 space-y-8 bg-white rounded-2xl md:shadow-xl md:px-15">
        <div className="flex items-center justify-center h-0 p-0 m-0 ">
          <img src={logoImage} alt="Wash Track" className="p-0 m-0 w-25 h-25" />
          <div className="ml-5" />
        </div>

        <div className="flex flex-col items-start justify-center my-4 mt-6">
          <h3 className="text-2xl text-left md:text-3xl font-brand-bold text-brand">
            Forgot Password?
          </h3>
          <p className="mt-[1.5] text-gray-400 text-left text-sm">
            No worries, we’ll send recovery instructions{" "}
          </p>
        </div>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
          //   onSubmit={(values, { setSubmitting }) =>
          //     handleSubmit(values, setSubmitting)
          //   }
        >
          {({ isValid }) => (
            <Form className="">
              <InputField
                name="email"
                type="email"
                placeholder="Email Address"
                icon={<FaEnvelope className="w-3 h-3 text-brand" />}
                className=" bg-white border border-gray-300 text-gray-900 text-sm rounded-lg block w-full px-2.5 outline-none resize-none"
              />
              <div className="mt-10 space-y-2">
                <Button
                  type="submit"
                  isLoading={isPending}
                  disabled={isPending || !isValid}
                  label="Reset Password"
                  className="w-full py-2 mt-10 rounded-full"
                />
                <Link
                  to={`/auth/login`}
                  className="pb-[1px] border-b-1 border-brand text-brand"
                >
                  {" "}
                  Back to Login
                </Link>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default ForgotPasswordForm;
