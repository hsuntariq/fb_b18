import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { FaSortAlphaDown, FaSortDown, FaUser } from "react-icons/fa";
import { Fa42Group } from "react-icons/fa6";
import { RiGroupFill } from "react-icons/ri";
import { GoSmiley } from "react-icons/go";
import { IoChevronBackSharp } from "react-icons/io5";
import { colors } from "./data/color-data";
import { motion } from "framer-motion";
import { IoIosArrowRoundBack } from "react-icons/io";
import myData from "./data/decorative";
import BackgroundThemes from "./BackgroundThemes";
import { useSelector } from "react-redux";
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
  const [open, setOpen] = React.useState(false);
  const [selectedColor, setSelectedColor] = React.useState({
    startColor: "#fff",
    endColor: "#fff",
    image: "",
  });

  const [changed, setChanged] = React.useState(false);
  const [caption, setCaption] = React.useState("");
  const [show, setShow] = React.useState(true);
  const [showBG, setShowBG] = React.useState(false);
  const { startColor, endColor } = selectedColor;
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    console.log("clicked");
  };

  const [openColor, setOpenColor] = React.useState(false);

  React.useEffect(() => {
    caption.length > 0 ? setShow(false) : setShow(true);
  }, [caption]);

  const { user } = useSelector((state) => state.auth);

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
            className="xl:w-[30%] relative md:w-[40%] overflow-hidden rounded-md mx-auto bg-white shadow-md"
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
                    : "h-[200px]"
                } px-4 pb-4 text-black relative text-[1.5rem] transition-all duration-150 outline-0 my-3 post-caption`}
              >
                <p className={`absolute ${show ? "block" : "hidden"}`}>
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
          </div>
        </div>
      </Modal>
    </>
  );
}
