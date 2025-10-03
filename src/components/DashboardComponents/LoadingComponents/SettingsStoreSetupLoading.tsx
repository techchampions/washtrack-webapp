import React from "react";
import Header from "@/components/DashboardComponents/Header";
import RightSideBar from "@/components/DashboardComponents/RightSideBar";

const SettingStoreSetupLoading = () => {
  return (
    <div className="">
      <Header />
      <div className="flex flex-col gap-6 md:flex-row">
        <div className="w-full lg:w-2/3">
          <div className="mb-3 text-center">
            <div className="w-48 h-8 mx-auto mb-2 bg-gray-200 rounded-lg animate-pulse"></div>
            <div className="w-64 h-4 mx-auto bg-gray-200 rounded animate-pulse"></div>
          </div>

          <div className="space-y-6">
            {/* Profile Picture Skeleton */}
            <div className="flex justify-center py-2">
              <div className="w-24 h-24 bg-gray-200 rounded-full animate-pulse"></div>
            </div>

            <div className="flex flex-col w-full px-3 space-y-4">
              {/* Store Name Skeleton */}
              <div>
                <div className="w-24 h-4 mb-2 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-12 bg-gray-200 rounded-xl animate-pulse"></div>
              </div>

              {/* Store Location Skeleton */}
              <div>
                <div className="w-32 h-4 mb-2 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-12 bg-gray-200 rounded-xl animate-pulse"></div>
              </div>

              {/* Store Description Skeleton */}
              <div>
                <div className="h-4 mb-2 bg-gray-200 rounded w-36 animate-pulse"></div>
                <div className="h-24 bg-gray-200 rounded-xl animate-pulse"></div>
              </div>

              {/* Store Banner Upload Skeleton */}
              <div>
                <div className="w-40 h-4 mb-2 bg-gray-200 rounded animate-pulse"></div>
                <div className="w-48 h-3 mb-3 bg-gray-200 rounded animate-pulse md:hidden"></div>
                <div className="flex gap-4 overflow-x-scroll scrollbar-hide md:grid md:grid-cols-3">
                  {[1, 2, 3].map((item) => (
                    <div
                      key={item}
                      className="min-w-[200px] h-[100px] bg-gray-200 rounded-lg animate-pulse"
                    ></div>
                  ))}
                </div>
              </div>
            </div>

            {/* Submit Button Skeleton */}
            <div className="mt-5">
              <div className="w-32 h-12 bg-gray-200 rounded-lg animate-pulse"></div>
            </div>
          </div>
        </div>
        <RightSideBar />
      </div>
    </div>
  );
};

export default SettingStoreSetupLoading;
