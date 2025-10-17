import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { Swiper as SwiperType } from "swiper/types";
// import "swiper/css";
// import "swiper/css/navigation";
// import "swiper/css/pagination";
// import "swiper/css/scrollbar";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useGetUserProfile } from "@/hooks/query/useGetUserProfile";
import { formatPrice } from "@/utils/formatter";
// import OrderList from "@/components/DashboardComponents/OrderList";
// import { useGetOrders } from "@/hooks/query/usegetOrders";
// import { ArrowRight } from "lucide-react";
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
  // const { data: orderData } = useGetOrders("all");
  // const orders = orderData?.orders ?? [];
  const stats = [
    { text: "Total Customers", value: "12" },
    { text: "Total Orders", value: "18" },
    { text: "Total Expenses", value: formatPrice(25000) },
    { text: "Total Outstanding", value: formatPrice(15000) },
    { text: "Total Income", value: formatPrice(56000) },
  ];

  return (
    <div className="flex-col hidden w-full h-full gap-4 lg:w-1/3 lg:flex">
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
                  className="object-cover w-full h-full rounded-3xl"
                />
              </SwiperSlide>
            ))
          ) : (
            <SwiperSlide>
              <div className="w-full h-full bg-gray-300"></div>
            </SwiperSlide>
          )}
        </Swiper>

        <button
          ref={prevRef}
          className="absolute z-10 p-2 -translate-y-1/2 rounded-full shadow cursor-pointer left-2 top-1/2 bg-white/50 bg-opacity-60 hover:bg-opacity-90"
        >
          <FaChevronLeft size={20} />
        </button>
        <button
          ref={nextRef}
          className="absolute z-10 p-2 -translate-y-1/2 rounded-full shadow cursor-pointer right-2 top-1/2 bg-white/50 bg-opacity-60 hover:bg-opacity-90"
        >
          <FaChevronRight size={20} />
        </button>
      </div>
      <div className="flex items-center justify-between px-5 py-2 text-left text-white bg-brand rounded-xl">
        <div className="">
          <div className="font-bold">{data?.user.store_name}</div>
          <div className="text-sm">{data?.user.plan?.name}</div>
        </div>
        <LinkButton
          href="/dashboard/settings/subscription/all"
          label="Upgrade plan"
          className="!w-fit bg-white hover:!bg-white/70 px-4 text-sm !font-normal !text-brand rounded-lg"
        />
      </div>
      {stats.map((item, i) => (
        <div
          className="flex justify-between px-5 py-2 bg-gray-100 rounded-xl"
          key={i}
        >
          <div className="font-bold">{item.text}:</div>
          <div className="">{item.value}</div>
        </div>
      ))}
      {/* <div className="space-y-2">
        <div className="font-bold text-left">Recent Orders</div>
        <OrderList orders={orders.slice(0, 4)} />
        <LinkButton
          href="/dashboard/orders"
          label="View more"
          rightIcon={<ArrowRight />}
          className="!text-black"
        />
      </div> */}
    </div>
  );
};

export default RightSideBar;
