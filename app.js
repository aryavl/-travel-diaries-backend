import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import { userRouter } from './routes/user-routes'
import { postRouter } from './routes/post-routes'
import cors from "cors"
const app = express()

dotenv.config()

// middleware
app.use(cors()) 
app.use(express.json())
// optional
app.use((req,res,next)=>{
    console.log(req.path,req.method);
    next()
})

// require
app.use('/user',userRouter)
app.use('/posts',postRouter)

mongoose
.connect(process.env.MONGO_URI)
.then(()=>{
    app.listen(process.env.PORT,()=>{
        console.log(`Connected to DB & Listening to ${process.env.PORT}`);
    })
})
.catch((error)=>{
    console.log(error);
})