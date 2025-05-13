import React, {Fragment} from 'react';
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import DashboardPage from "./page/Dashboard-page.jsx";
import CanceledPage from "./page/Canceled-Page.jsx";
import CompletedPage from "./page/Completed-Page.jsx";
import CreatPage from "./page/Creat-Page.jsx";
import ForgetPassPage from "./page/ForgetPass-Page.jsx";
import LoginPage from "./page/Login-Page.jsx";
import NewPage from "./page/New-Page.jsx";
import NotfoundPage from "./page/Notfound-Page.jsx";
import ProfilePage from "./page/Profile-Page.jsx";
import ProgressPage from "./page/Progress-Page.jsx";
import RegistrationPage from "./page/Registration-Page.jsx";
import {Toaster} from "react-hot-toast";
import FullscreenLoader from "./component/Layout/FullscreenLoader.jsx";
import {getToken} from "./helper/SessionHelper.js";
import CreatPasswordPage from "./page/AccountRecover/CreatPassword-Page.jsx";
import SendOtpPage from "./page/AccountRecover/SendOtp-Page.jsx";
import VerifyOtpPage from "./page/AccountRecover/VerifyOtp-Page.jsx";

const App = () => {

    if(getToken()){
        return (
            <Fragment>
                <BrowserRouter>
                    <Toaster position="top-center"/>
                    <Routes>
                        <Route path="/" element={<DashboardPage/>}/>
                        <Route path="/cancel" element={<CanceledPage/>}/>
                        <Route path="/complete" element={<CompletedPage/>}/>
                        <Route path="/creat" element={<CreatPage/>}/>
                        <Route path="/new-task" element={<NewPage/>}/>
                        <Route path="/*" element={<NotfoundPage/>}/>
                        <Route path="/profile" element={<ProfilePage/>}/>
                        <Route path="/progress" element={<ProgressPage/>}/>
                    </Routes>
                </BrowserRouter>
                <FullscreenLoader/>
            </Fragment>
        );
    }else {
        return (
            <Fragment>
                <BrowserRouter>
                    <Toaster position="top-center"/>
                    <Routes>
                        <Route path="/" element={<Navigate to="/login" replace />}/>
                        <Route path="/login" element={<LoginPage/>}/>
                        <Route path="/registration" element={<RegistrationPage/>}/>
                        <Route path="/forgetpass" element={<ForgetPassPage/>}/>
                        <Route path="/creat-pass" element={<CreatPasswordPage/>}/>
                        <Route path="/send-otp" element={<SendOtpPage/>}/>
                        <Route path="/verify-otp" element={<VerifyOtpPage/>}/>
                        <Route path="/*" element={<NotfoundPage/>}/>
                    </Routes>
                </BrowserRouter>
                <FullscreenLoader/>
            </Fragment>
        );
    }
};

export default App;