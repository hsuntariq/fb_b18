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

  try {
    // Find the post
    const findPost = await Posts.findById(post_id);
    if (!findPost) {
      return res.status(404).send({ message: 'Post not found' });
    }

    // Find the index of the user's reaction
    const reactionIndex = findPost.likes.findIndex(item => item.id == user_id);

    if (reactionIndex === -1) {
      // If reaction doesn't exist, add it
      findPost.likes.push({ type: emoji, id: user_id });
      await findPost.save();
    } else {
      // If reaction exists, update it directly in the array
      findPost.likes[reactionIndex].type = emoji;
      await findPost.save();
    }

    // Save once after all modifications
    await findPost.save();
    res.send(findPost);

  } catch (error) {
    console.error('Error in makeReaction:', error);
    res.status(500).send({ message: 'Server error' });
  }
};


export const getReactions = async (req, res) => {
  const { post_id } = req.params

  const findPost = await Posts.findById(post_id)
  if (!findPost) {
    res.status(404)
    throw new Error('Post not found')
  }


  res.send(findPost.likes)






}


export const addComment = async (req, res) => {

  const { post_id } = req.params
  const user_id = req.user._id
  const { comment } = req.body

  const findPost = await Posts.findById(post_id)
  if (!findPost) {
    res.status(404)
    throw new Error('Post Not Found')
  }

  findPost.comments.push({ user: req.user, comment })

  await findPost.save()
  res.send(findPost)






}