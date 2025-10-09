import { CheckCircle2 } from "lucide-react";
import React from "react";
interface Props {
  text: string;
}
const PaymentSuccessfull: React.FC<Props> = ({ text }) => {
  return (
    <div className="flex flex-col justify-center items-center py-0 gap-4">
      <CheckCircle2 size={50} className="text-green-500" />
      <h4 className="font-bold">Success</h4>
      <p className="text-gray-400 text-center text-sm">{text}</p>
    </div>
  );
};

export default PaymentSuccessfull;
