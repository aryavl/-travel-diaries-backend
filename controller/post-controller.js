import Posts from "../model/post-model"
import validator from "validator";
import User from "../model/user-model";
import mongoose, { Mongoose } from "mongoose";

export const getAllPosts=async (req,res)=>{
    let posts
    try {
        posts=await Posts.find().populate("user")
    return res.status(200).json({posts})

    } catch (error) {
    res.status(400).json({error:error.message})
    }
    if(!posts){
        return res.status(400).json({message:"No posts available"})

    }
    return res.status(200).json({posts})
}
export  const addPost =async(req,res)=>{
    const { title, description, location, date, image, user } = req.body;

  if (
    !title &&
    title.trim() === "" &&
    !description &&
    description.trim() === "" &&
    !location &&
    location.trim() === "" &&
    !date &&
    !user &&
    !image &&
    image.trim() === ""
  ) {
    return res.status(422).json({ message: "Invalid Data" });
  }
  let existingUser;
  try {
    existingUser = await User.findById(user);
  } catch (err) {
    return console.log(err);
  }

  if (!existingUser) {
    return res.status(404).json({ message: "User not found" });
  }

    let posts 
    try {
        // posts= await Posts({title,description,image,location,user,date: new Date(`${date}`)})
        // posts = await posts.save()
        // const session = await mongoose.startSession()
        // session.startTransaction()

        // existingUser.Posts.push(posts)

        // posts= await Posts.create({title,description,image,location,user,date: new Date(`${date}`),session})
        // session.commitTransaction()
        posts = new Posts({
          title,description,image,location,user,date: new Date(`${date}`)
        })
        const session = await mongoose.startSession()
        session.startTransaction()
        existingUser.posts.push(posts)
      await  existingUser.save({session})
        posts= await posts.save({session})
        session.commitTransaction()
    } catch (error) {
        return res.status(400).json({error:error.message})
        
    }
    if(!posts){
        return res.status(400).json({message:"Unexpected Error Occurred"})

    }
        return  res.status(200).json({posts})
         
}
export const getPostById=async(req,res)=>{
    const id= req.params.id
    let post
    try {
        post = await Posts.findById(id)
    } catch (error) {
        res.status(400).json({error:error.message})
    }
    if(!post){
        res.status(404).json({message:"No post found"})
    }
    return res.status(200).json({post})
}
export const updatePost = async(req,res)=>{
    const id= req.params.id
    
    const { title, description, location, image } = req.body;

    if (
      !title &&
      title.trim() === "" &&
      !description &&
      description.trim() === "" &&
      !location &&
      location.trim() === "" &&
      
      !image &&
      image.trim() === ""
    ) {
      return res.status(422).json({ message: "Invalid Data" });
    }
    let post
    try {
        post= await Posts.findByIdAndUpdate(id,{
            title, description, location, image
        })
    } catch (error) {
      return res.status(422).json({ error: error.message });
        
    }
    if(!post){
      return res.status(422).json({ message: "Unable to update" });

    }
    return res.status(200).json({message:"Updated successfully"})

}
export const deletePost=async(req,res)=>{
    const id=req.params.id
    let post
    try {
      const session =await mongoose.startSession()
      session.startTransaction()
      post =await Posts.findById(id).populate("user")
      post.user.posts.pull(post)
      await post.user.save({session})
        post= await Posts.findByIdAndRemove(id)
        session.commitTransaction()
    } catch (error) {
        return res.status(422).json({ error: error.message });
        
    }
    if(!post){
        return res.status(422).json({ message: "No such post available" });
  
      }
      return res.status(200).json({message:"Deleted successfully"})
}