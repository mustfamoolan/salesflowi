import React from 'react';

const BackButton = ({ className = '' }) => {
    const handleBack = () => {
        // إذا كان هناك تاريخ في المتصفح، ارجع للصفحة السابقة
        if (window.history.length > 1) {
            window.history.back();
        } else {
            // إذا لم يكن هناك تاريخ، اذهب للصفحة الرئيسية
            window.location.href = '/';
        }
    };

    return (
        <button
            onClick={handleBack}
            className={`fixed top-4 left-4 z-40 bg-white hover:bg-gray-50 border border-gray-200 text-gray-600 hover:text-gray-800 p-2 rounded-full shadow-md hover:shadow-lg transition-all duration-200 ${className}`}
            title="العودة للصفحة السابقة"
        >
            <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
            </svg>
        </button>
    );
};

export default BackButton;
