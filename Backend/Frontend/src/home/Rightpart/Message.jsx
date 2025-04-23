import React from "react";

const Message = ({ msg }) => {
  const authUser = JSON.parse(localStorage.getItem("ChatApp"));
  const isSender = msg.senderId === authUser.user._id;

  return (
    <div className={`flex ${isSender ? "justify-end" : "justify-start"} mb-4`}>
      <div
        className={`max-w-xs lg:max-w-md px-4 py-2 rounded-xl shadow-lg backdrop-blur-sm border
          ${
            isSender
              ? "bg-slate-800 text-gray-100 rounded-br-none border-slate-100/20 shadow-slate-800/50"
              : "bg-slate-900 text-gray-100 rounded-bl-none border-slate-400/20 shadow-slate-700/40"
          }`}
        
      >
        <div>{msg.message}</div>
        <div className={`text-xs opacity-70 ${isSender ? 'text-right' : 'text-left'}`}>
          {new Date(msg.createdAt).toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit'
          })}
        </div>
      </div>
    </div>
  );
};

export default Message;