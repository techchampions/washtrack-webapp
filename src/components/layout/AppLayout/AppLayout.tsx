import React, { ElementType, ReactNode } from "react";
import { Outlet } from "react-router-dom";

export const AppLayout = () => {

    return (
       <main className="min-h-screen flex items-center justify-center bg-gray-100">
            <Outlet />

        </main>
    )

}
