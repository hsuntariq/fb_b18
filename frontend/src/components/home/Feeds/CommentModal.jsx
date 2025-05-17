import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { FaRegComment, FaUser } from 'react-icons/fa';
import EmojiReactions from './EmojiReactions';
import { PiShareFat } from 'react-icons/pi';
import { FaSmile, FaGrinAlt, FaCamera, FaGift, FaStickyNote, FaPaperPlane } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { RxAvatar } from "react-icons/rx";
import { BsEmojiSmile } from "react-icons/bs";
import { BiSolidSend } from "react-icons/bi";
import { addCommentData } from '../../../features/posts/postSlice';

const styles = {
    container: {
        display: 'flex',
        alignItems: 'center',
        backgroundColor: '#f0f2f5',
        borderRadius: '25px',
        padding: '10px 15px',
        width: '100%',
        maxWidth: '800px',
        gap: '1rem'
    },
    avatar: {
        width: '32px',
        height: '32px',
        borderRadius: '50%',
        marginRight: '10px',
    },
    input: {
        flex: 1,
        border: 'none',
        backgroundColor: 'transparent',
        outline: 'none',
        fontSize: '14px',
    },
    icons: {
        display: 'flex',
        gap: '10px',
        alignItems: 'center',
        color: '#606770',
        fontSize: '16px',
    },
};
export default function CommentModal({ post_id }) {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const { user } = useSelector((state) => state.auth)

    const [comment, setComment] = React.useState('')


    const dispatch = useDispatch()

    const handleComment = () => {
        const postData = {
            comment, post_id
        }

        dispatch(addCommentData(postData))


    }


    return (
        <div>
            <div onClick={handleOpen} className="flex gap-2 cursor-pointer justify-center items-center w-full">
                <FaRegComment className="text-gray-600 " />
                <h6 className="font-semibold text-sm text-gray-600">Comment</h6>
            </div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <div className="bg-white max-w-md mx-auto border rounded-md shadow-md font-sans">
                    {/* Top Header */}
                    <div className="flex items-center p-4 border-b">
                        <img
                            src="https://scontent.fisb17-1.fna.fbcdn.net/v/t39.30808-6/498948044_698083949390945_3426704093410471690_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=833d8c&_nc_ohc=SAwTJYo9lJQQ7kNvwE9-brH&_nc_oc=AdkHhE2aF_tBiReICULCv8K1pwhvQplGq1mBeeIP9aCRcJOHQl87cSFXLMr5ziFhsoP1AArJIJV089mwhOwM4mZo&_nc_zt=23&_nc_ht=scontent.fisb17-1.fna&_nc_gid=7iXnqBY0ekePYa002ONIbA&oh=00_AfJWVotPTD1TqVuXudrKuxLKekbtIMF2Sldjf6JiNrQlgQ&oe=682E25B0"
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

                    {/* Post Image */}
                    <div className="w-full">
                        <img
                            src="https://scontent.fisb17-1.fna.fbcdn.net/v/t39.30808-6/498948044_698083949390945_3426704093410471690_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=833d8c&_nc_ohc=SAwTJYo9lJQQ7kNvwE9-brH&_nc_oc=AdkHhE2aF_tBiReICULCv8K1pwhvQplGq1mBeeIP9aCRcJOHQl87cSFXLMr5ziFhsoP1AArJIJV089mwhOwM4mZo&_nc_zt=23&_nc_ht=scontent.fisb17-1.fna&_nc_gid=7iXnqBY0ekePYa002ONIbA&oh=00_AfJWVotPTD1TqVuXudrKuxLKekbtIMF2Sldjf6JiNrQlgQ&oe=682E25B0"
                            alt="Gilgit Baltistan"
                            className="w-full"
                        />
                    </div>

                    {/* Like, comment, share */}
                    <div className="flex p-3 jusitfy-between">

                        <EmojiReactions />
                        <div onClick={handleOpen} className="flex gap-2 cursor-pointer justify-center items-center w-full">
                            <FaRegComment className="text-gray-600 " />
                            <h6 className="font-semibold text-sm text-gray-600">Comment</h6>
                        </div>
                        <div className="flex gap-2 justify-center items-center w-full">
                            <PiShareFat className="text-gray-600" />
                            <h6 className="font-semibold text-sm text-gray-600">Share</h6>
                        </div>

                    </div>
                    {/* Comment */}
                    <div className="p-4 text-sm">
                        <p className="font-semibold">Wajeeha Durrani</p>
                        <p>Very beautiful,, good job 👍💖💜</p>
                        <p className="text-xs text-gray-500 mt-1">2h · Like · Reply</p>
                    </div>




                    <div className="flex w-full p-3 gap-2">
                        <div className="w-[35px] h-[35px] bg-gray-200 border-gray-300 rounded-full border flex justify-center items-center">
                            <FaUser size={15} className="text-gray-600" />
                        </div>


                        <div className="bg-gray-100 rounded-xl  w-full text-sm text-gray-800">
                            <textarea value={comment} onChange={(e) => setComment(e.target.value)} placeholder={`Comment as ${user?.f_name}`} name="" className='outline-none  resize-none border-0 p-3' id=""></textarea>
                            <div className="flex gap-2 justify-between items-center">
                                <div className="flex">
                                    <RxAvatar />
                                    <BsEmojiSmile />
                                    <BiSolidSend onClick={handleComment} className='cursor-pointer' />
                                </div>
                            </div>
                        </div>



                    </div>


                </div>




            </Modal>
        </div>
    );
}
