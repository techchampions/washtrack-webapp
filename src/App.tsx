import "./App.css";
import ToasterProvider from "./provider/ToasterProvider";
// import AllRoutes from "./routes";
import "react-datepicker/dist/react-datepicker.css";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { HelmetProvider } from "react-helmet-async";
import { AppRoutes } from "@/routes/AppRoute";
import { ErrorBoundary } from "@/components/common/ErrorBoundary/ErrorBoundary";
// import { persistQueryClient } from "@tanstack/react-query-persist-client";
// import { createAsyncStoragePersister } from "@tanstack/query-async-storage-persister";

import "@/styles/globals.css";
import { Libraries, LoadScript } from "@react-google-maps/api";
import Loader from "@/components/GeneralComponents/Loader";
import Modal from "@/components/DashboardComponents/Modal2";
const GOOGLE_MAPS_API_KEY = "AIzaSyBPIyWllHG8je77s56Pyp69b5mzlghzD9U";

const LIBRARIES: Libraries = ["places"];

const queryClient = new QueryClient();
// const queryClient = new QueryClient({
//   defaultOptions: {
//     queries: {
//       retry: 1,
//       refetchOnWindowFocus: true,
//       staleTime: 5 * 60 * 1000, // 5 minutes
//       gcTime: 10 * 60 * 1000, // 10 minutes (formerly cacheTime)
//     },
//     mutations: {
//       retry: 0,
//     },
//   },
// });

// const localStoragePersister = createAsyncStoragePersister({
//   storage: window.localStorage,
// });

// persistQueryClient({
//   queryClient,
//   persister: localStoragePersister,
// });

const App: React.FC = () => {
  return (
    <LoadScript
      loadingElement={<Loader />}
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

            {/* React Query DevTools - Only in development */}
            {import.meta.env.DEV && (
              <ReactQueryDevtools initialIsOpen={false} />
            )}
          </QueryClientProvider>
        </HelmetProvider>
      </ErrorBoundary>
    </LoadScript>
  );
};

export default App;
