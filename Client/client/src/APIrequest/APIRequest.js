import axios from "axios";
import toast from "react-hot-toast";
import store from "../redux/store/Store.js";
import {HideLoader, ShowLoader} from "../redux/state-slice/Setting-Slice.js";
import {getToken, setEmail, setOtp, setToken, setUserDetail} from "../helper/SessionHelper.js";
import {setCanceledTask, setCompletedTask, setNewTask, setProgressTask} from "../redux/state-slice/Task-Slice.js";
import {Setsummary} from "../redux/state-slice/Summary-Slice.js";
import {SetProfile} from "../redux/state-slice/Profile-Slice.js";

const AxiosHeader={headers:{"token":getToken()}}

const BaseURL="http://localhost:8000/api";




export function RegistrationRequest(email,firstname,lastname,mobile,password){

    store.dispatch(ShowLoader())
    let Postbody = {
        email: email,
        firstName: firstname,
        lastName: lastname,
        mobile: mobile,
        password: password
    };


    return axios.post(`${BaseURL}/registration`,Postbody).then((res)=>{

        if(res.status===200){
            if(res.data['status']==="fail"){
                if(res.data['data']['KeyPattern']['email']===1){
                    toast.error("Email already exists");
                    return false;
                }else {
                    toast.error("Something went wrong");
                    return false;
                }
            }
            else {
                toast.success("Registration Successful");
                return true;
            }
        }
        else {
            toast.error("Something went wrong");
            return false;
        }
    }).catch(err=>{
        store.dispatch(HideLoader())
        toast.error("Something went wrong");
        return false;
    }).finally(()=>{
        store.dispatch(HideLoader())
    })
}


export const loginRequest = (email, password) => {
    store.dispatch(ShowLoader())
    let  Postbody = {"email":email,"password":password };

    return axios.post(`${BaseURL}/login`, Postbody)
        .then((res) => {

            if (res.status === 200) {
                setToken(res.data['token']);
                setUserDetail(res.data['data']);
                toast.success("Login Successful");
                return true;
            } else {
                toast.error("Invalid Email or Password");
                return false;
            }
        })
        .catch((err) => {
            toast.error("Something went wrong");
            return false;
        }).finally(()=>{
        store.dispatch(HideLoader())
    })
};


export const creatTaskRequest=(title,description)=>{
    store.dispatch(ShowLoader())
    let postbody={"title":title,"description":description,status:"new"};

    return axios.post(`${BaseURL}/CreatTask`, postbody,AxiosHeader).then((res) => {

        if(res.status===200){
            toast.success("Successfully created");
            return  true;
        }else {
            toast.error("Something went wrong");
            return false;
        }
    }).catch(err=>{
        toast.error("Something went wrong");
        return false;
    }).finally(()=>{
        store.dispatch(HideLoader())
    })

}


export const TasklistByStatus = (status) => {
    store.dispatch(ShowLoader())
    return axios.post(`${BaseURL}/ListTask/${status}`, {}, AxiosHeader)
        .then((res) => {

            if (res.status === 200) {
                if (status === "new") {
                    store.dispatch(setNewTask(res.data['data']));
                } else if (status === "completed") {
                    store.dispatch(setCompletedTask(res.data['data']));
                } else if (status === "progress") {
                    store.dispatch(setProgressTask(res.data['data']));
                } else if (status === "canceled") {
                    store.dispatch(setCanceledTask(res.data['data']));
                }
            } else {
                toast.error("Something went wrong");
            }
        })
        .catch((err) => {
            toast.error("Something went wrong");
            return false;
        }).finally(()=>{
            store.dispatch(HideLoader())
        })
};


export const SummaryRequest=()=>{
    store.dispatch(ShowLoader())
    return axios.post(`${BaseURL}/taskStatusCount`,{},AxiosHeader).then((res) => {

        if(res.status === 200){
            store.dispatch(Setsummary(res.data['data']))
        }else {
            toast.error("Something went wrong");
        }
    }).catch((err)=>{
        toast.error("Something went wrong");
        return false;
    }).finally(()=>{
        store.dispatch(HideLoader())
    })
}


