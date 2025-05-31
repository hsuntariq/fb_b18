import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import {
  FaGift,
  FaImages,
  FaSortAlphaDown,
  FaSortDown,
  FaTimes,
  FaUser,
  FaVideo, // ADDED: Video icon for video selection
} from "react-icons/fa";
import { Fa42Group } from "react-icons/fa6";
import { RiGroupFill } from "react-icons/ri";
import { GoSmiley } from "react-icons/go";
import { IoChevronBackSharp } from "react-icons/io5";
import { colors } from "./data/color-data";
import { motion } from "framer-motion";
import { IoIosArrowRoundBack } from "react-icons/io";
import myData from "./data/decorative";
import BackgroundThemes from "./BackgroundThemes";
import { useDispatch, useSelector } from "react-redux";
import { addPostData, postReset } from "../../../../features/posts/postSlice";
import { ClockLoader, ScaleLoader } from "react-spinners";

import toast from "react-hot-toast";
import {
  FaImage,
  FaUserTag,
  FaSmile,
  FaMapMarkerAlt,
  FaEllipsisH,
} from "react-icons/fa";
import axios from "axios";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function BasicModal() {
  const [open, setOpen] = useState(false);
  const [selectedColor, setSelectedColor] = useState({
    startColor: "#fff",
    endColor: "#fff",
    image: "",
  });

  const [media, setMedia] = useState(false);
  const [mediaSelected, setMediaSelected] = useState(false);
  const [changed, setChanged] = useState(false);
  const [caption, setCaption] = useState("");
  const [show, setShow] = useState(true);
  const [showBG, setShowBG] = useState(false);
  const { startColor, endColor } = selectedColor;
  const [imagePreview, setImagePreview] = useState(null);
  const [image, setImage] = useState(null);
  const [imageLoading, setImageLoading] = useState(false);
  const [imageLink, setImageLink] = useState("");
  
  // ADDED: New state variables for video functionality
  const [videoPreview, setVideoPreview] = useState(null);
  const [video, setVideo] = useState(null);
  const [videoLoading, setVideoLoading] = useState(false);
  const [videoLink, setVideoLink] = useState("");
  const [mediaType, setMediaType] = useState(""); // ADDED: Track if it's image or video
  
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    console.log("clicked");
  };

  const [openColor, setOpenColor] = useState(false);

  useEffect(() => {
    caption.length > 0 ? setShow(false) : setShow(true);
    if (mediaSelected) {
      setShow(false);
    }
  }, [caption, mediaSelected]);

  const { user } = useSelector((state) => state.auth);
  const { posts, postLoading, postError, postSuccess, postMessage } =
    useSelector((state) => state.album);
  const dispatch = useDispatch();
  
  // UPDATED: Modified to handle both image and video uploads
  const handlePostUpload = async () => {
    try {
      let uploadedImageUrl = "";
      let uploadedVideoUrl = "";
      
      // ADDED: Upload image if selected
      if (image) {
        console.log("Uploading image...");
        uploadedImageUrl = await uploadImage();
        if (!uploadedImageUrl) {
          toast.error("Image upload failed");
          return;
        }
      }
      
      // ADDED: Upload video if selected
      if (video) {
        console.log("Uploading video...");
        uploadedVideoUrl = await uploadVideo();
        if (!uploadedVideoUrl) {
          toast.error("Video upload failed");
          return;
        }
      }

      const postData = {
        caption,
        background: selectedColor,
        user_id: user?._id,
        postImage: uploadedImageUrl,
        postVideo: uploadedVideoUrl, // ADDED: Include video in post data
      };

      console.log("Dispatching post data:", postData);
      dispatch(addPostData(postData));
    } catch (error) {
      console.log("Post upload error:", error);
      toast.error("Failed to create post");
    }
  };

  useEffect(() => {
    if (postError) {
      toast.error(postMessage);
    }

    if (postSuccess) {
      toast.success("Posted Successfully!");
      setCaption("");
      setOpenColor(false);
      setOpen(false);
      // ADDED: Reset video states on successful post
      setVideo(null);
      setVideoPreview(null);
      setVideoLink("");
      setMediaType("");
    }

    dispatch(postReset());
  }, [postError, postSuccess]);

  // UPDATED: Modified to handle both images and videos
  const handleImageChange = (e) => {
    let files = e.target.files[0];
    
    // ADDED: Check if file is video or image
    if (files.type.startsWith('video/')) {
      let video_url = URL.createObjectURL(files);
      setVideoPreview(video_url);
      setVideo(files);
      setMediaType("video");
      // Clear image states if video is selected
      setImage(null);
      setImagePreview(null);
    } else if (files.type.startsWith('image/')) {
      let image_url = URL.createObjectURL(files);
      setImagePreview(image_url);
      setImage(files);
      setMediaType("image");
      // Clear video states if image is selected
      setVideo(null);
      setVideoPreview(null);
    }
    
    setMediaSelected(true);
  };

  const uploadImage = async () => {
    // username : dwtsjgcyf
    // password : ls8frk5v
    try {
      setImageLoading(true);
      const data = new FormData();
      data.append("file", image);
      data.append("upload_preset", "ls8frk5v");

      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/dwtsjgcyf/image/upload",
        data
      );

      setImageLink(response.data.url);
      console.log(response.data.url);
      setImage(null);
      setImagePreview(null);
      setMedia(false);
      handleClose();
      setMediaSelected(false);
      return response.data.url;
    } catch (error) {
      console.log(error);
      toast.error("Error uploading image");
    }
    setImageLoading(false);
  };

  // ADDED: New function to upload videos to Cloudinary
  const uploadVideo = async () => {
    try {
      setVideoLoading(true);
      console.log("Starting video upload...");
      
      const data = new FormData();
      data.append("file", video);
      data.append("upload_preset", "ls8frk5v");
      data.append("resource_type", "video");
      
      console.log("Video file size:", video.size);
      console.log("Video file type:", video.type);

      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/dwtsjgcyf/video/upload",
        data,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          timeout: 300000, // 5 minutes timeout for large videos
          onUploadProgress: (progressEvent) => {
            const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
            console.log("Upload progress:", percentCompleted + "%");
          }
        }
      );

      setVideoLink(response.data.url);
      console.log("Video uploaded successfully:", response.data.url);
      setVideo(null);
      setVideoPreview(null);
      setMedia(false);
      setMediaSelected(false);
      setVideoLoading(false);
      return response.data.url;
    } catch (error) {
      console.log("Video upload error details:", error);
      if (error.response) {
        console.log("Error response:", error.response.data);
        toast.error(`Upload failed: ${error.response.data.error?.message || 'Unknown error'}`);
      } else if (error.request) {
        console.log("Network error:", error.request);
        toast.error("Network error - check your connection");
      } else {
        console.log("Error:", error.message);
        toast.error("Upload failed: " + error.message);
      }
      setVideoLoading(false);
      return null;
    }
  };

  return (
    <>
      <div
        onClick={handleOpen}
        className="bg-gray-100 hover:bg-gray-200 cursor-pointer rounded-full w-full p-3"
      >
        <h4 className="text-md text-gray-500">
          What's on your mind,{" "}
          <span className="capitalize">{user?.f_name}?</span>{" "}
        </h4>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div
          onClick={handleClose}
          className="flex  h-screen relative  justify-center items-center"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="xl:w-[30%] h-[600px] min-w-[500px] hide-scrollbar overflow-y-scroll relative md:w-[40%] overflow-hidden rounded-md mx-auto bg-white shadow-md"
          >
            <h4 className="text-center p-4 text-xl font-bold">Create post</h4>
            <hr className="hr" />

            {/* user information */}
            <div className="">
              <div className="flex items-center gap-2 p-4">
                <div className="flex items-center gap-3">
                  <div className="w-[45px] h-[45px] bg-gray-200 border-gray-300 rounded-full border flex justify-center items-center">
                    <FaUser size={25} className="text-gray-600" />
                  </div>
                  <div className="flex flex-col">
                    <h4 className="text-md font-semibold capitalize">
                      {user?.f_name}
                    </h4>
                    <div className="flex bg-gray-200 items-center px-1 rounded-sm gap-1">
                      <RiGroupFill size={10} />
                      <p className="text-sm font-semibold">Friends</p>
                      <FaSortDown size={10} />
                    </div>
                  </div>
                </div>
              </div>
              <div
                style={{
                  backgroundPosition: "center center",
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "cover", // Use cover instead of 100% 100%
                  background:
                    startColor === ""
                      ? `url(${selectedColor?.image})`
                      : `linear-gradient(${startColor}, ${endColor})`,
                }}
                className={`w-full ${
                  changed
                    ? "h-[350px] bg-image bg-no-repeat bg-cover text-white flex justify-center items-center placeholder-gray-400 font-extrabold"
                    : media
                    ? "h-[30px]"
                    : "h-[200px]"
                } px-4 pb-4 text-black relative text-[1.5rem] transition-all duration-150 outline-0 my-3 post-caption`}
              >
                <p
                  className={`pointer-events-none text-gray-600 absolute ${
                    show ? "block" : "hidden"
                  }
                    ${media ? "text-[15px]" : ""}
                  `}
                >
                  What's on your mind?{" "}
                  <span className="capitalize">{user?.f_name}</span>
                </p>
                <textarea
                  value={caption}
                  onChange={(e) => setCaption(e.target.value)}
                  style={{
                    resize: "none", // Disable manual resizing
                    background: "transparent", // Match gradient background
                    whiteSpace: "pre-wrap", // Allow text wrapping
                    wordBreak: "break-word", // Break long words
                  }}
                  className={`${
                    changed ? "" : ""
                  } w-full outline-0 border-none bg-transparent`}
                  placeholder=""
                />
              </div>
              {media && (
                <div className="p-4">
                  <input
                    onChange={handleImageChange}
                    type="file"
                    className="hidden"
                    name="media"
                    id="media"
                    accept="image/*,video/*" // UPDATED: Accept both images and videos
                  />
                  <label htmlFor="media"> {/* FIXED: Changed 'for' to 'htmlFor' for React */}
                    <div className="p-2 h-[350px] rounded-xl outline-1 outline-gray-300">
                      <div className="relative h-full w-full max-w-xl bg-gray-100 rounded-md   border-0 p-1 flex flex-col hover:bg-gray-200 cursor-pointer   items-center justify-center text-center">
                        {/* Close button */}
                        <button
                          onClick={() => {
                            setMedia(false);
                            setImagePreview(null);
                            setVideoPreview(null); // ADDED: Clear video preview
                            setMediaSelected(false);
                            setMediaType(""); // ADDED: Reset media type
                          }}
                          className="absolute top-3 right-3 bg-white border border-gray-300 rounded-full p-2 hover:bg-gray-200"
                        >
                          <FaTimes className="text-gray-600 text-sm" />
                        </button>
                        {mediaSelected ? (
                          <div className=" overflow-y-scroll hide-scrollbar">
                            {/* UPDATED: Show image or video based on media type */}
                            {mediaType === "image" && imagePreview && (
                              <img src={imagePreview} width={"100%"} alt="" />
                            )}
                            {mediaType === "video" && videoPreview && (
                              <video 
                                src={videoPreview} 
                                width={"100%"} 
                                controls 
                                style={{ maxHeight: "300px" }}
                              />
                            )}
                          </div>
                        ) : (
                          <>
                            {/* Icon */}
                            <div className="bg-gray-200 p-4 rounded-full mb-4">
                              <FaImages className="text-gray-700 text-2xl" />
                            </div>

                            {/* Text */}
                            <p className="font-medium text-black text-lg">
                              Add photos/videos {/* UPDATED: Include videos in text */}
                            </p>
                            <p className="text-gray-500 text-sm">
                              or drag and drop
                            </p>
                          </>
                        )}
                      </div>
                    </div>
                  </label>
                </div>
              )}

              <div className="px-5">
                <div className="flex items-center  justify-between border border-gray-300 rounded-lg px-4 py-4 bg-white w-full max-w-xl">
                  <span className="text-black font-medium">
                    Add to your post
                  </span>
                  <div className="flex items-center space-x-4">
                    <FaImage
                      onClick={() => setMedia(true)}
                      className="text-green-500 text-xl cursor-pointer"
                    />
                    {/* ADDED: Separate video icon - you can use this for video-only selection if needed */}
                    <FaVideo
                      onClick={() => setMedia(true)}
                      className="text-purple-500 text-xl cursor-pointer"
                      title="Add Video"
                    />
                    <FaUserTag className="text-blue-500 text-xl cursor-pointer" />
                    <FaSmile className="text-yellow-500 text-xl cursor-pointer" />
                    <FaMapMarkerAlt className="text-red-500 text-xl cursor-pointer" />
                    <FaGift className="text-teal-500 text-xl cursor-pointer" />
                    <FaEllipsisH className="text-gray-600 text-xl cursor-pointer" />
                  </div>
                </div>
              </div>

              <div className="flex p-4 justify-between items-center">
                {openColor ? (
                  <>
                    <div
                      onClick={() => setOpenColor(false)}
                      className="flex cursor-pointer bg-gray-300 justify-center items-center h-[32px] w-[32px] rounded-lg"
                    >
                      <IoChevronBackSharp
                        className="-translate-x-[1.5px]"
                        size={20}
                      />
                    </div>
                    <motion.div
                      className="flex gap-2 ml-2"
                      initial="hidden"
                      animate="visible"
                      variants={{
                        visible: {
                          transition: {
                            staggerChildren: 0.1,
                          },
                        },
                      }}
                    >
                      {colors?.map((item, index) => {
                        console.log(item);
                        return (
                          <motion.div
                            onClick={() => {
                              index == 9
                                ? setShowBG(true)
                                : setSelectedColor(
                                    index == 8
                                      ? {
                                          startColor: "",
                                          endColor: "",
                                          image: item?.image,
                                        }
                                      : {
                                          startColor: item?.startColor,
                                          endColor: item?.endColor,
                                        }
                                  );
                              setChanged(index == 0 ? false : true);
                            }}
                            key={index}
                            initial={{ scale: 0, rotate: 180 }}
                            animate={{ scale: 1, rotate: 0 }}
                            transition={{
                              delay: index * 0.1,
                              duration: 0.3,
                              type: "spring",
                              stiffness: 300,
                            }}
                            className="h-[32px] w-[32px] rounded-lg border border-gray-200 shadow-lg cursor-pointer"
                            style={{
                              background:
                                index == 8 || index == 9
                                  ? `url(${item?.image})`
                                  : `linear-gradient(to right,${item?.startColor},${item?.endColor})`,
                              backgroundSize: "100% 100%",
                              backgroundPosition: "center center",
                            }}
                          ></motion.div>
                        );
                      })}
                    </motion.div>
                  </>
                ) : (
                  <>
                    <img
                      onClick={() => setOpenColor(true)}
                      className="cursor-pointer h-[32px] w-[32px]"
                      src="/menu_icons/picker.png"
                      alt=""
                    />
                  </>
                )}

                <GoSmiley
                  size={30}
                  className="text-gray-700"
                  cursor={"pointer"}
                />
              </div>
            </div>

            {/* my_background */}

            <BackgroundThemes
              showBG={showBG}
              setShowBG={setShowBG}
              setSelectedColor={setSelectedColor}
            />
            <div className="p-4">
              <Button
                onClick={handlePostUpload}
                disabled={show || postLoading || imageLoading || videoLoading} // UPDATED: Include video loading
                variant="contained"
                style={{
                  background:
                    show || imageLoading || postLoading || videoLoading ? "#99a1af" : "", // UPDATED: Include video loading
                }}
                className="w-full  my-2"
              >
                {postLoading || imageLoading || videoLoading ? ( // UPDATED: Include video loading
                  <ClockLoader size={25} color={"white"} />
                ) : (
                  "Add Post"
                )}
              </Button>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
}