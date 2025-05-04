import { Posts } from "../models/postModel.js";

export const addPost = async (req, res) => {
  const { caption, background } = req.body;
  const { user_id } = req.params;

  if (!caption) {
    res.status(400);
    throw new Error("Please enter a caption");
  }

  const newPost = await Posts.create({
    caption,
    background,
    user_id,
  });

  res.send(newPost);
};

export const getPosts = async (req, res) => {
  const allPosts = await Posts.find().sort({ createdAt: -1 });
  res.send(allPosts);
};
