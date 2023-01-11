import { Router } from "express";
import { deleteUserById, getallUsers, getUserById, userLogin, userSignup } from "../controller/user-controller";

export const userRouter=Router()

userRouter.get('/',getallUsers)
userRouter.get('/:id',getUserById)
userRouter.delete('/:id',deleteUserById)
userRouter.post('/signup',userSignup)
userRouter.post('/login',userLogin)
