import React, { useEffect, useRef, useState } from "react";
import { Customer, Order, OrderItem } from "@/hooks/query/usegetOrders";
import { formatDate, formatPrice } from "@/utils/formatter";
// import SmallItem from "@/components/DashboardComponents/SmallItem";
import { Button } from "@/components/FormComponents";
import { Download } from "lucide-react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas-pro";
import { useAuthStore } from "@/store/auth.store";
import { showError, showSuccess } from "@/utils/toast";
import ShareButton from "@/components/GeneralComponents/ShareButton";
import { useModal } from "@/store/useModal.store";
import OrderCreateSuccess from "@/components/DashboardComponents/CreateOrderComponents/OrderCreateSuccess";

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
  const modal = useModal();
  const receiptRef = useRef<HTMLDivElement>(null);
  const [downloading, setdownloading] = useState(false);
  const [shareUrl, setShareUrl] = useState<string>("");
  const { user } = useAuthStore();

  const captureReceiptAsImage = async (): Promise<string> => {
    if (!receiptRef.current) throw new Error("Receipt element not found");

    const canvas = await html2canvas(receiptRef.current, {
      scale: 2,
      useCORS: true,
      allowTaint: false,
      logging: false,
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
        unit: "mm",
        format: [100, 200],
      });

      // Calculate proper dimensions for PDF
      // const imgProps = receipt.getImageProperties(uri);
      // const pdfWidth = receipt.internal.pageSize.getWidth();
      const pdfHeight = receipt.internal.pageSize.getHeight();
      // const width = pdfWidth - pdfWidth / 4;
      receipt.addImage(uri, "PNG", 10, 0, 80, pdfHeight);
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
      <h3 className="text-3xl font-bold">Order Receipt</h3>
      <div className="grid grid-cols-1 gap-1 px-0" ref={receiptRef}>
        <div className="items-center mb-4 text-center">
          {/* Add your store logo here if available */}
          <div className="flex items-center justify-center w-20 h-20 mx-auto mt-3 overflow-hidden bg-gray-200 rounded-full">
            <img
              onClick={() =>
                modal.openModal(
                  <OrderCreateSuccess order_id={order?.id || 0} />
                )
              }
              src={user?.profile_picture || ""}
              alt={user?.store?.store_name}
              className="w-full h-full"
            />
          </div>

          <h3 className="mt-1 text-lg font-bold">{user?.store?.store_name}</h3>
          <p className="text-sm font-normal text-gray-600">
            {user?.store?.store_location}
          </p>
          <p className="text-xs font-normal text-gray-600">{user?.phone_num}</p>
        </div>

        <h2 className="text-xl font-bold text-left">Order details</h2>
        <div className="flex flex-col w-full gap-2 p-4 divide-y divide-gray-300 rounded-lg bg-brand-100">
          <div className="flex flex-col justify-start text-left text-black">
            <div className="flex justify-between text-sm">
              <span>Order number:</span>
              <span className="font-medium">#{order?.order_number}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Order Date:</span>
              <span className="font-medium">
                {formatDate(order?.created_at || "")}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Pickup Date:</span>
              <span className="font-medium">
                {formatDate(order?.pickup_date || "")}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span>No of Items:</span>
              <span className="font-medium">{noOfItems} Items</span>{" "}
            </div>
          </div>
        </div>
        <h2 className="text-xl font-bold text-left">Customer details</h2>
        <div className="flex flex-col w-full gap-2 p-4 divide-y divide-gray-300 rounded-lg bg-brand-100">
          <div className="flex flex-col justify-start text-left text-black">
            <div className="flex justify-between text-sm">
              <span>Customer name:</span>
              <span className="font-medium">{customer?.name}</span>{" "}
            </div>
            <div className="flex justify-between text-sm">
              <span>Phone number:</span>
              <span className="font-medium">{customer?.phone_number}</span>{" "}
            </div>
            <div className="flex justify-between text-sm">
              <span>Email:</span>
              <span className="font-medium">{customer?.email}</span>
            </div>
          </div>
        </div>

        <div className="mb-2 space-y-1">
          <h3 className="font-bold text-left text-black">Items</h3>
          <div className="px-4 py-2 text-xs text-left rounded-lg bg-brand-100">
            {orderItems.map((item) => (
              <div className="">
                <div className="">{item.service_name}</div>
                <div className="text-gray-400 text-[10px]">
                  {item.item_type}
                </div>
              </div>
            ))}
          </div>
          {/* {orderItems.map((item, index) => (
            <SmallItem
              services={item.service_name}
              items={item.item_type}
              quantity={item.no_of_items}
              key={index}
            />
          ))} */}
        </div>

        <h3 className="text-xl font-bold text-left text-black">
          Payment Details
        </h3>
        <div className="p-4 text-sm rounded-lg bg-brand-100">
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
          <div className="flex justify-between p-2 mt-2 font-bold text-black rounded-lg bg-brand-300">
            <span>Total Amount</span>
            <span>{formatPrice(order?.total_amount || "")}</span>
          </div>
        </div>
        {/* Footer */}
        <div className="mt-6 mb-3 text-center">
          <p className="p-0 m-0 text-xs font-bold text-black">
            Receipt generated by{" "}
            <span className="text-blue-500">washtrack</span>
          </p>
        </div>
      </div>
      <div className="absolute left-0 flex items-center justify-between w-full gap-4 px-10 bottom-3">
        <ShareButton
          url={shareUrl}
          className="text-sm flex items-center !py-1 !bg-transparent !text-black !w-fit px-4 border border-gray-300"
        />
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
