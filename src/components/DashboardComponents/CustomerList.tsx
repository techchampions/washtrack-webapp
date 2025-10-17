import React, { useState } from "react";
import CustomerItem from "./CustomerItem";
import { useGetCustomers } from "@/hooks/query/useGetCustomers";
import { useSearchCustomers } from "@/hooks/query/useGetCustomers";
import { Form, Formik } from "formik";
import { Button, InputField } from "@/components/FormComponents";
import { Info, Search } from "lucide-react";
import { CustomerListLoading } from "@/components/DashboardComponents/LoadingComponents/CustomerListLoading";

const CustomerList = () => {
  const [query, setquery] = useState("");
  const { data: searchResults, isLoading: searching } =
    useSearchCustomers(query);
  const { data, isLoading } = useGetCustomers();
  if (isLoading || searching) {
    return <CustomerListLoading />;
  }
  let customers = data?.Customers ?? [];
  if (query) {
    customers = searchResults?.result ?? [];
  }
  const initialValues = {
    query: "",
  };

  return (
    <div className="">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-black font-bold text-lg md:text-3xl mb-4 text-left">
          Customers
        </h2>
        <Formik
          initialValues={initialValues}
          onSubmit={(values) => setquery(values.query)}
        >
          {() => (
            <Form className="flex items-center md:w-[360px] gap-2">
              <InputField name="query" placeholder="Search for customer..." />
              <Button
                label=""
                type="submit"
                icon={<Search />}
                className="!w-fit !bg-transparent !text-black flex !items-center"
              />
            </Form>
          )}
        </Formik>
      </div>
      {customers.length < 1 ? (
        <div className="bg-brand p-4 flex items-center gap-2 text-white">
          <Info />
          <span>No customers found.</span>
        </div>
      ) : (
        <div className="space-y-1">
          {customers.map((user) => (
            <CustomerItem key={user.name} customer={user} />
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomerList;
