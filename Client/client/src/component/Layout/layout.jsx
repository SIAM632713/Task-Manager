import React from 'react';
import Sideber from "./sideber.jsx";
import Header from "./header.jsx";

const Layout = ({children}) => {
    return (
        <div className="flex h-screen">
            <Sideber/>
            <div className="flex-1 flex flex-col">
                <Header/>
                <main className="p-6 bg-gray-50 flex-1 overflow-y-auto">{children}</main>
            </div>
        </div>
    );
};

export default Layout;