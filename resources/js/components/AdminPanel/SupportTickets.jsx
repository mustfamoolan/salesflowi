import React from 'react';

const SupportTickets = ({ isArabic }) => {
    const content = {
        ar: {
            title: 'تذاكر الدعم الفني',
            subtitle: 'إدارة طلبات الدعم من العملاء'
        },
        en: {
            title: 'Support Tickets',
            subtitle: 'Manage customer support requests'
        }
    };

    const currentContent = content[isArabic ? 'ar' : 'en'];

    return (
        <div className="support-tickets">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {currentContent.title}
            </h1>
            <p className="text-gray-600 mb-8">
                {currentContent.subtitle}
            </p>
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
                <p className="text-gray-500">صفحة تذاكر الدعم قيد التطوير...</p>
            </div>
        </div>
    );
};

export default SupportTickets;
