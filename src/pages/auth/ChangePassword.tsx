import React, {
  useState,
  useRef,
  useEffect,
  ChangeEvent,
  KeyboardEvent,
} from "react";
import * as Yup from "yup";
import Button from "../../components/FormComponents/Button";
import { useChangePasswordOnboarding } from "@/hooks/mutations/useChangePassword";
import { Form, Formik } from "formik";
import { InputField } from "@/components/FormComponents";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
interface OTPProps {
  length?: number;
}

const OTPforgotPassword: React.FC<OTPProps> = ({ length = 4 }) => {
  const { mutate, isPending } = useChangePasswordOnboarding();
  const [otp, setOtp] = useState<string[]>(new Array(length).fill(""));
  const [timer, setTimer] = useState<number>(59);
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const navigate = useNavigate();
  const [isDisabled, setIsDisabled] = useState<boolean>(true);
  const inputRefs = useRef<(HTMLInputElement | null)[]>(
    new Array(length).fill(null)
  );

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  useEffect(() => {
    setIsDisabled(otp.includes(""));
  }, [otp]);

  const handleChange = (index: number, e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, "");
    if (value.length > 1) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace") {
      if (otp[index] !== "") {
        const newOtp = [...otp];
        newOtp[index] = "";
        setOtp(newOtp);
      } else if (index > 0) {
        inputRefs.current[index - 1]?.focus();
      }
    }
  };

  const handleSubmit = (values: typeof initialValues) => {
    const enteredOtp = parseInt(otp.join(""), 10);

    if (isNaN(enteredOtp) || otp.some((digit) => digit === "")) {
      return;
    }
    const payload = {
      otp: enteredOtp,
      password: values.new_password,
      password_confirmation: values.password_confirmation,
    };
    mutate(payload, {
      onSuccess() {
        navigate("/auth/login");
      },
    });
  };

  const initialValues = {
    new_password: "",
    password_confirmation: "",
  };
  const validationSchema = Yup.object().shape({
    new_password: Yup.string().required("required"),
    password_confirmation: Yup.string().required("required"),
  });

  return (
    <div className="flex flex-col items-center w-full m-auto space-y-4">
      <h3 className="text-2xl text-left text-brand font-brand-bold">
        Change Password
      </h3>

      {/* <h2 className="text-3xl font-brand-bold text-brand">
        00:{timer < 10 ? `0${timer}` : timer}
      </h2> */}
      <p className="text-gray-500 text-sm mb-8 w-[200px] text-center">
        Type the verification code sent to your email
      </p>

      <div className="flex space-x-4">
        {otp.map((value, index) => (
          <input
            key={index}
            ref={(el) => {
              inputRefs.current[index] = el;
            }}
            // ref={(el) => (inputRefs.current[index] = el)}
            type="text"
            value={value}
            maxLength={1}
            placeholder="0"
            onChange={(e) => handleChange(index, e)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            className={`w-12 h-12 border-2 text-center text-lg text-gray-500 font-brand-bold rounded-2xl focus:outline-none transition-all mb-0 focus:border-brand active:text-brand ${
              value ? "bg-brand text-white border-brand" : "border-gray-300"
            }`}
          />
        ))}
      </div>

      <div className="w-full">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isValid }) => (
            <Form className="space-y-5">
              <div className="space-y-2">
                <InputField
                  name="new_password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter New password"
                  rightIcon={
                    showPassword ? (
                      <FaEye
                        className="w-5 h-5 text-gray-500 cursor-pointer"
                        onClick={() => setShowPassword(!showPassword)}
                      />
                    ) : (
                      <FaEyeSlash
                        className="w-5 h-5 text-gray-500 cursor-pointer"
                        onClick={() => setShowPassword(!showPassword)}
                      />
                    )
                  }
                />
                <InputField
                  name="password_confirmation"
                  type={showPassword ? "text" : "password"}
                  placeholder="Confirm password"
                  rightIcon={
                    showPassword2 ? (
                      <FaEye
                        className="w-5 h-5 text-gray-500 cursor-pointer"
                        onClick={() => setShowPassword2(!showPassword2)}
                      />
                    ) : (
                      <FaEyeSlash
                        className="w-5 h-5 text-gray-500 cursor-pointer"
                        onClick={() => setShowPassword2(!showPassword2)}
                      />
                    )
                  }
                />
              </div>
              <Button
                label="Proceed"
                type="submit"
                isLoading={isPending}
                className={`w-full py-2 font-medium rounded-sm transition ${
                  isDisabled
                    ? "bg-gray-300 cursor-not-allowed"
                    : "bg-brand text-white hover:bg-blue-600"
                }`}
                disabled={isDisabled || !isValid}
              />
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};
export default OTPforgotPassword;
