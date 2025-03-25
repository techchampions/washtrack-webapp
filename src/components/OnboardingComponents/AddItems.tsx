import { useState } from "react";
import { Formik, Form, FormikHelpers } from "formik";
import * as Yup from "yup";
import Button from "../FormComponents/Button";
import InputField from "../FormComponents/InputField";
import {
  FaChevronRight,
  FaFile,
  FaFileAlt,
  FaFileArchive,
} from "react-icons/fa";
import { useOnboardingStore } from "../../store/AppStore";
import { FiFileText } from "react-icons/fi";

// Define TypeScript type for a item
interface Item {
  itemName: string;
}

const AddItems = () => {
  const { setStep } = useOnboardingStore();
  const [items, setItems] = useState<Item[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editIndex, setEditIndex] = useState<number | null>(null);

  const validationSchema = Yup.object().shape({
    itemName: Yup.string().required("Item name is required"),
  });

  const handleSubmit = (values: Item, { resetForm }: FormikHelpers<Item>) => {
    if (editIndex !== null) {
      // Update existing Item
      const updatedItems = [...items];
      updatedItems[editIndex] = values;
      setItems(updatedItems);
      setEditIndex(null);
    } else {
      // Add new item
      setItems([...items, values]);
    }

    setShowModal(false);
    resetForm();
  };

  //   const handleDelete = (index: number) => {
  //     setItems(items.filter((_, i) => i !== index));
  //   };

  //   const handleEdit = (index: number) => {
  //     setEditIndex(index);
  //     setShowModal(true);
  //   };

  return (
    <div className="flex flex-col items-center space-y-4 w-full max-w-lg mx-auto p-4 relative">
      <h2 className="text-2xl font-brand-bold text-brand text-center">
        Add your Item Types
      </h2>
      <p className="text-gray-600 text-center mt-2">
        Add the items you deal with below to complete your store setup
      </p>
      <Button label="Add a item" onClick={() => setShowModal(true)} />

      <div className="mt-1 w-full flex flex-col justify-start text-black h-[200px] max-w-[300px] min-w-[300px] overflow-y-auto">
        {items.map((item, index) => (
          <div
            key={index}
            className="bg-brand-100 p-3 rounded-md mt-2 text-left flex items-center gap-2 w-full">
            <div className="bg-brand-200 p-3 rounded-full">
              <FiFileText className="text-quick-action-icon h-6 w-6" />
            </div>
            <div className="w-full">
              <p>{item.itemName}</p>
              <p className="text-[12px] text-gray-800">Washing, Iron</p>
            </div>
            <div className="float-right">
              <FaChevronRight className="text-black" />
            </div>
          </div>
        ))}
      </div>

      {/* {items.length > 0 && (
        <div className="w-full max-w-2xl mt-6 overflow-x-auto">
          <table className="w-full border-collapse bg-white">
            <thead className="bg-gray-100">
              <tr className="text-left text-gray-600">
                <th className="px-4 py-3 rounded-s-lg">item</th>
                <th className="px-4 py-3">Price</th>
                <th className="px-4 py-3">Est. Hours</th>
                <th className="px-4 py-3 rounded-e-lg text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, index) => (
                <tr
                  key={index}
                  className="text-gray-700 odd:bg-white even:bg-gray-50 hover:bg-blue-50">
                  <td className="px-4 py-3">{item.itemName}</td>
                  <td className="px-4 py-3">
                    ₦{item.itemName.toLocaleString()}
                  </td>
                  <td className="px-4 py-3">{item.itemName} hours</td>
                  <td className="px-4 py-3 flex justify-center space-x-2">
                    <FaEdit
                      className="text-blue-500 hover:text-blue-700 cursor-pointer"
                      onClick={() => handleEdit(index)}
                    />
                    <FaRegTrashCan
                      className="text-red-500 hover:text-red-700 cursor-pointer"
                      onClick={() => handleDelete(index)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )} */}

      <p className="text-gray-600 text-xs text-center mt-6">
        Click the “Add a item” button to add the type of items you render in
        your laundry store
      </p>

      <Button
        label="Next"
        className={`${items.length === 0 ? "bg-blue-200" : "bg-brand"}`}
        disabled={items.length === 0}
        onClick={() => setStep("onboarding complete")}
      />

      {showModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-[25px] shadow-lg w-[380px] max-w-md">
            <h3 className="text-[30px] text-left text-black font-bold mb-4">
              {editIndex !== null ? "Edit item" : "Add new item"}
            </h3>

            <Formik
              initialValues={
                editIndex !== null ? items[editIndex] : { itemName: "" }
              }
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
              enableReinitialize>
              {() => (
                <Form>
                  <InputField
                    type="text"
                    placeholder="item name e.g Trouser, Shirt, suits, Agbada etc..."
                    name="itemName"
                  />
                  <Button
                    type="submit"
                    label={editIndex !== null ? "Update item" : "Add item"}
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setShowModal(false);
                      setEditIndex(null);
                    }}
                    className="mt-2 text-red-500">
                    Cancel
                  </button>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddItems;
