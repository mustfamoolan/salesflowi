import React from 'react';

const SystemLogs = ({ isArabic }) => {
    const content = {
        ar: {
            title: 'سجلات النظام',
            subtitle: 'متابعة أنشطة النظام والأمان'
        },
        en: {
            title: 'System Logs',
            subtitle: 'Monitor system activities and security'
        }
    };

    const currentContent = content[isArabic ? 'ar' : 'en'];

    return (
        <div className="system-logs">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {currentContent.title}
            </h1>
            <p className="text-gray-600 mb-8">
                {currentContent.subtitle}
            </p>
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
                <p className="text-gray-500">صفحة سجلات النظام قيد التطوير...</p>
            </div>
        </div>
    );
};

export default SystemLogs;
