import React, { useMemo } from 'react';
import { RiRadioButtonLine } from "react-icons/ri";
import useConversation from '../../statemanage/useConversation.js';
import { useSocketContext } from '../../context/SocketContext.jsx';

const Chatuser = () => {
    const { selectedConversation } = useConversation();
    const { onlineUsers = [] } = useSocketContext();

    // Compute values safely (even if selectedConversation is null)
    const currentUser = selectedConversation?.username || null;
    const ProfileLetter = currentUser?.charAt(0).toUpperCase() || "";
    const isOnline = selectedConversation ? onlineUsers.includes(selectedConversation._id) : false;

    const colors = [
        "bg-red-500", "bg-blue-500", "bg-yellow-500",
        "bg-green-500", "bg-purple-500", "bg-pink-500",
        "bg-indigo-500", "bg-orange-500"
    ];

    // useMemo runs unconditionally (with fallback if no user)
    const userColor = useMemo(() => {
        if (!currentUser) return colors[0];
        let hash = 0;
        for (let i = 0; i < currentUser.length; i++) {
            hash = currentUser.charCodeAt(i) + ((hash << 5) - hash);
        }
        const index = Math.abs(hash) % colors.length;
        return colors[index];
    }, [currentUser]);

    // Early return AFTER all hooks (if no conversation is selected)
    if (!selectedConversation) return null;

    return (
        <div className='bg-slate-800/90'>
            <div className='flex gap-4 mr-2 p-3 duration-200 hover:bg-slate-700/50'>
                <div className={`w-12 h-12 flex items-center justify-center rounded-full ${userColor} text-white text-xl font-bold`}>
                    {ProfileLetter}
                </div>
                <div className='text-sm flex flex-col justify-center'>
                    <h1 className='font-semibold text-gray-200'>{currentUser}</h1>
                    <span className='font-light text-green-400/80 flex items-center gap-1'>
                        <RiRadioButtonLine className={isOnline ? "text-green-400" : "text-red-400"} />
                        {isOnline ? "online now" : "offline now"}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default Chatuser;