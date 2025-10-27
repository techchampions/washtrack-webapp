import { Form, Formik } from "formik";
import * as Yup from "yup";
import React from "react";
import { usePayOutstandingBalance } from "@/hooks/mutations/usePayOutstandingBalance";
import { Button, InputField } from "@/components/FormComponents";
import { useModal } from "@/store/useModal.store";

const PayOutstandingBalance = ({ id }: { id: string }) => {
  const modal = useModal();
  const { mutate: update, isPending } = usePayOutstandingBalance();
  const initialValues = {
    amount: null,
  };
  const validationSchema = Yup.object({
    amount: Yup.number().required("Required."),
  });
  const updateBalance = (values: typeof initialValues) => {
    const payload = {
      id: id,
      paid_amount: Number(values.amount),
    };
    update(payload, {
      onSuccess() {
        modal.closeModal();
      },
    });
  };
  return (
    <div>
      <h3 className="text-black text-left font-bold absolute top-4">
        Amount to Pay
      </h3>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={updateBalance}
      >
        {({ isValid }) => (
          <Form className="space-y-5 py-4">
            <InputField name="amount" placeholder="Enter amount" />
            <Button
              type="submit"
              label="Submit Payments"
              disabled={isPending || !isValid}
              isLoading={isPending}
            />
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default PayOutstandingBalance;
