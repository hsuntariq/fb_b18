import express from "express";
import { addPost } from "../controllers/postController.js";
export const postRouter = express.Router();

postRouter.post("/add-post/:user_id", addPost);
