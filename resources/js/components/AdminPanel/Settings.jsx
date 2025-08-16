import React from 'react';

const Settings = ({ isArabic }) => {
    const content = {
        ar: {
            title: 'الإعدادات',
            subtitle: 'إعدادات النظام والتخصيص'
        },
        en: {
            title: 'Settings',
            subtitle: 'System settings and customization'
        }
    };

    const currentContent = content[isArabic ? 'ar' : 'en'];

    return (
        <div className="settings">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {currentContent.title}
            </h1>
            <p className="text-gray-600 mb-8">
                {currentContent.subtitle}
            </p>
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
                <p className="text-gray-500">صفحة الإعدادات قيد التطوير...</p>
            </div>
        </div>
    );
};

export default Settings;
