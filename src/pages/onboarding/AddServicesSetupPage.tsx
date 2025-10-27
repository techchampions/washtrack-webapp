/* eslint-disable @typescript-eslint/no-explicit-any */
import AddServicesSetup from "@/components/onboarding/AddServicesSetup";
import React, { useState } from "react";
import { FormikHelpers } from "formik";
import {
  useAddServices,
  useUpdateService,
  useDeleteService,
  useGetServices,
} from "@/hooks/services/useServices";
import { showError, showSuccess } from "@/utils/toast";
import { useServicesStore } from "@/store/services.store";

interface Service {
  name: string;
  price: number | string;
  estimated_hours: number | string;
  service_type: number | string;
  id: string;
}

const AddServicesSetupPage: React.FC = () => {
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [showForm, setShowForm] = useState(false);
  const { addServicesMutation } = useAddServices();
  const { updateServiceMutation } = useUpdateService();
  const { deleteServiceMutation } = useDeleteService();
  const { services } = useServicesStore();

  const toggleFormDisplay = () => {
    console.log("toggle form toggleFormDisplay");
    setShowForm(!showForm);
  };

  useGetServices(1);

  const handleSubmit = async (
    values: Service,
    { resetForm }: FormikHelpers<Service>
  ) => {
    const payload: any = {
      name: values.name,
      price: values.price,
      estimated_hours: values.estimated_hours,
      service_type: 1,
    };

    if (editIndex !== null) {
      payload.id = services[editIndex].id;

      updateServiceMutation.mutate(payload, {
        onSuccess: (response) => {
          console.log("✅ success:", response.data);
          if (response.status === 200 || response.status === 201) {
            console.log(response.data.message, "services up");
            showSuccess(response.data.message);
            toggleFormDisplay();
          }
        },
        onError: (error: any) => {
          console.error("❌ error:", error.response);
          showError(error.response.data.message);
        },
        onSettled: () => {
          console.log("🔁  request settled (success or error)");

          resetForm();
          setEditIndex(null);
        },
      });
    } else {
      addServicesMutation.mutate(payload, {
        onSuccess: (response) => {
          console.log("✅ success:", response.data);
          if (response.status === 200 || response.status === 201) {
            console.log(response.data.message, "services dd");
            showSuccess(response.data.message);
            toggleFormDisplay();
          }
        },
        onError: (error: any) => {
          console.error("❌ error:", error.response);
          showError(error.response.data.message);
        },
        onSettled: () => {
          console.log("🔁  request settled (success or error)");
        },
      });
    }
  };

  const handleEdit = (index: number) => {
    setEditIndex(index);
    toggleFormDisplay();
  };

  const handleDelete = async (serviceId: number) => {
    const payload = { id: serviceId };

    deleteServiceMutation.mutate(payload, {
      onSuccess: (response) => {
        console.log("✅ success:", response.data);
        if (response.status === 200 || response.status === 201) {
          console.log(response.data.message, "services dd");
          showSuccess(response.data.message);
        }
      },
      onError: (error: any) => {
        console.error("❌ error:", error.response);
        showError(error.response.data.message);
      },
      onSettled: () => {
        console.log("🔁  request settled (success or error)");
      },
    });
  };

  return (
    <div className="min-h-screen flex w-full">
      <AddServicesSetup
        showForm={showForm}
        services={services}
        editIndex={editIndex}
        setEditIndex={setEditIndex}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
        handleSubmit={handleSubmit}
        toggleFormDisplay={toggleFormDisplay}
      />
    </div>
  );
};

export default AddServicesSetupPage;
