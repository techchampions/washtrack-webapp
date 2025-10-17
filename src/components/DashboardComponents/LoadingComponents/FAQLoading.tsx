import React from "react";

export const FAQLoading: React.FC = () => {
  return (
    <div className="min-h-screen">
      {/* Header Skeleton */}
      <div className="mb-12 text-left">
        <div className="w-3/4 h-8 mb-4 bg-gray-300 rounded animate-pulse"></div>
        <div className="w-1/2 h-4 bg-gray-300 rounded animate-pulse"></div>
      </div>

      {/* FAQ Items Skeleton */}
      <div className="space-y-4">
        {Array.from({ length: 8 }).map((_, index) => (
          <div
            key={index}
            className="overflow-hidden transition-all duration-200 bg-gray-200 rounded-xl animate-pulse"
          >
            <div className="flex items-center justify-between w-full px-6 py-4">
              {/* Question skeleton */}
              <div className="flex-1 space-y-2">
                <div className="w-5/6 h-4 bg-gray-300 rounded"></div>
                <div className="w-4/6 h-4 bg-gray-300 rounded"></div>
              </div>
              {/* Chevron skeleton */}
              <div className="w-5 h-5 ml-4 bg-gray-300 rounded"></div>
            </div>

            {/* Answer skeleton - shown for first item to indicate expandable nature */}
            {index === 0 && (
              <div className="px-6 pb-4">
                <div className="space-y-2">
                  <div className="w-full h-3 bg-gray-300 rounded"></div>
                  <div className="w-full h-3 bg-gray-300 rounded"></div>
                  <div className="w-3/4 h-3 bg-gray-300 rounded"></div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Contact Section Skeleton */}
      <div className="mt-12 text-center">
        <div className="p-6">
          <div className="w-1/3 h-6 mx-auto mb-4 bg-gray-300 rounded animate-pulse"></div>
          <div className="w-1/2 h-4 mx-auto mb-4 bg-gray-300 rounded animate-pulse"></div>
          <div className="w-32 h-10 mx-auto bg-gray-300 rounded animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};
