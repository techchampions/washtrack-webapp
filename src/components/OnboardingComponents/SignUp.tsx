import React, { useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import InputField from "../FormComponents/InputField";
import { FaUser, FaEnvelope, FaLock, FaPhone } from "react-icons/fa6";
import { useOnboardingStore, useUserStore } from "../../store/AppStore";
import Button from "../FormComponents/Button";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import apiClient from "../../utils/AxiosInstance";
import Toast from "../GeneralComponents/Toast";

const SignUp: React.FC = () => {
  const { setStep } = useOnboardingStore();
  const { setToken, setStore, setPlanID, setReferralCode, setPhoneNumber } =
    useUserStore();
  const [showPassword, setShowPassword] = React.useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMsg, setToastMsg] = useState("");
  const [toastType, setToastType] = useState<"success" | "error">("success");

  const handleSignup = async (
    values: {
      businessName: string;
      phoneNumber: string;
      email: string;
      password: string;
    },
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
  ) => {
    try {
      const response = await apiClient.post("/register", {
        store_name: values.businessName,
        phone_num: values.phoneNumber,
        email: values.email,
        password: values.password,
        user_type: 2,
      });

      if (response.data.success) {
        setToken(response.data.token); // Save token in store
        setStore({
          id: response.data.user.id,
          name: response.data.user.store_name,
          address: "",
          description: "",
          logoUrl: "",
        });
        setToastMsg("User registered successfully!");
        setToastType("success");
        setShowToast(true);

        setPlanID(response.data.user.plan_id);
        setReferralCode(response.data.user.referral_code);
        setPhoneNumber(response.data.user.phone_num);
        localStorage.setItem("otp", response.data.otp.otp);
        console.log(response.data.otp.otp); // Save OTP for verification
        setStep("verify OTP");
      } else if (response.data.errors) {
        const errorMessages = Object.values(response.data.errors)
          .flat()
          .join("\n"); // Combine errors into a readable string
        setToastMsg(errorMessages);
        setToastType("error");
        setShowToast(true);
      }
    } catch (error: any) {
      if (error.response && error.response.data.errors) {
        const errorMessages = Object.values(error.response.data.errors)
          .flat()
          .join("\n"); // Extract and format error messages
        setToastMsg(errorMessages);
      } else {
        setToastMsg("Something went wrong. Please try again.");
      }
      setToastType("error");
      setShowToast(true);
      console.error("Signup failed:", error);
    } finally {
      setSubmitting(false);
    }
  };

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
      validateOnMount={true}
      onSubmit={handleSignup}
    >
      {({ isSubmitting, isValid }) => (
        <div className=" w-full">
          <div className="flex flex-col justify-center mb-10 mt-6">
            <h3 className="text-[20px] text-center font-brand-bold text-brand">
              Create Account
            </h3>
            <p className="mt-2 text-gray-400">
              Sign Up via your Phone Number and Email
            </p>
          </div>
          <Form className="flex flex-col mt-4 space-y-3">
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
            <div className="flex items-center mb-8">
              <input
                type="checkbox"
                name="agree"
                className="mr-2 text-brand bg-brand"
                required
              />
              <p className="text-gray-500 text-[10px]">
                By continuing, you agree to our
                <a
                  href="/terms"
                  className="text-brand mx-1"
                  target="_blank"
                  rel="noreferrer"
                >
                  Terms of Service
                </a>
                and
                <a
                  href="/terms"
                  className="text-brand mx-1"
                  target="_blank"
                  rel="noreferrer"
                >
                  Privacy Policy
                </a>
              </p>
            </div>

            <Button
              label="Sign Up"
              type="submit"
              disabled={isSubmitting || !isValid}
              isLoading={isSubmitting}
              className="mt-[70px]"
            />
            <p className="text-gray-500 mt-4 text-center text-sm font-medium">
              Have an account?
              <span
                className="text-brand cursor-pointer ml-1"
                onClick={() => setStep("login")}
              >
                Sign In
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

export default SignUp;
