import React from 'react';

const Analytics = ({ isArabic }) => {
    const content = {
        ar: {
            title: 'الإحصائيات والتحليلات',
            subtitle: 'تحليلات مفصلة لأداء المشروع'
        },
        en: {
            title: 'Analytics & Reports',
            subtitle: 'Detailed analytics and performance reports'
        }
    };

    const currentContent = content[isArabic ? 'ar' : 'en'];

    return (
        <div className="analytics">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {currentContent.title}
            </h1>
            <p className="text-gray-600 mb-8">
                {currentContent.subtitle}
            </p>
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
                <p className="text-gray-500">صفحة الإحصائيات قيد التطوير...</p>
            </div>
        </div>
    );
};

export default Analytics;
