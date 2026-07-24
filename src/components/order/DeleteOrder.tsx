import { Button } from "@/components/FormComponents";
import { useDeleteOrder } from "@/hooks/mutations/useCreateOrder";
import { Order } from "@/hooks/query/usegetOrders";
import { useModal } from "@/store/useModal.store";
import React from "react";
interface Props {
  order: Order;
}
const DeleteOrder: React.FC<Props> = ({ order }) => {
  const { mutate, isPending } = useDeleteOrder();
  const { closeModal } = useModal();
  const handleDelete = () => {
    mutate(order.id, {
      onSuccess() {
        closeModal();
      },
    });
  };
  return (
    <div>
      <div className="text-left py-8">
        <div className="font-bold text-lg">
          Are you sure you want to delete this order
        </div>
        <div className="text-gray-500">
          please note that this action is not reversible
        </div>
      </div>
      <div className="grid sm:grid-cols-2 gap-2">
        <Button label="No, go back" onClick={closeModal} />
        <Button
          label="Yes, Delete"
          className="bg-red-500"
          onClick={handleDelete}
          isLoading={isPending}
          disabled={isPending}
        />
      </div>
    </div>
  );
};

export default DeleteOrder;
