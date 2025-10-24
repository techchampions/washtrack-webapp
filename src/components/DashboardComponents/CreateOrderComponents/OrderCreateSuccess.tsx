import OrderReceipt from "@/components/DashboardComponents/OrderComponents/OrderReciept";
import { Button } from "@/components/FormComponents";
import LinkButton from "@/components/GeneralComponents/LinkButton";
import { useGetSingleOrder } from "@/hooks/query/usegetOrders";
import { useModal } from "@/store/useModal.store";
import { CheckCircle2 } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";
interface Props {
  order_id: number;
}
const OrderCreateSuccess: React.FC<Props> = ({ order_id }) => {
  const navigate = useNavigate();
  const { data, isLoading } = useGetSingleOrder(String(order_id) || "");
  const modal = useModal();
  const order = data?.order;
  const customer = data?.customer;
  const orderItems = data?.order_item ?? [];
  const noOfItems = data?.total_item_count;

  const viewReceipt = () => {
    navigate(`dashboard/orders/${order_id}`);
    modal.openModal(
      <OrderReceipt
        order={order}
        customer={customer}
        noOfItems={noOfItems}
        orderItems={orderItems}
      />
    );
  };
  return (
    <div className="flex flex-col items-center justify-center">
      <CheckCircle2 size={150} fill="green" color="white" />
      <div className="mt-4 text-2xl font-bold">Order Created</div>
      <p className="max-w-xs mb-4">
        Your has been created and receipt automatically generated
      </p>
      <div className="w-full space-y-2">
        <Button
          label="View receipt"
          className="!max-w-xs"
          onClick={viewReceipt}
          disabled={isLoading}
          isLoading={isLoading}
          loadingText="Getting Receipt"
        />
        <LinkButton
          href={`/`}
          label="Home"
          className="!max-w-xs bg-white border border-brand !text-brand block"
        />
      </div>
    </div>
  );
};

export default OrderCreateSuccess;
