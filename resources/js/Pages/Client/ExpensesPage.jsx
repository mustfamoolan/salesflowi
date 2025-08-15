import React, { useState, useEffect } from 'react';
import BackButton from './BackButton';

const ExpensesPage = () => {
    useEffect(() => {
        // Hide loading screen after component loads
        setTimeout(() => {
            const loadingScreen = document.getElementById('loading-screen');
            if (loadingScreen) {
                loadingScreen.style.display = 'none';
            }
        }, 1000);
    }, []);

    const [isArabic, setIsArabic] = useState(true);
    const [showExpenseModal, setShowExpenseModal] = useState(false);
    const [selectedExpense, setSelectedExpense] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterCategory, setFilterCategory] = useState('all');
    const [filterDateRange, setFilterDateRange] = useState('all'); // all, today, week, month, year

    // Mock data for expenses
    const [expenses, setExpenses] = useState([
        {
            id: 1,
            title: 'إيجار المحل',
            amount: 1000000,
            category: 'rent',
            date: '2025-08-01',
            description: 'إيجار شهر أغسطس 2025',
            paymentMethod: 'bank_transfer',
            vendor: 'مالك العقار',
            receipt: 'REC-2025-001',
            status: 'paid',
            addedBy: 'أحمد محمد',
            addedDate: '2025-08-01T10:00:00'
        },
        {
            id: 2,
            title: 'فاتورة الكهرباء',
            amount: 150000,
            category: 'utilities',
            date: '2025-08-02',
            description: 'فاتورة كهرباء شهر يوليو',
            paymentMethod: 'cash',
            vendor: 'وزارة الكهرباء',
            receipt: 'ELEC-2025-07',
            status: 'paid',
            addedBy: 'فاطمة أحمد',
            addedDate: '2025-08-02T14:30:00'
        },
        {
            id: 3,
            title: 'شراء مستلزمات مكتبية',
            amount: 75000,
            category: 'office_supplies',
            date: '2025-08-03',
            description: 'أوراق، أقلام، دباسة وأدوات مكتبية أخرى',
            paymentMethod: 'cash',
            vendor: 'مكتبة الشروق',
            receipt: '',
            status: 'paid',
            addedBy: 'محمد علي',
            addedDate: '2025-08-03T09:15:00'
        },
        {
            id: 4,
            title: 'صيانة أجهزة الكمبيوتر',
            amount: 200000,
            category: 'maintenance',
            date: '2025-08-04',
            description: 'صيانة دورية للأجهزة والطابعات',
            paymentMethod: 'cash',
            vendor: 'مركز الصيانة التقني',
            receipt: 'MAINT-2025-08-04',
            status: 'paid',
            addedBy: 'سارة حسن',
            addedDate: '2025-08-04T16:45:00'
        },
        {
            id: 5,
            title: 'وقود السيارات',
            amount: 300000,
            category: 'transport',
            date: '2025-08-05',
            description: 'تعبئة وقود لسيارات التوصيل',
            paymentMethod: 'cash',
            vendor: 'محطة وقود النور',
            receipt: 'FUEL-2025-456',
            status: 'paid',
            addedBy: 'علي محمود',
            addedDate: '2025-08-05T11:20:00'
        },
        {
            id: 6,
            title: 'راتب الموظفين',
            amount: 2500000,
            category: 'salaries',
            date: '2025-08-01',
            description: 'رواتب شهر أغسطس لجميع الموظفين',
            paymentMethod: 'bank_transfer',
            vendor: 'الموظفين',
            receipt: 'SAL-2025-08',
            status: 'paid',
            addedBy: 'إدارة الحسابات',
            addedDate: '2025-08-01T08:00:00'
        }
    ]);

    const [newExpense, setNewExpense] = useState({
        title: '',
        amount: 0,
        category: 'other',
        date: new Date().toISOString().split('T')[0],
        description: '',
        paymentMethod: 'cash',
        vendor: '',
        receipt: ''
    });

    const content = {
        ar: {
            title: 'إدارة المصروفات',
            subtitle: 'تتبع وإدارة مصروفات العمل',
            search: 'البحث عن مصروف...',
            addExpense: 'إضافة مصروف جديد',
            totalExpenses: 'إجمالي المصروفات',
            monthlyExpenses: 'مصروفات الشهر',
            todayExpenses: 'مصروفات اليوم',
            categories: 'الفئات',
            filters: {
                all: 'الكل',
                today: 'اليوم',
                week: 'هذا الأسبوع',
                month: 'هذا الشهر',
                year: 'هذا العام'
            },
            expenseCategories: {
                all: 'جميع الفئات',
                rent: 'إيجار',
                utilities: 'خدمات',
                office_supplies: 'مستلزمات مكتبية',
                maintenance: 'صيانة',
                transport: 'مواصلات',
                salaries: 'رواتب',
                marketing: 'تسويق',
                meals: 'وجبات',
                other: 'أخرى'
            },
            expenseInfo: {
                title: 'العنوان',
                amount: 'المبلغ',
                category: 'الفئة',
                date: 'التاريخ',
                description: 'الوصف',
                paymentMethod: 'طريقة الدفع',
                vendor: 'المورد/المستفيد',
                receipt: 'رقم الإيصال',
                status: 'الحالة',
                addedBy: 'أضيف بواسطة',
                addedDate: 'تاريخ الإضافة'
            },
            paymentMethods: {
                cash: 'نقدي',
                bank_transfer: 'تحويل بنكي',
                credit_card: 'بطاقة ائتمان',
                check: 'شيك'
            },
            status: {
                paid: 'مدفوع',
                pending: 'معلق',
                cancelled: 'ملغي'
            },
            actions: {
                view: 'عرض',
                edit: 'تعديل',
                delete: 'حذف',
                duplicate: 'نسخ'
            },
            modal: {
                addTitle: 'إضافة مصروف جديد',
                editTitle: 'تعديل المصروف',
                viewTitle: 'تفاصيل المصروف',
                save: 'حفظ',
                cancel: 'إلغاء',
                close: 'إغلاق'
            },
            currency: 'د.ع',
            noExpenses: 'لا يوجد مصروفات',
            required: 'مطلوب'
        },
        en: {
            title: 'Expenses Management',
            subtitle: 'Track and manage business expenses',
            search: 'Search for expense...',
            addExpense: 'Add New Expense',
            totalExpenses: 'Total Expenses',
            monthlyExpenses: 'Monthly Expenses',
            todayExpenses: 'Today Expenses',
            categories: 'Categories',
            filters: {
                all: 'All',
                today: 'Today',
                week: 'This Week',
                month: 'This Month',
                year: 'This Year'
            },
            expenseCategories: {
                all: 'All Categories',
                rent: 'Rent',
                utilities: 'Utilities',
                office_supplies: 'Office Supplies',
                maintenance: 'Maintenance',
                transport: 'Transport',
                salaries: 'Salaries',
                marketing: 'Marketing',
                meals: 'Meals',
                other: 'Other'
            },
            expenseInfo: {
                title: 'Title',
                amount: 'Amount',
                category: 'Category',
                date: 'Date',
                description: 'Description',
                paymentMethod: 'Payment Method',
                vendor: 'Vendor/Beneficiary',
                receipt: 'Receipt Number',
                status: 'Status',
                addedBy: 'Added By',
                addedDate: 'Date Added'
            },
            paymentMethods: {
                cash: 'Cash',
                bank_transfer: 'Bank Transfer',
                credit_card: 'Credit Card',
                check: 'Check'
            },
            status: {
                paid: 'Paid',
                pending: 'Pending',
                cancelled: 'Cancelled'
            },
            actions: {
                view: 'View',
                edit: 'Edit',
                delete: 'Delete',
                duplicate: 'Duplicate'
            },
            modal: {
                addTitle: 'Add New Expense',
                editTitle: 'Edit Expense',
                viewTitle: 'Expense Details',
                save: 'Save',
                cancel: 'Cancel',
                close: 'Close'
            },
            currency: 'IQD',
            noExpenses: 'No expenses',
            required: 'Required'
        }
    };

    const currentContent = isArabic ? content.ar : content.en;

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat(isArabic ? 'ar-IQ' : 'en-US').format(amount);
    };

    const getCategoryIcon = (category) => {
        const icons = {
            rent: '🏢',
            utilities: '⚡',
            office_supplies: '📝',
            maintenance: '🔧',
            transport: '🚗',
            salaries: '💰',
            marketing: '📢',
            meals: '🍽️',
            other: '📦'
        };
        return icons[category] || '📦';
    };

    const getCategoryColor = (category) => {
        const colors = {
            rent: 'bg-purple-100 text-purple-800 border-purple-200',
            utilities: 'bg-yellow-100 text-yellow-800 border-yellow-200',
            office_supplies: 'bg-blue-100 text-blue-800 border-blue-200',
            maintenance: 'bg-orange-100 text-orange-800 border-orange-200',
            transport: 'bg-green-100 text-green-800 border-green-200',
            salaries: 'bg-red-100 text-red-800 border-red-200',
            marketing: 'bg-pink-100 text-pink-800 border-pink-200',
            meals: 'bg-amber-100 text-amber-800 border-amber-200',
            other: 'bg-gray-100 text-gray-800 border-gray-200'
        };
        return colors[category] || 'bg-gray-100 text-gray-800 border-gray-200';
    };

    const filterExpensesByDate = (expenses, range) => {
        const today = new Date();
        const todayStr = today.toISOString().split('T')[0];

        switch(range) {
            case 'today':
                return expenses.filter(exp => exp.date === todayStr);
            case 'week':
                const weekAgo = new Date();
                weekAgo.setDate(today.getDate() - 7);
                return expenses.filter(exp => new Date(exp.date) >= weekAgo);
            case 'month':
                const monthAgo = new Date();
                monthAgo.setMonth(today.getMonth() - 1);
                return expenses.filter(exp => new Date(exp.date) >= monthAgo);
            case 'year':
                const yearAgo = new Date();
                yearAgo.setFullYear(today.getFullYear() - 1);
                return expenses.filter(exp => new Date(exp.date) >= yearAgo);
            default:
                return expenses;
        }
    };

    const filteredExpenses = expenses.filter(expense => {
        const matchesSearch = expense.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                             expense.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                             expense.vendor.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesCategory = filterCategory === 'all' || expense.category === filterCategory;

        const dateFiltered = filterExpensesByDate([expense], filterDateRange).length > 0;

        return matchesSearch && matchesCategory && dateFiltered;
    });

    const handleSubmitExpense = (e) => {
        e.preventDefault();
        if (selectedExpense) {
            // Edit existing expense
            const updatedExpenses = expenses.map(exp =>
                exp.id === selectedExpense.id
                    ? { ...exp, ...newExpense, addedDate: exp.addedDate }
                    : exp
            );
            setExpenses(updatedExpenses);
        } else {
            // Add new expense
            const expense = {
                ...newExpense,
                id: Date.now(),
                status: 'paid',
                addedBy: 'المستخدم الحالي',
                addedDate: new Date().toISOString()
            };
            setExpenses([expense, ...expenses]);
        }

        setShowExpenseModal(false);
        setSelectedExpense(null);
        setNewExpense({
            title: '',
            amount: 0,
            category: 'other',
            date: new Date().toISOString().split('T')[0],
            description: '',
            paymentMethod: 'cash',
            vendor: '',
            receipt: ''
        });
    };

    const handleEdit = (expense) => {
        setSelectedExpense(expense);
        setNewExpense({
            title: expense.title,
            amount: expense.amount,
            category: expense.category,
            date: expense.date,
            description: expense.description,
            paymentMethod: expense.paymentMethod,
            vendor: expense.vendor,
            receipt: expense.receipt
        });
        setShowExpenseModal(true);
    };

    const handleDelete = (expenseId) => {
        if (confirm('هل أنت متأكد من حذف هذا المصروف؟')) {
            setExpenses(expenses.filter(exp => exp.id !== expenseId));
        }
    };

    const getTotalStats = () => {
        const today = new Date().toISOString().split('T')[0];
        const thisMonth = new Date();
        thisMonth.setDate(1);

        return {
            total: expenses.reduce((sum, exp) => sum + exp.amount, 0),
            today: expenses.filter(exp => exp.date === today).reduce((sum, exp) => sum + exp.amount, 0),
            month: expenses.filter(exp => new Date(exp.date) >= thisMonth).reduce((sum, exp) => sum + exp.amount, 0),
            count: expenses.length
        };
    };

    const stats = getTotalStats();

    return (
        <div className={`min-h-screen bg-gray-50 ${isArabic ? 'rtl' : 'ltr'}`}>
            <BackButton />
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
                                onClick={() => {
                                    setSelectedExpense(null);
                                    setNewExpense({
                                        title: '',
                                        amount: 0,
                                        category: 'other',
                                        date: new Date().toISOString().split('T')[0],
                                        description: '',
                                        paymentMethod: 'cash',
                                        vendor: '',
                                        receipt: ''
                                    });
                                    setShowExpenseModal(true);
                                }}
                                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                            >
                                {currentContent.addExpense}
                            </button>
                        </div>
                    </div>

                    {/* Statistics Cards */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
                        <div className="bg-red-50 p-3 rounded-lg border border-red-100">
                            <div className="flex items-center">
                                <div className="p-2 bg-red-500 rounded-lg">
                                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                                    </svg>
                                </div>
                                <div className={`${isArabic ? 'mr-3' : 'ml-3'} flex-1 min-w-0`}>
                                    <p className="text-red-600 text-xs font-medium truncate">
                                        {currentContent.totalExpenses}
                                    </p>
                                    <p className="text-red-900 text-lg font-bold">
                                        {formatCurrency(stats.total)}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-orange-50 p-3 rounded-lg border border-orange-100">
                            <div className="flex items-center">
                                <div className="p-2 bg-orange-500 rounded-lg">
                                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                </div>
                                <div className={`${isArabic ? 'mr-3' : 'ml-3'} flex-1 min-w-0`}>
                                    <p className="text-orange-600 text-xs font-medium truncate">
                                        {currentContent.monthlyExpenses}
                                    </p>
                                    <p className="text-orange-900 text-lg font-bold">
                                        {formatCurrency(stats.month)}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-yellow-50 p-3 rounded-lg border border-yellow-100">
                            <div className="flex items-center">
                                <div className="p-2 bg-yellow-500 rounded-lg">
                                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707" />
                                    </svg>
                                </div>
                                <div className={`${isArabic ? 'mr-3' : 'ml-3'} flex-1 min-w-0`}>
                                    <p className="text-yellow-600 text-xs font-medium truncate">
                                        {currentContent.todayExpenses}
                                    </p>
                                    <p className="text-yellow-900 text-lg font-bold">
                                        {formatCurrency(stats.today)}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-blue-50 p-3 rounded-lg border border-blue-100">
                            <div className="flex items-center">
                                <div className="p-2 bg-blue-500 rounded-lg">
                                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
                                    </svg>
                                </div>
                                <div className={`${isArabic ? 'mr-3' : 'ml-3'} flex-1 min-w-0`}>
                                    <p className="text-blue-600 text-xs font-medium truncate">
                                        {currentContent.categories}
                                    </p>
                                    <p className="text-blue-900 text-lg font-bold">
                                        {stats.count}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Search and Filters */}
                    <div className="flex flex-col sm:flex-row gap-3">
                        <div className="flex-1 relative">
                            <input
                                type="text"
                                placeholder={currentContent.search}
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                            <svg className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>

                        <select
                            value={filterCategory}
                            onChange={(e) => setFilterCategory(e.target.value)}
                            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                            {Object.entries(currentContent.expenseCategories).map(([key, value]) => (
                                <option key={key} value={key}>{value}</option>
                            ))}
                        </select>

                        <select
                            value={filterDateRange}
                            onChange={(e) => setFilterDateRange(e.target.value)}
                            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                            {Object.entries(currentContent.filters).map(([key, value]) => (
                                <option key={key} value={key}>{value}</option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>

            {/* Expenses List */}
            <div className="p-4">
                {filteredExpenses.length === 0 ? (
                    <div className="text-center py-12">
                        <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                        <h3 className="mt-2 text-sm font-medium text-gray-900">{currentContent.noExpenses}</h3>
                    </div>
                ) : (
                    <div className="space-y-3">
                        {filteredExpenses.map((expense) => (
                            <div
                                key={expense.id}
                                className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow"
                            >
                                <div className="flex items-center justify-between">
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center">
                                            <div className="w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center text-xl">
                                                {getCategoryIcon(expense.category)}
                                            </div>
                                            <div className={`${isArabic ? 'mr-3' : 'ml-3'} flex-1 min-w-0`}>
                                                <h3 className="text-lg font-semibold text-gray-900 truncate">
                                                    {expense.title}
                                                </h3>
                                                <p className="text-sm text-gray-500 truncate">
                                                    {expense.vendor} • {expense.date}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="mt-3 flex items-center justify-between">
                                            <div className="flex items-center gap-2">
                                                <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getCategoryColor(expense.category)}`}>
                                                    {currentContent.expenseCategories[expense.category]}
                                                </span>
                                                <span className="text-xs text-gray-500">
                                                    {currentContent.paymentMethods[expense.paymentMethod]}
                                                </span>
                                            </div>
                                            <div className="text-right">
                                                <span className="text-xl font-bold text-red-600">
                                                    {formatCurrency(expense.amount)} {currentContent.currency}
                                                </span>
                                            </div>
                                        </div>

                                        {expense.description && (
                                            <p className="mt-2 text-sm text-gray-600 line-clamp-2">
                                                {expense.description}
                                            </p>
                                        )}
                                    </div>

                                    <div className="flex flex-col gap-2 mr-4">
                                        <button
                                            onClick={() => handleEdit(expense)}
                                            className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 transition-colors"
                                        >
                                            {currentContent.actions.edit}
                                        </button>
                                        <button
                                            onClick={() => handleDelete(expense.id)}
                                            className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700 transition-colors"
                                        >
                                            {currentContent.actions.delete}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Add/Edit Expense Modal */}
            {showExpenseModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-lg shadow-xl w-full max-w-md max-h-[90vh] overflow-auto">
                        <div className="p-6">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-xl font-bold text-gray-900">
                                    {selectedExpense ? currentContent.modal.editTitle : currentContent.modal.addTitle}
                                </h2>
                                <button
                                    onClick={() => {
                                        setShowExpenseModal(false);
                                        setSelectedExpense(null);
                                    }}
                                    className="text-gray-400 hover:text-gray-600"
                                >
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>

                            <form onSubmit={handleSubmitExpense} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        {currentContent.expenseInfo.title} *
                                    </label>
                                    <input
                                        type="text"
                                        value={newExpense.title}
                                        onChange={(e) => setNewExpense({...newExpense, title: e.target.value})}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        required
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-3">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            {currentContent.expenseInfo.amount} *
                                        </label>
                                        <input
                                            type="number"
                                            value={newExpense.amount}
                                            onChange={(e) => setNewExpense({...newExpense, amount: parseFloat(e.target.value) || 0})}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            {currentContent.expenseInfo.date} *
                                        </label>
                                        <input
                                            type="date"
                                            value={newExpense.date}
                                            onChange={(e) => setNewExpense({...newExpense, date: e.target.value})}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            required
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        {currentContent.expenseInfo.category} *
                                    </label>
                                    <select
                                        value={newExpense.category}
                                        onChange={(e) => setNewExpense({...newExpense, category: e.target.value})}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        required
                                    >
                                        {Object.entries(currentContent.expenseCategories)
                                            .filter(([key]) => key !== 'all')
                                            .map(([key, value]) => (
                                            <option key={key} value={key}>{value}</option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        {currentContent.expenseInfo.paymentMethod}
                                    </label>
                                    <select
                                        value={newExpense.paymentMethod}
                                        onChange={(e) => setNewExpense({...newExpense, paymentMethod: e.target.value})}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    >
                                        {Object.entries(currentContent.paymentMethods).map(([key, value]) => (
                                            <option key={key} value={key}>{value}</option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        {currentContent.expenseInfo.vendor}
                                    </label>
                                    <input
                                        type="text"
                                        value={newExpense.vendor}
                                        onChange={(e) => setNewExpense({...newExpense, vendor: e.target.value})}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        {currentContent.expenseInfo.receipt}
                                    </label>
                                    <input
                                        type="text"
                                        value={newExpense.receipt}
                                        onChange={(e) => setNewExpense({...newExpense, receipt: e.target.value})}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        {currentContent.expenseInfo.description}
                                    </label>
                                    <textarea
                                        value={newExpense.description}
                                        onChange={(e) => setNewExpense({...newExpense, description: e.target.value})}
                                        rows="3"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                </div>

                                <div className="flex gap-3 pt-4">
                                    <button
                                        type="submit"
                                        className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
                                    >
                                        {currentContent.modal.save}
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setShowExpenseModal(false);
                                            setSelectedExpense(null);
                                        }}
                                        className="flex-1 bg-gray-200 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors"
                                    >
                                        {currentContent.modal.cancel}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ExpensesPage;
