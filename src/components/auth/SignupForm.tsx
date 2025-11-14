/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Formik, Form, FormikHelpers } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import { Button } from "@/components/common/Button";
// import { FormField } from "@/components/forms/FormField";
import { FaEnvelope, FaLock, FaUser, FaPhone, FaShare } from "react-icons/fa6";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import logoImage from "@/assets/images/logo.png";
import { SignupData } from "@/types/auth.types";
import { showError, showSuccess } from "@/utils/toast";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@/store/auth.store";
import { useSignup } from "@/hooks/auth/useSignup";
import { InputField } from "@/components/FormComponents";

const signupSchema = Yup.object().shape({
  store_name: Yup.string()
    .required("Business name is required")
    .min(2, "Business name must be at least 2 characters")
    .max(50, "Business name must be less than 50 characters"),
  email: Yup.string()
    .required("Email is required")
    .email("Invalid email address"),
  // .matches(
  //   /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  //   "Email can only contain letters, numbers, dots, hyphens, and underscores"
  // )
  phone: Yup.string()
    .matches(/^[+]?[\d\s\-()]+$/, "Invalid phone number format")
    .min(10, "Phone number must be at least 10 digits"),
  password: Yup.string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters"),
  // .matches(
  //     /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
  //     'Password must contain at least one uppercase letter, one lowercase letter, and one number'
  // ),
  referral_code: Yup.string().optional(),
});

const initialValues: SignupData = {
  email: "",
  password: "",
  store_name: "",
  phone_num: "",
  referral_code: "",
};

export const SignupForm: React.FC = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = React.useState(false);
  const { resetAuth, setAuthObject, setToken } = useAuthStore();
  const { signUpMutation } = useSignup();
  const { isPending } = signUpMutation;

  const handleSubmit = async (
    values: SignupData,
    { setSubmitting, setErrors }: FormikHelpers<SignupData>
  ) => {
    const payload = {
      ...values,
      user_type: 2,
    };
    resetAuth();
    signUpMutation.mutate(payload, {
      onSuccess: (response) => {
        if (
          response.data.success &&
          (response.status === 200 || response.status === 201)
        ) {
          showSuccess(response.data.message);
          // setUser(response.data.user);
          setAuthObject(response.data);
          setToken(response.data.token);
          console.log(
            response,
            response.data,
            "---------response data--------"
          );

          navigate("/auth/verify-email");
        }
      },
      onError: (error: any) => {
        console.error("Unexpected error:", error);
        if (error.response?.data?.errors) {
          const serverErrors: Record<string, string> = {};
          Object.entries(error.response.data.errors).forEach(
            ([field, messages]) => {
              if (Array.isArray(messages) && messages.length > 0) {
                serverErrors[field] = messages[0];
              }
            }
          );
          setErrors(serverErrors);
        } else {
          console.error("Unexpected error:", error);
          showError(error.response.data.message);
        }
      },
      onSettled: () => {
        setSubmitting(false);
      },
    });
  };

  return (
    <div className="flex items-center justify-center bg-transparent">
      <div className="min-h-[70%] space-y-2 bg-white px-8 py-8 rounded-2xl md:shadow-xl md:p-10">
        <div className="flex items-center justify-center h-0 p-0 mt-3 mb-7 ">
          <img src={logoImage} alt="Wash Track" className="w-25 h-25" />
          {/* <div className="ml-5" /> */}
        </div>

        <div className="flex flex-col items-start justify-start my-4">
          <h3 className="text-2xl text-left md:text-3xl font-brand-bold text-brand">
            Create Account
          </h3>
          <p className="mt-[1.5] text-sm text-gray-400 text-left">
            Sign up via your phone number & email
          </p>
        </div>

        {/* {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-[2.5] rounded-lg text-sm">
            {error.message}
          </div>
        )} */}

        <Formik
          initialValues={initialValues}
          validationSchema={signupSchema}
          onSubmit={handleSubmit}
        >
          {({ isValid }) => (
            <Form className="mt-2 space-y-6">
              <div className="space-y-2">
                <InputField
                  name="store_name"
                  type="text"
                  placeholder="Business Name"
                  icon={<FaUser className="w-3 h-3 text-brand" />}
                  // autoComplete="store_name"
                  // errorClassName="text-left"
                  className=" bg-white border text-gray-900 text-sm rounded-lg block w-full px-2.5 outline-none resize-none"
                />
                <InputField
                  name="phone_num"
                  type="number"
                  placeholder="Phone No"
                  icon={<FaPhone className="w-3 h-3 text-brand" />}
                  // autoComplete="phone_num"
                  // errorClassName="text-left"
                  className="mt-1.5 bg-white border text-gray-900 text-sm rounded-lg block w-full px-2.5 outline-none resize-none"
                />
                <InputField
                  name="email"
                  type="email"
                  placeholder="Email Address"
                  icon={<FaEnvelope className="w-3 h-3 text-brand" />}
                  // autoComplete="email"
                  // errorClassName="text-left"
                  className="mt-1.5 bg-white border text-gray-900 text-sm rounded-lg block w-full px-2.5 outline-none resize-none"
                />
                <InputField
                  name="password"
                  type={showPassword ? "text" : "password"}
                  className="mt-2 bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-0 block w-full px-2.5 outline-none resize-none"
                  placeholder="Password"
                  icon={<FaLock className="w-3 h-3 text-brand" />}
                  rightIcon={
                    <button
                      type="button"
                      className="text-gray-400 hover:text-gray-600"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <FaEyeSlash className="w-3 h-3 text-gray-500 cursor-pointer" />
                      ) : (
                        <FaEye className="w-3 h-3 text-gray-500 cursor-pointer" />
                      )}
                    </button>
                  }
                  // autoComplete="password"
                  // errorClassName="text-left"
                />
                <InputField
                  name="referral_code"
                  type="text"
                  placeholder="Referral code"
                  icon={<FaShare className="w-3 h-3 text-brand" />}
                  // autoComplete="referral_code"
                  // errorClassName="text-left"
                  className="mt-1 bg-white border text-gray-900 text-sm rounded-lg block w-full px-2.5 outline-none resize-none"
                />
              </div>

              <div className="flex flex-row w-full">
                <div className="">
                  <input
                    type="checkbox"
                    name="agree"
                    className=" text-brand bg-brand"
                    required
                  />
                </div>

                <div className="w-full ml-1 text-xs text-left">
                  <span className="text-gray-500">
                    By continuing, you agree to our
                  </span>
                  <span>
                    <a
                      href="https://washtrack.ng/privacy"
                      className="text-brand"
                      target="_blank"
                      rel="noreferrer"
                    >
                      Terms of Service
                    </a>
                  </span>

                  <span className="mx-1 text-gray-500">and</span>
                  <span>
                    <a
                      href="https://washtrack.ng/privacy"
                      className="text-brand"
                      target="_blank"
                      rel="noreferrer"
                    >
                      Privacy Policy
                    </a>
                  </span>
                </div>
              </div>

              <Button
                style={{ borderRadius: "40px" }}
                type="submit"
                className="w-full p-0 m-0 mb-1"
                size="md"
                loading={isPending}
                disabled={isPending || !isValid}
              >
                Sign Up
              </Button>

              <div className="p-0 m-0 text-center">
                <span className="text-sm text-gray-600">
                  Have an account?{" "}
                  <Link to="/auth/login" className="font-medium text-brand">
                    Sign In
                  </Link>
                </span>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};
