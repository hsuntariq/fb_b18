import React from "react";
import { FaGlobe, FaRegComment, FaThumbsUp, FaUser } from "react-icons/fa";
import { FiThumbsUp } from "react-icons/fi";
import { PiShareFat } from "react-icons/pi";
import moment from "moment";

const GetPosts = ({ 
  background = {
    startColor: '#ffffff',
    endColor: '#ffffff',
    image: ''
  }, 
  caption, 
  _id, 
  user_id, 
  createdAt, 
  uploadImage 
}) => {
  const isDefaultBackground =
    (!background?.image && background?.startColor === "#ffffff") ||
    (!background?.image && background?.startColor === "white");

  const showCaptionOnTop = !background?.image && isDefaultBackground && !uploadImage;
  const hasUploadImage = Boolean(uploadImage);
  const hasBackgroundImage = Boolean(background?.image);

  return (
    <div className="shadow-lg xl:w-[80%] mx-auto lg:w-[80%] md:w-[90%] w-[95%] bg-white rounded-md my-2">

      <div className="flex p-3 justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-[45px] h-[45px] bg-gray-200 border-gray-300 rounded-full border flex justify-center items-center">
            <FaUser size={25} className="text-gray-600" />
          </div>
          <div>
            <h6 className="font-semibold text-sm">
              {user_id?.f_name ?? "User"} {user_id?.l_name ?? ""}
            </h6>
            <div className="flex items-center gap-1 text-sm text-gray-500">
              <span>
                {moment().diff(moment(createdAt), "hours") < 24
                  ? moment(createdAt).fromNow()
                  : moment(createdAt).format("MMM D, YYYY")}
              </span>
              <span className="h-[2px] w-[2px] bg-gray-500 rounded-full" />
              <FaGlobe />
            </div>
          </div>
        </div>
      </div>

      {showCaptionOnTop && (
        <p className="text-gray-900 p-3 my-2 capitalize">{caption}</p>
      )}

      {!showCaptionOnTop && (
        <div
          className="h-[400px] relative"
          style={{
            background: uploadImage || background?.image
              ? `url(${uploadImage || background?.image}) center/cover no-repeat`
              : `linear-gradient(to right, ${background?.startColor || '#ffffff'}, ${background?.endColor || '#ffffff'})`,
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center center',
              backgroundSize: 'contain'
          }}
        >
          {/* Conditionally position the caption based on image type */}
          <p
            className={`p-3 capitalize ${
              // If uploaded image, show at top
              hasUploadImage 
                ? "absolute top-0 left-0 text-white text-xl bg-black bg-opacity-50 w-full"
                : // If background image (no upload), show centered
                hasBackgroundImage
                ? "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white text-4xl"
                : // Default (gradient background)
                "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-black text-xl"
            }`}
          >
            {caption}
          </p>
        </div>
      )}

      <div className="flex gap-2 p-3">
        <p className="text-gray-600 m-0">You and 14 others</p>
      </div>

      <hr className="bg-gray-300 h-[1px] border-0" />

      <div className="flex justify-between items-center p-3">
        <div className="flex gap-2 justify-center items-center w-full cursor-pointer hover:bg-gray-100 p-2 rounded-md">
          <FiThumbsUp className="text-gray-600" />
          <h6 className="font-semibold text-sm text-gray-600">Like</h6>
        </div>
        <div className="flex gap-2 justify-center items-center w-full cursor-pointer hover:bg-gray-100 p-2 rounded-md">
          <FaRegComment className="text-gray-600" />
          <h6 className="font-semibold text-sm text-gray-600">Comment</h6>
        </div>
        <div className="flex gap-2 justify-center items-center w-full cursor-pointer hover:bg-gray-100 p-2 rounded-md">
          <PiShareFat className="text-gray-600" />
          <h6 className="font-semibold text-sm text-gray-600">Share</h6>
        </div> 
      </div>
    </div>
  );
};

export default GetPosts;