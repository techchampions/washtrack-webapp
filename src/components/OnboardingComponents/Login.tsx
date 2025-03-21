import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import InputField from "../FormComponents/InputField";
import { FaEnvelope, FaLock } from "react-icons/fa6";
import { useOnboardingStore } from "../../store/AppStore";

const Login: React.FC = () => {
  const {setStep} = useOnboardingStore()
  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
      }}
      validationSchema={Yup.object({
        email: Yup.string().email("Invalid email address").required("Email is required"),
        password: Yup.string().required("Password is required"),
      })}
      onSubmit={(values) => {
        console.log("Login submitted:", values);
      }}
    >
      {({ isSubmitting }) => (
        <div className="w-full">
          <div className="flex flex-col justify-center mb-6">
            <h3 className="text-2xl text-center text-[#00BCFF]">Welcome Back</h3>
            <p className="mt-2 text-gray-400">Login with your Email and Password</p>
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

            <div className="flex rounded-full w-full overflow-hidden gap-2 mt-2">

                <button className="w-[30%] rounded-sm bg-gray-300 hover:bg-gray-600 text-white" onClick={()=>setStep("Get Started")}>Go Back</button>

                <button
                  type="submit"
                  className="w-[70%] bg-brand text-white py-2 rounded-sm hover:bg-blue-600"
                  disabled={isSubmitting}
                >
                {isSubmitting ? "Logging in..." : "Login"}
              </button>
            </div>
          </Form>
        </div>
      )}
    </Formik>
  );
};

export default Login;
