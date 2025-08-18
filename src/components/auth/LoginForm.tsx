import React, { useEffect } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';

import { Button } from '@/components/common/Button';
import { FormField } from '@/components/forms/FormField';
import { useLogin } from '@/hooks/auth/useLogin';
import { LoginCredentials } from '@/types/auth.types';
import { FaEnvelope, FaLock } from 'react-icons/fa6';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import logoImage from "@/assets/images/logo.png";


const loginSchema = Yup.object().shape({
  email: Yup.string()
    .required('Email is required')
    .email('Invalid email address')
    .matches(
      /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      'Email can only contain letters, numbers, dots, hyphens, and underscores'
    ),
  password: Yup.string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters'),
  rememberMe: Yup.boolean(),
});

const initialValues: LoginCredentials & { rememberMe: boolean } = {
  email: '',
  password: '',
  rememberMe: false,
};

export const LoginForm: React.FC = () => {
  const [showPassword, setShowPassword] = React.useState(false);
  const { mutate: login, isPending, error, data } = useLogin();

  const handleSubmit = (values: LoginCredentials & { rememberMe: boolean }) => {
    login({
      email: values.email,
      password: values.password,
      rememberMe: values.rememberMe,
    });
  };

  useEffect(() => {
    // Reset form state on mount
    console.log(isPending, "--------isloading--------");
    console.log(data, "----------data----------");
  }, [isPending]);

  return (
    <div className="flex items-center justify-center bg-transparent">

      <div className="py-10 space-y-8 bg-white px-8 rounded-2xl md:shadow-xl px-15">

        <div className=' justify-center items-center h-0  p-0 m-0 flex'>
          <img
            src={logoImage}
            alt="Wash Track"
            className="w-25 h-25 p-0 m-0"
          />
          <div className='ml-5' />
        </div>

        <div className="my-4 flex flex-col justify-start justify-center items-center mt-6">
          <h3 className="text-2xl font-brand-bold text-brand text-left">
            Welcome
          </h3>
          <p className="mt-[1.5] text-gray-400 text-left">
            Sign in with your Email Address
          </p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
            {error.message}
          </div>
        )}

        <Formik
          initialValues={initialValues}
          validationSchema={loginSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (

            <Form className="mt-8 space-y-6">
              <div className="space-y-5 p-0 m-0 mb-2">
                <FormField
                  name="email"
                  type="email"
                  placeholder="Email Address"
                  icon={<FaEnvelope className="text-brand w-3 h-3" />}
                  autoComplete="email"
                  errorClassName='text-left'
                  inputClassName=" bg-white border border-gray-300 text-gray-900 text-sm rounded-lg block w-full px-2.5 outline-none resize-none"
                />
                <FormField
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  inputClassName="text-sm bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-0 block w-full px-2.5 outline-none resize-none"
                  // containerClassName='border'
                  placeholder="Password"
                  icon={<FaLock className="text-brand w-3 h-3" />}
                  rightIcon={
                    <button
                      type="button"
                      className="text-gray-400 hover:text-gray-600"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <FaEyeSlash className="h-3 w-3 text-gray-500 cursor-pointer" />
                      ) : (
                        <FaEye className="h-3 w-3 text-gray-500 cursor-pointer" />
                      )}
                    </button>
                  }
                  autoComplete="password"
                  errorClassName='text-left'
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
                  className="text-sm text-brand font-medium"
                >
                  Forgot password?
                </Link>
              </div>

              <Button
                style={{ "borderRadius": "40px" }}
                type="submit"
                className="w-full p-0 m-0  mb-1 mt-10"
                size="md"
                loading={isPending}
                disabled={isPending}
              >
                Sign In
              </Button>

              <div className="text-center p-0 m-0">
                <span className="text-sm text-gray-600">
                  Don't have an account?{' '}
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