class SessionHelper{

    setToken(token){
       localStorage.setItem("token", token);
    }

    getToken(){
       return localStorage.getItem("token");
    }

    setUserDetail(UserDetail){
        localStorage.setItem("UserDetail",JSON.stringify(UserDetail))
    }

    getUserDetail(){
       return JSON.parse( localStorage.getItem("UserDetail"))
    }


    removeSession=()=>{
        localStorage.clear()
        window.location.href="/login"
    }


    setEmail=(email)=>{
       localStorage.setItem("email",email)
    }

    getEmail=()=>{
       return localStorage.getItem("email");
    }

    setOtp=(Otp)=>{
       localStorage.setItem("Otp",Otp)
    }

    getOtp=()=>{
       return localStorage.getItem("Otp")
    }
}

export const {setToken,getToken,setUserDetail,getUserDetail,removeSession,setEmail,getEmail,setOtp,getOtp}=new SessionHelper();