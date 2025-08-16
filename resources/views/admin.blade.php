<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>SalesFlow - لوحة الإدارة</title>

    <!-- PWA Meta Tags -->
    <meta name="description" content="نظام SalesFlow المتطور لإدارة المبيعات والعملاء بفعالية عالية">
    <meta name="theme-color" content="#3B82F6">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="default">
    <meta name="apple-mobile-web-app-title" content="SalesFlow">
    <meta name="msapplication-TileColor" content="#3B82F6">
    <meta name="msapplication-config" content="/browserconfig.xml">

    <!-- PWA Icons -->
    <link rel="apple-touch-icon" sizes="152x152" href="/images/icon-152x152.png">
    <link rel="icon" type="image/png" sizes="32x32" href="/images/icon-32x32.png">
    <link rel="icon" type="image/png" sizes="16x16" href="/images/icon-16x16.png">
    <link rel="manifest" href="/manifest.json">
    <link rel="mask-icon" href="/images/icon.svg" color="#3B82F6">

    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.bunny.net">
    <link href="https://fonts.bunny.net/css?family=figtree:400,500,600&display=swap" rel="stylesheet" />

    <!-- Tailwind CSS CDN -->
    <script src="https://cdn.tailwindcss.com"></script>

    <!-- React CDN for development -->
    <script crossorigin src="https://unpkg.com/react@18/umd/react.development.js"></script>
    <script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
    <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>

    <style>
        /* Custom styles for Arabic support */
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }

        /* Particle animation */
        .particle {
            position: absolute;
            background: linear-gradient(45deg, #3b82f6, #8b5cf6);
            border-radius: 50%;
            opacity: 0.1;
            animation: float 6s ease-in-out infinite;
        }

        @keyframes float {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            33% { transform: translateY(-20px) rotate(120deg); }
            66% { transform: translateY(10px) rotate(240deg); }
        }

        /* Fade in animation */
        .animate-fade-in-up {
            animation: fadeInUp 0.6s ease-out forwards;
        }

        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        /* Gradient backgrounds */
        .bg-gradient-primary {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        }

        .bg-gradient-secondary {
            background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
        }

        /* Button styles */
        .btn-primary {
            @apply bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg;
        }

        .btn-secondary {
            @apply bg-white text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-50 transition-all duration-300 border border-gray-300 shadow-sm;
        }

        /* Glass morphism effect */
        .glass {
            background: rgba(255, 255, 255, 0.1);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.2);
        }

        /* RTL support */
        .rtl {
            direction: rtl;
        }

        .ltr {
            direction: ltr;
        }
    </style>
</head>

