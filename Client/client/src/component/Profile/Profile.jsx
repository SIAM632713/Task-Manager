import React, { useEffect, useRef } from 'react';
import { ProfileDetailRequest, ProfileUpdateRequest } from "../../APIrequest/APIRequest.js";
import { useSelector } from "react-redux";
import { IsEmail, IsEmpty, IsMobile } from "../../helper/FormHelper.js";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Profile = () => {
    const emailRef = useRef();
    const firstnameRef = useRef();
    const lastnameRef = useRef();
    const mobilenumberRef = useRef();
    const passwordRef = useRef();

    const navigate = useNavigate();

    useEffect(() => {
        ProfileDetailRequest();
    }, []);

    const ProfileDetaillist = useSelector((state) => state.Profile.value);
    const ProfileData=ProfileDetaillist.length>0 ? ProfileDetaillist[0] :{};

    const onSubmmit = (e) => {
        e.preventDefault(); // prevent page reload

        const email = emailRef.current.value;
        const firstname = firstnameRef.current.value;
        const lastname = lastnameRef.current.value;
        const mobile = mobilenumberRef.current.value;
        const password = passwordRef.current.value;

        if (!IsEmail(email)) {
            toast.error("Valid Email Address Required");
        } else if (IsEmpty(firstname)) {
            toast.error("First Name is required");
        } else if (IsEmpty(lastname)) {
            toast.error("Last Name is required");
        } else if (!IsMobile(mobile)) {
            toast.error("Valid Mobile Number is required");
        } else if (IsEmpty(password)) {
            toast.error("Password is required");
        } else {
            ProfileUpdateRequest(email, firstname, lastname, mobile, password).then((result) => {
                if (result === true) {
                    navigate("/");
                }
            });
        }
    };

    return (
        <div className="flex items-center justify-center">
            <div className="bg-white rounded-2xl shadow-2xl p-8 w-full">
                <h2 className="text-2xl font-semibold mb-6">Update Profile</h2>
                <form className="grid grid-cols-1 md:grid-cols-2 gap-6" onSubmit={onSubmmit}>
                    <div className="col-span-1">
                        <label className="block text-gray-700 mb-2">Profile Picture</label>
                        <input type="file" className="w-full px-3 py-2 border border-gray-300 rounded-md" />
                    </div>

                    <div className="col-span-1">
                        <label className="block text-gray-700 mb-2">Email Address</label>
                        <input
                            defaultValue={ProfileData.email || ""}
                            ref={emailRef}
                            type="email"
                            placeholder="User Email"
                            className="w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md"
                        />
                    </div>

                    <div className="col-span-1">
                        <label className="block text-gray-700 mb-2">First Name</label>
                        <input
                            defaultValue={ProfileData.firstName || ""}
                            ref={firstnameRef}
                            type="text"
                            placeholder="First Name"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        />
                    </div>

                    <div className="col-span-1">
                        <label className="block text-gray-700 mb-2">Last Name</label>
                        <input
                            defaultValue={ProfileData.lastName || ""}
                            ref={lastnameRef}
                            type="text"
                            placeholder="Last Name"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        />
                    </div>

                    <div className="col-span-1">
                        <label className="block text-gray-700 mb-2">Mobile</label>
                        <input
                            key={Date.now()}
                            defaultValue={ProfileData.mobile || ""}
                            ref={mobilenumberRef}
                            type="tel"
                            placeholder="Mobile"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        />
                    </div>

                    <div className="col-span-1">
                        <label className="block text-gray-700 mb-2">Password</label>
                        <input
                            key={Date.now()}
                            defaultValue={ProfileData.password || ""}
                            ref={passwordRef}
                            type="password"
                            className="w-full px-3 py-2 bg-yellow-100 border border-gray-300 rounded-md"
                        />
                    </div>

                    <div className="col-span-full flex justify-start">
                        <button
                            type="submit"
                            className="bg-fuchsia-600 hover:bg-fuchsia-700 text-white font-bold py-2 px-6 rounded-md shadow cursor-pointer"
                        >
                            UPDATE
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Profile;