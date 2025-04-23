import React from 'react';
import { FiMenu } from 'react-icons/fi';
import Chatuser from './Chatuser';
import Messages from './Messages';
import Text from './Text';

const Rightpart = ({ menuOpen, toggleMenu }) => {
  return (
    <div className="flex-1 flex flex-col text-gray-200 h-full relative bg-slate-800">

      {/* 🔵 Background Image Layer */}
      <div className="absolute inset-0 flex flex-col items-center justify-center opacity-60 pointer-events-none select-none">
        <img
          src="https://cdn-icons-png.flaticon.com/512/7922/7922155.png"
          alt="cookie-chat"
          className="w-36 h-36 object-contain"
        />
        <h1 className="font-bold text-2xl text-gray-200 tracking-widest">
          cokkie-
          <span className="bg-gradient-to-r from-purple-300 to-blue-300 bg-clip-text text-transparent">
            Chat
          </span>
        </h1>
      </div>

      {/* 🔵 Top Bar */}
      <div className="relative z-10 flex items-center justify-between border-b border-slate-700 px-4 py-2 bg-slate-800/80 backdrop-blur">
        <button
          onClick={toggleMenu}
          className="block md:hidden p-1 text-gray-200"
        >
          <FiMenu size={24} />
        </button>

        {/* Align username to left */}
        <div className="flex-1">
          <Chatuser />
        </div>
      </div>

      {/* 🔵 Messages */}
      <div className="relative z-10 flex-1 overflow-y-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <Messages />
      </div>

      {/* 🔵 Input */}
      <div className="relative z-10 border-t border-slate-700 bg-slate-800/80 backdrop-blur">
        <Text />
      </div>
    </div>
  );
};

export default Rightpart;
