import Button from "@/components/FormComponents/Button";
import InputField from "@/components/FormComponents/InputField";
import SmallLoader from "@/components/GeneralComponents/SmallLoader";
import {
  useGetCustomers,
  useSearchCustomers,
} from "@/hooks/query/useGetCustomers";
import { useModal } from "@/store/useModal.store";
import { Form, Formik } from "formik";
import { Search } from "lucide-react";
import React, { useState } from "react";
import { FaChevronRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const SelectCustomers = () => {
  const [query, setquery] = useState("");
  const modal = useModal();
  const { data, isLoading } = useGetCustomers();
  const { data: searchResults, isLoading: searching } =
    useSearchCustomers(query);
  const navigate = useNavigate();
  if (isLoading || searching) {
    return <SmallLoader />;
  }
  let customers = data?.Customers ?? [];
  if (query) {
    customers = searchResults?.result ?? [];
  }
  const initialValues = {
    query: "",
  };

  return (
    <div className="text-black min-h-[400px]">
      <div className="flex items-center justify-between mb-5 gap-5">
        <h2 className="flex-1 font-bold">Select Customer</h2>
        <Formik
          initialValues={initialValues}
          onSubmit={(values) => setquery(values.query)}
        >
          {() => (
            <Form className="flex items-center gap-2">
              <InputField
                name="query"
                placeholder="Search for customer..."
                className="!py-0 !text-xs"
              />
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
      <div className="max-h-[360px] overflow-scroll scrollbar-hide space-y-2">
        {customers.map((customer, index) => (
          <div
            className="flex items-center justify-between px-4 py-2 rounded-lg cursor-pointer hover:bg-brand-200 bg-brand-100"
            key={index}
            onClick={() => {
              modal.closeModal();
              navigate(
                `/dashboard/orders/create/existing-customer/${customer.id}`
              );
            }}
          >
            <div className="flex items-center gap-4">
              <img
                src="/images/user-icon.png"
                alt="User"
                className="w-10 h-10 rounded-full"
              />
              <div className="text-left">
                <p className="font-bold text-quick-action-icon">
                  {customer.name}
                </p>
                <p className="text-sm text-gray-500">{customer.email}</p>
              </div>
            </div>
            <FaChevronRight className="text-quick-action-icon" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SelectCustomers;
