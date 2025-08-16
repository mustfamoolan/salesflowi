import React from 'react';

const Header = ({ isArabic, setIsArabic, sidebarCollapsed, setSidebarCollapsed }) => {
    const content = {
        ar: {
            search: 'البحث...',
            profile: 'الملف الشخصي',
            notifications: 'الإشعارات',
            logout: 'تسجيل الخروج',
            welcome: 'مرحباً، أحمد'
        },
        en: {
            search: 'Search...',
            profile: 'Profile',
            notifications: 'Notifications',
            logout: 'Logout',
            welcome: 'Welcome, Ahmed'
        }
    };

    const currentContent = content[isArabic ? 'ar' : 'en'];

    return (
        <header className="bg-white shadow-sm border-b border-gray-200 p-4">
            <div className="flex items-center justify-between">
                {/* Left Side - Search */}
                <div className="flex items-center space-x-4">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder={currentContent.search}
                            className="w-80 pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                        <svg className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>
                </div>

                {/* Right Side - User Actions */}
                <div className="flex items-center space-x-4">
                    {/* Language Toggle */}
                    <button
                        onClick={() => setIsArabic(!isArabic)}
                        className="px-3 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                    >
                        {isArabic ? 'EN' : 'عربي'}
                    </button>

                    {/* Notifications */}
                    <button className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5zm-8-9a3 3 0 106 0v5a3 3 0 01-6 0V8zM9 21h6" />
                        </svg>
                        <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-400"></span>
                    </button>

                    {/* User Profile */}
                    <div className="flex items-center space-x-3">
                        <div className="text-right">
                            <p className="text-sm font-medium text-gray-900">
                                {currentContent.welcome}
                            </p>
                            <p className="text-xs text-gray-500">مدير النظام</p>
                        </div>
                        <div className="relative">
                            <button className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 transition-colors">
                                <img
                                    className="w-8 h-8 rounded-full"
                                    src="https://ui-avatars.com/api/?name=Ahmed+Admin&background=3b82f6&color=white"
                                    alt="Profile"
                                />
                                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
