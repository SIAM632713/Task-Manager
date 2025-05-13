import React, {useRef} from 'react';
import {Link, useNavigate} from "react-router-dom";
import { IsEmail, IsEmpty, IsMobile} from "../../helper/FormHelper.js";
import {RegistrationRequest} from "../../APIrequest/APIRequest.js";
import toast from "react-hot-toast";

const Registration = () => {
    let emailRef = useRef();
    let firstnameRef = useRef();
    let lastnameRef = useRef();
    let mobilenumberRef = useRef();
    let passwordRef = useRef();

    let navigate = useNavigate();

    const onSubmmit=()=> {
        let email = emailRef.value
        let firstname = firstnameRef.value
        let lastname = lastnameRef.value
        let mobile = mobilenumberRef.value
        let password = passwordRef.value


        if(!IsEmail(email)){
            toast.error("Valid Email Address Required")
        }else if(IsEmpty(firstname)){
            toast.error("First Name is required")
        }else if(IsEmpty(lastname)){
            toast.error("Last Name is required")
        }else if(!IsMobile(mobile)){
            toast.error("Valid Mobile Number is required")
        }else if(IsEmpty(password)){
            toast.error("password is required")
        }else {
            RegistrationRequest(email,firstname,lastname,mobile,password).then((result)=>{
                if(result===true){
                    navigate("/login")
                }
            })
        }
    }


    return (
        <div className="flex items-center justify-center min-h-screen ">
            <div className="w-[500px] p-10 rounded-md shadow-md border border-gray-200 space-y-4">
                <h1 className="text-center mb-4 text-xl font-semibold">Sign In</h1>
                <div>
                    <input ref={(input)=>emailRef=input}
                        type="text"
                        placeholder="User Email"
                        className="block mb-3 border px-4 rounded-md py-2 w-full"
                    />
                    <input ref={(input)=>firstnameRef=input}
                        type="text"
                        placeholder="First Name"
                        className="block mb-3 border px-4 rounded-md py-2 w-full"
                    />
                    <input ref={(input)=>lastnameRef=input}
                        type="text"
                        placeholder="Last Name"
                        className="block mb-3 border px-4 rounded-md py-2 w-full"
                    />
                    <input ref={(input)=>mobilenumberRef=input}
                        type="text"
                        placeholder="Mobile Number"
                        className="block mb-3 border px-4 rounded-md py-2 w-full"
                    />
                    <input ref={(input)=>passwordRef=input}
                        type="password"
                        placeholder="User Password"
                        className="block mb-3 border px-4 rounded-md py-2 w-full"
                    />
                </div>
                <button onClick={onSubmmit} className="py-2 w-full bg-[#EC4899] rounded-md text-white mb-4 cursor-pointer">
                    Next
                </button>

                <Link to="/login">
                    <h1 className="text-center text-sm cursor-pointer hover:underline mb-2">Sign In</h1>
                </Link>
                <Link to="/forgetpass">
                    <h1 className="text-center text-sm cursor-pointer hover:underline">Forgot Password</h1>
                </Link>

            </div>
        </div>
    );
};

export default Registration;