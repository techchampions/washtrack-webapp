import { Button, InputField } from "@/components/FormComponents";
import { useUpdateItem } from "@/hooks/mutations/useMutateItems";
import { ItemType } from "@/hooks/query/useGetItemService";
import { Service, UpdateItem } from "@/services/items.service";
import { useAuthStore } from "@/store/auth.store";
import { Form, Formik, FormikHelpers } from "formik";
import { Trash } from "lucide-react";
import React from "react";

interface FormValues {
  item_name: string;
  services: Service[];
}
interface Props {
  item: ItemType;
}
const EditItem: React.FC<Props> = ({ item }) => {
  const { mutate: updateItem, isPending } = useUpdateItem();
  const { user } = useAuthStore();
  const services = item.services ?? [];

  // Initialize service prices for each service
  const initialServicePrices: Service[] = services.map((service) => ({
    service_id: service.id,
    price: Number(service.price),
    service_name: service.service_name,
    estimated_hours: service.estimated_hours,
  }));

  const initialValues: FormValues = {
    item_name: item.name,
    services: initialServicePrices,
  };

  const handleSubmit = (values: FormValues) => {
    // Filter out services that have prices entered
    const servicesWithPrices = values.services.filter(
      (servicePrice) => servicePrice.price && servicePrice.estimated_hours
    );
    const payload: UpdateItem[] = [];
    for (let index = 0; index < servicesWithPrices.length; index++) {
      const service = servicesWithPrices[index];

      const shortPayload: UpdateItem = {
        item_name: values.item_name,
        service_id: service.service_id,
        service_name: service.service_name,
        price: service.price,
        estimated_hours: service.estimated_hours,
        id: item.id,
        item_id: item.id,
        store_id: item.store_id,
        user_id: user?.id || 0,
      };
      payload.push(shortPayload);
    }

    updateItem(payload);
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
                      {service?.service_name || ""}
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

export default EditItem;
