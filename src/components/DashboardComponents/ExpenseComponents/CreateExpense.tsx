import * as Yup from "yup";
import React from "react";
import { Form, Formik } from "formik";
import { Button, InputField } from "@/components/FormComponents";
import { useModal } from "@/store/useModal.store";
import { useCreateExpense } from "@/hooks/mutations/useCreateExpense";
import { CreateExpensePayload } from "@/types/GeneralTypes/ExpenseTypes";
import DatePickerInput from "@/components/FormComponents/DateInput";
// import { formatDate } from "@/utils/formatter";

const CreateExpense = () => {
  const { mutate: create, isPending } = useCreateExpense();
  const modal = useModal();
  const initialValues = {
    expense_name: "",
    amount: "",
    description: "",
    expense_date: "",
  };
  const validationSchema = Yup.object().shape({
    expense_name: Yup.string().required("Name is required"),
    amount: Yup.number()
      .typeError("Price must be a number")
      .required("Price is required"),
    description: Yup.string().required("Description are required"),
  });
  const handleCreate = (values: typeof initialValues) => {
    // const date = formatDate(values.expense_date);
    const payload: CreateExpensePayload = {
      expense_name: values.expense_name,
      amount: values.amount,
      description: values.description,
      expense_date: values.expense_date,
    };
    create(payload, {
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
        onSubmit={handleCreate}
      >
        {({ isValid }) => (
          <Form className="space-y-5">
            <h2 className="text-2xl font-bold text-left">Create New Expense</h2>
            <div className="space-y-2">
              <InputField
                name="expense_name"
                placeholder="Expense name e.g purchase detergents"
              />
              <InputField name="amount" placeholder="Enter Expense cost" />
              <DatePickerInput name="expense_date" placeholder="Date" />
              <InputField
                name="description"
                type="textarea"
                placeholder="Description"
              />
            </div>
            <Button
              label="Save"
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

export default CreateExpense;
