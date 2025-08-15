import React, { useState } from 'react';
import { Head, useForm, usePage } from '@inertiajs/react';
import AdminLayout from '../../Layouts/AdminLayout';

const AdminCustomers = ({ customers: initialCustomers = [] }) => {
    const { flash } = usePage().props;
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('all');

    const filteredCustomers = initialCustomers.filter(customer => {
        const matchesSearch = customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            customer.business_name?.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesFilter = filterStatus === 'all' ||
                            (filterStatus === 'active' && customer.status === 'active') ||
                            (filterStatus === 'inactive' && customer.status === 'inactive') ||
                            (filterStatus === 'suspended' && customer.status === 'suspended');

        return matchesSearch && matchesFilter;
    });

    const handleStatusChange = (customerId, newStatus) => {
        // سيتم إضافة المنطق لاحقاً
        console.log(`Changing customer ${customerId} status to ${newStatus}`);
    };

    const getStatusBadge = (status) => {
        const statusColors = {
            active: 'bg-green-100 text-green-800',
            inactive: 'bg-gray-100 text-gray-800',
            suspended: 'bg-red-100 text-red-800'
        };

        const statusTexts = {
            active: 'نشط',
            inactive: 'غير نشط',
            suspended: 'موقوف'
        };

        return (
            <span className={`px-2 py-1 text-xs font-medium rounded-full ${statusColors[status] || statusColors.inactive}`}>
                {statusTexts[status] || 'غير محدد'}
            </span>
        );
    };

    return (
        <AdminLayout title="إدارة العملاء">
            <Head title="إدارة العملاء" />

            <div className="space-y-6">
                {/* Flash Messages */}
                {flash.message && (
                    <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative">
                        {flash.message}
                    </div>
                )}

                {/* Header with Stats */}
                <div className="bg-white p-6 rounded-lg shadow">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">إدارة العملاء</h1>
                            <p className="text-gray-600">عرض وإدارة جميع عملاء النظام</p>
                        </div>
                        <div className="text-sm text-gray-500">
                            إجمالي العملاء: {initialCustomers.length}
                        </div>
                    </div>

                    {/* Stats Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div className="p-4 bg-green-50 rounded-lg">
                            <div className="text-2xl font-bold text-green-600">
                                {initialCustomers.filter(c => c.status === 'active').length}
                            </div>
                            <div className="text-sm text-green-600">عملاء نشطين</div>
                        </div>
                        <div className="p-4 bg-gray-50 rounded-lg">
                            <div className="text-2xl font-bold text-gray-600">
                                {initialCustomers.filter(c => c.status === 'inactive').length}
                            </div>
                            <div className="text-sm text-gray-600">غير نشطين</div>
                        </div>
                        <div className="p-4 bg-red-50 rounded-lg">
                            <div className="text-2xl font-bold text-red-600">
                                {initialCustomers.filter(c => c.status === 'suspended').length}
                            </div>
                            <div className="text-sm text-red-600">موقوفين</div>
                        </div>
                        <div className="p-4 bg-blue-50 rounded-lg">
                            <div className="text-2xl font-bold text-blue-600">
                                {initialCustomers.filter(c => {
                                    const created = new Date(c.created_at);
                                    const now = new Date();
                                    const diffTime = Math.abs(now - created);
                                    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                                    return diffDays <= 7;
                                }).length}
                            </div>
                            <div className="text-sm text-blue-600">جدد هذا الأسبوع</div>
                        </div>
                    </div>
                </div>

                {/* Filters */}
                <div className="bg-white p-4 rounded-lg shadow">
                    <div className="flex flex-col sm:flex-row gap-4">
                        <div className="flex-1">
                            <input
                                type="text"
                                placeholder="البحث عن عميل..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                            />
                        </div>
                        <div>
                            <select
                                value={filterStatus}
                                onChange={(e) => setFilterStatus(e.target.value)}
                                className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                            >
                                <option value="all">جميع الحالات</option>
                                <option value="active">نشط</option>
                                <option value="inactive">غير نشط</option>
                                <option value="suspended">موقوف</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Customers Table */}
                <div className="bg-white rounded-lg shadow overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        معلومات العميل
                                    </th>
                                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        معلومات التواصل
                                    </th>
                                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        الاشتراك
                                    </th>
                                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        الحالة
                                    </th>
                                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        تاريخ التسجيل
                                    </th>
                                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        الإجراءات
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {filteredCustomers.map((customer) => (
                                    <tr key={customer.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <div className="flex-shrink-0 h-10 w-10">
                                                    <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center">
                                                        <span className="text-sm font-medium text-gray-700">
                                                            {customer.name.charAt(0)}
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="mr-4">
                                                    <div className="text-sm font-medium text-gray-900">
                                                        {customer.name}
                                                    </div>
                                                    <div className="text-sm text-gray-500">
                                                        {customer.business_name || 'لا يوجد'}
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-900">{customer.email}</div>
                                            <div className="text-sm text-gray-500">{customer.phone || 'لا يوجد'}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-900">
                                                {customer.subscription_plan || 'مجاني'}
                                            </div>
                                            <div className="text-sm text-gray-500">
                                                {customer.subscription_status === 'active' ? 'نشط' : 'غير نشط'}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {getStatusBadge(customer.status)}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {new Date(customer.created_at).toLocaleDateString('ar-EG')}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                            <div className="flex space-x-2">
                                                <button
                                                    className="text-indigo-600 hover:text-indigo-900"
                                                    title="عرض التفاصيل"
                                                >
                                                    👁️
                                                </button>
                                                <button
                                                    className="text-green-600 hover:text-green-900"
                                                    title="تنشيط"
                                                    onClick={() => handleStatusChange(customer.id, 'active')}
                                                >
                                                    ✅
                                                </button>
                                                <button
                                                    className="text-red-600 hover:text-red-900"
                                                    title="إيقاف"
                                                    onClick={() => handleStatusChange(customer.id, 'suspended')}
                                                >
                                                    ❌
                                                </button>
                                                <button
                                                    className="text-gray-600 hover:text-gray-900"
                                                    title="تعديل"
                                                >
                                                    ✏️
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {filteredCustomers.length === 0 && (
                        <div className="text-center py-8 text-gray-500">
                            لا توجد عملاء مطابقين للبحث
                        </div>
                    )}
                </div>

                {/* Pagination (سيتم إضافتها لاحقاً) */}
                <div className="bg-white px-6 py-3 rounded-lg shadow">
                    <div className="flex items-center justify-between">
                        <div className="text-sm text-gray-500">
                            عرض {filteredCustomers.length} من {initialCustomers.length} عميل
                        </div>
                        <div className="flex space-x-2">
                            <button className="px-3 py-1 text-sm bg-gray-100 text-gray-600 rounded hover:bg-gray-200">
                                السابق
                            </button>
                            <button className="px-3 py-1 text-sm bg-purple-600 text-white rounded hover:bg-purple-700">
                                1
                            </button>
                            <button className="px-3 py-1 text-sm bg-gray-100 text-gray-600 rounded hover:bg-gray-200">
                                التالي
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
};

export default AdminCustomers;
