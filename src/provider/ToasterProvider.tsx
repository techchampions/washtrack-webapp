import React from "react";
import { Toaster } from "react-hot-toast";

const ToasterProvider: React.FC = () => {
  return (
    <Toaster
      position="top-right"
      toastOptions={{
        duration: 3000,
        style: {
          background: "#1f2937",
          color: "#fff",
          borderRadius: "0.5rem",
          padding: "12px 16px",
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