<body class="antialiased bg-gray-50">
    <div id="admin-panel-root"></div>

    <script type="text/babel">
        const { useState } = React;

        // AdminPanel Component
        const AdminPanel = () => {
            const [activeSection, setActiveSection] = useState('dashboard');
            const [sidebarCollapsed, setSidebarCollapsed] = useState(window.innerWidth < 640); // Start collapsed on mobile
            const [isArabic, setIsArabic] = useState(true);

            // Handle window resize
            React.useEffect(() => {
                const handleResize = () => {
                    if (window.innerWidth < 640) {
                        setSidebarCollapsed(true); // Always collapsed on mobile
                    }
                };

                window.addEventListener('resize', handleResize);
                return () => window.removeEventListener('resize', handleResize);
            }, []);

            const renderActiveSection = () => {
                switch (activeSection) {
                    case 'dashboard':
                        return React.createElement(MainScreen, { isArabic, setActiveSection });
                    case 'customers':
                        return React.createElement(CustomersScreen, { isArabic });
                    case 'subscriptions':
                        return React.createElement(SubscriptionsScreen, { isArabic });
                    case 'plans':
                        return React.createElement(PlansScreen, { isArabic });
                    case 'employees':
                        return React.createElement(EmployeesScreen, { isArabic });
                    case 'analytics':
                        return React.createElement(AnalyticsScreen, { isArabic });
                    case 'notifications':
                        return React.createElement(NotificationsScreen, { isArabic });
                    case 'settings':
                        return React.createElement(SettingsScreen, { isArabic });
                    default:
                        return React.createElement(MainScreen, { isArabic, setActiveSection });
                }
            };

            return React.createElement('div', {
                className: `admin-panel min-h-screen bg-gray-50 ${isArabic ? 'rtl' : 'ltr'}`
            }, [
                React.createElement(Sidebar, {
                    key: 'sidebar',
                    activeSection,
                    setActiveSection,
                    collapsed: sidebarCollapsed,
                    setCollapsed: setSidebarCollapsed,
                    isArabic
                }),
                React.createElement('div', {
                    key: 'main-content',
                    className: `main-content transition-all duration-300 ${
                        // Mobile: full width always, Desktop: responsive margins
                        window.innerWidth < 640
                            ? 'ml-0 mr-0'
                            : (sidebarCollapsed
                                ? (isArabic ? 'mr-16' : 'ml-16')
                                : (isArabic ? 'mr-64' : 'ml-64'))
                    }`
                }, [
                    React.createElement(Header, {
                        key: 'header',
                        isArabic,
                        setIsArabic,
                        sidebarCollapsed,
                        setSidebarCollapsed
                    }),
                    React.createElement('main', {
                        key: 'main',
                        className: 'p-3 sm:p-6'
                    }, renderActiveSection())
                ])
            ]);
        };

        // Header Component
        const Header = ({ isArabic, setIsArabic, sidebarCollapsed, setSidebarCollapsed }) => {
            const content = {
                ar: {
                    search: 'البحث...',
                    welcome: 'مرحباً، أحمد'
                },
                en: {
                    search: 'Search...',
                    welcome: 'Welcome, Ahmed'
                }
            };

            const currentContent = content[isArabic ? 'ar' : 'en'];

            return React.createElement('header', {
                className: 'bg-white shadow-sm border-b border-gray-200 p-3 sm:p-4'
            },
                React.createElement('div', { className: 'flex items-center justify-between' }, [
                    React.createElement('div', { key: 'left-section', className: 'flex items-center space-x-2 sm:space-x-4' }, [
                        // Mobile menu button
                        React.createElement('button', {
                            key: 'mobile-menu',
                            onClick: () => setSidebarCollapsed(!sidebarCollapsed),
                            className: 'sm:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors'
                        }, React.createElement('svg', {
                            className: 'w-5 h-5 text-gray-600',
                            fill: 'none',
                            stroke: 'currentColor',
                            viewBox: '0 0 24 24'
                        }, React.createElement('path', {
                            strokeLinecap: 'round',
                            strokeLinejoin: 'round',
                            strokeWidth: 2,
                            d: 'M4 6h16M4 12h16M4 18h16'
                        }))),
                        // Search - hidden on small screens
                        React.createElement('div', { key: 'search', className: 'hidden md:block relative' }, [
                            React.createElement('input', {
                                key: 'search-input',
                                type: 'text',
                                placeholder: currentContent.search,
                                className: 'w-64 lg:w-80 pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm'
                            }),
                            React.createElement('svg', {
                                key: 'search-icon',
                                className: 'absolute left-3 top-2.5 h-4 w-4 text-gray-400',
                                fill: 'none',
                                stroke: 'currentColor',
                                viewBox: '0 0 24 24'
                            }, React.createElement('path', {
                                strokeLinecap: 'round',
                                strokeLinejoin: 'round',
                                strokeWidth: 2,
                                d: 'M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
                            }))
                        ])
                    ]),
                    React.createElement('div', { key: 'actions', className: 'flex items-center space-x-2 sm:space-x-4' }, [
                        // Mobile search button
                        React.createElement('button', {
                            key: 'mobile-search',
                            className: 'md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors'
                        }, React.createElement('svg', {
                            className: 'w-5 h-5 text-gray-600',
                            fill: 'none',
                            stroke: 'currentColor',
                            viewBox: '0 0 24 24'
                        }, React.createElement('path', {
                            strokeLinecap: 'round',
                            strokeLinejoin: 'round',
                            strokeWidth: 2,
                            d: 'M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
                        }))),
                        React.createElement('button', {
                            key: 'lang-toggle',
                            onClick: () => setIsArabic(!isArabic),
                            className: 'px-2 sm:px-3 py-1 sm:py-2 text-xs sm:text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors'
                        }, isArabic ? 'EN' : 'عربي'),
                        React.createElement('div', { key: 'profile', className: 'flex items-center space-x-2 sm:space-x-3' }, [
                            React.createElement('div', { key: 'profile-text', className: 'hidden sm:block text-right' }, [
                                React.createElement('p', {
                                    key: 'welcome',
                                    className: 'text-sm font-medium text-gray-900'
                                }, currentContent.welcome),
                                React.createElement('p', {
                                    key: 'role',
                                    className: 'text-xs text-gray-500'
                                }, 'مدير النظام')
                            ]),
                            React.createElement('img', {
                                key: 'avatar',
                                className: 'w-6 h-6 sm:w-8 sm:h-8 rounded-full',
                                src: 'https://ui-avatars.com/api/?name=Ahmed+Admin&background=3b82f6&color=white',
                                alt: 'Profile'
                            })
                        ])
                    ])
                ])
            );
        };

        // Sidebar Component
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
                        settings: 'الإعدادات'
                    }
                }
            };

            const currentContent = content[isArabic ? 'ar' : 'en'] || content.ar;

            const menuItems = [
                { id: 'dashboard', icon: '🏠', label: currentContent.menu.dashboard, color: 'text-blue-600' },
                { id: 'customers', icon: '👥', label: currentContent.menu.customers, color: 'text-green-600' },
                { id: 'subscriptions', icon: '📊', label: currentContent.menu.subscriptions, color: 'text-purple-600' },
                { id: 'plans', icon: '📋', label: currentContent.menu.plans, color: 'text-indigo-600' },
                { id: 'employees', icon: '👨‍💼', label: currentContent.menu.employees, color: 'text-orange-600' },
                { id: 'analytics', icon: '📈', label: currentContent.menu.analytics, color: 'text-red-600' },
                { id: 'notifications', icon: '🔔', label: currentContent.menu.notifications, color: 'text-pink-600' },
                { id: 'settings', icon: '⚙️', label: currentContent.menu.settings, color: 'text-gray-600' }
            ];

            return React.createElement('div', {
                className: `sidebar fixed top-0 h-full bg-white shadow-lg border-r border-gray-200 z-50 transition-all duration-300 ${
                    // Mobile: Full width overlay when open, hidden when closed
                    // Desktop: Normal sidebar behavior
                    window.innerWidth < 640
                        ? (collapsed ? '-translate-x-full opacity-0 pointer-events-none' : 'w-full')
                        : (collapsed ? 'w-16' : 'w-64')
                } ${isArabic ? 'right-0' : 'left-0'}`
            }, [
                // Mobile overlay background
                window.innerWidth < 640 && !collapsed && React.createElement('div', {
                    key: 'overlay',
                    className: 'fixed inset-0 bg-black bg-opacity-50 z-40',
                    onClick: () => setCollapsed(true)
                }),
                React.createElement('div', {
                    key: 'sidebar-content',
                    className: `relative z-50 bg-white h-full ${window.innerWidth < 640 ? 'w-80 max-w-sm' : 'w-full'}`
                }, [
                    React.createElement('div', {
                        key: 'header',
                        className: 'flex items-center justify-between p-3 sm:p-4 border-b border-gray-200'
                    }, [
                        !collapsed && React.createElement('h2', {
                            key: 'title',
                            className: 'text-lg sm:text-xl font-bold text-gray-900'
                        }, currentContent.title),
                        React.createElement('button', {
                            key: 'toggle',
                            onClick: () => setCollapsed(!collapsed),
                            className: 'p-2 rounded-lg hover:bg-gray-100 transition-colors'
                        }, React.createElement('svg', {
                            className: 'w-5 h-5 text-gray-600',
                            fill: 'none',
                            stroke: 'currentColor',
                            viewBox: '0 0 24 24'
                        }, React.createElement('path', {
                            strokeLinecap: 'round',
                            strokeLinejoin: 'round',
                            strokeWidth: 2,
                            d: window.innerWidth < 640 ? "M6 18L18 6M6 6l12 12" : (collapsed ? "M13 5l7 7-7 7M5 5l7 7-7 7" : "M11 19l-7-7 7-7m8 14l-7-7 7-7")
                        })))
                    ]),
                    React.createElement('nav', {
                        key: 'nav',
                        className: 'p-3 sm:p-4 overflow-y-auto'
                    },
                        React.createElement('ul', { className: 'space-y-1 sm:space-y-2' },
                            menuItems.map(item =>
                                React.createElement('li', { key: item.id },
                                    React.createElement('button', {
                                        onClick: () => {
                                            setActiveSection(item.id);
                                            // Close sidebar on mobile after selection
                                            if (window.innerWidth < 640) {
                                                setCollapsed(true);
                                            }
                                        },
                                        className: `w-full flex items-center space-x-2 sm:space-x-3 px-2 sm:px-3 py-2 sm:py-2 rounded-lg transition-colors text-sm sm:text-base ${
                                            activeSection === item.id
                                                ? 'bg-blue-50 text-blue-700 border border-blue-200'
                                                : 'text-gray-700 hover:bg-gray-50'
                                        } ${isArabic ? 'text-right flex-row-reverse space-x-reverse' : 'text-left'}`
                                    }, [
                                        React.createElement('span', {
                                            key: 'icon',
                                            className: `text-lg sm:text-xl ${item.color}`
                                        }, item.icon),
                                        (!collapsed || window.innerWidth < 640) && React.createElement('span', {
                                            key: 'label',
                                            className: 'font-medium'
                                        }, item.label)
                                    ])
                                )
                            )
                        )
                    )
                ])
            ]);
        };

        // PlansScreen Component
        const PlansScreen = ({ isArabic }) => {
            // CRUD State Management
            const [showCreateModal, setShowCreateModal] = useState(false);
            const [showEditModal, setShowEditModal] = useState(false);
            const [showViewModal, setShowViewModal] = useState(false);
            const [showDeleteModal, setShowDeleteModal] = useState(false);
            const [selectedPlan, setSelectedPlan] = useState(null);
            const [formData, setFormData] = useState({
                name: '',
                nameEn: '',
                description: '',
                price: '',
                currency: 'دينار عراقي',
                billingCycle: 'شهرياً',
                features: [''],
                status: 'نشط'
            });

            const [plans, setPlans] = useState([
                {
                    id: 1,
                    name: 'باقة البرونز',
                    nameEn: 'Bronze Plan',
                    description: 'مناسبة للمشاريع الصغيرة والمبتدئين',
                    price: '25,000',
                    currency: 'دينار عراقي',
                    billingCycle: 'شهرياً',
                    status: 'نشط',
                    features: [
                        'حتى 10 عملاء',
                        'تقارير أساسية',
                        'دعم فني عبر البريد',
                        'مساحة تخزين 1 جيجا',
                        'لوحة تحكم بسيطة'
                    ],
                    subscribers: 15,
                    totalRevenue: '375,000',
                    color: 'bg-amber-500',
                    textColor: 'text-amber-700',
                    bgColor: 'bg-amber-50',
                    borderColor: 'border-amber-200'
                },
                {
                    id: 2,
                    name: 'باقة الفضة',
                    nameEn: 'Silver Plan',
                    description: 'مثالية للشركات المتوسطة والنامية',
                    price: '35,000',
                    currency: 'دينار عراقي',
                    billingCycle: 'شهرياً',
                    status: 'نشط',
                    features: [
                        'حتى 50 عميل',
                        'تقارير متقدمة',
                        'دعم فني على مدار الساعة',
                        'مساحة تخزين 5 جيجا',
                        'لوحة تحكم متقدمة',
                        'تكامل مع أنظمة المحاسبة'
                    ],
                    subscribers: 8,
                    totalRevenue: '280,000',
                    color: 'bg-gray-500',
                    textColor: 'text-gray-700',
                    bgColor: 'bg-gray-50',
                    borderColor: 'border-gray-200'
                },
                {
                    id: 3,
                    name: 'باقة الذهب',
                    nameEn: 'Gold Plan',
                    description: 'للشركات الكبيرة والمؤسسات',
                    price: '50,000',
                    currency: 'دينار عراقي',
                    billingCycle: 'شهرياً',
                    status: 'نشط',
                    features: [
                        'عملاء غير محدود',
                        'تقارير شاملة ومخصصة',
                        'دعم فني مخصص',
                        'مساحة تخزين غير محدودة',
                        'لوحة تحكم كاملة المميزات',
                        'تكامل مع جميع الأنظمة',
                        'تحليلات متقدمة',
                        'نسخ احتياطية يومية'
                    ],
                    subscribers: 5,
                    totalRevenue: '250,000',
                    color: 'bg-yellow-500',
                    textColor: 'text-yellow-700',
                    bgColor: 'bg-yellow-50',
                    borderColor: 'border-yellow-200'
                },
                {
                    id: 4,
                    name: 'باقة المؤسسات',
                    nameEn: 'Enterprise Plan',
                    description: 'حلول مخصصة للمؤسسات الكبرى',
                    price: 'حسب الطلب',
                    currency: 'دينار عراقي',
                    billingCycle: 'سنوياً',
                    status: 'معلق',
                    features: [
                        'حلول مخصصة بالكامل',
                        'تقارير مخصصة',
                        'فريق دعم مخصص',
                        'استضافة خاصة',
                        'تطوير مميزات خاصة',
                        'تدريب فريق العمل',
                        'ضمان وقت التشغيل 99.9%',
                        'أمان متقدم'
                    ],
                    subscribers: 2,
                    totalRevenue: '500,000',
                    color: 'bg-purple-500',
                    textColor: 'text-purple-700',
                    bgColor: 'bg-purple-50',
                    borderColor: 'border-purple-200'
                }
            ]);

            const [searchTerm, setSearchTerm] = useState('');
            const [statusFilter, setStatusFilter] = useState('all');

            const content = {
                ar: {
                    title: 'إدارة باقات الاشتراك',
                    subtitle: 'إنشاء وإدارة باقات الاشتراك والتسعير',
                    search: 'البحث عن باقة...',
                    createPlan: 'إنشاء باقة جديدة',
                    allStatus: 'جميع الحالات',
                    active: 'نشط',
                    inactive: 'غير نشط',
                    suspended: 'معلق',
                    planName: 'اسم الباقة',
                    description: 'الوصف',
                    price: 'السعر',
                    billingCycle: 'دورة الفوترة',
                    subscribers: 'المشتركون',
                    revenue: 'الإيرادات',
                    status: 'الحالة',
                    features: 'المميزات',
                    actions: 'الإجراءات',
                    edit: 'تعديل',
                    delete: 'حذف',
                    view: 'عرض',
                    clone: 'نسخ',
                    activate: 'تفعيل',
                    deactivate: 'إلغاء تفعيل',
                    noResults: 'لا توجد نتائج للبحث',
                    totalPlans: 'إجمالي الباقات',
                    activePlans: 'الباقات النشطة',
                    totalSubscribers: 'إجمالي المشتركين',
                    monthlyRevenue: 'الإيرادات الشهرية',
                    monthly: 'شهرياً',
                    yearly: 'سنوياً',
                    perMonth: '/شهر',
                    perYear: '/سنة',
                    customPricing: 'تسعير مخصص',
                    mostPopular: 'الأكثر شيوعاً',
                    recommended: 'مُوصى به',
                    modals: {
                        createPlan: 'إنشاء باقة جديدة',
                        editPlan: 'تعديل الباقة',
                        viewPlan: 'عرض تفاصيل الباقة',
                        deletePlan: 'حذف الباقة',
                        planName: 'اسم الباقة',
                        planNameEn: 'اسم الباقة (إنجليزي)',
                        planPrice: 'سعر الباقة',
                        planDescription: 'وصف الباقة',
                        planFeatures: 'مميزات الباقة',
                        addFeature: 'إضافة ميزة',
                        removeFeature: 'حذف الميزة',
                        currency: 'العملة',
                        billingPeriod: 'فترة الفوترة',
                        monthly: 'شهرياً',
                        yearly: 'سنوياً',
                        planStatus: 'حالة الباقة',
                        save: 'حفظ',
                        cancel: 'إلغاء',
                        delete: 'حذف',
                        confirmDelete: 'هل أنت متأكد من حذف هذه الباقة؟',
                        deleteWarning: 'سيتم حذف الباقة نهائياً ولا يمكن التراجع عن هذا الإجراء.',
                        enterPlanName: 'أدخل اسم الباقة',
                        enterPlanNameEn: 'أدخل اسم الباقة بالإنجليزية',
                        enterPrice: 'أدخل السعر',
                        enterDescription: 'أدخل وصف الباقة',
                        enterFeature: 'أدخل الميزة',
                        subscribers: 'المشتركين',
                        revenue: 'الإيرادات',
                        createdAt: 'تاريخ الإنشاء',
                        active: 'نشطة',
                        inactive: 'غير نشطة'
                    }
                }
            };

            const currentContent = content[isArabic ? 'ar' : 'en'] || content.ar;

            // CRUD Functions
            const handleCreatePlan = () => {
                setFormData({
                    name: '',
                    nameEn: '',
                    description: '',
                    price: '',
                    currency: 'دينار عراقي',
                    billingCycle: 'شهرياً',
                    features: [''],
                    status: 'نشط'
                });
                setShowCreateModal(true);
            };

            const handleEditPlan = (plan) => {
                setSelectedPlan(plan);
                setFormData({
                    name: plan.name,
                    nameEn: plan.nameEn,
                    description: plan.description,
                    price: plan.price.replace(/,/g, ''),
                    currency: plan.currency,
                    billingCycle: plan.billingCycle,
                    features: [...plan.features],
                    status: plan.status
                });
                setShowEditModal(true);
            };

            const handleViewPlan = (plan) => {
                setSelectedPlan(plan);
                setShowViewModal(true);
            };

            const handleDeletePlan = (plan) => {
                setSelectedPlan(plan);
                setShowDeleteModal(true);
            };

            const handleDuplicatePlan = (plan) => {
                setFormData({
                    name: plan.name + ' - نسخة',
                    nameEn: plan.nameEn + ' - Copy',
                    description: plan.description,
                    price: plan.price.replace(/,/g, ''),
                    currency: plan.currency,
                    billingCycle: plan.billingCycle,
                    features: [...plan.features],
                    status: plan.status
                });
                setShowCreateModal(true);
            };

            const savePlan = () => {
                const planData = {
                    ...formData,
                    price: Number(formData.price).toLocaleString(),
                    subscribers: 0,
                    totalRevenue: '0',
                    color: 'bg-blue-500',
                    textColor: 'text-blue-700',
                    bgColor: 'bg-blue-50',
                    borderColor: 'border-blue-200'
                };

                if (showEditModal) {
                    // Edit existing plan
                    const updatedPlans = plans.map(plan =>
                        plan.id === selectedPlan.id
                            ? { ...plan, ...planData }
                            : plan
                    );
                    setPlans(updatedPlans);
                    alert('تم تحديث الباقة بنجاح!');
                } else {
                    // Create new plan
                    const newPlan = {
                        id: plans.length + 1,
                        ...planData
                    };
                    setPlans([...plans, newPlan]);
                    alert('تم إنشاء الباقة بنجاح!');
                }
                closeModals();
            };

            const confirmDelete = () => {
                const updatedPlans = plans.filter(plan => plan.id !== selectedPlan.id);
                setPlans(updatedPlans);
                closeModals();
                alert('تم حذف الباقة بنجاح!');
            };

            const closeModals = () => {
                setShowCreateModal(false);
                setShowEditModal(false);
                setShowViewModal(false);
                setShowDeleteModal(false);
                setSelectedPlan(null);
            };

            const addFeature = () => {
                setFormData({
                    ...formData,
                    features: [...formData.features, '']
                });
            };

            const removeFeature = (index) => {
                const newFeatures = formData.features.filter((_, i) => i !== index);
                setFormData({
                    ...formData,
                    features: newFeatures.length > 0 ? newFeatures : ['']
                });
            };

            const updateFeature = (index, value) => {
                const newFeatures = [...formData.features];
                newFeatures[index] = value;
                setFormData({
                    ...formData,
                    features: newFeatures
                });
            };

            // Filter plans
            const filteredPlans = plans.filter(plan => {
                const matchesSearch = plan.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                    plan.description.toLowerCase().includes(searchTerm.toLowerCase());
                const matchesStatus = statusFilter === 'all' || plan.status === statusFilter;
                return matchesSearch && matchesStatus;
            });

            // Calculate stats
            const totalSubscribers = plans.reduce((sum, plan) => sum + plan.subscribers, 0);
            const totalRevenue = plans.reduce((sum, plan) => {
                return sum + parseInt(plan.totalRevenue.replace(/,/g, ''));
            }, 0);

            const stats = [
                {
                    title: currentContent.totalPlans,
                    value: plans.length.toString(),
                    icon: '📋',
                    color: 'bg-blue-500'
                },
                {
                    title: currentContent.activePlans,
                    value: plans.filter(p => p.status === 'نشط').length.toString(),
                    icon: '✅',
                    color: 'bg-green-500'
                },
                {
                    title: currentContent.totalSubscribers,
                    value: totalSubscribers.toString(),
                    icon: '👥',
                    color: 'bg-purple-500'
                },
                {
                    title: currentContent.monthlyRevenue,
                    value: totalRevenue.toLocaleString() + ' د.ع',
                    icon: '💰',
                    color: 'bg-orange-500'
                }
            ];

            const getStatusColor = (status) => {
                switch (status) {
                    case 'نشط': return 'bg-green-100 text-green-800';
                    case 'معلق': return 'bg-yellow-100 text-yellow-800';
                    case 'غير نشط': return 'bg-red-100 text-red-800';
                    default: return 'bg-gray-100 text-gray-800';
                }
            };

            return React.createElement('div', {
                className: 'plans-screen space-y-4 sm:space-y-6'
            }, [
                // Page Header
                React.createElement('div', {
                    key: 'header',
                    className: 'flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4'
                }, [
                    React.createElement('div', { key: 'title-section' }, [
                        React.createElement('h1', {
                            key: 'title',
                            className: 'text-2xl sm:text-3xl font-bold text-gray-900'
                        }, currentContent.title),
                        React.createElement('p', {
                            key: 'subtitle',
                            className: 'text-sm sm:text-base text-gray-600 mt-1'
                        }, currentContent.subtitle)
                    ]),
                    React.createElement('button', {
                        key: 'create-button',
                        onClick: handleCreatePlan,
                        className: 'w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center gap-2'
                    }, [
                        React.createElement('span', { key: 'icon' }, '➕'),
                        React.createElement('span', { key: 'text' }, currentContent.createPlan)
                    ])
                ]),

                // Stats Grid
                React.createElement('div', {
                    key: 'stats',
                    className: 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4'
                }, stats.map((stat, index) =>
                    React.createElement('div', {
                        key: index,
                        className: 'bg-white rounded-lg sm:rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6'
                    }, [
                        React.createElement('div', {
                            key: 'stat-content',
                            className: 'flex items-center justify-between'
                        }, [
                            React.createElement('div', { key: 'text' }, [
                                React.createElement('p', {
                                    key: 'title',
                                    className: 'text-xs sm:text-sm font-medium text-gray-600 mb-1'
                                }, stat.title),
                                React.createElement('p', {
                                    key: 'value',
                                    className: 'text-lg sm:text-xl font-bold text-gray-900'
                                }, stat.value)
                            ]),
                            React.createElement('div', {
                                key: 'icon',
                                className: `${stat.color} text-white p-2 sm:p-3 rounded-lg text-base sm:text-lg`
                            }, stat.icon)
                        ])
                    ])
                )),

                // Filters Section
                React.createElement('div', {
                    key: 'filters',
                    className: 'bg-white rounded-lg sm:rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6'
                }, [
                    React.createElement('div', {
                        key: 'filters-content',
                        className: 'flex flex-col sm:flex-row gap-4'
                    }, [
                        // Search Input
                        React.createElement('div', {
                            key: 'search',
                            className: 'flex-1'
                        }, [
                            React.createElement('div', {
                                className: 'relative'
                            }, [
                                React.createElement('input', {
                                    key: 'search-input',
                                    type: 'text',
                                    placeholder: currentContent.search,
                                    value: searchTerm,
                                    onChange: (e) => setSearchTerm(e.target.value),
                                    className: 'w-full pl-10 pr-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base'
                                }),
                                React.createElement('svg', {
                                    key: 'search-icon',
                                    className: 'absolute left-3 top-2.5 sm:top-3.5 h-4 w-4 sm:h-5 sm:w-5 text-gray-400',
                                    fill: 'none',
                                    stroke: 'currentColor',
                                    viewBox: '0 0 24 24'
                                }, React.createElement('path', {
                                    strokeLinecap: 'round',
                                    strokeLinejoin: 'round',
                                    strokeWidth: 2,
                                    d: 'M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
                                }))
                            ])
                        ]),
                        // Status Filter
                        React.createElement('div', {
                            key: 'status-filter',
                            className: 'w-full sm:w-48'
                        }, [
                            React.createElement('select', {
                                key: 'status-select',
                                value: statusFilter,
                                onChange: (e) => setStatusFilter(e.target.value),
                                className: 'w-full px-3 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base'
                            }, [
                                React.createElement('option', { key: 'all', value: 'all' }, currentContent.allStatus),
                                React.createElement('option', { key: 'active', value: 'نشط' }, currentContent.active),
                                React.createElement('option', { key: 'suspended', value: 'معلق' }, currentContent.suspended),
                                React.createElement('option', { key: 'inactive', value: 'غير نشط' }, currentContent.inactive)
                            ])
                        ])
                    ])
                ]),

                // Plans Grid
                React.createElement('div', {
                    key: 'plans-grid',
                    className: 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6'
                }, filteredPlans.length > 0 ? filteredPlans.map(plan =>
                    React.createElement('div', {
                        key: plan.id,
                        className: `relative bg-white rounded-lg sm:rounded-xl shadow-sm border-2 ${plan.borderColor} hover:shadow-lg transition-all duration-200 overflow-hidden`
                    }, [
                        // Plan Badge (if most popular)
                        plan.subscribers >= 10 && React.createElement('div', {
                            key: 'badge',
                            className: `absolute top-0 right-0 ${plan.color} text-white px-3 py-1 text-xs font-semibold rounded-bl-lg`
                        }, currentContent.mostPopular),

                        // Plan Header
                        React.createElement('div', {
                            key: 'plan-header',
                            className: `${plan.bgColor} p-4 sm:p-6 text-center`
                        }, [
                            React.createElement('div', {
                                key: 'plan-icon',
                                className: `w-12 h-12 sm:w-16 sm:h-16 ${plan.color} text-white rounded-full flex items-center justify-center mx-auto mb-3`
                            }, [
                                React.createElement('span', {
                                    className: 'text-lg sm:text-2xl'
                                }, plan.id === 1 ? '🥉' : plan.id === 2 ? '🥈' : plan.id === 3 ? '🥇' : '💎')
                            ]),
                            React.createElement('h3', {
                                key: 'plan-name',
                                className: `text-lg sm:text-xl font-bold ${plan.textColor} mb-2`
                            }, plan.name),
                            React.createElement('p', {
                                key: 'plan-description',
                                className: 'text-sm text-gray-600'
                            }, plan.description)
                        ]),

                        // Plan Pricing
                        React.createElement('div', {
                            key: 'plan-pricing',
                            className: 'p-4 sm:p-6 text-center border-b border-gray-100'
                        }, [
                            React.createElement('div', {
                                key: 'price-display',
                                className: 'mb-2'
                            }, [
                                plan.price === 'حسب الطلب' ?
                                React.createElement('span', {
                                    className: 'text-2xl sm:text-3xl font-bold text-gray-900'
                                }, currentContent.customPricing) :
                                [
                                    React.createElement('span', {
                                        key: 'price',
                                        className: 'text-2xl sm:text-3xl font-bold text-gray-900'
                                    }, plan.price.toLocaleString()),
                                    React.createElement('span', {
                                        key: 'currency',
                                        className: 'text-sm text-gray-500 mr-1'
                                    }, ' د.ع'),
                                    React.createElement('span', {
                                        key: 'period',
                                        className: 'text-sm text-gray-500'
                                    }, currentContent.perMonth)
                                ]
                            ]),
                            React.createElement('span', {
                                key: 'billing-cycle',
                                className: `inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(plan.status)}`
                            }, plan.status)
                        ]),

                        // Plan Features
                        React.createElement('div', {
                            key: 'plan-features',
                            className: 'p-4 sm:p-6'
                        }, [
                            React.createElement('h4', {
                                key: 'features-title',
                                className: 'text-sm font-semibold text-gray-900 mb-3'
                            }, currentContent.features + ':'),
                            React.createElement('ul', {
                                key: 'features-list',
                                className: 'space-y-2'
                            }, plan.features.map((feature, index) =>
                                React.createElement('li', {
                                    key: index,
                                    className: 'flex items-center text-sm text-gray-600'
                                }, [
                                    React.createElement('svg', {
                                        key: 'check-icon',
                                        className: 'w-4 h-4 text-green-500 ml-2 flex-shrink-0',
                                        fill: 'none',
                                        stroke: 'currentColor',
                                        viewBox: '0 0 24 24'
                                    }, React.createElement('path', {
                                        strokeLinecap: 'round',
                                        strokeLinejoin: 'round',
                                        strokeWidth: 2,
                                        d: 'M5 13l4 4L19 7'
                                    })),
                                    React.createElement('span', { key: 'feature-text' }, feature)
                                ])
                            ))
                        ]),

                        // Plan Stats
                        React.createElement('div', {
                            key: 'plan-stats',
                            className: 'p-4 sm:p-6 bg-gray-50 border-t border-gray-100'
                        }, [
                            React.createElement('div', {
                                key: 'stats-grid',
                                className: 'grid grid-cols-2 gap-4 text-center'
                            }, [
                                React.createElement('div', { key: 'subscribers-stat' }, [
                                    React.createElement('div', {
                                        key: 'subscribers-count',
                                        className: 'text-lg font-bold text-gray-900'
                                    }, plan.subscribers),
                                    React.createElement('div', {
                                        key: 'subscribers-label',
                                        className: 'text-xs text-gray-500'
                                    }, currentContent.subscribers)
                                ]),
                                React.createElement('div', { key: 'revenue-stat' }, [
                                    React.createElement('div', {
                                        key: 'revenue-amount',
                                        className: 'text-lg font-bold text-green-600'
                                    }, plan.totalRevenue.toLocaleString() + ' د.ع'),
                                    React.createElement('div', {
                                        key: 'revenue-label',
                                        className: 'text-xs text-gray-500'
                                    }, currentContent.revenue)
                                ])
                            ])
                        ]),

                        // Plan Actions
                        React.createElement('div', {
                            key: 'plan-actions',
                            className: 'p-4 sm:p-6 bg-white border-t border-gray-100'
                        }, [
                            React.createElement('div', {
                                key: 'actions-grid',
                                className: 'grid grid-cols-2 gap-2'
                            }, [
                                React.createElement('button', {
                                    key: 'edit-btn',
                                    onClick: () => handleEditPlan(plan),
                                    className: `w-full px-3 py-2 text-sm font-medium ${plan.textColor} ${plan.bgColor} border ${plan.borderColor} rounded-lg hover:bg-opacity-80 transition-colors`
                                }, currentContent.edit),
                                React.createElement('button', {
                                    key: 'clone-btn',
                                    onClick: () => handleDuplicatePlan(plan),
                                    className: 'w-full px-3 py-2 text-sm font-medium text-gray-700 bg-gray-50 border border-gray-200 rounded-lg hover:bg-gray-100 transition-colors'
                                }, currentContent.clone)
                            ]),
                            React.createElement('button', {
                                key: 'view-details',
                                onClick: () => handleViewPlan(plan),
                                className: 'w-full mt-2 px-3 py-2 text-sm font-medium text-blue-700 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 transition-colors'
                            }, currentContent.view + ' التفاصيل'),
                            React.createElement('button', {
                                key: 'delete-btn',
                                onClick: () => handleDeletePlan(plan),
                                className: 'w-full mt-2 px-3 py-2 text-sm font-medium text-red-700 bg-red-50 border border-red-200 rounded-lg hover:bg-red-100 transition-colors'
                            }, currentContent.delete)
                        ])
                    ])
                ) : React.createElement('div', {
                    key: 'no-results',
                    className: 'col-span-full text-center py-12'
                }, [
                    React.createElement('div', {
                        className: 'text-gray-400 text-4xl mb-4'
                    }, '📋'),
                    React.createElement('p', {
                        className: 'text-gray-500 text-lg'
                    }, currentContent.noResults)
                ])),

                // Create/Edit Plan Modal
                (showCreateModal || showEditModal) && React.createElement('div', {
                    className: 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50'
                }, [
                    React.createElement('div', {
                        className: 'bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto'
                    }, [
                        React.createElement('div', {
                            className: 'flex items-center justify-between p-6 border-b border-gray-200'
                        }, [
                            React.createElement('h3', {
                                className: 'text-lg font-semibold text-gray-900'
                            }, showEditModal ? currentContent.modals.editPlan : currentContent.modals.createPlan),
                            React.createElement('button', {
                                onClick: closeModals,
                                className: 'text-gray-400 hover:text-gray-600'
                            }, '✕')
                        ]),
                        React.createElement('div', {
                            className: 'p-6 space-y-6'
                        }, [
                            // Plan Name
                            React.createElement('div', {}, [
                                React.createElement('label', {
                                    className: 'block text-sm font-medium text-gray-700 mb-2'
                                }, currentContent.modals.planName),
                                React.createElement('input', {
                                    type: 'text',
                                    value: formData.name,
                                    onChange: (e) => setFormData({...formData, name: e.target.value}),
                                    placeholder: currentContent.modals.enterPlanName,
                                    className: 'w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                                })
                            ]),
                            // Plan Name English
                            React.createElement('div', {}, [
                                React.createElement('label', {
                                    className: 'block text-sm font-medium text-gray-700 mb-2'
                                }, currentContent.modals.planNameEn),
                                React.createElement('input', {
                                    type: 'text',
                                    value: formData.nameEn,
                                    onChange: (e) => setFormData({...formData, nameEn: e.target.value}),
                                    placeholder: currentContent.modals.enterPlanNameEn,
                                    className: 'w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                                })
                            ]),
                            // Price and Currency
                            React.createElement('div', {
                                className: 'grid grid-cols-2 gap-4'
                            }, [
                                React.createElement('div', {}, [
                                    React.createElement('label', {
                                        className: 'block text-sm font-medium text-gray-700 mb-2'
                                    }, currentContent.modals.planPrice),
                                    React.createElement('input', {
                                        type: 'number',
                                        value: formData.price,
                                        onChange: (e) => setFormData({...formData, price: e.target.value}),
                                        placeholder: currentContent.modals.enterPrice,
                                        className: 'w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                                    })
                                ]),
                                React.createElement('div', {}, [
                                    React.createElement('label', {
                                        className: 'block text-sm font-medium text-gray-700 mb-2'
                                    }, currentContent.modals.currency),
                                    React.createElement('select', {
                                        value: formData.currency,
                                        onChange: (e) => setFormData({...formData, currency: e.target.value}),
                                        className: 'w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                                    }, [
                                        React.createElement('option', { value: 'دينار عراقي' }, 'دينار عراقي'),
                                        React.createElement('option', { value: 'دولار أمريكي' }, 'دولار أمريكي')
                                    ])
                                ])
                            ]),
                            // Billing Cycle
                            React.createElement('div', {}, [
                                React.createElement('label', {
                                    className: 'block text-sm font-medium text-gray-700 mb-2'
                                }, currentContent.modals.billingPeriod),
                                React.createElement('select', {
                                    value: formData.billingCycle,
                                    onChange: (e) => setFormData({...formData, billingCycle: e.target.value}),
                                    className: 'w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                                }, [
                                    React.createElement('option', { value: 'شهرياً' }, currentContent.modals.monthly),
                                    React.createElement('option', { value: 'سنوياً' }, currentContent.modals.yearly)
                                ])
                            ]),
                            // Description
                            React.createElement('div', {}, [
                                React.createElement('label', {
                                    className: 'block text-sm font-medium text-gray-700 mb-2'
                                }, currentContent.modals.planDescription),
                                React.createElement('textarea', {
                                    value: formData.description,
                                    onChange: (e) => setFormData({...formData, description: e.target.value}),
                                    placeholder: currentContent.modals.enterDescription,
                                    rows: 3,
                                    className: 'w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                                })
                            ]),
                            // Features
                            React.createElement('div', {}, [
                                React.createElement('div', {
                                    className: 'flex items-center justify-between mb-3'
                                }, [
                                    React.createElement('label', {
                                        className: 'block text-sm font-medium text-gray-700'
                                    }, currentContent.modals.planFeatures),
                                    React.createElement('button', {
                                        onClick: addFeature,
                                        className: 'text-blue-600 hover:text-blue-700 text-sm font-medium'
                                    }, '+ ' + currentContent.modals.addFeature)
                                ]),
                                React.createElement('div', {
                                    className: 'space-y-2'
                                }, formData.features.map((feature, index) =>
                                    React.createElement('div', {
                                        key: index,
                                        className: 'flex items-center space-x-2 space-x-reverse'
                                    }, [
                                        React.createElement('input', {
                                            type: 'text',
                                            value: feature,
                                            onChange: (e) => updateFeature(index, e.target.value),
                                            placeholder: currentContent.modals.enterFeature,
                                            className: 'flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                                        }),
                                        formData.features.length > 1 && React.createElement('button', {
                                            onClick: () => removeFeature(index),
                                            className: 'text-red-600 hover:text-red-700 p-2'
                                        }, '🗑️')
                                    ])
                                ))
                            ]),
                            // Status
                            React.createElement('div', {}, [
                                React.createElement('label', {
                                    className: 'block text-sm font-medium text-gray-700 mb-2'
                                }, currentContent.modals.planStatus),
                                React.createElement('select', {
                                    value: formData.status,
                                    onChange: (e) => setFormData({...formData, status: e.target.value}),
                                    className: 'w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                                }, [
                                    React.createElement('option', { value: 'نشط' }, currentContent.modals.active),
                                    React.createElement('option', { value: 'غير نشط' }, currentContent.modals.inactive)
                                ])
                            ])
                        ]),
                        React.createElement('div', {
                            className: 'flex gap-3 p-6 border-t border-gray-200'
                        }, [
                            React.createElement('button', {
                                onClick: savePlan,
                                className: 'flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors'
                            }, currentContent.modals.save),
                            React.createElement('button', {
                                onClick: closeModals,
                                className: 'flex-1 bg-gray-300 hover:bg-gray-400 text-gray-700 px-4 py-2 rounded-lg font-medium transition-colors'
                            }, currentContent.modals.cancel)
                        ])
                    ])
                ]),

                // View Plan Modal
                showViewModal && selectedPlan && React.createElement('div', {
                    className: 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50'
                }, [
                    React.createElement('div', {
                        className: 'bg-white rounded-lg max-w-lg w-full max-h-[90vh] overflow-y-auto'
                    }, [
                        React.createElement('div', {
                            className: 'flex items-center justify-between p-6 border-b border-gray-200'
                        }, [
                            React.createElement('h3', {
                                className: 'text-lg font-semibold text-gray-900'
                            }, currentContent.modals.viewPlan),
                            React.createElement('button', {
                                onClick: closeModals,
                                className: 'text-gray-400 hover:text-gray-600'
                            }, '✕')
                        ]),
                        React.createElement('div', {
                            className: 'p-6 space-y-4'
                        }, [
                            React.createElement('div', {
                                className: 'text-center pb-4 border-b border-gray-100'
                            }, [
                                React.createElement('h4', {
                                    className: 'text-2xl font-bold text-gray-900 mb-2'
                                }, selectedPlan.name),
                                React.createElement('div', {
                                    className: 'text-3xl font-bold text-blue-600 mb-2'
                                }, [
                                    selectedPlan.price + ' ' + selectedPlan.currency,
                                    React.createElement('span', {
                                        className: 'text-lg text-gray-500'
                                    }, '/' + selectedPlan.billingCycle)
                                ]),
                                React.createElement('p', {
                                    className: 'text-gray-600'
                                }, selectedPlan.description)
                            ]),
                            React.createElement('div', {
                                className: 'space-y-3'
                            }, [
                                React.createElement('div', {
                                    className: 'flex justify-between'
                                }, [
                                    React.createElement('span', {
                                        className: 'text-gray-500'
                                    }, currentContent.modals.subscribers + ':'),
                                    React.createElement('span', {
                                        className: 'text-gray-900 font-medium'
                                    }, selectedPlan.subscribers)
                                ]),
                                React.createElement('div', {
                                    className: 'flex justify-between'
                                }, [
                                    React.createElement('span', {
                                        className: 'text-gray-500'
                                    }, currentContent.modals.revenue + ':'),
                                    React.createElement('span', {
                                        className: 'text-gray-900 font-medium'
                                    }, selectedPlan.totalRevenue + ' د.ع')
                                ]),
                                React.createElement('div', {
                                    className: 'flex justify-between'
                                }, [
                                    React.createElement('span', {
                                        className: 'text-gray-500'
                                    }, currentContent.status + ':'),
                                    React.createElement('span', {
                                        className: 'text-green-600 font-medium'
                                    }, selectedPlan.status)
                                ])
                            ]),
                            React.createElement('div', {
                                className: 'pt-4 border-t border-gray-100'
                            }, [
                                React.createElement('h5', {
                                    className: 'font-medium text-gray-900 mb-3'
                                }, currentContent.modals.planFeatures + ':'),
                                React.createElement('ul', {
                                    className: 'space-y-2'
                                }, selectedPlan.features.map((feature, index) =>
                                    React.createElement('li', {
                                        key: index,
                                        className: 'flex items-center text-sm'
                                    }, [
                                        React.createElement('svg', {
                                            className: 'w-4 h-4 text-green-500 mr-2 flex-shrink-0',
                                            fill: 'none',
                                            stroke: 'currentColor',
                                            viewBox: '0 0 24 24'
                                        }, React.createElement('path', {
                                            strokeLinecap: 'round',
                                            strokeLinejoin: 'round',
                                            strokeWidth: 2,
                                            d: 'M5 13l4 4L19 7'
                                        })),
                                        feature
                                    ])
                                ))
                            ])
                        ]),
                        React.createElement('div', {
                            className: 'flex gap-3 p-6 border-t border-gray-200'
                        }, [
                            React.createElement('button', {
                                onClick: () => {
                                    closeModals();
                                    handleEditPlan(selectedPlan);
                                },
                                className: 'flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors'
                            }, currentContent.edit),
                            React.createElement('button', {
                                onClick: closeModals,
                                className: 'flex-1 bg-gray-300 hover:bg-gray-400 text-gray-700 px-4 py-2 rounded-lg font-medium transition-colors'
                            }, currentContent.modals.cancel)
                        ])
                    ])
                ]),

                // Delete Plan Modal
                showDeleteModal && selectedPlan && React.createElement('div', {
                    className: 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50'
                }, [
                    React.createElement('div', {
                        className: 'bg-white rounded-lg max-w-md w-full'
                    }, [
                        React.createElement('div', {
                            className: 'flex items-center justify-between p-6 border-b border-gray-200'
                        }, [
                            React.createElement('h3', {
                                className: 'text-lg font-semibold text-gray-900'
                            }, currentContent.modals.deletePlan),
                            React.createElement('button', {
                                onClick: closeModals,
                                className: 'text-gray-400 hover:text-gray-600'
                            }, '✕')
                        ]),
                        React.createElement('div', {
                            className: 'p-6'
                        }, [
                            React.createElement('div', {
                                className: 'text-center mb-4'
                            }, [
                                React.createElement('div', {
                                    className: 'mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4'
                                }, React.createElement('svg', {
                                    className: 'h-6 w-6 text-red-600',
                                    fill: 'none',
                                    stroke: 'currentColor',
                                    viewBox: '0 0 24 24'
                                }, React.createElement('path', {
                                    strokeLinecap: 'round',
                                    strokeLinejoin: 'round',
                                    strokeWidth: 2,
                                    d: 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z'
                                }))),
                                React.createElement('h4', {
                                    className: 'text-lg font-medium text-gray-900 mb-2'
                                }, currentContent.modals.confirmDelete),
                                React.createElement('p', {
                                    className: 'text-sm text-gray-500 mb-4'
                                }, currentContent.modals.deleteWarning),
                                React.createElement('p', {
                                    className: 'font-medium text-gray-900'
                                }, 'باقة: ' + selectedPlan.name)
                            ])
                        ]),
                        React.createElement('div', {
                            className: 'flex gap-3 p-6 border-t border-gray-200'
                        }, [
                            React.createElement('button', {
                                onClick: confirmDelete,
                                className: 'flex-1 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium transition-colors'
                            }, currentContent.modals.delete),
                            React.createElement('button', {
                                onClick: closeModals,
                                className: 'flex-1 bg-gray-300 hover:bg-gray-400 text-gray-700 px-4 py-2 rounded-lg font-medium transition-colors'
                            }, currentContent.modals.cancel)
                        ])
                    ])
                ])
            ]);
        };

        // EmployeesScreen Component
        const EmployeesScreen = ({ isArabic }) => {
            const [employees, setEmployees] = useState([
                {
                    id: 1,
                    name: 'سارة أحمد البغدادي',
                    email: 'sara.albaghdadi@salesflow.com',
                    phone: '+964770123456',
                    position: 'مدير عام',
                    department: 'الإدارة',
                    role: 'admin',
                    status: 'نشط',
                    joinDate: '2023-01-15',
                    salary: '2,500,000 دينار',
                    avatar: 'https://ui-avatars.com/api/?name=Sara+Albaghdadi&background=3b82f6&color=white',
                    permissions: ['عرض', 'تعديل', 'حذف', 'إدارة']
                },
                {
                    id: 2,
                    name: 'محمد علي النجفي',
                    email: 'mohamed.alnajafi@salesflow.com',
                    phone: '+964781234567',
                    position: 'مدير المبيعات',
                    department: 'المبيعات',
                    role: 'manager',
                    status: 'نشط',
                    joinDate: '2023-02-20',
                    salary: '1,800,000 دينار',
                    avatar: 'https://ui-avatars.com/api/?name=Mohamed+Alnajafi&background=10b981&color=white',
                    permissions: ['عرض', 'تعديل', 'إدارة فريق']
                },
                {
                    id: 3,
                    name: 'ليلى خالد الموصلي',
                    email: 'layla.almosuli@salesflow.com',
                    phone: '+964790345678',
                    position: 'أخصائي دعم فني',
                    department: 'الدعم الفني',
                    role: 'support',
                    status: 'نشط',
                    joinDate: '2023-03-10',
                    salary: '1,200,000 دينار',
                    avatar: 'https://ui-avatars.com/api/?name=Layla+Almosuli&background=f59e0b&color=white',
                    permissions: ['عرض', 'دعم العملاء']
                },
                {
                    id: 4,
                    name: 'أحمد حسن الكربلائي',
                    email: 'ahmed.karbalaee@salesflow.com',
                    phone: '+964750987654',
                    position: 'مطور برمجيات',
                    department: 'التطوير',
                    role: 'developer',
                    status: 'نشط',
                    joinDate: '2023-04-05',
                    salary: '1,500,000 دينار',
                    avatar: 'https://ui-avatars.com/api/?name=Ahmed+Karbalaee&background=8b5cf6&color=white',
                    permissions: ['عرض', 'تطوير', 'صيانة']
                },
                {
                    id: 5,
                    name: 'فاطمة عبد الله البصري',
                    email: 'fatma.albasri@salesflow.com',
                    phone: '+964760456789',
                    position: 'محاسب',
                    department: 'المالية',
                    role: 'accountant',
                    status: 'إجازة',
                    joinDate: '2023-05-12',
                    salary: '1,300,000 دينار',
                    avatar: 'https://ui-avatars.com/api/?name=Fatma+Albasri&background=ef4444&color=white',
                    permissions: ['عرض', 'محاسبة', 'تقارير']
                },
                {
                    id: 6,
                    name: 'عمر صالح التكريتي',
                    email: 'omar.altikriti@salesflow.com',
                    phone: '+964771567890',
                    position: 'مصمم جرافيك',
                    department: 'التسويق',
                    role: 'designer',
                    status: 'معلق',
                    joinDate: '2023-06-18',
                    salary: '1,100,000 دينار',
                    avatar: 'https://ui-avatars.com/api/?name=Omar+Altikriti&background=06b6d4&color=white',
                    permissions: ['عرض', 'تصميم', 'إنتاج المحتوى']
                }
            ]);

            const [searchTerm, setSearchTerm] = useState('');
            const [departmentFilter, setDepartmentFilter] = useState('all');
            const [statusFilter, setStatusFilter] = useState('all');
            const [roleFilter, setRoleFilter] = useState('all');
            const [showAddModal, setShowAddModal] = useState(false);
            const [showEditModal, setShowEditModal] = useState(false);
            const [showViewModal, setShowViewModal] = useState(false);
            const [showDeleteModal, setShowDeleteModal] = useState(false);
            const [selectedEmployee, setSelectedEmployee] = useState(null);
            const [formData, setFormData] = useState({
                name: '',
                email: '',
                phone: '',
                position: '',
                department: 'المبيعات',
                role: 'employee',
                status: 'نشط',
                salary: '',
                permissions: []
            });

            const content = {
                ar: {
                    title: 'إدارة الموظفين',
                    subtitle: 'عرض وإدارة فريق العمل',
                    search: 'البحث عن موظف...',
                    addEmployee: 'إضافة موظف جديد',
                    allDepartments: 'جميع الأقسام',
                    allStatus: 'جميع الحالات',
                    allRoles: 'جميع الأدوار',
                    active: 'نشط',
                    onLeave: 'إجازة',
                    suspended: 'معلق',
                    inactive: 'غير نشط',
                    admin: 'مدير',
                    manager: 'مشرف',
                    employee: 'موظف',
                    support: 'دعم فني',
                    developer: 'مطور',
                    accountant: 'محاسب',
                    designer: 'مصمم',
                    name: 'الاسم',
                    email: 'البريد الإلكتروني',
                    phone: 'الهاتف',
                    position: 'المنصب',
                    department: 'القسم',
                    role: 'الدور',
                    status: 'الحالة',
                    salary: 'الراتب',
                    joinDate: 'تاريخ الانضمام',
                    permissions: 'الصلاحيات',
                    actions: 'الإجراءات',
                    edit: 'تعديل',
                    delete: 'حذف',
                    view: 'عرض',
                    activate: 'تفعيل',
                    suspend: 'تعليق',
                    noResults: 'لا توجد نتائج للبحث',
                    totalEmployees: 'إجمالي الموظفين',
                    activeEmployees: 'الموظفين النشطين',
                    onLeaveEmployees: 'في إجازة',
                    suspendedEmployees: 'معلقين',
                    totalSalaries: 'إجمالي الرواتب',
                    management: 'الإدارة',
                    sales: 'المبيعات',
                    support: 'الدعم الفني',
                    development: 'التطوير',
                    finance: 'المالية',
                    marketing: 'التسويق',
                    modals: {
                        addEmployee: 'إضافة موظف جديد',
                        editEmployee: 'تعديل بيانات الموظف',
                        viewEmployee: 'عرض تفاصيل الموظف',
                        deleteEmployee: 'حذف الموظف',
                        employeeName: 'اسم الموظف',
                        employeeEmail: 'البريد الإلكتروني',
                        employeePhone: 'رقم الهاتف',
                        employeePosition: 'المنصب',
                        employeeDepartment: 'القسم',
                        employeeRole: 'الدور',
                        employeeStatus: 'الحالة',
                        employeeSalary: 'الراتب',
                        employeePermissions: 'الصلاحيات',
                        addPermission: 'إضافة صلاحية',
                        removePermission: 'حذف الصلاحية',
                        save: 'حفظ',
                        cancel: 'إلغاء',
                        delete: 'حذف',
                        confirmDelete: 'هل أنت متأكد من حذف هذا الموظف؟',
                        deleteWarning: 'سيتم حذف الموظف نهائياً ولا يمكن التراجع عن هذا الإجراء.',
                        enterName: 'أدخل اسم الموظف',
                        enterEmail: 'أدخل البريد الإلكتروني',
                        enterPhone: 'أدخل رقم الهاتف',
                        enterPosition: 'أدخل المنصب',
                        enterSalary: 'أدخل الراتب',
                        enterPermission: 'أدخل الصلاحية',
                        joinDate: 'تاريخ الانضمام',
                        employeeDetails: 'تفاصيل الموظف',
                        contactInfo: 'معلومات الاتصال',
                        workInfo: 'معلومات العمل'
                    }
                }
            };

            const currentContent = content[isArabic ? 'ar' : 'en'] || content.ar;

            // CRUD Functions
            const handleAddEmployee = () => {
                setFormData({
                    name: '',
                    email: '',
                    phone: '',
                    position: '',
                    department: 'المبيعات',
                    role: 'employee',
                    status: 'نشط',
                    salary: '',
                    permissions: []
                });
                setShowAddModal(true);
            };

            const handleEditEmployee = (employee) => {
                setSelectedEmployee(employee);
                setFormData({
                    name: employee.name,
                    email: employee.email,
                    phone: employee.phone,
                    position: employee.position,
                    department: employee.department,
                    role: employee.role,
                    status: employee.status,
                    salary: employee.salary.replace(' دينار', ''),
                    permissions: [...employee.permissions]
                });
                setShowEditModal(true);
            };

            const handleViewEmployee = (employee) => {
                setSelectedEmployee(employee);
                setShowViewModal(true);
            };

            const handleDeleteEmployee = (employee) => {
                setSelectedEmployee(employee);
                setShowDeleteModal(true);
            };

            const saveEmployee = () => {
                if (showEditModal) {
                    // Edit existing employee
                    const updatedEmployees = employees.map(emp =>
                        emp.id === selectedEmployee.id
                            ? {
                                ...emp,
                                ...formData,
                                salary: formData.salary + ' دينار',
                                avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(formData.name)}&background=3b82f6&color=white`
                            }
                            : emp
                    );
                    setEmployees(updatedEmployees);
                    alert('تم تحديث بيانات الموظف بنجاح!');
                } else {
                    // Add new employee
                    const newEmployee = {
                        id: employees.length + 1,
                        ...formData,
                        salary: formData.salary + ' دينار',
                        joinDate: new Date().toISOString().split('T')[0],
                        avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(formData.name)}&background=3b82f6&color=white`
                    };
                    setEmployees([...employees, newEmployee]);
                    alert('تم إضافة الموظف بنجاح!');
                }
                closeModals();
            };

            const confirmDelete = () => {
                const updatedEmployees = employees.filter(emp => emp.id !== selectedEmployee.id);
                setEmployees(updatedEmployees);
                closeModals();
                alert('تم حذف الموظف بنجاح!');
            };

            const closeModals = () => {
                setShowAddModal(false);
                setShowEditModal(false);
                setShowViewModal(false);
                setShowDeleteModal(false);
                setSelectedEmployee(null);
            };

            const addPermission = () => {
                setFormData({
                    ...formData,
                    permissions: [...formData.permissions, '']
                });
            };

            const removePermission = (index) => {
                const newPermissions = formData.permissions.filter((_, i) => i !== index);
                setFormData({
                    ...formData,
                    permissions: newPermissions
                });
            };

            const updatePermission = (index, value) => {
                const newPermissions = [...formData.permissions];
                newPermissions[index] = value;
                setFormData({
                    ...formData,
                    permissions: newPermissions
                });
            };

            // Filter employees
            const filteredEmployees = employees.filter(employee => {
                const matchesSearch = employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                    employee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                    employee.position.toLowerCase().includes(searchTerm.toLowerCase());
                const matchesDepartment = departmentFilter === 'all' || employee.department === departmentFilter;
                const matchesStatus = statusFilter === 'all' || employee.status === statusFilter;
                const matchesRole = roleFilter === 'all' || employee.role === roleFilter;
                return matchesSearch && matchesDepartment && matchesStatus && matchesRole;
            });

            // Calculate stats
            const totalSalaries = employees.reduce((sum, emp) => {
                return sum + parseInt(emp.salary.replace(/[^0-9]/g, ''));
            }, 0);

            const stats = [
                {
                    title: currentContent.totalEmployees,
                    value: employees.length.toString(),
                    icon: '👥',
                    color: 'bg-blue-500'
                },
                {
                    title: currentContent.activeEmployees,
                    value: employees.filter(e => e.status === 'نشط').length.toString(),
                    icon: '✅',
                    color: 'bg-green-500'
                },
                {
                    title: currentContent.onLeaveEmployees,
                    value: employees.filter(e => e.status === 'إجازة').length.toString(),
                    icon: '🏖️',
                    color: 'bg-yellow-500'
                },
                {
                    title: currentContent.suspendedEmployees,
                    value: employees.filter(e => e.status === 'معلق').length.toString(),
                    icon: '⏸️',
                    color: 'bg-red-500'
                },
                {
                    title: currentContent.totalSalaries,
                    value: (totalSalaries / 1000000).toFixed(1) + 'M د.ع',
                    icon: '💰',
                    color: 'bg-purple-500'
                }
            ];

            const getStatusColor = (status) => {
                switch (status) {
                    case 'نشط': return 'bg-green-100 text-green-800';
                    case 'إجازة': return 'bg-yellow-100 text-yellow-800';
                    case 'معلق': return 'bg-red-100 text-red-800';
                    case 'غير نشط': return 'bg-gray-100 text-gray-800';
                    default: return 'bg-gray-100 text-gray-800';
                }
            };

            const getRoleColor = (role) => {
                switch (role) {
                    case 'admin': return 'bg-purple-100 text-purple-800';
                    case 'manager': return 'bg-blue-100 text-blue-800';
                    case 'support': return 'bg-green-100 text-green-800';
                    case 'developer': return 'bg-indigo-100 text-indigo-800';
                    case 'accountant': return 'bg-orange-100 text-orange-800';
                    case 'designer': return 'bg-pink-100 text-pink-800';
                    default: return 'bg-gray-100 text-gray-800';
                }
            };

            const getDepartmentIcon = (department) => {
                switch (department) {
                    case 'الإدارة': return '🏢';
                    case 'المبيعات': return '📈';
                    case 'الدعم الفني': return '🛠️';
                    case 'التطوير': return '💻';
                    case 'المالية': return '💰';
                    case 'التسويق': return '📊';
                    default: return '👤';
                }
            };

            return React.createElement('div', {
                className: 'employees-screen space-y-4 sm:space-y-6'
            }, [
                // Page Header
                React.createElement('div', {
                    key: 'header',
                    className: 'flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4'
                }, [
                    React.createElement('div', { key: 'title-section' }, [
                        React.createElement('h1', {
                            key: 'title',
                            className: 'text-2xl sm:text-3xl font-bold text-gray-900'
                        }, currentContent.title),
                        React.createElement('p', {
                            key: 'subtitle',
                            className: 'text-sm sm:text-base text-gray-600 mt-1'
                        }, currentContent.subtitle)
                    ]),
                    React.createElement('button', {
                        key: 'add-button',
                        onClick: handleAddEmployee,
                        className: 'w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center gap-2'
                    }, [
                        React.createElement('span', { key: 'icon' }, '➕'),
                        React.createElement('span', { key: 'text' }, currentContent.addEmployee)
                    ])
                ]),

                // Stats Grid
                React.createElement('div', {
                    key: 'stats',
                    className: 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4'
                }, stats.map((stat, index) =>
                    React.createElement('div', {
                        key: index,
                        className: 'bg-white rounded-lg sm:rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6'
                    }, [
                        React.createElement('div', {
                            key: 'stat-content',
                            className: 'flex items-center justify-between'
                        }, [
                            React.createElement('div', { key: 'text' }, [
                                React.createElement('p', {
                                    key: 'title',
                                    className: 'text-xs sm:text-sm font-medium text-gray-600 mb-1'
                                }, stat.title),
                                React.createElement('p', {
                                    key: 'value',
                                    className: 'text-lg sm:text-xl font-bold text-gray-900'
                                }, stat.value)
                            ]),
                            React.createElement('div', {
                                key: 'icon',
                                className: `${stat.color} text-white p-2 sm:p-3 rounded-lg text-base sm:text-lg`
                            }, stat.icon)
                        ])
                    ])
                )),

                // Filters Section
                React.createElement('div', {
                    key: 'filters',
                    className: 'bg-white rounded-lg sm:rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6'
                }, [
                    React.createElement('div', {
                        key: 'filters-content',
                        className: 'flex flex-col xl:flex-row gap-4'
                    }, [
                        // Search Input
                        React.createElement('div', {
                            key: 'search',
                            className: 'flex-1'
                        }, [
                            React.createElement('div', {
                                className: 'relative'
                            }, [
                                React.createElement('input', {
                                    key: 'search-input',
                                    type: 'text',
                                    placeholder: currentContent.search,
                                    value: searchTerm,
                                    onChange: (e) => setSearchTerm(e.target.value),
                                    className: 'w-full pl-10 pr-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base'
                                }),
                                React.createElement('svg', {
                                    key: 'search-icon',
                                    className: 'absolute left-3 top-2.5 sm:top-3.5 h-4 w-4 sm:h-5 sm:w-5 text-gray-400',
                                    fill: 'none',
                                    stroke: 'currentColor',
                                    viewBox: '0 0 24 24'
                                }, React.createElement('path', {
                                    strokeLinecap: 'round',
                                    strokeLinejoin: 'round',
                                    strokeWidth: 2,
                                    d: 'M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
                                }))
                            ])
                        ]),
                        // Department Filter
                        React.createElement('div', {
                            key: 'department-filter',
                            className: 'w-full xl:w-48'
                        }, [
                            React.createElement('select', {
                                key: 'department-select',
                                value: departmentFilter,
                                onChange: (e) => setDepartmentFilter(e.target.value),
                                className: 'w-full px-3 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base'
                            }, [
                                React.createElement('option', { key: 'all-dept', value: 'all' }, currentContent.allDepartments),
                                React.createElement('option', { key: 'management', value: 'الإدارة' }, currentContent.management),
                                React.createElement('option', { key: 'sales', value: 'المبيعات' }, currentContent.sales),
                                React.createElement('option', { key: 'support', value: 'الدعم الفني' }, currentContent.support),
                                React.createElement('option', { key: 'development', value: 'التطوير' }, currentContent.development),
                                React.createElement('option', { key: 'finance', value: 'المالية' }, currentContent.finance),
                                React.createElement('option', { key: 'marketing', value: 'التسويق' }, currentContent.marketing)
                            ])
                        ]),
                        // Status Filter
                        React.createElement('div', {
                            key: 'status-filter',
                            className: 'w-full xl:w-40'
                        }, [
                            React.createElement('select', {
                                key: 'status-select',
                                value: statusFilter,
                                onChange: (e) => setStatusFilter(e.target.value),
                                className: 'w-full px-3 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base'
                            }, [
                                React.createElement('option', { key: 'all-status', value: 'all' }, currentContent.allStatus),
                                React.createElement('option', { key: 'active', value: 'نشط' }, currentContent.active),
                                React.createElement('option', { key: 'leave', value: 'إجازة' }, currentContent.onLeave),
                                React.createElement('option', { key: 'suspended', value: 'معلق' }, currentContent.suspended)
                            ])
                        ]),
                        // Role Filter
                        React.createElement('div', {
                            key: 'role-filter',
                            className: 'w-full xl:w-40'
                        }, [
                            React.createElement('select', {
                                key: 'role-select',
                                value: roleFilter,
                                onChange: (e) => setRoleFilter(e.target.value),
                                className: 'w-full px-3 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base'
                            }, [
                                React.createElement('option', { key: 'all-roles', value: 'all' }, currentContent.allRoles),
                                React.createElement('option', { key: 'admin-role', value: 'admin' }, currentContent.admin),
                                React.createElement('option', { key: 'manager-role', value: 'manager' }, currentContent.manager),
                                React.createElement('option', { key: 'support-role', value: 'support' }, currentContent.support),
                                React.createElement('option', { key: 'developer-role', value: 'developer' }, currentContent.developer),
                                React.createElement('option', { key: 'accountant-role', value: 'accountant' }, currentContent.accountant),
                                React.createElement('option', { key: 'designer-role', value: 'designer' }, currentContent.designer)
                            ])
                        ])
                    ])
                ]),

                // Employees Table/Cards
                React.createElement('div', {
                    key: 'employees-container',
                    className: 'bg-white rounded-lg sm:rounded-xl shadow-sm border border-gray-200 overflow-hidden'
                }, [
                    // Desktop Table View (hidden on mobile/tablet)
                    React.createElement('div', {
                        key: 'desktop-table',
                        className: 'hidden xl:block overflow-x-auto'
                    }, [
                        React.createElement('table', {
                            className: 'min-w-full divide-y divide-gray-200'
                        }, [
                            React.createElement('thead', {
                                key: 'table-head',
                                className: 'bg-gray-50'
                            }, React.createElement('tr', {}, [
                                React.createElement('th', { key: 'name', className: 'px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider' }, currentContent.name),
                                React.createElement('th', { key: 'position', className: 'px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider' }, currentContent.position),
                                React.createElement('th', { key: 'department', className: 'px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider' }, currentContent.department),
                                React.createElement('th', { key: 'role', className: 'px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider' }, currentContent.role),
                                React.createElement('th', { key: 'status', className: 'px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider' }, currentContent.status),
                                React.createElement('th', { key: 'salary', className: 'px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider' }, currentContent.salary),
                                React.createElement('th', { key: 'actions', className: 'px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider' }, currentContent.actions)
                            ])),
                            React.createElement('tbody', {
                                key: 'table-body',
                                className: 'bg-white divide-y divide-gray-200'
                            }, filteredEmployees.map(employee =>
                                React.createElement('tr', {
                                    key: employee.id,
                                    className: 'hover:bg-gray-50 transition-colors'
                                }, [
                                    React.createElement('td', {
                                        key: 'name',
                                        className: 'px-6 py-4 whitespace-nowrap'
                                    }, [
                                        React.createElement('div', {
                                            className: 'flex items-center space-x-3 space-x-reverse'
                                        }, [
                                            React.createElement('img', {
                                                key: 'avatar',
                                                className: 'h-8 w-8 rounded-full',
                                                src: employee.avatar,
                                                alt: employee.name
                                            }),
                                            React.createElement('div', { key: 'name-info' }, [
                                                React.createElement('div', {
                                                    key: 'employee-name',
                                                    className: 'text-sm font-medium text-gray-900'
                                                }, employee.name),
                                                React.createElement('div', {
                                                    key: 'employee-email',
                                                    className: 'text-sm text-gray-500'
                                                }, employee.email)
                                            ])
                                        ])
                                    ]),
                                    React.createElement('td', {
                                        key: 'position',
                                        className: 'px-6 py-4 whitespace-nowrap text-sm text-gray-900'
                                    }, employee.position),
                                    React.createElement('td', {
                                        key: 'department',
                                        className: 'px-6 py-4 whitespace-nowrap'
                                    }, [
                                        React.createElement('div', {
                                            className: 'flex items-center space-x-2 space-x-reverse'
                                        }, [
                                            React.createElement('span', { key: 'dept-icon' }, getDepartmentIcon(employee.department)),
                                            React.createElement('span', { key: 'dept-name', className: 'text-sm text-gray-900' }, employee.department)
                                        ])
                                    ]),
                                    React.createElement('td', {
                                        key: 'role',
                                        className: 'px-6 py-4 whitespace-nowrap'
                                    }, React.createElement('span', {
                                        className: `inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getRoleColor(employee.role)}`
                                    }, currentContent[employee.role] || employee.role)),
                                    React.createElement('td', {
                                        key: 'status',
                                        className: 'px-6 py-4 whitespace-nowrap'
                                    }, React.createElement('span', {
                                        className: `inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(employee.status)}`
                                    }, employee.status)),
                                    React.createElement('td', {
                                        key: 'salary',
                                        className: 'px-6 py-4 whitespace-nowrap text-sm font-medium text-green-600'
                                    }, employee.salary),
                                    React.createElement('td', {
                                        key: 'actions',
                                        className: 'px-6 py-4 whitespace-nowrap text-sm font-medium'
                                    }, [
                                        React.createElement('div', {
                                            className: 'flex space-x-2 space-x-reverse'
                                        }, [
                                            React.createElement('button', {
                                                key: 'view',
                                                onClick: () => handleViewEmployee(employee),
                                                className: 'text-blue-600 hover:text-blue-900 transition-colors',
                                                title: currentContent.view
                                            }, '👁️'),
                                            React.createElement('button', {
                                                key: 'edit',
                                                onClick: () => handleEditEmployee(employee),
                                                className: 'text-green-600 hover:text-green-900 transition-colors',
                                                title: currentContent.edit
                                            }, '✏️'),
                                            React.createElement('button', {
                                                key: 'delete',
                                                onClick: () => handleDeleteEmployee(employee),
                                                className: 'text-red-600 hover:text-red-900 transition-colors',
                                                title: currentContent.delete
                                            }, '🗑️')
                                        ])
                                    ])
                                ])
                            ))
                        ])
                    ]),

                    // Mobile/Tablet Cards View
                    React.createElement('div', {
                        key: 'mobile-cards',
                        className: 'xl:hidden p-4 space-y-4'
                    }, filteredEmployees.length > 0 ? filteredEmployees.map(employee =>
                        React.createElement('div', {
                            key: employee.id,
                            className: 'border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow'
                        }, [
                            React.createElement('div', {
                                key: 'employee-header',
                                className: 'flex items-center justify-between mb-3'
                            }, [
                                React.createElement('div', {
                                    key: 'employee-info',
                                    className: 'flex items-center space-x-3 space-x-reverse'
                                }, [
                                    React.createElement('img', {
                                        key: 'avatar',
                                        className: 'h-12 w-12 rounded-full',
                                        src: employee.avatar,
                                        alt: employee.name
                                    }),
                                    React.createElement('div', { key: 'name-details' }, [
                                        React.createElement('h3', {
                                            key: 'name',
                                            className: 'text-sm font-medium text-gray-900'
                                        }, employee.name),
                                        React.createElement('p', {
                                            key: 'position',
                                            className: 'text-sm text-gray-600'
                                        }, employee.position),
                                        React.createElement('div', {
                                            key: 'dept-role',
                                            className: 'flex items-center space-x-2 space-x-reverse mt-1'
                                        }, [
                                            React.createElement('span', { key: 'dept-icon' }, getDepartmentIcon(employee.department)),
                                            React.createElement('span', { key: 'dept-name', className: 'text-xs text-gray-500' }, employee.department),
                                            React.createElement('span', {
                                                key: 'role-badge',
                                                className: `inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getRoleColor(employee.role)}`
                                            }, currentContent[employee.role] || employee.role)
                                        ])
                                    ])
                                ]),
                                React.createElement('div', {
                                    key: 'status-actions',
                                    className: 'flex flex-col items-end space-y-2'
                                }, [
                                    React.createElement('span', {
                                        key: 'status',
                                        className: `inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(employee.status)}`
                                    }, employee.status),
                                    React.createElement('div', {
                                        key: 'actions',
                                        className: 'flex space-x-1 space-x-reverse'
                                    }, [
                                        React.createElement('button', {
                                            key: 'view',
                                            onClick: () => handleViewEmployee(employee),
                                            className: 'p-1 text-blue-600 hover:bg-blue-50 rounded transition-colors',
                                            title: currentContent.view
                                        }, '👁️'),
                                        React.createElement('button', {
                                            key: 'edit',
                                            onClick: () => handleEditEmployee(employee),
                                            className: 'p-1 text-green-600 hover:bg-green-50 rounded transition-colors',
                                            title: currentContent.edit
                                        }, '✏️'),
                                        React.createElement('button', {
                                            key: 'delete',
                                            onClick: () => handleDeleteEmployee(employee),
                                            className: 'p-1 text-red-600 hover:bg-red-50 rounded transition-colors',
                                            title: currentContent.delete
                                        }, '🗑️')
                                    ])
                                ])
                            ]),
                            React.createElement('div', {
                                key: 'employee-details',
                                className: 'grid grid-cols-2 gap-3 text-sm pt-3 border-t border-gray-100'
                            }, [
                                React.createElement('div', {
                                    key: 'email',
                                    className: 'col-span-2'
                                }, [
                                    React.createElement('span', { className: 'text-gray-500' }, currentContent.email + ': '),
                                    React.createElement('span', { className: 'text-gray-900' }, employee.email)
                                ]),
                                React.createElement('div', {
                                    key: 'phone'
                                }, [
                                    React.createElement('span', { className: 'text-gray-500' }, currentContent.phone + ': '),
                                    React.createElement('span', { className: 'text-gray-900' }, employee.phone)
                                ]),
                                React.createElement('div', {
                                    key: 'salary'
                                }, [
                                    React.createElement('span', { className: 'text-gray-500' }, currentContent.salary + ': '),
                                    React.createElement('span', { className: 'text-green-600 font-medium' }, employee.salary)
                                ]),
                                React.createElement('div', {
                                    key: 'join-date',
                                    className: 'col-span-2'
                                }, [
                                    React.createElement('span', { className: 'text-gray-500' }, currentContent.joinDate + ': '),
                                    React.createElement('span', { className: 'text-gray-900' }, employee.joinDate)
                                ])
                            ])
                        ])
                    ) : React.createElement('div', {
                        className: 'text-center py-8 text-gray-500'
                    }, currentContent.noResults))
                ]),

                // Add/Edit Employee Modal
                (showAddModal || showEditModal) && React.createElement('div', {
                    key: 'employee-modal',
                    className: 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50'
                }, React.createElement('div', {
                    className: 'bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto'
                }, [
                    React.createElement('div', {
                        key: 'modal-header',
                        className: 'flex items-center justify-between p-6 border-b border-gray-200'
                    }, [
                        React.createElement('h3', {
                            className: 'text-lg font-semibold text-gray-900'
                        }, showEditModal ? currentContent.modals.editEmployee : currentContent.modals.addEmployee),
                        React.createElement('button', {
                            onClick: closeModals,
                            className: 'text-gray-400 hover:text-gray-600'
                        }, '✕')
                    ]),
                    React.createElement('div', {
                        key: 'modal-body',
                        className: 'p-6 space-y-6'
                    }, [
                        // Employee Name
                        React.createElement('div', {
                            key: 'name-field'
                        }, [
                            React.createElement('label', {
                                className: 'block text-sm font-medium text-gray-700 mb-2'
                            }, currentContent.modals.employeeName),
                            React.createElement('input', {
                                type: 'text',
                                value: formData.name,
                                onChange: (e) => setFormData({...formData, name: e.target.value}),
                                placeholder: currentContent.modals.enterName,
                                className: 'w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                            })
                        ]),

                        // Email and Phone
                        React.createElement('div', {
                            key: 'contact-fields',
                            className: 'grid grid-cols-2 gap-4'
                        }, [
                            React.createElement('div', {
                                key: 'email-field'
                            }, [
                                React.createElement('label', {
                                    className: 'block text-sm font-medium text-gray-700 mb-2'
                                }, currentContent.modals.employeeEmail),
                                React.createElement('input', {
                                    type: 'email',
                                    value: formData.email,
                                    onChange: (e) => setFormData({...formData, email: e.target.value}),
                                    placeholder: currentContent.modals.enterEmail,
                                    className: 'w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                                })
                            ]),
                            React.createElement('div', {
                                key: 'phone-field'
                            }, [
                                React.createElement('label', {
                                    className: 'block text-sm font-medium text-gray-700 mb-2'
                                }, currentContent.modals.employeePhone),
                                React.createElement('input', {
                                    type: 'tel',
                                    value: formData.phone,
                                    onChange: (e) => setFormData({...formData, phone: e.target.value}),
                                    placeholder: currentContent.modals.enterPhone,
                                    className: 'w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                                })
                            ])
                        ]),

                        // Position and Salary
                        React.createElement('div', {
                            key: 'job-fields',
                            className: 'grid grid-cols-2 gap-4'
                        }, [
                            React.createElement('div', {
                                key: 'position-field'
                            }, [
                                React.createElement('label', {
                                    className: 'block text-sm font-medium text-gray-700 mb-2'
                                }, currentContent.modals.employeePosition),
                                React.createElement('input', {
                                    type: 'text',
                                    value: formData.position,
                                    onChange: (e) => setFormData({...formData, position: e.target.value}),
                                    placeholder: currentContent.modals.enterPosition,
                                    className: 'w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                                })
                            ]),
                            React.createElement('div', {
                                key: 'salary-field'
                            }, [
                                React.createElement('label', {
                                    className: 'block text-sm font-medium text-gray-700 mb-2'
                                }, currentContent.modals.employeeSalary),
                                React.createElement('input', {
                                    type: 'text',
                                    value: formData.salary,
                                    onChange: (e) => setFormData({...formData, salary: e.target.value}),
                                    placeholder: currentContent.modals.enterSalary,
                                    className: 'w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                                })
                            ])
                        ]),

                        // Department, Role, Status
                        React.createElement('div', {
                            key: 'work-fields',
                            className: 'grid grid-cols-3 gap-4'
                        }, [
                            React.createElement('div', {
                                key: 'department-field'
                            }, [
                                React.createElement('label', {
                                    className: 'block text-sm font-medium text-gray-700 mb-2'
                                }, currentContent.modals.employeeDepartment),
                                React.createElement('select', {
                                    value: formData.department,
                                    onChange: (e) => setFormData({...formData, department: e.target.value}),
                                    className: 'w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                                }, [
                                    React.createElement('option', { value: 'الإدارة' }, 'الإدارة'),
                                    React.createElement('option', { value: 'المبيعات' }, 'المبيعات'),
                                    React.createElement('option', { value: 'الدعم الفني' }, 'الدعم الفني'),
                                    React.createElement('option', { value: 'التطوير' }, 'التطوير'),
                                    React.createElement('option', { value: 'المالية' }, 'المالية'),
                                    React.createElement('option', { value: 'التسويق' }, 'التسويق')
                                ])
                            ]),
                            React.createElement('div', {
                                key: 'role-field'
                            }, [
                                React.createElement('label', {
                                    className: 'block text-sm font-medium text-gray-700 mb-2'
                                }, currentContent.modals.employeeRole),
                                React.createElement('select', {
                                    value: formData.role,
                                    onChange: (e) => setFormData({...formData, role: e.target.value}),
                                    className: 'w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                                }, [
                                    React.createElement('option', { value: 'admin' }, 'مدير'),
                                    React.createElement('option', { value: 'manager' }, 'مشرف'),
                                    React.createElement('option', { value: 'employee' }, 'موظف'),
                                    React.createElement('option', { value: 'support' }, 'دعم فني'),
                                    React.createElement('option', { value: 'developer' }, 'مطور'),
                                    React.createElement('option', { value: 'accountant' }, 'محاسب'),
                                    React.createElement('option', { value: 'designer' }, 'مصمم')
                                ])
                            ]),
                            React.createElement('div', {
                                key: 'status-field'
                            }, [
                                React.createElement('label', {
                                    className: 'block text-sm font-medium text-gray-700 mb-2'
                                }, currentContent.modals.employeeStatus),
                                React.createElement('select', {
                                    value: formData.status,
                                    onChange: (e) => setFormData({...formData, status: e.target.value}),
                                    className: 'w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                                }, [
                                    React.createElement('option', { value: 'نشط' }, 'نشط'),
                                    React.createElement('option', { value: 'إجازة' }, 'إجازة'),
                                    React.createElement('option', { value: 'معلق' }, 'معلق'),
                                    React.createElement('option', { value: 'غير نشط' }, 'غير نشط')
                                ])
                            ])
                        ]),

                        // Permissions
                        React.createElement('div', {
                            key: 'permissions-field'
                        }, [
                            React.createElement('div', {
                                className: 'flex items-center justify-between mb-3'
                            }, [
                                React.createElement('label', {
                                    className: 'block text-sm font-medium text-gray-700'
                                }, currentContent.modals.employeePermissions),
                                React.createElement('button', {
                                    onClick: addPermission,
                                    className: 'text-blue-600 hover:text-blue-700 text-sm font-medium'
                                }, '+ ' + currentContent.modals.addPermission)
                            ]),
                            React.createElement('div', {
                                className: 'space-y-2'
                            }, formData.permissions.map((permission, index) =>
                                React.createElement('div', {
                                    key: index,
                                    className: 'flex items-center space-x-2 space-x-reverse'
                                }, [
                                    React.createElement('input', {
                                        type: 'text',
                                        value: permission,
                                        onChange: (e) => updatePermission(index, e.target.value),
                                        placeholder: currentContent.modals.enterPermission,
                                        className: 'flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                                    }),
                                    React.createElement('button', {
                                        onClick: () => removePermission(index),
                                        className: 'text-red-600 hover:text-red-700 p-2'
                                    }, '🗑️')
                                ])
                            ))
                        ])
                    ]),
                    React.createElement('div', {
                        key: 'modal-footer',
                        className: 'flex gap-3 p-6 border-t border-gray-200'
                    }, [
                        React.createElement('button', {
                            onClick: saveEmployee,
                            className: 'flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors'
                        }, currentContent.modals.save),
                        React.createElement('button', {
                            onClick: closeModals,
                            className: 'flex-1 bg-gray-300 hover:bg-gray-400 text-gray-700 px-4 py-2 rounded-lg font-medium transition-colors'
                        }, currentContent.modals.cancel)
                    ])
                ])),

                // View Employee Modal
                showViewModal && selectedEmployee && React.createElement('div', {
                    key: 'view-modal',
                    className: 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50'
                }, React.createElement('div', {
                    className: 'bg-white rounded-lg max-w-lg w-full max-h-[90vh] overflow-y-auto'
                }, [
                    React.createElement('div', {
                        key: 'view-header',
                        className: 'flex items-center justify-between p-6 border-b border-gray-200'
                    }, [
                        React.createElement('h3', {
                            className: 'text-lg font-semibold text-gray-900'
                        }, currentContent.modals.viewEmployee),
                        React.createElement('button', {
                            onClick: closeModals,
                            className: 'text-gray-400 hover:text-gray-600'
                        }, '✕')
                    ]),
                    React.createElement('div', {
                        key: 'view-body',
                        className: 'p-6 space-y-4'
                    }, [
                        React.createElement('div', {
                            className: 'text-center pb-4 border-b border-gray-100'
                        }, [
                            React.createElement('img', {
                                className: 'h-20 w-20 rounded-full mx-auto mb-4',
                                src: selectedEmployee.avatar,
                                alt: selectedEmployee.name
                            }),
                            React.createElement('h4', {
                                className: 'text-xl font-bold text-gray-900 mb-2'
                            }, selectedEmployee.name),
                            React.createElement('p', {
                                className: 'text-gray-600'
                            }, selectedEmployee.position),
                            React.createElement('span', {
                                className: `inline-flex px-3 py-1 text-sm font-semibold rounded-full ${getStatusColor(selectedEmployee.status)} mt-2`
                            }, selectedEmployee.status)
                        ]),

                        React.createElement('div', {
                            className: 'space-y-3'
                        }, [
                            React.createElement('div', {
                                className: 'flex justify-between'
                            }, [
                                React.createElement('span', { className: 'text-gray-500' }, currentContent.modals.contactInfo + ':'),
                                React.createElement('div', { className: 'text-right' }, [
                                    React.createElement('div', { className: 'text-gray-900' }, selectedEmployee.email),
                                    React.createElement('div', { className: 'text-gray-900' }, selectedEmployee.phone)
                                ])
                            ]),
                            React.createElement('div', {
                                className: 'flex justify-between'
                            }, [
                                React.createElement('span', { className: 'text-gray-500' }, currentContent.department + ':'),
                                React.createElement('span', { className: 'text-gray-900' }, selectedEmployee.department)
                            ]),
                            React.createElement('div', {
                                className: 'flex justify-between'
                            }, [
                                React.createElement('span', { className: 'text-gray-500' }, currentContent.role + ':'),
                                React.createElement('span', {
                                    className: `inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getRoleColor(selectedEmployee.role)}`
                                }, currentContent[selectedEmployee.role] || selectedEmployee.role)
                            ]),
                            React.createElement('div', {
                                className: 'flex justify-between'
                            }, [
                                React.createElement('span', { className: 'text-gray-500' }, currentContent.salary + ':'),
                                React.createElement('span', { className: 'text-gray-900 font-medium' }, selectedEmployee.salary)
                            ]),
                            React.createElement('div', {
                                className: 'flex justify-between'
                            }, [
                                React.createElement('span', { className: 'text-gray-500' }, currentContent.modals.joinDate + ':'),
                                React.createElement('span', { className: 'text-gray-900' }, selectedEmployee.joinDate)
                            ])
                        ]),

                        React.createElement('div', {
                            className: 'pt-4 border-t border-gray-100'
                        }, [
                            React.createElement('h5', {
                                className: 'font-medium text-gray-900 mb-3'
                            }, currentContent.permissions + ':'),
                            React.createElement('div', {
                                className: 'flex flex-wrap gap-2'
                            }, selectedEmployee.permissions.map((permission, index) =>
                                React.createElement('span', {
                                    key: index,
                                    className: 'inline-flex px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800'
                                }, permission)
                            ))
                        ])
                    ]),
                    React.createElement('div', {
                        key: 'view-footer',
                        className: 'flex gap-3 p-6 border-t border-gray-200'
                    }, [
                        React.createElement('button', {
                            onClick: () => {
                                closeModals();
                                handleEditEmployee(selectedEmployee);
                            },
                            className: 'flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors'
                        }, currentContent.edit),
                        React.createElement('button', {
                            onClick: closeModals,
                            className: 'flex-1 bg-gray-300 hover:bg-gray-400 text-gray-700 px-4 py-2 rounded-lg font-medium transition-colors'
                        }, currentContent.modals.cancel)
                    ])
                ])),

                // Delete Employee Modal
                showDeleteModal && selectedEmployee && React.createElement('div', {
                    key: 'delete-modal',
                    className: 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50'
                }, React.createElement('div', {
                    className: 'bg-white rounded-lg max-w-md w-full'
                }, [
                    React.createElement('div', {
                        key: 'delete-header',
                        className: 'flex items-center justify-between p-6 border-b border-gray-200'
                    }, [
                        React.createElement('h3', {
                            className: 'text-lg font-semibold text-gray-900'
                        }, currentContent.modals.deleteEmployee),
                        React.createElement('button', {
                            onClick: closeModals,
                            className: 'text-gray-400 hover:text-gray-600'
                        }, '✕')
                    ]),
                    React.createElement('div', {
                        key: 'delete-body',
                        className: 'p-6'
                    }, [
                        React.createElement('div', {
                            className: 'text-center mb-4'
                        }, [
                            React.createElement('div', {
                                className: 'mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4'
                            }, React.createElement('svg', {
                                className: 'h-6 w-6 text-red-600',
                                fill: 'none',
                                stroke: 'currentColor',
                                viewBox: '0 0 24 24'
                            }, React.createElement('path', {
                                strokeLinecap: 'round',
                                strokeLinejoin: 'round',
                                strokeWidth: 2,
                                d: 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z'
                            }))),
                            React.createElement('h4', {
                                className: 'text-lg font-medium text-gray-900 mb-2'
                            }, currentContent.modals.confirmDelete),
                            React.createElement('p', {
                                className: 'text-sm text-gray-500 mb-4'
                            }, currentContent.modals.deleteWarning),
                            React.createElement('p', {
                                className: 'font-medium text-gray-900'
                            }, 'موظف: ' + selectedEmployee.name)
                        ])
                    ]),
                    React.createElement('div', {
                        key: 'delete-footer',
                        className: 'flex gap-3 p-6 border-t border-gray-200'
                    }, [
                        React.createElement('button', {
                            onClick: confirmDelete,
                            className: 'flex-1 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium transition-colors'
                        }, currentContent.modals.delete),
                        React.createElement('button', {
                            onClick: closeModals,
                            className: 'flex-1 bg-gray-300 hover:bg-gray-400 text-gray-700 px-4 py-2 rounded-lg font-medium transition-colors'
                        }, currentContent.modals.cancel)
                    ])
                ]))
            ]);
        };

        // AnalyticsScreen Component
        const AnalyticsScreen = ({ isArabic }) => {
            const [dateRange, setDateRange] = useState('thisMonth');
            const [selectedMetric, setSelectedMetric] = useState('revenue');

            const content = {
                ar: {
                    title: 'الإحصائيات والتقارير',
                    subtitle: 'تحليل شامل لأداء النظام والأعمال',
                    dateRange: 'الفترة الزمنية',
                    thisWeek: 'هذا الأسبوع',
                    thisMonth: 'هذا الشهر',
                    lastMonth: 'الشهر الماضي',
                    thisQuarter: 'هذا الربع',
                    thisYear: 'هذا العام',
                    exportReport: 'تصدير التقرير',
                    totalRevenue: 'إجمالي الإيرادات',
                    totalCustomers: 'إجمالي العملاء',
                    activeSubscriptions: 'الاشتراكات النشطة',
                    conversionRate: 'معدل التحويل',
                    averageRevenue: 'متوسط الإيرادات',
                    customerGrowth: 'نمو العملاء',
                    topPlans: 'أفضل الباقات',
                    recentSales: 'المبيعات الأخيرة',
                    monthlyTrend: 'اتجاه شهري',
                    planDistribution: 'توزيع الباقات',
                    revenueByPlan: 'الإيرادات حسب الباقة',
                    customerActivity: 'نشاط العملاء',
                    paymentMethods: 'طرق الدفع المستخدمة',
                    geographicDistribution: 'التوزيع الجغرافي',
                    supportMetrics: 'مقاييس الدعم الفني',
                    yesterdayRevenue: 'إيرادات أمس',
                    todayRevenue: 'إيرادات اليوم',
                    weeklyGrowth: 'النمو الأسبوعي',
                    monthlyGrowth: 'النمو الشهري',
                    quarterlyGrowth: 'النمو الربعي',
                    newCustomers: 'عملاء جدد',
                    returningCustomers: 'عملاء عائدون',
                    churnRate: 'معدل الانتكاس',
                    avgOrderValue: 'متوسط قيمة الطلب',
                    bronzePlan: 'باقة البرونز',
                    silverPlan: 'باقة الفضة',
                    goldPlan: 'باقة الذهب',
                    enterprisePlan: 'باقة المؤسسات',
                    creditCard: 'بطاقة ائتمان',
                    bankTransfer: 'تحويل بنكي',
                    cash: 'نقدي',
                    digitalWallet: 'محفظة رقمية',
                    baghdad: 'بغداد',
                    basra: 'البصرة',
                    mosul: 'الموصل',
                    erbil: 'أربيل',
                    najaf: 'النجف',
                    karbala: 'كربلاء',
                    other: 'أخرى',
                    responseTime: 'وقت الاستجابة',
                    ticketsResolved: 'التذاكر المحلولة',
                    customerSatisfaction: 'رضا العملاء',
                    hours: 'ساعة',
                    minutes: 'دقيقة',
                    percentage: '%'
                }
            };

            const currentContent = content[isArabic ? 'ar' : 'en'] || content.ar;

            // Mock data for analytics
            const analyticsData = {
                overview: {
                    totalRevenue: '45,890,000',
                    totalCustomers: '2,847',
                    activeSubscriptions: '1,923',
                    conversionRate: '12.4',
                    averageRevenue: '16,120',
                    customerGrowth: '8.2',
                    revenueChange: '+15.3',
                    customersChange: '+12.8',
                    subscriptionsChange: '+9.6',
                    conversionChange: '+2.1'
                },
                chartData: {
                    monthlyRevenue: [
                        { month: 'يناير', revenue: 3200000, customers: 180 },
                        { month: 'فبراير', revenue: 3450000, customers: 195 },
                        { month: 'مارس', revenue: 3680000, customers: 210 },
                        { month: 'أبريل', revenue: 3890000, customers: 225 },
                        { month: 'مايو', revenue: 4120000, customers: 240 },
                        { month: 'يونيو', revenue: 4350000, customers: 255 },
                        { month: 'يوليو', revenue: 4580000, customers: 270 }
                    ],
                    planDistribution: [
                        { plan: 'البرونز', count: 890, percentage: 46.3, revenue: 22250000 },
                        { plan: 'الفضة', count: 620, percentage: 32.2, revenue: 21700000 },
                        { plan: 'الذهب', count: 340, percentage: 17.7, revenue: 17000000 },
                        { plan: 'المؤسسات', count: 73, percentage: 3.8, revenue: 7300000 }
                    ],
                    paymentMethods: [
                        { method: 'بطاقة ائتمان', count: 1150, percentage: 59.8 },
                        { method: 'تحويل بنكي', count: 485, percentage: 25.2 },
                        { method: 'نقدي', count: 193, percentage: 10.0 },
                        { method: 'محفظة رقمية', count: 95, percentage: 5.0 }
                    ],
                    geographicDistribution: [
                        { city: 'بغداد', count: 742, percentage: 38.6 },
                        { city: 'البصرة', count: 346, percentage: 18.0 },
                        { city: 'الموصل', count: 289, percentage: 15.0 },
                        { city: 'أربيل', count: 231, percentage: 12.0 },
                        { city: 'النجف', count: 173, percentage: 9.0 },
                        { city: 'كربلاء', count: 96, percentage: 5.0 },
                        { city: 'أخرى', count: 46, percentage: 2.4 }
                    ]
                },
                recentSales: [
                    {
                        id: 1,
                        customer: 'أحمد حسين الجبوري',
                        plan: 'باقة الذهب',
                        amount: '50,000 دينار',
                        date: '2024-08-07',
                        status: 'مكتمل'
                    },
                    {
                        id: 2,
                        customer: 'فاطمة علي البصري',
                        plan: 'باقة الفضة',
                        amount: '35,000 دينار',
                        date: '2024-08-07',
                        status: 'مكتمل'
                    },
                    {
                        id: 3,
                        customer: 'محمد عبد الله الكربلائي',
                        plan: 'باقة البرونز',
                        amount: '25,000 دينار',
                        date: '2024-08-06',
                        status: 'معلق'
                    },
                    {
                        id: 4,
                        customer: 'نورا خالد الموصلي',
                        plan: 'باقة المؤسسات',
                        amount: '100,000 دينار',
                        date: '2024-08-06',
                        status: 'مكتمل'
                    }
                ],
                supportMetrics: {
                    avgResponseTime: '2.3',
                    ticketsResolved: '156',
                    customerSatisfaction: '94.2',
                    totalTickets: '167'
                }
            };

            // Overview stats
            const overviewStats = [
                {
                    title: currentContent.totalRevenue,
                    value: analyticsData.overview.totalRevenue + ' د.ع',
                    change: analyticsData.overview.revenueChange + '%',
                    changeType: 'positive',
                    icon: '💰',
                    color: 'bg-green-500'
                },
                {
                    title: currentContent.totalCustomers,
                    value: analyticsData.overview.totalCustomers,
                    change: analyticsData.overview.customersChange + '%',
                    changeType: 'positive',
                    icon: '👥',
                    color: 'bg-blue-500'
                },
                {
                    title: currentContent.activeSubscriptions,
                    value: analyticsData.overview.activeSubscriptions,
                    change: analyticsData.overview.subscriptionsChange + '%',
                    changeType: 'positive',
                    icon: '📊',
                    color: 'bg-purple-500'
                },
                {
                    title: currentContent.conversionRate,
                    value: analyticsData.overview.conversionRate + '%',
                    change: analyticsData.overview.conversionChange + '%',
                    changeType: 'positive',
                    icon: '📈',
                    color: 'bg-orange-500'
                },
                {
                    title: currentContent.averageRevenue,
                    value: analyticsData.overview.averageRevenue + ' د.ع',
                    change: '+5.2%',
                    changeType: 'positive',
                    icon: '💳',
                    color: 'bg-indigo-500'
                },
                {
                    title: currentContent.customerGrowth,
                    value: analyticsData.overview.customerGrowth + '%',
                    change: '+1.8%',
                    changeType: 'positive',
                    icon: '📊',
                    color: 'bg-teal-500'
                }
            ];

            const getChangeColor = (type) => {
                return type === 'positive' ? 'text-green-600' : 'text-red-600';
            };

            const getChangeIcon = (type) => {
                return type === 'positive' ? '📈' : '📉';
            };

            const getPlanColor = (plan) => {
                switch (plan) {
                    case 'البرونز': return 'bg-amber-100 text-amber-800';
                    case 'الفضة': return 'bg-gray-100 text-gray-800';
                    case 'الذهب': return 'bg-yellow-100 text-yellow-800';
                    case 'المؤسسات': return 'bg-purple-100 text-purple-800';
                    default: return 'bg-blue-100 text-blue-800';
                }
            };

            const getStatusColor = (status) => {
                switch (status) {
                    case 'مكتمل': return 'bg-green-100 text-green-800';
                    case 'معلق': return 'bg-yellow-100 text-yellow-800';
                    case 'مرفوض': return 'bg-red-100 text-red-800';
                    default: return 'bg-gray-100 text-gray-800';
                }
            };

            return React.createElement('div', {
                className: 'analytics-screen space-y-4 sm:space-y-6'
            }, [
                // Page Header
                React.createElement('div', {
                    key: 'header',
                    className: 'flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4'
                }, [
                    React.createElement('div', { key: 'title-section' }, [
                        React.createElement('h1', {
                            key: 'title',
                            className: 'text-2xl sm:text-3xl font-bold text-gray-900'
                        }, currentContent.title),
                        React.createElement('p', {
                            key: 'subtitle',
                            className: 'text-sm sm:text-base text-gray-600 mt-1'
                        }, currentContent.subtitle)
                    ]),
                    React.createElement('div', {
                        key: 'controls',
                        className: 'flex flex-col sm:flex-row gap-3'
                    }, [
                        React.createElement('select', {
                            key: 'date-range',
                            value: dateRange,
                            onChange: (e) => setDateRange(e.target.value),
                            className: 'px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm'
                        }, [
                            React.createElement('option', { key: 'thisWeek', value: 'thisWeek' }, currentContent.thisWeek),
                            React.createElement('option', { key: 'thisMonth', value: 'thisMonth' }, currentContent.thisMonth),
                            React.createElement('option', { key: 'lastMonth', value: 'lastMonth' }, currentContent.lastMonth),
                            React.createElement('option', { key: 'thisQuarter', value: 'thisQuarter' }, currentContent.thisQuarter),
                            React.createElement('option', { key: 'thisYear', value: 'thisYear' }, currentContent.thisYear)
                        ]),
                        React.createElement('button', {
                            key: 'export-button',
                            className: 'w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center gap-2'
                        }, [
                            React.createElement('span', { key: 'icon' }, '📊'),
                            React.createElement('span', { key: 'text' }, currentContent.exportReport)
                        ])
                    ])
                ]),

                // Overview Stats Grid
                React.createElement('div', {
                    key: 'overview-stats',
                    className: 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3 sm:gap-4'
                }, overviewStats.map((stat, index) =>
                    React.createElement('div', {
                        key: index,
                        className: 'bg-white rounded-lg sm:rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6'
                    }, [
                        React.createElement('div', {
                            key: 'stat-content',
                            className: 'space-y-2'
                        }, [
                            React.createElement('div', {
                                key: 'header',
                                className: 'flex items-center justify-between'
                            }, [
                                React.createElement('p', {
                                    key: 'title',
                                    className: 'text-xs sm:text-sm font-medium text-gray-600'
                                }, stat.title),
                                React.createElement('div', {
                                    key: 'icon',
                                    className: `${stat.color} text-white p-1.5 rounded-lg text-sm`
                                }, stat.icon)
                            ]),
                            React.createElement('p', {
                                key: 'value',
                                className: 'text-lg sm:text-xl font-bold text-gray-900'
                            }, stat.value),
                            React.createElement('div', {
                                key: 'change',
                                className: 'flex items-center space-x-1 space-x-reverse'
                            }, [
                                React.createElement('span', { key: 'change-icon', className: 'text-xs' }, getChangeIcon(stat.changeType)),
                                React.createElement('span', {
                                    key: 'change-value',
                                    className: `text-xs font-medium ${getChangeColor(stat.changeType)}`
                                }, stat.change),
                                React.createElement('span', { key: 'change-text', className: 'text-xs text-gray-500' }, 'مقارنة بالشهر الماضي')
                            ])
                        ])
                    ])
                )),

                // Charts Row
                React.createElement('div', {
                    key: 'charts-row',
                    className: 'grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6'
                }, [
                    // Revenue Trend Chart
                    React.createElement('div', {
                        key: 'revenue-chart',
                        className: 'bg-white rounded-lg sm:rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6'
                    }, [
                        React.createElement('div', {
                            key: 'chart-header',
                            className: 'flex items-center justify-between mb-4'
                        }, [
                            React.createElement('h3', {
                                key: 'chart-title',
                                className: 'text-lg font-semibold text-gray-900'
                            }, currentContent.monthlyTrend),
                            React.createElement('div', {
                                key: 'chart-legend',
                                className: 'flex items-center space-x-4 space-x-reverse text-sm'
                            }, [
                                React.createElement('div', {
                                    key: 'revenue-legend',
                                    className: 'flex items-center space-x-2 space-x-reverse'
                                }, [
                                    React.createElement('div', { key: 'revenue-color', className: 'w-3 h-3 bg-blue-500 rounded-full' }),
                                    React.createElement('span', { key: 'revenue-text', className: 'text-gray-600' }, 'الإيرادات')
                                ]),
                                React.createElement('div', {
                                    key: 'customers-legend',
                                    className: 'flex items-center space-x-2 space-x-reverse'
                                }, [
                                    React.createElement('div', { key: 'customers-color', className: 'w-3 h-3 bg-green-500 rounded-full' }),
                                    React.createElement('span', { key: 'customers-text', className: 'text-gray-600' }, 'العملاء')
                                ])
                            ])
                        ]),
                        // Simple Bar Chart Representation
                        React.createElement('div', {
                            key: 'chart-container',
                            className: 'space-y-3'
                        }, analyticsData.chartData.monthlyRevenue.slice(-6).map((data, index) => {
                            const maxRevenue = Math.max(...analyticsData.chartData.monthlyRevenue.map(d => d.revenue));
                            const revenuePercentage = (data.revenue / maxRevenue) * 100;
                            const customerPercentage = (data.customers / 300) * 100;

                            return React.createElement('div', {
                                key: index,
                                className: 'space-y-1'
                            }, [
                                React.createElement('div', {
                                    key: 'month-label',
                                    className: 'flex justify-between text-sm text-gray-600'
                                }, [
                                    React.createElement('span', { key: 'month' }, data.month),
                                    React.createElement('span', { key: 'values' }, `${(data.revenue / 1000000).toFixed(1)}M د.ع - ${data.customers} عميل`)
                                ]),
                                React.createElement('div', {
                                    key: 'bars',
                                    className: 'flex space-x-1 space-x-reverse'
                                }, [
                                    React.createElement('div', {
                                        key: 'revenue-bar',
                                        className: 'bg-blue-500 h-4 rounded flex-1',
                                        style: { width: `${revenuePercentage}%` }
                                    }),
                                    React.createElement('div', {
                                        key: 'customer-bar',
                                        className: 'bg-green-500 h-4 rounded w-16',
                                        style: { width: `${customerPercentage}%` }
                                    })
                                ])
                            ]);
                        }))
                    ]),

                    // Plan Distribution Chart
                    React.createElement('div', {
                        key: 'plan-distribution',
                        className: 'bg-white rounded-lg sm:rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6'
                    }, [
                        React.createElement('h3', {
                            key: 'plan-title',
                            className: 'text-lg font-semibold text-gray-900 mb-4'
                        }, currentContent.planDistribution),
                        React.createElement('div', {
                            key: 'plan-list',
                            className: 'space-y-3'
                        }, analyticsData.chartData.planDistribution.map((plan, index) => {
                            return React.createElement('div', {
                                key: index,
                                className: 'flex items-center justify-between p-3 bg-gray-50 rounded-lg'
                            }, [
                                React.createElement('div', {
                                    key: 'plan-info',
                                    className: 'flex items-center space-x-3 space-x-reverse'
                                }, [
                                    React.createElement('span', {
                                        key: 'plan-badge',
                                        className: `inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPlanColor(plan.plan)}`
                                    }, plan.plan),
                                    React.createElement('div', { key: 'plan-details' }, [
                                        React.createElement('p', { key: 'plan-count', className: 'text-sm font-medium text-gray-900' }, `${plan.count} مشترك`),
                                        React.createElement('p', { key: 'plan-revenue', className: 'text-xs text-gray-500' }, `${(plan.revenue / 1000000).toFixed(1)}M د.ع`)
                                    ])
                                ]),
                                React.createElement('div', {
                                    key: 'plan-percentage',
                                    className: 'text-right'
                                }, [
                                    React.createElement('p', { key: 'percentage', className: 'text-sm font-semibold text-gray-900' }, `${plan.percentage}%`),
                                    React.createElement('div', {
                                        key: 'progress-bar',
                                        className: 'w-16 bg-gray-200 rounded-full h-2 mt-1'
                                    }, React.createElement('div', {
                                        className: 'bg-blue-500 h-2 rounded-full',
                                        style: { width: `${plan.percentage}%` }
                                    }))
                                ])
                            ]);
                        }))
                    ])
                ]),

                // Bottom Row - Payment Methods & Geographic Distribution
                React.createElement('div', {
                    key: 'bottom-row',
                    className: 'grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6'
                }, [
                    // Payment Methods
                    React.createElement('div', {
                        key: 'payment-methods',
                        className: 'bg-white rounded-lg sm:rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6'
                    }, [
                        React.createElement('h3', {
                            key: 'payment-title',
                            className: 'text-lg font-semibold text-gray-900 mb-4'
                        }, currentContent.paymentMethods),
                        React.createElement('div', {
                            key: 'payment-list',
                            className: 'space-y-3'
                        }, analyticsData.chartData.paymentMethods.map((method, index) => {
                            const colors = ['bg-blue-500', 'bg-green-500', 'bg-yellow-500', 'bg-purple-500'];
                            return React.createElement('div', {
                                key: index,
                                className: 'flex items-center justify-between'
                            }, [
                                React.createElement('div', {
                                    key: 'method-info',
                                    className: 'flex items-center space-x-3 space-x-reverse'
                                }, [
                                    React.createElement('div', {
                                        key: 'method-icon',
                                        className: `${colors[index]} w-3 h-3 rounded-full`
                                    }),
                                    React.createElement('span', { key: 'method-name', className: 'text-sm text-gray-900' }, method.method)
                                ]),
                                React.createElement('div', {
                                    key: 'method-stats',
                                    className: 'text-right'
                                }, [
                                    React.createElement('p', { key: 'method-count', className: 'text-sm font-medium text-gray-900' }, method.count.toString()),
                                    React.createElement('p', { key: 'method-percentage', className: 'text-xs text-gray-500' }, `${method.percentage}%`)
                                ])
                            ]);
                        }))
                    ]),

                    // Geographic Distribution
                    React.createElement('div', {
                        key: 'geographic-distribution',
                        className: 'bg-white rounded-lg sm:rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6'
                    }, [
                        React.createElement('h3', {
                            key: 'geo-title',
                            className: 'text-lg font-semibold text-gray-900 mb-4'
                        }, currentContent.geographicDistribution),
                        React.createElement('div', {
                            key: 'geo-list',
                            className: 'space-y-2'
                        }, analyticsData.chartData.geographicDistribution.map((location, index) => {
                            return React.createElement('div', {
                                key: index,
                                className: 'flex items-center justify-between py-2'
                            }, [
                                React.createElement('span', { key: 'city-name', className: 'text-sm text-gray-900' }, location.city),
                                React.createElement('div', {
                                    key: 'city-stats',
                                    className: 'flex items-center space-x-2 space-x-reverse'
                                }, [
                                    React.createElement('span', { key: 'city-count', className: 'text-sm font-medium text-gray-900' }, location.count.toString()),
                                    React.createElement('span', { key: 'city-percentage', className: 'text-xs text-gray-500' }, `(${location.percentage}%)`)
                                ])
                            ]);
                        }))
                    ]),

                    // Recent Sales
                    React.createElement('div', {
                        key: 'recent-sales',
                        className: 'bg-white rounded-lg sm:rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6'
                    }, [
                        React.createElement('h3', {
                            key: 'sales-title',
                            className: 'text-lg font-semibold text-gray-900 mb-4'
                        }, currentContent.recentSales),
                        React.createElement('div', {
                            key: 'sales-list',
                            className: 'space-y-3'
                        }, analyticsData.recentSales.map((sale, index) => {
                            return React.createElement('div', {
                                key: index,
                                className: 'flex items-center justify-between p-3 bg-gray-50 rounded-lg'
                            }, [
                                React.createElement('div', { key: 'sale-info' }, [
                                    React.createElement('p', { key: 'customer-name', className: 'text-sm font-medium text-gray-900' }, sale.customer),
                                    React.createElement('p', { key: 'sale-plan', className: 'text-xs text-gray-500' }, sale.plan),
                                    React.createElement('p', { key: 'sale-date', className: 'text-xs text-gray-400' }, sale.date)
                                ]),
                                React.createElement('div', {
                                    key: 'sale-details',
                                    className: 'text-right'
                                }, [
                                    React.createElement('p', { key: 'sale-amount', className: 'text-sm font-semibold text-green-600' }, sale.amount),
                                    React.createElement('span', {
                                        key: 'sale-status',
                                        className: `inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(sale.status)}`
                                    }, sale.status)
                                ])
                            ]);
                        }))
                    ])
                ])
            ]);
        };

        // NotificationsScreen Component
        const NotificationsScreen = ({ isArabic }) => {
            const [notifications, setNotifications] = useState([
                {
                    id: 1,
                    title: 'اشتراك جديد تم إنشاؤه',
                    message: 'العميل أحمد حسين الجبوري قام بالاشتراك في باقة الذهب',
                    type: 'subscription',
                    status: 'unread',
                    priority: 'medium',
                    timestamp: '2024-08-07 14:30:00',
                    relatedUser: 'أحمد حسين الجبوري',
                    relatedEntity: 'باقة الذهب',
                    actions: ['عرض التفاصيل', 'إرسال ترحيب']
                },
                {
                    id: 2,
                    title: 'دفعة فاشلة تحتاج متابعة',
                    message: 'فشلت عملية دفع للعميل فاطمة علي البصري - باقة الفضة',
                    type: 'payment',
                    status: 'unread',
                    priority: 'high',
                    timestamp: '2024-08-07 13:45:00',
                    relatedUser: 'فاطمة علي البصري',
                    relatedEntity: 'باقة الفضة',
                    actions: ['إعادة المحاولة', 'تواصل مع العميل']
                },
                {
                    id: 3,
                    title: 'موظف جديد انضم للفريق',
                    message: 'تم إضافة الموظف محمد صالح إلى قسم الدعم الفني',
                    type: 'employee',
                    status: 'read',
                    priority: 'low',
                    timestamp: '2024-08-07 11:20:00',
                    relatedUser: 'محمد صالح',
                    relatedEntity: 'قسم الدعم الفني',
                    actions: ['عرض الملف الشخصي']
                },
                {
                    id: 4,
                    title: 'تذكير: انتهاء اشتراك قريباً',
                    message: 'اشتراك العميل عمر النجفي سينتهي خلال 3 أيام',
                    type: 'subscription',
                    status: 'unread',
                    priority: 'medium',
                    timestamp: '2024-08-07 10:15:00',
                    relatedUser: 'عمر النجفي',
                    relatedEntity: 'باقة البرونز',
                    actions: ['إرسال تذكير', 'عرض خيارات التجديد']
                },
                {
                    id: 5,
                    title: 'تحديث أمني مهم',
                    message: 'تم تطبيق تحديث أمني جديد على النظام بنجاح',
                    type: 'system',
                    status: 'read',
                    priority: 'high',
                    timestamp: '2024-08-07 09:00:00',
                    relatedUser: null,
                    relatedEntity: 'النظام',
                    actions: ['عرض تفاصيل التحديث']
                },
                {
                    id: 6,
                    title: 'طلب دعم فني جديد',
                    message: 'العميل زينب البغدادي أرسل طلب دعم فني - مشكلة في تسجيل الدخول',
                    type: 'support',
                    status: 'unread',
                    priority: 'medium',
                    timestamp: '2024-08-07 08:30:00',
                    relatedUser: 'زينب البغدادي',
                    relatedEntity: 'تذكرة دعم #1234',
                    actions: ['فتح التذكرة', 'تعيين مطور']
                },
                {
                    id: 7,
                    title: 'تم إكمال دفعة بنجاح',
                    message: 'العميل نورا الموصلي أكملت دفعة شهرية بمبلغ 25,000 دينار',
                    type: 'payment',
                    status: 'read',
                    priority: 'low',
                    timestamp: '2024-08-06 16:45:00',
                    relatedUser: 'نورا الموصلي',
                    relatedEntity: 'باقة البرونز',
                    actions: ['عرض فاتورة']
                },
                {
                    id: 8,
                    title: 'تقرير أداء شهري جاهز',
                    message: 'تم إنشاء تقرير الأداء الشهري لشهر يوليو 2024',
                    type: 'report',
                    status: 'read',
                    priority: 'low',
                    timestamp: '2024-08-06 14:00:00',
                    relatedUser: null,
                    relatedEntity: 'تقرير يوليو 2024',
                    actions: ['تحميل التقرير', 'مشاركة']
                }
            ]);

            const [filters, setFilters] = useState({
                status: 'all',
                type: 'all',
                priority: 'all'
            });
            const [searchTerm, setSearchTerm] = useState('');
            const [selectedNotifications, setSelectedNotifications] = useState([]);
            const [showCreateModal, setShowCreateModal] = useState(false);

            const content = {
                ar: {
                    title: 'إدارة الإشعارات',
                    subtitle: 'عرض وإدارة جميع إشعارات النظام',
                    search: 'البحث في الإشعارات...',
                    createNotification: 'إنشاء إشعار جديد',
                    markAllRead: 'تحديد الكل كمقروء',
                    deleteSelected: 'حذف المحدد',
                    selectAll: 'تحديد الكل',
                    allStatus: 'جميع الحالات',
                    allTypes: 'جميع الأنواع',
                    allPriorities: 'جميع الأولويات',
                    unread: 'غير مقروء',
                    read: 'مقروء',
                    subscription: 'اشتراك',
                    payment: 'دفع',
                    employee: 'موظف',
                    system: 'نظام',
                    support: 'دعم فني',
                    report: 'تقرير',
                    high: 'عالية',
                    medium: 'متوسطة',
                    low: 'منخفضة',
                    status: 'الحالة',
                    type: 'النوع',
                    priority: 'الأولوية',
                    timestamp: 'الوقت',
                    actions: 'الإجراءات',
                    markRead: 'تحديد كمقروء',
                    markUnread: 'تحديد كغير مقروء',
                    delete: 'حذف',
                    reply: 'رد',
                    forward: 'إعادة توجيه',
                    archive: 'أرشفة',
                    noResults: 'لا توجد إشعارات',
                    totalNotifications: 'إجمالي الإشعارات',
                    unreadNotifications: 'غير المقروءة',
                    highPriorityNotifications: 'عالية الأولوية',
                    todayNotifications: 'إشعارات اليوم',
                    recentActivity: 'النشاط الأخير',
                    notificationSettings: 'إعدادات الإشعارات',
                    emailNotifications: 'إشعارات البريد',
                    pushNotifications: 'الإشعارات المنبثقة',
                    smsNotifications: 'إشعارات الرسائل',
                    details: 'التفاصيل',
                    relatedTo: 'متعلق بـ',
                    ago: 'منذ',
                    just_now: 'الآن',
                    minutes: 'دقيقة',
                    hours: 'ساعة',
                    days: 'يوم',
                    weeks: 'أسبوع',
                    months: 'شهر'
                }
            };

            const currentContent = content[isArabic ? 'ar' : 'en'] || content.ar;

            // Filter notifications
            const filteredNotifications = notifications.filter(notification => {
                const matchesSearch = notification.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                    notification.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                    (notification.relatedUser && notification.relatedUser.toLowerCase().includes(searchTerm.toLowerCase()));
                const matchesStatus = filters.status === 'all' || notification.status === filters.status;
                const matchesType = filters.type === 'all' || notification.type === filters.type;
                const matchesPriority = filters.priority === 'all' || notification.priority === filters.priority;
                return matchesSearch && matchesStatus && matchesType && matchesPriority;
            });

            // Calculate stats
            const stats = [
                {
                    title: currentContent.totalNotifications,
                    value: notifications.length.toString(),
                    icon: '🔔',
                    color: 'bg-blue-500',
                    change: '+5 جديد'
                },
                {
                    title: currentContent.unreadNotifications,
                    value: notifications.filter(n => n.status === 'unread').length.toString(),
                    icon: '📩',
                    color: 'bg-red-500',
                    change: '+3 اليوم'
                },
                {
                    title: currentContent.highPriorityNotifications,
                    value: notifications.filter(n => n.priority === 'high').length.toString(),
                    icon: '⚠️',
                    color: 'bg-orange-500',
                    change: '2 نشط'
                },
                {
                    title: currentContent.todayNotifications,
                    value: notifications.filter(n => n.timestamp.includes('2024-08-07')).length.toString(),
                    icon: '📅',
                    color: 'bg-green-500',
                    change: '6 إشعارات'
                }
            ];

            // Helper functions
            const getTypeIcon = (type) => {
                switch (type) {
                    case 'subscription': return '📋';
                    case 'payment': return '💳';
                    case 'employee': return '👤';
                    case 'system': return '⚙️';
                    case 'support': return '🛠️';
                    case 'report': return '📊';
                    default: return '🔔';
                }
            };

            const getTypeColor = (type) => {
                switch (type) {
                    case 'subscription': return 'bg-blue-100 text-blue-800';
                    case 'payment': return 'bg-green-100 text-green-800';
                    case 'employee': return 'bg-purple-100 text-purple-800';
                    case 'system': return 'bg-gray-100 text-gray-800';
                    case 'support': return 'bg-yellow-100 text-yellow-800';
                    case 'report': return 'bg-indigo-100 text-indigo-800';
                    default: return 'bg-gray-100 text-gray-800';
                }
            };

            const getPriorityColor = (priority) => {
                switch (priority) {
                    case 'high': return 'bg-red-100 text-red-800 border-red-300';
                    case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-300';
                    case 'low': return 'bg-green-100 text-green-800 border-green-300';
                    default: return 'bg-gray-100 text-gray-800 border-gray-300';
                }
            };

            const getTimeAgo = (timestamp) => {
                const now = new Date();
                const notificationTime = new Date(timestamp);
                const diffInMinutes = Math.floor((now - notificationTime) / (1000 * 60));

                if (diffInMinutes < 1) return currentContent.just_now;
                if (diffInMinutes < 60) return `${diffInMinutes} ${currentContent.minutes} ${currentContent.ago}`;

                const diffInHours = Math.floor(diffInMinutes / 60);
                if (diffInHours < 24) return `${diffInHours} ${currentContent.hours} ${currentContent.ago}`;

                const diffInDays = Math.floor(diffInHours / 24);
                if (diffInDays < 7) return `${diffInDays} ${currentContent.days} ${currentContent.ago}`;

                const diffInWeeks = Math.floor(diffInDays / 7);
                if (diffInWeeks < 4) return `${diffInWeeks} ${currentContent.weeks} ${currentContent.ago}`;

                const diffInMonths = Math.floor(diffInDays / 30);
                return `${diffInMonths} ${currentContent.months} ${currentContent.ago}`;
            };

            const markAsRead = (notificationId) => {
                setNotifications(prev =>
                    prev.map(n => n.id === notificationId ? { ...n, status: 'read' } : n)
                );
            };

            const markAsUnread = (notificationId) => {
                setNotifications(prev =>
                    prev.map(n => n.id === notificationId ? { ...n, status: 'unread' } : n)
                );
            };

            const deleteNotification = (notificationId) => {
                setNotifications(prev => prev.filter(n => n.id !== notificationId));
            };

            const toggleSelection = (notificationId) => {
                setSelectedNotifications(prev =>
                    prev.includes(notificationId)
                        ? prev.filter(id => id !== notificationId)
                        : [...prev, notificationId]
                );
            };

            const selectAll = () => {
                const allIds = filteredNotifications.map(n => n.id);
                setSelectedNotifications(
                    selectedNotifications.length === allIds.length ? [] : allIds
                );
            };

            const markSelectedAsRead = () => {
                setNotifications(prev =>
                    prev.map(n =>
                        selectedNotifications.includes(n.id) ? { ...n, status: 'read' } : n
                    )
                );
                setSelectedNotifications([]);
            };

            const deleteSelected = () => {
                setNotifications(prev =>
                    prev.filter(n => !selectedNotifications.includes(n.id))
                );
                setSelectedNotifications([]);
            };

            return React.createElement('div', {
                className: 'notifications-screen space-y-4 sm:space-y-6'
            }, [
                // Page Header
                React.createElement('div', {
                    key: 'header',
                    className: 'flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4'
                }, [
                    React.createElement('div', { key: 'title-section' }, [
                        React.createElement('h1', {
                            key: 'title',
                            className: 'text-2xl sm:text-3xl font-bold text-gray-900'
                        }, currentContent.title),
                        React.createElement('p', {
                            key: 'subtitle',
                            className: 'text-sm sm:text-base text-gray-600 mt-1'
                        }, currentContent.subtitle)
                    ]),
                    React.createElement('div', {
                        key: 'action-buttons',
                        className: 'flex flex-col sm:flex-row gap-2'
                    }, [
                        React.createElement('button', {
                            key: 'create-notification',
                            onClick: () => setShowCreateModal(true),
                            className: 'w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center gap-2'
                        }, [
                            React.createElement('span', { key: 'icon' }, '➕'),
                            React.createElement('span', { key: 'text' }, currentContent.createNotification)
                        ]),
                        selectedNotifications.length > 0 && React.createElement('div', {
                            key: 'bulk-actions',
                            className: 'flex gap-2'
                        }, [
                            React.createElement('button', {
                                key: 'mark-read',
                                onClick: markSelectedAsRead,
                                className: 'px-3 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm transition-colors'
                            }, currentContent.markAllRead),
                            React.createElement('button', {
                                key: 'delete-selected',
                                onClick: deleteSelected,
                                className: 'px-3 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm transition-colors'
                            }, currentContent.deleteSelected)
                        ])
                    ])
                ]),

                // Stats Grid
                React.createElement('div', {
                    key: 'stats',
                    className: 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4'
                }, stats.map((stat, index) =>
                    React.createElement('div', {
                        key: index,
                        className: 'bg-white rounded-lg sm:rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6'
                    }, [
                        React.createElement('div', {
                            key: 'stat-content',
                            className: 'flex items-center justify-between'
                        }, [
                            React.createElement('div', { key: 'text' }, [
                                React.createElement('p', {
                                    key: 'title',
                                    className: 'text-xs sm:text-sm font-medium text-gray-600 mb-1'
                                }, stat.title),
                                React.createElement('p', {
                                    key: 'value',
                                    className: 'text-lg sm:text-xl font-bold text-gray-900'
                                }, stat.value),
                                React.createElement('p', {
                                    key: 'change',
                                    className: 'text-xs text-gray-500 mt-1'
                                }, stat.change)
                            ]),
                            React.createElement('div', {
                                key: 'icon',
                                className: `${stat.color} text-white p-2 sm:p-3 rounded-lg text-base sm:text-lg`
                            }, stat.icon)
                        ])
                    ])
                )),

                // Filters and Search
                React.createElement('div', {
                    key: 'filters',
                    className: 'bg-white rounded-lg sm:rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6'
                }, [
                    React.createElement('div', {
                        key: 'filters-content',
                        className: 'flex flex-col xl:flex-row gap-4'
                    }, [
                        // Search Input
                        React.createElement('div', {
                            key: 'search',
                            className: 'flex-1'
                        }, [
                            React.createElement('div', {
                                className: 'relative'
                            }, [
                                React.createElement('input', {
                                    key: 'search-input',
                                    type: 'text',
                                    placeholder: currentContent.search,
                                    value: searchTerm,
                                    onChange: (e) => setSearchTerm(e.target.value),
                                    className: 'w-full pl-10 pr-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base'
                                }),
                                React.createElement('svg', {
                                    key: 'search-icon',
                                    className: 'absolute left-3 top-2.5 sm:top-3.5 h-4 w-4 sm:h-5 sm:w-5 text-gray-400',
                                    fill: 'none',
                                    stroke: 'currentColor',
                                    viewBox: '0 0 24 24'
                                }, React.createElement('path', {
                                    strokeLinecap: 'round',
                                    strokeLinejoin: 'round',
                                    strokeWidth: 2,
                                    d: 'M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
                                }))
                            ])
                        ]),
                        // Status Filter
                        React.createElement('div', {
                            key: 'status-filter',
                            className: 'w-full xl:w-40'
                        }, [
                            React.createElement('select', {
                                key: 'status-select',
                                value: filters.status,
                                onChange: (e) => setFilters(prev => ({ ...prev, status: e.target.value })),
                                className: 'w-full px-3 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base'
                            }, [
                                React.createElement('option', { key: 'all-status', value: 'all' }, currentContent.allStatus),
                                React.createElement('option', { key: 'unread', value: 'unread' }, currentContent.unread),
                                React.createElement('option', { key: 'read', value: 'read' }, currentContent.read)
                            ])
                        ]),
                        // Type Filter
                        React.createElement('div', {
                            key: 'type-filter',
                            className: 'w-full xl:w-44'
                        }, [
                            React.createElement('select', {
                                key: 'type-select',
                                value: filters.type,
                                onChange: (e) => setFilters(prev => ({ ...prev, type: e.target.value })),
                                className: 'w-full px-3 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base'
                            }, [
                                React.createElement('option', { key: 'all-types', value: 'all' }, currentContent.allTypes),
                                React.createElement('option', { key: 'subscription', value: 'subscription' }, currentContent.subscription),
                                React.createElement('option', { key: 'payment', value: 'payment' }, currentContent.payment),
                                React.createElement('option', { key: 'employee', value: 'employee' }, currentContent.employee),
                                React.createElement('option', { key: 'system', value: 'system' }, currentContent.system),
                                React.createElement('option', { key: 'support', value: 'support' }, currentContent.support),
                                React.createElement('option', { key: 'report', value: 'report' }, currentContent.report)
                            ])
                        ]),
                        // Priority Filter
                        React.createElement('div', {
                            key: 'priority-filter',
                            className: 'w-full xl:w-40'
                        }, [
                            React.createElement('select', {
                                key: 'priority-select',
                                value: filters.priority,
                                onChange: (e) => setFilters(prev => ({ ...prev, priority: e.target.value })),
                                className: 'w-full px-3 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base'
                            }, [
                                React.createElement('option', { key: 'all-priorities', value: 'all' }, currentContent.allPriorities),
                                React.createElement('option', { key: 'high', value: 'high' }, currentContent.high),
                                React.createElement('option', { key: 'medium', value: 'medium' }, currentContent.medium),
                                React.createElement('option', { key: 'low', value: 'low' }, currentContent.low)
                            ])
                        ]),
                        // Select All Toggle
                        React.createElement('div', {
                            key: 'select-all',
                            className: 'w-full xl:w-auto'
                        }, [
                            React.createElement('button', {
                                key: 'select-all-btn',
                                onClick: selectAll,
                                className: 'w-full xl:w-auto px-4 py-2 sm:py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm sm:text-base'
                            }, selectedNotifications.length === filteredNotifications.length && filteredNotifications.length > 0 ? 'إلغاء التحديد' : currentContent.selectAll)
                        ])
                    ])
                ]),

                // Notifications List
                React.createElement('div', {
                    key: 'notifications-list',
                    className: 'bg-white rounded-lg sm:rounded-xl shadow-sm border border-gray-200 overflow-hidden'
                }, [
                    filteredNotifications.length > 0 ? React.createElement('div', {
                        key: 'notifications-container',
                        className: 'divide-y divide-gray-200'
                    }, filteredNotifications.map(notification =>
                        React.createElement('div', {
                            key: notification.id,
                            className: `p-4 sm:p-6 hover:bg-gray-50 transition-colors ${notification.status === 'unread' ? 'bg-blue-50 border-l-4 border-blue-500' : ''}`
                        }, [
                            React.createElement('div', {
                                key: 'notification-header',
                                className: 'flex items-start justify-between gap-4'
                            }, [
                                React.createElement('div', {
                                    key: 'notification-content',
                                    className: 'flex-1 min-w-0'
                                }, [
                                    React.createElement('div', {
                                        key: 'title-row',
                                        className: 'flex items-center gap-3 mb-2'
                                    }, [
                                        React.createElement('input', {
                                            key: 'checkbox',
                                            type: 'checkbox',
                                            checked: selectedNotifications.includes(notification.id),
                                            onChange: () => toggleSelection(notification.id),
                                            className: 'rounded border-gray-300 text-blue-600 focus:ring-blue-500'
                                        }),
                                        React.createElement('span', {
                                            key: 'type-icon',
                                            className: 'text-lg'
                                        }, getTypeIcon(notification.type)),
                                        React.createElement('h3', {
                                            key: 'title',
                                            className: `text-sm sm:text-base font-semibold ${notification.status === 'unread' ? 'text-gray-900' : 'text-gray-700'}`
                                        }, notification.title),
                                        React.createElement('span', {
                                            key: 'type-badge',
                                            className: `inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getTypeColor(notification.type)}`
                                        }, currentContent[notification.type]),
                                        React.createElement('span', {
                                            key: 'priority-badge',
                                            className: `inline-flex px-2 py-1 text-xs font-semibold rounded-full border ${getPriorityColor(notification.priority)}`
                                        }, currentContent[notification.priority])
                                    ]),
                                    React.createElement('p', {
                                        key: 'message',
                                        className: 'text-sm text-gray-600 mb-3 line-clamp-2'
                                    }, notification.message),
                                    React.createElement('div', {
                                        key: 'metadata',
                                        className: 'flex flex-wrap items-center gap-4 text-xs text-gray-500'
                                    }, [
                                        React.createElement('span', {
                                            key: 'timestamp',
                                            className: 'flex items-center gap-1'
                                        }, [
                                            React.createElement('span', { key: 'clock-icon' }, '🕒'),
                                            getTimeAgo(notification.timestamp)
                                        ]),
                                        notification.relatedUser && React.createElement('span', {
                                            key: 'related-user',
                                            className: 'flex items-center gap-1'
                                        }, [
                                            React.createElement('span', { key: 'user-icon' }, '👤'),
                                            notification.relatedUser
                                        ]),
                                        React.createElement('span', {
                                            key: 'related-entity',
                                            className: 'flex items-center gap-1'
                                        }, [
                                            React.createElement('span', { key: 'entity-icon' }, '🔗'),
                                            notification.relatedEntity
                                        ])
                                    ])
                                ]),
                                React.createElement('div', {
                                    key: 'notification-actions',
                                    className: 'flex flex-col sm:flex-row items-end gap-2'
                                }, [
                                    React.createElement('div', {
                                        key: 'status-actions',
                                        className: 'flex gap-1'
                                    }, [
                                        notification.status === 'unread' ? React.createElement('button', {
                                            key: 'mark-read',
                                            onClick: () => markAsRead(notification.id),
                                            className: 'p-2 text-green-600 hover:bg-green-100 rounded-lg transition-colors',
                                            title: currentContent.markRead
                                        }, '✓') : React.createElement('button', {
                                            key: 'mark-unread',
                                            onClick: () => markAsUnread(notification.id),
                                            className: 'p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors',
                                            title: currentContent.markUnread
                                        }, '📩'),
                                        React.createElement('button', {
                                            key: 'delete',
                                            onClick: () => deleteNotification(notification.id),
                                            className: 'p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors',
                                            title: currentContent.delete
                                        }, '🗑️'),
                                        React.createElement('button', {
                                            key: 'archive',
                                            className: 'p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors',
                                            title: currentContent.archive
                                        }, '📥')
                                    ]),
                                    notification.actions && notification.actions.length > 0 && React.createElement('div', {
                                        key: 'custom-actions',
                                        className: 'flex flex-wrap gap-1'
                                    }, notification.actions.slice(0, 2).map((action, actionIndex) =>
                                        React.createElement('button', {
                                            key: actionIndex,
                                            className: 'px-3 py-1 text-xs bg-blue-100 text-blue-800 hover:bg-blue-200 rounded-md transition-colors'
                                        }, action)
                                    ))
                                ])
                            ])
                        ])
                    )) : React.createElement('div', {
                        key: 'no-notifications',
                        className: 'text-center py-12'
                    }, [
                        React.createElement('div', {
                            key: 'no-notifications-icon',
                            className: 'text-gray-400 text-4xl mb-4'
                        }, '🔔'),
                        React.createElement('p', {
                            key: 'no-notifications-text',
                            className: 'text-gray-500 text-lg'
                        }, currentContent.noResults)
                    ])
                ])
            ]);
        };

        // SettingsScreen Component
        const SettingsScreen = ({ isArabic }) => {
            const [activeTab, setActiveTab] = useState('general');
            const [settings, setSettings] = useState({
                general: {
                    companyName: 'SalesFlow العراق',
                    companyEmail: 'info@salesflow-iraq.com',
                    companyPhone: '+964 770 123 4567',
                    companyAddress: 'بغداد، العراق - شارع الرشيد، مجمع التجارة الإلكترونية',
                    timezone: 'Asia/Baghdad',
                    language: 'ar',
                    currency: 'IQD',
                    dateFormat: 'DD/MM/YYYY',
                    logoUrl: '',
                    maintenanceMode: false,
                    allowRegistration: true
                },
                notifications: {
                    emailNotifications: true,
                    smsNotifications: true,
                    pushNotifications: true,
                    marketingEmails: false,
                    systemAlerts: true,
                    paymentNotifications: true,
                    subscriptionAlerts: true,
                    reportNotifications: false,
                    notificationSound: true,
                    emailFrequency: 'immediate'
                },
                security: {
                    twoFactorAuth: false,
                    sessionTimeout: 30,
                    passwordExpiry: 90,
                    loginAttempts: 5,
                    ipWhitelist: '',
                    requireStrongPassword: true,
                    allowMultipleSessions: false,
                    auditLogging: true,
                    encryptData: true,
                    backupFrequency: 'daily'
                },
                appearance: {
                    theme: 'light',
                    primaryColor: '#3B82F6',
                    sidebarCollapsed: false,
                    showAvatars: true,
                    animationsEnabled: true,
                    compactMode: false,
                    rtlSupport: true,
                    fontSize: 'medium',
                    tableRowsPerPage: 10
                },
                billing: {
                    autoPayment: true,
                    invoicePrefix: 'SF-',
                    taxRate: 0,
                    lateFee: 5000,
                    gracePeriod: 7,
                    paymentMethods: ['credit_card', 'bank_transfer', 'cash'],
                    defaultCurrency: 'IQD',
                    invoiceTemplate: 'default',
                    autoReminders: true,
                    reminderDays: [7, 3, 1]
                },
                integrations: {
                    emailProvider: 'sendgrid',
                    smsProvider: 'twilio',
                    paymentGateway: 'stripe',
                    analyticsEnabled: true,
                    googleAnalyticsId: '',
                    facebookPixelId: '',
                    whatsappIntegration: true,
                    telegramNotifications: false,
                    slackWebhook: '',
                    discordWebhook: ''
                }
            });

            const [isLoading, setIsLoading] = useState(false);
            const [showSaveSuccess, setShowSaveSuccess] = useState(false);

            const content = {
                ar: {
                    title: 'إعدادات النظام',
                    subtitle: 'إدارة وتخصيص إعدادات النظام والأمان',
                    saveSettings: 'حفظ الإعدادات',
                    resetSettings: 'إعادة تعيين',
                    exportSettings: 'تصدير الإعدادات',
                    importSettings: 'استيراد الإعدادات',

                    // Tabs
                    general: 'عام',
                    notifications: 'الإشعارات',
                    security: 'الأمان',
                    appearance: 'المظهر',
                    billing: 'الفوترة',
                    integrations: 'التكاملات',

                    // General Settings
                    companyInfo: 'معلومات الشركة',
                    companyName: 'اسم الشركة',
                    companyEmail: 'البريد الإلكتروني',
                    companyPhone: 'رقم الهاتف',
                    companyAddress: 'العنوان',
                    systemSettings: 'إعدادات النظام',
                    timezone: 'المنطقة الزمنية',
                    language: 'اللغة',
                    currency: 'العملة',
                    dateFormat: 'تنسيق التاريخ',
                    logo: 'شعار الشركة',
                    maintenanceMode: 'وضع الصيانة',
                    allowRegistration: 'السماح بالتسجيل',

                    // Notification Settings
                    notificationPreferences: 'تفضيلات الإشعارات',
                    emailNotifications: 'إشعارات البريد الإلكتروني',
                    smsNotifications: 'إشعارات الرسائل النصية',
                    pushNotifications: 'الإشعارات المنبثقة',
                    marketingEmails: 'رسائل التسويق',
                    systemAlerts: 'تنبيهات النظام',
                    paymentNotifications: 'إشعارات الدفع',
                    subscriptionAlerts: 'تنبيهات الاشتراك',
                    reportNotifications: 'إشعارات التقارير',
                    notificationSound: 'صوت الإشعارات',
                    emailFrequency: 'تكرار الإيميل',
                    immediate: 'فوري',
                    daily: 'يومي',
                    weekly: 'أسبوعي',

                    // Security Settings
                    authenticationSecurity: 'الأمان والمصادقة',
                    twoFactorAuth: 'المصادقة الثنائية',
                    sessionTimeout: 'انتهاء الجلسة (دقيقة)',
                    passwordExpiry: 'انتهاء كلمة المرور (يوم)',
                    loginAttempts: 'محاولات تسجيل الدخول',
                    ipWhitelist: 'القائمة البيضاء للـ IP',
                    requireStrongPassword: 'طلب كلمة مرور قوية',
                    allowMultipleSessions: 'السماح بجلسات متعددة',
                    auditLogging: 'تسجيل العمليات',
                    encryptData: 'تشفير البيانات',
                    backupSettings: 'إعدادات النسخ الاحتياطي',
                    backupFrequency: 'تكرار النسخ الاحتياطي',

                    // Appearance Settings
                    themeSettings: 'إعدادات المظهر',
                    theme: 'السمة',
                    light: 'فاتح',
                    dark: 'داكن',
                    auto: 'تلقائي',
                    primaryColor: 'اللون الأساسي',
                    layoutSettings: 'إعدادات التخطيط',
                    sidebarCollapsed: 'طي الشريط الجانبي',
                    showAvatars: 'عرض الصور الشخصية',
                    animationsEnabled: 'تفعيل الحركات',
                    compactMode: 'الوضع المضغوط',
                    rtlSupport: 'دعم من اليمين لليسار',
                    fontSize: 'حجم الخط',
                    small: 'صغير',
                    medium: 'متوسط',
                    large: 'كبير',
                    tableRowsPerPage: 'صفوف الجدول لكل صفحة',

                    // Billing Settings
                    paymentSettings: 'إعدادات الدفع',
                    autoPayment: 'الدفع التلقائي',
                    invoicePrefix: 'بادئة الفاتورة',
                    taxRate: 'معدل الضريبة (%)',
                    lateFee: 'رسوم التأخير (دينار)',
                    gracePeriod: 'فترة السماح (يوم)',
                    paymentMethods: 'طرق الدفع',
                    creditCard: 'بطاقة ائتمان',
                    bankTransfer: 'تحويل بنكي',
                    cash: 'نقدي',
                    defaultCurrency: 'العملة الافتراضية',
                    invoiceTemplate: 'قالب الفاتورة',
                    autoReminders: 'التذكيرات التلقائية',
                    reminderDays: 'أيام التذكير',

                    // Integration Settings
                    externalIntegrations: 'التكاملات الخارجية',
                    emailProvider: 'مزود البريد الإلكتروني',
                    smsProvider: 'مزود الرسائل النصية',
                    paymentGateway: 'بوابة الدفع',
                    analyticsSettings: 'إعدادات التحليلات',
                    analyticsEnabled: 'تفعيل التحليلات',
                    googleAnalyticsId: 'معرف Google Analytics',
                    facebookPixelId: 'معرف Facebook Pixel',
                    socialIntegrations: 'التكاملات الاجتماعية',
                    whatsappIntegration: 'تكامل واتساب',
                    telegramNotifications: 'إشعارات تليجرام',
                    webhookSettings: 'إعدادات Webhook',
                    slackWebhook: 'Slack Webhook',
                    discordWebhook: 'Discord Webhook',

                    // Common
                    enabled: 'مفعل',
                    disabled: 'معطل',
                    save: 'حفظ',
                    cancel: 'إلغاء',
                    reset: 'إعادة تعيين',
                    success: 'تم الحفظ بنجاح!',
                    error: 'حدث خطأ أثناء الحفظ',
                    loading: 'جاري الحفظ...',
                    required: 'مطلوب',
                    optional: 'اختياري'
                }
            };

            const currentContent = content[isArabic ? 'ar' : 'en'] || content.ar;

            const tabs = [
                { id: 'general', label: currentContent.general, icon: '⚙️' },
                { id: 'notifications', label: currentContent.notifications, icon: '🔔' },
                { id: 'security', label: currentContent.security, icon: '🔒' },
                { id: 'appearance', label: currentContent.appearance, icon: '🎨' },
                { id: 'billing', label: currentContent.billing, icon: '💰' },
                { id: 'integrations', label: currentContent.integrations, icon: '🔗' }
            ];

            const handleSettingChange = (category, setting, value) => {
                setSettings(prev => ({
                    ...prev,
                    [category]: {
                        ...prev[category],
                        [setting]: value
                    }
                }));
            };

            const handleSave = async () => {
                setIsLoading(true);
                try {
                    // Simulate API call
                    await new Promise(resolve => setTimeout(resolve, 2000));
                    setShowSaveSuccess(true);
                    setTimeout(() => setShowSaveSuccess(false), 3000);
                } catch (error) {
                    console.error('Error saving settings:', error);
                } finally {
                    setIsLoading(false);
                }
            };

            const renderGeneralSettings = () => {
                return React.createElement('div', {
                    className: 'space-y-6'
                }, [
                    // Company Information
                    React.createElement('div', {
                        key: 'company-info',
                        className: 'bg-white rounded-lg border border-gray-200 p-6'
                    }, [
                        React.createElement('h3', {
                            key: 'title',
                            className: 'text-lg font-semibold text-gray-900 mb-4'
                        }, currentContent.companyInfo),
                        React.createElement('div', {
                            key: 'fields',
                            className: 'grid grid-cols-1 md:grid-cols-2 gap-4'
                        }, [
                            React.createElement('div', { key: 'company-name' }, [
                                React.createElement('label', {
                                    className: 'block text-sm font-medium text-gray-700 mb-2'
                                }, currentContent.companyName),
                                React.createElement('input', {
                                    type: 'text',
                                    value: settings.general.companyName,
                                    onChange: (e) => handleSettingChange('general', 'companyName', e.target.value),
                                    className: 'w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                                })
                            ]),
                            React.createElement('div', { key: 'company-email' }, [
                                React.createElement('label', {
                                    className: 'block text-sm font-medium text-gray-700 mb-2'
                                }, currentContent.companyEmail),
                                React.createElement('input', {
                                    type: 'email',
                                    value: settings.general.companyEmail,
                                    onChange: (e) => handleSettingChange('general', 'companyEmail', e.target.value),
                                    className: 'w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                                })
                            ]),
                            React.createElement('div', { key: 'company-phone' }, [
                                React.createElement('label', {
                                    className: 'block text-sm font-medium text-gray-700 mb-2'
                                }, currentContent.companyPhone),
                                React.createElement('input', {
                                    type: 'tel',
                                    value: settings.general.companyPhone,
                                    onChange: (e) => handleSettingChange('general', 'companyPhone', e.target.value),
                                    className: 'w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                                })
                            ]),
                            React.createElement('div', { key: 'company-address', className: 'md:col-span-2' }, [
                                React.createElement('label', {
                                    className: 'block text-sm font-medium text-gray-700 mb-2'
                                }, currentContent.companyAddress),
                                React.createElement('textarea', {
                                    value: settings.general.companyAddress,
                                    onChange: (e) => handleSettingChange('general', 'companyAddress', e.target.value),
                                    rows: 3,
                                    className: 'w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                                })
                            ])
                        ])
                    ]),

                    // System Settings
                    React.createElement('div', {
                        key: 'system-settings',
                        className: 'bg-white rounded-lg border border-gray-200 p-6'
                    }, [
                        React.createElement('h3', {
                            key: 'title',
                            className: 'text-lg font-semibold text-gray-900 mb-4'
                        }, currentContent.systemSettings),
                        React.createElement('div', {
                            key: 'fields',
                            className: 'grid grid-cols-1 md:grid-cols-2 gap-4'
                        }, [
                            React.createElement('div', { key: 'timezone' }, [
                                React.createElement('label', {
                                    className: 'block text-sm font-medium text-gray-700 mb-2'
                                }, currentContent.timezone),
                                React.createElement('select', {
                                    value: settings.general.timezone,
                                    onChange: (e) => handleSettingChange('general', 'timezone', e.target.value),
                                    className: 'w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                                }, [
                                    React.createElement('option', { key: 'baghdad', value: 'Asia/Baghdad' }, 'Asia/Baghdad (GMT+3)'),
                                    React.createElement('option', { key: 'dubai', value: 'Asia/Dubai' }, 'Asia/Dubai (GMT+4)'),
                                    React.createElement('option', { key: 'riyadh', value: 'Asia/Riyadh' }, 'Asia/Riyadh (GMT+3)')
                                ])
                            ]),
                            React.createElement('div', { key: 'language' }, [
                                React.createElement('label', {
                                    className: 'block text-sm font-medium text-gray-700 mb-2'
                                }, currentContent.language),
                                React.createElement('select', {
                                    value: settings.general.language,
                                    onChange: (e) => handleSettingChange('general', 'language', e.target.value),
                                    className: 'w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                                }, [
                                    React.createElement('option', { key: 'ar', value: 'ar' }, 'العربية'),
                                    React.createElement('option', { key: 'en', value: 'en' }, 'English')
                                ])
                            ]),
                            React.createElement('div', { key: 'currency' }, [
                                React.createElement('label', {
                                    className: 'block text-sm font-medium text-gray-700 mb-2'
                                }, currentContent.currency),
                                React.createElement('select', {
                                    value: settings.general.currency,
                                    onChange: (e) => handleSettingChange('general', 'currency', e.target.value),
                                    className: 'w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                                }, [
                                    React.createElement('option', { key: 'iqd', value: 'IQD' }, 'دينار عراقي (IQD)'),
                                    React.createElement('option', { key: 'usd', value: 'USD' }, 'دولار أمريكي (USD)'),
                                    React.createElement('option', { key: 'eur', value: 'EUR' }, 'يورو (EUR)')
                                ])
                            ]),
                            React.createElement('div', { key: 'date-format' }, [
                                React.createElement('label', {
                                    className: 'block text-sm font-medium text-gray-700 mb-2'
                                }, currentContent.dateFormat),
                                React.createElement('select', {
                                    value: settings.general.dateFormat,
                                    onChange: (e) => handleSettingChange('general', 'dateFormat', e.target.value),
                                    className: 'w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                                }, [
                                    React.createElement('option', { key: 'dd-mm-yyyy', value: 'DD/MM/YYYY' }, 'DD/MM/YYYY'),
                                    React.createElement('option', { key: 'mm-dd-yyyy', value: 'MM/DD/YYYY' }, 'MM/DD/YYYY'),
                                    React.createElement('option', { key: 'yyyy-mm-dd', value: 'YYYY-MM-DD' }, 'YYYY-MM-DD')
                                ])
                            ])
                        ]),
                        React.createElement('div', {
                            key: 'toggles',
                            className: 'mt-6 space-y-4'
                        }, [
                            React.createElement('div', { key: 'maintenance-mode', className: 'flex items-center justify-between' }, [
                                React.createElement('div', {}, [
                                    React.createElement('h4', { className: 'text-sm font-medium text-gray-900' }, currentContent.maintenanceMode),
                                    React.createElement('p', { className: 'text-sm text-gray-500' }, 'تعطيل الوصول العام للنظام للصيانة')
                                ]),
                                React.createElement('label', { className: 'relative inline-flex items-center cursor-pointer' }, [
                                    React.createElement('input', {
                                        type: 'checkbox',
                                        checked: settings.general.maintenanceMode,
                                        onChange: (e) => handleSettingChange('general', 'maintenanceMode', e.target.checked),
                                        className: 'sr-only peer'
                                    }),
                                    React.createElement('div', {
                                        className: "w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"
                                    })
                                ])
                            ]),
                            React.createElement('div', { key: 'allow-registration', className: 'flex items-center justify-between' }, [
                                React.createElement('div', {}, [
                                    React.createElement('h4', { className: 'text-sm font-medium text-gray-900' }, currentContent.allowRegistration),
                                    React.createElement('p', { className: 'text-sm text-gray-500' }, 'السماح للمستخدمين الجدد بالتسجيل')
                                ]),
                                React.createElement('label', { className: 'relative inline-flex items-center cursor-pointer' }, [
                                    React.createElement('input', {
                                        type: 'checkbox',
                                        checked: settings.general.allowRegistration,
                                        onChange: (e) => handleSettingChange('general', 'allowRegistration', e.target.checked),
                                        className: 'sr-only peer'
                                    }),
                                    React.createElement('div', {
                                        className: "w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"
                                    })
                                ])
                            ])
                        ])
                    ])
                ]);
            };

            const renderNotificationSettings = () => {
                return React.createElement('div', {
                    className: 'bg-white rounded-lg border border-gray-200 p-6'
                }, [
                    React.createElement('h3', {
                        key: 'title',
                        className: 'text-lg font-semibold text-gray-900 mb-6'
                    }, currentContent.notificationPreferences),
                    React.createElement('div', {
                        key: 'settings',
                        className: 'space-y-4'
                    }, [
                        React.createElement('div', { key: 'email-notifications', className: 'flex items-center justify-between' }, [
                            React.createElement('div', {}, [
                                React.createElement('h4', { className: 'text-sm font-medium text-gray-900' }, currentContent.emailNotifications),
                                React.createElement('p', { className: 'text-sm text-gray-500' }, 'استقبال الإشعارات عبر البريد الإلكتروني')
                            ]),
                            React.createElement('label', { className: 'relative inline-flex items-center cursor-pointer' }, [
                                React.createElement('input', {
                                    type: 'checkbox',
                                    checked: settings.notifications.emailNotifications,
                                    onChange: (e) => handleSettingChange('notifications', 'emailNotifications', e.target.checked),
                                    className: 'sr-only peer'
                                }),
                                React.createElement('div', {
                                    className: "w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"
                                })
                            ])
                        ]),
                        React.createElement('div', { key: 'sms-notifications', className: 'flex items-center justify-between' }, [
                            React.createElement('div', {}, [
                                React.createElement('h4', { className: 'text-sm font-medium text-gray-900' }, currentContent.smsNotifications),
                                React.createElement('p', { className: 'text-sm text-gray-500' }, 'استقبال الإشعارات عبر الرسائل النصية')
                            ]),
                            React.createElement('label', { className: 'relative inline-flex items-center cursor-pointer' }, [
                                React.createElement('input', {
                                    type: 'checkbox',
                                    checked: settings.notifications.smsNotifications,
                                    onChange: (e) => handleSettingChange('notifications', 'smsNotifications', e.target.checked),
                                    className: 'sr-only peer'
                                }),
                                React.createElement('div', {
                                    className: "w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"
                                })
                            ])
                        ]),
                        React.createElement('div', { key: 'push-notifications', className: 'flex items-center justify-between' }, [
                            React.createElement('div', {}, [
                                React.createElement('h4', { className: 'text-sm font-medium text-gray-900' }, currentContent.pushNotifications),
                                React.createElement('p', { className: 'text-sm text-gray-500' }, 'عرض الإشعارات المنبثقة في المتصفح')
                            ]),
                            React.createElement('label', { className: 'relative inline-flex items-center cursor-pointer' }, [
                                React.createElement('input', {
                                    type: 'checkbox',
                                    checked: settings.notifications.pushNotifications,
                                    onChange: (e) => handleSettingChange('notifications', 'pushNotifications', e.target.checked),
                                    className: 'sr-only peer'
                                }),
                                React.createElement('div', {
                                    className: "w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"
                                })
                            ])
                        ]),
                        React.createElement('div', { key: 'system-alerts', className: 'flex items-center justify-between' }, [
                            React.createElement('div', {}, [
                                React.createElement('h4', { className: 'text-sm font-medium text-gray-900' }, currentContent.systemAlerts),
                                React.createElement('p', { className: 'text-sm text-gray-500' }, 'تنبيهات هامة حول النظام والأمان')
                            ]),
                            React.createElement('label', { className: 'relative inline-flex items-center cursor-pointer' }, [
                                React.createElement('input', {
                                    type: 'checkbox',
                                    checked: settings.notifications.systemAlerts,
                                    onChange: (e) => handleSettingChange('notifications', 'systemAlerts', e.target.checked),
                                    className: 'sr-only peer'
                                }),
                                React.createElement('div', {
                                    className: "w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"
                                })
                            ])
                        ]),
                        React.createElement('div', { key: 'payment-notifications', className: 'flex items-center justify-between' }, [
                            React.createElement('div', {}, [
                                React.createElement('h4', { className: 'text-sm font-medium text-gray-900' }, currentContent.paymentNotifications),
                                React.createElement('p', { className: 'text-sm text-gray-500' }, 'إشعارات عمليات الدفع والفواتير')
                            ]),
                            React.createElement('label', { className: 'relative inline-flex items-center cursor-pointer' }, [
                                React.createElement('input', {
                                    type: 'checkbox',
                                    checked: settings.notifications.paymentNotifications,
                                    onChange: (e) => handleSettingChange('notifications', 'paymentNotifications', e.target.checked),
                                    className: 'sr-only peer'
                                }),
                                React.createElement('div', {
                                    className: "w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"
                                })
                            ])
                        ]),
                        React.createElement('div', { key: 'email-frequency', className: 'mt-6' }, [
                            React.createElement('label', {
                                className: 'block text-sm font-medium text-gray-700 mb-2'
                            }, currentContent.emailFrequency),
                            React.createElement('select', {
                                value: settings.notifications.emailFrequency,
                                onChange: (e) => handleSettingChange('notifications', 'emailFrequency', e.target.value),
                                className: 'w-full md:w-64 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                            }, [
                                React.createElement('option', { key: 'immediate', value: 'immediate' }, currentContent.immediate),
                                React.createElement('option', { key: 'daily', value: 'daily' }, currentContent.daily),
                                React.createElement('option', { key: 'weekly', value: 'weekly' }, currentContent.weekly)
                            ])
                        ])
                    ])
                ]);
            };

            const renderTabContent = () => {
                switch (activeTab) {
                    case 'general':
                        return renderGeneralSettings();
                    case 'notifications':
                        return renderNotificationSettings();
                    case 'security':
                        return React.createElement('div', { className: 'bg-white rounded-lg border border-gray-200 p-6' }, [
                            React.createElement('h3', { key: 'title', className: 'text-lg font-semibold text-gray-900 mb-4' }, currentContent.authenticationSecurity),
                            React.createElement('p', { key: 'description', className: 'text-gray-600' }, 'إعدادات الأمان والمصادقة قيد التطوير...')
                        ]);
                    case 'appearance':
                        return React.createElement('div', { className: 'bg-white rounded-lg border border-gray-200 p-6' }, [
                            React.createElement('h3', { key: 'title', className: 'text-lg font-semibold text-gray-900 mb-4' }, currentContent.themeSettings),
                            React.createElement('p', { key: 'description', className: 'text-gray-600' }, 'إعدادات المظهر والسمة قيد التطوير...')
                        ]);
                    case 'billing':
                        return React.createElement('div', { className: 'bg-white rounded-lg border border-gray-200 p-6' }, [
                            React.createElement('h3', { key: 'title', className: 'text-lg font-semibold text-gray-900 mb-4' }, currentContent.paymentSettings),
                            React.createElement('p', { key: 'description', className: 'text-gray-600' }, 'إعدادات الفوترة والدفع قيد التطوير...')
                        ]);
                    case 'integrations':
                        return React.createElement('div', { className: 'bg-white rounded-lg border border-gray-200 p-6' }, [
                            React.createElement('h3', { key: 'title', className: 'text-lg font-semibold text-gray-900 mb-4' }, currentContent.externalIntegrations),
                            React.createElement('p', { key: 'description', className: 'text-gray-600' }, 'التكاملات الخارجية قيد التطوير...')
                        ]);
                    default:
                        return renderGeneralSettings();
                }
            };

            return React.createElement('div', {
                className: 'settings-screen space-y-4 sm:space-y-6'
            }, [
                // Page Header
                React.createElement('div', {
                    key: 'header',
                    className: 'flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4'
                }, [
                    React.createElement('div', { key: 'title-section' }, [
                        React.createElement('h1', {
                            key: 'title',
                            className: 'text-2xl sm:text-3xl font-bold text-gray-900'
                        }, currentContent.title),
                        React.createElement('p', {
                            key: 'subtitle',
                            className: 'text-sm sm:text-base text-gray-600 mt-1'
                        }, currentContent.subtitle)
                    ]),
                    React.createElement('div', {
                        key: 'actions',
                        className: 'flex flex-col sm:flex-row gap-2'
                    }, [
                        React.createElement('button', {
                            key: 'save-button',
                            onClick: handleSave,
                            disabled: isLoading,
                            className: 'w-full sm:w-auto bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center gap-2'
                        }, [
                            isLoading ? React.createElement('div', {
                                key: 'spinner',
                                className: 'animate-spin rounded-full h-4 w-4 border-b-2 border-white'
                            }) : React.createElement('span', { key: 'icon' }, '💾'),
                            React.createElement('span', { key: 'text' }, isLoading ? currentContent.loading : currentContent.saveSettings)
                        ]),
                        React.createElement('button', {
                            key: 'export-button',
                            className: 'w-full sm:w-auto bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center gap-2'
                        }, [
                            React.createElement('span', { key: 'icon' }, '📤'),
                            React.createElement('span', { key: 'text' }, currentContent.exportSettings)
                        ])
                    ])
                ]),

                // Success Message
                showSaveSuccess && React.createElement('div', {
                    key: 'success-message',
                    className: 'bg-green-50 border border-green-200 rounded-lg p-4'
                }, [
                    React.createElement('div', {
                        className: 'flex items-center'
                    }, [
                        React.createElement('span', { key: 'icon', className: 'text-green-500 text-xl mr-3' }, '✅'),
                        React.createElement('span', { key: 'text', className: 'text-green-800 font-medium' }, currentContent.success)
                    ])
                ]),

                // Tabs Navigation
                React.createElement('div', {
                    key: 'tabs',
                    className: 'bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden'
                }, [
                    React.createElement('div', {
                        key: 'tab-headers',
                        className: 'border-b border-gray-200'
                    }, [
                        React.createElement('nav', {
                            className: 'flex overflow-x-auto'
                        }, tabs.map(tab =>
                            React.createElement('button', {
                                key: tab.id,
                                onClick: () => setActiveTab(tab.id),
                                className: `flex items-center gap-2 px-4 sm:px-6 py-3 sm:py-4 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
                                    activeTab === tab.id
                                        ? 'border-blue-500 text-blue-600 bg-blue-50'
                                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                }`
                            }, [
                                React.createElement('span', { key: 'icon' }, tab.icon),
                                React.createElement('span', { key: 'label' }, tab.label)
                            ])
                        ))
                    ]),
                    React.createElement('div', {
                        key: 'tab-content',
                        className: 'p-4 sm:p-6'
                    }, renderTabContent())
                ])
            ]);
        };

        // SubscriptionsScreen Component
        const SubscriptionsScreen = ({ isArabic }) => {
            // Add State for customer search
            const [customerSearchTerm, setCustomerSearchTerm] = React.useState('');
            const [showCustomerDropdown, setShowCustomerDropdown] = React.useState(false);
            const [filteredCustomers, setFilteredCustomers] = React.useState([]);

            // Sample customers data for search
            const customers = [
                { id: 1, name: 'أحمد حسين الجبوري', email: 'ahmed.aljubouri@example.com', phone: '07901234567' },
                { id: 2, name: 'فاطمة علي البصري', email: 'fatma.albasri@example.com', phone: '07712345678' },
                { id: 3, name: 'محمد عبد الله الكربلائي', email: 'mohamed.karbalaee@example.com', phone: '07823456789' },
                { id: 4, name: 'نورا خالد الموصلي', email: 'nora.almosuli@example.com', phone: '07934567890' },
                { id: 5, name: 'عمر صالح النجفي', email: 'omar.alnajafi@example.com', phone: '07745678901' },
                { id: 6, name: 'زينب حسن السليماني', email: 'zeinab.sulaimani@example.com', phone: '07856789012' },
                { id: 7, name: 'علي محمد الكاظمي', email: 'ali.alkadhimi@example.com', phone: '07967890123' },
                { id: 8, name: 'سارة أحمد البغدادي', email: 'sara.albaghdadi@example.com', phone: '07678901234' }
            ];

            const [subscriptions, setSubscriptions] = useState([
                {
                    id: 1,
                    customerName: 'أحمد حسين الجبوري',
                    email: 'ahmed.aljubouri@example.com',
                    planName: 'باقة البرونز',
                    planPrice: '25,000 دينار',
                    status: 'نشط',
                    startDate: '2024-01-15',
                    endDate: '2025-01-15',
                    nextPayment: '2024-12-15',
                    totalPaid: '250,000 دينار',
                    paymentMethod: 'بطاقة ائتمان',
                    avatar: 'https://ui-avatars.com/api/?name=Ahmed+Aljubouri&background=3b82f6&color=white'
                },
                {
                    id: 2,
                    customerName: 'فاطمة علي البصري',
                    email: 'fatma.albasri@example.com',
                    planName: 'باقة الذهب',
                    planPrice: '50,000 دينار',
                    status: 'نشط',
                    startDate: '2024-02-20',
                    endDate: '2025-02-20',
                    nextPayment: '2024-12-20',
                    totalPaid: '520,000 دينار',
                    paymentMethod: 'تحويل بنكي',
                    avatar: 'https://ui-avatars.com/api/?name=Fatma+Albasri&background=10b981&color=white'
                },
                {
                    id: 3,
                    customerName: 'محمد عبد الله الكربلائي',
                    email: 'mohamed.karbalaee@example.com',
                    planName: 'باقة الفضة',
                    planPrice: '35,000 دينار',
                    status: 'منتهي',
                    startDate: '2024-03-10',
                    endDate: '2024-09-10',
                    nextPayment: 'انتهى',
                    totalPaid: '180,000 دينار',
                    paymentMethod: 'كاش',
                    avatar: 'https://ui-avatars.com/api/?name=Mohamed+Karbalaee&background=f59e0b&color=white'
                },
                {
                    id: 4,
                    customerName: 'نورا خالد الموصلي',
                    email: 'nora.almosuli@example.com',
                    planName: 'باقة البرونز',
                    planPrice: '25,000 دينار',
                    status: 'معلق',
                    startDate: '2024-03-25',
                    endDate: '2025-03-25',
                    nextPayment: 'معلق',
                    totalPaid: '100,000 دينار',
                    paymentMethod: 'بطاقة ائتمان',
                    avatar: 'https://ui-avatars.com/api/?name=Nora+Almosuli&background=8b5cf6&color=white'
                },
                {
                    id: 5,
                    customerName: 'عمر صالح النجفي',
                    email: 'omar.alnajafi@example.com',
                    planName: 'باقة الذهب',
                    planPrice: '50,000 دينار',
                    status: 'نشط',
                    startDate: '2024-04-05',
                    endDate: '2025-04-05',
                    nextPayment: '2024-12-05',
                    totalPaid: '480,000 دينار',
                    paymentMethod: 'تحويل بنكي',
                    avatar: 'https://ui-avatars.com/api/?name=Omar+Alnajafi&background=ef4444&color=white'
                },
                {
                    id: 6,
                    customerName: 'زينب مهدي البغدادي',
                    email: 'zainab.albaghdadi@example.com',
                    planName: 'باقة الفضة',
                    planPrice: '35,000 دينار',
                    status: 'نشط',
                    startDate: '2024-04-12',
                    endDate: '2025-04-12',
                    nextPayment: '2024-12-12',
                    totalPaid: '350,000 دينار',
                    paymentMethod: 'بطاقة ائتمان',
                    avatar: 'https://ui-avatars.com/api/?name=Zainab+Albaghdadi&background=06b6d4&color=white'
                }
            ]);

            const [searchTerm, setSearchTerm] = useState('');
            const [statusFilter, setStatusFilter] = useState('all');
            const [planFilter, setPlanFilter] = useState('all');
            const [showAddModal, setShowAddModal] = useState(false);
            const [showEditModal, setShowEditModal] = useState(false);
            const [showViewModal, setShowViewModal] = useState(false);
            const [showDeleteModal, setShowDeleteModal] = useState(false);
            const [selectedSubscription, setSelectedSubscription] = useState(null);
            const [formData, setFormData] = useState({
                customerName: '',
                email: '',
                planName: 'باقة البرونز',
                planPrice: '25,000 دينار',
                status: 'نشط',
                startDate: '',
                endDate: '',
                paymentMethod: 'بطاقة ائتمان',
                totalPaid: '0 دينار'
            });

            const content = {
                ar: {
                    title: 'إدارة الاشتراكات',
                    subtitle: 'عرض وإدارة جميع اشتراكات العملاء',
                    search: 'البحث عن اشتراك...',
                    addSubscription: 'إضافة اشتراك جديد',
                    editSubscription: 'تعديل الاشتراك',
                    viewSubscription: 'عرض تفاصيل الاشتراك',
                    deleteSubscription: 'حذف الاشتراك',
                    allStatus: 'جميع الحالات',
                    allPlans: 'جميع الباقات',
                    active: 'نشط',
                    suspended: 'معلق',
                    expired: 'منتهي',
                    customer: 'العميل',
                    plan: 'الباقة',
                    price: 'السعر',
                    status: 'الحالة',
                    startDate: 'تاريخ البداية',
                    endDate: 'تاريخ الانتهاء',
                    nextPayment: 'الدفعة القادمة',
                    totalPaid: 'إجمالي المدفوع',
                    paymentMethod: 'طريقة الدفع',
                    actions: 'الإجراءات',
                    edit: 'تعديل',
                    delete: 'حذف',
                    cancel: 'إلغاء',
                    renew: 'تجديد',
                    view: 'عرض',
                    save: 'حفظ',
                    confirm: 'تأكيد',
                    close: 'إغلاق',
                    noResults: 'لا توجد نتائج للبحث',
                    totalSubscriptions: 'إجمالي الاشتراكات',
                    activeSubscriptions: 'الاشتراكات النشطة',
                    expiredSubscriptions: 'الاشتراكات المنتهية',
                    suspendedSubscriptions: 'الاشتراكات المعلقة',
                    monthlyRevenue: 'الإيرادات الشهرية',
                    bronzePlan: 'باقة البرونز',
                    silverPlan: 'باقة الفضة',
                    goldPlan: 'باقة الذهب',
                    enterprisePlan: 'باقة المؤسسات',

                    // Form labels
                    customerName: 'اسم العميل',
                    customerEmail: 'البريد الإلكتروني',
                    selectPlan: 'اختر الباقة',
                    selectStatus: 'اختر الحالة',
                    selectPaymentMethod: 'اختر طريقة الدفع',
                    subscriptionStartDate: 'تاريخ بداية الاشتراك',
                    subscriptionEndDate: 'تاريخ انتهاء الاشتراك',

                    // Payment methods
                    creditCard: 'بطاقة ائتمان',
                    bankTransfer: 'تحويل بنكي',
                    cash: 'كاش',

                    // Messages
                    addSuccess: 'تم إضافة الاشتراك بنجاح!',
                    updateSuccess: 'تم تحديث الاشتراك بنجاح!',
                    deleteSuccess: 'تم حذف الاشتراك بنجاح!',
                    deleteConfirmMessage: 'هل أنت متأكد من حذف هذا الاشتراك؟ لا يمكن التراجع عن هذا الإجراء.',
                    errorMessage: 'حدث خطأ أثناء العملية. حاول مرة أخرى.',
                    requiredField: 'هذا الحقل مطلوب',
                    invalidEmail: 'البريد الإلكتروني غير صحيح',

                    // Placeholders
                    enterCustomerName: 'أدخل اسم العميل',
                    enterEmail: 'أدخل البريد الإلكتروني',

                    // Subscription details
                    subscriptionDetails: 'تفاصيل الاشتراك',
                    subscriptionId: 'رقم الاشتراك',
                    subscribedOn: 'مشترك منذ',
                    expiresOn: 'ينتهي في',
                    lastPayment: 'آخر دفعة',
                    subscriptionStatus: 'حالة الاشتراك',
                    currentPlan: 'الباقة الحالية',
                    planFeatures: 'مميزات الباقة'
                }
            };

            const currentContent = content[isArabic ? 'ar' : 'en'] || content.ar;

            // Filter customers based on search term
            React.useEffect(() => {
                if (customerSearchTerm) {
                    const filtered = customers.filter(customer =>
                        customer.name.toLowerCase().includes(customerSearchTerm.toLowerCase()) ||
                        customer.email.toLowerCase().includes(customerSearchTerm.toLowerCase()) ||
                        customer.phone.includes(customerSearchTerm)
                    );
                    setFilteredCustomers(filtered);
                    setShowCustomerDropdown(true);
                } else {
                    setFilteredCustomers([]);
                    setShowCustomerDropdown(false);
                }
            }, [customerSearchTerm]);

            // Select customer from dropdown
            const selectCustomer = (customer) => {
                setFormData({
                    ...formData,
                    customerName: customer.name,
                    email: customer.email
                });
                setCustomerSearchTerm(customer.name);
                setShowCustomerDropdown(false);
            };

            // CRUD Functions
            const handleAddSubscription = () => {
                const today = new Date();
                const oneYearLater = new Date(today);
                oneYearLater.setFullYear(today.getFullYear() + 1);

                setFormData({
                    customerName: '',
                    email: '',
                    planName: 'باقة البرونز',
                    planPrice: '25,000 دينار',
                    status: 'نشط',
                    startDate: today.toISOString().split('T')[0],
                    endDate: oneYearLater.toISOString().split('T')[0],
                    paymentMethod: 'بطاقة ائتمان',
                    totalPaid: '0 دينار'
                });
                setCustomerSearchTerm('');
                setShowCustomerDropdown(false);
                setShowAddModal(true);
            };

            const handleRenewSubscription = (subscription) => {
                const today = new Date();
                const oneYearLater = new Date(today);
                oneYearLater.setFullYear(today.getFullYear() + 1);

                const updatedSubscriptions = subscriptions.map(sub =>
                    sub.id === subscription.id
                        ? {
                            ...sub,
                            status: 'نشط',
                            startDate: today.toISOString().split('T')[0],
                            endDate: oneYearLater.toISOString().split('T')[0],
                            nextPayment: oneYearLater.toISOString().split('T')[0]
                        }
                        : sub
                );
                setSubscriptions(updatedSubscriptions);
                alert('تم تجديد الاشتراك بنجاح!');
            };

            const handleEditSubscription = (subscription) => {
                setSelectedSubscription(subscription);
                setFormData({
                    customerName: subscription.customerName,
                    email: subscription.email,
                    planName: subscription.planName,
                    planPrice: subscription.planPrice,
                    status: subscription.status,
                    startDate: subscription.startDate,
                    endDate: subscription.endDate,
                    paymentMethod: subscription.paymentMethod,
                    totalPaid: subscription.totalPaid
                });
                setShowEditModal(true);
            };

            const handleViewSubscription = (subscription) => {
                setSelectedSubscription(subscription);
                setShowViewModal(true);
            };

            const handleDeleteSubscription = (subscription) => {
                setSelectedSubscription(subscription);
                setShowDeleteModal(true);
            };

            const saveSubscription = () => {
                // Validation
                if (!formData.customerName || !formData.email) {
                    alert(currentContent.requiredField);
                    return;
                }

                if (!/\S+@\S+\.\S+/.test(formData.email)) {
                    alert(currentContent.invalidEmail);
                    return;
                }

                if (showAddModal) {
                    // Add new subscription
                    const newSubscription = {
                        id: Math.max(...subscriptions.map(s => s.id)) + 1,
                        ...formData,
                        nextPayment: formData.status === 'نشط' ? formData.endDate : 'معلق',
                        avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(formData.customerName)}&background=3b82f6&color=white`
                    };
                    setSubscriptions([...subscriptions, newSubscription]);
                    alert(currentContent.addSuccess);
                } else if (showEditModal) {
                    // Update existing subscription
                    const updatedSubscriptions = subscriptions.map(subscription =>
                        subscription.id === selectedSubscription.id
                            ? { ...subscription, ...formData, nextPayment: formData.status === 'نشط' ? formData.endDate : 'معلق' }
                            : subscription
                    );
                    setSubscriptions(updatedSubscriptions);
                    alert(currentContent.updateSuccess);
                }

                // Close modals
                setShowAddModal(false);
                setShowEditModal(false);
                setSelectedSubscription(null);
            };

            const confirmDelete = () => {
                const updatedSubscriptions = subscriptions.filter(subscription => subscription.id !== selectedSubscription.id);
                setSubscriptions(updatedSubscriptions);
                setShowDeleteModal(false);
                setSelectedSubscription(null);
                alert(currentContent.deleteSuccess);
            };

            const closeModals = () => {
                setShowAddModal(false);
                setShowEditModal(false);
                setShowViewModal(false);
                setShowDeleteModal(false);
                setSelectedSubscription(null);
                setCustomerSearchTerm('');
                setShowCustomerDropdown(false);
            };

            const getPlanPrice = (planName) => {
                switch (planName) {
                    case 'باقة البرونز': return '25,000 دينار';
                    case 'باقة الفضة': return '35,000 دينار';
                    case 'باقة الذهب': return '50,000 دينار';
                    case 'باقة المؤسسات': return '100,000 دينار';
                    default: return '25,000 دينار';
                }
            };

            // Filter subscriptions
            const filteredSubscriptions = subscriptions.filter(subscription => {
                const matchesSearch = subscription.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                    subscription.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                    subscription.planName.toLowerCase().includes(searchTerm.toLowerCase());
                const matchesStatus = statusFilter === 'all' || subscription.status === statusFilter;
                const matchesPlan = planFilter === 'all' || subscription.planName === planFilter;
                return matchesSearch && matchesStatus && matchesPlan;
            });

            // Calculate stats
            const stats = [
                {
                    title: currentContent.totalSubscriptions,
                    value: subscriptions.length.toString(),
                    icon: '📊',
                    color: 'bg-blue-500'
                },
                {
                    title: currentContent.activeSubscriptions,
                    value: subscriptions.filter(s => s.status === 'نشط').length.toString(),
                    icon: '✅',
                    color: 'bg-green-500'
                },
                {
                    title: currentContent.expiredSubscriptions,
                    value: subscriptions.filter(s => s.status === 'منتهي').length.toString(),
                    icon: '❌',
                    color: 'bg-red-500'
                },
                {
                    title: currentContent.suspendedSubscriptions,
                    value: subscriptions.filter(s => s.status === 'معلق').length.toString(),
                    icon: '⏸️',
                    color: 'bg-yellow-500'
                },
                {
                    title: currentContent.monthlyRevenue,
                    value: '1,450,000 د.ع',
                    icon: '💰',
                    color: 'bg-purple-500'
                }
            ];

            const getStatusColor = (status) => {
                switch (status) {
                    case 'نشط': return 'bg-green-100 text-green-800';
                    case 'معلق': return 'bg-yellow-100 text-yellow-800';
                    case 'منتهي': return 'bg-red-100 text-red-800';
                    default: return 'bg-gray-100 text-gray-800';
                }
            };

            const getPlanColor = (planName) => {
                switch (planName) {
                    case 'باقة البرونز': return 'bg-amber-100 text-amber-800';
                    case 'باقة الفضة': return 'bg-gray-100 text-gray-800';
                    case 'باقة الذهب': return 'bg-yellow-100 text-yellow-800';
                    default: return 'bg-blue-100 text-blue-800';
                }
            };

            return React.createElement('div', {
                className: 'subscriptions-screen space-y-4 sm:space-y-6'
            }, [
                // Page Header
                React.createElement('div', {
                    key: 'header',
                    className: 'flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4'
                }, [
                    React.createElement('div', { key: 'title-section' }, [
                        React.createElement('h1', {
                            key: 'title',
                            className: 'text-2xl sm:text-3xl font-bold text-gray-900'
                        }, currentContent.title),
                        React.createElement('p', {
                            key: 'subtitle',
                            className: 'text-sm sm:text-base text-gray-600 mt-1'
                        }, currentContent.subtitle)
                    ]),
                    React.createElement('button', {
                        key: 'add-button',
                        onClick: handleAddSubscription,
                        className: 'w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center gap-2'
                    }, [
                        React.createElement('span', { key: 'icon' }, '➕'),
                        React.createElement('span', { key: 'text' }, currentContent.addSubscription)
                    ])
                ]),

                // Stats Grid
                React.createElement('div', {
                    key: 'stats',
                    className: 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4'
                }, stats.map((stat, index) =>
                    React.createElement('div', {
                        key: index,
                        className: 'bg-white rounded-lg sm:rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6'
                    }, [
                        React.createElement('div', {
                            key: 'stat-content',
                            className: 'flex items-center justify-between'
                        }, [
                            React.createElement('div', { key: 'text' }, [
                                React.createElement('p', {
                                    key: 'title',
                                    className: 'text-xs sm:text-sm font-medium text-gray-600 mb-1'
                                }, stat.title),
                                React.createElement('p', {
                                    key: 'value',
                                    className: 'text-lg sm:text-xl font-bold text-gray-900'
                                }, stat.value)
                            ]),
                            React.createElement('div', {
                                key: 'icon',
                                className: `${stat.color} text-white p-2 sm:p-3 rounded-lg text-base sm:text-lg`
                            }, stat.icon)
                        ])
                    ])
                )),

                // Filters Section
                React.createElement('div', {
                    key: 'filters',
                    className: 'bg-white rounded-lg sm:rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6'
                }, [
                    React.createElement('div', {
                        key: 'filters-content',
                        className: 'flex flex-col lg:flex-row gap-4'
                    }, [
                        // Search Input
                        React.createElement('div', {
                            key: 'search',
                            className: 'flex-1'
                        }, [
                            React.createElement('div', {
                                className: 'relative'
                            }, [
                                React.createElement('input', {
                                    key: 'search-input',
                                    type: 'text',
                                    placeholder: currentContent.search,
                                    value: searchTerm,
                                    onChange: (e) => setSearchTerm(e.target.value),
                                    className: 'w-full pl-10 pr-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base'
                                }),
                                React.createElement('svg', {
                                    key: 'search-icon',
                                    className: 'absolute left-3 top-2.5 sm:top-3.5 h-4 w-4 sm:h-5 sm:w-5 text-gray-400',
                                    fill: 'none',
                                    stroke: 'currentColor',
                                    viewBox: '0 0 24 24'
                                }, React.createElement('path', {
                                    strokeLinecap: 'round',
                                    strokeLinejoin: 'round',
                                    strokeWidth: 2,
                                    d: 'M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
                                }))
                            ])
                        ]),
                        // Status Filter
                        React.createElement('div', {
                            key: 'status-filter',
                            className: 'w-full lg:w-48'
                        }, [
                            React.createElement('select', {
                                key: 'status-select',
                                value: statusFilter,
                                onChange: (e) => setStatusFilter(e.target.value),
                                className: 'w-full px-3 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base'
                            }, [
                                React.createElement('option', { key: 'all', value: 'all' }, currentContent.allStatus),
                                React.createElement('option', { key: 'active', value: 'نشط' }, currentContent.active),
                                React.createElement('option', { key: 'suspended', value: 'معلق' }, currentContent.suspended),
                                React.createElement('option', { key: 'expired', value: 'منتهي' }, currentContent.expired)
                            ])
                        ]),
                        // Plan Filter
                        React.createElement('div', {
                            key: 'plan-filter',
                            className: 'w-full lg:w-48'
                        }, [
                            React.createElement('select', {
                                key: 'plan-select',
                                value: planFilter,
                                onChange: (e) => setPlanFilter(e.target.value),
                                className: 'w-full px-3 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base'
                            }, [
                                React.createElement('option', { key: 'all-plans', value: 'all' }, currentContent.allPlans),
                                React.createElement('option', { key: 'bronze', value: 'باقة البرونز' }, currentContent.bronzePlan),
                                React.createElement('option', { key: 'silver', value: 'باقة الفضة' }, currentContent.silverPlan),
                                React.createElement('option', { key: 'gold', value: 'باقة الذهب' }, currentContent.goldPlan)
                            ])
                        ])
                    ])
                ]),

                // Subscriptions Table/Cards
                React.createElement('div', {
                    key: 'subscriptions-container',
                    className: 'bg-white rounded-lg sm:rounded-xl shadow-sm border border-gray-200 overflow-hidden'
                }, [
                    // Desktop Table View (hidden on mobile)
                    React.createElement('div', {
                        key: 'desktop-table',
                        className: 'hidden xl:block overflow-x-auto'
                    }, [
                        React.createElement('table', {
                            className: 'min-w-full divide-y divide-gray-200'
                        }, [
                            React.createElement('thead', {
                                key: 'table-head',
                                className: 'bg-gray-50'
                            }, React.createElement('tr', {}, [
                                React.createElement('th', { key: 'customer', className: 'px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider' }, currentContent.customer),
                                React.createElement('th', { key: 'plan', className: 'px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider' }, currentContent.plan),
                                React.createElement('th', { key: 'price', className: 'px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider' }, currentContent.price),
                                React.createElement('th', { key: 'status', className: 'px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider' }, currentContent.status),
                                React.createElement('th', { key: 'start-date', className: 'px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider' }, currentContent.startDate),
                                React.createElement('th', { key: 'end-date', className: 'px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider' }, currentContent.endDate),
                                React.createElement('th', { key: 'next-payment', className: 'px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider' }, currentContent.nextPayment),
                                React.createElement('th', { key: 'actions', className: 'px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider' }, currentContent.actions)
                            ])),
                            React.createElement('tbody', {
                                key: 'table-body',
                                className: 'bg-white divide-y divide-gray-200'
                            }, filteredSubscriptions.map(subscription =>
                                React.createElement('tr', {
                                    key: subscription.id,
                                    className: 'hover:bg-gray-50 transition-colors'
                                }, [
                                    React.createElement('td', {
                                        key: 'customer',
                                        className: 'px-4 py-4 whitespace-nowrap'
                                    }, [
                                        React.createElement('div', {
                                            className: 'flex items-center space-x-3 space-x-reverse'
                                        }, [
                                            React.createElement('img', {
                                                key: 'avatar',
                                                className: 'h-8 w-8 rounded-full',
                                                src: subscription.avatar,
                                                alt: subscription.customerName
                                            }),
                                            React.createElement('div', { key: 'customer-info' }, [
                                                React.createElement('div', {
                                                    key: 'customer-name',
                                                    className: 'text-sm font-medium text-gray-900'
                                                }, subscription.customerName),
                                                React.createElement('div', {
                                                    key: 'customer-email',
                                                    className: 'text-xs text-gray-500'
                                                }, subscription.email)
                                            ])
                                        ])
                                    ]),
                                    React.createElement('td', {
                                        key: 'plan',
                                        className: 'px-4 py-4 whitespace-nowrap'
                                    }, React.createElement('span', {
                                        className: `inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPlanColor(subscription.planName)}`
                                    }, subscription.planName)),
                                    React.createElement('td', {
                                        key: 'price',
                                        className: 'px-4 py-4 whitespace-nowrap text-sm text-gray-900 font-medium'
                                    }, subscription.planPrice),
                                    React.createElement('td', {
                                        key: 'status',
                                        className: 'px-4 py-4 whitespace-nowrap'
                                    }, React.createElement('span', {
                                        className: `inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(subscription.status)}`
                                    }, subscription.status)),
                                    React.createElement('td', {
                                        key: 'start-date',
                                        className: 'px-4 py-4 whitespace-nowrap text-sm text-gray-500'
                                    }, subscription.startDate),
                                    React.createElement('td', {
                                        key: 'end-date',
                                        className: 'px-4 py-4 whitespace-nowrap text-sm text-gray-500'
                                    }, subscription.endDate),
                                    React.createElement('td', {
                                        key: 'next-payment',
                                        className: 'px-4 py-4 whitespace-nowrap text-sm text-gray-500'
                                    }, subscription.nextPayment),
                                    React.createElement('td', {
                                        key: 'actions',
                                        className: 'px-4 py-4 whitespace-nowrap text-sm font-medium'
                                    }, [
                                        React.createElement('div', {
                                            className: 'flex space-x-2 space-x-reverse'
                                        }, [
                                            React.createElement('button', {
                                                key: 'view',
                                                onClick: () => handleViewSubscription(subscription),
                                                className: 'text-blue-600 hover:text-blue-900 transition-colors'
                                            }, currentContent.view),
                                            React.createElement('button', {
                                                key: 'edit',
                                                onClick: () => handleEditSubscription(subscription),
                                                className: 'text-green-600 hover:text-green-900 transition-colors'
                                            }, currentContent.edit),
                                            subscription.status === 'منتهي' ? React.createElement('button', {
                                                key: 'renew',
                                                className: 'text-purple-600 hover:text-purple-900 transition-colors'
                                            }, currentContent.renew) : React.createElement('button', {
                                                key: 'delete',
                                                onClick: () => handleDeleteSubscription(subscription),
                                                className: 'text-red-600 hover:text-red-900 transition-colors'
                                            }, currentContent.delete)
                                        ])
                                    ])
                                ])
                            ))
                        ])
                    ]),

                    // Mobile Cards View (visible on tablet and mobile)
                    React.createElement('div', {
                        key: 'mobile-cards',
                        className: 'xl:hidden p-4 space-y-4'
                    }, filteredSubscriptions.length > 0 ? filteredSubscriptions.map(subscription =>
                        React.createElement('div', {
                            key: subscription.id,
                            className: 'border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow'
                        }, [
                            React.createElement('div', {
                                key: 'subscription-header',
                                className: 'flex items-center justify-between mb-3'
                            }, [
                                React.createElement('div', {
                                    key: 'customer-info',
                                    className: 'flex items-center space-x-3 space-x-reverse'
                                }, [
                                    React.createElement('img', {
                                        key: 'avatar',
                                        className: 'h-10 w-10 rounded-full',
                                        src: subscription.avatar,
                                        alt: subscription.customerName
                                    }),
                                    React.createElement('div', { key: 'name-plan' }, [
                                        React.createElement('h3', {
                                            key: 'name',
                                            className: 'text-sm font-medium text-gray-900'
                                        }, subscription.customerName),
                                        React.createElement('span', {
                                            key: 'plan',
                                            className: `inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPlanColor(subscription.planName)} mt-1`
                                        }, subscription.planName)
                                    ])
                                ]),
                                React.createElement('span', {
                                    key: 'status',
                                    className: `inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(subscription.status)}`
                                }, subscription.status)
                            ]),
                            React.createElement('div', {
                                key: 'subscription-details',
                                className: 'space-y-2 text-sm'
                            }, [
                                React.createElement('div', {
                                    key: 'price',
                                    className: 'flex justify-between'
                                }, [
                                    React.createElement('span', { className: 'text-gray-500' }, currentContent.price + ':'),
                                    React.createElement('span', { className: 'text-gray-900 font-medium' }, subscription.planPrice)
                                ]),
                                React.createElement('div', {
                                    key: 'payment-method',
                                    className: 'flex justify-between'
                                }, [
                                    React.createElement('span', { className: 'text-gray-500' }, currentContent.paymentMethod + ':'),
                                    React.createElement('span', { className: 'text-gray-900' }, subscription.paymentMethod)
                                ]),
                                React.createElement('div', {
                                    key: 'start-date',
                                    className: 'flex justify-between'
                                }, [
                                    React.createElement('span', { className: 'text-gray-500' }, currentContent.startDate + ':'),
                                    React.createElement('span', { className: 'text-gray-900' }, subscription.startDate)
                                ]),
                                React.createElement('div', {
                                    key: 'end-date',
                                    className: 'flex justify-between'
                                }, [
                                    React.createElement('span', { className: 'text-gray-500' }, currentContent.endDate + ':'),
                                    React.createElement('span', { className: 'text-gray-900' }, subscription.endDate)
                                ]),
                                React.createElement('div', {
                                    key: 'total-paid',
                                    className: 'flex justify-between'
                                }, [
                                    React.createElement('span', { className: 'text-gray-500' }, currentContent.totalPaid + ':'),
                                    React.createElement('span', { className: 'text-green-600 font-medium' }, subscription.totalPaid)
                                ])
                            ]),
                            React.createElement('div', {
                                key: 'actions',
                                className: 'flex justify-end space-x-2 space-x-reverse mt-4 pt-3 border-t border-gray-100'
                            }, [
                                React.createElement('button', {
                                    key: 'view',
                                    onClick: () => handleViewSubscription(subscription),
                                    className: 'p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors'
                                }, '👁️'),
                                React.createElement('button', {
                                    key: 'edit',
                                    onClick: () => handleEditSubscription(subscription),
                                    className: 'p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors'
                                }, '✏️'),
                                subscription.status === 'منتهي' ? React.createElement('button', {
                                    key: 'renew',
                                    onClick: () => handleRenewSubscription(subscription),
                                    className: 'p-2 text-purple-600 hover:bg-purple-50 rounded-lg transition-colors',
                                    title: 'تجديد الاشتراك'
                                }, '🔄') : React.createElement('button', {
                                    key: 'delete',
                                    onClick: () => handleDeleteSubscription(subscription),
                                    className: 'p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors'
                                }, '🗑️')
                            ])
                        ])
                    ) : React.createElement('div', {
                        key: 'no-results-mobile',
                        className: 'text-center py-8 text-gray-500'
                    }, currentContent.noResults))
                ]),

                // Subscription Modals
                React.createElement(SubscriptionModals, {
                    showAddModal,
                    showEditModal,
                    showViewModal,
                    showDeleteModal,
                    selectedSubscription,
                    formData,
                    setFormData,
                    currentContent,
                    saveSubscription,
                    closeModals,
                    confirmDelete,
                    getStatusColor,
                    getPlanPrice,
                    handleEditSubscription,
                    customerSearchTerm,
                    setCustomerSearchTerm,
                    showCustomerDropdown,
                    setShowCustomerDropdown,
                    filteredCustomers,
                    selectCustomer
                })
            ]);
        };

        // Subscription Modals Component
        const SubscriptionModals = ({
            showAddModal, showEditModal, showViewModal, showDeleteModal,
            selectedSubscription, formData, setFormData, currentContent,
            saveSubscription, closeModals, confirmDelete, getStatusColor, getPlanPrice, handleEditSubscription,
            customerSearchTerm, setCustomerSearchTerm, showCustomerDropdown, setShowCustomerDropdown, filteredCustomers, selectCustomer
        }) => {
            return React.createElement('div', {}, [
                // Add Subscription Modal
                showAddModal && React.createElement('div', {
                    key: 'add-modal',
                    className: 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50'
                }, [
                    React.createElement('div', {
                        key: 'modal-content',
                        className: 'bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto'
                    }, [
                        React.createElement('div', {
                            key: 'modal-header',
                            className: 'flex items-center justify-between p-6 border-b border-gray-200'
                        }, [
                            React.createElement('h3', {
                                key: 'title',
                                className: 'text-lg font-semibold text-gray-900'
                            }, currentContent.addSubscription),
                            React.createElement('button', {
                                key: 'close',
                                onClick: closeModals,
                                className: 'text-gray-400 hover:text-gray-600'
                            }, '✕')
                        ]),
                        React.createElement('div', {
                            key: 'modal-body',
                            className: 'p-6 space-y-4'
                        }, [
                            // Customer Search Field
                            React.createElement('div', { key: 'customer-search-field', className: 'relative' }, [
                                React.createElement('label', {
                                    className: 'block text-sm font-medium text-gray-700 mb-2'
                                }, 'البحث عن العميل'),
                                React.createElement('input', {
                                    type: 'text',
                                    value: customerSearchTerm || formData.customerName,
                                    onChange: (e) => {
                                        setCustomerSearchTerm(e.target.value);
                                        if (!e.target.value) {
                                            setFormData({...formData, customerName: '', email: ''});
                                        }
                                    },
                                    placeholder: 'ابحث عن العميل بالاسم أو الإيميل أو الهاتف',
                                    className: 'w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                                }),
                                // Customer Dropdown
                                showCustomerDropdown && filteredCustomers.length > 0 && React.createElement('div', {
                                    className: 'absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto'
                                }, filteredCustomers.map(customer =>
                                    React.createElement('div', {
                                        key: customer.id,
                                        onClick: () => selectCustomer(customer),
                                        className: 'p-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0'
                                    }, [
                                        React.createElement('div', {
                                            className: 'font-medium text-gray-900'
                                        }, customer.name),
                                        React.createElement('div', {
                                            className: 'text-sm text-gray-500'
                                        }, customer.email),
                                        React.createElement('div', {
                                            className: 'text-sm text-gray-400'
                                        }, customer.phone)
                                    ])
                                ))
                            ]),
                            // Selected Customer Info (Read-only)
                            formData.customerName && React.createElement('div', { key: 'selected-customer-info', className: 'bg-gray-50 p-3 rounded-lg' }, [
                                React.createElement('div', { className: 'text-sm font-medium text-gray-700 mb-1' }, 'العميل المحدد:'),
                                React.createElement('div', { className: 'text-gray-900' }, formData.customerName),
                                React.createElement('div', { className: 'text-gray-600 text-sm' }, formData.email)
                            ]),
                            React.createElement('div', { key: 'plan-field' }, [
                                React.createElement('label', {
                                    className: 'block text-sm font-medium text-gray-700 mb-2'
                                }, currentContent.selectPlan),
                                React.createElement('select', {
                                    value: formData.planName,
                                    onChange: (e) => setFormData({...formData, planName: e.target.value, planPrice: getPlanPrice(e.target.value)}),
                                    className: 'w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                                }, [
                                    React.createElement('option', { value: 'باقة البرونز' }, currentContent.bronzePlan),
                                    React.createElement('option', { value: 'باقة الفضة' }, currentContent.silverPlan),
                                    React.createElement('option', { value: 'باقة الذهب' }, currentContent.goldPlan),
                                    React.createElement('option', { value: 'باقة المؤسسات' }, currentContent.enterprisePlan)
                                ])
                            ]),
                            React.createElement('div', { key: 'payment-method-field' }, [
                                React.createElement('label', {
                                    className: 'block text-sm font-medium text-gray-700 mb-2'
                                }, currentContent.selectPaymentMethod),
                                React.createElement('select', {
                                    value: formData.paymentMethod,
                                    onChange: (e) => setFormData({...formData, paymentMethod: e.target.value}),
                                    className: 'w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                                }, [
                                    React.createElement('option', { value: 'بطاقة ائتمان' }, currentContent.creditCard),
                                    React.createElement('option', { value: 'تحويل بنكي' }, currentContent.bankTransfer),
                                    React.createElement('option', { value: 'كاش' }, currentContent.cash)
                                ])
                            ]),
                            React.createElement('div', { key: 'dates-grid', className: 'grid grid-cols-2 gap-4' }, [
                                React.createElement('div', { key: 'start-date-field' }, [
                                    React.createElement('label', {
                                        className: 'block text-sm font-medium text-gray-700 mb-2'
                                    }, currentContent.subscriptionStartDate),
                                    React.createElement('input', {
                                        type: 'date',
                                        value: formData.startDate,
                                        onChange: (e) => setFormData({...formData, startDate: e.target.value}),
                                        className: 'w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                                    })
                                ]),
                                React.createElement('div', { key: 'end-date-field' }, [
                                    React.createElement('label', {
                                        className: 'block text-sm font-medium text-gray-700 mb-2'
                                    }, currentContent.subscriptionEndDate),
                                    React.createElement('input', {
                                        type: 'date',
                                        value: formData.endDate,
                                        onChange: (e) => setFormData({...formData, endDate: e.target.value}),
                                        className: 'w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                                    })
                                ])
                            ])
                        ]),
                        React.createElement('div', {
                            key: 'modal-footer',
                            className: 'flex gap-3 p-6 border-t border-gray-200'
                        }, [
                            React.createElement('button', {
                                key: 'save',
                                onClick: saveSubscription,
                                className: 'flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors'
                            }, currentContent.save),
                            React.createElement('button', {
                                key: 'cancel',
                                onClick: closeModals,
                                className: 'flex-1 bg-gray-300 hover:bg-gray-400 text-gray-700 px-4 py-2 rounded-lg font-medium transition-colors'
                            }, currentContent.cancel)
                        ])
                    ])
                ]),

                // Edit Subscription Modal
                showEditModal && React.createElement('div', {
                    key: 'edit-modal',
                    className: 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50'
                }, [
                    React.createElement('div', {
                        key: 'modal-content',
                        className: 'bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto'
                    }, [
                        React.createElement('div', {
                            key: 'modal-header',
                            className: 'flex items-center justify-between p-6 border-b border-gray-200'
                        }, [
                            React.createElement('h3', {
                                key: 'title',
                                className: 'text-lg font-semibold text-gray-900'
                            }, currentContent.editSubscription),
                            React.createElement('button', {
                                key: 'close',
                                onClick: closeModals,
                                className: 'text-gray-400 hover:text-gray-600'
                            }, '✕')
                        ]),
                        React.createElement('div', {
                            key: 'modal-body',
                            className: 'p-6 space-y-4'
                        }, [
                            React.createElement('div', { key: 'customer-name-field' }, [
                                React.createElement('label', {
                                    className: 'block text-sm font-medium text-gray-700 mb-2'
                                }, currentContent.customerName),
                                React.createElement('input', {
                                    type: 'text',
                                    value: formData.customerName,
                                    onChange: (e) => setFormData({...formData, customerName: e.target.value}),
                                    className: 'w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                                })
                            ]),
                            React.createElement('div', { key: 'email-field' }, [
                                React.createElement('label', {
                                    className: 'block text-sm font-medium text-gray-700 mb-2'
                                }, currentContent.customerEmail),
                                React.createElement('input', {
                                    type: 'email',
                                    value: formData.email,
                                    onChange: (e) => setFormData({...formData, email: e.target.value}),
                                    className: 'w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                                })
                            ]),
                            React.createElement('div', { key: 'plan-field' }, [
                                React.createElement('label', {
                                    className: 'block text-sm font-medium text-gray-700 mb-2'
                                }, currentContent.selectPlan),
                                React.createElement('select', {
                                    value: formData.planName,
                                    onChange: (e) => setFormData({...formData, planName: e.target.value, planPrice: getPlanPrice(e.target.value)}),
                                    className: 'w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                                }, [
                                    React.createElement('option', { value: 'باقة البرونز' }, currentContent.bronzePlan),
                                    React.createElement('option', { value: 'باقة الفضة' }, currentContent.silverPlan),
                                    React.createElement('option', { value: 'باقة الذهب' }, currentContent.goldPlan),
                                    React.createElement('option', { value: 'باقة المؤسسات' }, currentContent.enterprisePlan)
                                ])
                            ]),
                            React.createElement('div', { key: 'status-field' }, [
                                React.createElement('label', {
                                    className: 'block text-sm font-medium text-gray-700 mb-2'
                                }, currentContent.selectStatus),
                                React.createElement('select', {
                                    value: formData.status,
                                    onChange: (e) => setFormData({...formData, status: e.target.value}),
                                    className: 'w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                                }, [
                                    React.createElement('option', { value: 'نشط' }, currentContent.active),
                                    React.createElement('option', { value: 'معلق' }, currentContent.suspended),
                                    React.createElement('option', { value: 'منتهي' }, currentContent.expired)
                                ])
                            ])
                        ]),
                        React.createElement('div', {
                            key: 'modal-footer',
                            className: 'flex gap-3 p-6 border-t border-gray-200'
                        }, [
                            React.createElement('button', {
                                key: 'save',
                                onClick: saveSubscription,
                                className: 'flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors'
                            }, currentContent.save),
                            React.createElement('button', {
                                key: 'cancel',
                                onClick: closeModals,
                                className: 'flex-1 bg-gray-300 hover:bg-gray-400 text-gray-700 px-4 py-2 rounded-lg font-medium transition-colors'
                            }, currentContent.cancel)
                        ])
                    ])
                ]),

                // View Subscription Modal
                showViewModal && selectedSubscription && React.createElement('div', {
                    key: 'view-modal',
                    className: 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50'
                }, [
                    React.createElement('div', {
                        key: 'modal-content',
                        className: 'bg-white rounded-lg max-w-lg w-full max-h-[90vh] overflow-y-auto'
                    }, [
                        React.createElement('div', {
                            key: 'modal-header',
                            className: 'flex items-center justify-between p-6 border-b border-gray-200'
                        }, [
                            React.createElement('h3', {
                                key: 'title',
                                className: 'text-lg font-semibold text-gray-900'
                            }, currentContent.subscriptionDetails),
                            React.createElement('button', {
                                key: 'close',
                                onClick: closeModals,
                                className: 'text-gray-400 hover:text-gray-600'
                            }, '✕')
                        ]),
                        React.createElement('div', {
                            key: 'modal-body',
                            className: 'p-6'
                        }, [
                            React.createElement('div', {
                                key: 'subscription-header',
                                className: 'flex items-center space-x-4 space-x-reverse mb-6'
                            }, [
                                React.createElement('img', {
                                    key: 'avatar',
                                    className: 'h-16 w-16 rounded-full',
                                    src: selectedSubscription.avatar,
                                    alt: selectedSubscription.customerName
                                }),
                                React.createElement('div', { key: 'basic-info' }, [
                                    React.createElement('h4', {
                                        key: 'name',
                                        className: 'text-xl font-semibold text-gray-900'
                                    }, selectedSubscription.customerName),
                                    React.createElement('span', {
                                        key: 'plan',
                                        className: `inline-flex px-3 py-1 text-sm font-semibold rounded-full bg-blue-100 text-blue-800 mt-2`
                                    }, selectedSubscription.planName)
                                ])
                            ]),
                            React.createElement('div', {
                                key: 'details-grid',
                                className: 'space-y-4'
                            }, [
                                React.createElement('div', { key: 'email' }, [
                                    React.createElement('label', {
                                        className: 'block text-sm font-medium text-gray-500'
                                    }, currentContent.customer),
                                    React.createElement('p', {
                                        className: 'text-sm text-gray-900 mt-1'
                                    }, selectedSubscription.email)
                                ]),
                                React.createElement('div', { key: 'status' }, [
                                    React.createElement('label', {
                                        className: 'block text-sm font-medium text-gray-500'
                                    }, currentContent.subscriptionStatus),
                                    React.createElement('span', {
                                        className: `inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(selectedSubscription.status)} mt-1`
                                    }, selectedSubscription.status)
                                ]),
                                React.createElement('div', { key: 'price' }, [
                                    React.createElement('label', {
                                        className: 'block text-sm font-medium text-gray-500'
                                    }, currentContent.price),
                                    React.createElement('p', {
                                        className: 'text-sm text-gray-900 font-medium mt-1'
                                    }, selectedSubscription.planPrice)
                                ]),
                                React.createElement('div', { key: 'dates', className: 'grid grid-cols-2 gap-4' }, [
                                    React.createElement('div', { key: 'start-date' }, [
                                        React.createElement('label', {
                                            className: 'block text-sm font-medium text-gray-500'
                                        }, currentContent.subscribedOn),
                                        React.createElement('p', {
                                            className: 'text-sm text-gray-900 mt-1'
                                        }, selectedSubscription.startDate)
                                    ]),
                                    React.createElement('div', { key: 'end-date' }, [
                                        React.createElement('label', {
                                            className: 'block text-sm font-medium text-gray-500'
                                        }, currentContent.expiresOn),
                                        React.createElement('p', {
                                            className: 'text-sm text-gray-900 mt-1'
                                        }, selectedSubscription.endDate)
                                    ])
                                ]),
                                React.createElement('div', { key: 'payment-info', className: 'grid grid-cols-2 gap-4' }, [
                                    React.createElement('div', { key: 'payment-method' }, [
                                        React.createElement('label', {
                                            className: 'block text-sm font-medium text-gray-500'
                                        }, currentContent.paymentMethod),
                                        React.createElement('p', {
                                            className: 'text-sm text-gray-900 mt-1'
                                        }, selectedSubscription.paymentMethod)
                                    ]),
                                    React.createElement('div', { key: 'total-paid' }, [
                                        React.createElement('label', {
                                            className: 'block text-sm font-medium text-gray-500'
                                        }, currentContent.totalPaid),
                                        React.createElement('p', {
                                            className: 'text-sm text-green-600 font-medium mt-1'
                                        }, selectedSubscription.totalPaid)
                                    ])
                                ])
                            ])
                        ]),
                        React.createElement('div', {
                            key: 'modal-footer',
                            className: 'flex gap-3 p-6 border-t border-gray-200'
                        }, [
                            React.createElement('button', {
                                key: 'edit',
                                onClick: () => {
                                    closeModals();
                                    handleEditSubscription(selectedSubscription);
                                },
                                className: 'flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors'
                            }, currentContent.edit),
                            React.createElement('button', {
                                key: 'close',
                                onClick: closeModals,
                                className: 'flex-1 bg-gray-300 hover:bg-gray-400 text-gray-700 px-4 py-2 rounded-lg font-medium transition-colors'
                            }, currentContent.close)
                        ])
                    ])
                ]),

                // Delete Confirmation Modal
                showDeleteModal && selectedSubscription && React.createElement('div', {
                    key: 'delete-modal',
                    className: 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50'
                }, [
                    React.createElement('div', {
                        key: 'modal-content',
                        className: 'bg-white rounded-lg max-w-md w-full'
                    }, [
                        React.createElement('div', {
                            key: 'modal-header',
                            className: 'p-6 border-b border-gray-200'
                        }, [
                            React.createElement('h3', {
                                key: 'title',
                                className: 'text-lg font-semibold text-gray-900'
                            }, currentContent.deleteSubscription)
                        ]),
                        React.createElement('div', {
                            key: 'modal-body',
                            className: 'p-6'
                        }, [
                            React.createElement('div', {
                                key: 'warning-icon',
                                className: 'flex items-center justify-center w-12 h-12 mx-auto bg-red-100 rounded-full mb-4'
                            }, React.createElement('span', { className: 'text-red-600 text-2xl' }, '⚠️')),
                            React.createElement('p', {
                                key: 'message',
                                className: 'text-center text-gray-600 mb-4'
                            }, currentContent.deleteConfirmMessage),
                            React.createElement('div', {
                                key: 'subscription-info',
                                className: 'bg-gray-50 rounded-lg p-4 text-center'
                            }, [
                                React.createElement('p', {
                                    key: 'customer-name',
                                    className: 'font-medium text-gray-900'
                                }, selectedSubscription.customerName),
                                React.createElement('p', {
                                    key: 'plan-name',
                                    className: 'text-sm text-gray-500'
                                }, selectedSubscription.planName + ' - ' + selectedSubscription.planPrice)
                            ])
                        ]),
                        React.createElement('div', {
                            key: 'modal-footer',
                            className: 'flex gap-3 p-6 border-t border-gray-200'
                        }, [
                            React.createElement('button', {
                                key: 'confirm',
                                onClick: confirmDelete,
                                className: 'flex-1 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium transition-colors'
                            }, currentContent.confirm),
                            React.createElement('button', {
                                key: 'cancel',
                                onClick: closeModals,
                                className: 'flex-1 bg-gray-300 hover:bg-gray-400 text-gray-700 px-4 py-2 rounded-lg font-medium transition-colors'
                            }, currentContent.cancel)
                        ])
                    ])
                ])
            ]);
        };

        // CustomersScreen Component
        const CustomersScreen = ({ isArabic }) => {
            const [customers, setCustomers] = useState([
                {
                    id: 1,
                    name: 'أحمد حسين الجبوري',
                    email: 'ahmed.aljubouri@example.com',
                    phone: '+964770123456',
                    subscription: 'باقة البرونز',
                    status: 'نشط',
                    joinDate: '2024-01-15',
                    totalPayments: '250,000 دينار',
                    avatar: 'https://ui-avatars.com/api/?name=Ahmed+Aljubouri&background=3b82f6&color=white',
                    address: 'بغداد، العراق',
                    notes: 'عميل مميز في قطاع التجارة الإلكترونية'
                },
                {
                    id: 2,
                    name: 'فاطمة علي البصري',
                    email: 'fatma.albasri@example.com',
                    phone: '+964781234567',
                    subscription: 'باقة الذهب',
                    status: 'نشط',
                    joinDate: '2024-02-20',
                    totalPayments: '520,000 دينار',
                    avatar: 'https://ui-avatars.com/api/?name=Fatma+Albasri&background=10b981&color=white',
                    address: 'البصرة، العراق',
                    notes: 'تعمل في مجال التسويق الرقمي'
                },
                {
                    id: 3,
                    name: 'محمد عبد الله الكربلائي',
                    email: 'mohamed.karbalaee@example.com',
                    phone: '+964790345678',
                    subscription: 'باقة الفضة',
                    status: 'معلق',
                    joinDate: '2024-03-10',
                    totalPayments: '180,000 دينار',
                    avatar: 'https://ui-avatars.com/api/?name=Mohamed+Karbalaee&background=f59e0b&color=white',
                    address: 'كربلاء، العراق',
                    notes: 'تأخير في الدفع - تحت المتابعة'
                },
                {
                    id: 4,
                    name: 'نورا خالد الموصلي',
                    email: 'nora.almosuli@example.com',
                    phone: '+964750987654',
                    subscription: 'باقة البرونز',
                    status: 'نشط',
                    joinDate: '2024-03-25',
                    totalPayments: '310,000 دينار',
                    avatar: 'https://ui-avatars.com/api/?name=Nora+Almosuli&background=8b5cf6&color=white',
                    address: 'الموصل، العراق',
                    notes: 'مطورة مواقع ويب'
                },
                {
                    id: 5,
                    name: 'عمر صالح النجفي',
                    email: 'omar.alnajafi@example.com',
                    phone: '+964760456789',
                    subscription: 'باقة الذهب',
                    status: 'نشط',
                    joinDate: '2024-04-05',
                    totalPayments: '480,000 دينار',
                    avatar: 'https://ui-avatars.com/api/?name=Omar+Alnajafi&background=ef4444&color=white',
                    address: 'النجف، العراق',
                    notes: 'استشاري تكنولوجيا المعلومات'
                },
                {
                    id: 6,
                    name: 'زينب مهدي البغدادي',
                    email: 'zainab.albaghdadi@example.com',
                    phone: '+964771567890',
                    subscription: 'باقة الفضة',
                    status: 'نشط',
                    joinDate: '2024-04-12',
                    totalPayments: '350,000 دينار',
                    avatar: 'https://ui-avatars.com/api/?name=Zainab+Albaghdadi&background=06b6d4&color=white',
                    address: 'بغداد، العراق',
                    notes: 'مديرة مشاريع'
                }
            ]);

            const [searchTerm, setSearchTerm] = useState('');
            const [statusFilter, setStatusFilter] = useState('all');
            const [showAddModal, setShowAddModal] = useState(false);
            const [showEditModal, setShowEditModal] = useState(false);
            const [showViewModal, setShowViewModal] = useState(false);
            const [showDeleteModal, setShowDeleteModal] = useState(false);
            const [selectedCustomer, setSelectedCustomer] = useState(null);
            const [formData, setFormData] = useState({
                name: '',
                email: '',
                phone: '',
                subscription: 'باقة البرونز',
                status: 'نشط',
                address: '',
                notes: ''
            });

            const content = {
                ar: {
                    title: 'إدارة العملاء',
                    subtitle: 'عرض وإدارة جميع عملاء النظام',
                    search: 'البحث عن عميل...',
                    addCustomer: 'إضافة عميل جديد',
                    editCustomer: 'تعديل العميل',
                    viewCustomer: 'عرض تفاصيل العميل',
                    deleteCustomer: 'حذف العميل',
                    allStatus: 'جميع الحالات',
                    active: 'نشط',
                    suspended: 'معلق',
                    inactive: 'غير نشط',
                    name: 'الاسم',
                    email: 'البريد الإلكتروني',
                    phone: 'الهاتف',
                    subscription: 'الاشتراك',
                    status: 'الحالة',
                    joinDate: 'تاريخ الانضمام',
                    totalPayments: 'إجمالي المدفوعات',
                    address: 'العنوان',
                    notes: 'ملاحظات',
                    actions: 'الإجراءات',
                    edit: 'تعديل',
                    delete: 'حذف',
                    view: 'عرض',
                    save: 'حفظ',
                    cancel: 'إلغاء',
                    confirm: 'تأكيد',
                    close: 'إغلاق',
                    noResults: 'لا توجد نتائج للبحث',
                    totalCustomers: 'إجمالي العملاء',
                    activeCustomers: 'العملاء النشطون',
                    suspendedCustomers: 'العملاء المعلقون',

                    // Form labels
                    customerName: 'اسم العميل',
                    customerEmail: 'البريد الإلكتروني',
                    customerPhone: 'رقم الهاتف',
                    customerAddress: 'العنوان',
                    customerNotes: 'ملاحظات',
                    selectSubscription: 'اختر الاشتراك',
                    selectStatus: 'اختر الحالة',

                    // Subscription options
                    bronzePlan: 'باقة البرونز',
                    silverPlan: 'باقة الفضة',
                    goldPlan: 'باقة الذهب',
                    enterprisePlan: 'باقة المؤسسات',

                    // Messages
                    addSuccess: 'تم إضافة العميل بنجاح!',
                    updateSuccess: 'تم تحديث العميل بنجاح!',
                    deleteSuccess: 'تم حذف العميل بنجاح!',
                    deleteConfirmMessage: 'هل أنت متأكد من حذف هذا العميل؟ لا يمكن التراجع عن هذا الإجراء.',
                    errorMessage: 'حدث خطأ أثناء العملية. حاول مرة أخرى.',
                    requiredField: 'هذا الحقل مطلوب',
                    invalidEmail: 'البريد الإلكتروني غير صحيح',

                    // Placeholders
                    enterName: 'أدخل اسم العميل',
                    enterEmail: 'أدخل البريد الإلكتروني',
                    enterPhone: 'أدخل رقم الهاتف',
                    enterAddress: 'أدخل العنوان',
                    enterNotes: 'أدخل ملاحظات (اختياري)',

                    // Customer details
                    customerDetails: 'تفاصيل العميل',
                    joinedOn: 'انضم في',
                    lastActivity: 'آخر نشاط',
                    totalSpent: 'إجمالي المدفوعات',
                    currentPlan: 'الباقة الحالية',
                    accountStatus: 'حالة الحساب'
                }
            };

            const currentContent = content[isArabic ? 'ar' : 'en'] || content.ar;

            // CRUD Functions
            const handleAddCustomer = () => {
                setFormData({
                    name: '',
                    email: '',
                    phone: '',
                    subscription: 'باقة البرونز',
                    status: 'نشط',
                    address: '',
                    notes: ''
                });
                setShowAddModal(true);
            };

            const handleEditCustomer = (customer) => {
                setSelectedCustomer(customer);
                setFormData({
                    name: customer.name,
                    email: customer.email,
                    phone: customer.phone,
                    subscription: customer.subscription,
                    status: customer.status,
                    address: customer.address || '',
                    notes: customer.notes || ''
                });
                setShowEditModal(true);
            };

            const handleViewCustomer = (customer) => {
                setSelectedCustomer(customer);
                setShowViewModal(true);
            };

            const handleDeleteCustomer = (customer) => {
                setSelectedCustomer(customer);
                setShowDeleteModal(true);
            };

            const saveCustomer = () => {
                // Validation
                if (!formData.name || !formData.email || !formData.phone) {
                    alert(currentContent.requiredField);
                    return;
                }

                if (!/\S+@\S+\.\S+/.test(formData.email)) {
                    alert(currentContent.invalidEmail);
                    return;
                }

                if (showAddModal) {
                    // Add new customer
                    const newCustomer = {
                        id: Math.max(...customers.map(c => c.id)) + 1,
                        ...formData,
                        joinDate: new Date().toISOString().split('T')[0],
                        totalPayments: '0 دينار',
                        avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(formData.name)}&background=3b82f6&color=white`
                    };
                    setCustomers([...customers, newCustomer]);
                    alert(currentContent.addSuccess);
                } else if (showEditModal) {
                    // Update existing customer
                    const updatedCustomers = customers.map(customer =>
                        customer.id === selectedCustomer.id
                            ? { ...customer, ...formData }
                            : customer
                    );
                    setCustomers(updatedCustomers);
                    alert(currentContent.updateSuccess);
                }

                // Close modals
                setShowAddModal(false);
                setShowEditModal(false);
                setSelectedCustomer(null);
            };

            const confirmDelete = () => {
                const updatedCustomers = customers.filter(customer => customer.id !== selectedCustomer.id);
                setCustomers(updatedCustomers);
                setShowDeleteModal(false);
                setSelectedCustomer(null);
                alert(currentContent.deleteSuccess);
            };

            const closeModals = () => {
                setShowAddModal(false);
                setShowEditModal(false);
                setShowViewModal(false);
                setShowDeleteModal(false);
                setSelectedCustomer(null);
            };

            // Filter customers based on search and status
            const filteredCustomers = customers.filter(customer => {
                const matchesSearch = customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                    customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                    customer.phone.includes(searchTerm);
                const matchesStatus = statusFilter === 'all' || customer.status === statusFilter;
                return matchesSearch && matchesStatus;
            });

            // Calculate stats
            const stats = [
                {
                    title: currentContent.totalCustomers,
                    value: customers.length.toString(),
                    icon: '👥',
                    color: 'bg-blue-500'
                },
                {
                    title: currentContent.activeCustomers,
                    value: customers.filter(c => c.status === 'نشط').length.toString(),
                    icon: '✅',
                    color: 'bg-green-500'
                },
                {
                    title: currentContent.suspendedCustomers,
                    value: customers.filter(c => c.status === 'معلق').length.toString(),
                    icon: '⏸️',
                    color: 'bg-yellow-500'
                }
            ];

            const getStatusColor = (status) => {
                switch (status) {
                    case 'نشط': return 'bg-green-100 text-green-800';
                    case 'معلق': return 'bg-yellow-100 text-yellow-800';
                    case 'غير نشط': return 'bg-red-100 text-red-800';
                    default: return 'bg-gray-100 text-gray-800';
                }
            };

            return React.createElement('div', {
                className: 'customers-screen space-y-4 sm:space-y-6'
            }, [
                // Page Header
                React.createElement('div', {
                    key: 'header',
                    className: 'flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4'
                }, [
                    React.createElement('div', { key: 'title-section' }, [
                        React.createElement('h1', {
                            key: 'title',
                            className: 'text-2xl sm:text-3xl font-bold text-gray-900'
                        }, currentContent.title),
                        React.createElement('p', {
                            key: 'subtitle',
                            className: 'text-sm sm:text-base text-gray-600 mt-1'
                        }, currentContent.subtitle)
                    ]),
                    React.createElement('button', {
                        key: 'add-button',
                        onClick: handleAddCustomer,
                        className: 'w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center gap-2'
                    }, [
                        React.createElement('span', { key: 'icon' }, '➕'),
                        React.createElement('span', { key: 'text' }, currentContent.addCustomer)
                    ])
                ]),

                // Stats Grid
                React.createElement('div', {
                    key: 'stats',
                    className: 'grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 lg:gap-6'
                }, stats.map((stat, index) =>
                    React.createElement('div', {
                        key: index,
                        className: 'bg-white rounded-lg sm:rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6'
                    }, [
                        React.createElement('div', {
                            key: 'stat-content',
                            className: 'flex items-center justify-between'
                        }, [
                            React.createElement('div', { key: 'text' }, [
                                React.createElement('p', {
                                    key: 'title',
                                    className: 'text-xs sm:text-sm font-medium text-gray-600 mb-1'
                                }, stat.title),
                                React.createElement('p', {
                                    key: 'value',
                                    className: 'text-xl sm:text-2xl font-bold text-gray-900'
                                }, stat.value)
                            ]),
                            React.createElement('div', {
                                key: 'icon',
                                className: `${stat.color} text-white p-2 sm:p-3 rounded-lg text-lg sm:text-2xl`
                            }, stat.icon)
                        ])
                    ])
                )),

                // Filters Section
                React.createElement('div', {
                    key: 'filters',
                    className: 'bg-white rounded-lg sm:rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6'
                }, [
                    React.createElement('div', {
                        key: 'filters-content',
                        className: 'flex flex-col sm:flex-row gap-4'
                    }, [
                        // Search Input
                        React.createElement('div', {
                            key: 'search',
                            className: 'flex-1'
                        }, [
                            React.createElement('div', {
                                className: 'relative'
                            }, [
                                React.createElement('input', {
                                    key: 'search-input',
                                    type: 'text',
                                    placeholder: currentContent.search,
                                    value: searchTerm,
                                    onChange: (e) => setSearchTerm(e.target.value),
                                    className: 'w-full pl-10 pr-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base'
                                }),
                                React.createElement('svg', {
                                    key: 'search-icon',
                                    className: 'absolute left-3 top-2.5 sm:top-3.5 h-4 w-4 sm:h-5 sm:w-5 text-gray-400',
                                    fill: 'none',
                                    stroke: 'currentColor',
                                    viewBox: '0 0 24 24'
                                }, React.createElement('path', {
                                    strokeLinecap: 'round',
                                    strokeLinejoin: 'round',
                                    strokeWidth: 2,
                                    d: 'M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
                                }))
                            ])
                        ]),
                        // Status Filter
                        React.createElement('div', {
                            key: 'status-filter',
                            className: 'w-full sm:w-48'
                        }, [
                            React.createElement('select', {
                                key: 'status-select',
                                value: statusFilter,
                                onChange: (e) => setStatusFilter(e.target.value),
                                className: 'w-full px-3 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base'
                            }, [
                                React.createElement('option', { key: 'all', value: 'all' }, currentContent.allStatus),
                                React.createElement('option', { key: 'active', value: 'نشط' }, currentContent.active),
                                React.createElement('option', { key: 'suspended', value: 'معلق' }, currentContent.suspended),
                                React.createElement('option', { key: 'inactive', value: 'غير نشط' }, currentContent.inactive)
                            ])
                        ])
                    ])
                ]),

                // Customers Table/Cards
                React.createElement('div', {
                    key: 'customers-container',
                    className: 'bg-white rounded-lg sm:rounded-xl shadow-sm border border-gray-200 overflow-hidden'
                }, [
                    // Desktop Table View (hidden on mobile)
                    React.createElement('div', {
                        key: 'desktop-table',
                        className: 'hidden lg:block overflow-x-auto'
                    }, [
                        React.createElement('table', {
                            className: 'min-w-full divide-y divide-gray-200'
                        }, [
                            React.createElement('thead', {
                                key: 'table-head',
                                className: 'bg-gray-50'
                            }, React.createElement('tr', {}, [
                                React.createElement('th', { key: 'name', className: 'px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider' }, currentContent.name),
                                React.createElement('th', { key: 'email', className: 'px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider' }, currentContent.email),
                                React.createElement('th', { key: 'phone', className: 'px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider' }, currentContent.phone),
                                React.createElement('th', { key: 'subscription', className: 'px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider' }, currentContent.subscription),
                                React.createElement('th', { key: 'status', className: 'px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider' }, currentContent.status),
                                React.createElement('th', { key: 'actions', className: 'px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider' }, currentContent.actions)
                            ])),
                            React.createElement('tbody', {
                                key: 'table-body',
                                className: 'bg-white divide-y divide-gray-200'
                            }, filteredCustomers.map(customer =>
                                React.createElement('tr', {
                                    key: customer.id,
                                    className: 'hover:bg-gray-50 transition-colors'
                                }, [
                                    React.createElement('td', {
                                        key: 'name',
                                        className: 'px-6 py-4 whitespace-nowrap'
                                    }, [
                                        React.createElement('div', {
                                            className: 'flex items-center space-x-3 space-x-reverse'
                                        }, [
                                            React.createElement('img', {
                                                key: 'avatar',
                                                className: 'h-8 w-8 rounded-full',
                                                src: customer.avatar,
                                                alt: customer.name
                                            }),
                                            React.createElement('div', { key: 'name-info' }, [
                                                React.createElement('div', {
                                                    key: 'customer-name',
                                                    className: 'text-sm font-medium text-gray-900'
                                                }, customer.name)
                                            ])
                                        ])
                                    ]),
                                    React.createElement('td', {
                                        key: 'email',
                                        className: 'px-6 py-4 whitespace-nowrap text-sm text-gray-500'
                                    }, customer.email),
                                    React.createElement('td', {
                                        key: 'phone',
                                        className: 'px-6 py-4 whitespace-nowrap text-sm text-gray-500'
                                    }, customer.phone),
                                    React.createElement('td', {
                                        key: 'subscription',
                                        className: 'px-6 py-4 whitespace-nowrap text-sm text-gray-900'
                                    }, customer.subscription),
                                    React.createElement('td', {
                                        key: 'status',
                                        className: 'px-6 py-4 whitespace-nowrap'
                                    }, React.createElement('span', {
                                        className: `inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(customer.status)}`
                                    }, customer.status)),
                                    React.createElement('td', {
                                        key: 'actions',
                                        className: 'px-6 py-4 whitespace-nowrap text-sm font-medium'
                                    }, [
                                        React.createElement('div', {
                                            className: 'flex space-x-2 space-x-reverse'
                                        }, [
                                            React.createElement('button', {
                                                key: 'view',
                                                onClick: () => handleViewCustomer(customer),
                                                className: 'text-blue-600 hover:text-blue-900 transition-colors'
                                            }, currentContent.view),
                                            React.createElement('button', {
                                                key: 'edit',
                                                onClick: () => handleEditCustomer(customer),
                                                className: 'text-green-600 hover:text-green-900 transition-colors'
                                            }, currentContent.edit),
                                            React.createElement('button', {
                                                key: 'delete',
                                                onClick: () => handleDeleteCustomer(customer),
                                                className: 'text-red-600 hover:text-red-900 transition-colors'
                                            }, currentContent.delete)
                                        ])
                                    ])
                                ])
                            ))
                        ])
                    ]),

                    // Mobile Cards View (visible on mobile and tablet)
                    React.createElement('div', {
                        key: 'mobile-cards',
                        className: 'lg:hidden p-4 space-y-4'
                    }, filteredCustomers.length > 0 ? filteredCustomers.map(customer =>
                        React.createElement('div', {
                            key: customer.id,
                            className: 'border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow'
                        }, [
                            React.createElement('div', {
                                key: 'customer-header',
                                className: 'flex items-center justify-between mb-3'
                            }, [
                                React.createElement('div', {
                                    key: 'customer-info',
                                    className: 'flex items-center space-x-3 space-x-reverse'
                                }, [
                                    React.createElement('img', {
                                        key: 'avatar',
                                        className: 'h-10 w-10 rounded-full',
                                        src: customer.avatar,
                                        alt: customer.name
                                    }),
                                    React.createElement('div', { key: 'name-status' }, [
                                        React.createElement('h3', {
                                            key: 'name',
                                            className: 'text-sm font-medium text-gray-900'
                                        }, customer.name),
                                        React.createElement('span', {
                                            key: 'status',
                                            className: `inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(customer.status)} mt-1`
                                        }, customer.status)
                                    ])
                                ]),
                                React.createElement('div', {
                                    key: 'actions',
                                    className: 'flex space-x-2 space-x-reverse'
                                }, [
                                    React.createElement('button', {
                                        key: 'view',
                                        onClick: () => handleViewCustomer(customer),
                                        className: 'p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors'
                                    }, '👁️'),
                                    React.createElement('button', {
                                        key: 'edit',
                                        onClick: () => handleEditCustomer(customer),
                                        className: 'p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors'
                                    }, '✏️'),
                                    React.createElement('button', {
                                        key: 'delete',
                                        onClick: () => handleDeleteCustomer(customer),
                                        className: 'p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors'
                                    }, '🗑️')
                                ])
                            ]),
                            React.createElement('div', {
                                key: 'customer-details',
                                className: 'space-y-2 text-sm'
                            }, [
                                React.createElement('div', {
                                    key: 'email',
                                    className: 'flex justify-between'
                                }, [
                                    React.createElement('span', { className: 'text-gray-500' }, currentContent.email + ':'),
                                    React.createElement('span', { className: 'text-gray-900' }, customer.email)
                                ]),
                                React.createElement('div', {
                                    key: 'phone',
                                    className: 'flex justify-between'
                                }, [
                                    React.createElement('span', { className: 'text-gray-500' }, currentContent.phone + ':'),
                                    React.createElement('span', { className: 'text-gray-900' }, customer.phone)
                                ]),
                                React.createElement('div', {
                                    key: 'subscription',
                                    className: 'flex justify-between'
                                }, [
                                    React.createElement('span', { className: 'text-gray-500' }, currentContent.subscription + ':'),
                                    React.createElement('span', { className: 'text-gray-900' }, customer.subscription)
                                ]),
                                React.createElement('div', {
                                    key: 'total-payments',
                                    className: 'flex justify-between'
                                }, [
                                    React.createElement('span', { className: 'text-gray-500' }, currentContent.totalPayments + ':'),
                                    React.createElement('span', { className: 'text-green-600 font-medium' }, customer.totalPayments)
                                ])
                            ])
                        ])
                    ) : React.createElement('div', {
                        className: 'text-center py-8 text-gray-500'
                    }, currentContent.noResults))
                ]),

                // Customer Modals
                React.createElement(CustomerModals, {
                    key: 'customer-modals',
                    showAddModal,
                    showEditModal,
                    showViewModal,
                    showDeleteModal,
                    selectedCustomer,
                    formData,
                    setFormData,
                    currentContent,
                    saveCustomer,
                    closeModals,
                    confirmDelete,
                    getStatusColor,
                    handleEditCustomer
                })
            ]);
        };

        // Add Customer Modal, Edit Modal, View Modal and Delete Modal for CustomersScreen
        const CustomerModals = ({
            showAddModal, showEditModal, showViewModal, showDeleteModal,
            selectedCustomer, formData, setFormData, currentContent,
            saveCustomer, closeModals, confirmDelete, getStatusColor, handleEditCustomer
        }) => {
            return React.createElement('div', {}, [
                // Add Customer Modal
                showAddModal && React.createElement('div', {
                    key: 'add-modal',
                    className: 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50'
                }, [
                    React.createElement('div', {
                        key: 'modal-content',
                        className: 'bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto'
                    }, [
                        React.createElement('div', {
                            key: 'modal-header',
                            className: 'flex items-center justify-between p-6 border-b border-gray-200'
                        }, [
                            React.createElement('h3', {
                                key: 'title',
                                className: 'text-lg font-semibold text-gray-900'
                            }, currentContent.addCustomer),
                            React.createElement('button', {
                                key: 'close',
                                onClick: closeModals,
                                className: 'text-gray-400 hover:text-gray-600'
                            }, '✕')
                        ]),
                        React.createElement('div', {
                            key: 'modal-body',
                            className: 'p-6 space-y-4'
                        }, [
                            React.createElement('div', { key: 'name-field' }, [
                                React.createElement('label', {
                                    className: 'block text-sm font-medium text-gray-700 mb-2'
                                }, currentContent.customerName),
                                React.createElement('input', {
                                    type: 'text',
                                    value: formData.name,
                                    onChange: (e) => setFormData({...formData, name: e.target.value}),
                                    placeholder: currentContent.enterName,
                                    className: 'w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                                })
                            ]),
                            React.createElement('div', { key: 'email-field' }, [
                                React.createElement('label', {
                                    className: 'block text-sm font-medium text-gray-700 mb-2'
                                }, currentContent.customerEmail),
                                React.createElement('input', {
                                    type: 'email',
                                    value: formData.email,
                                    onChange: (e) => setFormData({...formData, email: e.target.value}),
                                    placeholder: currentContent.enterEmail,
                                    className: 'w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                                })
                            ]),
                            React.createElement('div', { key: 'phone-field' }, [
                                React.createElement('label', {
                                    className: 'block text-sm font-medium text-gray-700 mb-2'
                                }, currentContent.customerPhone),
                                React.createElement('input', {
                                    type: 'tel',
                                    value: formData.phone,
                                    onChange: (e) => setFormData({...formData, phone: e.target.value}),
                                    placeholder: currentContent.enterPhone,
                                    className: 'w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                                })
                            ]),
                            React.createElement('div', { key: 'subscription-field' }, [
                                React.createElement('label', {
                                    className: 'block text-sm font-medium text-gray-700 mb-2'
                                }, currentContent.selectSubscription),
                                React.createElement('select', {
                                    value: formData.subscription,
                                    onChange: (e) => setFormData({...formData, subscription: e.target.value}),
                                    className: 'w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                                }, [
                                    React.createElement('option', { value: 'باقة البرونز' }, currentContent.bronzePlan),
                                    React.createElement('option', { value: 'باقة الفضة' }, currentContent.silverPlan),
                                    React.createElement('option', { value: 'باقة الذهب' }, currentContent.goldPlan),
                                    React.createElement('option', { value: 'باقة المؤسسات' }, currentContent.enterprisePlan)
                                ])
                            ]),
                            React.createElement('div', { key: 'address-field' }, [
                                React.createElement('label', {
                                    className: 'block text-sm font-medium text-gray-700 mb-2'
                                }, currentContent.customerAddress),
                                React.createElement('input', {
                                    type: 'text',
                                    value: formData.address,
                                    onChange: (e) => setFormData({...formData, address: e.target.value}),
                                    placeholder: currentContent.enterAddress,
                                    className: 'w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                                })
                            ])
                        ]),
                        React.createElement('div', {
                            key: 'modal-footer',
                            className: 'flex gap-3 p-6 border-t border-gray-200'
                        }, [
                            React.createElement('button', {
                                key: 'save',
                                onClick: saveCustomer,
                                className: 'flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors'
                            }, currentContent.save),
                            React.createElement('button', {
                                key: 'cancel',
                                onClick: closeModals,
                                className: 'flex-1 bg-gray-300 hover:bg-gray-400 text-gray-700 px-4 py-2 rounded-lg font-medium transition-colors'
                            }, currentContent.cancel)
                        ])
                    ])
                ]),

                // Edit Customer Modal
                showEditModal && React.createElement('div', {
                    key: 'edit-modal',
                    className: 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50'
                }, [
                    React.createElement('div', {
                        key: 'modal-content',
                        className: 'bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto'
                    }, [
                        React.createElement('div', {
                            key: 'modal-header',
                            className: 'flex items-center justify-between p-6 border-b border-gray-200'
                        }, [
                            React.createElement('h3', {
                                key: 'title',
                                className: 'text-lg font-semibold text-gray-900'
                            }, currentContent.editCustomer),
                            React.createElement('button', {
                                key: 'close',
                                onClick: closeModals,
                                className: 'text-gray-400 hover:text-gray-600'
                            }, '✕')
                        ]),
                        React.createElement('div', {
                            key: 'modal-body',
                            className: 'p-6 space-y-4'
                        }, [
                            React.createElement('div', { key: 'name-field' }, [
                                React.createElement('label', {
                                    className: 'block text-sm font-medium text-gray-700 mb-2'
                                }, currentContent.customerName),
                                React.createElement('input', {
                                    type: 'text',
                                    value: formData.name,
                                    onChange: (e) => setFormData({...formData, name: e.target.value}),
                                    className: 'w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                                })
                            ]),
                            React.createElement('div', { key: 'email-field' }, [
                                React.createElement('label', {
                                    className: 'block text-sm font-medium text-gray-700 mb-2'
                                }, currentContent.customerEmail),
                                React.createElement('input', {
                                    type: 'email',
                                    value: formData.email,
                                    onChange: (e) => setFormData({...formData, email: e.target.value}),
                                    className: 'w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                                })
                            ]),
                            React.createElement('div', { key: 'phone-field' }, [
                                React.createElement('label', {
                                    className: 'block text-sm font-medium text-gray-700 mb-2'
                                }, currentContent.customerPhone),
                                React.createElement('input', {
                                    type: 'tel',
                                    value: formData.phone,
                                    onChange: (e) => setFormData({...formData, phone: e.target.value}),
                                    className: 'w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                                })
                            ]),
                            React.createElement('div', { key: 'subscription-field' }, [
                                React.createElement('label', {
                                    className: 'block text-sm font-medium text-gray-700 mb-2'
                                }, currentContent.selectSubscription),
                                React.createElement('select', {
                                    value: formData.subscription,
                                    onChange: (e) => setFormData({...formData, subscription: e.target.value}),
                                    className: 'w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                                }, [
                                    React.createElement('option', { value: 'باقة البرونز' }, currentContent.bronzePlan),
                                    React.createElement('option', { value: 'باقة الفضة' }, currentContent.silverPlan),
                                    React.createElement('option', { value: 'باقة الذهب' }, currentContent.goldPlan),
                                    React.createElement('option', { value: 'باقة المؤسسات' }, currentContent.enterprisePlan)
                                ])
                            ])
                        ]),
                        React.createElement('div', {
                            key: 'modal-footer',
                            className: 'flex gap-3 p-6 border-t border-gray-200'
                        }, [
                            React.createElement('button', {
                                key: 'save',
                                onClick: saveCustomer,
                                className: 'flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors'
                            }, currentContent.save),
                            React.createElement('button', {
                                key: 'cancel',
                                onClick: closeModals,
                                className: 'flex-1 bg-gray-300 hover:bg-gray-400 text-gray-700 px-4 py-2 rounded-lg font-medium transition-colors'
                            }, currentContent.cancel)
                        ])
                    ])
                ]),

                // View Customer Modal
                showViewModal && selectedCustomer && React.createElement('div', {
                    key: 'view-modal',
                    className: 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50'
                }, [
                    React.createElement('div', {
                        key: 'modal-content',
                        className: 'bg-white rounded-lg max-w-lg w-full max-h-[90vh] overflow-y-auto'
                    }, [
                        React.createElement('div', {
                            key: 'modal-header',
                            className: 'flex items-center justify-between p-6 border-b border-gray-200'
                        }, [
                            React.createElement('h3', {
                                key: 'title',
                                className: 'text-lg font-semibold text-gray-900'
                            }, currentContent.customerDetails),
                            React.createElement('button', {
                                key: 'close',
                                onClick: closeModals,
                                className: 'text-gray-400 hover:text-gray-600'
                            }, '✕')
                        ]),
                        React.createElement('div', {
                            key: 'modal-body',
                            className: 'p-6'
                        }, [
                            React.createElement('div', {
                                key: 'customer-header',
                                className: 'flex items-center space-x-4 space-x-reverse mb-6'
                            }, [
                                React.createElement('img', {
                                    key: 'avatar',
                                    className: 'h-16 w-16 rounded-full',
                                    src: selectedCustomer.avatar,
                                    alt: selectedCustomer.name
                                }),
                                React.createElement('div', { key: 'basic-info' }, [
                                    React.createElement('h4', {
                                        key: 'name',
                                        className: 'text-xl font-semibold text-gray-900'
                                    }, selectedCustomer.name),
                                    React.createElement('span', {
                                        key: 'status',
                                        className: `inline-flex px-3 py-1 text-sm font-semibold rounded-full ${getStatusColor(selectedCustomer.status)} mt-2`
                                    }, selectedCustomer.status)
                                ])
                            ]),
                            React.createElement('div', {
                                key: 'details-grid',
                                className: 'space-y-4'
                            }, [
                                React.createElement('div', { key: 'email' }, [
                                    React.createElement('label', {
                                        className: 'block text-sm font-medium text-gray-500'
                                    }, currentContent.email),
                                    React.createElement('p', {
                                        className: 'text-sm text-gray-900 mt-1'
                                    }, selectedCustomer.email)
                                ]),
                                React.createElement('div', { key: 'phone' }, [
                                    React.createElement('label', {
                                        className: 'block text-sm font-medium text-gray-500'
                                    }, currentContent.phone),
                                    React.createElement('p', {
                                        className: 'text-sm text-gray-900 mt-1'
                                    }, selectedCustomer.phone)
                                ]),
                                React.createElement('div', { key: 'subscription' }, [
                                    React.createElement('label', {
                                        className: 'block text-sm font-medium text-gray-500'
                                    }, currentContent.currentPlan),
                                    React.createElement('p', {
                                        className: 'text-sm text-gray-900 mt-1'
                                    }, selectedCustomer.subscription)
                                ]),
                                React.createElement('div', { key: 'join-date' }, [
                                    React.createElement('label', {
                                        className: 'block text-sm font-medium text-gray-500'
                                    }, currentContent.joinedOn),
                                    React.createElement('p', {
                                        className: 'text-sm text-gray-900 mt-1'
                                    }, selectedCustomer.joinDate)
                                ]),
                                React.createElement('div', { key: 'total-payments' }, [
                                    React.createElement('label', {
                                        className: 'block text-sm font-medium text-gray-500'
                                    }, currentContent.totalSpent),
                                    React.createElement('p', {
                                        className: 'text-sm text-green-600 font-medium mt-1'
                                    }, selectedCustomer.totalPayments)
                                ])
                            ])
                        ]),
                        React.createElement('div', {
                            key: 'modal-footer',
                            className: 'flex gap-3 p-6 border-t border-gray-200'
                        }, [
                            React.createElement('button', {
                                key: 'edit',
                                onClick: () => {
                                    closeModals();
                                    handleEditCustomer(selectedCustomer);
                                },
                                className: 'flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors'
                            }, currentContent.edit),
                            React.createElement('button', {
                                key: 'close',
                                onClick: closeModals,
                                className: 'flex-1 bg-gray-300 hover:bg-gray-400 text-gray-700 px-4 py-2 rounded-lg font-medium transition-colors'
                            }, currentContent.close)
                        ])
                    ])
                ]),

                // Delete Confirmation Modal
                showDeleteModal && selectedCustomer && React.createElement('div', {
                    key: 'delete-modal',
                    className: 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50'
                }, [
                    React.createElement('div', {
                        key: 'modal-content',
                        className: 'bg-white rounded-lg max-w-md w-full'
                    }, [
                        React.createElement('div', {
                            key: 'modal-header',
                            className: 'p-6 border-b border-gray-200'
                        }, [
                            React.createElement('h3', {
                                key: 'title',
                                className: 'text-lg font-semibold text-gray-900'
                            }, currentContent.deleteCustomer)
                        ]),
                        React.createElement('div', {
                            key: 'modal-body',
                            className: 'p-6'
                        }, [
                            React.createElement('div', {
                                key: 'warning-icon',
                                className: 'flex items-center justify-center w-12 h-12 mx-auto bg-red-100 rounded-full mb-4'
                            }, React.createElement('span', { className: 'text-red-600 text-2xl' }, '⚠️')),
                            React.createElement('p', {
                                key: 'message',
                                className: 'text-center text-gray-600 mb-4'
                            }, currentContent.deleteConfirmMessage),
                            React.createElement('div', {
                                key: 'customer-info',
                                className: 'bg-gray-50 rounded-lg p-4 text-center'
                            }, [
                                React.createElement('p', {
                                    key: 'customer-name',
                                    className: 'font-medium text-gray-900'
                                }, selectedCustomer.name),
                                React.createElement('p', {
                                    key: 'customer-email',
                                    className: 'text-sm text-gray-500'
                                }, selectedCustomer.email)
                            ])
                        ]),
                        React.createElement('div', {
                            key: 'modal-footer',
                            className: 'flex gap-3 p-6 border-t border-gray-200'
                        }, [
                            React.createElement('button', {
                                key: 'confirm',
                                onClick: confirmDelete,
                                className: 'flex-1 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium transition-colors'
                            }, currentContent.confirm),
                            React.createElement('button', {
                                key: 'cancel',
                                onClick: closeModals,
                                className: 'flex-1 bg-gray-300 hover:bg-gray-400 text-gray-700 px-4 py-2 rounded-lg font-medium transition-colors'
                            }, currentContent.cancel)
                        ])
                    ])
                ])
            ]);
        };

        // MainScreen Component
        const MainScreen = ({ isArabic, setActiveSection }) => {
            const content = {
                ar: {
                    title: 'لوحة الإدارة الرئيسية',
                    subtitle: 'نظرة عامة على نشاط المشروع SaaS',
                    totalCustomers: 'إجمالي العملاء',
                    activeSubscriptions: 'الاشتراكات النشطة',
                    monthlyRevenue: 'الإيرادات الشهرية',
                    supportTickets: 'تذاكر الدعم',
                    lastMonth: 'من الشهر الماضي',
                    recentActivities: 'الأنشطة الأخيرة',
                    quickActions: 'إجراءات سريعة',
                    actions: {
                        addCustomer: 'إضافة عميل جديد',
                        createSubscription: 'إنشاء اشتراك جديد',
                        viewReports: 'عرض التقارير',
                        viewAnalytics: 'عرض الإحصائيات',
                        managePlans: 'إدارة الباقات',
                        manageEmployees: 'إدارة الموظفين',
                        systemSettings: 'إعدادات النظام',
                        notifications: 'إدارة الإشعارات'
                    }
                }
            };

            const currentContent = content[isArabic ? 'ar' : 'en'] || content.ar;

            // Quick Actions Handlers
            const handleQuickAction = (action) => {
                // Add visual feedback
                const actionNames = {
                    'customers': 'العملاء',
                    'subscriptions': 'الاشتراكات',
                    'plans': 'الباقات',
                    'employees': 'الموظفين',
                    'analytics': 'التحليلات',
                    'notifications': 'الإشعارات',
                    'settings': 'الإعدادات'
                };

                // Show loading state briefly
                const button = event?.target;
                if (button) {
                    button.style.transform = 'scale(0.95)';
                    setTimeout(() => {
                        button.style.transform = 'scale(1)';
                    }, 150);
                }

                // Navigate to section
                setTimeout(() => {
                    setActiveSection(action);
                    // Optional: Show success message
                    // alert(`تم الانتقال إلى قسم ${actionNames[action]}`);
                }, 150);
            };

            const stats = [
                {
                    title: currentContent.totalCustomers,
                    value: '2,847',
                    change: '+12%',
                    icon: '👥',
                    color: 'bg-blue-500',
                    action: 'customers'
                },
                {
                    title: currentContent.activeSubscriptions,
                    value: '1,923',
                    change: '+8%',
                    icon: '📊',
                    color: 'bg-green-500',
                    action: 'subscriptions'
                },
                {
                    title: currentContent.monthlyRevenue,
                    value: '125,750,000 د.ع',
                    change: '+15%',
                    icon: '💰',
                    color: 'bg-purple-500',
                    action: 'analytics'
                },
                {
                    title: currentContent.supportTickets,
                    value: '23',
                    change: '-5%',
                    icon: '🎫',
                    color: 'bg-orange-500',
                    action: 'notifications'
                }
            ];

            const recentActivities = [
                {
                    action: 'عميل جديد: سارة أحمد البغدادي',
                    time: 'منذ 5 دقائق',
                    type: 'user',
                    clickAction: 'customers'
                },
                {
                    action: 'اشتراك جديد: باقة الذهب',
                    time: 'منذ 15 دقيقة',
                    type: 'subscription',
                    clickAction: 'subscriptions'
                },
                {
                    action: 'دفعة مكتملة: 1,500,000 دينار',
                    time: 'منذ ساعة',
                    type: 'payment',
                    clickAction: 'analytics'
                },
                {
                    action: 'موظف جديد: محمد علي النجفي',
                    time: 'منذ ساعتين',
                    type: 'employee',
                    clickAction: 'employees'
                },
                {
                    action: 'تحديث باقة: باقة البرونز',
                    time: 'منذ 3 ساعات',
                    type: 'plan',
                    clickAction: 'plans'
                }
            ];

            const quickActions = [
                {
                    title: currentContent.actions.addCustomer,
                    icon: '👥',
                    color: 'bg-blue-50 hover:bg-blue-100 border-blue-200 text-blue-700',
                    action: 'customers'
                },
                {
                    title: currentContent.actions.managePlans,
                    icon: '📋',
                    color: 'bg-green-50 hover:bg-green-100 border-green-200 text-green-700',
                    action: 'plans'
                },
                {
                    title: currentContent.actions.manageEmployees,
                    icon: '�‍💼',
                    color: 'bg-purple-50 hover:bg-purple-100 border-purple-200 text-purple-700',
                    action: 'employees'
                },
                {
                    title: currentContent.actions.viewAnalytics,
                    icon: '📊',
                    color: 'bg-orange-50 hover:bg-orange-100 border-orange-200 text-orange-700',
                    action: 'analytics'
                },
                {
                    title: currentContent.actions.createSubscription,
                    icon: '🔄',
                    color: 'bg-indigo-50 hover:bg-indigo-100 border-indigo-200 text-indigo-700',
                    action: 'subscriptions'
                },
                {
                    title: currentContent.actions.notifications,
                    icon: '�',
                    color: 'bg-yellow-50 hover:bg-yellow-100 border-yellow-200 text-yellow-700',
                    action: 'notifications'
                },
                {
                    title: currentContent.actions.systemSettings,
                    icon: '⚙️',
                    color: 'bg-gray-50 hover:bg-gray-100 border-gray-200 text-gray-700',
                    action: 'settings'
                }
            ];

            return React.createElement('div', {
                className: 'main-screen space-y-4 sm:space-y-6'
            }, [
                // Page Header - Mobile Responsive
                React.createElement('div', {
                    key: 'header',
                    className: 'mb-4 sm:mb-6'
                }, [
                    React.createElement('h1', {
                        key: 'title',
                        className: 'text-2xl sm:text-3xl font-bold text-gray-900 mb-2'
                    }, currentContent.title),
                    React.createElement('p', {
                        key: 'subtitle',
                        className: 'text-sm sm:text-base text-gray-600'
                    }, currentContent.subtitle)
                ]),

                // Stats Grid - Mobile First Design
                React.createElement('div', {
                    key: 'stats',
                    className: 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 mb-6 sm:mb-8'
                },
                    stats.map((stat, index) =>
                        React.createElement('div', {
                            key: index,
                            onClick: () => handleQuickAction(stat.action),
                            className: 'bg-white rounded-lg sm:rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6 hover:shadow-lg transition-all duration-200 cursor-pointer transform hover:scale-[1.02] hover:border-blue-300'
                        }, [
                            React.createElement('div', {
                                key: 'stat-content',
                                className: 'flex items-center justify-between'
                            }, [
                                React.createElement('div', { key: 'text' }, [
                                    React.createElement('p', {
                                        key: 'title',
                                        className: 'text-xs sm:text-sm font-medium text-gray-600 mb-1'
                                    }, stat.title),
                                    React.createElement('p', {
                                        key: 'value',
                                        className: 'text-xl sm:text-2xl font-bold text-gray-900'
                                    }, stat.value),
                                    React.createElement('p', {
                                        key: 'change',
                                        className: `text-xs sm:text-sm font-medium ${stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`
                                    }, stat.change + ' ' + currentContent.lastMonth)
                                ]),
                                React.createElement('div', {
                                    key: 'icon',
                                    className: `${stat.color} text-white p-2 sm:p-3 rounded-lg text-lg sm:text-2xl`
                                }, stat.icon)
                            ])
                        ])
                    )
                ),

                // Dashboard Content Grid - Mobile Responsive
                React.createElement('div', {
                    key: 'dashboard-content',
                    className: 'grid grid-cols-1 xl:grid-cols-3 gap-4 sm:gap-6'
                }, [
                    // Recent Activities - Mobile Optimized
                    React.createElement('div', {
                        key: 'recent-activities',
                        className: 'xl:col-span-2 bg-white rounded-lg sm:rounded-xl shadow-sm border border-gray-200'
                    }, [
                        React.createElement('div', {
                            key: 'activities-header',
                            className: 'p-4 sm:p-6 border-b border-gray-200'
                        }, React.createElement('h3', {
                            className: 'text-lg sm:text-xl font-semibold text-gray-900'
                        }, currentContent.recentActivities)),
                        React.createElement('div', {
                            key: 'activities-list',
                            className: 'p-3 sm:p-6'
                        }, React.createElement('div', {
                            className: 'space-y-3'
                        }, recentActivities.map((activity, index) =>
                            React.createElement('div', {
                                key: index,
                                onClick: () => handleQuickAction(activity.clickAction),
                                className: 'flex items-start space-x-3 space-x-reverse p-3 sm:p-4 bg-gray-50 rounded-lg hover:bg-blue-50 transition-all duration-200 cursor-pointer border hover:border-blue-200 transform hover:scale-[1.01]'
                            }, [
                                React.createElement('div', {
                                    key: 'activity-icon',
                                    className: 'w-8 h-8 sm:w-10 sm:h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0'
                                }, React.createElement('span', {
                                    className: 'text-blue-600 text-sm sm:text-base'
                                }, activity.type === 'user' ? '👤' :
                                   activity.type === 'subscription' ? '📋' :
                                   activity.type === 'payment' ? '💳' :
                                   activity.type === 'employee' ? '👨‍💼' :
                                   activity.type === 'plan' ? '📦' : '⚙️')),
                                React.createElement('div', {
                                    key: 'activity-content',
                                    className: 'flex-1 min-w-0'
                                }, [
                                    React.createElement('p', {
                                        key: 'activity-action',
                                        className: 'text-sm sm:text-base text-gray-900 font-medium truncate'
                                    }, activity.action),
                                    React.createElement('p', {
                                        key: 'activity-time',
                                        className: 'text-xs sm:text-sm text-gray-500 mt-1'
                                    }, activity.time)
                                ])
                            ])
                        )))
                    ]),

                    // Quick Actions - Mobile Friendly
                    React.createElement('div', {
                        key: 'quick-actions',
                        className: 'bg-white rounded-lg sm:rounded-xl shadow-sm border border-gray-200'
                    }, [
                        React.createElement('div', {
                            key: 'actions-header',
                            className: 'p-4 sm:p-6 border-b border-gray-200'
                        }, React.createElement('h3', {
                            className: 'text-lg sm:text-xl font-semibold text-gray-900'
                        }, currentContent.quickActions)),
                        React.createElement('div', {
                            key: 'actions-list',
                            className: 'p-3 sm:p-6 space-y-3'
                        }, quickActions.map((action, index) =>
                            React.createElement('button', {
                                key: index,
                                onClick: () => handleQuickAction(action.action),
                                className: `w-full text-right p-3 sm:p-4 ${action.color} rounded-lg transition-all duration-200 border hover:shadow-md transform hover:scale-[1.02]`
                            }, [
                                React.createElement('div', {
                                    className: 'flex items-center justify-between'
                                }, [
                                    React.createElement('span', {
                                        className: 'text-sm sm:text-base font-medium'
                                    }, action.title),
                                    React.createElement('span', {
                                        className: 'text-lg'
                                    }, action.icon)
                                ])
                            ])
                        ))
                    ])
                ])
            ]);
        };

        // Render the app
        const container = document.getElementById('admin-panel-root');
        const root = ReactDOM.createRoot(container);
        root.render(React.createElement(AdminPanel));
    </script>

    <!-- PWA Install Component -->
    <script src="/js/pwa-install.js"></script>

    <!-- PWA Service Worker Registration -->
    <script>
        // تسجيل Service Worker
        if ('serviceWorker' in navigator) {
            window.addEventListener('load', () => {
                navigator.serviceWorker.register('/sw.js')
                    .then(registration => {
                        console.log('✅ PWA: تم تسجيل Service Worker بنجاح', registration.scope);

                        // فحص التحديثات
                        registration.addEventListener('updatefound', () => {
                            const newWorker = registration.installing;
                            newWorker.addEventListener('statechange', () => {
                                if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                                    console.log('🔄 PWA: تحديث جديد متوفر');

                                    // إظهار إشعار التحديث
                                    if (confirm('🔄 تحديث جديد متوفر لـ SalesFlow. هل تريد إعادة تحميل الصفحة؟')) {
                                        window.location.reload();
                                    }
                                }
                            });
                        });
                    })
                    .catch(error => {
                        console.log('❌ PWA: فشل في تسجيل Service Worker', error);
                    });
            });
        }

        // إضافة مكون PWA Install إلى الصفحة
        window.addEventListener('load', () => {
            const pwaContainer = document.createElement('div');
            pwaContainer.id = 'pwa-install-container';
            document.body.appendChild(pwaContainer);

            const pwaRoot = ReactDOM.createRoot(pwaContainer);
            pwaRoot.render(React.createElement(PWAInstallPrompt, { isArabic: true }));
        });

        // معالج تحديث التطبيق
        let refreshing = false;
        navigator.serviceWorker?.addEventListener('controllerchange', () => {
            if (refreshing) return;
            refreshing = true;
            window.location.reload();
        });

        // معالج حالة الاتصال
        window.addEventListener('online', () => {
            console.log('🌐 PWA: تم استعادة الاتصال بالإنترنت');

            // إخفاء رسالة عدم الاتصال إن وجدت
            const offlineMessage = document.getElementById('offline-message');
            if (offlineMessage) {
                offlineMessage.remove();
            }
        });

        window.addEventListener('offline', () => {
            console.log('📵 PWA: فقدان الاتصال بالإنترنت - التبديل إلى الوضع غير المتصل');

            // إظهار رسالة عدم الاتصال
            if (!document.getElementById('offline-message')) {
                const offlineDiv = document.createElement('div');
                offlineDiv.id = 'offline-message';
                offlineDiv.className = 'fixed top-4 left-4 right-4 bg-orange-500 text-white p-3 rounded-lg shadow-lg z-50 text-center';
                offlineDiv.innerHTML = '📵 أنت الآن في الوضع غير المتصل - بعض الميزات قد لا تعمل';
                document.body.appendChild(offlineDiv);
            }
        });

        // فحص الاتصال الأولي
        if (!navigator.onLine) {
            console.log('📵 PWA: التطبيق يعمل في الوضع غير المتصل');
        }
    </script>
</body>
</html>
