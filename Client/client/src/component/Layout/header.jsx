import React, { useState, useRef, useEffect } from 'react';
import { removeSession } from "../../helper/SessionHelper.js";
import { Link } from "react-router-dom";
import {useSelector} from "react-redux";
import {ProfileDetailRequest} from "../../APIrequest/APIRequest.js";


const Header = () => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    const ProfileDetaillist = useSelector((state) => state.Profile.value);
    const ProfileData=ProfileDetaillist.length>0 ? ProfileDetaillist[0] :{};

    useEffect(() => {
        ProfileDetailRequest();
    }, []);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setDropdownOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const Logout = () => {
        removeSession();
    }

    return (
        <div className="h-16 w-full bg-white shadow-md flex items-center justify-between px-6 relative">
            <div className="text-lg font-semibold"></div>
            <div className="flex items-center gap-4 relative">
                <button className="hover:scale-110 transition-transform duration-300 ease-in-out">⛶</button>
                <div className="relative" ref={dropdownRef}>
                    <img
                        src="https://i.pravatar.cc/30"
                        alt="User"
                        className="w-8 h-8 rounded-full cursor-pointer hover:ring-2 hover:ring-blue-300 transition-all duration-200"
                        onClick={() => setDropdownOpen(!dropdownOpen)}
                    />
                    {dropdownOpen && (
                        <div className="absolute right-0 mt-2 w-52 bg-white rounded-md shadow-lg z-10">
                            <div className="p-4 border-b text-center">
                                <img
                                    src="https://i.pravatar.cc/50"
                                    alt="User Large"
                                    className="w-12 h-12 rounded-full mx-auto mb-2"
                                />
                                <p className="font-semibold">{ProfileData.firstName || ""}</p>
                            </div>
                            <ul className="text-sm">
                                <Link to="/profile">
                                    <li className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 cursor-pointer transition-colors duration-200 ease-in-out">
                                        <span>👤</span> Profile
                                    </li>
                                </Link>
                                <li onClick={Logout}
                                    className="flex items-center gap-2 px-4 py-2 hover:bg-pink-100 cursor-pointer border-l-4 border-pink-400 transition-all duration-200 ease-in-out">
                                    <span>⎋</span> Logout
                                </li>
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Header;
