import { FaUserSecret, FaLock, FaEnvelope, FaUser, FaEye, FaEyeSlash } from 'react-icons/fa';
import { useForm } from 'react-hook-form'
import { useState } from 'react';
import Alert from './Alert';
import axios from 'axios'
import { useAuth } from '../context/AuthProvider';
import { NavLink } from 'react-router-dom';
const Login = () => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const { authUser, setAuthUser } = useAuth()
    const [alert, setAlert] = useState({ show: false, message: '', type: '' });
    const onSubmit = (data) => {
        const userInfo = {
            identifier: data.identifier,
            password: data.password,
        };

        axios.post("/api/user/signin", userInfo, {
            withCredentials: true
        })
            .then((response) => {
                setAlert({
                    show: true,
                    message: 'Identity verified successfully!',
                    type: 'success'
                });
                localStorage.setItem("ChatApp", JSON.stringify(response.data))
                setAuthUser(response.data)
            })
            .catch((error) => {
                setAlert({
                    show: true,
                    message: error.response?.data?.message || 'Failed to login identity',
                    type: 'error'
                });
            });
    };
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    return (
        <div className="min-h-screen bg-gray-900 text-gray-100 flex items-center justify-center p-4">
            <div className="w-full max-w-md bg-gray-800 rounded-xl shadow-2xl overflow-hidden border border-purple-500/20">
                {/* Header */}
                <div className="bg-gradient-to-r from-purple-900 to-blue-900 p-6 text-center">
                    <div className="flex justify-center mb-4">
                        <FaUserSecret className="text-4xl text-purple-300" />
                    </div>
                    <h1 className="text-2xl font-bold tracking-tight">Welcome Back</h1>
                    <p className="text-purple-200 mt-2">Access your anonymous identity</p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="p-6 space-y-6">
                        {/* Email/Username */}
                        <div className="space-y-2">
                            <label className="flex items-center text-sm font-medium">
                                <FaEnvelope className="mr-2 text-purple-400" />
                                Email or Username
                            </label>
                            <input
                                type="text"
                                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 pl-10 focus:outline-none focus:ring-2 focus:ring-purple-500"
                                placeholder="you@ghost.com or your_secret_name"
                                {...register("identifier", { required: true })}
                            />
                            {errors.identifier && (
                                <p className="text-red-400 text-sm mt-1">Email or Username is required</p>
                            )}
                        </div>

                        {/* Password */}
                        <div className="space-y-2">
                            <label className="flex items-center text-sm font-medium">
                                <FaLock className="mr-2 text-purple-400" />
                                Password
                            </label>
                            <div className="relative">
                                <input
                                    type={showConfirmPassword ? "text" : "password"}
                                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 pl-10 pr-10 focus:outline-none focus:ring-2 focus:ring-purple-500"
                                    placeholder="••••••••"
                                    {...register("password", { required: true })}
                                />
                                {errors.password && <span>Password is incorrect </span>}
                                <button
                                    type="button"
                                    className="absolute right-3 top-3 text-gray-400 hover:text-purple-400"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                >
                                    {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                                </button>
                            </div>
                        </div>

                        {/* Remember Me & Forgot Password */}
                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-600 rounded bg-gray-700"
                                />
                                <label className="ml-2 block text-sm text-gray-300">
                                    Remember me
                                </label>
                            </div>

                        </div>

                        {/* Submit Button */}
                        <button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold py-3 px-4 rounded-lg shadow-lg hover:opacity-90 transition cursor-pointer">
                            Unlock Identity
                        </button>
                        {alert.show && (
                            <Alert
                                message={alert.message}
                                type={alert.type}
                                onClose={() => setAlert({ ...alert, show: false })}
                            />
                        )}
                    </div>
                </form>
                {/* Sign Up Link */}
                <NavLink to='/signup'>
                    <div className="text-center text-sm text-gray-400 mb-3">
                        New to anonymity?{' '}
                        <button className="text-purple-400 hover:text-purple-300 font-medium cursor-pointer">
                            Create Account
                        </button>
                    </div>
                </NavLink>

                {/* Footer */}
                <div className="bg-gray-900/50 p-4 text-center text-xs text-gray-500">
                    <p>Your session is encrypted. No logs. No traces.</p>
                </div>
            </div>
        </div>
    );
};

export default Login;