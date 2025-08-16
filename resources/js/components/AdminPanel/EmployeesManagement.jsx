import React from 'react';

const EmployeesManagement = ({ isArabic }) => {
    const content = {
        ar: {
            title: 'إدارة الموظفين',
            subtitle: 'إدارة فريق العمل وصلاحيات الوصول'
        },
        en: {
            title: 'Employees Management',
            subtitle: 'Manage team members and access permissions'
        }
    };

    const currentContent = content[isArabic ? 'ar' : 'en'];

    return (
        <div className="employees-management">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {currentContent.title}
            </h1>
            <p className="text-gray-600 mb-8">
                {currentContent.subtitle}
            </p>
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
                <p className="text-gray-500">صفحة إدارة الموظفين قيد التطوير...</p>
            </div>
        </div>
    );
};

export default EmployeesManagement;
