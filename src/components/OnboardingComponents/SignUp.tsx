
import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import InputField from '../FormComponents/InputField';
import { FaUser, FaEnvelope, FaLock, FaPhone } from "react-icons/fa6";
import { useOnboardingStore } from "../../store/AppStore";


const SignUp: React.FC = () => {
  const {setStep} = useOnboardingStore()
  const handleSignUp =()=>{
    setStep("verify OTP");
  }
  return (
    <Formik
      initialValues={{ fullName: "", email: "", password: "" }}
      validationSchema={Yup.object({
        fullName: Yup.string().required("Full Name is required"),
        email: Yup.string().email("Invalid email address").required("Email is required"),
        password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
      })}
      onSubmit={(values) => {
        console.log("Form submitted:", values);
      }}
    >
      {({ isSubmitting }) => (
      <div className=" w-full">
        <div className="flex flex-col justify-center mb-4">
          <h3 className="text-2xl text-center text-[#00BCFF]">Create Account</h3>
          <p className="mt-2 text-gray-400">Sign Up via your Phone Number and Email</p>
        </div>
        <Form className="flex flex-col">

          <h2 className="text-2xl font-bold text-center mb-4">Sign Up</h2>

          <InputField name="business name" placeholder="Business Name" icon={<FaUser className="text-blue-500 w-5 h-5" />} />
          <InputField name="Phone number" placeholder="Phone Number" icon={<FaPhone className="text-blue-500 w-5 h-5" />} />
          <InputField name="email" type="email" placeholder="Email Address" icon={<FaEnvelope className="text-blue-500 w-5 h-5" />}/>
          <InputField name="password" type="password" placeholder="Password" icon={<FaLock className="text-blue-500 w-5 h-5" />} />


          <div className="flex rounded-full w-full overflow-hidden gap-2 mt-2">

          <button className="w-[30%] rounded-sm bg-gray-300 hover:bg-gray-600 text-white" onClick={()=>setStep("Get Started")}>Go Back</button>
          <button
            type="submit"
            className="w-[70%] bg-brand text-white py-2 rounded-sm hover:bg-blue-600"
            disabled={isSubmitting}
            onClick={handleSignUp}
            >
            {isSubmitting ? "Submitting..." : "Sign Up"}
          </button>
          </div>
        </Form>
        </div>
      )}
    </Formik>
  );
};

export default SignUp;
