import express from "express";
import { addPost, getPosts } from "../controllers/postController.js";
export const postRouter = express.Router();

postRouter.post("/add-post/:user_id", addPost);
postRouter.get("/get-all-posts", getPosts);
