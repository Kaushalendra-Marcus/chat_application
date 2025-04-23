import React, { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { FaTrashAlt, FaTimes, FaExclamationTriangle } from 'react-icons/fa';

const DeleteAccount = () => {
    const [showModal, setShowModal] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    const handleDeleteAccount = async () => {
        setIsDeleting(true);
        try {
            await axios.delete('/api/user/delete', {
                withCredentials: true,
            });
            Cookies.remove('jwt', { path: '/', domain: window.location.hostname });

            // Use either navigation method, not both
            window.location.href = '/login'; // This will do a hard redirect
            // OR use just navigate if you don't need full refresh:
            // navigate('/login', { replace: true });

        } catch (error) {
            console.error("Delete error:", error.response?.data?.message || error.message);
        } finally {
            setIsDeleting(false);
        }
    };

    return (
        <div className="flex justify-center items-center">
            <button
                onClick={() => setShowModal(true)}
                className='text-2xl mr-8 hover:bg-gray-600 hover:rounded-4xl duration-100 hover:p-2 cursor-pointer'

            >
                <FaTrashAlt className="text-sm hover:text-red-600 hover:cursor-pointer" />
            </button>

            {showModal && (
  <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
    <div className="bg-gray-900/80 border border-gray-700/50 p-6 rounded-xl shadow-2xl w-full max-w-lg mx-auto">
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-3">
          <FaExclamationTriangle className="text-yellow-500 text-xl" />
          <h2 className="text-lg font-semibold text-gray-100">Confirm Deletion</h2>
        </div>
        <button
          onClick={() => setShowModal(false)}
          className="text-gray-400 hover:text-gray-200 transition-colors text-lg"
        >
          <FaTimes />
        </button>
      </div>

      <p className="text-gray-300 mb-4 text-sm">
        This will permanently erase all your data. <span className="text-red-400">This action cannot be undone.</span>
      </p>

      <div className="flex flex-col gap-3">
        <button
          onClick={() => setShowModal(false)}
          className="px-3 py-1 rounded border border-gray-600 text-gray-300 hover:bg-gray-800/50 transition-colors text-sm"
        >
          Cancel
        </button>
        <button
          onClick={handleDeleteAccount}
          disabled={isDeleting}
          className="flex items-center justify-center gap-2 bg-red-900/80 hover:bg-red-800/90 text-red-100 px-3 py-1 rounded border border-red-800/50 transition-colors disabled:opacity-50 text-sm"
        >
          {isDeleting ? 'Deleting...' : (
            <>
              <FaTrashAlt />
              <span>Delete Permanently</span>
            </>
          )}
        </button>
      </div>
    </div>
  </div>
)}

        </div>
    );
};

export default DeleteAccount;