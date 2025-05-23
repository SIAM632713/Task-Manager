const mongoose=require("mongoose");

const DataSchema=mongoose.Schema({
        title:{type:String},
        description:{type:String},
        status:{type:String},
        email:{type:String},
        creatDate:{type:Date,default:Date.now()},
    },{versionKey:false}
);
const TaskModel=mongoose.model("task",DataSchema);
module.exports=TaskModel;