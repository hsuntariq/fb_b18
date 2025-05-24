import React, { useState } from 'react';
import {
    Box,
    Drawer,
    Avatar,
    Typography,
    Divider,
    TextField,
    IconButton,
    Button
} from '@mui/material';
import {
    FaSmile,
    FaThumbsUp,
    FaPlus,
    FaImage,
    FaGift
} from 'react-icons/fa';

export default function MessagePanel() {
    const [open, setOpen] = useState(false);
    const [isTyping, setIsTyping] = useState(false);

    const toggleDrawer = (newOpen) => () => setOpen(newOpen);

    const handleInputChange = (e) => {
        setIsTyping(e.target.value.length > 0);
    };

    return (
        <Box sx={{ backgroundColor: 'transparent' }}> {/* Main parent with transparent background */}
            <Button variant="contained" onClick={toggleDrawer(true)}>Open Chat</Button>

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
                        alt="Linawati Tan"
                        sx={{ width: 40, height: 40, mr: 1 }}
                    />
                    <Box sx={{ flexGrow: 1 }}>
                        <Typography variant="subtitle1" fontWeight="bold" fontSize="16px">
                            Linawati Tan
                        </Typography>
                    </Box>
                    <IconButton onClick={toggleDrawer(false)} sx={{ color: 'purple', p: 0.5 }}>
                        <svg width="24" height="24" viewBox="0 0 24 24">
                            <path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z" />
                        </svg>
                    </IconButton>
                </Box>

                {/* Encrypted Info */}
                <Box sx={{ textAlign: 'center', px: 2, py: 0.5, bgcolor: 'rgba(228, 230, 235, 0.9)' }}>
                    <Typography variant="body2" sx={{ fontSize: '12px', color: '#606770' }}>
                        🔒 <strong>End-to-end encrypted</strong><br />
                        Messages and calls are secured with end-to-end encryption. Only people in this chat can read, listen to or share them.{' '}
                        <Typography component="span" sx={{ color: '#1b74e4', cursor: 'pointer' }}>
                            Learn more
                        </Typography>
                    </Typography>
                </Box>

                <Divider />

                {/* Message Area */}
                <Box sx={{ flexGrow: 1, p: 2, bgcolor: 'transparent', overflowY: 'auto' }}>
                    {/* Messages would go here */}
                </Box>

                {/* Input Area */}
                <Box sx={{ p: 1, bgcolor: 'rgba(240, 242, 245, 0.9)', display: 'flex', alignItems: 'center', gap: 1 }}>
                    {/* Attachments and Icons */}
                    <Box
                        sx={{
                            display: 'flex',
                            gap: 1,
                            transition: 'opacity 0.3s ease, transform 0.3s ease, width 0.3s ease',
                            opacity: isTyping ? 0 : 1,
                            transform: isTyping ? 'translateX(-20px)' : 'translateX(0)',
                            width: isTyping ? '0px' : 'auto',
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
                        onChange={handleInputChange}
                        sx={{
                            bgcolor: '#fff',
                            borderRadius: '20px',
                            width: isTyping ? '100%' : 'auto',
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
                </Box>
            </Drawer>
        </Box>
    );
}