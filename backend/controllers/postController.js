import { Posts } from "../models/postModel.js";

export const addPost = async (req, res) => {
  const { caption, background, postImage } = req.body;
  const { user_id } = req.params;

  // if (!caption) {
  //   res.status(400);
  //   throw new Error("Please enter a caption");
  // }

  const newPost = await Posts.create({
    caption,
    background,
    user_id,
    postImage,
  });

  res.send(newPost);
};

export const getPosts = async (req, res) => {
  const allPosts = await Posts.find().sort({ createdAt: -1 });
  res.send(allPosts);
};

export const makeReaction = async (req, res) => {
  const { post_id, user_id } = req.params;
  const { emoji } = req.body;

  // find the post

  const findPost = await Posts.findById(post_id);
  if (!findPost) {
    res.status(404);
    throw new Error("Post not found");
  }

  findPost.likes.push({ type: emoji, id: user_id });
  await findPost.save();
  res.send(findPost);
};
