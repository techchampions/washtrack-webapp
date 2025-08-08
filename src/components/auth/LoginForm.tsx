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
  const { mutate: login, isPending, error, loading } = useLogin();

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
  }, [isPending]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-transparent px-4">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-2xl md:shadow-xl">
       

         <div className="flex flex-col justify-start text-left ">
            <h3 className="text-4xl font-brand-bold text-brand text-left">
              Welcome
            </h3>
            <p className="mt-2 text-gray-400 text-left">
              Sign In via your Email Address
            </p>
          </div> 

        {/* Error Message */}
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
              <div className="space-y-4">
                <FormField
                  name="email"
                  type="email"
                  placeholder="Email Address"
                  icon={<FaEnvelope className="text-brand w-5 h-5" />} 
                  autoComplete="email"
                  errorClassName='text-left'
                  inputClassName="bg-white border text-gray-900 text-sm rounded-lg block w-full p-2.5 outline-none resize-none"
                />

                <FormField
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  inputClassName="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-0 block w-full p-2.5 outline-none resize-none"

                  placeholder="Password"
                   icon={<FaLock className="text-brand w-5 h-5" />}
                  rightIcon={
                    <button
                      type="button"
                      className="text-gray-400 hover:text-gray-600"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <FaEyeSlash className="h-5 w-5 text-gray-500 cursor-pointer" />
                      ) : (
                        <FaEye className="h-5 w-5 text-gray-500 cursor-pointer" />
                      )}
                    </button>
                  }
                  autoComplete="current-password"
                  errorClassName='text-left'
                />
              </div>

              <div className="flex items-center justify-between">
                {/* <FormField
                  name="rememberMe"
                  type="checkbox"
                  label="Remember me"
                  className="text-sm"
                /> */}

                <Link
                  to="/auth/forgot-password"
                  className="text-sm text-brand hover:text-indigo-500 font-medium"
                >
                  Forgot password?
                </Link>
              </div>

              <Button
                type="submit"
                className="w-full"
                size="lg"
                loading={isPending}
                disabled={isPending}
              >
                Sign In
              </Button>

              <div className="text-center">
                <span className="text-sm text-gray-600">
                  Don't have an account?{' '}
                  <Link
                    to="/auth/signup"
                    className="font-medium text-brand"
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