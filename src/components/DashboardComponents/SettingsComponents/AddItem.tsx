import { Button, InputField } from "@/components/FormComponents";
import SmallLoader from "@/components/GeneralComponents/SmallLoader";
import { useAddItem } from "@/hooks/mutations/useMutateItems";
import { useGetServices } from "@/hooks/query/useGetServices";
import { IItemService, Service } from "@/services/items.service";
import { Form, Formik, FormikHelpers } from "formik";
import { Trash } from "lucide-react";
import React from "react";

interface FormValues {
  item_name: string;
  services: Service[];
}

const AddItem = () => {
  const { mutate: addItem, isPending } = useAddItem();
  const { data: servicesData, isLoading } = useGetServices();
  if (isLoading) {
    return <SmallLoader />;
  }

  const services = servicesData?.service ?? [];

  // Initialize service prices for each service
  const initialServicePrices: Service[] = services.map((service) => ({
    service_id: service.id,
    price: Number(service.price),
    service_name: service.name,
    estimated_hours: service.estimated_hours,
  }));

  const initialValues: FormValues = {
    item_name: "",
    services: initialServicePrices,
  };

  const handleSubmit = (values: FormValues) => {
    // Filter out services that have prices entered
    const servicesWithPrices = values.services.filter(
      (servicePrice) => servicePrice.price && servicePrice.estimated_hours
    );

    const payload: IItemService = {
      item_name: values.item_name,
      services: servicesWithPrices,
    };

    addItem(payload);
  };

  const removeService = (
    index: number,
    setFieldValue: FormikHelpers<FormValues>["setFieldValue"],
    values: FormValues
  ) => {
    // Create a new array without the service at the specified index
    const updatedServices = values.services.filter((_, i) => i !== index);
    setFieldValue("services", updatedServices);
  };
  return (
    <div className="max-w-sm">
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        {({ values, setFieldValue }) => (
          <Form>
            {/* Item Name */}
            <InputField name="item_name" placeholder="Enter item name" />

            {/* Services with Prices */}
            <div className="my-4">
              <h3 className="mb-3 text-lg font-bold text-left">Services</h3>
              <div className="flex justify-between mb-1 text-xs">
                <div className="">Service</div>
                <div className="">Price</div>
                <div className="">Est. hours</div>
                <div className=""></div>
              </div>
              {values.services.map((x, index) => {
                const service = services.find((s) => s.id === x.service_id);
                return (
                  <div
                    key={index}
                    className="flex items-center gap-1 p-1 mb-2 text-left border border-gray-200 rounded-lg"
                  >
                    {/* Service Name (Read-only) */}
                    <div className="w-full p-1 text-sm border border-gray-300 rounded-md bg-gray-50">
                      {service?.name || ""}
                    </div>

                    {/* Price */}
                    <InputField
                      className="!text-xs"
                      size="sm"
                      name={`services[${index}].price`}
                      type="number"
                      placeholder="Enter price"
                    />

                    {/* Estimated Hours */}
                    <InputField
                      size="sm"
                      className="!text-xs"
                      name={`services[${index}].estimated_hours`}
                      type="number"
                      placeholder="Enter hours"
                    />

                    {/* Remove Button */}
                    <div
                      className="flex justify-end text-red-500 cursor-pointer"
                      onClick={() =>
                        removeService(index, setFieldValue, values)
                      }
                    >
                      <Trash size={20} className="mr-4" />
                    </div>
                  </div>
                );
              })}
            </div>

            <Button
              label="Save"
              isLoading={isPending}
              disabled={isPending}
              type="submit"
            />
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddItem;
