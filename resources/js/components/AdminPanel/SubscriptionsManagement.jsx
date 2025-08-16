import React from 'react';

const SubscriptionsManagement = ({ isArabic }) => {
    const content = {
        ar: {
            title: 'إدارة الاشتراكات',
            subtitle: 'متابعة وإدارة اشتراكات العملاء'
        },
        en: {
            title: 'Subscriptions Management',
            subtitle: 'Monitor and manage customer subscriptions'
        }
    };

    const currentContent = content[isArabic ? 'ar' : 'en'];

    return (
        <div className="subscriptions-management">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {currentContent.title}
            </h1>
            <p className="text-gray-600 mb-8">
                {currentContent.subtitle}
            </p>
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
                <p className="text-gray-500">صفحة إدارة الاشتراكات قيد التطوير...</p>
            </div>
        </div>
    );
};

export default SubscriptionsManagement;
