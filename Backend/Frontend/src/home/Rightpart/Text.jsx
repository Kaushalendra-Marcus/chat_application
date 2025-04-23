import React, { useState } from 'react'
import { IoSend } from "react-icons/io5";
import useSendMessage from '../../context/useSendMessage';
const Text = () => {
    const { loading, sendMessages } = useSendMessage();
    const [message, setMessage] = useState("")
    const handleSumbit = async (e) => {
        console.log(e);
        e.preventDefault()
        if (!message.trim()) return;
        await sendMessages(message)
        setMessage("")
    }
    return (
        <form onSubmit={handleSumbit}>
            <div className='w-full px-6 pb-4'>
                <div className="border border-slate-600 p-1 rounded-full flex items-center gap-2 bg-slate-700 hover:bg-slate-600/80 duration-200">
                    <input
                        className="w-full outline-none bg-transparent text-gray-200 p-3 pl-6 placeholder-slate-400"
                        type="text"
                        placeholder='Type your message...'
                        onChange={(e) => {
                            setMessage(e.target.value)
                        }}
                        value={message}
                    />
                    <button
                        className="flex justify-center items-center p-3 rounded-full text-green-400 hover:bg-slate-500 duration-200 mr-1 cursor-pointer"
                        type="submit"
                        aria-label="Send message"
                    >
                        <IoSend className="text-xl hover:text-green-300 duration-200" />
                    </button>
                </div>
            </div>
        </form>
    )
}

export default Text