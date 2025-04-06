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
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [openColor, setOpenColor] = React.useState(false);

  return (
    <>
      <div
        onClick={handleOpen}
        className="bg-gray-100 hover:bg-gray-200 cursor-pointer rounded-full w-full p-3"
      >
        <h4 className="text-md text-gray-500">
          What's on your mind, Username?
        </h4>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className="flex h-screen justify-center items-center">
          <div className="xl:w-[30%] md:w-[40%] rounded-md mx-auto bg-white shadow-md">
            <h4 className="text-center p-4 text-xl font-bold">Create post</h4>
            <hr className="hr" />

            {/* user information */}
            <div className="p-4">
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-3">
                  <div className="w-[45px] h-[45px] bg-gray-200 border-gray-300 rounded-full border flex justify-center items-center">
                    <FaUser size={25} className="text-gray-600" />
                  </div>
                  <div className="flex flex-col">
                    <h4 className="text-md font-semibold ">Username</h4>
                    <div className="flex bg-gray-200 items-center px-1 rounded-sm gap-1">
                      <RiGroupFill size={10} />
                      <p className="text-sm font-semibold">Friends</p>
                      <FaSortDown size={10} />
                    </div>
                  </div>
                </div>
              </div>
              <textarea
                name=""
                id=""
                className="w-full text-[1.5rem] outline-0 my-3 post-caption"
                placeholder="What's on your mind? Username"
                rows={5}
              ></textarea>

              <div className="flex  justify-between items-center">
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
                        return (
                          <motion.div
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
                              background: `linear-gradient(to right,${item?.startColor},${item?.endColor})`,
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
          </div>
        </div>
      </Modal>
    </>
  );
}
