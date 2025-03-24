import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import InputField from "../FormComponents/InputField";
import { FaUser, FaEnvelope, FaLock, FaPhone } from "react-icons/fa6";
import { useOnboardingStore } from "../../store/AppStore";
import Button from "../FormComponents/Button";

const SignUp: React.FC = () => {
  const { setStep } = useOnboardingStore();
  return (
    <Formik
      initialValues={{
        businessName: "",
        phoneNumber: "",
        email: "",
        password: "",
      }}
      validationSchema={Yup.object({
        businessName: Yup.string().required("Business Name is required"),
        phoneNumber: Yup.string()
          .matches(/^\d+$/, "Phone number must be numeric")
          .min(10, "Phone number must be at least 10 digits")
          .required("Phone number is required"),
        email: Yup.string()
          .email("Invalid email address")
          .required("Email is required"),
        password: Yup.string()
          .min(6, "Password must be at least 6 characters")
          .required("Password is required"),
      })}
      onSubmit={(values) => {
        console.log("Form submitted:", values);
        setStep("verify OTP");
      }}>
      {({ isSubmitting }) => (
        <div className=" w-full">
          <div className="flex flex-col justify-center mb-4">
            <h3 className="text-2xl text-center text-brand]">Create Account</h3>
            <p className="mt-2 text-gray-400">
              Sign Up via your Phone Number and Email
            </p>
          </div>
          <Form className="flex flex-col">
            <h2 className="text-2xl font-bold text-center mb-4">Sign Up</h2>

            <InputField
              name="businessName"
              placeholder="Business Name"
              icon={<FaUser className="text-brand w-5 h-5" />}
            />
            <InputField
              name="phoneNumber"
              placeholder="Phone Number"
              icon={<FaPhone className="text-brand w-5 h-5" />}
            />
            <InputField
              name="email"
              type="email"
              placeholder="Email Address"
              icon={<FaEnvelope className="text-brand w-5 h-5" />}
            />
            <InputField
              name="password"
              type="password"
              placeholder="Password"
              icon={<FaLock className="text-brand w-5 h-5" />}
            />
            <Button label="Sign Up" type="submit" isLoading={isSubmitting} />
            <p className="text-gray-500 mt-4 text-center font-medium">
              Have an account?
              <span
                className="text-brand cursor-pointer ml-1"
                onClick={() => setStep("login")}>
                "Log in
              </span>
            </p>
          </Form>
        </div>
      )}
    </Formik>
  );
};

export default SignUp;
