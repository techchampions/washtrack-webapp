import React from "react";
import { Toaster } from "react-hot-toast";

const ToasterProvider: React.FC = () => {
  return (
    <Toaster
      position="top-center"
      toastOptions={{
        duration: 3000,
        style: {
          // background: "#1f2937",
          background: "white",
          color: "black",
          borderRadius: "0.5rem",
          // padding: "12px 16px",
          padding: "2px 10px",
          textAlign: "left",
        },
        success: {
          iconTheme: {
            primary: "#22c55e",
            secondary: "#f0fdf4",
          },
        },
        error: {
          iconTheme: {
            primary: "#ef4444",
            secondary: "#fef2f2",
          },
        },
      }}
    />
  );
};

export default ToasterProvider;
