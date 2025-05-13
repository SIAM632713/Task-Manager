const express =require('express');

const UserController = require('../controllers/UserController')
const Authmiddleware=require("../middlewares/Authmiddleware")
const TaskController=require("../controllers/TaskController")

const router = express.Router();


router.post("/registration",UserController.registration);
router.post("/login",UserController.login);
router.post("/ProfileUpdate",Authmiddleware,UserController.ProfileUpdate);
router.post("/ProfileDetail",Authmiddleware,UserController.ProfileDetail);
router.post("/RecoverEmail/:email",UserController.RecoverEmail)
router.post("/RecoverOtp/:email/:otp",UserController.RecoverOtp)
router.post("/RecoverResetPassowrd",UserController.RecoverResetPassowrd)


router.post("/CreatTask",Authmiddleware,TaskController.CreatTask);
router.post("/UpdateTask/:id/:status",Authmiddleware,TaskController.UpdateTask);
router.post("/DeleteTask/:id",Authmiddleware,TaskController.DeleteTask);
router.post("/ListTask/:status",Authmiddleware,TaskController.ListTask);
router.post("/taskStatusCount",Authmiddleware,TaskController.taskStatusCount);




module.exports = router;