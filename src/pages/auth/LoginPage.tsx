import React, { useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import InputField from "../../components/FormComponents/InputField";
import { FaEnvelope, FaLock } from "react-icons/fa6";
import Button from "../../components/FormComponents/Button";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Toast from "../../components/GeneralComponents/Toast";
import { useAuthStore, useOnboardingStore } from "@/store/onboardingStore";

const Login: React.FC = () => {
  const { setStep, setHasCompletedOnboarding } = useOnboardingStore();
  const { loginUser } = useAuthStore();
  const [showPassword, setShowPassword] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMsg, setToastMsg] = useState("");
  const [toastType, setToastType] = useState<"success" | "error">("success");

  const handleLogin = async (
    values: {
      email: string;
      password: string;
    },
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
  ) => {
    const dto = {
      email: values.email,
      password: values.password,
    };
    try {
      const response = await loginUser(dto);
      console.log(response, "---------- In login ------");

      if (response.status == 200) {
       
        setToastMsg(response.message);
        setToastType("success");
        setShowToast(true);
        setStep("Get Started");
        setHasCompletedOnboarding(true);
      }
    } catch (error) {
      setToastMsg(error.response.data.message);
      setToastType("error");
      setShowToast(true);
      console.error("Login failed:", error);
    }
    {
      setSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
      }}
      validationSchema={Yup.object({
        email: Yup.string()
          .email("Invalid email address")
          .required("Email is required"),
        password: Yup.string().required("Password is required"),
      })}
      onSubmit={handleLogin}
    >
      {({ isSubmitting }) => (
        <div className="w-full">
          <div className="flex flex-col justify-start text-left mb-8 mt-20">
            <h3 className="text-4xl font-brand-bold text-brand text-left">
              Welcome
            </h3>
            <p className="mt-2 text-gray-400 text-left">
              SignIn via your Email Address
            </p>
          </div>
          <Form className="flex flex-col space-y-3">
            <InputField
              name="email"
              type="email"
              placeholder="Email Address"
              icon={<FaEnvelope className="text-brand w-5 h-5" />}
            />
            <InputField
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              icon={<FaLock className="text-brand w-5 h-5" />}
              rightIcon={
                showPassword ? (
                  <FaEyeSlash
                    className="text-gray-500 w-5 h-5 cursor-pointer"
                    onClick={() => setShowPassword(false)}
                  />
                ) : (
                  <FaEye
                    className="text-gray-500 w-5 h-5 cursor-pointer"
                    onClick={() => setShowPassword(true)}
                  />
                )
              }
            />
            <a href="#" className="text-brand text-sm text-left">
              Forgot password?
            </a>

            <Button
              label="Sign In"
              type="submit"
              isLoading={isSubmitting}
              disabled={isSubmitting}
              className="mt-[100px]"
            />
            <p className="text-gray-500 mt-4 text-center font-medium">
              New Here?
              <span
                className="text-brand cursor-pointer ml-1"
                onClick={() => setStep("signup")}
              >
                Sign Up
              </span>
            </p>
          </Form>
          {showToast && (
            <Toast
              message={toastMsg}
              type={toastType}
              onClose={() => setShowToast(false)}
            />
          )}
        </div>
      )}
    </Formik>
  );
};

export default Login;
