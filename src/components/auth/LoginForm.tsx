/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";

import { Button } from "@/components/common/Button";
// import { FormField } from "@/components/forms/FormField";
import { useLogin } from "@/hooks/auth/useLogin";
import { LoginCredentials } from "@/types/auth.types";
import { FaEnvelope, FaLock } from "react-icons/fa6";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import logoImage from "@/assets/images/logo.png";
import { showError, showSuccess } from "@/utils/toast";
import { useAuthStore } from "@/store/auth.store";
import { useResendOtp } from "@/hooks/auth/useVerifyEmail";
import { useGetUserProfile } from "@/hooks/query/useGetUserProfile";
import { InputField } from "@/components/FormComponents";

const loginSchema = Yup.object().shape({
  email: Yup.string()
    .required("Email is required")
    .email("Invalid email address"),
  // .matches(
  //   /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  //   'Email can only contain letters, numbers, dots, hyphens, and underscores'
  // ),
  password: Yup.string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters"),
  rememberMe: Yup.boolean(),
});

const initialValues: LoginCredentials & { rememberMe: boolean } = {
  email: "",
  password: "",
  rememberMe: false,
};

export const LoginForm: React.FC = () => {
  const [showPassword, setShowPassword] = React.useState(false);
  const { loginMutation } = useLogin();
  const { isPending } = loginMutation;
  const { setToken, setAuthObject, resetAuth, setStoreUpdated } =
    useAuthStore();
  const resendOtpMutation = useResendOtp();
  const navigate = useNavigate();

  const { isError } = useGetUserProfile();
  if (isError) {
    showError("Failed to get user");
  }
  const handleSubmit = (values: LoginCredentials & { rememberMe: boolean }) => {
    const payload = {
      email: values.email,
      password: values.password,
      rememberMe: values.rememberMe,
    };

    resetAuth();

    loginMutation.mutate(payload, {
      onSuccess: (response) => {
        if (
          response.data.success &&
          (response.status === 200 || response.status === 201)
        ) {
          console.log("✅ Login success:", response.data);
          showSuccess(response.data.message);
          setToken(response.data.token);
          setAuthObject(response.data);

          if (!response.data.otpVerified) {
            resendOtpMutation.mutate({ otp: null });
            navigate("/auth/verify-email", { replace: true });
            return response.data;
          }

          console.log(
            response.data,
            "---------response data after login--------"
          );

          if (!response.data.storeUpdated) {
            setStoreUpdated(response.data.storeUpdated);
            navigate("/onboarding/store-profile-setup", { replace: true });
            return response.data;
          }
        }
      },

      onError: (error: any) => {
        // Handle specific error cases
        console.error("❌ Login error:", error.response.data.message);
        showError(error.response.data.message);
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
            Welcome
          </h3>
          <p className="mt-[1.5] text-gray-400 text-left text-sm">
            Sign in with your Email Address
          </p>
        </div>

        {/* {error && (
          <div className="px-4 py-3 text-sm text-red-700 border border-red-200 rounded-lg bg-red-50">
            {error.message}
          </div>
        )} */}

        <Formik
          initialValues={initialValues}
          validationSchema={loginSchema}
          onSubmit={handleSubmit}
        >
          {({ isValid }) => (
            <Form className="mt-8 space-y-6">
              <div className="p-0 m-0 mb-2 space-y-5">
                <InputField
                  name="email"
                  type="email"
                  placeholder="Email Address"
                  icon={<FaEnvelope className="w-3 h-3 text-brand" />}
                  // autoComplete="email"
                  // errorClassName="text-left"
                  className=" bg-white border border-gray-300 text-gray-900 text-sm rounded-lg block w-full px-2.5 outline-none resize-none"
                />
                <InputField
                  name="password"
                  type={showPassword ? "text" : "password"}
                  className=" bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-0 block w-full px-2.5 outline-none resize-none"
                  // containerClassName='border'
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
              </div>

              <div className="flex items-center justify-between p-0 m-0">
                {/* <FormField
                  name="rememberMe"
                  type="checkbox"
                  label="Remember me"
                  className="text-sm"
                /> */}

                <Link
                  to="/auth/forgot-password"
                  className="text-sm font-medium text-brand"
                >
                  Forgot password?
                </Link>
              </div>

              <Button
                style={{ borderRadius: "40px" }}
                type="submit"
                className="w-full p-0 m-0 mt-10 mb-1"
                size="md"
                loading={isPending}
                disabled={isPending || !isValid}
              >
                Sign In
              </Button>

              <div className="p-0 m-0 text-center">
                <span className="text-sm text-gray-600">
                  Don't have an account?{" "}
                  <Link
                    to="/auth/signup"
                    className="font-medium text-brand focus:ring-brand hover:brand"
                  >
                    Sign up
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
