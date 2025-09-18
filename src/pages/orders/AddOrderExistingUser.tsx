import { Form, Formik } from "formik";
import * as Yup from "yup";
import React, { useState } from "react";
import { Button, InputField } from "@/components/FormComponents";
import { FiPlusCircle } from "react-icons/fi";
import { RightSideBar } from "@/components/DashboardComponents";
import DatePickerInput from "@/components/FormComponents/DateInput";
import { useModal } from "@/store/useModal.store";
import { ChevronRight, Info, Trash2 } from "lucide-react";
import { formatPrice } from "@/utils/formatter";
import RadioSelect, {
  RadioOption,
} from "@/components/FormComponents/RadioInput";
import { useCreateOrder } from "@/hooks/mutations/useCreateOrder";
import AddItemForOrder, {
  ItemFormData,
} from "@/components/DashboardComponents/CreateOrderComponents/AddItemForOrder";
import { FaChevronRight } from "react-icons/fa";
import { useGetCustomerProfile } from "@/hooks/query/useGetCustomers";
import { useParams } from "react-router-dom";
import SmallLoader from "@/components/GeneralComponents/SmallLoader";

interface OrderItem {
  name: string;
  service: string;
  quantity: number;
  price: string | number;
  photo: File | string;
  photo2: File | string;
  photo3: File | string;
  item_id: number;
  service_name: string;
  item_type: string;
}
const PAYMENT_OPTIONS: RadioOption[] = [
  { label: "Cash", value: "cash" },
  { label: "Transfer", value: "transfer" },
];

export const AddOrderExistingUser: React.FC = () => {
  const { user_id } = useParams<{ user_id: string }>();
  const [items, setItems] = useState<OrderItem[]>([]);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const modal = useModal();
  const { mutate: createOrder, isPending } = useCreateOrder();
  const { data, isLoading } = useGetCustomerProfile(user_id || "");

  const initialValues = {
    // customerName: "",
    // customerEmail: "",
    // phoneNumber: "",
    pickupDate: new Date(),
    payment_type: "",
    costOfService: 0,
    amountPaid: 0,
  };

  const validationSchema = Yup.object({
    // customerName: Yup.string().required("Name is required"),
    // customerEmail: Yup.string()
    //   .email("Invalid email")
    //   .required("Email is required"),
    // phoneNumber: Yup.number().required("Customer's Phone No. is required"),
    payment_type: Yup.mixed().required("required"),
    pickupDate: Yup.date().required("Required."),
    costOfService: Yup.number().required("Required"),
  });
  const customer = data?.customer;
  const handleAddItem = (itemData: ItemFormData) => {
    if (editingIndex !== null) {
      // Update existing item
      const updatedItems = [...items];
      updatedItems[editingIndex] = {
        name: itemData.item_type,
        service: itemData.service_name,
        quantity: itemData.quantity,
        price: itemData.price * itemData.quantity, // You might want to calculate this based on service
        photo: itemData.image,
        photo2: itemData.image2,
        photo3: itemData.image3,
        item_id: itemData.item_id,
        service_name: itemData.service_name,
        item_type: itemData.item_type,
      };
      setItems(updatedItems);
      setEditingIndex(null);
    } else {
      // Add new item
      const newItem: OrderItem = {
        name: itemData.item_type,
        service: itemData.service_name,
        quantity: itemData.quantity,
        price: itemData.price * itemData.quantity, // You might want to calculate this based on service
        photo: itemData.image,
        photo2: itemData.image2,
        photo3: itemData.image3,
        item_id: itemData.item_id,
        service_name: itemData.service_name,
        item_type: itemData.item_type,
      };
      setItems([...items, newItem]);
    }
  };

  const handleEditItem = (index: number) => {
    const item = items[index];
    setEditingIndex(index);

    modal.openModal(
      <AddItemForOrder
        onAddItem={handleAddItem}
        editingIndex={index}
        initialItemData={{
          item_name: item.item_id.toString(),
          service: item.service, // You'll need to map this based on your data
          quantity: item.quantity,
          image: item.photo,
          item_type: item.item_type,
          service_name: item.service_name,
        }}
      />
    );
  };

  const handleDeleteItem = (index: number) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const handleSubmit = async (values: typeof initialValues) => {
    if (!values || items.length === 0) return;

    try {
      const formData = new FormData();
      if (customer) {
        formData.append("name", customer?.name);
        formData.append("email", customer?.email);
        formData.append("phone_number", customer?.phone_number.toString());
      }
      formData.append("payment_type", values.payment_type);
      formData.append("pickup_date", values.pickupDate?.toISOString() || "");
      formData.append("order_type", "2");
      formData.append("is_exist", "1");
      formData.append(
        "total_amount",
        String(values.costOfService - values.amountPaid)
      );
      formData.append("paid_amount", String(values.amountPaid));
      items.forEach((item, index) => {
        formData.append(`items[${index}][service_name]`, item.service);
        formData.append(`items[${index}][item_type]`, item.name);
        formData.append(
          `items[${index}][no_of_items]`,
          item.quantity.toString()
        );
        if (item.photo) {
          formData.append(`items[${index}][photos]`, item.photo as File);
        }
        if (item.photo2) {
          formData.append(`items[${index}][photos]`, item.photo2 as File);
        }
        if (item.photo3) {
          formData.append(`items[${index}][photos]`, item.photo3 as File);
        }
      });

      createOrder(formData);
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
                {isLoading ? (
                  <SmallLoader height="70px" width="70px" />
                ) : (
                  <div className="flex items-center justify-between py-2 px-4 bg-brand-100 rounded-lg">
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
                        <p className="text-gray-500 text-sm">
                          {data?.customer.phone_number} - {data?.customer.email}
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
                      setEditingIndex(null);
                      modal.openModal(
                        <AddItemForOrder onAddItem={handleAddItem} />
                      );
                    }}
                  />
                </div>

                {items.map((item, index) => (
                  <div
                    className="flex items-center justify-between px-4 py-2 mt-1 rounded-lg bg-brand-100"
                    key={index}
                  >
                    <div className="flex items-center gap-4">
                      <img
                        src="/images/order-icon.png"
                        className="w-10 h-10 object-cover rounded"
                        alt={item.name}
                      />
                      <div className="text-left">
                        <p className="font-semibold text-quick-action-icon">
                          {item.service}
                        </p>
                        <p className="text-sm text-gray-500">
                          {item.name} - {item.quantity} pieces
                        </p>
                      </div>
                    </div>
                    <div className="">
                      <div
                        className="flex gap-1 cursor-pointer text-quick-action-icon hover:text-blue-700 text-sm items-center justify-end"
                        onClick={() => handleEditItem(index)}
                      >
                        <ChevronRight />
                      </div>

                      {/* <div
                        className="flex gap-1 cursor-pointer text-red-400 hover:text-red-500 text-sm items-center"
                        onClick={() => handleDeleteItem(index)}
                      >
                        <span>remove</span>
                        <Trash2 size={15} />
                      </div> */}
                    </div>
                  </div>
                ))}

                {/* Pickup Date */}
                <div className="text-left mt-4">
                  <DatePickerInput label="Pickup Date" name="pickupDate" />
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
                  disabled={!isValid || items.length === 0 || isPending}
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
