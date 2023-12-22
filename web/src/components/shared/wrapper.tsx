import React from "react";
import Sidebar from "./sidebar";

interface WrapperProps {
    children: React.ReactNode;
}

export const Wrapper: React.FC<WrapperProps> = ({ children }) => {
    return (
        <div className="h-screen flex flex-row justify-start overflow-y-hidden">
            <Sidebar />
            <main className="flex-1 overflow-y-auto">{children}</main>
        </div>
    );
};
