import React, { useState, useEffect } from 'react';
import BackButton from './BackButton';

const InvoicesPage = () => {
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
    const [showCreateInvoice, setShowCreateInvoice] = useState(false);
    const [showInvoiceDetails, setShowInvoiceDetails] = useState(false);
    const [selectedInvoice, setSelectedInvoice] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('all'); // all, paid, unpaid, partial

    // Mock data for invoices
    const [invoices, setInvoices] = useState([
        {
            id: 1,
            invoiceNumber: 'INV-2025-001',
            customerName: 'أحمد محمد العلي',
            customerId: 1,
            date: '2025-08-05',
            dueDate: '2025-08-20',
            items: [
                { productName: 'لابتوب ديل XPS 13', quantity: 1, price: 1200000, total: 1200000 },
                { productName: 'ماوس لاسلكي', quantity: 2, price: 25000, total: 50000 }
            ],
            subtotal: 1250000,
            tax: 62500,
            discount: 0,
            total: 1312500,
            paidAmount: 1312500,
            remainingAmount: 0,
            status: 'paid', // paid, unpaid, partial
            paymentMethod: 'نقدي',
            notes: 'تم التسليم بالكامل',
            createdBy: 'Admin'
        },
        {
            id: 2,
            invoiceNumber: 'INV-2025-002',
            customerName: 'فاطمة حسن الكريم',
            customerId: 2,
            date: '2025-08-04',
            dueDate: '2025-08-19',
            items: [
                { productName: 'هاتف آيفون 15 برو', quantity: 1, price: 1800000, total: 1800000 }
            ],
            subtotal: 1800000,
            tax: 90000,
            discount: 50000,
            total: 1840000,
            paidAmount: 500000,
            remainingAmount: 1340000,
            status: 'partial',
            paymentMethod: 'تقسيط',
            notes: 'دفعة أولى، باقي المبلغ على 6 أقساط',
            createdBy: 'Admin'
        },
        {
            id: 3,
            invoiceNumber: 'INV-2025-003',
            customerName: 'محمد علي الربيعي',
            customerId: 3,
            date: '2025-08-03',
            dueDate: '2025-08-18',
            items: [
                { productName: 'طاولة مكتب خشبية', quantity: 1, price: 350000, total: 350000 }
            ],
            subtotal: 350000,
            tax: 17500,
            discount: 0,
            total: 367500,
            paidAmount: 0,
            remainingAmount: 367500,
            status: 'unpaid',
            paymentMethod: 'دين',
            notes: 'سيتم الدفع نهاية الشهر',
            createdBy: 'Admin'
        }
    ]);

    const content = {
        ar: {
            title: 'إدارة الفواتير',
            subtitle: 'قائمة الفواتير ومتابعة المدفوعات',
            search: 'البحث عن فاتورة...',
            createInvoice: 'إنشاء فاتورة جديدة',
            totalInvoices: 'إجمالي الفواتير',
            paidInvoices: 'فواتير مدفوعة',
            unpaidInvoices: 'فواتير غير مدفوعة',
            partialInvoices: 'فواتير جزئية',
            filters: {
                all: 'الكل',
                paid: 'مدفوعة',
                unpaid: 'غير مدفوعة',
                partial: 'جزئية'
            },
            invoiceInfo: {
                invoiceNumber: 'رقم الفاتورة',
                customer: 'العميل',
                date: 'تاريخ الفاتورة',
                dueDate: 'تاريخ الاستحقاق',
                total: 'الإجمالي',
                paidAmount: 'المبلغ المدفوع',
                remainingAmount: 'المبلغ المتبقي',
                status: 'الحالة',
                paymentMethod: 'طريقة الدفع',
                notes: 'الملاحظات',
                items: 'العناصر',
                subtotal: 'المجموع الفرعي',
                tax: 'الضريبة',
                discount: 'الخصم',
                createdBy: 'أنشئت بواسطة'
            },
            status: {
                paid: 'مدفوعة',
                unpaid: 'غير مدفوعة',
                partial: 'مدفوعة جزئياً'
            },
            actions: {
                view: 'عرض',
                edit: 'تعديل',
                delete: 'حذف',
                print: 'طباعة',
                share: 'مشاركة',
                payment: 'تسجيل دفعة',
                duplicate: 'نسخ الفاتورة'
            },
            currency: 'د.ع',
            noInvoices: 'لا يوجد فواتير',
            createFirstInvoice: 'أنشئ أول فاتورة لك'
        },
        en: {
            title: 'Invoice Management',
            subtitle: 'Invoice list and payment tracking',
            search: 'Search for invoice...',
            createInvoice: 'Create New Invoice',
            totalInvoices: 'Total Invoices',
            paidInvoices: 'Paid Invoices',
            unpaidInvoices: 'Unpaid Invoices',
            partialInvoices: 'Partial Invoices',
            filters: {
                all: 'All',
                paid: 'Paid',
                unpaid: 'Unpaid',
                partial: 'Partial'
            },
            invoiceInfo: {
                invoiceNumber: 'Invoice Number',
                customer: 'Customer',
                date: 'Invoice Date',
                dueDate: 'Due Date',
                total: 'Total',
                paidAmount: 'Paid Amount',
                remainingAmount: 'Remaining Amount',
                status: 'Status',
                paymentMethod: 'Payment Method',
                notes: 'Notes',
                items: 'Items',
                subtotal: 'Subtotal',
                tax: 'Tax',
                discount: 'Discount',
                createdBy: 'Created By'
            },
            status: {
                paid: 'Paid',
                unpaid: 'Unpaid',
                partial: 'Partially Paid'
            },
            actions: {
                view: 'View',
                edit: 'Edit',
                delete: 'Delete',
                print: 'Print',
                share: 'Share',
                payment: 'Record Payment',
                duplicate: 'Duplicate Invoice'
            },
            currency: 'IQD',
            noInvoices: 'No invoices',
            createFirstInvoice: 'Create your first invoice'
        }
    };

    const currentContent = isArabic ? content.ar : content.en;

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat(isArabic ? 'ar-IQ' : 'en-US').format(amount);
    };

    const getStatusColor = (status) => {
        if (status === 'paid') return 'text-green-600';
        if (status === 'partial') return 'text-yellow-600';
        return 'text-red-600';
    };

    const getStatusBgColor = (status) => {
        if (status === 'paid') return 'bg-green-100 border-green-200';
        if (status === 'partial') return 'bg-yellow-100 border-yellow-200';
        return 'bg-red-100 border-red-200';
    };

    const getStatusIcon = (status) => {
        if (status === 'paid') return '✅';
        if (status === 'partial') return '⏳';
        return '❌';
    };

    const filteredInvoices = invoices.filter(invoice => {
        const matchesSearch = invoice.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                             invoice.customerName.toLowerCase().includes(searchTerm.toLowerCase());

        if (filterStatus === 'all') return matchesSearch;
        return matchesSearch && invoice.status === filterStatus;
    });

    const handleInvoiceClick = (invoice) => {
        setSelectedInvoice(invoice);
        setShowInvoiceDetails(true);
    };

    const calculateTotalAmount = () => {
        return invoices.reduce((sum, invoice) => sum + invoice.total, 0);
    };

    const calculatePaidAmount = () => {
        return invoices.reduce((sum, invoice) => sum + invoice.paidAmount, 0);
    };

    const calculateRemainingAmount = () => {
        return invoices.reduce((sum, invoice) => sum + invoice.remainingAmount, 0);
    };

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
                    </div>

                    {/* Statistics Cards */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
                        <div className="bg-blue-50 p-3 rounded-lg border border-blue-100">
                            <div className="flex items-center">
                                <div className="p-2 bg-blue-500 rounded-lg">
                                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                </div>
                                <div className={`${isArabic ? 'mr-3' : 'ml-3'} flex-1 min-w-0`}>
                                    <p className="text-blue-600 text-xs font-medium truncate">
                                        {currentContent.totalInvoices}
                                    </p>
                                    <p className="text-blue-900 text-lg font-bold">
                                        {invoices.length}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-green-50 p-3 rounded-lg border border-green-100">
                            <div className="flex items-center">
                                <div className="p-2 bg-green-500 rounded-lg">
                                    <span className="text-white text-sm">✅</span>
                                </div>
                                <div className={`${isArabic ? 'mr-3' : 'ml-3'} flex-1 min-w-0`}>
                                    <p className="text-green-600 text-xs font-medium truncate">
                                        {currentContent.paidInvoices}
                                    </p>
                                    <p className="text-green-900 text-lg font-bold">
                                        {invoices.filter(i => i.status === 'paid').length}
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
                                        {currentContent.partialInvoices}
                                    </p>
                                    <p className="text-yellow-900 text-lg font-bold">
                                        {invoices.filter(i => i.status === 'partial').length}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-red-50 p-3 rounded-lg border border-red-100">
                            <div className="flex items-center">
                                <div className="p-2 bg-red-500 rounded-lg">
                                    <span className="text-white text-sm">❌</span>
                                </div>
                                <div className={`${isArabic ? 'mr-3' : 'ml-3'} flex-1 min-w-0`}>
                                    <p className="text-red-600 text-xs font-medium truncate">
                                        {currentContent.unpaidInvoices}
                                    </p>
                                    <p className="text-red-900 text-lg font-bold">
                                        {invoices.filter(i => i.status === 'unpaid').length}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Financial Summary */}
                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-lg border border-blue-200 mb-4">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                            <div>
                                <p className="text-blue-600 text-sm font-medium">إجمالي قيمة الفواتير</p>
                                <p className="text-blue-900 text-xl font-bold">
                                    {formatCurrency(calculateTotalAmount())} {currentContent.currency}
                                </p>
                            </div>
                            <div>
                                <p className="text-green-600 text-sm font-medium">المبلغ المحصل</p>
                                <p className="text-green-900 text-xl font-bold">
                                    {formatCurrency(calculatePaidAmount())} {currentContent.currency}
                                </p>
                            </div>
                            <div>
                                <p className="text-red-600 text-sm font-medium">المبلغ المتبقي</p>
                                <p className="text-red-900 text-xl font-bold">
                                    {formatCurrency(calculateRemainingAmount())} {currentContent.currency}
                                </p>
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
                            <option value="paid">{currentContent.filters.paid}</option>
                            <option value="unpaid">{currentContent.filters.unpaid}</option>
                            <option value="partial">{currentContent.filters.partial}</option>
                        </select>

                        <button
                            onClick={() => setShowCreateInvoice(true)}
                            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center"
                        >
                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                            </svg>
                            {currentContent.createInvoice}
                        </button>
                    </div>
                </div>
            </div>

            {/* Invoice List */}
            <div className="p-4">
                {filteredInvoices.length === 0 ? (
                    <div className="text-center py-12">
                        <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        <h3 className="mt-2 text-sm font-medium text-gray-900">{currentContent.noInvoices}</h3>
                        <p className="mt-1 text-sm text-gray-500">{currentContent.createFirstInvoice}</p>
                        <div className="mt-6">
                            <button
                                onClick={() => setShowCreateInvoice(true)}
                                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                            >
                                {currentContent.createInvoice}
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="space-y-3">
                        {filteredInvoices.map((invoice) => (
                            <div
                                key={invoice.id}
                                onClick={() => handleInvoiceClick(invoice)}
                                className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow cursor-pointer"
                            >
                                <div className="flex items-center justify-between">
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center">
                                            <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold ${invoice.status === 'paid' ? 'bg-green-500' : invoice.status === 'partial' ? 'bg-yellow-500' : 'bg-red-500'}`}>
                                                {getStatusIcon(invoice.status)}
                                            </div>
                                            <div className={`${isArabic ? 'mr-3' : 'ml-3'} flex-1 min-w-0`}>
                                                <h3 className="text-lg font-semibold text-gray-900">
                                                    {invoice.invoiceNumber}
                                                </h3>
                                                <p className="text-sm text-gray-500 truncate">
                                                    {invoice.customerName} • {invoice.date}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="mt-2 grid grid-cols-2 gap-4 text-sm">
                                            <div>
                                                <span className="text-gray-500">{currentContent.invoiceInfo.total}:</span>
                                                <span className="font-semibold text-gray-900 mr-1">
                                                    {formatCurrency(invoice.total)} {currentContent.currency}
                                                </span>
                                            </div>
                                            <div>
                                                <span className="text-gray-500">{currentContent.invoiceInfo.status}:</span>
                                                <span className={`font-semibold mr-1 ${getStatusColor(invoice.status)}`}>
                                                    {currentContent.status[invoice.status]}
                                                </span>
                                            </div>
                                        </div>

                                        {invoice.remainingAmount > 0 && (
                                            <div className="mt-2 bg-yellow-50 p-2 rounded border border-yellow-200">
                                                <span className="text-yellow-700 text-sm">
                                                    المتبقي: {formatCurrency(invoice.remainingAmount)} {currentContent.currency}
                                                </span>
                                            </div>
                                        )}
                                    </div>

                                    <div className="flex flex-col items-center">
                                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Invoice Details Modal */}
            {showInvoiceDetails && selectedInvoice && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
                        <div className="p-6">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-xl font-bold text-gray-900">
                                    {selectedInvoice.invoiceNumber}
                                </h2>
                                <button
                                    onClick={() => setShowInvoiceDetails(false)}
                                    className="text-gray-400 hover:text-gray-600"
                                >
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>

                            {/* Invoice Header */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <h3 className="font-semibold text-gray-900 mb-3">معلومات الفاتورة</h3>
                                    <div className="space-y-2">
                                        <div>
                                            <span className="text-gray-600 text-sm">{currentContent.invoiceInfo.customer}:</span>
                                            <p className="font-medium">{selectedInvoice.customerName}</p>
                                        </div>
                                        <div>
                                            <span className="text-gray-600 text-sm">{currentContent.invoiceInfo.date}:</span>
                                            <p className="font-medium">{selectedInvoice.date}</p>
                                        </div>
                                        <div>
                                            <span className="text-gray-600 text-sm">{currentContent.invoiceInfo.dueDate}:</span>
                                            <p className="font-medium">{selectedInvoice.dueDate}</p>
                                        </div>
                                        <div>
                                            <span className="text-gray-600 text-sm">{currentContent.invoiceInfo.paymentMethod}:</span>
                                            <p className="font-medium">{selectedInvoice.paymentMethod}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <h3 className="font-semibold text-gray-900 mb-3">ملخص المدفوعات</h3>
                                    <div className="space-y-2">
                                        <div>
                                            <span className="text-gray-600 text-sm">{currentContent.invoiceInfo.total}:</span>
                                            <p className="font-bold text-lg text-blue-600">
                                                {formatCurrency(selectedInvoice.total)} {currentContent.currency}
                                            </p>
                                        </div>
                                        <div>
                                            <span className="text-gray-600 text-sm">{currentContent.invoiceInfo.paidAmount}:</span>
                                            <p className="font-medium text-green-600">
                                                {formatCurrency(selectedInvoice.paidAmount)} {currentContent.currency}
                                            </p>
                                        </div>
                                        <div>
                                            <span className="text-gray-600 text-sm">{currentContent.invoiceInfo.remainingAmount}:</span>
                                            <p className="font-medium text-red-600">
                                                {formatCurrency(selectedInvoice.remainingAmount)} {currentContent.currency}
                                            </p>
                                        </div>
                                        <div>
                                            <span className="text-gray-600 text-sm">{currentContent.invoiceInfo.status}:</span>
                                            <span className={`inline-block px-2 py-1 rounded text-sm font-medium ${getStatusBgColor(selectedInvoice.status)} ${getStatusColor(selectedInvoice.status)}`}>
                                                {currentContent.status[selectedInvoice.status]}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Invoice Items */}
                            <div className="mb-6">
                                <h3 className="font-semibold text-gray-900 mb-3">{currentContent.invoiceInfo.items}</h3>
                                <div className="overflow-x-auto">
                                    <table className="w-full border border-gray-200 rounded-lg">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">المنتج</th>
                                                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">الكمية</th>
                                                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">السعر</th>
                                                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">الإجمالي</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-200">
                                            {selectedInvoice.items.map((item, index) => (
                                                <tr key={index}>
                                                    <td className="px-4 py-3 text-sm text-gray-900">{item.productName}</td>
                                                    <td className="px-4 py-3 text-sm text-gray-900">{item.quantity}</td>
                                                    <td className="px-4 py-3 text-sm text-gray-900">
                                                        {formatCurrency(item.price)} {currentContent.currency}
                                                    </td>
                                                    <td className="px-4 py-3 text-sm font-medium text-gray-900">
                                                        {formatCurrency(item.total)} {currentContent.currency}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            {/* Invoice Totals */}
                            <div className="bg-gray-50 p-4 rounded-lg mb-6">
                                <div className="flex justify-end">
                                    <div className="w-64 space-y-2">
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">{currentContent.invoiceInfo.subtotal}:</span>
                                            <span>{formatCurrency(selectedInvoice.subtotal)} {currentContent.currency}</span>
                                        </div>
                                        {selectedInvoice.discount > 0 && (
                                            <div className="flex justify-between text-red-600">
                                                <span>{currentContent.invoiceInfo.discount}:</span>
                                                <span>-{formatCurrency(selectedInvoice.discount)} {currentContent.currency}</span>
                                            </div>
                                        )}
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">{currentContent.invoiceInfo.tax}:</span>
                                            <span>{formatCurrency(selectedInvoice.tax)} {currentContent.currency}</span>
                                        </div>
                                        <div className="flex justify-between font-bold text-lg border-t pt-2">
                                            <span>{currentContent.invoiceInfo.total}:</span>
                                            <span>{formatCurrency(selectedInvoice.total)} {currentContent.currency}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Notes */}
                            {selectedInvoice.notes && (
                                <div className="mb-6">
                                    <h3 className="font-semibold text-gray-900 mb-2">{currentContent.invoiceInfo.notes}</h3>
                                    <p className="text-gray-700 bg-yellow-50 p-3 rounded-lg border border-yellow-200">
                                        {selectedInvoice.notes}
                                    </p>
                                </div>
                            )}

                            {/* Action Buttons */}
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                <button className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors text-sm">
                                    {currentContent.actions.edit}
                                </button>
                                <button className="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors text-sm">
                                    {currentContent.actions.payment}
                                </button>
                                <button className="bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors text-sm">
                                    {currentContent.actions.print}
                                </button>
                                <button className="bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors text-sm">
                                    {currentContent.actions.share}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Create Invoice Modal Placeholder */}
            {showCreateInvoice && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
                        <div className="p-6 text-center">
                            <h2 className="text-xl font-bold text-gray-900 mb-4">
                                إنشاء فاتورة جديدة
                            </h2>
                            <p className="text-gray-600 mb-6">
                                سيتم تطوير هذه الميزة في المرحلة القادمة
                            </p>
                            <button
                                onClick={() => setShowCreateInvoice(false)}
                                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                            >
                                حسناً
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default InvoicesPage;
