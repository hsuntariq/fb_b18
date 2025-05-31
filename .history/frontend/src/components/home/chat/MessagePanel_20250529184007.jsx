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
import io from 'socket.io-client';

const socket = io.connect('http://localhost:5174');

// Helper function to format time (e.g., 12:00 PM)
const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};

export default function MessagePanel({ receiver_id, username }) {
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState('');
    const [sentMessages, setSentMessages] = useState([]);
    const [receivedMessages, setReceivedMessage] = useState([]);
    
    const toggleDrawer = (newOpen) => () => setOpen(newOpen);

    const handleMessage = () => {
        if (!message.trim()) return;

        const newMsg = {
            sent: true,
            time: Date.now(),
            message
        };

        socket.emit('sent_message', newMsg);
        setSentMessages(prev => [...prev, newMsg]);
        setMessage('');
    };

    useEffect(() => {
        socket.on('received_message', (data) => {
            setReceivedMessage((prevValue) => [...prevValue, {
                sent: false,
                time: Date.now(),
                message: data.message
            }]);
        });

        return () => socket.off('received_message');
    }, []);

    // Combine and sort messages by time
    const allMessages = [...sentMessages, ...receivedMessages].sort((a, b) => a.time - b.time);

    return (
        <Box sx={{ backgroundColor: 'transparent' }}>
            <button 
                onClick={toggleDrawer(true)} 
                className="bg-gray-200 cursor-pointer rounded-md px-4 py-2 text-black font-semibold whitespace-nowrap flex items-center gap-2"
            >
                <BsChatDots /> Message
            </button>
            
            <Drawer
                anchor="right"
                open={open}
                onClose={toggleDrawer(false)}
                PaperProps={{
                    sx: {
                        width: '340px',
                        height: '500px',
                        borderRadius: '20px 0 0 20px',
                        bottom: '0px',
                        right: '10%',
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
                    <IconButton onClick={toggleDrawer(false)} sx={{ color: 'purple', p: 0.5 }}>
                        <svg width="24" height="24" viewBox="0 0 24 24">
                            <path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z" />
                        </svg>
                    </IconButton>
                </Box>

                <Divider />

                {/* Message Area */}
                <Box sx={{ 
                    flexGrow: 1, 
                    p: 2, 
                    bgcolor: '#e5ddd5', 
                    overflowY: 'auto',
                    backgroundImage: 'url("https://web.whatsapp.com/img/bg-chat-tile-light_a4be512e7195b6b733d9110b408f075d.png")',
                    backgroundRepeat: 'repeat'
                }}>
                    {allMessages?.map((item, index) => (
                        <Box 
                            key={index}
                            sx={{ 
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: item.sent ? 'flex-end' : 'flex-start',
                                mb: 2
                            }}
                        >
                            <Box
                                sx={{
                                    position: 'relative',
                                    maxWidth: '70%',
                                    p: 1.5,
                                    borderRadius: item.sent 
                                        ? '18px 18px 0 18px' 
                                        : '18px 18px 18px 0',
                                    bgcolor: item.sent ? '#dcf8c6' : 'white',
                                    boxShadow: '0 1px 0.5px rgba(0,0,0,0.13)'
                                }}
                            >
                                <Typography variant="body1">{item?.message}</Typography>
                                <Typography 
                                    variant="caption" 
                                    sx={{
                                        display: 'block',
                                        textAlign: 'right',
                                        color: 'rgba(0,0,0,0.45)',
                                        fontSize: '0.6875rem',
                                        mt: 0.5
                                    }}
                                >
                                    {formatTime(item.time)}
                                </Typography>
                            </Box>
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
                        sx={{ color: message ? '#1b74e4' : 'inherit' }}
                    >
                        <BsSend size={20} />
                    </IconButton>
                </Box>
            </Drawer>
        </Box>
    );
}