export const DeleteTaskRequest=(id)=>{
    store.dispatch(ShowLoader())
    return axios.post(`${BaseURL}/DeleteTask/${id}`, {}, AxiosHeader).then((res) => {

        if(res.status === 200){
            toast.success("Successfully deleted");
            return true;
        }else {
            toast.error("Something went wrong");
            return false;
        }
    }).catch(err=>{
        toast.error("Something went wrong");
        return false;
    }).finally(()=>{
        store.dispatch(HideLoader())
    })
}



export const UpdateStatusRequest=(id,status)=>{
    store.dispatch(ShowLoader())
    return axios.post(`${BaseURL}/UpdateTask/${id}/${status}`, {}, AxiosHeader).then((res) => {

        if(res.status === 200){
            toast.success("Successfully updated");
            return true;
        }else {
            toast.error("Something went wrong");
            return false;
        }
    }).catch(err=>{
        toast.error("Something went wrong");
        return false;
    }).finally(()=>{
        store.dispatch(HideLoader())
    })
}




export const ProfileDetailRequest=()=>{
    store.dispatch(ShowLoader())
    return axios.post(`${BaseURL}/ProfileDetail`, {}, AxiosHeader).then((res) => {

        if(res.status === 200){
            store.dispatch(SetProfile(res.data['data']))
        }else {
            toast.error("Something went wrong");
            return false;
        }
    }).catch(err=>{
        toast.error("Something went wrong");
        return false;
    }).finally(()=>{
        store.dispatch(HideLoader())
    })
}



export const ProfileUpdateRequest=(email,firstname,lastname,mobile,password)=>{
    store.dispatch(ShowLoader())
    let Postbody = {
        email: email,
        firstName: firstname,
        lastName: lastname,
        mobile: mobile,
        password: password
    };
    let UserDetails={
        email: email,
        firstName: firstname,
        lastName: lastname,
        mobile: mobile,
    }

    return axios.post(`${BaseURL}/ProfileUpdate`,Postbody,AxiosHeader).then((res) => {

        if(res.status === 200){
            toast.success("Profile Successfully updated");
            setUserDetail(UserDetails)
            return  true;
        }else {
            toast.error("Something went wrong");
        }
    }).catch(err=>{
        toast.error("Something went wrong");
        return false;
    }).finally(()=>{
        store.dispatch(HideLoader())
    })
}


export const RecoverEmailRequest=(email)=>{
    store.dispatch(ShowLoader())
    return axios.post(`${BaseURL}/RecoverEmail/${email}`).then((res) => {

        if(res.status === 200){

            if(res.data['data']==="fail"){
                toast.error("No User Found");
                return false;
            }else {
                setEmail(email)
                toast.success("A 6 Digit Verification code has been send to you email address");
                return  true;
            }

            return true;
        }else {
            toast.error("Something went wrong");
            return false;
        }
    }).catch(err=>{
        toast.error("Something went wrong");
        return false;
    }).finally(()=>{
        store.dispatch(HideLoader())
    })
}


export const RecoverOtpRequest=(email,Otp)=>{
    store.dispatch(ShowLoader())
    return axios.post(`${BaseURL}/RecoverOtp/${email}/${Otp}`).then((res) => {

        if(res.status === 200){

            if(res.data['data']==="fail"){
                toast.error("Invalid OTP");
                return false;
            }else {
                setOtp(Otp)
                toast.success("Code Verification Successful");
                return  true;
            }
            return true;
        }else {
            toast.error("Something went wrong");
            return false;
        }
    }).catch(err=>{
        toast.error("Something went wrong");
        return false;
    }).finally(()=>{
        store.dispatch(HideLoader())
    })
}



export const RecoverPasswordRequest=(email,OTP,Password)=>{
    store.dispatch(ShowLoader())
    let postbody={email:email,OTP:OTP,Password:Password}

    return axios.post(`${BaseURL}/RecoverResetPassowrd`,postbody).then((res) => {

        if(res.status === 200){

            if(res.data['data']==="fail"){
                toast.error("Something went wrong");
                return false;
            }else {
                toast.success("Password Created Successfully");
                return  true;
            }
            return true;
        }else {
            toast.error("Something went wrong");
            return false;
        }
    }).catch(err=>{
        toast.error("Something went wrong");
        return false;
    }).finally(()=>{
        store.dispatch(HideLoader())
    })
}


