import  mongoose, { model, Schema } from "mongoose";


const postSchema=new Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    location:{
        type:String,
        required:true
    },
    user:{
        type:mongoose.Types.ObjectId,
        ref:"User",
        required:true
    },
    date:{
        type:Date,
        required:true
    },
})

// postSchema.statics.postValidation=async function (title,description,image,location,user,date) { 
//     if(validator.isEmpty){
//         throw Error("All fields must be filled")
//     }
//  }
export default model("Post",postSchema)