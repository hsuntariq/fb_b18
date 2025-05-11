import express from "express";
import {
  addPost,
  getPosts,
  getReactions,
  makeReaction,
} from "../controllers/postController.js";
export const postRouter = express.Router();

postRouter.post("/add-post/:user_id", addPost);
postRouter.get("/get-all-posts", getPosts);
postRouter.post("/add-reaction/:post_id/:user_id", makeReaction);
postRouter.get('/get-reactions/:post_id', getReactions);