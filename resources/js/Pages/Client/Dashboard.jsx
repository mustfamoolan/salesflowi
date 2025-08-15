import React, { useState } from 'react';

const Dashboard = () => {
    const [isArabic, setIsArabic] = useState(true);
    const [showNotifications, setShowNotifications] = useState(false);

    // Mock data for dashboard
    const dashboardData = {
        sales: {
            today: 2500000,
            month: 45000000,
            growth: 12.5
        },
        debts: {
            total: 15000000,
            overdue: 3500000,
            count: 25
        },
        expenses: {
            month: 12000000,
            growth: -5.2
        },
        customers: {
            total: 156,
            new: 8,
            active: 134
        },
        installments: {
            dueToday: 5,
            amount: 850000,
            overdue: 2
        },
        inventory: {
            lowStock: 12,
            outOfStock: 3,
            total: 245
        }
    };

    const notifications = [
        {
            id: 1,
            type: 'debt',
            title: 'دين مستحق',
            message: 'أحمد محمد العلي - مبلغ 500,000 د.ع مستحق منذ 3 أيام',
            time: '10:30 ص',
            priority: 'high'
        },
        {
            id: 2,
            type: 'installment',
            title: 'قسط مستحق اليوم',
            message: 'فاطمة حسن الكريم - قسط بقيمة 250,000 د.ع',
            time: '09:15 ص',
            priority: 'medium'
        },
        {
            id: 3,
            type: 'stock',
            title: 'مخزون منخفض',
            message: 'هاتف آيفون 15 برو - متبقي قطعة واحدة فقط',
            time: '08:45 ص',
            priority: 'low'
        },
        {
            id: 4,
            type: 'subscription',
            title: 'انتهاء الاشتراك قريباً',
            message: 'ينتهي اشتراكك في الخطة المتقدمة خلال 5 أيام',
            time: '07:30 ص',
            priority: 'high'
        }
    ];

    const quickActions = [
        {
            title: 'فاتورة جديدة',
            icon: '🧾',
            color: 'bg-blue-500',
            action: () => window.location.href = '/pos'
        },
        {
            title: 'عميل جديد',
            icon: '👤',
            color: 'bg-green-500',
            action: () => window.location.href = '/customers'
        },
        {
            title: 'منتج جديد',
            icon: '📦',
            color: 'bg-purple-500',
            action: () => window.location.href = '/products'
        },
        {
            title: 'تقرير المبيعات',
            icon: '📊',
            color: 'bg-orange-500',
            action: () => window.location.href = '/reports'
        }
    ];

    const content = {
        ar: {
            title: 'لوحة التحكم',
            subtitle: 'نظرة عامة على أعمالك',
            todaySales: 'مبيعات اليوم',
            monthSales: 'مبيعات الشهر',
            totalDebts: 'إجمالي الديون',
            overdueDebts: 'ديون متأخرة',
            monthExpenses: 'مصروفات الشهر',
            totalCustomers: 'إجمالي العملاء',
            newCustomers: 'عملاء جدد',
            dueToday: 'أقساط اليوم',
            installmentAmount: 'مبلغ الأقساط',
            lowStock: 'مخزون منخفض',
            outOfStock: 'نفذ المخزون',
            notifications: 'الإشعارات',
            quickActions: 'إجراءات سريعة',
            viewAll: 'عرض الكل',
            growth: 'نمو',
            currency: 'د.ع',
            seeDetails: 'عرض التفاصيل',
            navigation: {
                title: 'التنقل بين الصفحات',
                customers: 'العملاء',
                debts: 'الديون',
                installments: 'الأقساط',
                products: 'المنتجات',
                invoices: 'الفواتير',
                expenses: 'المصروفات',
                reports: 'التقارير',
                pos: 'نقطة البيع'
            }
        },
        en: {
            title: 'Dashboard',
            subtitle: 'Overview of your business',
            todaySales: 'Today Sales',
            monthSales: 'Month Sales',
            totalDebts: 'Total Debts',
            overdueDebts: 'Overdue Debts',
            monthExpenses: 'Month Expenses',
            totalCustomers: 'Total Customers',
            newCustomers: 'New Customers',
            dueToday: 'Due Today',
            installmentAmount: 'Installment Amount',
            lowStock: 'Low Stock',
            outOfStock: 'Out of Stock',
            notifications: 'Notifications',
            quickActions: 'Quick Actions',
            viewAll: 'View All',
            growth: 'Growth',
            currency: 'IQD',
            seeDetails: 'See Details',
            navigation: {
                title: 'Navigation',
                customers: 'Customers',
                debts: 'Debts',
                installments: 'Installments',
                products: 'Products',
                invoices: 'Invoices',
                expenses: 'Expenses',
                reports: 'Reports',
                pos: 'Point of Sale'
            }
        }
    };

    const currentContent = isArabic ? content.ar : content.en;

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat(isArabic ? 'ar-IQ' : 'en-US').format(amount);
    };

    const getGrowthColor = (growth) => {
        return growth > 0 ? 'text-green-600' : 'text-red-600';
    };

    const getGrowthIcon = (growth) => {
        return growth > 0 ? '↗️' : '↘️';
    };

    const getPriorityColor = (priority) => {
        switch(priority) {
            case 'high': return 'border-red-500 bg-red-50';
            case 'medium': return 'border-yellow-500 bg-yellow-50';
            case 'low': return 'border-green-500 bg-green-50';
            default: return 'border-gray-500 bg-gray-50';
        }
    };

    return (
        <div className={`min-h-screen bg-gray-50 ${isArabic ? 'rtl' : 'ltr'}`}>
            {/* Header */}
            <div className="bg-white shadow-sm border-b">
                <div className="px-4 py-4">
                    <div className="flex items-center justify-between mb-4">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">
                                {currentContent.title}
                            </h1>
                            <p className="text-gray-600 text-sm mt-1">
                                {currentContent.subtitle}
                            </p>
                        </div>
                        <div className="flex items-center gap-3">
                            <button
                                onClick={() => setShowNotifications(!showNotifications)}
                                className="relative p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
                            >
                                <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                                </svg>
                                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                                    {notifications.length}
                                </span>
                            </button>
                            <button
                                onClick={() => setIsArabic(!isArabic)}
                                className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
                            >
                                <span className="text-sm font-medium">
                                    {isArabic ? 'EN' : 'العربية'}
                                </span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="p-4">
                {/* Sales Statistics */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-600 text-sm">{currentContent.todaySales}</p>
                                <p className="text-2xl font-bold text-gray-900">
                                    {formatCurrency(dashboardData.sales.today)}
                                </p>
                                <p className="text-gray-500 text-xs">{currentContent.currency}</p>
                            </div>
                            <div className="p-3 bg-blue-100 rounded-full">
                                <span className="text-2xl">💰</span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-600 text-sm">{currentContent.monthSales}</p>
                                <p className="text-2xl font-bold text-gray-900">
                                    {formatCurrency(dashboardData.sales.month)}
                                </p>
                                <p className={`text-xs ${getGrowthColor(dashboardData.sales.growth)}`}>
                                    {getGrowthIcon(dashboardData.sales.growth)} {dashboardData.sales.growth}%
                                </p>
                            </div>
                            <div className="p-3 bg-green-100 rounded-full">
                                <span className="text-2xl">📈</span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-600 text-sm">{currentContent.totalDebts}</p>
                                <p className="text-2xl font-bold text-red-600">
                                    {formatCurrency(dashboardData.debts.total)}
                                </p>
                                <p className="text-gray-500 text-xs">{dashboardData.debts.count} عميل</p>
                            </div>
                            <div className="p-3 bg-red-100 rounded-full">
                                <span className="text-2xl">💳</span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-600 text-sm">{currentContent.totalCustomers}</p>
                                <p className="text-2xl font-bold text-gray-900">
                                    {dashboardData.customers.total}
                                </p>
                                <p className="text-green-600 text-xs">+{dashboardData.customers.new} جديد</p>
                            </div>
                            <div className="p-3 bg-purple-100 rounded-full">
                                <span className="text-2xl">👥</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Charts Row */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                    {/* Sales Chart Placeholder */}
                    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">مبيعات الأسبوع</h3>
                        <div className="h-64 bg-gradient-to-t from-blue-50 to-transparent rounded-lg flex items-end justify-center">
                            <div className="text-center text-gray-500">
                                <span className="text-4xl">📊</span>
                                <p className="mt-2">رسم بياني للمبيعات</p>
                                <p className="text-sm">(سيتم تطويره لاحقاً)</p>
                            </div>
                        </div>
                    </div>

                    {/* Notifications Panel */}
                    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-semibold text-gray-900">{currentContent.notifications}</h3>
                            <button className="text-blue-600 text-sm hover:text-blue-800">
                                {currentContent.viewAll}
                            </button>
                        </div>
                        <div className="space-y-3 max-h-64 overflow-y-auto">
                            {notifications.slice(0, 4).map((notification) => (
                                <div key={notification.id} className={`p-3 rounded-lg border-l-4 ${getPriorityColor(notification.priority)}`}>
                                    <div className="flex items-start justify-between">
                                        <div className="flex-1">
                                            <h4 className="font-medium text-gray-900 text-sm">{notification.title}</h4>
                                            <p className="text-gray-600 text-xs mt-1">{notification.message}</p>
                                        </div>
                                        <span className="text-gray-500 text-xs">{notification.time}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">{currentContent.quickActions}</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {quickActions.map((action, index) => (
                            <button
                                key={index}
                                onClick={action.action}
                                className={`${action.color} text-white p-4 rounded-lg hover:opacity-90 transition-opacity`}
                            >
                                <div className="text-center">
                                    <span className="text-2xl block mb-2">{action.icon}</span>
                                    <span className="text-sm font-medium">{action.title}</span>
                                </div>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Navigation Grid */}
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">{currentContent.navigation.title}</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <a
                            href="/customers"
                            className="p-4 rounded-lg border border-gray-200 hover:shadow-md transition-shadow group text-center"
                        >
                            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-blue-200 transition-colors">
                                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                            </div>
                            <h4 className="font-semibold text-gray-900 text-sm">
                                {currentContent.navigation.customers}
                            </h4>
                        </a>

                        <a
                            href="/debts"
                            className="p-4 rounded-lg border border-gray-200 hover:shadow-md transition-shadow group text-center"
                        >
                            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-red-200 transition-colors">
                                <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                                </svg>
                            </div>
                            <h4 className="font-semibold text-gray-900 text-sm">
                                {currentContent.navigation.debts}
                            </h4>
                        </a>

                        <a
                            href="/installments"
                            className="p-4 rounded-lg border border-gray-200 hover:shadow-md transition-shadow group text-center"
                        >
                            <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-yellow-200 transition-colors">
                                <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v6a2 2 0 002 2h6a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                </svg>
                            </div>
                            <h4 className="font-semibold text-gray-900 text-sm">
                                {currentContent.navigation.installments}
                            </h4>
                        </a>

                        <a
                            href="/products"
                            className="p-4 rounded-lg border border-gray-200 hover:shadow-md transition-shadow group text-center"
                        >
                            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-green-200 transition-colors">
                                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                                </svg>
                            </div>
                            <h4 className="font-semibold text-gray-900 text-sm">
                                {currentContent.navigation.products}
                            </h4>
                        </a>

                        <a
                            href="/invoices"
                            className="p-4 rounded-lg border border-gray-200 hover:shadow-md transition-shadow group text-center"
                        >
                            <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-indigo-200 transition-colors">
                                <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                            </div>
                            <h4 className="font-semibold text-gray-900 text-sm">
                                {currentContent.navigation.invoices}
                            </h4>
                        </a>

                        <a
                            href="/expenses"
                            className="p-4 rounded-lg border border-gray-200 hover:shadow-md transition-shadow group text-center"
                        >
                            <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-orange-200 transition-colors">
                                <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                                </svg>
                            </div>
                            <h4 className="font-semibold text-gray-900 text-sm">
                                {currentContent.navigation.expenses}
                            </h4>
                        </a>

                        <a
                            href="/reports"
                            className="p-4 rounded-lg border border-gray-200 hover:shadow-md transition-shadow group text-center"
                        >
                            <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-pink-200 transition-colors">
                                <svg className="w-6 h-6 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                </svg>
                            </div>
                            <h4 className="font-semibold text-gray-900 text-sm">
                                {currentContent.navigation.reports}
                            </h4>
                        </a>

                        <a
                            href="/pos"
                            className="p-4 rounded-lg border border-gray-200 hover:shadow-md transition-shadow group text-center"
                        >
                            <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-teal-200 transition-colors">
                                <svg className="w-6 h-6 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13h10M17 13l2.5 5M9 19.5h.01M20 19.5h.01" />
                                </svg>
                            </div>
                            <h4 className="font-semibold text-gray-900 text-sm">
                                {currentContent.navigation.pos}
                            </h4>
                        </a>
                    </div>
                </div>

                {/* Additional Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                        <h4 className="font-semibold text-gray-900 mb-3">أقساط اليوم</h4>
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-2xl font-bold text-orange-600">{dashboardData.installments.dueToday}</p>
                                <p className="text-gray-600 text-sm">قسط مستحق</p>
                            </div>
                            <div className="text-right">
                                <p className="font-semibold">{formatCurrency(dashboardData.installments.amount)} {currentContent.currency}</p>
                                <p className="text-red-600 text-sm">{dashboardData.installments.overdue} متأخر</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                        <h4 className="font-semibold text-gray-900 mb-3">حالة المخزون</h4>
                        <div className="space-y-2">
                            <div className="flex justify-between">
                                <span className="text-gray-600">مخزون منخفض:</span>
                                <span className="font-semibold text-yellow-600">{dashboardData.inventory.lowStock}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">نفذ المخزون:</span>
                                <span className="font-semibold text-red-600">{dashboardData.inventory.outOfStock}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">إجمالي المنتجات:</span>
                                <span className="font-semibold text-gray-900">{dashboardData.inventory.total}</span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                        <h4 className="font-semibold text-gray-900 mb-3">المصروفات</h4>
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-2xl font-bold text-gray-900">
                                    {formatCurrency(dashboardData.expenses.month)}
                                </p>
                                <p className="text-gray-600 text-sm">هذا الشهر</p>
                            </div>
                            <div className="text-right">
                                <p className={`text-sm ${getGrowthColor(dashboardData.expenses.growth)}`}>
                                    {getGrowthIcon(dashboardData.expenses.growth)} {Math.abs(dashboardData.expenses.growth)}%
                                </p>
                                <p className="text-gray-500 text-xs">مقارنة بالشهر الماضي</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
