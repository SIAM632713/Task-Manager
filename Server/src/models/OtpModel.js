const mongoose=require('mongoose');
const OtpSchema=mongoose.Schema({
    email:{type:String},
    otp:{type:String},
    status:{type:Number,default:0},
    createddate:{type:Date,default:Date.now()},
},{versionKey:false});
const OtpModel=mongoose.model('otp',OtpSchema);
module.exports = OtpModel;