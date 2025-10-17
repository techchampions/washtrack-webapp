import React, { useEffect, useRef, useState } from "react";
import { Customer, Order, OrderItem } from "@/hooks/query/usegetOrders";
import { formatDate, formatPrice } from "@/utils/formatter";
import SmallItem from "@/components/DashboardComponents/SmallItem";
import { Button } from "@/components/FormComponents";
import { Download } from "lucide-react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas-pro";
import { useAuthStore } from "@/store/auth.store";
import { showError, showSuccess } from "@/utils/toast";
import ShareButton from "@/components/GeneralComponents/ShareButton";

interface Props {
  order?: Order;
  customer?: Customer;
  noOfItems?: string;
  orderItems: OrderItem[];
}
const OrderReceipt: React.FC<Props> = ({
  order,
  customer,
  noOfItems,
  orderItems,
}) => {
  const receiptRef = useRef<HTMLDivElement>(null);
  const [downloading, setdownloading] = useState(false);
  const [shareUrl, setShareUrl] = useState<string>("");
  const { user } = useAuthStore();
  const captureReceiptAsImage = async (): Promise<string> => {
    if (!receiptRef.current) throw new Error("Receipt element not found");

    const canvas = await html2canvas(receiptRef.current, {
      scale: 2,
    });
    return canvas.toDataURL("image.png");
  };

  const handleDownloadPDF = async () => {
    try {
      if (!receiptRef.current) return;
      setdownloading(true);

      const uri = await captureReceiptAsImage();
      const receipt = new jsPDF({
        orientation: "portrait",
        unit: "px",
        format: "a4",
      });

      // Calculate proper dimensions for PDF
      // const imgProps = receipt.getImageProperties(uri);
      const pdfWidth = receipt.internal.pageSize.getWidth();
      const pdfHeight = receipt.internal.pageSize.getHeight();
      const width = pdfWidth / 2;
      receipt.addImage(uri, "PNG", width / 2, 0, width, pdfHeight - 50);
      receipt.save(`receipt-${order?.order_number || "unknown"}.pdf`);
      showSuccess("Receipt Downloaded Successfully");
      setdownloading(false);
    } catch (error) {
      setdownloading(false);
      showError(String(error));
    }
  };
  // Function to generate share URL
  const generateShareUrl = async () => {
    try {
      const uri = await captureReceiptAsImage();
      setShareUrl(uri); // Set the data URL for sharing
      return uri;
    } catch (error) {
      showError("Failed to generate receipt for sharing");
      return "";
    }
  };

  useEffect(() => {
    generateShareUrl();
  });

  return (
    <div className="w-full max-h-[450px] overflow-scroll scrollbar-hide pt-4 mb-3">
      <h3 className="font-bold text-3xl">Order Receipt</h3>
      <div className="grid grid-cols-1 gap-1 px-0" ref={receiptRef}>
        <div className="items-center mb-4 text-center">
          {/* Add your store logo here if available */}
          <div className="w-20 h-20 rounded-full overflow-hidden bg-gray-200 mx-auto mt-3 flex items-center justify-center">
            <img
              src={user?.profile_picture || ""}
              alt={user?.store?.store_name}
              className="w-full h-full"
            />
          </div>

          <h3 className="text-lg font-bold mt-1">{user?.store?.store_name}</h3>
          <p className="text-sm font-normal text-gray-600">
            {user?.store?.store_location}
          </p>
          <p className="text-xs font-normal text-gray-600">{user?.phone_num}</p>
        </div>

        <div className="flex flex-col rounded-lg bg-brand-100 p-4 divide-y divide-gray-300 gap-2 w-full">
          <div className="flex flex-col justify-start text-left text-black">
            <h2 className="text-xl font-bold">Order details</h2>

            <div className="text-sm flex justify-between">
              <span>Order number:</span>
              <span className="font-medium">#{order?.order_number}</span>
            </div>
            <div className="text-sm flex justify-between">
              <span>Order Date:</span>
              <span className="font-medium">
                {formatDate(order?.created_at || "")}
              </span>
            </div>
            <div className="text-sm flex justify-between">
              <span>Pickup Date:</span>
              <span className="font-medium">
                {formatDate(order?.pickup_date || "")}
              </span>
            </div>
            <div className="text-sm flex justify-between">
              <span>No of Items:</span>
              <span className="font-medium">{noOfItems} Items</span>{" "}
            </div>
          </div>
        </div>
        <div className="flex flex-col rounded-lg bg-brand-100 p-4 divide-y divide-gray-300 gap-2 w-full">
          <div className="flex flex-col justify-start text-left text-black">
            <h2 className="text-xl font-bold">Customer details</h2>
            <div className="text-sm flex justify-between">
              <span>Customer name:</span>
              <span className="font-medium">{customer?.name}</span>{" "}
            </div>
            <div className="text-sm flex justify-between">
              <span>Phone number:</span>
              <span className="font-medium">{customer?.phone_number}</span>{" "}
            </div>
            <div className="text-sm flex justify-between">
              <span>Email:</span>
              <span className="font-medium">{customer?.email}</span>
            </div>
          </div>
        </div>

        <div className="space-y-1 mb-2">
          <h3 className="text-left text-black font-bold px-4">Items</h3>
          {orderItems.map((item, index) => (
            <SmallItem
              services={item.service_name}
              items={item.item_type}
              quantity={item.no_of_items}
              key={index}
            />
          ))}
        </div>

        <div className="bg-brand-100 p-4 rounded-lg text-sm">
          <h3 className="text-black text-xl text-left font-bold">
            Payment Details
          </h3>
          <div className="flex justify-between text-black">
            <span>Cost of service</span>
            <span className="font-medium">
              {formatPrice(order?.total_amount || "")}
            </span>
          </div>
          <div className="flex justify-between text-black">
            <span>Amount Paid</span>
            <span className="font-medium">
              {formatPrice(order?.paid_amount || "")}
            </span>
          </div>
          <div className="flex justify-between text-black">
            <span>Balance</span>
            <span className="font-medium text-red-500">
              {formatPrice(order?.balance || "")}
            </span>
          </div>
          <div className="flex justify-between mt-2 bg-brand-300 p-2 rounded-lg text-black font-bold">
            <span>Total Amount</span>
            <span>{formatPrice(order?.total_amount || "")}</span>
          </div>
        </div>
        {/* Footer */}
        <div className="mt-6 mb-3 text-center">
          <p className="text-xs font-bold text-black p-0 m-0">
            Receipt generated by{" "}
            <span className="text-blue-500">washtrack</span>
          </p>
        </div>
      </div>
      <div className="flex items-center absolute justify-between bottom-3 w-full left-0 px-10 gap-4">
        <ShareButton
          url={shareUrl}
          className="text-sm flex items-center !py-1 !bg-transparent !text-black !w-fit px-4 border border-gray-300"
        />
        {/* <Button
          label="Share"
          icon={<Share2 size={18} />}
          className="text-sm flex items-center !py-1 !bg-transparent !text-black !w-fit px-4 border border-gray-300"
        /> */}
        <Button
          label="Download"
          isLoading={downloading}
          onClick={handleDownloadPDF}
          icon={<Download size={18} />}
          className="text-sm !py-1 !bg-black !w-fit px-4 flex items-center"
        />
      </div>
    </div>
  );
};

export default OrderReceipt;
