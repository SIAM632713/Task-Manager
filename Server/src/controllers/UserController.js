const UserModel = require("../models/UserModel");
const OtpModel=require("../models/OtpModel")
const EmailSend=require("../Utility/emailHelper")
const jwt = require("jsonwebtoken");

exports.registration = async (req, res) => {
    try {
        let reqBody = req.body;
        const data = await UserModel.create(reqBody);
        res.status(200).json({ status: "success", data: data });
    } catch (err) {
        res.status(500).json({ status: "fail", data: err.message });
    }
};

exports.login = async (req, res) => {
 try {
     let reqBody = req.body;
     const data=await UserModel.aggregate([
         {$match:reqBody},
         {$project:{_id:0,email:1,firstName:1,lastName:1,mobile:1}},
     ]);

     if(data.length>0){
         let payload = {exp:Math.floor(Date.now() / 1000)+(24*60*60),data:data[0]};
         let token=jwt.sign(payload,'secretKEY123456789');
         res.status(200).json({status:"success",data:data[0]['email'],token:token});
     }else {
         res.status(401).json({ status: "unauthorized" });
     }
 }catch(err){
     res.status(500).json({ status: "unauthorized" });
 }
}

exports.ProfileUpdate = async (req, res) => {
    try {
        let email = req.headers['email'];
        let reqBody = req.body;

        const data = await UserModel.updateOne({ email: email }, reqBody);

        res.status(200).json({ status: "success", data: data });
    } catch (err) {
        res.status(500).json({ status: "fail", data: err.message });
    }
};


exports.ProfileDetail = async (req, res) => {
    try{
        let email=req.headers['email'];
        const  data=await UserModel.aggregate([
            {$match:{email:email}},
            {$project:{_id:1,email:1,firstName:1,lastName:1,mobile:1,password:1}}
        ])
        res.status(200).json({status:"success",data:data});
    }catch(err){
        res.status(500).json({ status: "fail", data: err.message });
    }
}



exports.RecoverEmail=async (req, res) => {
    let email = req.params.email;
    let OTPCode = Math.floor(100000 + Math.random() * 900000)
    try {
        // Email Account Query
        let UserCount = await UserModel.aggregate([{$match: {email: email}}, {$count: "total"}])
        if(UserCount.length>0){
            // OTP Insert
            let CreateOTP = await OtpModel.create({email: email, otp: OTPCode})
            // Email Send
            let SendEmail = await EmailSend(email,"Your PIN Code is="+OTPCode,"Task Manager PIN Verification")
            res.status(200).json({status: "success", data: SendEmail})
        }
        else{
            res.status(200).json({status: "fail", data: "No User Found"})
        }
    }catch (e) {
        res.status(200).json({status: "fail", data:e})
    }
}

exports.RecoverOtp = async (req, res) => {
    let email = req.params.email;
    let OTPCode = req.params.otp;
    let status=0;
    let statusUpdate=1;
    try {
        let OTPCount = await OtpModel.aggregate( [{$match: {email: email, otp: OTPCode, status: 0}}, {$count: "total"}])
        if (OTPCount.length>0) {
            let OTPUpdate = await OtpModel.updateOne({email: email, otp: OTPCode, status: status},{
                email: email,
                otp: OTPCode,
                status: statusUpdate
            })
            res.status(200).json({status: "success", data: OTPUpdate})
        } else {
            res.status(200).json({status: "fail", data: "Invalid OTP Code"})
        }
    }
    catch (e) {
        res.status(200).json({status: "fail", data:e})
    }
}


exports.RecoverResetPassowrd=async (req, res) => {
    let email = req.body['email'];
    let OTPCode = req.body['OTP'];
    let NewPass = req.body['Password'];
    let statusUpdate = 1;

    try {
        let OTPUsedCount = await OtpModel.aggregate([
            { $match: { email: email, otp: OTPCode, status: statusUpdate } },
            { $count: "total" }
        ]);

        if (OTPUsedCount.length > 0) {
            let PassUpdate = await UserModel.updateOne(
                { email: email },
                {
                    password: NewPass
                }
            );
            res.status(200).json({ status: "success", data: PassUpdate });
        } else {
            res.status(200).json({ status: "success", data: "Invalid OTP Code" });
        }
    } catch (e) {
        res.status(200).json({ status: "fail", data: e });
    }
};