import React, {useRef} from 'react';
import {IsEmpty} from "../../helper/FormHelper.js";
import toast from "react-hot-toast";
import {RecoverPasswordRequest} from "../../APIrequest/APIRequest.js";
import {getEmail, getOtp} from "../../helper/SessionHelper.js";
import {useNavigate} from "react-router-dom";

const CreatPassword = () => {

    let NewpasswordRef = useRef();
    let comfirmPasswordRef = useRef();

    let navigate=useNavigate();


    const SubmmitPassword = () => {
        let password = NewpasswordRef.current.value;
        let comfirmPassword = comfirmPasswordRef.current.value;


        if(IsEmpty(password)){
            toast.error("password is required")
        }else if(IsEmpty(comfirmPassword)){
            toast.error("comfirmPassword is required")
        }else if(password!==comfirmPassword){
             toast.error("password is not matched")
        }else {
            RecoverPasswordRequest(getEmail(),getOtp(),password).then((result)=>{
                if(result===true){
                    navigate("/login")
                }
            })
        }
    }

    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="w-[500px] p-10 rounded-md shadow-md border border-gray-200 space-y-4">
                <h1 className="text-center mb-4 text-xl font-semibold">SET NEW PASSWORD</h1>
                <div>
                    <label className="font-bold">Your email address</label>
                    <input
                        readOnly={true}
                        value={getEmail()}
                        type="text"
                        placeholder="Enter Email"
                        className="block mb-3 border px-4 rounded-md py-2 w-full"
                    />

                    <label className="font-bold">new password</label>
                    <input
                        ref={NewpasswordRef}
                        type="password"
                        placeholder="Enter password"
                        className="block mb-3 border px-4 rounded-md py-2 w-full"
                    />

                    <label className="font-bold">confirm password</label>
                    <input
                        ref={comfirmPasswordRef}
                        type="password"
                        placeholder="confirm password"
                        className="block mb-3 border px-4 rounded-md py-2 w-full"
                    />
                </div>
                <button
                    onClick={SubmmitPassword}
                    className="py-2 w-full bg-[#EC4899] rounded-md text-white mb-4 cursor-pointer">
                    Next
                </button>
            </div>
        </div>
    );
};

export default CreatPassword;