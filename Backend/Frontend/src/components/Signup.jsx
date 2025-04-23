import { FaUserSecret, FaLock, FaEnvelope, FaUser, FaEye, FaEyeSlash } from 'react-icons/fa';
import { useForm } from 'react-hook-form';
import Alert from './Alert';
import { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthProvider';
import { NavLink } from 'react-router-dom';

const Signup = () => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [alert, setAlert] = useState({ show: false, message: '', type: '' });
  const password = watch("password", "");
  const { authUser, setAuthUser } = useAuth()

  const validatePasswordMatch = (value) => {
    return value === password || "Confirm Password do not match";
  };

  const onSubmit = async (data) => {
    const userInfo = {
      username: data.username,
      email: data.email,
      password: data.password,
      confirmPassword: data.confirmPassword
    };

    await axios.post("/api/user/signup", userInfo)
      .then((response) => {
        setAlert({
          show: true,
          message: 'Identity created successfully!',
          type: 'success'
        });
        localStorage.setItem("ChatApp", JSON.stringify(response.data))
        setAuthUser(response.data)

      })
      .catch((error) => {
        setAlert({
          show: true,
          message: error.response?.data?.message || 'Failed to create identity',
          type: 'error'
        });
      });
  };
  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-gray-800 rounded-xl shadow-2xl overflow-hidden border border-purple-500/20">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-900 to-blue-900 p-6 text-center">
          <div className="flex justify-center mb-4">
            <FaUserSecret className="text-4xl text-purple-300" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight">Join the Network</h1>
          <p className="text-purple-200 mt-2">Create your anonymous identity</p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit(onSubmit)}>
          <div className="p-6 space-y-6">
            {/* Username */}
            <div className="space-y-2">
              <label className="flex items-center text-sm font-medium">
                <FaUser className="mr-2 text-purple-400" />
                Username
              </label>
              <div className="relative">
                <input
                  type="text"
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 pl-10 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="your_secret_name"
                  {...register("username", {
                    required: "Username is required",
                    minLength: {
                      value: 3,
                      message: "Username must be at least 3 characters"
                    }
                  })}
                />
                {errors.username && <span>This field is required</span>}
                <span className="absolute left-3 top-3 text-gray-400">@</span>
              </div>
            </div>

            {/* Email */}
            <div className="space-y-2">
              <label className="flex items-center text-sm font-medium">
                <FaEnvelope className="mr-2 text-purple-400" />
                Email
              </label>
              <input
                type="email"
                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 pl-10 focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="you@ghost.com"
                {...register("email", { required: true })}
              />
              {errors.email && <span>This field is required</span>}
            </div>

            {/* Password */}
            <div className="space-y-2">
              <label className="flex items-center text-sm font-medium">
                <FaLock className="mr-2 text-purple-400" />
                Password
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "type" : "password"}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 pl-10 pr-10 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="••••••••"
                  {...register("password", { required: true })}
                />
                {errors.password && <span>This field is required</span>}
                <button
                  type="button"
                  className="absolute right-3 top-3 text-gray-400 hover:text-purple-400"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div className="space-y-2">
              <label className="flex items-center text-sm font-medium">
                <FaLock className="mr-2 text-purple-400" />
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type="password"
                  className={`w-full bg-gray-700 border rounded-lg px-4 py-3 pl-10 pr-10 focus:outline-none focus:ring-2 ${errors.confirmPassword
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-600 focus:ring-purple-500"
                    }`}
                  placeholder="••••••••"
                  {...register("confirmPassword", {
                    required: "Please confirm your password",
                    validate: validatePasswordMatch
                  })}
                />

              </div>
              {errors.confirmPassword && (
                <p className="text-red-400 text-xs mt-1 flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 mr-1"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold py-3 px-4 rounded-lg shadow-lg hover:opacity-90 transition cursor-pointer">
              Create Anonymous Identity
            </button>


          </div>
          {alert.show && (
            <Alert
              message={alert.message}
              type={alert.type}
              onClose={() => setAlert({ ...alert, show: false })}
            />
          )}
        </form>
        {/* Login Link */}
        <NavLink to='/login' end>
          <div className="text-center text-sm text-gray-400 mb-3">
            Already have an account?{' '}
            <button className="text-purple-400 hover:text-purple-300 font-medium cursor-pointer">
              Sign In
            </button>
          </div>
        </NavLink>

        {/* Footer */}
        <div className="bg-gray-900/50 p-4 text-center text-xs text-gray-500">
          <p>Your identity is encrypted. No logs. No traces.</p>
        </div>
      </div>
    </div>


  );
};

export default Signup;