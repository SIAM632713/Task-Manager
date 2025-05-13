import React, { useState } from 'react';
import {
    FaTasks, FaPlus, FaClipboardList,
    FaHourglassHalf, FaCheck, FaTimes, FaBars
} from 'react-icons/fa';
import { Link, useLocation } from "react-router-dom";
const Sideber = () => {

    const [isOpen, setIsOpen] = useState(true);
    const location = useLocation(); // for active link highlighting

    const toggleSidebar = () => setIsOpen(!isOpen);

    const menuItems = [
        { path: '/', label: 'Dashboard', icon: <FaTasks size={20} /> },
        { path: '/creat', label: 'Create New', icon: <FaPlus size={20} /> },
        { path: '/new-task', label: 'New Task', icon: <FaClipboardList size={20} /> },
        { path: '/progress', label: 'In Progress', icon: <FaHourglassHalf size={20} /> },
        { path: '/complete', label: 'Completed', icon: <FaCheck size={20} /> },
        { path: '/cancel', label: 'Canceled', icon: <FaTimes size={20} /> },
    ];

    return (
        <div
            className={`h-screen bg-gradient-to-b from-white to-gray-100 shadow-xl transition-all duration-300 ${isOpen ? 'w-72' : 'w-20'} px-4 py-6 relative`}>
            {/* Toggle Button */}
            <div className="flex justify-start mb-6">
                <button onClick={toggleSidebar}
                        className="text-2xl text-gray-600 hover:text-purple-600 transition duration-300">
                    <FaBars/>
                </button>
            </div>

            {/* Title */}
            {isOpen && <h2 className="text-2xl font-bold mb-8 text-purple-700 tracking-wide">TASK MANAGER</h2>}

            {/* Menu Items */}
            <ul className="space-y-3">
                {menuItems.map((item, index) => {
                    const isActive = location.pathname === item.path;
                    return (
                        <Link to={item.path} key={index}>
                            <li className={`
                flex items-center rounded-lg px-4 py-3 
                cursor-pointer transition-all duration-300 
                ${isActive ? 'bg-purple-100 text-purple-700' : 'text-gray-700 hover:bg-purple-50 hover:text-purple-600'}
                ${isOpen ? 'justify-start gap-5' : 'justify-center'}
              `}>
                                {item.icon}
                                {isOpen && <span className="text-md font-medium">{item.label}</span>}
                            </li>
                        </Link>
                    );
                })}
            </ul>
        </div>
    );
};

export default Sideber;