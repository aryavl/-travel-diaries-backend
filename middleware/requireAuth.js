import jwt from "jsonwebtoken"
import User from "../model/user-model"

export const requireAuth =async(req,res,next)=>{
    const {authorization}=req.headers

    if(!authorization){
        return res.status(401).json({error:"Authorization token required"})
    }

    const token = authorization.split(' ')[1]

    try {
    // to get the id from data

        const {_id}=jwt.verify(token,process.env.SECRET)
         //   attaching a custom user name property to req object so that it will available to all methods
        req.user = await User.findOne({_id}).select('_id')
        next()
    } catch (error) {
    res.status(404).json({error:"Request is not authorised"})
        
    }
}