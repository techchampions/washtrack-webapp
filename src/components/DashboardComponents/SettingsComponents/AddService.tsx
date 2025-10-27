import * as Yup from "yup";
import React from "react";
import { Form, Formik } from "formik";
import { Button, InputField } from "@/components/FormComponents";
import { useAddService } from "@/hooks/mutations/useMutateServices";
import { useModal } from "@/store/useModal.store";
import { IServices } from "@/services/services.service";

const AddService = () => {
  const { mutate: addService, isPending } = useAddService();
  const modal = useModal();
  const initialValues = {
    name: "",
    price: "",
    estimated_hours: "",
    service_type: 1,
  };
  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Service name is required"),
    price: Yup.number()
      .typeError("Price must be a number")
      .required("Price is required"),
    estimated_hours: Yup.number()
      .typeError("Estimated hours must be a number")
      .required("Estimated hours are required"),
  });
  const handleAdd = (values: typeof initialValues) => {
    const payload: IServices = {
      name: values.name,
      price: Number(values.price),
      estimated_hours: Number(values.estimated_hours),
      service_type: values.service_type,
    };
    addService(payload, {
      onSuccess() {
        modal.closeModal();
      },
    });
  };
  return (
    <div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleAdd}
      >
        {({ isValid }) => (
          <Form className="space-y-5">
            <h2 className="text-2xl font-bold text-left">Add New Service</h2>
            <div className="space-y-2">
              <InputField name="name" placeholder="Service name e.g wash" />
              <InputField name="price" placeholder="Enter Service Price" />
              <InputField
                name="estimated_hours"
                placeholder="Estimated Hours"
              />
            </div>
            <Button
              label="Add Service"
              type="submit"
              disabled={!isValid || isPending}
              isLoading={isPending}
            />
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddService;
