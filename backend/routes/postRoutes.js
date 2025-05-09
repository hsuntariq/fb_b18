import express from "express";
import {
  addPost,
  getPosts,
  makeReaction,
} from "../controllers/postController.js";
export const postRouter = express.Router();

postRouter.post("/add-post/:user_id", addPost);
postRouter.get("/get-all-posts", getPosts);
postRouter.post("/add-reaction/:post_id/:user_id", makeReaction);
