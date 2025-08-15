import React from 'react';

const Sidebar = ({ activeSection, setActiveSection, collapsed, setCollapsed, isArabic }) => {
    const content = {
        ar: {
            title: 'SalesFlow Admin',
            menu: {
                dashboard: 'لوحة الرئيسية',
                customers: 'إدارة العملاء',
                subscriptions: 'الاشتراكات',
                plans: 'باقات الاشتراك',
                employees: 'الموظفين',
                analytics: 'الإحصائيات',
                notifications: 'الإشعارات',
                settings: 'الإعدادات',
                financialReports: 'التقارير المالية',
                systemLogs: 'سجلات النظام',
                supportTickets: 'تذاكر الدعم'
            }
        },
        en: {
            title: 'SalesFlow Admin',
            menu: {
                dashboard: 'Dashboard',
                customers: 'Customers',
                subscriptions: 'Subscriptions',
                plans: 'Plans',
                employees: 'Employees',
                analytics: 'Analytics',
                notifications: 'Notifications',
                settings: 'Settings',
                financialReports: 'Financial Reports',
                systemLogs: 'System Logs',
                supportTickets: 'Support Tickets'
            }
        }
    };

    const currentContent = content[isArabic ? 'ar' : 'en'];

    const menuItems = [
        {
            id: 'dashboard',
            icon: '🏠',
            label: currentContent.menu.dashboard,
            color: 'text-blue-600'
        },
        {
            id: 'customers',
            icon: '👥',
            label: currentContent.menu.customers,
            color: 'text-green-600'
        },
        {
            id: 'subscriptions',
            icon: '📊',
            label: currentContent.menu.subscriptions,
            color: 'text-purple-600'
        },
        {
            id: 'plans',
            icon: '📋',
            label: currentContent.menu.plans,
            color: 'text-indigo-600'
        },
        {
            id: 'employees',
            icon: '👨‍💼',
            label: currentContent.menu.employees,
            color: 'text-orange-600'
        },
        {
            id: 'analytics',
            icon: '📈',
            label: currentContent.menu.analytics,
            color: 'text-red-600'
        },
        {
            id: 'financial-reports',
            icon: '💰',
            label: currentContent.menu.financialReports,
            color: 'text-emerald-600'
        },
        {
            id: 'support-tickets',
            icon: '🎫',
            label: currentContent.menu.supportTickets,
            color: 'text-yellow-600'
        },
        {
            id: 'notifications',
            icon: '🔔',
            label: currentContent.menu.notifications,
            color: 'text-pink-600'
        },
        {
            id: 'system-logs',
            icon: '📝',
            label: currentContent.menu.systemLogs,
            color: 'text-slate-600'
        },
        {
            id: 'settings',
            icon: '⚙️',
            label: currentContent.menu.settings,
            color: 'text-gray-600'
        }
    ];

    return (
        <div className={`sidebar fixed top-0 h-full bg-white shadow-lg border-r border-gray-200 z-50 transition-all duration-300 ${
            collapsed ? 'w-16' : 'w-64'
        } ${isArabic ? 'right-0' : 'left-0'}`}>

            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
                {!collapsed && (
                    <h2 className="text-xl font-bold text-gray-900">
                        {currentContent.title}
                    </h2>
                )}
                <button
                    onClick={() => setCollapsed(!collapsed)}
                    className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                >
                    <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={collapsed ? "M13 5l7 7-7 7M5 5l7 7-7 7" : "M11 19l-7-7 7-7m8 14l-7-7 7-7"} />
                    </svg>
                </button>
            </div>

            {/* Menu Items */}
            <nav className="p-4">
                <ul className="space-y-2">
                    {menuItems.map((item) => (
                        <li key={item.id}>
                            <button
                                onClick={() => setActiveSection(item.id)}
                                className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                                    activeSection === item.id
                                        ? 'bg-blue-50 text-blue-700 border border-blue-200'
                                        : 'text-gray-700 hover:bg-gray-50'
                                } ${isArabic ? 'text-right flex-row-reverse space-x-reverse' : 'text-left'}`}
                            >
                                <span className={`text-xl ${item.color}`}>
                                    {item.icon}
                                </span>
                                {!collapsed && (
                                    <span className="font-medium">
                                        {item.label}
                                    </span>
                                )}
                            </button>
                        </li>
                    ))}
                </ul>
            </nav>

            {/* Footer */}
            {!collapsed && (
                <div className="absolute bottom-4 left-4 right-4">
                    <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-3 rounded-lg text-center">
                        <p className="text-sm font-medium">SalesFlow v2.0</p>
                        <p className="text-xs opacity-90">Admin Panel</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Sidebar;
