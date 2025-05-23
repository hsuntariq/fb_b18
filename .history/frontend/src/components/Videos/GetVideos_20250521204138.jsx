import React from "react";
import moment from "moment";
import { FaUser, FaGlobe } from "react-icons/fa";
import { PiShareFat } from "react-icons/pi";

// Comment out custom components for now to avoid errors
// import EmojiReactions from "../home/Feeds/EmojiReactions";
// import CommentModal from "../home/Feeds/CommentModal";

const GetVideos = () => {
  // Static data
  const userInfo = { f_name: "John Doe" };
  const createdAt = "2025-05-20T14:00:00Z";
  const caption = "This is a static caption for testing.";
  const likes = [1, 2, 3]; // Simulate 3 likes
  const comments = [{ text: "Nice!" }, { text: "Awesome video!" }];
  const videoUrl = "https://videos.pexels.com/video-files/4620563/4620563-uhd_1440_2732_25fps.mp4";

  return (
    <div className="shadow-lg xl:w-[70%] mx-auto lg:w-[80%] md:w-[90%] w-[95%] bg-white rounded-md my-2">
      {/* Header */}
      <div className="flex p-3 justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-[45px] h-[45px] bg-gray-200 border-gray-300 rounded-full border flex justify-center items-center">
            <FaUser size={25} className="text-gray-600" />
          </div>
          <div>
            <h6 className="font-semibold text-sm">{userInfo.f_name}</h6>
            <div className="flex items-center gap-1 text-sm text-gray-500">
              <span className="font-semibold">
                {moment().diff(moment(createdAt), "hours") < 24
                  ? moment(createdAt).fromNow()
                  : moment(createdAt).format("MMM D, YYYY")}
              </span>
              <span className="h-[2px] w-[2px] rounded-full bg-gray-500 mx-1" />
              <FaGlobe />
            </div>
          </div>
        </div>
      </div>

      {/* Caption */}
      <p className="text-gray-900 p-3 my-2 capitalize">{caption}</p>

      {/* Video */}
      <div className="w-full">
        <video
          className="w-full max-h-[500px] object-contain"
          controls
        >
          <source src={videoUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      {/* Reactions and Comments Count */}
      <div className="flex gap-2 p-3">
        <div className="flex justify-between w-full text-gray-600">
          <div className="flex items-center gap-1">
            {/* <EmojiReactions post_id={"1"} likes={likes} /> */}
            <span>👍</span>
            <span>{likes.length}</span>
          </div>
          <span>{comments.length} comments</span>
        </div>
      </div>

      <hr className="bg-gray-300 h-[1px] border-0" />

      {/* Bottom actions */}
     <div className="flex gap-2 p-3">
             <div className="flex justify-between w-full">
               <p className="text-gray-600 flex gap-1 m-0">
                 <div className="flex items-center">
                   {(() => {
                     const seen = new Set();
                     const reactions = [];
     
                     likes?.forEach((item) => {
                       if (!seen.has(item?.type)) {
                         seen.add(item?.type);
                         reactions.push(item?.type);
                       }
                     });
     
                     return reactions.map((type, index) => {
                       const emoji = emojiMap[type];
                       if (!emoji) return null;
     
                       return (
                         <span
                           key={type}
                           className={`relative z-${50 - index} -ml-2 animate-shake`}
                           style={{ animationDuration: "0.5s" }}
                         >
                           <picture>
                             <source srcSet={emoji.webp} type="image/webp" />
                             <img
                               src={emoji.gif}
                               alt={emoji.alt}
                               width="22"
                               height="22"
                               className="rounded-full"
                             />
                           </picture>
                         </span>
                       );
                     });
                   })()}
                 </div>
                 <div className="flex justify-between items-center">
                   {likes?.length}
                 </div>
               </p>
               {comments?.length} comments
             </div>
           </div>
     
           <hr className="bg-gray-300 h-[1px] border border-0" />
           <div className="flex justify-between items-center p-3">
             <EmojiReactions post_id={_id} likes={likes} />
             <CommentModal
               comments={comments}
               caption={caption}
               postImage={postImage}
               background={background}
               post_id={_id}
             />
     
             <div className="flex gap-2 justify-center items-center w-full">
               <PiShareFat className="text-gray-600" />
               <h6 className="font-semibold text-sm text-gray-600">Share</h6>
             </div>
           </div>
    </div>
  );
};

export default GetVideos;
