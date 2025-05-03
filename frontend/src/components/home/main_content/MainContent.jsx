import React from "react";
import AddPost from "./posts/AddPost";
import GetPosts from "../facebook_main_posts_page/GetPosts";

const MainContent = () => {
  return (
    <>
      <AddPost />
      <GetPosts />
    </>
  );
};

export default MainContent;
