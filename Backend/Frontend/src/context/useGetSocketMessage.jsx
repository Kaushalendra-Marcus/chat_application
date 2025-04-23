import { useEffect } from 'react'
import { useSocketContext } from './SocketContext.jsx'
import useConversation from '../statemanage/useConversation.js'
import { useAuth } from './AuthProvider.jsx'
import sound from '../assets/notification.mp3'
import toast from 'react-hot-toast'
const useGetSocketMessage = () => {
  const { socket } = useSocketContext()
  const { messages, setMessages,selectedConversation } = useConversation()
  const { authUser } = useAuth()

  useEffect(() => {
    const handleNewMessage = (newMessage) => {
      if (selectedConversation?._id === newMessage.conversationId) {

        setMessages((prevMessages) => [...prevMessages, newMessage]);

      }
      if (newMessage.senderId !== authUser._id) {
        try {
          const notification = new Audio(sound);
          notification.play();
        } catch (err) {
          console.error("Sound play error:", err);
        }
        toast.success("📩 New Message Received!");
      }
    };


    socket?.on("newMessage", handleNewMessage)

    return () => socket?.off("newMessage", handleNewMessage)
  }, [socket, setMessages, messages, authUser])
}

export default useGetSocketMessage
