// components/FAQ.js
import { Header } from "@/components/DashboardComponents";
import { FAQLoading } from "@/components/DashboardComponents/LoadingComponents/FAQLoading";
import { useGetFAQs } from "@/hooks/query/useGetFAQs";
import { ChevronDown, ChevronUp } from "lucide-react";
import React, { useState } from "react";

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const { data, isLoading } = useGetFAQs();
  const toggleFAQ = (index: number | null) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqData = data?.faq ?? [];
  if (isLoading) {
    return <FAQLoading />;
  }
  return (
    <div className="min-h-screen">
      <Header />
      <div className="">
        {/* Header */}
        <div className="mb-12 text-left">
          <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            Frequently Asked Questions
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            Find answers to common questions about our products and services
          </p>
        </div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {faqData.map((faq, index) => (
            <div
              key={index}
              className="overflow-hidden transition-all duration-200 bg-brand-200 rounded-xl"
            >
              <button
                className="flex items-center justify-between w-full px-6 py-4 text-left"
                onClick={() => toggleFAQ(index)}
              >
                <span className="pr-4 text-sm font-medium text-gray-900 md:text-lg">
                  {faq.question}
                </span>
                {openIndex === index ? (
                  <ChevronUp className="flex-shrink-0 w-5 h-5 text-gray-500" />
                ) : (
                  <ChevronDown className="flex-shrink-0 w-5 h-5 text-gray-500" />
                )}
              </button>

              <div
                className={`px-6 pb-0 transition-all duration-300 ease-in-out text-left ${
                  openIndex === index
                    ? "max-h-96 opacity-100 pb-4"
                    : "max-h-0 opacity-0 overflow-hidden"
                }`}
              >
                <div
                  className="text-sm leading-relaxed text-gray-600 [&>ul]:list-disc [&>ul]:list-inside"
                  dangerouslySetInnerHTML={{ __html: faq.answer }}
                />
                {/* <p className="text-sm leading-relaxed text-gray-600">
                  {faq.answer}
                </p> */}
              </div>
            </div>
          ))}
        </div>

        {/* Contact Section */}
        <div className="mt-12 text-center">
          <div className="p-6">
            <h3 className="mb-2 text-xl font-semibold text-gray-900">
              Still have questions?
            </h3>
            <p className="mb-4 text-gray-600">
              Can't find the answer you're looking for? Please contact our
              support team.
            </p>
            <button className="px-6 py-2 font-medium text-white transition-colors duration-200 bg-black rounded-lg">
              Contact Support
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
