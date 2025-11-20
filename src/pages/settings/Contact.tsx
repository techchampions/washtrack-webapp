import { Header, RightSideBar } from "@/components/DashboardComponents";
import Loader from "@/components/GeneralComponents/Loader";
import { useGetContacts } from "@/hooks/query/useGetFAQs";
import { ChevronRight, Globe, Mail, MapPin, Phone } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

const Contact = () => {
  const { data, isLoading } = useGetContacts();
  if (isLoading) {
    return <Loader />;
  }
  const contacts = data?.contact ?? [];
  const getContactLink = (item: { name: string; value: string }) => {
    switch (item.name) {
      case "email":
        return `mailto:${item.value}`;
      case "phone": // Remove any non-digit characters for tel link
      {
        const phoneNumber = item.value.replace(/\D/g, "");
        return `tel:${phoneNumber}`;
      }
      case "website": // Ensure website has proper protocol
      {
        const website = item.value.startsWith("http")
          ? item.value
          : `https://${item.value}`;
        return website;
      }
      case "address":
        // Create Google Maps link for address
        return `https://maps.google.com/?q=${encodeURIComponent(item.value)}`;
      default:
        return "#";
    }
  };
  return (
    <div>
      <Header />
      <div className="flex flex-col gap-6 lg:flex-row">
        <div className="w-full md:w-2/3">
          <h2>Contact US</h2>
          <div className="space-y-2">
            {contacts.map((item, i) => (
              <Link
                to={getContactLink(item)}
                key={i}
                className="flex items-center gap-2 p-4 text-left cursor-pointer bg-brand-200 rounded-xl text-quick-action-icon"
              >
                {item.name === "email" ? (
                  <Mail />
                ) : item.name === "address" ? (
                  <MapPin />
                ) : item.name === "phone" ? (
                  <Phone />
                ) : item.name === "website" ? (
                  <Globe />
                ) : (
                  <></>
                )}
                <div className="flex-1">{item.value}</div>
                <ChevronRight />
              </Link>
            ))}
          </div>
        </div>
        <RightSideBar />
      </div>
    </div>
  );
};

export default Contact;
