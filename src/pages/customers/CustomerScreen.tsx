import React from "react";
// Update the import path below if the actual path or filename is different
import CustomerList from "@/components/DashboardComponents/CustomerList";
import { Header } from "@/components/DashboardComponents";
import { Form, Formik } from "formik";
import { Button, InputField } from "@/components/FormComponents";
import { Search } from "lucide-react";

const CustomerScreen = () => {
  const initialValues = {
    query: "",
  };
  return (
    <div className="w-full">
      <Header />
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-black font-bold text-lg md:text-3xl mb-4 text-left">
          Customers
        </h2>
        <Formik
          initialValues={initialValues}
          onSubmit={() => console.log("searching...")}
        >
          <Form className="flex items-center md:w-[360px] gap-2">
            <InputField name="query" placeholder="Search for customer..." />
            <Button
              label=""
              icon={<Search />}
              className="!w-fit !bg-transparent !text-black flex !items-center"
            />
          </Form>
        </Formik>
      </div>
      <CustomerList />
    </div>
  );
};

export default CustomerScreen;
