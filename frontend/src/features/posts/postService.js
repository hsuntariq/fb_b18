import axios from "axios";
const base_url = "http://localhost:5174/api/posts";

export const addPost = async (postData) => {
  const response = await axios.post(
    `${base_url}/add-post/${postData?.user_id}`,
    postData
  );

  return response.data;
};
