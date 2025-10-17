import { Header, RightSideBar } from "@/components/DashboardComponents";
import React from "react";

const Contact = () => {
  return (
    <div>
      <Header />
      <div className="flex">
        <div className="w-2/3">
          <h2>Contact US</h2>
        </div>
        <RightSideBar />
      </div>
    </div>
  );
};

export default Contact;
