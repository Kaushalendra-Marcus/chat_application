import React from 'react';

const LoginLoading = () => {
    return (
        <div className="max-w-sm mx-auto p-6 space-y-6 animate-pulse">
            {/* Header */}
            <div className="space-y-3 text-center">
                <div className="h-8 bg-gray-200 rounded-full w-3/5 mx-auto"></div>
                <div className="h-4 bg-gray-200 rounded-full w-4/5 mx-auto"></div>
            </div>

            {/* Form skeleton */}
            <div className="space-y-5">
                {/* Email/Username field */}
                <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                        <div className="h-5 w-5 bg-gray-200 rounded"></div>
                        <div className="h-4 bg-gray-200 rounded-full w-1/3"></div>
                    </div>
                    <div className="h-10 bg-gray-200 rounded-lg"></div>
                </div>

                {/* Password field */}
                <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                        <div className="h-5 w-5 bg-gray-200 rounded"></div>
                        <div className="h-4 bg-gray-200 rounded-full w-1/4"></div>
                    </div>
                    <div className="h-10 bg-gray-200 rounded-lg relative">
                        <div className="absolute right-3 top-3 h-4 w-4 bg-gray-300 rounded-full"></div>
                    </div>
                </div>

                {/* Remember me checkbox */}
                <div className="flex items-center space-x-2">
                    <div className="h-5 w-5 bg-gray-200 rounded"></div>
                    <div className="h-4 bg-gray-200 rounded-full w-24"></div>
                </div>

                {/* Login button */}
                <div className="h-12 bg-gray-300 rounded-lg"></div>

                {/* Create account link */}
                <div className="text-center">
                    <div className="h-4 bg-gray-200 rounded-full w-3/4 mx-auto"></div>
                </div>
            </div>

            {/* Footer note */}
            <div className="text-center">
                <div className="h-3 bg-gray-200 rounded-full w-full"></div>
                <div className="h-3 bg-gray-200 rounded-full w-4/5 mx-auto mt-2"></div>
            </div>
        </div>
    );
};

export default LoginLoading;