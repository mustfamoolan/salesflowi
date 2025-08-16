import React, { useState } from 'react';

const CustomersManagement = ({ isArabic }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('all');

    const content = {
        ar: {
            title: 'إدارة العملاء',
            subtitle: 'إدارة جميع عملاء المشروع SaaS',
            addCustomer: 'إضافة عميل جديد',
            search: 'البحث عن عميل...',
            filters: {
                all: 'الكل',
                active: 'نشط',
                inactive: 'غير نشط',
                trial: 'تجريبي'
            },
            table: {
                name: 'الاسم',
                email: 'البريد الإلكتروني',
                plan: 'الباقة',
                status: 'الحالة',
                joinDate: 'تاريخ الانضمام',
                actions: 'الإجراءات'
            },
            actions: {
                view: 'عرض',
                edit: 'تعديل',
                delete: 'حذف',
                suspend: 'تعليق'
            }
        },
        en: {
            title: 'Customer Management',
            subtitle: 'Manage all SaaS project customers',
            addCustomer: 'Add New Customer',
            search: 'Search customers...',
            filters: {
                all: 'All',
                active: 'Active',
                inactive: 'Inactive',
                trial: 'Trial'
            },
            table: {
                name: 'Name',
                email: 'Email',
                plan: 'Plan',
                status: 'Status',
                joinDate: 'Join Date',
                actions: 'Actions'
            },
            actions: {
                view: 'View',
                edit: 'Edit',
                delete: 'Delete',
                suspend: 'Suspend'
            }
        }
    };

    const currentContent = content[isArabic ? 'ar' : 'en'];

    // Sample customer data
    const customers = [
        {
            id: 1,
            name: 'أحمد محمد العلي',
            email: 'ahmed@example.com',
            plan: 'متقدمة',
            status: 'نشط',
            joinDate: '2024-01-15',
            avatar: 'https://ui-avatars.com/api/?name=Ahmed+Ali&background=3b82f6&color=white'
        },
        {
            id: 2,
            name: 'فاطمة حسين',
            email: 'fatima@example.com',
            plan: 'أساسية',
            status: 'نشط',
            joinDate: '2024-02-20',
            avatar: 'https://ui-avatars.com/api/?name=Fatima+Hussein&background=10b981&color=white'
        },
        {
            id: 3,
            name: 'محمد كريم',
            email: 'mohammed@example.com',
            plan: 'احترافية',
            status: 'تجريبي',
            joinDate: '2024-03-10',
            avatar: 'https://ui-avatars.com/api/?name=Mohammed+Kareem&background=f59e0b&color=white'
        }
    ];

    const getStatusColor = (status) => {
        switch (status) {
            case 'نشط':
                return 'bg-green-100 text-green-800';
            case 'غير نشط':
                return 'bg-red-100 text-red-800';
            case 'تجريبي':
                return 'bg-yellow-100 text-yellow-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <div className="customers-management">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                        {currentContent.title}
                    </h1>
                    <p className="text-gray-600">
                        {currentContent.subtitle}
                    </p>
                </div>
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors">
                    + {currentContent.addCustomer}
                </button>
            </div>

            {/* Filters and Search */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
                    {/* Search */}
                    <div className="relative flex-1 max-w-md">
                        <input
                            type="text"
                            placeholder={currentContent.search}
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                        <svg className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>

                    {/* Status Filter */}
                    <div className="flex space-x-2">
                        {Object.entries(currentContent.filters).map(([key, label]) => (
                            <button
                                key={key}
                                onClick={() => setFilterStatus(key)}
                                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                                    filterStatus === key
                                        ? 'bg-blue-100 text-blue-700 border border-blue-200'
                                        : 'text-gray-600 hover:bg-gray-100'
                                }`}
                            >
                                {label}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Customers Table */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    {currentContent.table.name}
                                </th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    {currentContent.table.email}
                                </th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    {currentContent.table.plan}
                                </th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    {currentContent.table.status}
                                </th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    {currentContent.table.joinDate}
                                </th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    {currentContent.table.actions}
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {customers.map((customer) => (
                                <tr key={customer.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <img className="h-10 w-10 rounded-full" src={customer.avatar} alt="" />
                                            <div className="mr-4">
                                                <div className="text-sm font-medium text-gray-900">
                                                    {customer.name}
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        {customer.email}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        {customer.plan}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(customer.status)}`}>
                                            {customer.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        {customer.joinDate}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        <div className="flex space-x-2">
                                            <button className="text-blue-600 hover:text-blue-900 transition-colors">
                                                {currentContent.actions.view}
                                            </button>
                                            <button className="text-green-600 hover:text-green-900 transition-colors">
                                                {currentContent.actions.edit}
                                            </button>
                                            <button className="text-red-600 hover:text-red-900 transition-colors">
                                                {currentContent.actions.delete}
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default CustomersManagement;
