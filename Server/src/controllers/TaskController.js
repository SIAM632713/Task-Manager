const TaskModel=require("../models/TaskModel")

exports.CreatTask=async (req,res)=>{
    try{
        let reqbody=req.body;
        reqbody.email=req.headers['email']
        const data=await TaskModel.create(reqbody);
        res.status(200).json({status:"success",data:data});
    }catch(err){
        res.status(500).json({status:"error",error:err});
    }
}

exports.DeleteTask=async (req,res)=>{
    try{
        let id=req.params.id;
        let Query={_id:id};
        const data=await TaskModel.deleteOne(Query);
        res.status(200).json({status:"success",data:data});
    }catch(err){
        res.status(500).json({status:"error",error:err});
    }
}

exports.UpdateTask=async (req,res)=>{
    try{
        let id=req.params.id;
        let status=req.params.status;
        let Query={_id:id};
        let reqbody={status:status}
        const data=await TaskModel.updateOne(Query,reqbody);
        res.status(200).json({status:"success",data:data});
    }catch(err){
        res.status(500).json({status:"error",error:err});
    }
}

exports.ListTask = async (req, res) => {
    try {
        let status = req.params.status;
        let email = req.headers['email'];

        const data = await TaskModel.aggregate([
            { $match: { status: status, email: email } },
            {
                $project: {
                    _id: 1,
                    title: 1,
                    description: 1,
                    status: 1,
                    createDate: {
                        $dateToString: {
                            date: "$createdDate",
                            format: "%d-%m-%Y"
                        }
                    }
                }
            }
        ]);

        res.status(200).json({ status: "success", data: data });

    } catch (err) {
        res.status(500).json({ status: "error", error: err.message });
    }
};


exports.taskStatusCount =async (req, res) => {
  try{
      let email = req.headers['email'];
      const data=await TaskModel.aggregate(
          [
              { $match: { email: email } },
              { $group: { _id: "$status", sum: { $count: {} } } }
          ],);
      res.status(200).json({ status: "success", data: data });
  }catch(err){
      res.status(500).json({ status: "error", error: err.message });
  }
};
