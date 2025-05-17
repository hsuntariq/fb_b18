import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { FaRegComment } from 'react-icons/fa';
import EmojiReactions from './EmojiReactions';
import { PiShareFat } from 'react-icons/pi';
import { RxAvatar } from 'react-icons/rx';
import { BsEmojiSmile, BsThreeDots } from 'react-icons/bs';
import { BiCamera, BiSolidSend } from 'react-icons/bi';
import { HiOutlineGif } from "react-icons/hi2";
import { PiSticker } from "react-icons/pi";
import { useDispatch, useSelector } from 'react-redux';
import { Avatar, Tooltip } from '@mui/material';
import { motion } from 'framer-motion';
import { addCommentData } from '../../../features/posts/postSlice';

export default function CommentModal({ post_id }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const { user } = useSelector((state) => state.auth);
  const [comment, setComment] = React.useState('');
  const dispatch = useDispatch();

  const handleComment = () => {
    if (!comment.trim()) return;
    const postData = { comment, post_id };
    dispatch(addCommentData(postData));
    setComment('');
  };

  return (
    <div>
      <div onClick={handleOpen} className="flex gap-2 cursor-pointer justify-center items-center w-full">
        <FaRegComment className="text-gray-600" />
        <h6 className="font-semibold text-sm text-gray-600">Comment</h6>
      </div>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white text-black rounded w-[95%] max-w-2xl max-h-[90vh] overflow-y-auto">
          
          {/* Header */}
          <div className='flex items-center justify-center h-[70px] border-b border-gray-300'>
            <h1 className='font-semibold text-2xl'>{user?.f_name}'s Post</h1>
          </div>

          {/* Post Details */}
          <div className="p-4">
            <div className="flex items-center">
              <img
                src="https://scontent.fisb17-1.fna.fbcdn.net/v/t39.30808-6/498948044_698083949390945_3426704093410471690_n.jpg"
                alt="profile"
                className="rounded-full w-10 h-10 mr-3"
              />
              <div>
                <p className="font-semibold text-sm">
                  Imtiaz Hussain Photography <span className="text-gray-500">is in</span>{" "}
                  <span className="font-semibold text-sm">Gilgit-Baltistan.</span>
                </p>
                <p className="text-xs text-gray-500">5h · 🌐</p>
              </div>
            </div>
            <p className='mt-2'>Love to see this view</p>
          </div>

          {/* Image */}
          <div className="w-full">
            <img
              src="https://scontent.fisb17-1.fna.fbcdn.net/v/t39.30808-6/498948044_698083949390945_3426704093410471690_n.jpg"
              alt="Post"
              className="w-full rounded"
            />
          </div>

          {/* Reactions */}
          <div className="flex px-5 border-b-2 border-gray-200 py-3 items-center justify-between">
            <EmojiReactions />
            <div className="flex gap-2 cursor-pointer items-center hover:bg-gray-200 p-2 rounded">
              <FaRegComment className="text-gray-600" />
              <h6 className="font-semibold text-sm text-gray-600">Comment</h6>
            </div>
            <div className="flex gap-2 cursor-pointer items-center hover:bg-gray-200 p-2 rounded">
              <PiShareFat className="text-gray-600" />
              <h6 className="font-semibold text-sm text-gray-600">Share</h6>
            </div>
          </div>

          {/* Existing Comment (example) */}
          <div className="p-4 text-sm w-full">
            <div className='flex gap-2'>
              <Avatar sx={{ width: 30, height: 30 }} alt="User" src="/static/images/avatar/1.jpg" />
              <div className='flex flex-col gap-1 p-1 bg-gray-100 rounded'>
                <h1 className='font-normal'>Wajeeha Durrani</h1>
                <p>Very beautiful, good job 👍💖💜</p>
              </div>
              <span className='w-[30px] h-[30px] mt-2 rounded-full cursor-pointer hover:bg-gray-100 flex items-center justify-center'>
                <BsThreeDots className='text-xl text-gray-500' />
              </span>
            </div>
          </div>

          {/* Comment Input */}
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className="flex w-full p-3 gap-2 sticky border-t-2 border-gray-200 bottom-0 left-0 bg-white"
          >
            <Avatar
              sx={{ width: 30, height: 30 }}
              alt={user?.f_name}
              src="/static/images/avatar/1.jpg"
            />

            <div className="bg-gray-100 rounded-xl w-full text-sm text-gray-800">
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder={`Comment as ${user?.f_name}`}
                className="outline-none resize-none w-full border-0 p-3 rounded-xl"
                rows={1}
              ></textarea>

              <div className="flex gap-2 justify-between items-center px-3 pb-2">
                <div className="flex gap-3 text-lg text-gray-500">
                  <Tooltip title="Avatar">
                    <span className="cursor-pointer"><RxAvatar /></span>
                  </Tooltip>
                  <Tooltip title="Emoji">
                    <span className="cursor-pointer"><BsEmojiSmile /></span>
                  </Tooltip>
                  <Tooltip title="Camera">
                    <span className="cursor-pointer"><BiCamera /></span>
                  </Tooltip>
                  <Tooltip title="GIF">
                    <span className="cursor-pointer"><HiOutlineGif /></span>
                  </Tooltip>
                  <Tooltip title="Sticker">
                    <span className="cursor-pointer"><PiSticker /></span>
                  </Tooltip>
                </div>

                <BiSolidSend onClick={handleComment} className="cursor-pointer text-gray-500" />
              </div>
            </div>
          </motion.div>
        </Box>
      </Modal>
    </div>
  );
}
