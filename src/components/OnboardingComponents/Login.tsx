import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import InputField from "../FormComponents/InputField";
import { FaEnvelope, FaLock } from "react-icons/fa6";
import { useOnboardingStore } from "../../store/AppStore";
import Button from "../FormComponents/Button";

const Login: React.FC = () => {
  const { setStep } = useOnboardingStore();
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
        setStep("verify OTP");
      }}>
      {({ isSubmitting }) => (
        <div className="w-full">
          <div className="flex flex-col justify-center mb-6">
            <h3 className="text-2xl text-center text-[#00BCFF]">
              Welcome Back
            </h3>
            <p className="mt-2 text-gray-400">
              Login with your Email and Password
            </p>
          </div>
          <Form className="flex flex-col">
            <InputField
              name="email"
              type="email"
              placeholder="Email Address"
              icon={<FaEnvelope className="text-blue-500 w-5 h-5" />}
            />
            <InputField
              name="password"
              type="password"
              placeholder="Password"
              icon={<FaLock className="text-blue-500 w-5 h-5" />}
            />

            <Button label="Login" type="submit" isLoading={isSubmitting} />
            <p className="text-gray-500 mt-4 text-center font-medium">
              New Here?
              <span
                className="text-blue-500 cursor-pointer ml-1"
                onClick={() => setStep("signup")}>
                Sign up
              </span>
            </p>
          </Form>
        </div>
      )}
    </Formik>
  );
};

export default Login;
