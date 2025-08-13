import React, { useEffect } from 'react';
import { Formik, Form, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';
import { Button } from '@/components/common/Button';
import { FormField } from '@/components/forms/FormField';
import { FaEnvelope, FaLock, FaUser, FaPhone, FaShare } from 'react-icons/fa6';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import logoImage from "@/assets/images/logo.png";
import { AuthResponse, SignupData } from '@/types/auth.types';
import { useMutation } from "@tanstack/react-query";
import { authService } from '@/services/auth.service';
import { showError, showSuccess } from '@/utils/toast';
import {useNavigate, useLocation} from "react-router-dom";

const signupSchema = Yup.object().shape({
    store_name: Yup.string()
        .required('Business name is required')
        .min(2, 'Business name must be at least 2 characters')
        .max(50, 'Business name must be less than 50 characters'),
    email: Yup.string()
        .required('Email is required')
        .email('Invalid email address')
        .matches(
            /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            'Email can only contain letters, numbers, dots, hyphens, and underscores'
        ),
    phone: Yup.string()
        .matches(/^[+]?[\d\s\-\(\)]+$/, 'Invalid phone number format')
        .min(10, 'Phone number must be at least 10 digits'),
    password: Yup.string()
        .required('Password is required')
        .min(8, 'Password must be at least 8 characters'),
    // .matches(
    //     /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
    //     'Password must contain at least one uppercase letter, one lowercase letter, and one number'
    // ),
    referral_code: Yup.string().optional()
});


const initialValues: SignupData = {
    email: '',
    password: '',
    store_name: "",
    phone_num: "",
    referral_code: "",
};

export const SignupForm: React.FC = () => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = React.useState(false);
    const mutation = useMutation<AuthResponse, Error, SignupData>({
        mutationFn: authService.signup,
    });

    const handleSubmit = async (values: SignupData,
        { setSubmitting, setErrors }: FormikHelpers<SignupData>
    ) => {
        const payload = {
            ...values,
            user_type: 2
        }
        mutation.mutate(payload, {
            onSuccess: (response) => {

                showSuccess(response.data.message)
                if(response.data.status === 200) {
                    console.log(response.data.message, "in sign up screen")
                    navigate("auth/otp")
                }
            },
            onError: (error: any) => {
                console.log(error.response)

                if (error.response?.data?.errors) {
                    const serverErrors: Record<string, string> = {};
                    Object.entries(error.response.data.errors).forEach(([field, messages]) => {
                        if (Array.isArray(messages) && messages.length > 0) {
                            serverErrors[field] = messages[0];
                        }
                    });
                    setErrors(serverErrors);
                } else {
                    console.error("Unexpected error:", error);
                    showError(error.response.data.message)
                }
            },
            onSettled: () => {
                setSubmitting(false);
            },
        });

    };

    return (
        <div className="flex items-center justify-center bg-transparent">

            <div className="min-h-[70%] max-w-[70%] space-y-2 bg-white p-8 rounded-2xl md:shadow-xl px-15">

                <div className=' justify-center items-center h-0  p-0 m-0 flex '>
                    <img
                        src={logoImage}
                        alt="Wash Track"
                        className="w-25 h-25"
                    />
                    <div className='ml-5' />
                </div>

                <div className="my-4 flex flex-col justify-start justify-center items-center">
                    <h3 className="text-2xl font-brand-bold text-brand text-left">
                        Create Account
                    </h3>
                    <p className="mt-[1.5] text-gray-400 text-left">
                        Sign up via your phone number & email
                    </p>
                </div>

                {mutation.error && (
                    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-[2.5] rounded-lg text-sm">
                        {mutation.error.message}
                    </div>
                )}

                <Formik
                    initialValues={initialValues}
                    validationSchema={signupSchema}
                    onSubmit={handleSubmit}
                >
                    {({ isSubmitting }) => (

                        <Form className="mt-2 space-y-6">
                            <div className="space-y-4">
                                <FormField
                                    name="store_name"
                                    type="text"
                                    placeholder="Business Name"
                                    icon={<FaUser className="text-brand h-3 w-3" />}
                                    autoComplete="store_name"
                                    errorClassName='text-left'
                                    inputClassName=" bg-white border text-gray-900 text-sm rounded-lg block w-full px-2.5 outline-none resize-none"
                                />
                                <FormField
                                    name="phone_num"
                                    type="tel"
                                    placeholder="Phone No"
                                    icon={<FaPhone className="text-brand h-3 w-3" />}
                                    autoComplete="phone_num"
                                    errorClassName='text-left'
                                    inputClassName="mt-1.5 bg-white border text-gray-900 text-sm rounded-lg block w-full px-2.5 outline-none resize-none"
                                />
                                <FormField
                                    name="email"
                                    type="email"
                                    placeholder="Email Address"
                                    icon={<FaEnvelope className="text-brand h-3 w-3" />}
                                    autoComplete="email"
                                    errorClassName='text-left'
                                    inputClassName="mt-1.5 bg-white border text-gray-900 text-sm rounded-lg block w-full px-2.5 outline-none resize-none"
                                />
                                <FormField
                                    name="password"
                                    type={showPassword ? 'text' : 'password'}
                                    inputClassName="mt-2 bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-0 block w-full px-2.5 outline-none resize-none"

                                    placeholder="Password"
                                    icon={<FaLock className="text-brand h-3 w-3" />}
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
                                <FormField
                                    name="referral_code"
                                    type="text"
                                    placeholder="Referral code"
                                    icon={<FaShare className="text-brand w-3 h-3" />}
                                    autoComplete="referral_code"
                                    errorClassName='text-left'
                                    inputClassName="mt-1 bg-white border text-gray-900 text-sm rounded-lg block w-full px-2.5 outline-none resize-none"
                                />
                            </div>

                            <div className="flex flex-row w-full">
                                <div className=''>
                                    <input
                                        type="checkbox"
                                        name="agree"
                                        className=" text-brand bg-brand"
                                        required
                                    />
                                </div>

                                <div className='ml-1 text-left text-xs w-full'>
                                    <span className="text-gray-500">
                                        By continuing, you agree to our
                                    </span>
                                    <span>
                                    <a
                                        href="/terms"
                                        className="text-brand"
                                        target="_blank"
                                        rel="noreferrer"
                                    >
                                        Terms of Service
                                    </a>
                                    </span>

                                   <span className='mx-1 text-gray-500'>and</span>
                                    <span><a
                                        href="/terms"
                                        className="text-brand"
                                        target="_blank"
                                        rel="noreferrer"
                                    >
                                        Privacy Policy
                                    </a>
                                    </span>

                                </div>
                            </div>

                            <Button
                                style={{ "borderRadius": "40px" }}
                                type="submit"
                                className="w-full p-0 m-0 mb-1"
                                size="md"
                                loading={mutation.isPending}
                                disabled={mutation.isPending}
                            >
                                Sign Up
                            </Button>

                            <div className="text-center p-0 m-0">
                                <span className="text-sm text-gray-600">
                                    Have an account?{' '}
                                    <Link
                                        to="/auth/login"
                                        className="font-medium text-brand"
                                    >
                                        Sign In
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