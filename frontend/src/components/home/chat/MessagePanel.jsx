import React, { useEffect, useState } from 'react';
import {
    Box,
    Drawer,
    Avatar,
    Typography,
    Divider,
    TextField,
    IconButton
} from '@mui/material';
import {
    FaSmile,
    FaThumbsUp,
    FaPlus,
    FaImage,
    FaGift
} from 'react-icons/fa';
import { BsChatDots, BsSend } from 'react-icons/bs';
import io from 'socket.io-client'
import { useSelector } from 'react-redux';
import { FaVideo } from 'react-icons/fa6';
import { Link } from 'react-router-dom';
import { Toast } from '../../../video_call/ToastVideo';

const socket = io.connect('http://localhost:5174');

export default function MessagePanel({ receiver_id, username, show, setShow }) {
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]); // Combined messages storage
    const toggleDrawer = (newOpen) => () => setOpen(newOpen);

    const { user } = useSelector((state) => state.auth)

    // Load existing messages when drawer opens or receiver changes
    useEffect(() => {
        if (open) {
            // Here you would typically fetch existing messages from your API
            // For now, we'll just initialize with empty array
            // setMessages([]);
        }
    }, [open, receiver_id]);

    const handleMessage = () => {
        if (!message.trim()) return;

        const newMsg = {
            sent: true,
            time: Date.now(),
            message,
            sender_id: user?._id,
            receiver_id
        };

        socket.emit('sent_message', newMsg);

        // Add to local messages immediately for optimistic UI
        setMessages(prev => [...prev, newMsg]);
        setMessage('');
    };



    useEffect(() => {
        const handleReceivedMessage = (data) => {
            // Only add if the message is for this chat
            if ((data.receiver_id === user?._id && data.sender_id === receiver_id) ||
                (data.sender_id === user?._id && data.receiver_id === receiver_id)) {
                setMessages(prev => [...prev, {
                    ...data,
                    sent: data.sender_id === user?._id
                }]);

            }
        };



        socket.on('received_message', handleReceivedMessage);

        return () => {
            socket.off('received_message', handleReceivedMessage);
        };
    }, [user?._id, receiver_id]);

    // Filter messages to only show those between current user and selected receiver
    const filteredMessages = messages.filter(msg =>
        (msg.sender_id === user?._id && msg.receiver_id === receiver_id) ||
        (msg.sender_id === receiver_id && msg.receiver_id === user?._id)
    ).sort((a, b) => a.time - b.time);



    const sendNotification = () => {
        socket.emit('calling', { sender_id: user?._id, receiver_id, sender_name: `${user?.f_name} ${user?.l_name}` })
    }






    return (
        <Box sx={{ backgroundColor: 'transparent' }}>

            <button
                onClick={toggleDrawer(true)}
                className="bg-gray-200 cursor-pointer rounded-md px-4 py-2 text-black font-semibold whitespace-nowrap flex items-center gap-2"
            >
                <BsChatDots />
                {" "}
                Message
            </button>
            <Drawer
                anchor="right"
                open={open}
                onClose={toggleDrawer(false)}
                PaperProps={{
                    sx: {
                        width: '340px',
                        height: '500px',
                        borderRadius: '8px 0 0 8px',
                        bottom: '0px',
                        right: '10%',
                        borderRadius: '20px',
                        top: 'auto',
                        boxShadow: '0 -2px 10px rgba(0, 0, 0, 0.1)',
                        backgroundColor: 'rgba(255, 255, 255, 0.9)',
                        marginLeft: 'auto'
                    },
                }}
            >
                {/* Header */}
                <Box sx={{ display: 'flex', alignItems: 'center', p: 1, bgcolor: 'rgba(240, 242, 245, 0.9)' }}>
                    <Avatar
                        src="https://via.placeholder.com/40"
                        alt={username}
                        sx={{ width: 40, height: 40, mr: 1 }}
                    />
                    <Box sx={{ flexGrow: 1 }}>
                        <Typography variant="subtitle1" fontWeight="bold" fontSize="16px">
                            {username}
                        </Typography>
                    </Box>
                    <Link onClick={sendNotification} target='_blank' to={`/video-call/${user?._id}/${receiver_id}`} >
                        <IconButton sx={{ color: 'purple', p: 0.5 }}>
                            <FaVideo />

                        </IconButton>
                    </Link>
                    <IconButton onClick={toggleDrawer(false)} sx={{ color: 'purple', p: 0.5 }}>
                        <svg width="24" height="24" viewBox="0 0 24 24">
                            <path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z" />
                        </svg>
                    </IconButton>
                </Box>

                {/* Encrypted Info */}
                <Box sx={{ textAlign: 'center', px: 2, py: 0.5, bgcolor: 'rgba(228, 230, 235, 0.9)' }}>
                    {/* You can add encryption info here if needed */}
                </Box>

                <Divider />

                {/* Message Area */}
                <Box sx={{
                    flexGrow: 1,
                    p: 2,
                    bgcolor: 'transparent',
                    overflowY: 'auto',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 1
                }}>
                    {filteredMessages.map((msg, index) => (
                        <Box
                            key={index}
                            sx={{
                                alignSelf: msg.sent ? 'flex-end' : 'flex-start',
                                maxWidth: '80%',
                                p: 1.5,
                                borderRadius: msg.sent ? '18px 18px 0 18px' : '18px 18px 18px 0',
                                bgcolor: msg.sent ? '#1b74e4' : '#e4e6eb',
                                color: msg.sent ? 'white' : 'black',
                            }}
                        >
                            <Typography variant="body2">{msg.message}</Typography>
                        </Box>
                    ))}
                </Box>

                {/* Input Area */}
                <Box sx={{
                    p: 1,
                    bgcolor: 'rgba(240, 242, 245, 0.9)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1
                }}>
                    {/* Attachments and Icons */}
                    <Box
                        sx={{
                            display: 'flex',
                            gap: 1,
                            transition: 'opacity 0.3s ease, transform 0.3s ease, width 0.3s ease',
                            opacity: message ? 0 : 1,
                            transform: message ? 'translateX(-20px)' : 'translateX(0)',
                            width: message ? '0px' : 'auto',
                            overflow: 'hidden',
                        }}
                    >
                        <IconButton sx={{ color: '#1b74e4' }}><FaPlus size={20} /></IconButton>
                        <IconButton sx={{ color: '#1b74e4' }}><FaImage size={20} /></IconButton>
                        <IconButton sx={{ color: '#1b74e4' }}><FaGift size={20} /></IconButton>
                        <IconButton sx={{ color: '#1b74e4' }}><FaSmile size={20} /></IconButton>
                        <IconButton sx={{ color: '#1b74e4' }}><FaThumbsUp size={20} /></IconButton>
                    </Box>

                    {/* Input Box */}
                    <TextField
                        variant="outlined"
                        size="small"
                        placeholder="Aa"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleMessage()}
                        sx={{
                            bgcolor: '#fff',
                            borderRadius: '20px',
                            width: message ? '100%' : 'auto',
                            flexGrow: 1,
                            transition: 'width 0.3s ease, flex-grow 0.3s ease',
                            '& .MuiOutlinedInput-root': {
                                borderRadius: '20px',
                                '& fieldset': { borderColor: '#e4e6eb' },
                                '&:hover fieldset': { borderColor: '#e4e6eb' },
                                '&.Mui-focused fieldset': { borderColor: '#e4e6eb' },
                            },
                        }}
                    />
                    <IconButton
                        onClick={handleMessage}
                        disabled={!message.trim()}
                        sx={{ color: '#1b74e4' }}
                    >
                        <BsSend />
                    </IconButton>
                </Box>
            </Drawer>
        </Box>
    );
}