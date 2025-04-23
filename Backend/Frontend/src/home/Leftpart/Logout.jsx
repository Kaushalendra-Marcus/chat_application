import React, { useState } from 'react';
import { HiOutlineLogout } from "react-icons/hi";
import axios from 'axios';
import Cookies from 'js-cookie';


const Logout = () => {
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    setLoading(true);
    try {
      // 1. Call server-side logout endpoint
      await axios.post('/api/user/logout');

      // 2. Clear client-side storage
      Cookies.remove('jwt', { path: '/' });
      localStorage.removeItem('messenger');

      // 3. Force full page reload
      window.location.href = '/login'; // This ensures complete state reset
      window.location.reload(); // Double protection

    } catch (error) {
      console.error('Logout failed:', error);
      toast.error('Logout failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className='text-2xl mr-8 hover:bg-gray-600 hover:rounded-4xl duration-100 hover:p-2 cursor-pointer'
      onClick={handleLogout}
      disabled={loading}
    >
      {loading ? '...' : <HiOutlineLogout
      className="text-lg hover:text-red-600 hover:cursor-pointer"/>}
    </div>
  );
};

export default Logout;