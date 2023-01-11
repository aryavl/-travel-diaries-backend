import User from "../model/user-model";
import jwt from 'jsonwebtoken'

const createToken = (_id)=>{
    return jwt.sign({_id},process.env.SECRET,{expiresIn:'100d'})
}
export const getallUsers = async (req,res)=>{
    let users;
    try {
        users=await User.find()
    } catch (error) {
      return  console.log(error);
    }

    if(!users){
       res.status(500).json({message:"Unexpected error occured"})
    }
    return res.status(200).json({users})
}

export const getUserById =async (req,res)=>{
    const id = req.params.id
    let user
    try {
        user=await User.findById(id).populate("posts")
    } catch (error) {
        return console.log(error)
    }
    if(!user){
        return res.status(404).json({message:"No user found"})
    }
    return res.status(200).json({user})
}
export const deleteUserById = async (req,res)=>{
    const id= req.params.id
    let user
    try {
        user=await User.findById(id)
    } catch (error) {
        return console.log(error)
        
    }
    if(!user){
        return res.status(404).json({message:"No user found"})
    }
    return res.status(200).json({message:'user Deleted successfully'})
}
export const userSignup =async(req,res,next)=>{
const {name,email,password}=req.body
try {
    const user = await User.signup(name,email,password)
    const token = createToken(user._id)
    res.status(200).json({user})
} catch (error) {
    res.status(400).json({error:error.message})
}
}

export const userLogin = async(req,res)=>{
const {name,email,password}=req.body
try {
    const user = await User.login(name,email,password)
    const token = createToken(user._id)
    const id= user._id
  return  res.status(200).json({id,token,message:"Login successfull"})
} catch (error) {
    res.status(400).json({error:error.message})
}
}