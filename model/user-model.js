import mongoose, { model, Schema } from "mongoose";
import validator from "validator";
import bcrypt from 'bcrypt'

const userSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
        minLength:6,
    },
    posts:[{
        type:mongoose.Types.ObjectId,
        ref:"Post"
    }]
    
},{timestamps:true})

// signup validation 
userSchema.statics.signup= async function (name,email,password) {  
    if(!name || !email || !password){
        throw Error("All fields must be filled")
    }
    if(!validator.isEmail(email)){
        throw Error ("Email is not valid")
    }
    if(!validator.isStrongPassword(password)){
        throw Error ("Try strong password")
    }

    const exists = await this.findOne({email})
    if(exists){
        throw Error("Email already in use")
    }

    // password encrypting
    const salt= await bcrypt.genSalt(10)
    const hash= await bcrypt.hash(password,salt)

    const user = await this.create({name,email,password:hash})
    console.log("signup", user);
    return user
}

// login validation
userSchema.statics.login=async function (name,email,password){
    if(!email || !password){
        throw Error('All fields must be filled')
      }
    const user= await this.findOne({email})

    if(!user){
        throw Error("Incorrect email")
    }

    // compare password using bcrypt
    const match = await bcrypt.compare(password,user.password)
    if(!match){
        throw Error("Incorrect password")
    }
    console.log("login",user);
    return user
}
export default model("User",userSchema)