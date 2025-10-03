import { Service } from "@/services/services.service";
import * as Yup from "yup";
import React from "react";
import { Form, Formik } from "formik";
import { Button, InputField } from "@/components/FormComponents";
import { useUpdateService } from "@/hooks/mutations/useMutateServices";
import { useModal } from "@/store/useModal.store";
interface Props {
  service: Service;
}
const EditService: React.FC<Props> = ({ service }) => {
  const { mutate: update, isPending } = useUpdateService();
  const modal = useModal();
  const initialValues = {
    name: service.name,
    price: Number(service.price),
    estimated_hours: Number(service.estimated_hours),
    id: service.id,
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
  const handleEdit = (values: typeof initialValues) => {
    update(values, {
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
        onSubmit={handleEdit}
      >
        {({ isValid }) => (
          <Form className="space-y-5">
            <h2 className="text-2xl font-bold text-left">Edit Service</h2>
            <div className="space-y-2">
              <InputField name="name" placeholder="Service name e.g wash" />
              <InputField name="price" placeholder="Enter Service Price" />
              <InputField
                name="estimated_hours"
                placeholder="Estimated Hours"
              />
            </div>
            <Button
              label="Submit"
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

export default EditService;
