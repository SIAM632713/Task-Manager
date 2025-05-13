import React, {useRef} from 'react';
import {IsEmpty} from "../../helper/FormHelper.js";
import toast from "react-hot-toast";
import {useNavigate} from "react-router-dom";
import {creatTaskRequest} from "../../APIrequest/APIRequest.js";


const Creat = () => {

    let navigate = useNavigate();
    let titleRef,descriptionRef=useRef()

    const isSubmmit=()=>{
        let title=titleRef.value;
        let description=descriptionRef.value;

        if(IsEmpty(title)){
            toast.error("title required");
        }else if(IsEmpty(description)){
            toast.error("description required");
        }else {
            creatTaskRequest(title,description).then((result)=>{
                if(result===true){
                    navigate("/new-task")
                }
            })
        }
    }

    return (
        <div className="p-10">
            <div className="bg-white rounded-2xl shadow-xl border border-gray-400 p-7">
                <h1 className="text-2xl font-medium mb-4 text-black">Create New</h1>
                <div className="space-y-4 mb-6">
                    <input
                        ref={(input)=>titleRef=input}
                        placeholder="Task Name"
                        className="px-6 py-2 border rounded-md w-full"
                    />
                    <input
                        ref={(input)=>descriptionRef=input}
                        placeholder="Task Description"
                        className="px-6 py-12 border rounded-md w-full"
                    />
                </div>
                <button onClick={isSubmmit} className="px-6 py-1 rounded-full bg-[#EC4899] text-xl font-semibold text-white cursor-pointer">
                    CREATE
                </button>
            </div>
        </div>
    );
};

export default Creat;
