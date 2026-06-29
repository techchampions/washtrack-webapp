import { Button, InputField } from "@/components/FormComponents";
import RoundImageUpload from "@/components/FormComponents/RoundImageInput";
import { useUpdateStaff } from "@/hooks/mutations/useStaff";
import { useAuthStore } from "@/store/auth.store";
import { useModal } from "@/store/useModal.store";
import { Form, Formik } from "formik";
import React from "react";
import * as Yup from "yup";
interface Props {
  staff: Staff;
}
const UpdateStaff: React.FC<Props> = ({ staff }) => {
  const { closeModal } = useModal();
  const { user } = useAuthStore();
  const { mutate, isPending } = useUpdateStaff();
  const initialValues = {
    profile_picture: staff.profile_picture || null,
    first_name: staff.first_name || "",
    last_name: staff.last_name || "",
    email: staff.email || "",
    phone_num: String(staff.phone_num) || "",
    password: "",
    store_id: String(user?.store_id),
  };
  const validationSchema = Yup.object().shape({
    first_name: Yup.string().required("Name is required"),
    last_name: Yup.string().required("Name is required"),
    phone_num: Yup.string().required("Phone No. is required"),
    password: Yup.string().required("Phone No. is required"),
    store_id: Yup.string().required("Branch is required"),
    email: Yup.string().required("Email is required"),
  });

  const handleSubmit = (values: typeof initialValues) => {
    mutate(values, {
      onSuccess() {
        closeModal();
      },
    });
  };
  return (
    <div className="w-xs">
      <div className="mb-5 text-center">
        <h1 className="mb-1 text-lg font-bold md:text-2xl text-brand md:mb-2">
          Update Staff info
        </h1>
        <p className="text-xs text-gray-500">
          Fill in the information's below to create your new staff
        </p>
      </div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isValid }) => (
          <Form className="space-y-10">
            <div className="space-y-2">
              <div className="py-2">
                <RoundImageUpload
                  name="profile_picture"
                  className="flex justify-center"
                  width={100}
                  height={100}
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <InputField label="First Name" name="first_name" />
                <InputField label="Last Name" name="last_name" />
              </div>
              <InputField label="Email" name="email" />
              <InputField label="Phone Number" name="phone_num" />
              <InputField label="Password" name="password" />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <Button label="Cancel" className="bg-black" />
              <Button
                label="Save"
                type="submit"
                disabled={!isValid || isPending}
                isLoading={isPending}
              />
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default UpdateStaff;
