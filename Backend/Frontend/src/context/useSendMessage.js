import { useState } from 'react';
import useConversation from '../statemanage/useConversation.js';
import axios from 'axios';
import { useSocketContext } from './SocketContext.jsx';

const useSendMessage = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const { messages, setMessages, selectedConversation } = useConversation();
    const { socket } = useSocketContext();

    const sendMessages = async (message) => {
        if (!selectedConversation?._id) {
            setError("No conversation selected");
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const res = await axios.post(
                `http://localhost:3001/api/message/send/${selectedConversation._id}`,
                { message },
                { withCredentials: true }
            );

            setMessages([...messages, res.data.newMessage]);
            // setMessages(prev => {
            //    [...prev, res.data.newMessage];
            // });

            if (socket) {
                socket.emit("sendMessage", {
                    receiverId: selectedConversation._id,
                    message: res.data.newMessage
                });
            }
        } catch (err) {
            console.error("Send failed:", err.response?.data || err.message);
            setError(err.response?.data?.message || "Failed to send message");
        } finally {
            setLoading(false);
        }
    };

    return { loading, error, sendMessages };
};

export default useSendMessage;