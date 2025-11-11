import { Form, Formik } from "formik";
import * as Yup from "yup";
import React from "react";
import { Button, InputField } from "@/components/FormComponents";
import { FiPlusCircle } from "react-icons/fi";
import { Header, RightSideBar } from "@/components/DashboardComponents";
import DatePickerInput from "@/components/FormComponents/DateInput";
import { useModal } from "@/store/useModal.store";
import { ChevronRight, Info } from "lucide-react";
import { formatPrice } from "@/utils/formatter";
import RadioSelect, {
  RadioOption,
} from "@/components/FormComponents/RadioInput";
import { useCreateOrder } from "@/hooks/mutations/useCreateOrder";
import AddItemForOrder from "@/components/DashboardComponents/CreateOrderComponents/AddItemForOrder";
import { useGetOrderItem } from "@/hooks/query/useGetOrderItem";
import EditItemForOrder from "@/components/DashboardComponents/CreateOrderComponents/EditItemForOrder";
import OrderCreateSuccess from "@/components/DashboardComponents/CreateOrderComponents/OrderCreateSuccess";
import { useNavigate } from "react-router-dom";
import InputFieldFormatted from "@/components/FormComponents/InputField+Format";

const PAYMENT_OPTIONS: RadioOption[] = [
  { label: "Cash", value: "cash" },
  { label: "Transfer", value: "transfer" },
];

