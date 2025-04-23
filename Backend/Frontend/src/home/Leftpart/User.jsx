import React, { useMemo } from 'react'
import { CgProfile } from "react-icons/cg"
import { RiRadioButtonLine } from "react-icons/ri"
import useConversation from '../../statemanage/useConversation.js'
import { useSocketContext } from '../../context/SocketContext.jsx';

const User = ({ user }) => {
    const { selectedConversation, setSelectedConversation } = useConversation();
    const isSelected = selectedConversation?._id === user._id;
    const { socket, onlineUsers } = useSocketContext()
    const isOnline = onlineUsers.includes(user._id)

    //user's username
    const currentUser = user?.username || null;
    const ProfileLetter = currentUser?.charAt(0).toUpperCase() || "";

    const colors = [
        "bg-red-500", "bg-blue-500", "bg-yellow-500",
        "bg-green-500", "bg-purple-500", "bg-pink-500",
        "bg-indigo-500", "bg-orange-500"
    ];

    const userColor = useMemo(() => {
        if (!currentUser) return colors[0]; // Fallback color if no user
        let hash = 0;
        for (let i = 0; i < currentUser.length; i++) {
            hash = currentUser.charCodeAt(i) + ((hash << 5) - hash);
        }
        const index = Math.abs(hash) % colors.length;
        return colors[index];
    }, [currentUser]);

    return (
        <div
            className={`flex gap-4 items-center hover:bg-slate-700/50 m-1 p-3 duration-200 rounded-lg cursor-pointer 
    ${isSelected ? "bg-slate-700" : ""}`}
            onClick={() => setSelectedConversation(user)}
        >
            <div className={`w-8 h-0.5 flex items-center justify-center rounded-full ${userColor} text-white text-xl font-bold`}>
                {ProfileLetter}
            </div>
            <div className='flex-1 text-sm'>
                <h1 className='font-medium text-gray-200'>{user.username}</h1>
                <span className='font-light text-slate-400 text-[12px] sm:text-[11px] md:text-[10px] lg:text-[9px]'>
                    {isOnline ? "online now" : "offline now"}
                </span>

            </div>
            <div className='pr-2'>
                <RiRadioButtonLine className={`${isOnline ? "text-green-400" : "text-red-400"} text-lg`} />
            </div>
        </div>
    );
};

export default User