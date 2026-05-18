import { ErrorBoundary } from "@/components/common/ErrorBoundary/ErrorBoundary";
import Modal from "@/components/DashboardComponents/Modal2";
import Loader from "@/components/GeneralComponents/Loader";
import { AppRoutes } from "@/routes/AppRoute";
import "@/styles/globals.css";
import { Libraries, LoadScript } from "@react-google-maps/api";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React, { useEffect } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter } from "react-router-dom";
import "./App.css";
import ToasterProvider from "./provider/ToasterProvider";
const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
const LIBRARIES: Libraries = ["places"];

const queryClient = new QueryClient();

const App: React.FC = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://js.paystack.co/v1/inline.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);
  console.log(GOOGLE_MAPS_API_KEY);

  return (
    <LoadScript
      loadingElement={<Loader className="!h-15 !w-15" />}
      googleMapsApiKey={GOOGLE_MAPS_API_KEY}
      libraries={LIBRARIES}
    >
      <ErrorBoundary>
        <HelmetProvider>
          <QueryClientProvider client={queryClient}>
            <BrowserRouter>
              <AppRoutes />
              <Modal />
              <ToasterProvider />
            </BrowserRouter>

            {/* React Query DevTools - Only in development
            {import.meta.env.DEV && (
              <ReactQueryDevtools initialIsOpen={false} />
            )} */}
          </QueryClientProvider>
        </HelmetProvider>
      </ErrorBoundary>
    </LoadScript>
  );
};

export default App;