export const AddOrderNewUser: React.FC = () => {
  const modal = useModal();
  const navigate = useNavigate();
  const { mutate: createOrder, isPending } = useCreateOrder();
  const { data } = useGetOrderItem();
  const orderItems = data?.Items ?? [];
  const initialValues = {
    customerName: "",
    customerEmail: "",
    phoneNumber: "",
    pickupDate: new Date(),
    payment_type: "cash",
    costOfService: 0,
    amountPaid: 0,
  };

  const validationSchema = Yup.object({
    customerName: Yup.string().required("Name is required"),
    customerEmail: Yup.string()
      .email("Invalid email")
      .required("Email is required"),
    phoneNumber: Yup.number().required("Customer's Phone No. is required"),
    payment_type: Yup.mixed().required("required"),
    pickupDate: Yup.date().required("Required."),
    amountPaid: Yup.number().max(Yup.ref("costOfService")),
  });

  const handleEditItem = (item: (typeof orderItems)[0]) => {
    modal.openModal(<EditItemForOrder item={item} />);
  };

  const handleSubmit = async (values: typeof initialValues) => {
    if (!values || orderItems.length === 0) return;
    const itemIDs = [];
    orderItems.forEach((item) => {
      itemIDs.push(item.id);
    });

    try {
      const formData = new FormData();

      formData.append("name", values.customerName);
      formData.append("email", values.customerEmail);
      formData.append("payment_type", values.payment_type);
      formData.append("phone_number", values.phoneNumber.toString());
      formData.append("pickup_date", values.pickupDate?.toISOString() || "");
      formData.append("order_type", "2");
      formData.append("is_exist", "0");
      formData.append(
        "total_amount",
        String(values.costOfService - values.amountPaid)
      );
      formData.append("paid_amount", String(values.amountPaid));
      // formData.append("items_ids", String(itemIDs));
      orderItems.forEach((item) => {
        formData.append("items_id", String(item.id));
      });
      orderItems.forEach((item, index) => {
        formData.append(`items[${index}][service_name]`, item.service_name);
        formData.append(`items[${index}][item_type]`, item.item_type);
        formData.append(
          `items[${index}][no_of_items]`,
          item.no_of_items.toString()
        );
      });
      createOrder(formData, {
        onSuccess(data) {
          modal.openModal(<OrderCreateSuccess order_id={data.order.id} />);
          navigate(`/dashboard/orders/${data.order.id}`);
        },
      });
    } catch (error) {
      console.error("Order creation failed:", error);
    }
  };

  return (
    <>
      <Header />
      <div className="flex flex-col w-full gap-6 lg:flex-row">
        {/* Left Section */}
        <div className="w-full lg:w-2/3">
          {/* Customer Info */}
          <div className="flex flex-col items-center w-full py-2">
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
              enableReinitialize
            >
              {({ isValid, values }) => (
                <Form className="w-full space-y-2">
                  <InputField
                    type="text"
                    placeholder="Enter customer name"
                    name="customerName"
                  />
                  <InputField
                    type="email"
                    placeholder="Enter customer Email"
                    name="customerEmail"
                  />
                  <InputField
                    type="number"
                    placeholder="Customer Phone No."
                    name="phoneNumber"
                  />

                  {/* Added Item */}
                  <div className="flex items-center justify-between w-full py-3 mt-2 text-black">
                    <div className="font-bold text-[16px]">Add Item</div>
                    <FiPlusCircle
                      className="w-8 h-8 text-black cursor-pointer"
                      onClick={() => {
                        modal.openModal(<AddItemForOrder />);
                      }}
                    />
                  </div>

                  {orderItems.map((item, index) => (
                    <div
                      className="flex items-center justify-between px-4 py-2 mt-1 rounded-lg cursor-pointer bg-brand-100"
                      key={index}
                      onClick={() => handleEditItem(item)}
                    >
                      <div className="flex items-center gap-4">
                        <img
                          src="/images/order-icon.png"
                          className="object-cover w-10 h-10 rounded"
                          alt={item.item_type}
                        />
                        <div className="text-left">
                          <p className="font-semibold text-quick-action-icon">
                            {item.service_name}
                          </p>
                          <p className="text-sm text-gray-500">
                            {item.item_type} - {item.no_of_items} pieces
                          </p>
                        </div>
                      </div>
                      <div className="">
                        <div className="flex items-center justify-end gap-1 text-sm cursor-pointer text-quick-action-icon hover:text-blue-700">
                          <ChevronRight />
                        </div>
                      </div>
                    </div>
                  ))}

                  {/* Pickup Date */}
                  <div className="mt-4 text-left">
                    <DatePickerInput
                      label="Pickup Date"
                      name="pickupDate"
                      minDate={new Date()}
                    />
                  </div>

                  {/* Payment Details */}
                  <div className="text-black font-bold text-[16px] mb-0 text-left mt-5">
                    Payment Method
                  </div>
                  <div className="flex items-center gap-1 text-sm text-gray-300">
                    <Info size={15} />
                    <span>Please select preffered payment method</span>
                  </div>
                  <div className="mb-5 ml-5">
                    <RadioSelect
                      name="payment_type"
                      options={PAYMENT_OPTIONS}
                    />
                  </div>
                  <div className="mt-4 bg-brand-100 p-4 mb-4 rounded-lg text-[12px]">
                    <div className="grid grid-cols-2 py-2 text-black gap-y-3 md:grid-cols-3">
                      <div className="md:col-span-2 justify-self-start">
                        Cost of service
                      </div>
                      <InputFieldFormatted
                        formatAsNaira
                        name="costOfService"
                        className="justify-self-end "
                      />
                      <div className="md:col-span-2 justify-self-start">
                        Amount Paid
                      </div>
                      <InputFieldFormatted
                        formatAsNaira
                        name="amountPaid"
                        className="justify-self-end"
                      />
                      <div className="justify-self-start md:col-span-2">
                        Balance
                      </div>
                      <div className="font-bold justify-self-end">
                        {formatPrice(
                          (values.costOfService || 0) - (values.amountPaid || 0)
                        )}
                      </div>
                      <div className="flex justify-between col-span-2 p-2 mt-2 font-bold text-black bg-white border border-gray-300 rounded-lg md:col-span-3">
                        <span>Total Amount</span>
                        <span>{formatPrice(values.costOfService || 0)}</span>
                      </div>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <Button
                    label="Create Order"
                    type="submit"
                    disabled={!isValid || orderItems.length === 0 || isPending}
                    isLoading={isPending}
                  />
                </Form>
              )}
            </Formik>
          </div>
        </div>

        {/* Right Sidebar */}
        <RightSideBar />
      </div>
    </>
  );
};
