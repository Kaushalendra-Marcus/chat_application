import { useEffect, useState } from 'react';
import useConversation from '../statemanage/useConversation';
import axios from 'axios';

const useGetMsg = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { messages, setMessages, selectedConversation } = useConversation();

  useEffect(() => {
    const getMessages = async () => {
      if (!selectedConversation?._id) {
        setMessages([]);
        setLoading(true);
        return;
      }
      setLoading(true);
      setError(null);

      try {
        const res = await axios.get(`/api/message/get/${selectedConversation._id}`);
        console.log("API Response:", res.data); // Debugging log

        // Handle multiple possible response formats
        let receivedMessages = [];

        if (Array.isArray(res?.data)) {
          receivedMessages = res.data;
        }
        else if (Array.isArray(res?.data?.messages)) {
          receivedMessages = res.data.messages;
        }
        else if (Array.isArray(res?.data?.data)) {
          receivedMessages = res.data.data;
        }
        else {
          throw new Error("Messages not in expected format");
        }

        setMessages(receivedMessages);
      } catch (err) {
        console.error("Failed to get messages:", err);
        setError(err.message || "Error loading messages");
        setMessages([]);
      } finally {
        setLoading(false);
      }
    };

    getMessages();
  }, [selectedConversation?._id, setMessages]);

  return { messages, setMessages, loading, error };
};

export default useGetMsg;