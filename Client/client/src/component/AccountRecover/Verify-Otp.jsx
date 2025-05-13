import React, {useState} from 'react';
import ReactCodeInput from 'react-code-input';
import toast from "react-hot-toast";
import {RecoverOtpRequest} from "../../APIrequest/APIRequest.js";
import {getEmail} from "../../helper/SessionHelper.js";
import {useNavigate} from "react-router-dom";

const VerifyOtp = () => {

   let navigate = useNavigate();
    const inputStyle = {
        width: '45px',
        height: '45px',
        margin: '4px',
        fontSize: '18px',
        borderRadius: '6px',
        border: '2px solid #d1d5db',
        textAlign: 'center',
    };

    let [Otp, setOtp] = useState('');

    const SubmmitOtp=()=>{
          if(Otp.length===6){
              RecoverOtpRequest(getEmail(),Otp).then((res)=>{
                if(res===true){
                    navigate("/creat-pass")
                }
              })
          }else {
              toast.error("Otp is empty");
          }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-xl shadow-lg">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">OTP VERIFICATION</h2>
                <p className="text-gray-600 mb-6">A 6 Digit verification code has been sent to your email address.</p>

                <div className="flex justify-between mb-6">
                    <ReactCodeInput onChange={(value)=>setOtp(value)} type="number" fields={6} inputStyle={inputStyle} />
                </div>

                <button onClick={SubmmitOtp} className="w-full bg-pink-600 hover:bg-pink-700 text-white font-semibold py-3 rounded-md shadow-md transition cursor-pointer">
                    NEXT
                </button>
            </div>
        </div>
    );
};

export default VerifyOtp;
