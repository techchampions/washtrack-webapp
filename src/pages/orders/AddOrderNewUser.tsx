import { Form, Formik } from "formik";
import * as Yup from "yup";
import React from "react";
import { Button, InputField } from "@/components/FormComponents";
import { FiPlusCircle } from "react-icons/fi";
import { RightSideBar } from "@/components/DashboardComponents";
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

const PAYMENT_OPTIONS: RadioOption[] = [
  { label: "Cash", value: "cash" },
  { label: "Transfer", value: "transfer" },
];

export const AddOrderNewUser: React.FC = () => {
  const modal = useModal();
  const { mutate: createOrder, isPending } = useCreateOrder();
  const { data } = useGetOrderItem();
  const orderItems = data?.Items ?? [];
  const initialValues = {
    customerName: "",
    customerEmail: "",
    phoneNumber: "",
    pickupDate: new Date(),
    payment_type: "",
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
    costOfService: Yup.number().required("Required"),
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
        // if (item.photos) {
        //   formData.append(`items[${index}][photos]`, item.photos as File);
        // }
        // if (item.photo2) {
        //   formData.append(`items[${index}][photos]`, item.photo2 as File);
        // }
        // if (item.photo3) {
        //   formData.append(`items[${index}][photos]`, item.photo3 as File);
        // }
      });
      createOrder(formData, {
        onSuccess(data) {
          modal.openModal(<OrderCreateSuccess order_id={data.order.id} />);
        },
      });
    } catch (error) {
      console.error("Order creation failed:", error);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6 w-full md:w-[90%] mx-auto">
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
                    className="flex items-center cursor-pointer justify-between px-4 py-2 mt-1 rounded-lg bg-brand-100"
                    key={index}
                    onClick={() => handleEditItem(item)}
                  >
                    <div className="flex items-center gap-4">
                      <img
                        src="/images/order-icon.png"
                        className="w-10 h-10 object-cover rounded"
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
                      <div className="flex gap-1 cursor-pointer text-quick-action-icon hover:text-blue-700 text-sm items-center justify-end">
                        <ChevronRight />
                      </div>
                    </div>
                  </div>
                ))}

                {/* Pickup Date */}
                <div className="text-left mt-4">
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
                <div className="flex gap-1 text-gray-300 text-sm items-center">
                  <Info size={15} />
                  <span>Please select preffered payment method</span>
                </div>
                <div className="ml-5 mb-5">
                  <RadioSelect name="payment_type" options={PAYMENT_OPTIONS} />
                </div>
                <div className="mt-4 bg-brand-100 p-4 mb-4 rounded-lg text-[12px]">
                  <div className="flex justify-between items-center py-2 text-black">
                    <span>Cost of service</span>
                    <div className="flex items-center gap-1">
                      <span className="font-bold">₦</span>
                      <InputField
                        size="sm"
                        name="costOfService"
                        className="!max-w-[80px] "
                      />
                    </div>
                  </div>
                  <div className="flex justify-between items-center py-2 text-black">
                    <span>Amount Paid</span>
                    <div className="flex items-center gap-1">
                      <span className="font-bold">₦</span>
                      <InputField
                        size="sm"
                        name="amountPaid"
                        className="!max-w-[80px] "
                      />
                    </div>
                  </div>
                  <div className="flex justify-between py-2 text-black">
                    <span>Balance</span>
                    <span className="font-bold">
                      {formatPrice(values.costOfService - values.amountPaid)}
                    </span>
                  </div>
                  <div className="flex justify-between p-2 mt-2 font-bold text-black bg-white border border-gray-300 rounded-lg">
                    <span>Total Amount</span>
                    <span>{formatPrice(values.costOfService)}</span>
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
  );
};
