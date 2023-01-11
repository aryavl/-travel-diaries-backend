import { Router } from "express";
import { addPost, deletePost, getAllPosts, getPostById, updatePost } from "../controller/post-controller";
import { requireAuth } from "../middleware/requireAuth";

export const postRouter= Router()
// auth route
// postRouter.use(requireAuth)
postRouter.get('/',getAllPosts)
postRouter.get('/:id',getPostById)
postRouter.post('/',addPost)
postRouter.put('/:id',updatePost)
postRouter.delete('/:id',deletePost)