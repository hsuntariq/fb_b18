import React from "react";
import moment from "moment";
import { FaUser, FaGlobe } from "react-icons/fa";
import { PiShareFat } from "react-icons/pi";
import EmojiReactions from "./EmojiReactions"; // Adjust path if needed
import CommentModal from "./CommentModal"; // Adjust path if needed

const GetVideos = ({
  videoUrl,
  userInfo,
  createdAt,
  caption,
  likes = [],
  comments = [],
  _id,
  showCaptionAbove = true,
}) => {
  return (
    <div className="shadow-lg xl:w-[70%] mx-auto lg:w-[80%] md:w-[90%] w-[95%] bg-white rounded-md my-2">
      {/* Header */}
      <div className="flex p-3 justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-[45px] h-[45px] bg-gray-200 border-gray-300 rounded-full border flex justify-center items-center">
            <FaUser size={25} className="text-gray-600" />
          </div>
          <div>
            <h6 className="font-semibold text-sm">{userInfo?.f_name}</h6>
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
      {showCaptionAbove && (
        <p className="text-gray-900 p-3 my-2 capitalize">{caption}</p>
      )}

      {/* Video */}
      <div className="w-full">
        <video
          className="w-full max-h-[500px] object-contain"
          controls
          poster="" // Optional: add thumbnail
        >
          <source src={videoUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      {/* Reactions and Comments Count */}
      <div className="flex gap-2 p-3">
        <div className="flex justify-between w-full text-gray-600">
          <div className="flex items-center gap-1">
            <EmojiReactions post_id={_id} likes={likes} />
            <span>{likes.length}</span>
          </div>
          <span>{comments.length} comments</span>
        </div>
      </div>

      <hr className="bg-gray-300 h-[1px] border-0" />

      {/* Bottom actions */}
      <div className="flex justify-between items-center p-3">
        <EmojiReactions post_id={_id} likes={likes} />
        <CommentModal
          comments={comments}
          caption={caption}
          videoUrl={videoUrl}
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
