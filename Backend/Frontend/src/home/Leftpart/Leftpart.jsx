import React from 'react';
import { FiX } from 'react-icons/fi';
import Search from './Search';
import Users from './Users';
import Logout from './Logout';
import DeleteAccount from './DeleteAccount';
import toast from 'react-hot-toast';

const Leftpart = ({ menuOpen, toggleMenu }) => {
  return (
    // always flex on md+, but on sm: fixed drawer that slides
    <div
      className={`
        bg-slate-900 text-gray-200 flex flex-col h-full
        border-r border-slate-800
        w-2/3 max-w-xs
        fixed top-0 left-0 z-20
        transform transition-transform duration-300
        ${menuOpen ? 'translate-x-0' : '-translate-x-full'}
        md:translate-x-0 md:static md:flex md:w-[30%]
      `}
    >
      {/* Header */}
      <div className="pt-3 pb-3 bg-slate-900 sticky top-0 z-30 shadow-md shadow-slate-800">
        <div className="flex justify-between items-center px-6">
          <div>
            <h1 className="font-bold text-2xl text-gray-200 tracking-widest">
              cokkie-
              <span className="bg-gradient-to-r from-purple-300 to-blue-300 bg-clip-text text-transparent">
                Chat
              </span>
            </h1>
            <button
              onClick={() => toast('🚧 Group creation coming soon!')}
              className='mx-auto mt-1 text-[10px]  cursor-pointer py-1 px-2 bg-gradient-to-r from-pink-500 via-purple-700 to-indigo-600 text-white rounded-xl shadow-md hover:shadow-pink-600/50 transition duration-300 ease-in-out'
            >
              Create Group
            </button>
          </div>
          {/* only show close icon on sm */}
          <button
            onClick={toggleMenu}
            className="block md:hidden text-gray-200 hover:text-red-600 cursor-pointer"
          >
            <FiX size={24} />
          </button>
        </div>

        <div className="lg:px-2 lg:mt-3 md:px-1 ">
          <Search />
        </div>
        <hr className="border-slate-700 mt-3 mx-6" />
      </div>

      {/* Users Scrollable List */}
      <div className="flex-1 overflow-y-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden bg-slate-900">
        <Users />
      </div>

      {/* Bottom Buttons */}
      <hr className="border-slate-700 mx-6" />
      <div className="flex flex-col items-start ml-2 justify-start gap-3 px-3 py-4" >
        
        <div className="flex gap-2 items-center cursor-pointer group">
          <p className='mx-auto mt-1 text-[10px]  cursor-pointer py-1 px-2 bg-gradient-to-r from-red-500 via-red-700 to-red-600 text-white rounded-xl shadow-md hover:shadow-pink-600/50 transition duration-300 ease-in-out'
          >
            Delete Account
          </p>
          <DeleteAccount />
        </div>
      </div>
    </div>
  );
};

export default Leftpart;
