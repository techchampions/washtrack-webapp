import OTPForm from "@/components/DashboardComponents/OTPInput";
import { useCompleteOrder } from "@/hooks/mutations/useUpdateOrderStatus";
import { Customer } from "@/hooks/query/usegetOrders";
import React from "react";
interface Props {
  id: string;
  customer?: Customer;
}
const CompleteOrder: React.FC<Props> = ({ id, customer }) => {
  const { mutate: complete, isPending } = useCompleteOrder();
  const handleCompleteOrder = (code: string, paid_amount: number) => {
    const payload = {
      order_code: Number(code),
      paid_amount: paid_amount,
      id: id,
    };
    complete(payload);
  };
  return (
    <div className="max-w-xs">
      <div className="text-2xl font-bold">Complete Order</div>
      <OTPForm
        onSubmit={handleCompleteOrder}
        isLoading={isPending}
        customerEmail={customer?.email}
        customerPhone={customer?.phone_number}
      />
    </div>
  );
};

export default CompleteOrder;
