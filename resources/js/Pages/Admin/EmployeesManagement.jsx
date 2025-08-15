import React from 'react';
import { Head } from '@inertiajs/react';
import AdminLayout from '../../Layouts/AdminLayout';

const EmployeesManagement = ({ isArabic = true }) => {
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
        <AdminLayout title={currentContent.title}>
            <Head title={currentContent.title} />

            <div className="employees-management">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                        {currentContent.title}
                    </h1>
                    <p className="text-gray-600">
                        {currentContent.subtitle}
                    </p>
                </div>

                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
                    <div className="text-6xl mb-4">👨‍💼</div>
                    <p className="text-gray-500 text-lg">صفحة إدارة الموظفين قيد التطوير...</p>
                    <p className="text-gray-400 text-sm mt-2">إدارة الفرق والصلاحيات قريباً</p>
                </div>
            </div>
        </AdminLayout>
    );
};

export default EmployeesManagement;
