import React, { useState } from 'react';
import axios from 'axios';
import { API_ENDPOINTS } from '../../config/apiConfig';

const Chatbox = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');

    const toggleChatBox = () => {
        setIsOpen(!isOpen);
    };

    const handleInputChange = (e) => {
        setInput(e.target.value);
    };

    const handleSendMessage = async () => {
        if (!input.trim()) return;

        const newMessage = { text: input, type: 'user' };
        setMessages([...messages, newMessage]);

        try {
            const response = await axios.post(API_ENDPOINTS.CHAT_AI, {
                prompt: input
            }, {
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            console.log('Response:', response.data); 
            setMessages([...messages, newMessage, { text: response.data.text, type: 'bot' }]);
        } catch (error) {
            console.error('Error sending message:', error);
        }

        setInput('');
    };

    return (
        <div>
            <div
                className={`fixed bottom-5 right-5 bg-blue-500 text-white rounded-full w-12 h-12 flex items-center justify-center cursor-pointer shadow-lg transform transition-transform ${isOpen ? 'scale-110' : ''}`}
                onClick={toggleChatBox}
                style={{ zIndex: 1000 }} 
            >
                <i className="fas fa-comments text-xl"></i>
            </div>
            <div className={`fixed bottom-5 right-5 w-80 h-96 bg-white rounded-lg shadow-lg flex flex-col transition-transform transform ${isOpen ? 'scale-100' : 'scale-0'}`} style={{ zIndex: 1000 }}>
                <div className="flex justify-between items-center p-3 bg-blue-500 text-white rounded-t-lg">
                    <span className="font-semibold">Chat</span>
                    <button
                        className="bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
                        onClick={toggleChatBox}
                    >
                        X
                    </button>
                </div>
                <div className="flex-1 p-3 overflow-y-auto">
                    {messages.map((msg, index) => (
                        <div key={index} className={`my-2 p-2 rounded-lg ${msg.type === 'user' ? 'bg-blue-100 text-blue-800 self-end' : 'bg-gray-100 text-gray-800 self-start'}`}>
                            {msg.text}
                        </div>
                    ))}
                </div>
                <div className="p-3 bg-gray-100 rounded-b-lg flex items-center">
                    <input
                        type="text"
                        value={input}
                        onChange={handleInputChange}
                        placeholder="Type a message..."
                        className="flex-1 p-2 border border-gray-300 rounded-lg"
                    />
                    <button
                        onClick={handleSendMessage}
                        className="ml-2 bg-blue-500 text-white p-2 rounded-lg"
                    >
                        Send
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Chatbox;
