import React, { useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import InputField from "../FormComponents/InputField";
import { FaEnvelope, FaLock } from "react-icons/fa6";
import { useOnboardingStore, useUserStore } from "../../store/AppStore";
import Button from "../FormComponents/Button";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Login: React.FC = () => {
  const { setStep, setHasCompletedOnboarding } = useOnboardingStore();
  const { setIsLoggedIn } = useUserStore();
  const [showPassword, setShowPassword] = useState(false);
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
      onSubmit={(values) => {
        setStep("Get Started");
        setHasCompletedOnboarding(true);
        setIsLoggedIn(true);
        console.log("Form submitted:", values);
      }}>
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
          <Form className="flex flex-col">
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
              className="mt-[100px]"
            />
            <p className="text-gray-500 mt-4 text-center font-medium">
              New Here?
              <span
                className="text-brand cursor-pointer ml-1"
                onClick={() => setStep("signup")}>
                Sign Up
              </span>
            </p>
          </Form>
        </div>
      )}
    </Formik>
  );
};

export default Login;
