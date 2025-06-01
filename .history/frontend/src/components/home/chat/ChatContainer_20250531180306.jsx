import React from 'react'
import { FaMicrophone, FaMinus, FaPhone, FaVideo } from 'react-icons/fa'
import { IoClose } from 'react-icons/io5'
import { IoMdPhotos } from "react-icons/io";
import { BiSolidSticker } from "react-icons/bi";

const ChatContainer = () => {
    return (
        <>
            <div className="min-h-screen  bg-transparent pointer-events-none z-10 w-full fixed top-0">
                <div className="w-[70%] shadow fixed bottom-0  right-[10%] md:w-[40%] lg:w-[30%] xl:w-[20%] rounded-t-[20px]  bg-white ">
                    <div className=" bg-white ">
                        <div className="flex items-center shadow-md p-2  justify-between">
                            <div className="flex gap-3">
                                <div className="h-[40px] w-[40px] rounded-full">
                                    <img src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D" className='rounded-full' alt="" />
                                </div>
                                <div className="flex flex-col">
                                    <h4 className="text-sm font-semibold">
                                        Username
                                    </h4>
                                    <p className="text-gray-700  text-sm">
                                        Online
                                    </p>
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <FaPhone className='text-purple-600' cursor={'pointer'} />
                                <FaVideo className='text-purple-600' cursor={'pointer'} />
                                <FaMinus className='text-purple-600' cursor={'pointer'} />
                                <IoClose className='text-purple-600' cursor={'pointer'} />
                            </div>
                        </div>
                        <div className="message-screen bg-white relative  overflow-y-scroll hide-scrollbar h-[400px]">
                            <div className="text-center my-4 flex flex-col items-center justify-center">
                                <img src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D" className='w-[70px] h-[70px] rounded-full' alt="" />
                                <h4 className="text-1xl font-semibold">
                                    Username
                                </h4>
                                <p className="text-gray-500 text-sm">You aren't friends on Facebook</p>
                                <p className="text-gray-500 text-sm">
                                    Lives in Wah, Pakistan
                                </p>
                                <p className="text-gray-500 text-sm">
                                    Goes to HITEC CAMBRIDGE
                                </p>

                            </div>
                            <div className="flex p-4 absolute w-full bottom-0 border border-gray-300 border-top-2 border-e-0 border-s-0 border-b-0">
                                <div className="flex gap-1">
                                    <FaMicrophone />
                                    <IoMdPhotos />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ChatContainer