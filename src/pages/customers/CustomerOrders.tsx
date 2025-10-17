import { Header } from "@/components/DashboardComponents";
import CustomerOrderList from "@/components/DashboardComponents/CustomerOrderList";
import { CustomerOrdersLoading } from "@/components/DashboardComponents/LoadingComponents/CustomerOrderLoading";
import { Button, InputField } from "@/components/FormComponents";
import { useEditCustomer } from "@/hooks/mutations/useEditCustomer";
import { useGetCustomerProfile } from "@/hooks/query/useGetCustomers";
import { Form, Formik } from "formik";
import { Edit, Mail, Phone, User, UserCircle, X } from "lucide-react";
import React, { useState } from "react";
import { useParams } from "react-router-dom";

const CustomerOrders = () => {
  const { id } = useParams<{
    id: string;
  }>();
  const [showForm, setshowForm] = useState(false);
  const { data, isLoading } = useGetCustomerProfile(id || "");
  const { mutate: edit, isPending } = useEditCustomer();
  if (isLoading) {
    return <CustomerOrdersLoading />;
  }
  const orders = data?.order || [];
  const initialValues = {
    name: data?.customer.name,
    phone_number: data?.customer.phone_number,
    email: data?.customer.email,
  };
  const handleUpdate = (values: typeof initialValues) => {
    const payload = {
      name: values.name,
      phone_number: values.phone_number,
      email: values.email,
      id: Number(id),
    };
    edit(payload, {
      onSuccess() {
        setshowForm(false);
      },
    });
  };
  return (
    <div>
      <Header />
      <div className="grid lg:grid-cols-2 gap-4">
        <div className="">
          <div className="text-left text-4xl font-bold">Customer Profile</div>
          <div className="grid grid-cols-2 justify-self-center items-center my-4 border border-gray-200 rounded-2xl p-5 w-full">
            <div className="h-[150px] w-[150px] bg-gray-500 rounded-full flex justify-center items-center">
              <UserCircle className="text-white" size={50} />
            </div>
            <div className="text-left space-y-2">
              <div className="font-medium text-2xl">
                Total Orders: {data?.order.length}
              </div>
              <div className="flex items-center gap-2">
                <div className="bg-brand-200 rounded-full p-1">
                  <User size={18} />
                </div>
                <span className="truncate">{data?.customer.name}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="bg-brand-200 rounded-full p-1">
                  <Phone size={18} />
                </div>
                <span className="truncate">{data?.customer.phone_number}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="bg-brand-200 rounded-full p-1">
                  <Mail size={18} />
                </div>
                <span className="truncate">{data?.customer.email}</span>
              </div>
              <Button
                label="Edit Customer"
                onClick={() => setshowForm(!showForm)}
                className="text-xs !w-fit px-5 !py-1 flex items-center"
                icon={<Edit size={15} />}
              />
            </div>
          </div>
          {showForm && (
            <div className="p-5 sm:p-10 !pb-5 w-full border border-gray-200 rounded-2xl relative">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-3xl text-left mb-3">
                  Edit Customer Info
                </h3>
                <X
                  onClick={() => setshowForm(false)}
                  className="cursor-pointer absolute top-4 right-4"
                />
              </div>
              <Formik initialValues={initialValues} onSubmit={handleUpdate}>
                {() => (
                  <Form className="space-y-3">
                    <InputField name="name" placeholder="Customer Name" />
                    <InputField
                      name="phone_number"
                      placeholder="Customer Phone No."
                    />
                    <InputField name="email" placeholder="Customer Email" />
                    <div className="grid grid-cols-2 gap-3">
                      <Button
                        label="Cancle"
                        onClick={() => setshowForm(false)}
                        className="rounded-xl bg-gray-500 hover:bg-gray-700"
                      />
                      <Button
                        label="Save"
                        type="submit"
                        disabled={isPending}
                        isLoading={isPending}
                        className="rounded-xl"
                      />
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          )}
        </div>
        <div className="">
          <h3 className="text-2xl md:text-4xl my-2 text-left font-bold">
            Order History
          </h3>
          <CustomerOrderList orders={orders} />
        </div>
      </div>
    </div>
  );
};

export default CustomerOrders;
