const express = require("express")
const userRouter = express.Router();
const { signup, signin, addSelectedList, delSelectedList } = require("../controllers/user_controller");

userRouter.post('/selected/:id', addSelectedList);
userRouter.delete('/selected/:id', delSelectedList);


userRouter.post("/User/register", signup)
userRouter.post("/User/login", signin)




module.exports = userRouter;    