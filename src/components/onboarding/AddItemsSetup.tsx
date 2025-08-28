import React, { useEffect, useState } from 'react';
import { ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import landingBannerImage from "@/assets/images/landing-banner-image.png";
// import { FormField } from '../forms/FormField';
import { Formik, FieldArray, Form, FormikHelpers } from 'formik';
import { Button } from '../common/Button';
import * as Yup from "yup";
import { useOnboardingStore } from '@/store/onboarding.store';
import { FiFileText } from "react-icons/fi";
import { Trash2 } from 'lucide-react';
import { FormField } from '../forms/FormField';
import { useCreateItem, useGetItem, useGetItems, useUpdateItem } from '@/hooks/items/useItems';
import { useGetServices } from '@/hooks/services/useServices';
import { useItemsStore } from '@/store/items.store';
import { InputField } from '../FormComponents';
import { showError, showSuccess } from '@/utils/toast';
import { useServicesStore } from '@/store/services.store';
import { useAuthStore } from '@/store/auth.store';

const ItemsList = ({ item, index, setEditIndex, showForm, toggleFormDisplay }) => {

  return (
    <div className="space-y-1 mb-2">
      <div className="flex items-center justify-between p-2 bg-[#EBF7FC] rounded-xl overflow-x-auto">
        <div className='flex space-x-3  '>
          <div
            onClick={() => {
              console.log(item, "_____item click in itemlist______")
              setEditIndex(index);
              toggleFormDisplay();
            }}
            className="bg-brand-200 p-4 rounded-full">
            <FiFileText className="text-quick-action-icon h-4 w-4" />
          </div>
          <div>
            <h3 className="font-medium text-md text-[#000000]">{item.name}</h3>
            <p className="text-sm text-[#000000]">
              {item["services"].map((s) => s.service_name).join(", ")}

            </p>
          </div>
        </div>
        <button
          onClick={() => {
            console.log(item, "_____item click in itemlist______")
            setEditIndex(index);
            toggleFormDisplay();
          }}

        >
          <ChevronRight color='#404040' height={30} width={17.62} className="w-7 h-12 font-bold" />

        </button>
      </div>

    </div>
  );
}


const ItemsServicesForm = ({ handleSubmit, getServicesItem, validationSchema, toggleFormDisplay, editIndex, setEditIndex, items }) => {

  return (
    <div className="absolute inset-0 h-[100%] w-[100%] mx-auto bg-white rounded-3xl p-6 shadow-xl z-10">
      <h1 className="text-2xl font-bold text-left text-brand mb-8">Items/Services</h1>

      <Formik
        key={editIndex !== null ? `edit-${editIndex}` : "create"}
        onSubmit={handleSubmit}
        initialValues={{
          item_name: editIndex !== null ? items?.itemType[editIndex]?.name : "",
          services: getServicesItem(items?.itemType) || []
        }}
      >
        {({ values }) => (
          <Form className="space-y-6 h-[60vh]">
            <div>
              <div>
                <InputField
                  name="item_name"
                  className='mb-6'
                  placeholder="Item Name e.g Trouser"
                />
              </div>
              <div className=' flex  min-h-[35vh] '>
                <h3 className="text-sm text-left text-dark mb-1">Services</h3>

                <FieldArray name="services">
                  {({ push, remove }) => (
                    <div className="space-y-3">
                      {values.services.map((service, index) => (
                        <div key={index} className="grid grid-cols-12 gap-3 items-end">
                          <div className="col-span-3">
                            <InputField
                              placeholder="Service name"
                              type='text'
                              name={`services.${index}.service_name`}
                              className="w-full px-3 py-2 bg-white text-sm border border-gray-300 rounded-lg focus:border-none focus:outline-none"
                            />
                          </div>
                          <div className="col-span-3">
                            <InputField
                              name={`services.${index}.price`}
                              placeholder="Price"
                              className="w-full px-3 py-2 bg-white text-sm border border-gray-300 rounded-lg focus:border-none focus:outline-none"
                            />
                          </div>
                          <div className="col-span-3">
                            <InputField
                              type="number"
                              name={`services.${index}.estimated_hours`}
                              placeholder="Estimated hours"

                              className="w-full px-3 py-2 bg-white text-sm border border-gray-300 rounded-lg focus:border-none focus:outline-none"
                            />
                          </div>
                          <div className="col-span-3 flex justify-center">
                            <button
                              type="button"
                              onClick={() => remove(index)}
                              className="px-2 pb-3 text-red-500 hover:bg-red-50 rounded-lg"
                            >
                              <Trash2 size={24} />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </FieldArray>
              </div>
              <div className=''>

                <button
                  type="submit"
                  // onClick={() => console.log("presedd")}
                  className="w-full  bg-brand hover:bg-brand/30 text-white font-medium py-3 px-4 rounded-full transition-colors"
                >
                  {editIndex !== null ? "Update item" : "Add item"}
                </button>

              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

interface ServiceInput {
  service_id: string;
  service_name: string;
  price: number | string;
  estimated_hours: number | string;
}

interface ItemFormValues {
  item_name: string;
  services: ServiceInput[];
}

const AddItemsSetup = ({ handleEdit, handleDelete }) => {
  const items = useItemsStore((state) => state.items);
  const userId = useAuthStore((state) => state.user?.id);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const navigate = useNavigate();

  const [showForm, setShowForm] = useState(false);

  const toggleFormDisplay = () => {
    setShowForm(!showForm);
  }


  useGetItems();
  useGetServices(1);

  const services = useServicesStore((state) => state.services);

  const { setStep } = useOnboardingStore();

  useEffect(() => {
    console.log(items, "___get items data____")
  }, [])

  const { updateItemMutation } = useUpdateItem();
  const { createItemMutation } = useCreateItem();
  const handleSubmit = async (
    values: ItemFormValues,
    { resetForm }: FormikHelpers<ItemFormValues>
  ) => {
    console.log(items, "items")
    console.log("submit")

    if (editIndex !== null) {
      const currentItemServices = items?.itemType[editIndex]?.services;
      console.log(currentItemServices, "------ currentItemServices")
      console.log(values.services, "------ values.services")
      const payload = values.services.map((service, idx) => {
        const original = currentItemServices?.find(
          (s) => s.service_id === service.service_id
        );

        return {
          id: service.service_id,
          item_id: original?.item_id,
          item_name: values.item_name,
          service_id: service.service_id,
          service_name: service.service_name,
          price: Number(service.price),
          estimated_hours: Number(service.estimated_hours),
        };
      });

      console.log(payload, "____payload edit item_____")

      updateItemMutation.mutate(payload, {
        onSuccess: (response) => {
          console.log("✅ success:", response.data);
          if (response.status === 200 || response.status === 201) {
            showSuccess(response.data.message)

            toggleFormDisplay()
          }
        },
        onError: (error) => {
          console.error("❌ error:", error.response);
          showError(error.response.data.message);
          toggleFormDisplay()
        },
        onSettled: () => {
          console.log("🔁  request settled (success or error)");

          resetForm();
          setEditIndex(null);

        }
      })
    } else {
      console.log("I am here")
      console.log(values.services, "value services")
      // return;
      const payload = {
        item_name: values.item_name,
        services: services.map((s) => ({
          service_id: s.id,
          service_name: s.name,
          price: Number(s.price),
          estimated_hours: Number(s.estimated_hours),
        })),
      };

      console.log(payload, "____payload_____")

      createItemMutation.mutate(payload, {
        onSuccess: (response) => {
          console.log("✅ success:", response.data);
          if (response.status === 200 || response.status === 201) {
            showSuccess(response.data.message)
            toggleFormDisplay();
          }
        },
        onError: (error) => {
          console.error("❌ error:", error.response);
          showError(error.response.data.message);
          toggleFormDisplay();
        },
        onSettled: () => {
          console.log("🔁  request settled (success or error)");

          resetForm();
          setEditIndex(null);
        }
      })
    }
  }

  const validationSchema = Yup.object().shape({
    item_name: Yup.string().required("Item name is required"),
  });


  const getServicesItem = (data: any) => {

    const servicesToEdit = [];
    const seenIds = new Set();

    if (editIndex !== null) {

      console.log(data, "in get services items")
      const item = data[editIndex];
      console.log(`Item: ${typeof item}`);

      if (item?.services && Array.isArray(item?.services)) {
        item.services.forEach((service: any) => {
          if (!seenIds.has(service.id)) {
            seenIds.add(service.id);
            servicesToEdit.push({
              id: service.id,
              service_id: service.item_id,
              estimated_hours: service.estimated_hours,
              service_name: service.service_name,
              price: service.price,
            });
          }
        });
      }
      console.log(servicesToEdit, "___________-serviceToEdit_____")
      return servicesToEdit;

    } else {
      console.log("use services", services)

      if (services && Array.isArray(services)) {
        services.forEach((service: any) => {
          if (!seenIds.has(service.id)) {
            seenIds.add(service.id);
            servicesToEdit.push({
              id: service.id,
              service_id: service.item_id,
              estimated_hours: service.estimated_hours,
              service_name: service.name,
              price: service.price,
              user_id: service.user_id,
            });
          }
        });
      }
      console.log(servicesToEdit, "___________-serviceToEdit_____")
      return servicesToEdit;
    }

  };

  return (
    <div
      className="min-h-screen min-w-screen md:min-h-0 overflow-hidden flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: `url(${landingBannerImage})` }}
    >
      <div className="bg-white  relative  rounded-3xl overflow-hidden  shadow-lg p-8 max-w-md md:max-w-lg  w-[90%] text-center">

        {showForm && (
          <div className='mt-8'>
            <ItemsServicesForm

              validationSchema={validationSchema}
              toggleFormDisplay={toggleFormDisplay}
              editIndex={editIndex}
              setEditIndex={setEditIndex}
              getServicesItem={getServicesItem}
              items={items}
              handleSubmit={handleSubmit}
            />

          </div>
        )}


        <h2 className="text-[#00BCFF] text-3xl font-bold">Add your Item types</h2>
        <p className="text-gray-500 mt-2 text-sm">
          Add in the items you deal with below to complete your store setup
        </p>

        <button
          onClick={toggleFormDisplay}
          // disabled={true}
          className="mt-6 w-full rounded-full bg-[#00BCFF] py-2 text-white font-medium hover:bg-[#00A8E4] transition"
        >
          Add items
        </button>

        <div className=" min-h-[35vh]">
          {items && (
            <div className='mt-8'>
              {items?.itemType?.map((item, index) => (
                <div key={index}>

                  <ItemsList
                    setEditIndex={setEditIndex}
                    toggleFormDisplay={toggleFormDisplay}
                    showForm={showForm}
                    item={item} key={index} index={index} />
                </div>
              ))}

            </div>
          )}

        </div>

        {/* Info */}
        <p className="text-gray-400 mt-6 text-xs">
          Click the “Add items” button to add the type of items you render in your laundry store
        </p>
        <button
          disabled={true}
          onClick={() => {
            setStep("ONBOARDING_COMPLETE");
            navigate("/onboarding/welcome");
          }}
          className={`${services?.length === 0 ? " bg-[#00BCFF]/30  cursor-not-allowed" : "bg-brand cursor-pointer"} mt-4 w-full rounded-full py-2 text-white font-medium`}>
          Next
        </button>
      </div>
    </div>
  )
}



export default AddItemsSetup;
