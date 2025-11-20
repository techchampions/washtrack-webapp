import { Form, Formik } from "formik";
import * as Yup from "yup";
import React from "react";
import { Button } from "@/components/FormComponents";
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
import { FaChevronRight } from "react-icons/fa";
import { useGetCustomerProfile } from "@/hooks/query/useGetCustomers";
import { useNavigate, useParams } from "react-router-dom";
import { useGetOrderItem } from "@/hooks/query/useGetOrderItem";
import EditItemForOrder from "@/components/DashboardComponents/CreateOrderComponents/EditItemForOrder";
import OrderItemLoading from "@/components/DashboardComponents/OrderItemLoading";
import OrderCreateSuccess from "@/components/DashboardComponents/CreateOrderComponents/OrderCreateSuccess";
import InputFieldFormatted from "@/components/FormComponents/InputField+Format";
import { showError } from "@/utils/toast";

const PAYMENT_OPTIONS: RadioOption[] = [
  { label: "Cash", value: "cash" },
  { label: "Transfer", value: "transfer" },
];

export const AddOrderExistingUser: React.FC = () => {
  const { user_id } = useParams<{ user_id: string }>();
  const modal = useModal();
  const navigate = useNavigate();
  const { mutate: createOrder, isPending } = useCreateOrder();
  const { data, isLoading } = useGetCustomerProfile(user_id || "");
  const { data: orderItemData } = useGetOrderItem();
  const orderItems = orderItemData?.Items ?? [];
  const initialValues = {
    pickupDate: new Date(),
    payment_type: "cash",
    costOfService: 0,
    amountPaid: 0,
  };

  const validationSchema = Yup.object({
    payment_type: Yup.mixed().required("required"),
    pickupDate: Yup.date().required("Required."),
    costOfService: Yup.number().required("Required"),
    amountPaid: Yup.number().max(Yup.ref("costOfService")),
  });

  const handleEditItem = (item: (typeof orderItems)[0]) => {
    modal.openModal(<EditItemForOrder item={item} />);
  };

  const handleSubmit = async (values: typeof initialValues) => {
    if (!values || orderItems.length === 0) return;

    try {
      const formData = new FormData();
      if (user_id) {
        formData.append("customer_id", user_id);
      }
      formData.append("payment_type", values.payment_type);
      formData.append("pickup_date", values.pickupDate?.toISOString() || "");
      formData.append("order_type", "2");
      formData.append("is_exist", "1");
      if (values.costOfService && values.amountPaid) {
        formData.append(
          "total_amount",
          String(values.costOfService - values.amountPaid)
        );
      }
      formData.append("paid_amount", String(values.amountPaid));
      orderItems.forEach((item, index) => {
        formData.append(`items[${index}][service_name]`, item.service_name);
        formData.append(`items[${index}][item_type]`, item.item_type);
        formData.append(
          `items[${index}][no_of_items]`,
          item.no_of_items.toString()
        );
        // if (item.photo) {
        //   formData.append(`items[${index}][photos]`, item.photo as File);
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
          if (data.success === false) {
            showError(data.message);
          } else if (data.success === true) {
            modal.openModal(<OrderCreateSuccess order_id={data.order.id} />);
            navigate(`/dashboard/orders/${data.order.id}`);
          }
        },
      });
    } catch (error) {
      console.error("Order creation failed:", error);
    }
  };

  return (
    <div className="">
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
              // enableReinitialize
            >
              {({ isValid, values }) => (
                <Form className="w-full space-y-2">
                  {isLoading ? (
                    <OrderItemLoading count={1} />
                  ) : (
                    <div className="flex items-center justify-between px-4 py-2 rounded-lg bg-brand-100">
                      <div className="flex items-center gap-4">
                        <img
                          src="/images/user-icon.png"
                          alt="User"
                          className="w-10 h-10 rounded-full"
                        />
                        <div className="text-left">
                          <p className="font-bold text-quick-action-icon">
                            {data?.customer.name}
                          </p>
                          <p className="text-sm text-gray-500">
                            {data?.customer.phone_number} -{" "}
                            {data?.customer.email}
                          </p>
                        </div>
                      </div>
                      <FaChevronRight className="text-quick-action-icon" />
                    </div>
                  )}

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
                    <DatePickerInput label="Pickup Date" name="pickupDate" />
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
    </div>
  );
};
