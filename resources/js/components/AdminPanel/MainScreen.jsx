import React from 'react';

const MainScreen = ({ isArabic }) => {
    const content = {
        ar: {
            title: 'لوحة الإدارة الرئيسية',
            subtitle: 'نظرة عامة على نشاط المشروع SaaS',
            stats: {
                totalCustomers: 'إجمالي العملاء',
                activeSubscriptions: 'الاشتراكات النشطة',
                monthlyRevenue: 'الإيرادات الشهرية',
                supportTickets: 'تذاكر الدعم'
            },
            quickActions: {
                title: 'الإجراءات السريعة',
                addCustomer: 'إضافة عميل جديد',
                createPlan: 'إنشاء باقة جديدة',
                viewReports: 'عرض التقارير',
                systemSettings: 'إعدادات النظام'
            },
            recentActivity: {
                title: 'النشاط الأخير',
                newCustomer: 'عميل جديد انضم',
                subscriptionUpgrade: 'ترقية اشتراك',
                paymentReceived: 'دفعة مستلمة',
                supportTicket: 'تذكرة دعم جديدة'
            }
        },
        en: {
            title: 'Main Admin Dashboard',
            subtitle: 'SaaS Project Activity Overview',
            stats: {
                totalCustomers: 'Total Customers',
                activeSubscriptions: 'Active Subscriptions',
                monthlyRevenue: 'Monthly Revenue',
                supportTickets: 'Support Tickets'
            },
            quickActions: {
                title: 'Quick Actions',
                addCustomer: 'Add New Customer',
                createPlan: 'Create New Plan',
                viewReports: 'View Reports',
                systemSettings: 'System Settings'
            },
            recentActivity: {
                title: 'Recent Activity',
                newCustomer: 'New customer joined',
                subscriptionUpgrade: 'Subscription upgraded',
                paymentReceived: 'Payment received',
                supportTicket: 'New support ticket'
            }
        }
    };

    const currentContent = content[isArabic ? 'ar' : 'en'];

    const stats = [
        {
            title: currentContent.stats.totalCustomers,
            value: '2,847',
            change: '+12%',
            icon: '👥',
            color: 'bg-blue-500'
        },
        {
            title: currentContent.stats.activeSubscriptions,
            value: '1,923',
            change: '+8%',
            icon: '📊',
            color: 'bg-green-500'
        },
        {
            title: currentContent.stats.monthlyRevenue,
            value: '$45,231',
            change: '+15%',
            icon: '💰',
            color: 'bg-purple-500'
        },
        {
            title: currentContent.stats.supportTickets,
            value: '23',
            change: '-5%',
            icon: '🎫',
            color: 'bg-orange-500'
        }
    ];

    return (
        <div className="main-screen">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    {currentContent.title}
                </h1>
                <p className="text-gray-600">
                    {currentContent.subtitle}
                </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {stats.map((stat, index) => (
                    <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600 mb-1">
                                    {stat.title}
                                </p>
                                <p className="text-2xl font-bold text-gray-900">
                                    {stat.value}
                                </p>
                                <p className={`text-sm font-medium ${
                                    stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'
                                }`}>
                                    {stat.change} من الشهر الماضي
                                </p>
                            </div>
                            <div className={`${stat.color} text-white p-3 rounded-lg text-2xl`}>
                                {stat.icon}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Quick Actions & Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Quick Actions */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                        {currentContent.quickActions.title}
                    </h3>
                    <div className="space-y-3">
                        <button className="w-full text-right bg-blue-50 hover:bg-blue-100 text-blue-700 p-3 rounded-lg transition-colors">
                            {currentContent.quickActions.addCustomer}
                        </button>
                        <button className="w-full text-right bg-green-50 hover:bg-green-100 text-green-700 p-3 rounded-lg transition-colors">
                            {currentContent.quickActions.createPlan}
                        </button>
                        <button className="w-full text-right bg-purple-50 hover:bg-purple-100 text-purple-700 p-3 rounded-lg transition-colors">
                            {currentContent.quickActions.viewReports}
                        </button>
                        <button className="w-full text-right bg-gray-50 hover:bg-gray-100 text-gray-700 p-3 rounded-lg transition-colors">
                            {currentContent.quickActions.systemSettings}
                        </button>
                    </div>
                </div>

                {/* Recent Activity */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                        {currentContent.recentActivity.title}
                    </h3>
                    <div className="space-y-4">
                        <div className="flex items-center space-x-3 text-right">
                            <div className="bg-green-100 text-green-600 p-2 rounded-full">
                                👤
                            </div>
                            <div className="flex-1">
                                <p className="text-sm font-medium text-gray-900">
                                    {currentContent.recentActivity.newCustomer}
                                </p>
                                <p className="text-xs text-gray-500">منذ 5 دقائق</p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-3 text-right">
                            <div className="bg-blue-100 text-blue-600 p-2 rounded-full">
                                ⬆️
                            </div>
                            <div className="flex-1">
                                <p className="text-sm font-medium text-gray-900">
                                    {currentContent.recentActivity.subscriptionUpgrade}
                                </p>
                                <p className="text-xs text-gray-500">منذ 15 دقيقة</p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-3 text-right">
                            <div className="bg-purple-100 text-purple-600 p-2 rounded-full">
                                💳
                            </div>
                            <div className="flex-1">
                                <p className="text-sm font-medium text-gray-900">
                                    {currentContent.recentActivity.paymentReceived}
                                </p>
                                <p className="text-xs text-gray-500">منذ 30 دقيقة</p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-3 text-right">
                            <div className="bg-orange-100 text-orange-600 p-2 rounded-full">
                                🎫
                            </div>
                            <div className="flex-1">
                                <p className="text-sm font-medium text-gray-900">
                                    {currentContent.recentActivity.supportTicket}
                                </p>
                                <p className="text-xs text-gray-500">منذ 45 دقيقة</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MainScreen;
