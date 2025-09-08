import { InputField } from "@/components/FormComponents";
import { Form, Formik } from "formik";
import React from "react";
import DatePicker from "react-datepicker";
import { FiPlusCircle } from "react-icons/fi";

const OrderNewUser = () => {
  const validationSchema = {};
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
            onSubmit={() => {}}
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
              </Form>
            )}
          </Formik>
        </div>

        {/* Added Item */}
        <div className="flex text-black items-center justify-between w-full py-3 mt-2">
          <div className="font-brand-bold text-[16px]">Add Item</div>
          <FiPlusCircle className="text-black h-8 w-8" />
        </div>
        {/* {items.map((items, index) => (
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
      ))} */}

        {/* Pickup Date with Date Picker */}
        <div className="mt-4">
          <div className="text-black text-left text-[16px] font-brand-bold">
            Pickup Date
          </div>
          {/* <div className="relative mt-2 w-full flex flex-row border border-gray-300 rounded-lg">
          <DatePicker
            selected={pickupDate}
            onChange={(date) => setPickupDate(date)}
            className="w-full p-3 outline-none rounded-lg text-gray-500"
            dateFormat="dd-MM-yyyy"
            placeholderText="Select date"
          />
          <MdOutlineCalendarToday className="absolute right-3 top-3 text-gray-400" />
        </div> */}
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
        <Button label="Create Order" onClick={handleSubmit} />
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
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.currentTarget.files?.[0] || null;
                  setItems((prev) => {
                    const updated = [...prev];
                    if (editIndex !== null) {
                      updated[editIndex].photo = file;
                    } else {
                      updated[updated.length - 1].photo = file;
                    }
                    return updated;
                  });
                }}
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

export default OrderNewUser;
