import PaymentSuccessfull from "@/components/DashboardComponents/SubscriptionComponents/PaymentSuccessfull";
import { Button } from "@/components/FormComponents";
import SmallLoader from "@/components/GeneralComponents/SmallLoader";
import {
  usePaystackPlanPayment,
  useUpgradePlan,
} from "@/hooks/mutations/useUpgradePlan";
import { Plan, useGetSubscription } from "@/hooks/query/useGetUserSubscription";
import { useAuthStore } from "@/store/auth.store";
import { useModal } from "@/store/useModal.store";
import { showError } from "@/utils/toast";
import { Info } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";
interface Props {
  plan?: Plan;
}
const ConfirmUpgrade: React.FC<Props> = ({ plan }) => {
  const { data, isLoading } = useGetSubscription();
  const { user } = useAuthStore();
  const navigate = useNavigate();
  const paystack = usePaystackPlanPayment();
  const { mutate: initiate, isPending } = useUpgradePlan();
  const modal = useModal();
  if (isLoading) {
    return <SmallLoader />;
  }
  const initiatePayment = () => {
    const payload = {
      payment_type: "plan",
      plan_id: plan?.id,
      store_id: user?.store?.id || 0,
    };
    initiate(payload, {
      onSuccess(data) {
        paystack({
          email: user?.email || "",
          amount: data.payment.total_amount, // in Naira
          reference: data.payment.reference,
          key: data.public_key,
          onSuccess: () => {
            modal.openModal(
              <PaymentSuccessfull text="Payment received successfully." />
            );
            navigate(`/dashboard/settings/subscription`, {
              replace: true,
            });

            // TODO: call your backend API to confirm payment
          },
          onClose: () => {
            showError("Payment cancel...Please try again. ");
          },
        });
      },
    });
  };
  return (
    <div className="max-w-xs">
      <h3 className="font-bold text-3xl text-left mb-4">
        {(plan?.price || 0) > (data?.currentPlan.price || 0)
          ? "Upgrade Plan"
          : (plan?.price || 0) === data?.currentPlan.price
          ? "Renew Plan"
          : "Downgrade Plan"}
      </h3>
      <p className="text-left">
        Are you sure you want to{" "}
        {(plan?.price || 0) > (data?.currentPlan.price || 0)
          ? "Upgrade your Plan"
          : (plan?.price || 0) === data?.currentPlan.price
          ? "Renew your Plan"
          : "Downgrade your Plan"}{" "}
        to {plan?.name}
      </p>
      <div className="flex items-center gap-1 text-xs text-gray-500">
        <Info size={14} />
        <span>your current Plan will be lost</span>
      </div>
      <div className="flex justify-center gap-4 items-center mt-4">
        <Button
          label="No, Cancel"
          className="rounded-lg bg-gray-700 hover:bg-gray-500"
          onClick={() => modal.closeModal()}
        />
        <Button
          label="Yes, Proceed"
          className="rounded-lg"
          onClick={initiatePayment}
          disabled={isPending}
          isLoading={isPending}
        />
      </div>
    </div>
  );
};

export default ConfirmUpgrade;
