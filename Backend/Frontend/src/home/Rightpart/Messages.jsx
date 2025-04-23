import React, { useEffect, useRef } from 'react'
import Message from './Message'
import useGetMsg from '../../context/useGetMsg.js'
import AnonymousLoading from './AnonymousLoading.jsx'
import ParticlesFloat from './ParticlesFloat.jsx'
import useGetSocketMessage from '../../context/useGetSocketMessage.jsx'
const Messages = () => {
    const { messages, loading } = useGetMsg()
    useGetSocketMessage()
    const lastMsgRef = useRef();
    useEffect(() => {
        setTimeout(() => {
            if (lastMsgRef.current) {
                lastMsgRef.current.scrollIntoView({
                    behavior: "smooth",
                });
            }
        }, 10);
    }, [messages]);
    if (loading && messages.length === 0) {
        return (
            <div className="flex justify-center items-center h-full">
                <AnonymousLoading />
            </div>
        )
    }
    return (

        

        <div className="h-full overflow-y-auto p-2">
            {Array.isArray(messages) && messages.length > 0 ? (
                messages.map((msg) => (
                    <div key={msg._id} ref={lastMsgRef}>
                        <Message

                            msg={msg}
                        />
                    </div>
                ))
            ) : (
                <div className="flex justify-center items-center h-full">

                    <div className="text-center p-4">
                        <h3 className="text-xl font-semibold text-gray-200">
                            Start a conversation
                        </h3>
                        <p className="text-gray-400 mt-2">
                            Send your first message to begin chatting
                        </p>
                        <ParticlesFloat />
                    </div>
                </div>
            )
            }
        </div>
    )
}

export default Messages