import React, {useRef} from 'react';
import {Link} from "react-router-dom";
import {IsEmail, IsEmpty} from "../../helper/FormHelper.js";
import toast from "react-hot-toast";
import {loginRequest} from "../../APIrequest/APIRequest.js";

const Login = () => {

    let passwordRef,emailRef=useRef()

    const Submmit=()=>{
        let email=emailRef.value;
        let password=passwordRef.value;

        if(!IsEmail(email)){
            toast.error("Invalid email");
        }else if(IsEmpty(password)){
           toast.error("Invalid pass");
        } else {
            loginRequest(email,password).then((result)=>{
                if(result===true){
                   window.location.href="/";
                }
            })
        }
    }

    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="w-[500px] p-10 rounded-md shadow-md border border-gray-200 space-y-4">
                <h1 className="text-center mb-4 text-xl font-semibold">Sign In</h1>
                <div>
                    <input ref={(input) => emailRef = input}
                           type="text"
                           placeholder="User Email"
                           className="block mb-3 border px-4 rounded-md py-2 w-full"
                    />
                    <input ref={(input) => passwordRef = input}
                           type="password"
                           placeholder="User Password"
                           className="block mb-3 border px-4 rounded-md py-2 w-full"
                    />
                </div>
                <button onClick={Submmit}
                        className="py-2 w-full bg-[#EC4899] rounded-md text-white mb-4 cursor-pointer">
                    Next
                </button>

                <Link to="/registration">
                <h1 className="text-center text-sm cursor-pointer hover:underline mb-2">Sign Up</h1>
                    </Link>
                    <Link to="/send-otp">
                        <h1 className="text-center text-sm cursor-pointer hover:underline">Forgot Password</h1>
                    </Link>

            </div>
        </div>
    );
};

export default Login;
