import React, { useState } from "react";
import DatePicker from "react-datepicker";
import { FaChevronRight } from "react-icons/fa";
import { FiPlusCircle } from "react-icons/fi";
import { MdOutlineCalendarToday } from "react-icons/md";
import Button from "../components/FormComponents/Button";
import RightSideBar from "../components/DashboardComponents/RightSideBar";
import { Form, Formik, FormikHelpers } from "formik";
import * as Yup from "yup";

import InputField from "../components/FormComponents/InputField";
import Modal from "../components/DashboardComponents/Modal";

interface Item {
  name: string;
  service: number | string;
  quantity: number | string;
}

export const AddorderExistingUser: React.FC = () => {
  const [items, setItems] = useState<Item[]>([]);

  const [pickupDate, setPickupDate] = useState<Date | null>(new Date());
  const [showModal, setShowModal] = useState(false);
  const [editIndex, setEditIndex] = useState<number | null>(null);

  const addItems = (values: Item, { resetForm }: FormikHelpers<Item>) => {
    if (editIndex !== null) {
      // Update existing service
      const updatedItems = [...items];
      updatedItems[editIndex] = values;
      setItems(updatedItems);
      setEditIndex(null);
    } else {
      // Add new service
      setItems([...items, values]);
    }

    setShowModal(false);
    resetForm();
  };
  const handleDeleteItem = (index: number) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const handleEditItem = (index: number) => {
    setEditIndex(index);
    setShowModal(true);
  };

  return (
    <div className="flex flex-col md:flex-row gap-6 w-full md:w-[90%] mx-auto">
      {/* Left Section */}
      <div className="w-full md:w-2/3">
        {/* Customer Info */}
        <div className="flex items-center justify-between py-2 px-4 bg-brand-100 rounded-lg">
          <div className="flex items-center gap-4">
            <img
              src="/images/user-icon.png"
              alt="User"
              className="w-10 h-10 rounded-full"
            />
            <div className="text-left">
              <p className="font-bold text-quick-action-icon">Victoria Idris</p>
              <p className="text-gray-500 text-sm">
                09034394849 - victoria@gmail.com
              </p>
            </div>
          </div>
          <FaChevronRight className="text-quick-action-icon" />
        </div>

        {/* Added Item */}
        <div className="flex text-black items-center justify-between w-full py-3 mt-6">
          <div className="font-brand-bold text-[20]">Add Item</div>
          <FiPlusCircle
            className="text-black h-8 w-8"
            onClick={() => {
              setShowModal(true);
            }}
          />
        </div>
        <div className="mt-4 bg-brand-100 rounded-lg flex justify-between py-2 px-4 items-center">
          <div className="flex items-center gap-4">
            <img src="/images/order-icon.png" className="w-10" alt="" />
            <div className="text-left">
              <p className="font-semibold text-quick-action-icon">
                Wash & Iron
              </p>
              <p className="text-gray-500 text-sm">Trouser - 2 pieces</p>
            </div>
          </div>
          <button className="text-gray-500">✖</button>
        </div>

        {/* Pickup Date with Date Picker */}
        <div className="mt-4">
          <div className="text-black text-left text-[16px] font-brand-bold">
            Pickup Date
          </div>
          <div className="relative mt-2 w-full flex flex-row border border-gray-300 rounded-lg">
            <DatePicker
              selected={pickupDate}
              onChange={(date) => setPickupDate(date)}
              className="w-full p-3 outline-none rounded-lg text-gray-500"
              dateFormat="dd-MM-yyyy"
              placeholderText="Select date"
            />
            <MdOutlineCalendarToday className="absolute right-3 top-3 text-gray-400" />
          </div>
        </div>

        {/* Payment Details */}
        <div className="text-black font-brand-bold text-[16px] mb-2 text-left mt-4">
          Payment
        </div>
        <div className="mt-4 bg-brand-100 text-[12px] p-4 mb-4 rounded-lg">
          <div className="flex justify-between text-black py-2">
            <span>Cost of service</span>
            <span className="font-bold">₦30,000</span>
          </div>
          <div className="flex justify-between text-black py-2">
            <span>Amount Paid</span>
            <span className="font-bold">₦10,000</span>
          </div>
          <div className="flex justify-between text-black py-2">
            <span>Balance</span>
            <span className="font-bold">₦20,000</span>
          </div>
          <div className="flex justify-between mt-2 bg-white p-2 rounded-lg border border-gray-300 text-black font-bold">
            <span>Total Amount</span>
            <span>₦30,000</span>
          </div>
        </div>

        {/* Submit Button */}
        <Button label="Create Order" />
      </div>

      {/* Right Sidebar */}
      <RightSideBar />

      {/* Modal */}
      <Modal show={showModal} onClose={() => setShowModal(false)}>
        <h3 className="text-[30px] text-left text-black font-bold mb-4">
          {editIndex !== null ? "Edit Item" : "Add new Item"}
        </h3>

        <Formik
          initialValues={
            editIndex !== null
              ? items[editIndex]
              : { name: "", service: "", quantity: "" }
          }
          // validationSchema={validationSchema}
          onSubmit={addItems}
          enableReinitialize
        >
          {() => (
            <Form className="space-y-2">
              <InputField
                type="text"
                placeholder="Item type e.g T-shirt, Pants, Ankara"
                name="name"
              />
              <InputField
                type="text"
                placeholder="Service e.g wash, iron, starch"
                name="service"
              />
              <InputField
                type="number"
                placeholder="Quantity"
                name="quantity"
              />

              <Button
                type="submit"
                label={editIndex !== null ? "Update Item" : "Add Item"}
              />
              <button
                type="button"
                onClick={() => {
                  setShowModal(false);
                  setEditIndex(null);
                }}
                className="mt-2 text-red-500"
              >
                Cancel
              </button>
            </Form>
          )}
        </Formik>
      </Modal>
    </div>
  );
};

