import React, { useState, useEffect } from 'react';
import BackButton from './BackButton';

const DebtsPage = () => {
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
    const [showPaymentModal, setShowPaymentModal] = useState(false);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showViewModal, setShowViewModal] = useState(false);
    const [selectedDebt, setSelectedDebt] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('all'); // all, unpaid, partial, overdue

    // Mock data for debts
    const [debts, setDebts] = useState([
        {
            id: 1,
            customerName: 'أحمد محمد العلي',
            customerId: 1,
            amount: 1500000,
            paidAmount: 500000,
            remainingAmount: 1000000,
            dueDate: '2025-08-10',
            invoiceNumber: 'INV-2025-001',
            status: 'partial', // unpaid, partial, paid, overdue
            notes: 'دفع جزء من المبلغ، الباقي متفق عليه نهاية الشهر',
            createdDate: '2025-07-15',
            lastPayment: '2025-07-20',
            paymentHistory: [
                { date: '2025-07-20', amount: 500000, method: 'نقدي', notes: 'دفعة جزئية' }
            ]
        },
        {
            id: 2,
            customerName: 'فاطمة حسن الكريم',
            customerId: 2,
            amount: 750000,
            paidAmount: 0,
            remainingAmount: 750000,
            dueDate: '2025-08-05',
            invoiceNumber: 'INV-2025-003',
            status: 'overdue',
            notes: 'عميل موثوق، سيدفع قريباً',
            createdDate: '2025-07-05',
            lastPayment: null,
            paymentHistory: []
        },
        {
            id: 3,
            customerName: 'محمد علي الربيعي',
            customerId: 3,
            amount: 2000000,
            paidAmount: 0,
            remainingAmount: 2000000,
            dueDate: '2025-08-15',
            invoiceNumber: 'INV-2025-005',
            status: 'unpaid',
            notes: 'دين جديد، لم يحن موعد الاستحقاق بعد',
            createdDate: '2025-08-01',
            lastPayment: null,
            paymentHistory: []
        },
        {
            id: 4,
            customerName: 'سارة أحمد الكاظم',
            customerId: 4,
            amount: 500000,
            paidAmount: 200000,
            remainingAmount: 300000,
            dueDate: '2025-08-12',
            invoiceNumber: 'INV-2025-007',
            status: 'partial',
            notes: 'تدفع على دفعات حسب الاتفاق',
            createdDate: '2025-07-22',
            lastPayment: '2025-08-01',
            paymentHistory: [
                { date: '2025-07-25', amount: 100000, method: 'تحويل بنكي', notes: 'دفعة أولى' },
                { date: '2025-08-01', amount: 100000, method: 'نقدي', notes: 'دفعة ثانية' }
            ]
        }
    ]);

    const [paymentData, setPaymentData] = useState({
        amount: 0,
        method: 'نقدي',
        notes: ''
    });

    const [newDebt, setNewDebt] = useState({
        customerId: '',
        customerName: '',
        amount: 0,
        dueDate: '',
        invoiceNumber: '',
        notes: ''
    });

    // قائمة العملاء للاختيار من بينها
    const [customers] = useState([
        { id: 1, name: 'أحمد محمد العلي', phone: '07701234567' },
        { id: 2, name: 'فاطمة حسن الكريم', phone: '07709876543' },
        { id: 3, name: 'محمد علي الربيعي', phone: '07701112233' },
        { id: 4, name: 'سارة أحمد الكاظم', phone: '07705555666' },
        { id: 5, name: 'علي حسين الجابر', phone: '07708888999' }
    ]);

    const [customerSearchTerm, setCustomerSearchTerm] = useState('');
    const [showCustomerDropdown, setShowCustomerDropdown] = useState(false);

    const content = {
        ar: {
            title: 'إدارة الديون',
            subtitle: 'متابعة ديون العملاء والمدفوعات',
            search: 'البحث عن دين...',
            addDebt: 'إضافة دين جديد',
            addPayment: 'تسجيل دفعة',
            totalDebts: 'إجمالي الديون',
            unpaidDebts: 'ديون غير مدفوعة',
            partialDebts: 'ديون جزئية',
            overdueDebts: 'ديون متأخرة',
            filters: {
                all: 'الكل',
                unpaid: 'غير مدفوعة',
                partial: 'جزئية',
                overdue: 'متأخرة'
            },
            debtInfo: {
                customer: 'العميل',
                amount: 'مبلغ الدين',
                paidAmount: 'المبلغ المدفوع',
                remainingAmount: 'المبلغ المتبقي',
                dueDate: 'تاريخ الاستحقاق',
                status: 'الحالة',
                invoiceNumber: 'رقم الفاتورة',
                notes: 'الملاحظات',
                createdDate: 'تاريخ الإنشاء',
                lastPayment: 'آخر دفعة',
                paymentHistory: 'سجل المدفوعات'
            },
            status: {
                unpaid: 'غير مدفوعة',
                partial: 'مدفوعة جزئياً',
                paid: 'مدفوعة',
                overdue: 'متأخرة'
            },
            actions: {
                view: 'عرض',
                pay: 'دفع',
                edit: 'تعديل',
                delete: 'حذف',
                remind: 'تذكير'
            },
            payment: {
                title: 'تسجيل دفعة',
                amount: 'المبلغ',
                method: 'طريقة الدفع',
                notes: 'ملاحظات',
                methods: {
                    cash: 'نقدي',
                    bank: 'تحويل بنكي',
                    card: 'بطاقة ائتمان',
                    check: 'شيك'
                },
                save: 'حفظ الدفعة',
                cancel: 'إلغاء'
            },
            create: {
                title: 'إضافة دين جديد',
                customer: 'اختر العميل',
                customerSearch: 'ابحث عن عميل...',
                amount: 'مبلغ الدين',
                dueDate: 'تاريخ الاستحقاق',
                invoiceNumber: 'رقم الفاتورة',
                autoGenerate: 'توليد تلقائي',
                notes: 'ملاحظات',
                save: 'حفظ الدين',
                cancel: 'إلغاء'
            },
            view: {
                title: 'تفاصيل الدين',
                close: 'إغلاق'
            },
            currency: 'د.ع',
            noDebts: 'لا يوجد ديون',
            daysOverdue: 'يوم تأخير'
        },
        en: {
            title: 'Debt Management',
            subtitle: 'Track customer debts and payments',
            search: 'Search for debt...',
            addDebt: 'Add New Debt',
            addPayment: 'Record Payment',
            totalDebts: 'Total Debts',
            unpaidDebts: 'Unpaid Debts',
            partialDebts: 'Partial Debts',
            overdueDebts: 'Overdue Debts',
            filters: {
                all: 'All',
                unpaid: 'Unpaid',
                partial: 'Partial',
                overdue: 'Overdue'
            },
            debtInfo: {
                customer: 'Customer',
                amount: 'Debt Amount',
                paidAmount: 'Paid Amount',
                remainingAmount: 'Remaining Amount',
                dueDate: 'Due Date',
                status: 'Status',
                invoiceNumber: 'Invoice Number',
                notes: 'Notes',
                createdDate: 'Created Date',
                lastPayment: 'Last Payment',
                paymentHistory: 'Payment History'
            },
            status: {
                unpaid: 'Unpaid',
                partial: 'Partially Paid',
                paid: 'Paid',
                overdue: 'Overdue'
            },
            actions: {
                view: 'View',
                pay: 'Pay',
                edit: 'Edit',
                delete: 'Delete',
                remind: 'Remind'
            },
            payment: {
                title: 'Record Payment',
                amount: 'Amount',
                method: 'Payment Method',
                notes: 'Notes',
                methods: {
                    cash: 'Cash',
                    bank: 'Bank Transfer',
                    card: 'Credit Card',
                    check: 'Check'
                },
                save: 'Save Payment',
                cancel: 'Cancel'
            },
            create: {
                title: 'Add New Debt',
                customer: 'Select Customer',
                customerSearch: 'Search for customer...',
                amount: 'Debt Amount',
                dueDate: 'Due Date',
                invoiceNumber: 'Invoice Number',
                autoGenerate: 'Auto Generate',
                notes: 'Notes',
                save: 'Save Debt',
                cancel: 'Cancel'
            },
            view: {
                title: 'Debt Details',
                close: 'Close'
            },
            currency: 'IQD',
            noDebts: 'No debts',
            daysOverdue: 'days overdue'
        }
    };

    const currentContent = isArabic ? content.ar : content.en;

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat(isArabic ? 'ar-IQ' : 'en-US').format(amount);
    };

    const getStatusColor = (status) => {
        switch(status) {
            case 'paid': return 'text-green-600';
            case 'partial': return 'text-yellow-600';
            case 'overdue': return 'text-red-600';
            case 'unpaid': return 'text-gray-600';
            default: return 'text-gray-600';
        }
    };

    const getStatusBgColor = (status) => {
        switch(status) {
            case 'paid': return 'bg-green-100 border-green-200';
            case 'partial': return 'bg-yellow-100 border-yellow-200';
            case 'overdue': return 'bg-red-100 border-red-200';
            case 'unpaid': return 'bg-gray-100 border-gray-200';
            default: return 'bg-gray-100 border-gray-200';
        }
    };

    const getStatusIcon = (status) => {
        switch(status) {
            case 'paid': return '✅';
            case 'partial': return '⏳';
            case 'overdue': return '🚨';
            case 'unpaid': return '⏸️';
            default: return '⏸️';
        }
    };

    const getDaysOverdue = (dueDate) => {
        const today = new Date();
        const due = new Date(dueDate);
        const diffTime = today - due;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays > 0 ? diffDays : 0;
    };

    const filteredDebts = debts.filter(debt => {
        const matchesSearch = debt.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                             debt.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase());

        if (filterStatus === 'all') return matchesSearch;
        return matchesSearch && debt.status === filterStatus;
    });

    const handlePaymentSubmit = (e) => {
        e.preventDefault();
        if (selectedDebt && paymentData.amount > 0) {
            // Update debt with payment
            const updatedDebts = debts.map(debt => {
                if (debt.id === selectedDebt.id) {
                    const newPaidAmount = debt.paidAmount + parseFloat(paymentData.amount);
                    const newRemainingAmount = debt.amount - newPaidAmount;

                    return {
                        ...debt,
                        paidAmount: newPaidAmount,
                        remainingAmount: newRemainingAmount,
                        status: newRemainingAmount <= 0 ? 'paid' : 'partial',
                        lastPayment: new Date().toISOString().split('T')[0],
                        paymentHistory: [
                            ...debt.paymentHistory,
                            {
                                date: new Date().toISOString().split('T')[0],
                                amount: parseFloat(paymentData.amount),
                                method: paymentData.method,
                                notes: paymentData.notes
                            }
                        ]
                    };
                }
                return debt;
            });

            setDebts(updatedDebts);
            setShowPaymentModal(false);
            setPaymentData({ amount: 0, method: 'نقدي', notes: '' });
        }
    };

    // دالة البحث عن العملاء
    const filteredCustomers = customers.filter(customer =>
        customer.name.toLowerCase().includes(customerSearchTerm.toLowerCase())
    );

    // دالة اختيار العميل
    const handleCustomerSelect = (customer) => {
        setNewDebt(prev => ({
            ...prev,
            customerId: customer.id,
            customerName: customer.name
        }));
        setCustomerSearchTerm(customer.name);
        setShowCustomerDropdown(false);
    };

    // دالة توليد رقم الفاتورة تلقائياً
    const generateInvoiceNumber = () => {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');
        const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
        return `INV-${year}${month}${day}-${random}`;
    };

    // دالة حفظ الدين الجديد
    const handleCreateDebt = (e) => {
        e.preventDefault();
        if (newDebt.customerId && newDebt.amount > 0) {
            const debtData = {
                id: debts.length + 1,
                customerName: newDebt.customerName,
                customerId: newDebt.customerId,
                amount: parseFloat(newDebt.amount),
                paidAmount: 0,
                remainingAmount: parseFloat(newDebt.amount),
                dueDate: newDebt.dueDate,
                invoiceNumber: newDebt.invoiceNumber || generateInvoiceNumber(),
                status: 'unpaid',
                notes: newDebt.notes,
                createdDate: new Date().toISOString().split('T')[0],
                lastPayment: null,
                paymentHistory: []
            };

            setDebts([...debts, debtData]);
            setShowCreateModal(false);
            setNewDebt({
                customerId: '',
                customerName: '',
                amount: 0,
                dueDate: '',
                invoiceNumber: '',
                notes: ''
            });
            setCustomerSearchTerm('');
        }
    };

    const getTotalStats = () => {
        return {
            total: debts.reduce((sum, debt) => sum + debt.amount, 0),
            unpaid: debts.filter(d => d.status === 'unpaid').length,
            partial: debts.filter(d => d.status === 'partial').length,
            overdue: debts.filter(d => d.status === 'overdue').length
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
                        <button
                            onClick={() => setShowCreateModal(true)}
                            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                            {currentContent.addDebt}
                        </button>
                    </div>

                    {/* Statistics Cards */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
                        <div className="bg-blue-50 p-3 rounded-lg border border-blue-100">
                            <div className="flex items-center">
                                <div className="p-2 bg-blue-500 rounded-lg">
                                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                                    </svg>
                                </div>
                                <div className={`${isArabic ? 'mr-3' : 'ml-3'} flex-1 min-w-0`}>
                                    <p className="text-blue-600 text-xs font-medium truncate">
                                        {currentContent.totalDebts}
                                    </p>
                                    <p className="text-blue-900 text-lg font-bold">
                                        {formatCurrency(stats.total)}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-gray-50 p-3 rounded-lg border border-gray-100">
                            <div className="flex items-center">
                                <div className="p-2 bg-gray-500 rounded-lg">
                                    <span className="text-white text-sm">⏸️</span>
                                </div>
                                <div className={`${isArabic ? 'mr-3' : 'ml-3'} flex-1 min-w-0`}>
                                    <p className="text-gray-600 text-xs font-medium truncate">
                                        {currentContent.unpaidDebts}
                                    </p>
                                    <p className="text-gray-900 text-lg font-bold">
                                        {stats.unpaid}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-yellow-50 p-3 rounded-lg border border-yellow-100">
                            <div className="flex items-center">
                                <div className="p-2 bg-yellow-500 rounded-lg">
                                    <span className="text-white text-sm">⏳</span>
                                </div>
                                <div className={`${isArabic ? 'mr-3' : 'ml-3'} flex-1 min-w-0`}>
                                    <p className="text-yellow-600 text-xs font-medium truncate">
                                        {currentContent.partialDebts}
                                    </p>
                                    <p className="text-yellow-900 text-lg font-bold">
                                        {stats.partial}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-red-50 p-3 rounded-lg border border-red-100">
                            <div className="flex items-center">
                                <div className="p-2 bg-red-500 rounded-lg">
                                    <span className="text-white text-sm">🚨</span>
                                </div>
                                <div className={`${isArabic ? 'mr-3' : 'ml-3'} flex-1 min-w-0`}>
                                    <p className="text-red-600 text-xs font-medium truncate">
                                        {currentContent.overdueDebts}
                                    </p>
                                    <p className="text-red-900 text-lg font-bold">
                                        {stats.overdue}
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
                            value={filterStatus}
                            onChange={(e) => setFilterStatus(e.target.value)}
                            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                            <option value="all">{currentContent.filters.all}</option>
                            <option value="unpaid">{currentContent.filters.unpaid}</option>
                            <option value="partial">{currentContent.filters.partial}</option>
                            <option value="overdue">{currentContent.filters.overdue}</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Debts List */}
            <div className="p-4">
                {filteredDebts.length === 0 ? (
                    <div className="text-center py-12">
                        <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                        <h3 className="mt-2 text-sm font-medium text-gray-900">{currentContent.noDebts}</h3>
                    </div>
                ) : (
                    <div className="space-y-3">
                        {filteredDebts.map((debt) => (
                            <div
                                key={debt.id}
                                className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow"
                            >
                                <div className="flex items-center justify-between">
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center">
                                            <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold ${debt.status === 'paid' ? 'bg-green-500' : debt.status === 'partial' ? 'bg-yellow-500' : debt.status === 'overdue' ? 'bg-red-500' : 'bg-gray-500'}`}>
                                                {getStatusIcon(debt.status)}
                                            </div>
                                            <div className={`${isArabic ? 'mr-3' : 'ml-3'} flex-1 min-w-0`}>
                                                <h3 className="text-lg font-semibold text-gray-900 truncate">
                                                    {debt.customerName}
                                                </h3>
                                                <p className="text-sm text-gray-500 truncate">
                                                    {debt.invoiceNumber} • {debt.dueDate}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="mt-3 grid grid-cols-2 gap-4 text-sm">
                                            <div>
                                                <span className="text-gray-500">{currentContent.debtInfo.amount}:</span>
                                                <span className="font-semibold text-gray-900 mr-1">
                                                    {formatCurrency(debt.amount)} {currentContent.currency}
                                                </span>
                                            </div>
                                            <div>
                                                <span className="text-gray-500">{currentContent.debtInfo.remainingAmount}:</span>
                                                <span className={`font-semibold mr-1 ${getStatusColor(debt.status)}`}>
                                                    {formatCurrency(debt.remainingAmount)} {currentContent.currency}
                                                </span>
                                            </div>
                                        </div>

                                        {debt.status === 'overdue' && (
                                            <div className="mt-2 bg-red-50 p-2 rounded border border-red-200">
                                                <span className="text-red-700 text-sm">
                                                    🚨 متأخر {getDaysOverdue(debt.dueDate)} {currentContent.daysOverdue}
                                                </span>
                                            </div>
                                        )}

                                        {debt.paidAmount > 0 && (
                                            <div className="mt-2 bg-green-50 p-2 rounded border border-green-200">
                                                <span className="text-green-700 text-sm">
                                                    تم دفع: {formatCurrency(debt.paidAmount)} {currentContent.currency}
                                                </span>
                                            </div>
                                        )}
                                    </div>

                                    <div className="flex flex-col gap-2">
                                        <button
                                            onClick={() => {
                                                setSelectedDebt(debt);
                                                setShowPaymentModal(true);
                                            }}
                                            className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700 transition-colors"
                                        >
                                            {currentContent.actions.pay}
                                        </button>
                                        <button
                                            onClick={() => {
                                                setSelectedDebt(debt);
                                                setShowViewModal(true);
                                            }}
                                            className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 transition-colors"
                                        >
                                            {currentContent.actions.view}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Payment Modal */}
            {showPaymentModal && selectedDebt && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
                        <div className="p-6">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-xl font-bold text-gray-900">
                                    {currentContent.payment.title}
                                </h2>
                                <button
                                    onClick={() => setShowPaymentModal(false)}
                                    className="text-gray-400 hover:text-gray-600"
                                >
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>

                            <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                                <p className="text-sm text-gray-600">العميل: <span className="font-semibold">{selectedDebt.customerName}</span></p>
                                <p className="text-sm text-gray-600">المبلغ المتبقي: <span className="font-semibold text-red-600">{formatCurrency(selectedDebt.remainingAmount)} {currentContent.currency}</span></p>
                            </div>

                            <form onSubmit={handlePaymentSubmit} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        {currentContent.payment.amount} *
                                    </label>
                                    <input
                                        type="number"
                                        value={paymentData.amount}
                                        onChange={(e) => setPaymentData({...paymentData, amount: parseFloat(e.target.value) || 0})}
                                        max={selectedDebt.remainingAmount}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        {currentContent.payment.method}
                                    </label>
                                    <select
                                        value={paymentData.method}
                                        onChange={(e) => setPaymentData({...paymentData, method: e.target.value})}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    >
                                        <option value="نقدي">{currentContent.payment.methods.cash}</option>
                                        <option value="تحويل بنكي">{currentContent.payment.methods.bank}</option>
                                        <option value="بطاقة ائتمان">{currentContent.payment.methods.card}</option>
                                        <option value="شيك">{currentContent.payment.methods.check}</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        {currentContent.payment.notes}
                                    </label>
                                    <textarea
                                        value={paymentData.notes}
                                        onChange={(e) => setPaymentData({...paymentData, notes: e.target.value})}
                                        rows="3"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                </div>

                                <div className="flex gap-3 pt-4">
                                    <button
                                        type="submit"
                                        className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors"
                                    >
                                        {currentContent.payment.save}
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setShowPaymentModal(false)}
                                        className="flex-1 bg-gray-200 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors"
                                    >
                                        {currentContent.payment.cancel}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}

            {/* Create Debt Modal */}
            {showCreateModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
                        <div className="p-6">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-xl font-bold text-gray-900">
                                    {currentContent.create.title}
                                </h2>
                                <button
                                    onClick={() => setShowCreateModal(false)}
                                    className="text-gray-400 hover:text-gray-600"
                                >
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>

                            <form onSubmit={handleCreateDebt} className="space-y-4">
                                {/* اختيار العميل */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        {currentContent.create.customer} *
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="text"
                                            value={customerSearchTerm}
                                            onChange={(e) => {
                                                setCustomerSearchTerm(e.target.value);
                                                setShowCustomerDropdown(true);
                                            }}
                                            onFocus={() => setShowCustomerDropdown(true)}
                                            placeholder={currentContent.create.customerSearch}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            required
                                        />
                                        {showCustomerDropdown && filteredCustomers.length > 0 && (
                                            <div className="absolute z-10 w-full bg-white border border-gray-300 rounded-lg mt-1 shadow-lg max-h-40 overflow-y-auto">
                                                {filteredCustomers.map(customer => (
                                                    <div
                                                        key={customer.id}
                                                        onClick={() => handleCustomerSelect(customer)}
                                                        className="px-3 py-2 hover:bg-blue-50 cursor-pointer border-b border-gray-100 last:border-b-0"
                                                    >
                                                        <div className="font-medium text-gray-900">{customer.name}</div>
                                                        <div className="text-sm text-gray-500">{customer.phone}</div>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        {currentContent.create.amount} *
                                    </label>
                                    <input
                                        type="number"
                                        value={newDebt.amount}
                                        onChange={(e) => setNewDebt({...newDebt, amount: parseFloat(e.target.value) || 0})}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        {currentContent.create.dueDate} *
                                    </label>
                                    <input
                                        type="date"
                                        value={newDebt.dueDate}
                                        onChange={(e) => setNewDebt({...newDebt, dueDate: e.target.value})}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        {currentContent.create.invoiceNumber}
                                    </label>
                                    <div className="flex gap-2">
                                        <input
                                            type="text"
                                            value={newDebt.invoiceNumber}
                                            onChange={(e) => setNewDebt({...newDebt, invoiceNumber: e.target.value})}
                                            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setNewDebt({...newDebt, invoiceNumber: generateInvoiceNumber()})}
                                            className="px-3 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors text-sm"
                                        >
                                            {currentContent.create.autoGenerate}
                                        </button>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        {currentContent.create.notes}
                                    </label>
                                    <textarea
                                        value={newDebt.notes}
                                        onChange={(e) => setNewDebt({...newDebt, notes: e.target.value})}
                                        rows="3"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                </div>

                                <div className="flex gap-3 pt-4">
                                    <button
                                        type="submit"
                                        className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
                                    >
                                        {currentContent.create.save}
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setShowCreateModal(false)}
                                        className="flex-1 bg-gray-200 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors"
                                    >
                                        {currentContent.create.cancel}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}

            {/* View Debt Modal */}
            {showViewModal && selectedDebt && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                        <div className="p-6">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-xl font-bold text-gray-900">
                                    {currentContent.view.title}
                                </h2>
                                <button
                                    onClick={() => setShowViewModal(false)}
                                    className="text-gray-400 hover:text-gray-600"
                                >
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>

                            <div className="space-y-6">
                                {/* معلومات الدين */}
                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-4">معلومات الدين</h3>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <span className="text-gray-600 text-sm">{currentContent.debtInfo.customer}:</span>
                                            <p className="font-semibold">{selectedDebt.customerName}</p>
                                        </div>
                                        <div>
                                            <span className="text-gray-600 text-sm">{currentContent.debtInfo.invoiceNumber}:</span>
                                            <p className="font-semibold">{selectedDebt.invoiceNumber}</p>
                                        </div>
                                        <div>
                                            <span className="text-gray-600 text-sm">{currentContent.debtInfo.amount}:</span>
                                            <p className="font-semibold text-blue-600">{formatCurrency(selectedDebt.amount)} {currentContent.currency}</p>
                                        </div>
                                        <div>
                                            <span className="text-gray-600 text-sm">{currentContent.debtInfo.remainingAmount}:</span>
                                            <p className={`font-semibold ${getStatusColor(selectedDebt.status)}`}>{formatCurrency(selectedDebt.remainingAmount)} {currentContent.currency}</p>
                                        </div>
                                        <div>
                                            <span className="text-gray-600 text-sm">{currentContent.debtInfo.dueDate}:</span>
                                            <p className="font-semibold">{selectedDebt.dueDate}</p>
                                        </div>
                                        <div>
                                            <span className="text-gray-600 text-sm">{currentContent.debtInfo.status}:</span>
                                            <p className={`font-semibold ${getStatusColor(selectedDebt.status)}`}>{currentContent.status[selectedDebt.status]}</p>
                                        </div>
                                    </div>
                                    {selectedDebt.notes && (
                                        <div className="mt-4">
                                            <span className="text-gray-600 text-sm">{currentContent.debtInfo.notes}:</span>
                                            <p className="font-semibold">{selectedDebt.notes}</p>
                                        </div>
                                    )}
                                </div>

                                {/* سجل المدفوعات */}
                                {selectedDebt.paymentHistory && selectedDebt.paymentHistory.length > 0 && (
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-900 mb-4">{currentContent.debtInfo.paymentHistory}</h3>
                                        <div className="space-y-3">
                                            {selectedDebt.paymentHistory.map((payment, index) => (
                                                <div key={index} className="bg-green-50 p-3 rounded-lg border border-green-200">
                                                    <div className="flex justify-between items-center">
                                                        <div>
                                                            <p className="font-semibold text-green-800">{formatCurrency(payment.amount)} {currentContent.currency}</p>
                                                            <p className="text-sm text-green-600">{payment.method} • {payment.date}</p>
                                                        </div>
                                                        {payment.notes && (
                                                            <p className="text-sm text-gray-600">{payment.notes}</p>
                                                        )}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                <div className="flex justify-end">
                                    <button
                                        onClick={() => setShowViewModal(false)}
                                        className="bg-gray-200 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors"
                                    >
                                        {currentContent.view.close}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DebtsPage;
