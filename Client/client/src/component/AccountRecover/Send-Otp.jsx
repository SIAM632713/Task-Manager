import React, {useRef} from 'react';
import {IsEmail} from "../../helper/FormHelper.js";
import toast from "react-hot-toast";
import {RecoverEmailRequest} from "../../APIrequest/APIRequest.js";
import {useNavigate} from "react-router-dom";

const SendOtp = () => {

    let navigate = useNavigate();
    let emailRef=useRef()

    const verifyemail=()=>{
        let email=emailRef.value;
        if(!IsEmail(email)){
            toast.error("Valid email is invalid");
        }else {
            RecoverEmailRequest(email).then((result)=>{
                 if(result===true){
                     navigate("/verify-otp")
                 }
            })
        }
    }

    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="w-[500px] p-10 rounded-md shadow-md border border-gray-200 space-y-4">
                <h1 className="text-center mb-4 text-xl font-semibold"> EMAIL ADDRESS</h1>
                <div>
                    <label className="font-bold">Your email address</label>
                    <input
                        ref={(input)=>emailRef=input}
                           type="email"
                           placeholder="Enter Email"
                           className="block mb-3 border px-4 rounded-md py-2 w-full"
                    />
                </div>
                <button onClick={verifyemail}
                        className="py-2 w-full bg-[#EC4899] rounded-md text-white mb-4 cursor-pointer">
                    Next
                </button>
            </div>
        </div>
    );
};

export default SendOtp;