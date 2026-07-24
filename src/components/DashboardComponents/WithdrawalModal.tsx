import { Button, InputField } from "@/components/FormComponents";
import InputFieldFormatted from "@/components/FormComponents/InputField+Format";
import { useMakeWithdrawal } from "@/hooks/mutations/useReferral";
import { Form, Formik } from "formik";
import { BanknoteArrowDown } from "lucide-react";
import React from "react";
import * as Yup from "yup";

const WithdrawalModal = () => {
  const { mutate, isPending } = useMakeWithdrawal();
  const initialValues = {
    account_name: "",
    bank_name: "",
    account_number: "",
    amount: "",
  };
  const validationSchema = Yup.object().shape({
    account_name: Yup.string().required("required"),
    bank_name: Yup.string().required("required"),
    account_number: Yup.string().required("required"),
    amount: Yup.string().required("required"),
  });
  const submit = (values: typeof initialValues) => {
    mutate(values);
  };
  return (
    <div className="w-xs sm:w-sm space-y-6 max-h-[75vh]">
      <div className="text-left">
        <div className="font-bold text-2xl">Make Withdrawal</div>
        <div className="text-sm text-gray-500">
          input your correct bank details to recieved your withdrawal.
        </div>
      </div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        validateOnMount
        onSubmit={submit}
      >
        {({ isValid }) => (
          <Form className="space-y-5">
            <div className="space-y-2">
              <InputField
                name="account_name"
                placeholder="Account Name"
                label="Account Name:"
              />
              <InputField
                name="bank_name"
                placeholder="GT Bank, First Bank, Zenit Bank etc."
                label="Bank:"
              />
              <InputField
                name="account_number"
                placeholder="00123456789"
                label="Account Number:"
              />
              <InputFieldFormatted
                formatAsNaira
                name="amount"
                placeholder=""
                label="Amount:"
              />
            </div>
            <Button
              type="submit"
              label="Withdraw"
              loadingText="Processing"
              icon={<BanknoteArrowDown />}
              disabled={!isValid || isPending}
              isLoading={isPending}
            />
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default WithdrawalModal;
