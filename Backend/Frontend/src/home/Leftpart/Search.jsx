import React, { useState } from 'react';
import { MdOutlineSearch } from "react-icons/md";
import { useGetAllUsers } from '../../context/UsergetAllUsers.jsx';
import useConversation from '../../statemanage/useConversation.js';
import Alert_notfound from '../../components/Alert_notfound.jsx';

const Search = () => {
  const [search, setSearch] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const { allUsers = [] } = useGetAllUsers(); // Fallback empty array
  const { setSelectedConversation } = useConversation();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!search.trim()) return; 

    const searchTerm = search.toLowerCase();

    // Search by username OR ID
    const conversation = allUsers.find((user) => {
      const usernameMatch = user?.username?.toLowerCase().includes(searchTerm);
      const idMatch = user?._id?.toLowerCase().includes(searchTerm);
      return usernameMatch || idMatch;
    });

    if (conversation) {
      setSelectedConversation(conversation);
      setSearch("");
      setShowAlert(false);
    } else {
      setShowAlert(true); // Show "not found" alert
    }
  };

  return (
    <div className=''>
      {showAlert && (
        <Alert_notfound 
          message="User not found" 
          type="error" 
          onClose={() => setShowAlert(false)} 
        />
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="border border-white px-2 sm:p-1 md:p-1 rounded-full mx-6 md:m-3 sm:m-2 mt-2 flex items-center gap-2">
          <input
            className="w-[90%] outline-none bg-transparent text-white p-2 pl-6 hover:bg-gray-600 hover:rounded-full duration-100"
            type="text"
            placeholder="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button 
            type="submit"
            className="flex justify-center md:text-sm items-center lg:text-xl cursor-pointer hover:rounded-full  duration-100"
          >
            <MdOutlineSearch className='text-2xl' />
          </button>
        </div>
      </form>
    </div>
  );
};

export default Search;