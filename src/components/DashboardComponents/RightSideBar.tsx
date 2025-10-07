import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { Swiper as SwiperType } from "swiper/types";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useGetUserProfile } from "@/hooks/query/useGetUserProfile";
import { Button } from "@/components/FormComponents";
import { formatPrice } from "@/utils/formatter";
import OrderList from "@/components/DashboardComponents/OrderList";
import { useGetOrders } from "@/hooks/query/usegetOrders";
import { ArrowRight } from "lucide-react";
import LinkButton from "@/components/GeneralComponents/LinkButton";

const SLIDES = [
  "/src/assets/images/landing-banner-image.png",
  "/src/assets/images/landing-banner-image1.png",
  "/src/assets/images/ads.png",
];

const RightSideBar = () => {
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);

  const hasPhotos = SLIDES.length > 0;
  const { data } = useGetUserProfile();
  const { data: orderData } = useGetOrders("all");
  const orders = orderData?.orders ?? [];
  const stats = [
    { text: "Total Customers", value: "12" },
    { text: "Total Orders", value: "18" },
    { text: "Total Expenses", value: formatPrice(25000) },
    { text: "Total Outstanding", value: formatPrice(15000) },
    { text: "Total Income", value: formatPrice(56000) },
  ];

  return (
    <div className="w-full h-full lg:w-1/3 hidden md:flex flex-col gap-4">
      <div className="relative w-full h-[170px] rounded-lg overflow-hidden">
        <Swiper
          spaceBetween={10}
          slidesPerView={1}
          navigation={{
            prevEl: prevRef.current,
            nextEl: nextRef.current,
          }}
          onBeforeInit={(swiper: SwiperType) => {
            if (
              swiper.params.navigation &&
              typeof swiper.params.navigation === "object"
            ) {
              swiper.params.navigation.prevEl = prevRef.current;
              swiper.params.navigation.nextEl = nextRef.current;
            }
          }}
          modules={[Navigation]}
          className="w-full h-full rounded-lg"
        >
          {hasPhotos ? (
            SLIDES.map((img, idx) => (
              <SwiperSlide key={idx}>
                <img
                  src={img}
                  alt={`Image ${idx + 1}`}
                  className="object-cover rounded-3xl h-full w-full"
                />
              </SwiperSlide>
            ))
          ) : (
            <SwiperSlide>
              <div className="bg-gray-300 h-full w-full"></div>
            </SwiperSlide>
          )}
        </Swiper>

        <button
          ref={prevRef}
          className="absolute cursor-pointer left-2 top-1/2 -translate-y-1/2 z-10 bg-white/50 bg-opacity-60 rounded-full p-2 shadow hover:bg-opacity-90"
        >
          <FaChevronLeft size={20} />
        </button>
        <button
          ref={nextRef}
          className="absolute cursor-pointer right-2 top-1/2 -translate-y-1/2 z-10 bg-white/50 bg-opacity-60 rounded-full p-2 shadow hover:bg-opacity-90"
        >
          <FaChevronRight size={20} />
        </button>
      </div>
      <div className="bg-brand text-left text-white px-5 py-2 rounded-xl flex justify-between items-center">
        <div className="">
          <div className="font-bold">{data?.user.store_name}</div>
          <div className="text-sm">{data?.user.plan?.name}</div>
        </div>
        <Button
          label="Upgrade plan"
          className="!w-fit bg-white hover:!bg-white/70 px-4 text-sm !text-brand rounded-lg"
        />
      </div>
      {stats.map((item, i) => (
        <div
          className="bg-gray-100 rounded-xl px-5 py-2 flex justify-between"
          key={i}
        >
          <div className="font-bold">{item.text}:</div>
          <div className="">{item.value}</div>
        </div>
      ))}
      <div className="space-y-2">
        <div className="text-left font-bold">Recent Orders</div>
        <OrderList orders={orders} />
        <LinkButton
          href="/dashboard/orders"
          label="View more"
          rightIcon={<ArrowRight />}
          className="!text-black"
        />
      </div>
    </div>
  );
};

export default RightSideBar;