export const AddorderNewUser: React.FC = () => {
  const [items, setItems] = useState<Item[]>([]);

  const [pickupDate, setPickupDate] = useState<Date | null>(new Date());
  const [showModal, setShowModal] = useState(false);
  const [editIndex, setEditIndex] = useState<number | null>(null);

  const validationSchema = Yup.object({
    customerName: Yup.string().required("Name is required"),
    customerEmail: Yup.string().required("Email is required"),
    phoneNumber: Yup.number().required("Customer's Phone No. is required"),
  });
  const handleSubmit = () => {
    console.log("submiting");
  };
  const addItems = (values: Item, { resetForm }: FormikHelpers<Item>) => {
    if (editIndex !== null) {
      // Update existing service
      const updatedItems = [...items];
      updatedItems[editIndex] = values;
      setItems(updatedItems);
      setEditIndex(null);
    } else {
      // Add new service
      setItems([...items, values]);
    }

    setShowModal(false);
    resetForm();
  };
  const handleDeleteItem = (index: number) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const handleEditItem = (index: number) => {
    setEditIndex(index);
    setShowModal(true);
  };

  return (
    <div className="flex flex-col md:flex-row gap-6 w-full md:w-[90%] mx-auto">
      {/* Left Section */}
      <div className="w-full md:w-2/3">
        {/* Customer Info */}
        <div className="flex w-full items-center py-2 flex-col">
          <Formik
            initialValues={{
              customerName: "",
              customerEmail: "",
              phoneNumber: "",
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
            enableReinitialize
          >
            {() => (
              <Form className="w-full space-y-2">
                <InputField
                  type="text"
                  placeholder="Enter customer name"
                  name="customerName"
                />
                <InputField
                  type="text"
                  placeholder="Enter customer Email"
                  name="customerEmail"
                />
                <InputField
                  type="number"
                  placeholder="Customer Phone No."
                  name="phoneNumber"
                />

                {/* <Button type="submit" label={"Add customer"} /> */}
              </Form>
            )}
          </Formik>
        </div>

        {/* Added Item */}
        <div className="flex text-black items-center justify-between w-full py-3 mt-2">
          <div className="font-brand-bold text-[16px]">Add Item</div>
          <FiPlusCircle
            className="text-black h-8 w-8"
            onClick={() => {
              setShowModal(true);
            }}
          />
        </div>
        {/* <div className="mt-4 bg-brand-100 rounded-lg flex justify-between py-2 px-4 items-center">
          <div className="flex items-center gap-4">
            <img src="/images/order-icon.png" className="w-10" alt="" />
            <div className="text-left">
              <p className="font-semibold text-quick-action-icon">
                Wash & Iron
              </p>
              <p className="text-gray-500 text-sm">Trouser - 2 pieces</p>
            </div>
          </div>
          <button className="text-gray-500">✖</button>
        </div> */}
        {items.map((items, index) => (
          <div
            className="mt-4 bg-brand-100 rounded-lg flex justify-between py-2 px-4 items-center"
            key={index}
          >
            <div className="flex items-center gap-4">
              <img
                src="/images/order-icon.png"
                className="w-10"
                alt=""
                onClick={() => {
                  handleEditItem(index);
                }}
              />
              <div className="text-left">
                <p className="font-semibold text-quick-action-icon">
                  {items.service}
                </p>
                <p className="text-gray-500 text-sm">
                  {items.name} - {items.quantity} pieces
                </p>
              </div>
            </div>
            <button
              className="text-gray-500"
              onClick={() => {
                handleDeleteItem(index);
              }}
            >
              ✖
            </button>
          </div>
        ))}

        {/* Pickup Date with Date Picker */}
        <div className="mt-4">
          <div className="text-black text-left text-[16px] font-brand-bold">
            Pickup Date
          </div>
          <div className="relative mt-2 w-full flex flex-row border border-gray-300 rounded-lg">
            <DatePicker
              selected={pickupDate}
              onChange={(date) => setPickupDate(date)}
              className="w-full p-3 outline-none rounded-lg text-gray-500"
              dateFormat="dd-MM-yyyy"
              placeholderText="Select date"
            />
            <MdOutlineCalendarToday className="absolute right-3 top-3 text-gray-400" />
          </div>
        </div>

        {/* Payment Details */}
        <div className="text-black font-brand-bold text-[16px] mb-2 text-left mt-4">
          Payment
        </div>
        <div className="mt-4 bg-brand-100 p-4 mb-4 rounded-lg text-[12px]">
          <div className="flex justify-between text-black py-2">
            <span>Cost of service</span>
            <span className="font-bold">₦30,000</span>
          </div>
          <div className="flex justify-between text-black py-2">
            <span>Amount Paid</span>
            <span className="font-bold">₦10,000</span>
          </div>
          <div className="flex justify-between text-black py-2">
            <span>Balance</span>
            <span className="font-bold">₦20,000</span>
          </div>
          <div className="flex justify-between mt-2 bg-white p-2 rounded-lg border border-gray-300 text-black font-bold">
            <span>Total Amount</span>
            <span>₦30,000</span>
          </div>
        </div>

        {/* Submit Button */}
        <Button label="Create Order" />
      </div>

      {/* Right Sidebar */}
      <RightSideBar />

      {/* Add Item modal form */}
      <Modal show={showModal} onClose={() => setShowModal(false)}>
        <h3 className="text-[30px] text-left text-black font-bold mb-4">
          {editIndex !== null ? "Edit Item" : "Add new Item"}
        </h3>

        <Formik
          initialValues={
            editIndex !== null
              ? items[editIndex]
              : { name: "", service: "", quantity: "" }
          }
          // validationSchema={validationSchema}
          onSubmit={addItems}
          enableReinitialize
        >
          {() => (
            <Form className="space-y-2">
              <InputField
                type="text"
                placeholder="Item type e.g T-shirt, Pants, Ankara"
                name="name"
              />
              <InputField
                type="text"
                placeholder="Service e.g wash, iron, starch"
                name="service"
              />
              <InputField
                type="number"
                placeholder="Quantity"
                name="quantity"
              />

              <Button
                type="submit"
                label={editIndex !== null ? "Update Item" : "Add Item"}
              />
              <button
                type="button"
                onClick={() => {
                  setShowModal(false);
                  setEditIndex(null);
                }}
                className="mt-2 text-red-500"
              >
                Cancel
              </button>
            </Form>
          )}
        </Formik>
      </Modal>
    </div>
  );
};
