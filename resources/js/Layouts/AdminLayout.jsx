import React, { useState } from 'react';
import { Head, Link, usePage } from '@inertiajs/react';

export default function AdminLayout({ title, children }) {
    const { url } = usePage();
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
    const [isArabic, setIsArabic] = useState(true);

    const navigation = [
        { name: 'لوحة الرئيسية', href: '/admin/dashboard', icon: '🏠', id: 'dashboard' },
        { name: 'إدارة العملاء', href: '/admin/customers', icon: '👥', id: 'customers' },
        { name: 'الاشتراكات', href: '/admin/subscriptions', icon: '�', id: 'subscriptions' },
        { name: 'باقات الاشتراك', href: '/admin/plans', icon: '📋', id: 'plans' },
        { name: 'الموظفين', href: '/admin/employees', icon: '�‍💼', id: 'employees' },
        { name: 'الإحصائيات', href: '/admin/analytics', icon: '�', id: 'analytics' },
        { name: 'التقارير المالية', href: '/admin/financial-reports', icon: '💰', id: 'financial-reports' },
        { name: 'تذاكر الدعم', href: '/admin/support-tickets', icon: '🎫', id: 'support-tickets' },
        { name: 'الإشعارات', href: '/admin/notifications', icon: '�', id: 'notifications' },
        { name: 'سجلات النظام', href: '/admin/system-logs', icon: '�', id: 'system-logs' },
        { name: 'الإعدادات', href: '/admin/settings', icon: '⚙️', id: 'settings' },
    ];

    return (
        <div className={`admin-panel min-h-screen bg-gray-50 ${isArabic ? 'rtl' : 'ltr'}`} dir={isArabic ? 'rtl' : 'ltr'}>
            <Head title={title} />

            {/* Sidebar */}
            <div className={`fixed top-0 ${isArabic ? 'right-0' : 'left-0'} h-full bg-white shadow-xl border-${isArabic ? 'l' : 'r'} border-gray-200 transition-all duration-300 z-40 ${
                sidebarCollapsed ? 'w-16' : 'w-64'
            }`}>
                {/* Logo */}
                <div className="flex items-center justify-center h-16 bg-gradient-to-r from-purple-600 to-indigo-600">
                    <Link href="/admin/dashboard" className="text-white font-bold text-xl">
                        {sidebarCollapsed ? 'SF' : 'SalesFlow Admin'}
                    </Link>
                </div>

                {/* Navigation */}
                <nav className="mt-8 px-4">
                    {navigation.map((item) => (
                        <Link
                            key={item.id}
                            href={item.href}
                            className={`group flex items-center px-4 py-3 mb-2 text-sm font-medium rounded-lg transition-colors duration-200 ${
                                url.startsWith(item.href)
                                    ? 'bg-purple-100 text-purple-700 border-r-4 border-purple-600'
                                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                            }`}
                        >
                            <span className="text-lg">{item.icon}</span>
                            {!sidebarCollapsed && (
                                <span className={`${isArabic ? 'mr-3' : 'ml-3'}`}>{item.name}</span>
                            )}
                        </Link>
                    ))}
                </nav>

                {/* Collapse Button */}
                <button
                    onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                    className={`absolute top-20 ${isArabic ? 'left-0' : 'right-0'} transform ${isArabic ? 'translate-x-full' : '-translate-x-full'} bg-white border border-gray-300 rounded-${isArabic ? 'r' : 'l'}-md p-1 shadow-md hover:bg-gray-50`}
                >
                    <svg className={`w-4 h-4 transform ${sidebarCollapsed ? (isArabic ? 'rotate-180' : '') : (isArabic ? '' : 'rotate-180')}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                </button>
            </div>

            {/* Main Content */}
            <div className={`transition-all duration-300 ${
                sidebarCollapsed
                    ? (isArabic ? 'mr-16' : 'ml-16')
                    : (isArabic ? 'mr-64' : 'ml-64')
            }`}>
                {/* Header */}
                <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
                        </div>

                        <div className="flex items-center space-x-4">
                            {/* Language Toggle */}
                            <button
                                onClick={() => setIsArabic(!isArabic)}
                                className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors duration-200"
                            >
                                {isArabic ? 'EN' : 'ع'}
                            </button>

                            {/* User Menu */}
                            <div className="flex items-center space-x-3">
                                <div className="text-right">
                                    <p className="text-sm font-medium text-gray-900">مرحباً، أحمد</p>
                                    <p className="text-xs text-gray-500">مدير النظام</p>
                                </div>
                                <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center">
                                    <span className="text-white text-sm font-medium">أ</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Page Content */}
                <main className="p-6">
                    {children}
                </main>
            </div>
        </div>
    );
}
