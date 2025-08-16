import React from 'react';

const FinancialReports = ({ isArabic }) => {
    const content = {
        ar: {
            title: 'التقارير المالية',
            subtitle: 'تقارير الإيرادات والمدفوعات'
        },
        en: {
            title: 'Financial Reports',
            subtitle: 'Revenue and payment reports'
        }
    };

    const currentContent = content[isArabic ? 'ar' : 'en'];

    return (
        <div className="financial-reports">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {currentContent.title}
            </h1>
            <p className="text-gray-600 mb-8">
                {currentContent.subtitle}
            </p>
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
                <p className="text-gray-500">صفحة التقارير المالية قيد التطوير...</p>
            </div>
        </div>
    );
};

export default FinancialReports;
