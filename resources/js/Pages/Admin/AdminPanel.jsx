import React from 'react';
import { Head } from '@inertiajs/react';
import AdminLayout from '../../Layouts/AdminLayout';

// هذا الملف لم يعد مطلوباً - تم نقل كل شيء إلى صفحات منفصلة
// يمكن حذف هذا الملف أو استخدامه كمرجع

const AdminPanel = () => {
    return (
        <AdminLayout title="لوحة الإدارة">
            <Head title="لوحة الإدارة" />

            <div className="text-center py-16">
                <div className="text-6xl mb-4">⚠️</div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    هذا الملف لم يعد مطلوباً
                </h2>
                <p className="text-gray-600 mb-6">
                    تم نقل جميع الصفحات إلى ملفات منفصلة مع Inertia.js
                </p>
                <div className="text-left bg-gray-100 p-4 rounded-lg inline-block">
                    <p className="text-sm text-gray-700">الصفحات الجديدة:</p>
                    <ul className="text-sm text-gray-600 mt-2 space-y-1">
                        <li>• /admin/dashboard → Dashboard.jsx</li>
                        <li>• /admin/customers → Customers.jsx</li>
                        <li>• /admin/analytics → Analytics.jsx</li>
                        <li>• /admin/plans → PlansManagement.jsx</li>
                        <li>• ... والمزيد</li>
                    </ul>
                </div>
            </div>
        </AdminLayout>
    );
};

export default AdminPanel;
