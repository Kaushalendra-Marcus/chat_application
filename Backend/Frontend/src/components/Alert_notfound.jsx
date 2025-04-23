import { useEffect } from 'react';
import { FaCheckCircle, FaTimesCircle, FaTimes } from 'react-icons/fa';


const Alert_notfound = ({ 
  message = "User not found", 
  type = "error", 
  onClose = () => {} 
}) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, 5000);
        return () => clearTimeout(timer);
    }, [onClose]);

    return (
        <div className=''>
            <div className={`fixed top-4 right-4 z-50 flex items-center justify-center p-4 rounded-lg shadow-lg border ${
                type === 'success'
                    ? 'bg-green-900/80 border-green-700'
                    : 'bg-red-900/80 border-red-700'
                }`}
            >
                <div className="mr-3">
                    {type === 'success' ? (
                        <FaCheckCircle className="text-green-400 text-xl" />
                    ) : (
                        <FaTimesCircle className="text-red-400 text-xl" />
                    )}
                </div>
                <span className="text-gray-100 flex-1">{message}</span>
                <button
                    onClick={onClose}
                    className="ml-4 text-gray-300 hover:text-white"
                >
                    <FaTimes />
                </button>
            </div>
        </div>
    );
};


export default Alert_notfound;