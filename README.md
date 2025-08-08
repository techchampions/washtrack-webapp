# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config({
  extends: [
    // Remove ...tseslint.configs.recommended and replace with this
    ...tseslint.configs.recommendedTypeChecked,
    // Alternatively, use this for stricter rules
    ...tseslint.configs.strictTypeChecked,
    // Optionally, add this for stylistic rules
    ...tseslint.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config({
  plugins: {
    // Add the react-x and react-dom plugins
    'react-x': reactX,
    'react-dom': reactDom,
  },
  rules: {
    // other rules...
    // Enable its recommended typescript rules
    ...reactX.configs['recommended-typescript'].rules,
    ...reactDom.configs.recommended.rules,
  },
})
```


 services: services.map((service, index) => {
                  console.log("Service in AddService:", service, index);
                  console.log(editIndex, "Edit Index in AddServices:", editIndex);
                  console.log("Store Items in AddServices:", storeItems?.itemType[editIndex] );
                  const existing =
                    editIndex !== null
                      ? storeItems?.itemType[editIndex]['services'].find(
                        (s) => s.item_id === service.id
                      )
                      : null;

                      console.log("Existing Service:", existing);
                  // console.log("Service in AddServices:", service);
                  

                  return {
                    service_id: service.id,
                    service_name: service.service_name,
                    price:
                      existing !== null ? existing.price : service.price ?? "", // 👈 fallback to global state price
                    estimated_hours:
                      existing !== null
                        ? existing.estimated_hours
                        : service.estimated_hours ?? "", // 👈 fallback to global state hours
                  };
      





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
