import React, { useState, useEffect } from 'react';
import BackButton from './BackButton';

const CustomerPage = () => {
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
    const [showAddCustomer, setShowAddCustomer] = useState(false);
    const [showCustomerDetails, setShowCustomerDetails] = useState(false);
    const [showEditCustomer, setShowEditCustomer] = useState(false);
    const [showAddTransaction, setShowAddTransaction] = useState(false);
    const [showTransactionHistory, setShowTransactionHistory] = useState(false);
    const [selectedCustomer, setSelectedCustomer] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterBalance, setFilterBalance] = useState('all'); // all, creditor, debtor

    // Mock data for customers
    const [customers, setCustomers] = useState([
        {
            id: 1,
            name: 'أحمد محمد العلي',
            phone: '07801234567',
            address: 'البصرة - شارع الكورنيش',
            balance: 150000,
            type: 'creditor', // creditor (دائن) or debtor (مدين)
            notes: 'عميل مميز منذ 2023',
            lastTransaction: '2025-08-05',
            totalInvoices: 25,
            totalDebt: 50000,
            paidAmount: 200000
        },
        {
            id: 2,
            name: 'فاطمة حسن الكريم',
            phone: '07709876543',
            address: 'البصرة - حي الحسين',
            balance: -75000,
            type: 'debtor',
            notes: 'دفع منتظم كل شهر',
            lastTransaction: '2025-08-03',
            totalInvoices: 12,
            totalDebt: 75000,
            paidAmount: 100000
        },
        {
            id: 3,
            name: 'محمد علي الربيعي',
            phone: '07701112233',
            address: 'البصرة - شارع بغداد',
            balance: 0,
            type: 'neutral',
            notes: '',
            lastTransaction: '2025-08-01',
            totalInvoices: 8,
            totalDebt: 0,
            paidAmount: 50000
        }
    ]);

    const [newCustomer, setNewCustomer] = useState({
        name: '',
        phone: '',
        address: '',
        notes: '',
        balance: 0
    });

    const [editCustomer, setEditCustomer] = useState({
        name: '',
        phone: '',
        address: '',
        notes: '',
        balance: 0
    });

    const [newTransaction, setNewTransaction] = useState({
        type: 'debt', // debt, installment, sale
        amount: 0,
        description: '',
        dueDate: '',
        // Installment specific fields
        totalAmount: 0,
        installmentCount: 1,
        installmentFrequency: 'monthly', // monthly, weekly, biweekly
        installmentAmount: 0,
        // Product specific fields
        selectedProductId: '',
        productName: '',
        productPrice: 0,
        productQuantity: 1,
        // Sale type (cash or installment)
        saleType: 'cash', // cash, installment
        // Advanced installment fields
        downPayment: 0,
        calculationMethod: 'by_amount', // by_amount, by_duration
        duration: 1,
        totalInstallments: 1,
        startDate: ''
    });

    // Mock transaction history
    const [transactionHistory, setTransactionHistory] = useState([
        {
            id: 1,
            customerId: 1,
            type: 'sale',
            amount: 150000,
            description: 'بيع جهاز كمبيوتر محمول',
            date: '2025-08-05',
            status: 'completed'
        },
        {
            id: 2,
            customerId: 1,
            type: 'payment',
            amount: 50000,
            description: 'دفعة من الدين',
            date: '2025-08-03',
            status: 'completed'
        },
        {
            id: 3,
            customerId: 2,
            type: 'installment',
            amount: 25000,
            description: 'قسط شهري',
            date: '2025-08-01',
            status: 'pending'
        }
    ]);

    // Mock products data
    const [products] = useState([
        {
            id: 1,
            name: 'جهاز كمبيوتر محمول Dell',
            price: 850000,
            category: 'أجهزة كمبيوتر',
            inStock: 5
        },
        {
            id: 2,
            name: 'طابعة ليزر HP',
            price: 300000,
            category: 'طابعات',
            inStock: 8
        },
        {
            id: 3,
            name: 'ماوس لاسلكي Logitech',
            price: 45000,
            category: 'إكسسوارات',
            inStock: 25
        },
        {
            id: 4,
            name: 'لوحة مفاتيح ميكانيكية',
            price: 120000,
            category: 'إكسسوارات',
            inStock: 15
        },
        {
            id: 5,
            name: 'شاشة LCD 24 بوصة',
            price: 450000,
            category: 'شاشات',
            inStock: 12
        }
    ]);

    const content = {
        ar: {
            title: 'إدارة العملاء',
            subtitle: 'قائمة العملاء وإدارة بياناتهم',
            search: 'البحث عن عميل...',
            addCustomer: 'إضافة عميل جديد',
            totalCustomers: 'إجمالي العملاء',
            creditors: 'الدائنين',
            debtors: 'المدينين',
            neutral: 'متوازن',
            filters: {
                all: 'الكل',
                creditor: 'دائن',
                debtor: 'مدين'
            },
            customerInfo: {
                name: 'الاسم',
                phone: 'الهاتف',
                address: 'العنوان',
                balance: 'الرصيد',
                notes: 'الملاحظات',
                lastTransaction: 'آخر معاملة',
                totalInvoices: 'إجمالي الفواتير',
                totalDebt: 'إجمالي الديون',
                paidAmount: 'المبلغ المدفوع'
            },
            actions: {
                view: 'عرض',
                edit: 'تعديل',
                delete: 'حذف',
                addTransaction: 'إضافة معاملة',
                viewHistory: 'عرض السجل'
            },
            transaction: {
                title: 'إضافة معاملة جديدة',
                type: 'نوع المعاملة',
                debt: 'دين',
                installment: 'قسط',
                sale: 'بيع منتج',
                amount: 'المبلغ',
                totalAmount: 'إجمالي المبلغ',
                description: 'الوصف',
                dueDate: 'تاريخ الاستحقاق',
                installmentCount: 'عدد الأقساط',
                installmentFrequency: 'تكرار القسط',
                installmentAmount: 'مبلغ القسط',
                selectProduct: 'اختر المنتج',
                productName: 'اسم المنتج',
                productPrice: 'سعر المنتج',
                productQuantity: 'الكمية',
                saleType: 'نوع البيع',
                availableQuantity: 'الكمية المتاحة',
                downPayment: 'المبلغ المقدم',
                calculationMethod: 'طريقة الحساب',
                byAmount: 'تحديد مبلغ القسط',
                byDuration: 'تحديد المدة',
                duration: 'المدة',
                totalInstallments: 'عدد الأقساط',
                startDate: 'تاريخ البداية',
                months: 'شهر',
                weeks: 'أسبوع',
                remainingAmount: 'المبلغ المتبقي للتقسيط',
                frequencies: {
                    monthly: 'شهري',
                    weekly: 'أسبوعي',
                    biweekly: 'كل أسبوعين'
                },
                saleTypes: {
                    cash: 'نقداً',
                    installment: 'بالأقساط'
                }
            },
            history: {
                title: 'سجل المعاملات',
                date: 'التاريخ',
                type: 'النوع',
                amount: 'المبلغ',
                description: 'الوصف',
                status: 'الحالة',
                types: {
                    sale: 'بيع',
                    payment: 'دفعة',
                    installment: 'قسط',
                    debt: 'دين'
                },
                statuses: {
                    completed: 'مكتمل',
                    pending: 'معلق',
                    overdue: 'متأخر'
                }
            },
            form: {
                title: 'بيانات العميل',
                namePlaceholder: 'اسم العميل',
                phonePlaceholder: 'رقم الهاتف',
                addressPlaceholder: 'العنوان',
                notesPlaceholder: 'ملاحظات إضافية',
                save: 'حفظ',
                cancel: 'إلغاء'
            },
            currency: 'د.ع',
            noCustomers: 'لا يوجد عملاء',
            addFirstCustomer: 'أضف أول عميل لك'
        },
        en: {
            title: 'Customer Management',
            subtitle: 'Customer list and data management',
            search: 'Search for customer...',
            addCustomer: 'Add New Customer',
            totalCustomers: 'Total Customers',
            creditors: 'Creditors',
            debtors: 'Debtors',
            neutral: 'Balanced',
            filters: {
                all: 'All',
                creditor: 'Creditor',
                debtor: 'Debtor'
            },
            customerInfo: {
                name: 'Name',
                phone: 'Phone',
                address: 'Address',
                balance: 'Balance',
                notes: 'Notes',
                lastTransaction: 'Last Transaction',
                totalInvoices: 'Total Invoices',
                totalDebt: 'Total Debt',
                paidAmount: 'Paid Amount'
            },
            actions: {
                view: 'View',
                edit: 'Edit',
                delete: 'Delete',
                addTransaction: 'Add Transaction',
                viewHistory: 'View History'
            },
            transaction: {
                title: 'Add New Transaction',
                type: 'Transaction Type',
                debt: 'Debt',
                installment: 'Installment',
                sale: 'Product Sale',
                amount: 'Amount',
                totalAmount: 'Total Amount',
                description: 'Description',
                dueDate: 'Due Date',
                installmentCount: 'Installment Count',
                installmentFrequency: 'Installment Frequency',
                installmentAmount: 'Installment Amount',
                selectProduct: 'Select Product',
                productName: 'Product Name',
                productPrice: 'Product Price',
                productQuantity: 'Quantity',
                saleType: 'Sale Type',
                availableQuantity: 'Available Quantity',
                downPayment: 'Down Payment',
                calculationMethod: 'Calculation Method',
                byAmount: 'Set Installment Amount',
                byDuration: 'Set Duration',
                duration: 'Duration',
                totalInstallments: 'Number of Installments',
                startDate: 'Start Date',
                months: 'months',
                weeks: 'weeks',
                remainingAmount: 'Remaining Amount for Installment',
                frequencies: {
                    monthly: 'Monthly',
                    weekly: 'Weekly',
                    biweekly: 'Biweekly'
                },
                saleTypes: {
                    cash: 'Cash',
                    installment: 'Installment'
                }
            },
            history: {
                title: 'Transaction History',
                date: 'Date',
                type: 'Type',
                amount: 'Amount',
                description: 'Description',
                status: 'Status',
                types: {
                    sale: 'Sale',
                    payment: 'Payment',
                    installment: 'Installment',
                    debt: 'Debt'
                },
                statuses: {
                    completed: 'Completed',
                    pending: 'Pending',
                    overdue: 'Overdue'
                }
            },
            form: {
                title: 'Customer Data',
                namePlaceholder: 'Customer Name',
                phonePlaceholder: 'Phone Number',
                addressPlaceholder: 'Address',
                notesPlaceholder: 'Additional Notes',
                save: 'Save',
                cancel: 'Cancel'
            },
            currency: 'IQD',
            noCustomers: 'No customers',
            addFirstCustomer: 'Add your first customer'
        }
    };

    const currentContent = isArabic ? content.ar : content.en;

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat(isArabic ? 'ar-IQ' : 'en-US').format(Math.abs(amount));
    };

    const getBalanceColor = (balance) => {
        if (balance > 0) return 'text-green-600';
        if (balance < 0) return 'text-red-600';
        return 'text-gray-600';
    };

    const getBalanceIcon = (balance) => {
        if (balance > 0) return '↑';
        if (balance < 0) return '↓';
        return '→';
    };

    const filteredCustomers = customers.filter(customer => {
        const matchesSearch = customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                             customer.phone.includes(searchTerm);

        if (filterBalance === 'all') return matchesSearch;
        if (filterBalance === 'creditor') return matchesSearch && customer.balance > 0;
        if (filterBalance === 'debtor') return matchesSearch && customer.balance < 0;

        return matchesSearch;
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewCustomer(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Add new customer logic here
        const customer = {
            ...newCustomer,
            id: customers.length + 1,
            type: newCustomer.balance > 0 ? 'creditor' : newCustomer.balance < 0 ? 'debtor' : 'neutral',
            lastTransaction: new Date().toISOString().split('T')[0],
            totalInvoices: 0,
            totalDebt: newCustomer.balance < 0 ? Math.abs(newCustomer.balance) : 0,
            paidAmount: 0
        };

        setCustomers([...customers, customer]);
        setNewCustomer({ name: '', phone: '', address: '', notes: '', balance: 0 });
        setShowAddCustomer(false);
    };

    const handleCustomerClick = (customer) => {
        setSelectedCustomer(customer);
        setShowCustomerDetails(true);
    };

    const handleEditCustomer = () => {
        setEditCustomer({
            name: selectedCustomer.name,
            phone: selectedCustomer.phone,
            address: selectedCustomer.address,
            notes: selectedCustomer.notes,
            balance: selectedCustomer.balance
        });
        setShowEditCustomer(true);
        setShowCustomerDetails(false);
    };

    const handleDeleteCustomer = () => {
        if (window.confirm(isArabic ? 'هل أنت متأكد من حذف هذا العميل؟' : 'Are you sure you want to delete this customer?')) {
            setCustomers(customers.filter(c => c.id !== selectedCustomer.id));
            setShowCustomerDetails(false);
            setSelectedCustomer(null);
        }
    };

    const handleAddTransaction = () => {
        setNewTransaction({
            type: 'debt',
            amount: 0,
            totalAmount: 0,
            description: '',
            dueDate: '',
            installmentCount: 2,
            installmentFrequency: 'monthly',
            installmentAmount: 0,
            selectedProductId: '',
            productName: '',
            productPrice: 0,
            quantity: 1,
            saleType: 'cash',
            downPayment: 0,
            calculationMethod: 'by_amount',
            duration: 1,
            totalInstallments: 1,
            startDate: ''
        });
        setShowAddTransaction(true);
        setShowCustomerDetails(false);
    };

    const handleViewHistory = () => {
        setShowTransactionHistory(true);
        setShowCustomerDetails(false);
    };

    const handleTransactionInputChange = (e) => {
        const { name, value } = e.target;
        setNewTransaction(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleEditInputChange = (e) => {
        const { name, value } = e.target;
        setEditCustomer(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleUpdateCustomer = (e) => {
        e.preventDefault();
        const updatedCustomers = customers.map(customer =>
            customer.id === selectedCustomer.id
                ? {
                    ...customer,
                    ...editCustomer,
                    type: editCustomer.balance > 0 ? 'creditor' : editCustomer.balance < 0 ? 'debtor' : 'neutral'
                }
                : customer
        );
        setCustomers(updatedCustomers);
        setSelectedCustomer({ ...selectedCustomer, ...editCustomer });
        setShowEditCustomer(false);
        setShowCustomerDetails(true);

        // Show success message
        alert(isArabic ? 'تم تحديث بيانات العميل بنجاح!' : 'Customer data updated successfully!');
    };

    // دوال حساب الأقساط المتقدمة
    const calculateInstallments = () => {
        const total = newTransaction.totalAmount || 0;
        const downPayment = newTransaction.downPayment || 0;
        const remainingAmount = total - downPayment;

        if (newTransaction.calculationMethod === 'by_amount') {
            const installmentAmount = parseFloat(newTransaction.installmentAmount) || 0;
            if (installmentAmount > 0) {
                const totalInstallments = Math.ceil(remainingAmount / installmentAmount);
                setNewTransaction(prev => ({
                    ...prev,
                    totalInstallments,
                    duration: newTransaction.installmentFrequency === 'monthly' ? totalInstallments :
                              newTransaction.installmentFrequency === 'weekly' ? Math.ceil(totalInstallments / 4) :
                              Math.ceil(totalInstallments / 2)
                }));
            }
        } else {
            const duration = parseInt(newTransaction.duration) || 1;
            let totalInstallments;

            if (newTransaction.installmentFrequency === 'monthly') {
                totalInstallments = duration;
            } else if (newTransaction.installmentFrequency === 'weekly') {
                totalInstallments = duration * 4;
            } else { // biweekly
                totalInstallments = duration * 2;
            }

            const installmentAmount = remainingAmount / totalInstallments;
            setNewTransaction(prev => ({
                ...prev,
                totalInstallments,
                installmentAmount: installmentAmount.toFixed(2)
            }));
        }
    };

    const handleInstallmentCalculation = (field, value) => {
        setNewTransaction(prev => {
            const updated = { ...prev, [field]: value };

            // للمبيعات نستخدم totalAmount، للأقساط العادية نستخدم amount
            const total = updated.totalAmount || updated.amount || 0;
            const downPayment = updated.downPayment || 0;
            const remainingAmount = total - downPayment;

            if (updated.calculationMethod === 'by_amount') {
                const installmentAmount = parseFloat(updated.installmentAmount) || 0;
                if (installmentAmount > 0) {
                    const totalInstallments = Math.ceil(remainingAmount / installmentAmount);
                    updated.totalInstallments = totalInstallments;
                    updated.duration = updated.installmentFrequency === 'monthly' ? totalInstallments :
                                     updated.installmentFrequency === 'weekly' ? Math.ceil(totalInstallments / 4) :
                                     Math.ceil(totalInstallments / 2);
                }
            } else {
                const duration = parseInt(updated.duration) || 1;
                let totalInstallments;

                if (updated.installmentFrequency === 'monthly') {
                    totalInstallments = duration;
                } else if (updated.installmentFrequency === 'weekly') {
                    totalInstallments = duration * 4;
                } else { // biweekly
                    totalInstallments = duration * 2;
                }

                const installmentAmount = remainingAmount / totalInstallments;
                updated.totalInstallments = totalInstallments;
                updated.installmentAmount = installmentAmount.toFixed(2);
            }

            return updated;
        });
    };    const handleSubmitTransaction = (e) => {
        e.preventDefault();

        // Create new transaction
        let transactionAmount = 0;
        let transactionDescription = '';

        if (newTransaction.type === 'debt') {
            transactionAmount = parseFloat(newTransaction.amount);
            transactionDescription = newTransaction.description;
        } else if (newTransaction.type === 'sale') {
            const product = products.find(p => p.id === parseInt(newTransaction.selectedProductId));
            transactionAmount = parseFloat(newTransaction.totalAmount || 0);
            transactionDescription = `بيع ${product?.name || 'منتج'} - كمية: ${newTransaction.quantity || 1}`;
            if (newTransaction.saleType === 'installment') {
                transactionDescription += ` - أقساط (${newTransaction.installmentCount} قسط ${newTransaction.installmentFrequency === 'monthly' ? 'شهري' : newTransaction.installmentFrequency === 'weekly' ? 'أسبوعي' : 'كل أسبوعين'})`;
            }
        } else if (newTransaction.type === 'installment') {
            transactionAmount = parseFloat(newTransaction.amount);
            transactionDescription = `قسط ${newTransaction.installmentFrequency === 'monthly' ? 'شهري' : newTransaction.installmentFrequency === 'weekly' ? 'أسبوعي' : 'كل أسبوعين'} - ${newTransaction.description}`;
        }

        const transaction = {
            id: transactionHistory.length + 1,
            customerId: selectedCustomer.id,
            type: newTransaction.type,
            amount: transactionAmount,
            description: transactionDescription,
            date: new Date().toISOString().split('T')[0],
            status: 'completed',
            // Additional fields for installments and sales
            ...(newTransaction.type === 'installment' && {
                installmentInfo: {
                    totalAmount: parseFloat(newTransaction.amount),
                    downPayment: parseFloat(newTransaction.downPayment || 0),
                    remainingAmount: parseFloat(newTransaction.amount) - parseFloat(newTransaction.downPayment || 0),
                    installmentAmount: parseFloat(newTransaction.installmentAmount),
                    totalInstallments: parseInt(newTransaction.totalInstallments),
                    frequency: newTransaction.installmentFrequency,
                    calculationMethod: newTransaction.calculationMethod,
                    duration: parseInt(newTransaction.duration),
                    startDate: newTransaction.startDate
                }
            }),
            ...(newTransaction.type === 'sale' && {
                productInfo: {
                    productId: parseInt(newTransaction.selectedProductId),
                    productName: products.find(p => p.id === parseInt(newTransaction.selectedProductId))?.name,
                    quantity: parseInt(newTransaction.quantity || 1),
                    unitPrice: products.find(p => p.id === parseInt(newTransaction.selectedProductId))?.price,
                    saleType: newTransaction.saleType
                },
                ...(newTransaction.saleType === 'installment' && {
                    installmentInfo: {
                        totalAmount: parseFloat(newTransaction.totalAmount),
                        downPayment: parseFloat(newTransaction.downPayment || 0),
                        remainingAmount: parseFloat(newTransaction.totalAmount) - parseFloat(newTransaction.downPayment || 0),
                        installmentAmount: parseFloat(newTransaction.installmentAmount),
                        totalInstallments: parseInt(newTransaction.totalInstallments),
                        frequency: newTransaction.installmentFrequency,
                        calculationMethod: newTransaction.calculationMethod,
                        duration: parseInt(newTransaction.duration),
                        startDate: newTransaction.startDate
                    }
                })
            })
        };

        // Update transaction history
        setTransactionHistory([...transactionHistory, transaction]);

        // Update customer balance based on transaction type
        let balanceChange = 0;
        if (newTransaction.type === 'debt' || newTransaction.type === 'sale' || newTransaction.type === 'installment') {
            balanceChange = -transactionAmount; // These are debts/money owed
        }

        // Update customer
        const updatedCustomers = customers.map(customer =>
            customer.id === selectedCustomer.id
                ? {
                    ...customer,
                    balance: customer.balance + balanceChange,
                    totalInvoices: customer.totalInvoices + 1,
                    lastTransaction: new Date().toISOString().split('T')[0],
                    totalDebt: Math.max(0, customer.balance + balanceChange < 0 ? Math.abs(customer.balance + balanceChange) : customer.totalDebt),
                    type: (customer.balance + balanceChange) > 0 ? 'creditor' : (customer.balance + balanceChange) < 0 ? 'debtor' : 'neutral'
                }
                : customer
        );

        setCustomers(updatedCustomers);
        setSelectedCustomer(prev => ({
            ...prev,
            balance: prev.balance + balanceChange,
            totalInvoices: prev.totalInvoices + 1,
            lastTransaction: new Date().toISOString().split('T')[0],
            totalDebt: Math.max(0, prev.balance + balanceChange < 0 ? Math.abs(prev.balance + balanceChange) : prev.totalDebt),
            type: (prev.balance + balanceChange) > 0 ? 'creditor' : (prev.balance + balanceChange) < 0 ? 'debtor' : 'neutral'
        }));

        // Reset form and close modal
        setNewTransaction({
            type: 'debt',
            amount: 0,
            totalAmount: 0,
            description: '',
            dueDate: '',
            installmentCount: 2,
            installmentFrequency: 'monthly',
            installmentAmount: 0,
            selectedProductId: '',
            productName: '',
            productPrice: 0,
            quantity: 1,
            saleType: 'cash',
            downPayment: 0,
            calculationMethod: 'by_amount',
            duration: 1,
            totalInstallments: 1,
            startDate: ''
        });

        setShowAddTransaction(false);
        setShowCustomerDetails(true);

        // Show success message
        alert(isArabic ? 'تم إضافة المعاملة بنجاح!' : 'Transaction added successfully!');
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
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                                    </svg>
                                </div>
                                <div className={`${isArabic ? 'mr-3' : 'ml-3'} flex-1 min-w-0`}>
                                    <p className="text-blue-600 text-xs font-medium truncate">
                                        {currentContent.totalCustomers}
                                    </p>
                                    <p className="text-blue-900 text-lg font-bold">
                                        {customers.length}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-green-50 p-3 rounded-lg border border-green-100">
                            <div className="flex items-center">
                                <div className="p-2 bg-green-500 rounded-lg">
                                    <span className="text-white text-sm">↑</span>
                                </div>
                                <div className={`${isArabic ? 'mr-3' : 'ml-3'} flex-1 min-w-0`}>
                                    <p className="text-green-600 text-xs font-medium truncate">
                                        {currentContent.creditors}
                                    </p>
                                    <p className="text-green-900 text-lg font-bold">
                                        {customers.filter(c => c.balance > 0).length}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-red-50 p-3 rounded-lg border border-red-100">
                            <div className="flex items-center">
                                <div className="p-2 bg-red-500 rounded-lg">
                                    <span className="text-white text-sm">↓</span>
                                </div>
                                <div className={`${isArabic ? 'mr-3' : 'ml-3'} flex-1 min-w-0`}>
                                    <p className="text-red-600 text-xs font-medium truncate">
                                        {currentContent.debtors}
                                    </p>
                                    <p className="text-red-900 text-lg font-bold">
                                        {customers.filter(c => c.balance < 0).length}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-gray-50 p-3 rounded-lg border border-gray-100">
                            <div className="flex items-center">
                                <div className="p-2 bg-gray-500 rounded-lg">
                                    <span className="text-white text-sm">→</span>
                                </div>
                                <div className={`${isArabic ? 'mr-3' : 'ml-3'} flex-1 min-w-0`}>
                                    <p className="text-gray-600 text-xs font-medium truncate">
                                        {currentContent.neutral}
                                    </p>
                                    <p className="text-gray-900 text-lg font-bold">
                                        {customers.filter(c => c.balance === 0).length}
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
                            value={filterBalance}
                            onChange={(e) => setFilterBalance(e.target.value)}
                            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                            <option value="all">{currentContent.filters.all}</option>
                            <option value="creditor">{currentContent.filters.creditor}</option>
                            <option value="debtor">{currentContent.filters.debtor}</option>
                        </select>

                        <button
                            onClick={() => setShowAddCustomer(true)}
                            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center"
                        >
                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                            </svg>
                            {currentContent.addCustomer}
                        </button>
                    </div>
                </div>
            </div>

            {/* Customer List */}
            <div className="p-4">
                {filteredCustomers.length === 0 ? (
                    <div className="text-center py-12">
                        <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                        </svg>
                        <h3 className="mt-2 text-sm font-medium text-gray-900">{currentContent.noCustomers}</h3>
                        <p className="mt-1 text-sm text-gray-500">{currentContent.addFirstCustomer}</p>
                        <div className="mt-6">
                            <button
                                onClick={() => setShowAddCustomer(true)}
                                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                            >
                                {currentContent.addCustomer}
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="space-y-3">
                        {filteredCustomers.map((customer) => (
                            <div
                                key={customer.id}
                                onClick={() => handleCustomerClick(customer)}
                                className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow cursor-pointer"
                            >
                                <div className="flex items-center justify-between">
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center">
                                            <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold ${customer.balance > 0 ? 'bg-green-500' : customer.balance < 0 ? 'bg-red-500' : 'bg-gray-500'}`}>
                                                {getBalanceIcon(customer.balance)}
                                            </div>
                                            <div className={`${isArabic ? 'mr-3' : 'ml-3'} flex-1 min-w-0`}>
                                                <h3 className="text-lg font-semibold text-gray-900 truncate">
                                                    {customer.name}
                                                </h3>
                                                <p className="text-sm text-gray-500 truncate">
                                                    {customer.phone}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="mt-2 grid grid-cols-2 gap-4 text-sm">
                                            <div>
                                                <span className="text-gray-500">{currentContent.customerInfo.balance}:</span>
                                                <span className={`font-semibold ${getBalanceColor(customer.balance)} mr-1`}>
                                                    {formatCurrency(customer.balance)} {currentContent.currency}
                                                </span>
                                            </div>
                                            <div>
                                                <span className="text-gray-500">{currentContent.customerInfo.totalInvoices}:</span>
                                                <span className="font-semibold text-gray-900 mr-1">
                                                    {customer.totalInvoices}
                                                </span>
                                            </div>
                                        </div>
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

            {/* Add Customer Modal */}
            {showAddCustomer && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-lg shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto">
                        <div className="p-6">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-xl font-bold text-gray-900">
                                    {currentContent.form.title}
                                </h2>
                                <button
                                    onClick={() => setShowAddCustomer(false)}
                                    className="text-gray-400 hover:text-gray-600"
                                >
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        {currentContent.customerInfo.name} *
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={newCustomer.name}
                                        onChange={handleInputChange}
                                        placeholder={currentContent.form.namePlaceholder}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        {currentContent.customerInfo.phone} *
                                    </label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={newCustomer.phone}
                                        onChange={handleInputChange}
                                        placeholder={currentContent.form.phonePlaceholder}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        {currentContent.customerInfo.address}
                                    </label>
                                    <input
                                        type="text"
                                        name="address"
                                        value={newCustomer.address}
                                        onChange={handleInputChange}
                                        placeholder={currentContent.form.addressPlaceholder}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        {currentContent.customerInfo.balance}
                                    </label>
                                    <input
                                        type="number"
                                        name="balance"
                                        value={newCustomer.balance}
                                        onChange={handleInputChange}
                                        placeholder="0"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        {currentContent.customerInfo.notes}
                                    </label>
                                    <textarea
                                        name="notes"
                                        value={newCustomer.notes}
                                        onChange={handleInputChange}
                                        placeholder={currentContent.form.notesPlaceholder}
                                        rows="3"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                </div>

                                <div className="flex gap-3 pt-4">
                                    <button
                                        type="submit"
                                        className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
                                    >
                                        {currentContent.form.save}
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setShowAddCustomer(false)}
                                        className="flex-1 bg-gray-200 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors"
                                    >
                                        {currentContent.form.cancel}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}

            {/* Customer Details Modal */}
            {showCustomerDetails && selectedCustomer && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                        <div className="p-6">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-xl font-bold text-gray-900">
                                    {selectedCustomer.name}
                                </h2>
                                <button
                                    onClick={() => setShowCustomerDetails(false)}
                                    className="text-gray-400 hover:text-gray-600"
                                >
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>

                            {/* Customer Info */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <h3 className="font-semibold text-gray-900 mb-3">المعلومات الأساسية</h3>
                                    <div className="space-y-2">
                                        <div>
                                            <span className="text-gray-600 text-sm">{currentContent.customerInfo.phone}:</span>
                                            <p className="font-medium">{selectedCustomer.phone}</p>
                                        </div>
                                        <div>
                                            <span className="text-gray-600 text-sm">{currentContent.customerInfo.address}:</span>
                                            <p className="font-medium">{selectedCustomer.address}</p>
                                        </div>
                                        <div>
                                            <span className="text-gray-600 text-sm">{currentContent.customerInfo.lastTransaction}:</span>
                                            <p className="font-medium">{selectedCustomer.lastTransaction}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <h3 className="font-semibold text-gray-900 mb-3">الملخص المالي</h3>
                                    <div className="space-y-2">
                                        <div>
                                            <span className="text-gray-600 text-sm">{currentContent.customerInfo.balance}:</span>
                                            <p className={`font-bold text-lg ${getBalanceColor(selectedCustomer.balance)}`}>
                                                {formatCurrency(selectedCustomer.balance)} {currentContent.currency}
                                            </p>
                                        </div>
                                        <div>
                                            <span className="text-gray-600 text-sm">{currentContent.customerInfo.totalInvoices}:</span>
                                            <p className="font-medium">{selectedCustomer.totalInvoices}</p>
                                        </div>
                                        <div>
                                            <span className="text-gray-600 text-sm">{currentContent.customerInfo.paidAmount}:</span>
                                            <p className="font-medium">{formatCurrency(selectedCustomer.paidAmount)} {currentContent.currency}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Notes */}
                            {selectedCustomer.notes && (
                                <div className="mb-6">
                                    <h3 className="font-semibold text-gray-900 mb-2">{currentContent.customerInfo.notes}</h3>
                                    <p className="text-gray-700 bg-yellow-50 p-3 rounded-lg border border-yellow-200">
                                        {selectedCustomer.notes}
                                    </p>
                                </div>
                            )}

                            {/* Action Buttons */}
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                <button
                                    onClick={handleEditCustomer}
                                    className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors text-sm"
                                >
                                    {currentContent.actions.edit}
                                </button>
                                <button
                                    onClick={handleAddTransaction}
                                    className="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors text-sm"
                                >
                                    {currentContent.actions.addTransaction}
                                </button>
                                <button
                                    onClick={handleViewHistory}
                                    className="bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors text-sm"
                                >
                                    {currentContent.actions.viewHistory}
                                </button>
                                <button
                                    onClick={handleDeleteCustomer}
                                    className="bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-colors text-sm"
                                >
                                    {currentContent.actions.delete}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Edit Customer Modal */}
            {showEditCustomer && selectedCustomer && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
                        <div className="p-6">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-xl font-bold text-gray-900">
                                    تعديل بيانات العميل
                                </h2>
                                <button
                                    onClick={() => setShowEditCustomer(false)}
                                    className="text-gray-400 hover:text-gray-600"
                                >
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>

                            <form onSubmit={handleUpdateCustomer} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        {currentContent.customerInfo.name}
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={editCustomer.name}
                                        onChange={handleEditInputChange}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        {currentContent.customerInfo.phone}
                                    </label>
                                    <input
                                        type="text"
                                        name="phone"
                                        value={editCustomer.phone}
                                        onChange={handleEditInputChange}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        {currentContent.customerInfo.address}
                                    </label>
                                    <input
                                        type="text"
                                        name="address"
                                        value={editCustomer.address}
                                        onChange={handleEditInputChange}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        {currentContent.customerInfo.balance}
                                    </label>
                                    <input
                                        type="number"
                                        name="balance"
                                        value={editCustomer.balance}
                                        onChange={handleEditInputChange}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        {currentContent.customerInfo.notes}
                                    </label>
                                    <textarea
                                        name="notes"
                                        value={editCustomer.notes}
                                        onChange={handleEditInputChange}
                                        rows="3"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                </div>

                                <div className="flex gap-3 pt-4">
                                    <button
                                        type="submit"
                                        className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
                                    >
                                        {currentContent.form.save}
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setShowEditCustomer(false)}
                                        className="flex-1 bg-gray-600 text-white py-2 px-4 rounded-lg hover:bg-gray-700 transition-colors"
                                    >
                                        {currentContent.form.cancel}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}

            {/* Add Transaction Modal */}
            {showAddTransaction && selectedCustomer && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                        <div className="p-6">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-xl font-bold text-gray-900">
                                    {currentContent.transaction.title}
                                </h2>
                                <button
                                    onClick={() => setShowAddTransaction(false)}
                                    className="text-gray-400 hover:text-gray-600"
                                >
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>

                            <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                                <p className="text-blue-800 text-sm">
                                    <span className="font-medium">العميل:</span> <span className="font-semibold">{selectedCustomer.name}</span>
                                    <span className="mx-2">|</span>
                                    <span className="font-medium">الرصيد الحالي:</span>
                                    <span className={`font-semibold ${getBalanceColor(selectedCustomer.balance)}`}>
                                        {formatCurrency(selectedCustomer.balance)} {currentContent.currency}
                                    </span>
                                </p>
                            </div>

                            <form onSubmit={handleSubmitTransaction} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        {currentContent.transaction.type}
                                    </label>
                                    <select
                                        name="type"
                                        value={newTransaction.type}
                                        onChange={handleTransactionInputChange}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    >
                                        <option value="debt">{currentContent.transaction.debt}</option>
                                        <option value="installment">{currentContent.transaction.installment}</option>
                                        <option value="sale">{currentContent.transaction.sale}</option>
                                    </select>
                                </div>

                                {newTransaction.type === 'debt' && (
                                    <>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                {currentContent.transaction.amount}
                                            </label>
                                            <input
                                                type="number"
                                                name="amount"
                                                value={newTransaction.amount}
                                                onChange={handleTransactionInputChange}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                {currentContent.transaction.description}
                                            </label>
                                            <input
                                                type="text"
                                                name="description"
                                                value={newTransaction.description}
                                                onChange={handleTransactionInputChange}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                placeholder="وصف الدين..."
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                {currentContent.transaction.dueDate}
                                            </label>
                                            <input
                                                type="date"
                                                name="dueDate"
                                                value={newTransaction.dueDate}
                                                onChange={handleTransactionInputChange}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            />
                                        </div>
                                    </>
                                )}

                                {newTransaction.type === 'installment' && (
                                    <>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                {currentContent.transaction.totalAmount}
                                            </label>
                                            <input
                                                type="number"
                                                name="amount"
                                                value={newTransaction.amount}
                                                onChange={(e) => handleInstallmentCalculation('amount', parseFloat(e.target.value) || 0)}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                required
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                {currentContent.transaction.downPayment}
                                            </label>
                                            <input
                                                type="number"
                                                min="0"
                                                max={newTransaction.amount || 0}
                                                value={newTransaction.downPayment || 0}
                                                onChange={(e) => handleInstallmentCalculation('downPayment', parseFloat(e.target.value) || 0)}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                placeholder="0"
                                            />
                                        </div>

                                        <div className="bg-yellow-50 p-3 rounded-lg">
                                            <p className="text-sm text-yellow-700">
                                                <span className="font-semibold">{currentContent.transaction.remainingAmount}:</span> {((newTransaction.amount || 0) - (newTransaction.downPayment || 0)).toLocaleString()} {currentContent.currency}
                                            </p>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                {currentContent.transaction.calculationMethod}
                                            </label>
                                            <select
                                                value={newTransaction.calculationMethod || 'by_amount'}
                                                onChange={(e) => handleInstallmentCalculation('calculationMethod', e.target.value)}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            >
                                                <option value="by_amount">{currentContent.transaction.byAmount}</option>
                                                <option value="by_duration">{currentContent.transaction.byDuration}</option>
                                            </select>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                {currentContent.transaction.installmentFrequency}
                                            </label>
                                            <select
                                                value={newTransaction.installmentFrequency || 'monthly'}
                                                onChange={(e) => handleInstallmentCalculation('installmentFrequency', e.target.value)}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            >
                                                <option value="monthly">{currentContent.transaction.frequencies.monthly}</option>
                                                <option value="weekly">{currentContent.transaction.frequencies.weekly}</option>
                                                <option value="biweekly">{currentContent.transaction.frequencies.biweekly}</option>
                                            </select>
                                        </div>

                                        {newTransaction.calculationMethod === 'by_amount' ? (
                                            <>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                                        {currentContent.transaction.installmentAmount}
                                                    </label>
                                                    <input
                                                        type="number"
                                                        min="1"
                                                        value={newTransaction.installmentAmount || 0}
                                                        onChange={(e) => handleInstallmentCalculation('installmentAmount', parseFloat(e.target.value) || 0)}
                                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                        placeholder="مبلغ القسط"
                                                    />
                                                </div>
                                                <div className="bg-blue-50 p-3 rounded-lg">
                                                    <p className="text-sm text-blue-700">
                                                        <span className="font-semibold">{currentContent.transaction.totalInstallments}:</span> {newTransaction.totalInstallments || 0}
                                                    </p>
                                                    <p className="text-sm text-blue-700">
                                                        <span className="font-semibold">{currentContent.transaction.duration}:</span> {newTransaction.duration || 0} {newTransaction.installmentFrequency === 'monthly' ? currentContent.transaction.months : currentContent.transaction.weeks}
                                                    </p>
                                                </div>
                                            </>
                                        ) : (
                                            <>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                                        {currentContent.transaction.duration} ({newTransaction.installmentFrequency === 'monthly' ? currentContent.transaction.months : currentContent.transaction.weeks})
                                                    </label>
                                                    <input
                                                        type="number"
                                                        min="1"
                                                        max="60"
                                                        value={newTransaction.duration || 1}
                                                        onChange={(e) => handleInstallmentCalculation('duration', parseInt(e.target.value) || 1)}
                                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                    />
                                                </div>
                                                <div className="bg-blue-50 p-3 rounded-lg">
                                                    <p className="text-sm text-blue-700">
                                                        <span className="font-semibold">{currentContent.transaction.totalInstallments}:</span> {newTransaction.totalInstallments || 0}
                                                    </p>
                                                    <p className="text-sm text-blue-700">
                                                        <span className="font-semibold">{currentContent.transaction.installmentAmount}:</span> {newTransaction.installmentAmount || 0} {currentContent.currency}
                                                    </p>
                                                </div>
                                            </>
                                        )}

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                {currentContent.transaction.startDate}
                                            </label>
                                            <input
                                                type="date"
                                                value={newTransaction.startDate || ''}
                                                onChange={(e) => setNewTransaction(prev => ({ ...prev, startDate: e.target.value }))}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                {currentContent.transaction.description}
                                            </label>
                                            <input
                                                type="text"
                                                name="description"
                                                value={newTransaction.description}
                                                onChange={handleTransactionInputChange}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                placeholder="وصف القسط..."
                                                required
                                            />
                                        </div>
                                    </>
                                )}

                                {newTransaction.type === 'sale' && (
                                    <>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                {currentContent.transaction.selectProduct}
                                            </label>
                                            <select
                                                name="selectedProductId"
                                                value={newTransaction.selectedProductId || ''}
                                                onChange={(e) => {
                                                    const productId = e.target.value;
                                                    const product = products.find(p => p.id === parseInt(productId));
                                                    setNewTransaction(prev => ({
                                                        ...prev,
                                                        selectedProductId: productId,
                                                        productName: product ? product.name : '',
                                                        productPrice: product ? product.price : 0,
                                                        totalAmount: product ? (product.price * (prev.quantity || 1)) : 0
                                                    }));
                                                }}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                required
                                            >
                                                <option value="">{currentContent.transaction.selectProduct}</option>
                                                {products.map(product => (
                                                    <option key={product.id} value={product.id}>
                                                        {product.name} - ${product.price} ({currentContent.transaction.availableQuantity}: {product.stock})
                                                    </option>
                                                ))}
                                            </select>
                                        </div>

                                        {newTransaction.selectedProductId && (
                                            <>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                                        {currentContent.transaction.productQuantity}
                                                    </label>
                                                    <input
                                                        type="number"
                                                        name="quantity"
                                                        min="1"
                                                        max={products.find(p => p.id === parseInt(newTransaction.selectedProductId))?.stock || 1}
                                                        value={newTransaction.quantity || 1}
                                                        onChange={(e) => {
                                                            const quantity = parseInt(e.target.value) || 1;
                                                            const product = products.find(p => p.id === parseInt(newTransaction.selectedProductId));
                                                            setNewTransaction(prev => ({
                                                                ...prev,
                                                                quantity,
                                                                totalAmount: product ? (product.price * quantity) : 0
                                                            }));
                                                        }}
                                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                        required
                                                    />
                                                </div>

                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                                        {currentContent.transaction.saleType}
                                                    </label>
                                                    <select
                                                        name="saleType"
                                                        value={newTransaction.saleType || 'cash'}
                                                        onChange={handleTransactionInputChange}
                                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                    >
                                                        <option value="cash">{currentContent.transaction.saleTypes.cash}</option>
                                                        <option value="installment">{currentContent.transaction.saleTypes.installment}</option>
                                                    </select>
                                                </div>

                                                {newTransaction.saleType === 'installment' && (
                                                    <>
                                                        <div>
                                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                                {currentContent.transaction.downPayment}
                                                            </label>
                                                            <input
                                                                type="number"
                                                                min="0"
                                                                max={newTransaction.totalAmount || 0}
                                                                value={newTransaction.downPayment || 0}
                                                                onChange={(e) => handleInstallmentCalculation('downPayment', parseFloat(e.target.value) || 0)}
                                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                                placeholder="0"
                                                            />
                                                        </div>

                                                        <div className="bg-yellow-50 p-3 rounded-lg">
                                                            <p className="text-sm text-yellow-700">
                                                                <span className="font-semibold">{currentContent.transaction.remainingAmount}:</span> {((newTransaction.totalAmount || 0) - (newTransaction.downPayment || 0)).toLocaleString()} {currentContent.currency}
                                                            </p>
                                                        </div>

                                                        <div>
                                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                                {currentContent.transaction.calculationMethod}
                                                            </label>
                                                            <select
                                                                value={newTransaction.calculationMethod || 'by_amount'}
                                                                onChange={(e) => handleInstallmentCalculation('calculationMethod', e.target.value)}
                                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                            >
                                                                <option value="by_amount">{currentContent.transaction.byAmount}</option>
                                                                <option value="by_duration">{currentContent.transaction.byDuration}</option>
                                                            </select>
                                                        </div>

                                                        <div>
                                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                                {currentContent.transaction.installmentFrequency}
                                                            </label>
                                                            <select
                                                                value={newTransaction.installmentFrequency || 'monthly'}
                                                                onChange={(e) => handleInstallmentCalculation('installmentFrequency', e.target.value)}
                                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                            >
                                                                <option value="monthly">{currentContent.transaction.frequencies.monthly}</option>
                                                                <option value="weekly">{currentContent.transaction.frequencies.weekly}</option>
                                                                <option value="biweekly">{currentContent.transaction.frequencies.biweekly}</option>
                                                            </select>
                                                        </div>

                                                        {newTransaction.calculationMethod === 'by_amount' ? (
                                                            <>
                                                                <div>
                                                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                                                        {currentContent.transaction.installmentAmount}
                                                                    </label>
                                                                    <input
                                                                        type="number"
                                                                        min="1"
                                                                        value={newTransaction.installmentAmount || 0}
                                                                        onChange={(e) => handleInstallmentCalculation('installmentAmount', parseFloat(e.target.value) || 0)}
                                                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                                        placeholder="مبلغ القسط"
                                                                    />
                                                                </div>
                                                                <div className="bg-blue-50 p-3 rounded-lg">
                                                                    <p className="text-sm text-blue-700">
                                                                        <span className="font-semibold">{currentContent.transaction.totalInstallments}:</span> {newTransaction.totalInstallments || 0}
                                                                    </p>
                                                                    <p className="text-sm text-blue-700">
                                                                        <span className="font-semibold">{currentContent.transaction.duration}:</span> {newTransaction.duration || 0} {newTransaction.installmentFrequency === 'monthly' ? currentContent.transaction.months : currentContent.transaction.weeks}
                                                                    </p>
                                                                </div>
                                                            </>
                                                        ) : (
                                                            <>
                                                                <div>
                                                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                                                        {currentContent.transaction.duration} ({newTransaction.installmentFrequency === 'monthly' ? currentContent.transaction.months : currentContent.transaction.weeks})
                                                                    </label>
                                                                    <input
                                                                        type="number"
                                                                        min="1"
                                                                        max="60"
                                                                        value={newTransaction.duration || 1}
                                                                        onChange={(e) => handleInstallmentCalculation('duration', parseInt(e.target.value) || 1)}
                                                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                                    />
                                                                </div>
                                                                <div className="bg-blue-50 p-3 rounded-lg">
                                                                    <p className="text-sm text-blue-700">
                                                                        <span className="font-semibold">{currentContent.transaction.totalInstallments}:</span> {newTransaction.totalInstallments || 0}
                                                                    </p>
                                                                    <p className="text-sm text-blue-700">
                                                                        <span className="font-semibold">{currentContent.transaction.installmentAmount}:</span> {newTransaction.installmentAmount || 0} {currentContent.currency}
                                                                    </p>
                                                                </div>
                                                            </>
                                                        )}

                                                        <div>
                                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                                {currentContent.transaction.startDate}
                                                            </label>
                                                            <input
                                                                type="date"
                                                                value={newTransaction.startDate || ''}
                                                                onChange={(e) => setNewTransaction(prev => ({ ...prev, startDate: e.target.value }))}
                                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                            />
                                                        </div>
                                                    </>
                                                )}

                                                <div className="bg-gray-50 p-3 rounded-lg">
                                                    <p className="text-sm text-gray-700">
                                                        <span className="font-semibold">{currentContent.transaction.totalAmount}:</span> {newTransaction.totalAmount || 0} {currentContent.currency}
                                                    </p>
                                                </div>
                                            </>
                                        )}
                                    </>
                                )}

                                <div className="flex gap-3 pt-4">
                                    <button
                                        type="submit"
                                        className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors"
                                    >
                                        {currentContent.form.save}
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setShowAddTransaction(false)}
                                        className="flex-1 bg-gray-600 text-white py-2 px-4 rounded-lg hover:bg-gray-700 transition-colors"
                                    >
                                        {currentContent.form.cancel}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}

            {/* Transaction History Modal */}
            {showTransactionHistory && selectedCustomer && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
                        <div className="p-6">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-xl font-bold text-gray-900">
                                    {currentContent.history.title} - {selectedCustomer.name}
                                </h2>
                                <button
                                    onClick={() => setShowTransactionHistory(false)}
                                    className="text-gray-400 hover:text-gray-600"
                                >
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>

                            {/* Customer Summary */}
                            <div className="bg-gray-50 p-4 rounded-lg mb-6">
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div>
                                        <span className="text-gray-600 text-sm">{currentContent.customerInfo.balance}:</span>
                                        <p className={`font-bold text-lg ${getBalanceColor(selectedCustomer.balance)}`}>
                                            {formatCurrency(selectedCustomer.balance)} {currentContent.currency}
                                        </p>
                                    </div>
                                    <div>
                                        <span className="text-gray-600 text-sm">{currentContent.customerInfo.totalInvoices}:</span>
                                        <p className="font-medium">{selectedCustomer.totalInvoices}</p>
                                    </div>
                                    <div>
                                        <span className="text-gray-600 text-sm">{currentContent.customerInfo.lastTransaction}:</span>
                                        <p className="font-medium">{selectedCustomer.lastTransaction}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Transaction Table */}
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                {currentContent.history.date}
                                            </th>
                                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                {currentContent.history.type}
                                            </th>
                                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                {currentContent.history.description}
                                            </th>
                                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                {currentContent.history.amount}
                                            </th>
                                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                {currentContent.history.status}
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {transactionHistory
                                            .filter(transaction => transaction.customerId === selectedCustomer.id)
                                            .map((transaction) => (
                                            <tr key={transaction.id} className="hover:bg-gray-50">
                                                <td className="px-4 py-3 text-sm text-gray-900">
                                                    {transaction.date}
                                                </td>
                                                <td className="px-4 py-3 text-sm">
                                                    <span className={`px-2 py-1 rounded-full text-xs ${
                                                        transaction.type === 'sale' ? 'bg-green-100 text-green-800' :
                                                        transaction.type === 'payment' ? 'bg-blue-100 text-blue-800' :
                                                        transaction.type === 'installment' ? 'bg-purple-100 text-purple-800' :
                                                        'bg-red-100 text-red-800'
                                                    }`}>
                                                        {currentContent.history.types[transaction.type]}
                                                    </span>
                                                </td>
                                                <td className="px-4 py-3 text-sm text-gray-900">
                                                    {transaction.description}
                                                </td>
                                                <td className="px-4 py-3 text-sm font-medium text-gray-900">
                                                    {formatCurrency(transaction.amount)} {currentContent.currency}
                                                </td>
                                                <td className="px-4 py-3 text-sm">
                                                    <span className={`px-2 py-1 rounded-full text-xs ${
                                                        transaction.status === 'completed' ? 'bg-green-100 text-green-800' :
                                                        transaction.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                                        'bg-red-100 text-red-800'
                                                    }`}>
                                                        {currentContent.history.statuses[transaction.status]}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            {transactionHistory.filter(t => t.customerId === selectedCustomer.id).length === 0 && (
                                <div className="text-center py-8">
                                    <p className="text-gray-500">لا توجد معاملات لهذا العميل</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CustomerPage;
