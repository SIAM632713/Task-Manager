import React from 'react';
import { useSelector } from 'react-redux';

const FullscreenLoader = () => {
    const loader = useSelector((state) => state.settings.loader); // 'hidden' or ''

    return (
        <div className={`${loader} fixed inset-0 z-50 bg-white bg-opacity-70 flex items-center justify-center`}>
            <div className="flex flex-col items-center space-y-4">
                {/* Modern Spinner with smooth animation */}
                <div className="w-20 h-20 border-8 border-t-transparent border-blue-500 rounded-full animate-spin"></div>
                {/* Custom Text Styling */}
                <p className="text-blue-600 font-medium text-lg opacity-80">Loading...</p>
                <p className="text-gray-500 text-sm opacity-70">Please wait while we prepare your data.</p>
            </div>
        </div>
    );
};

export default FullscreenLoader;
