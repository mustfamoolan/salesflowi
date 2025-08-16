import React, { useState, useEffect } from 'react';
import BackButton from './BackButton';

const InstallmentsPage = () => {
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
    const [showInstallmentModal, setShowInstallmentModal] = useState(false);
    const [selectedInstallment, setSelectedInstallment] = useState(null);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('all'); // all, pending, paid, overdue

    // Mock data for installments
    const [installments, setInstallments] = useState([
        {
            id: 1,
            customerName: 'أحمد محمد العلي',
            customerId: 1,
            totalAmount: 3000000,
            paidAmount: 1000000,
            remainingAmount: 2000000,
            installmentAmount: 500000,
            frequency: 'monthly', // monthly, weekly, biweekly
            totalInstallments: 6,
            paidInstallments: 2,
            remainingInstallments: 4,
            startDate: '2025-06-01',
            nextDueDate: '2025-08-01',
            status: 'active',
            notes: 'قسط شهري 500 ألف دينار',
            invoiceNumber: 'INV-2025-001',
            installmentSchedule: [
                { id: 1, dueDate: '2025-06-01', amount: 500000, paidAmount: 500000, status: 'paid', paidDate: '2025-06-01', notes: 'دفع في الموعد' },
                { id: 2, dueDate: '2025-07-01', amount: 500000, paidAmount: 500000, status: 'paid', paidDate: '2025-07-01', notes: 'دفع في الموعد' },
                { id: 3, dueDate: '2025-08-01', amount: 500000, paidAmount: 0, status: 'pending', paidDate: null, notes: '' },
                { id: 4, dueDate: '2025-09-01', amount: 500000, paidAmount: 0, status: 'pending', paidDate: null, notes: '' },
                { id: 5, dueDate: '2025-10-01', amount: 500000, paidAmount: 0, status: 'pending', paidDate: null, notes: '' },
                { id: 6, dueDate: '2025-11-01', amount: 500000, paidAmount: 0, status: 'pending', paidDate: null, notes: '' }
            ]
        },
        {
            id: 2,
            customerName: 'فاطمة حسن الكريم',
            customerId: 2,
            totalAmount: 1500000,
            paidAmount: 500000,
            remainingAmount: 1000000,
            installmentAmount: 250000,
            frequency: 'biweekly',
            totalInstallments: 6,
            paidInstallments: 2,
            remainingInstallments: 4,
            startDate: '2025-07-01',
            nextDueDate: '2025-08-15',
            status: 'active',
            notes: 'قسط كل أسبوعين',
            invoiceNumber: 'INV-2025-003',
            installmentSchedule: [
                { id: 1, dueDate: '2025-07-01', amount: 250000, paidAmount: 250000, status: 'paid', paidDate: '2025-07-01', notes: 'دفع نقدي' },
                { id: 2, dueDate: '2025-07-15', amount: 250000, paidAmount: 250000, status: 'paid', paidDate: '2025-07-16', notes: 'تأخر يوم واحد' },
                { id: 3, dueDate: '2025-08-01', amount: 250000, paidAmount: 0, status: 'overdue', paidDate: null, notes: 'متأخر 5 أيام' },
                { id: 4, dueDate: '2025-08-15', amount: 250000, paidAmount: 0, status: 'pending', paidDate: null, notes: '' },
                { id: 5, dueDate: '2025-09-01', amount: 250000, paidAmount: 0, status: 'pending', paidDate: null, notes: '' },
                { id: 6, dueDate: '2025-09-15', amount: 250000, paidAmount: 0, status: 'pending', paidDate: null, notes: '' }
            ]
        },
        {
            id: 3,
            customerName: 'محمد علي الربيعي',
            customerId: 3,
            totalAmount: 2000000,
            paidAmount: 0,
            remainingAmount: 2000000,
            installmentAmount: 400000,
            frequency: 'monthly',
            totalInstallments: 5,
            paidInstallments: 0,
            remainingInstallments: 5,
            startDate: '2025-08-01',
            nextDueDate: '2025-08-01',
            status: 'active',
            notes: 'تقسيط جديد',
            invoiceNumber: 'INV-2025-005',
            installmentSchedule: [
                { id: 1, dueDate: '2025-08-01', amount: 400000, paidAmount: 0, status: 'pending', paidDate: null, notes: '' },
                { id: 2, dueDate: '2025-09-01', amount: 400000, paidAmount: 0, status: 'pending', paidDate: null, notes: '' },
                { id: 3, dueDate: '2025-10-01', amount: 400000, paidAmount: 0, status: 'pending', paidDate: null, notes: '' },
                { id: 4, dueDate: '2025-11-01', amount: 400000, paidAmount: 0, status: 'pending', paidDate: null, notes: '' },
                { id: 5, dueDate: '2025-12-01', amount: 400000, paidAmount: 0, status: 'pending', paidDate: null, notes: '' }
            ]
        }
    ]);

    const [newInstallment, setNewInstallment] = useState({
        customerId: '',
        customerName: '',
        totalAmount: 0,
        downPayment: 0, // المبلغ المقدم
        installmentAmount: 0,
        frequency: 'monthly',
        totalInstallments: 1,
        calculationMethod: 'by_amount', // 'by_amount' or 'by_duration'
        duration: 1, // المدة بالأشهر/أسابيع حسب التردد
        startDate: '',
        notes: '',
        invoiceNumber: '' // سيتم توليده تلقائياً
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

    // بيانات الدفع
    const [paymentData, setPaymentData] = useState({
        amount: 0,
        method: 'نقدي',
        notes: ''
    });

    const [selectedScheduleItem, setSelectedScheduleItem] = useState(null);
    const [showPaymentModal, setShowPaymentModal] = useState(false);

    const content = {
        ar: {
            title: 'إدارة الأقساط',
            subtitle: 'متابعة الأقساط والمدفوعات',
            search: 'البحث عن قسط...',
            addInstallment: 'إضافة تقسيط جديد',
            totalInstallments: 'إجمالي الأقساط',
            activeInstallments: 'أقساط نشطة',
            overdueInstallments: 'أقساط متأخرة',
            completedInstallments: 'أقساط مكتملة',
            filters: {
                all: 'الكل',
                active: 'نشط',
                overdue: 'متأخر',
                completed: 'مكتمل'
            },
            installmentInfo: {
                customer: 'العميل',
                totalAmount: 'المبلغ الإجمالي',
                paidAmount: 'المبلغ المدفوع',
                remainingAmount: 'المبلغ المتبقي',
                installmentAmount: 'مبلغ القسط',
                frequency: 'التردد',
                nextDue: 'القسط القادم',
                progress: 'التقدم',
                status: 'الحالة',
                invoiceNumber: 'رقم الفاتورة',
                notes: 'الملاحظات'
            },
            frequency: {
                monthly: 'شهري',
                biweekly: 'كل أسبوعين',
                weekly: 'أسبوعي'
            },
            status: {
                active: 'نشط',
                completed: 'مكتمل',
                overdue: 'متأخر',
                pending: 'معلق',
                paid: 'مدفوع',
                partial: 'جزئي'
            },
            actions: {
                view: 'عرض التفاصيل',
                pay: 'دفع قسط',
                edit: 'تعديل',
                delete: 'حذف'
            },
            payment: {
                title: 'دفع قسط',
                amount: 'المبلغ',
                method: 'طريقة الدفع',
                notes: 'ملاحظات',
                save: 'تسجيل الدفع',
                cancel: 'إلغاء',
                dueAmount: 'المبلغ المستحق',
                overpayment: 'دفع إضافي',
                willDistribute: 'سيتم توزيع المبلغ الإضافي على الأقساط التالية',
                partialPayment: 'دفع جزئي',
                remainingForThisInstallment: 'المتبقي لهذا القسط'
            },
            create: {
                title: 'إنشاء تقسيط جديد',
                customer: 'اختر العميل',
                customerSearch: 'ابحث عن عميل...',
                totalAmount: 'المبلغ الإجمالي',
                downPayment: 'المبلغ المقدم (اختياري)',
                installmentAmount: 'مبلغ القسط',
                frequency: 'تردد الدفع',
                calculationMethod: 'طريقة الحساب',
                byAmount: 'تحديد مبلغ القسط',
                byDuration: 'تحديد المدة',
                duration: 'المدة',
                totalInstallments: 'عدد الأقساط',
                startDate: 'تاريخ البداية',
                notes: 'ملاحظات',
                invoiceNumber: 'رقم الفاتورة',
                autoGenerate: 'توليد تلقائي',
                save: 'حفظ',
                cancel: 'إلغاء',
                months: 'شهر',
                weeks: 'أسبوع',
                remainingAmount: 'المبلغ المتبقي للتقسيط'
            },
            schedule: {
                title: 'جدول الأقساط',
                installmentNumber: 'رقم القسط',
                dueDate: 'تاريخ الاستحقاق',
                amount: 'المبلغ',
                status: 'الحالة',
                paidDate: 'تاريخ الدفع',
                notes: 'ملاحظات'
            },
            currency: 'د.ع',
            noInstallments: 'لا يوجد أقساط',
            daysOverdue: 'يوم تأخير'
        },
        en: {
            title: 'Installments Management',
            subtitle: 'Track installments and payments',
            search: 'Search for installment...',
            addInstallment: 'Add New Installment',
            totalInstallments: 'Total Installments',
            activeInstallments: 'Active Installments',
            overdueInstallments: 'Overdue Installments',
            completedInstallments: 'Completed Installments',
            filters: {
                all: 'All',
                active: 'Active',
                overdue: 'Overdue',
                completed: 'Completed'
            },
            installmentInfo: {
                customer: 'Customer',
                totalAmount: 'Total Amount',
                paidAmount: 'Paid Amount',
                remainingAmount: 'Remaining Amount',
                installmentAmount: 'Installment Amount',
                frequency: 'Frequency',
                nextDue: 'Next Due',
                progress: 'Progress',
                status: 'Status',
                invoiceNumber: 'Invoice Number',
                notes: 'Notes'
            },
            frequency: {
                monthly: 'Monthly',
                biweekly: 'Bi-weekly',
                weekly: 'Weekly'
            },
            status: {
                active: 'Active',
                completed: 'Completed',
                overdue: 'Overdue',
                pending: 'Pending',
                paid: 'Paid',
                partial: 'Partial'
            },
            actions: {
                view: 'View Details',
                pay: 'Pay Installment',
                edit: 'Edit',
                delete: 'Delete'
            },
            payment: {
                title: 'Pay Installment',
                amount: 'Amount',
                method: 'Payment Method',
                notes: 'Notes',
                save: 'Record Payment',
                cancel: 'Cancel',
                dueAmount: 'Due Amount',
                overpayment: 'Overpayment',
                willDistribute: 'Extra amount will be distributed to next installments',
                partialPayment: 'Partial Payment',
                remainingForThisInstallment: 'Remaining for this installment'
            },
            create: {
                title: 'Create New Installment',
                customer: 'Select Customer',
                customerSearch: 'Search for customer...',
                totalAmount: 'Total Amount',
                downPayment: 'Down Payment (Optional)',
                installmentAmount: 'Installment Amount',
                frequency: 'Payment Frequency',
                calculationMethod: 'Calculation Method',
                byAmount: 'Set Installment Amount',
                byDuration: 'Set Duration',
                duration: 'Duration',
                totalInstallments: 'Number of Installments',
                startDate: 'Start Date',
                notes: 'Notes',
                invoiceNumber: 'Invoice Number',
                autoGenerate: 'Auto Generate',
                save: 'Save',
                cancel: 'Cancel',
                months: 'months',
                weeks: 'weeks',
                remainingAmount: 'Remaining Amount for Installment'
            },
            schedule: {
                title: 'Installment Schedule',
                installmentNumber: 'Installment #',
                dueDate: 'Due Date',
                amount: 'Amount',
                status: 'Status',
                paidDate: 'Paid Date',
                notes: 'Notes'
            },
            currency: 'IQD',
            noInstallments: 'No installments',
            daysOverdue: 'days overdue'
        }
    };

    const currentContent = isArabic ? content.ar : content.en;

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat(isArabic ? 'ar-IQ' : 'en-US').format(amount);
    };

    const getStatusColor = (status) => {
        switch(status) {
            case 'paid':
            case 'completed': return 'text-green-600';
            case 'active': return 'text-blue-600';
            case 'overdue': return 'text-red-600';
            case 'pending': return 'text-gray-600';
            case 'partial': return 'text-yellow-600';
            default: return 'text-gray-600';
        }
    };

    const getStatusBgColor = (status) => {
        switch(status) {
            case 'paid':
            case 'completed': return 'bg-green-100 border-green-200';
            case 'active': return 'bg-blue-100 border-blue-200';
            case 'overdue': return 'bg-red-100 border-red-200';
            case 'pending': return 'bg-gray-100 border-gray-200';
            case 'partial': return 'bg-yellow-100 border-yellow-200';
            default: return 'bg-gray-100 border-gray-200';
        }
    };

    const getDaysOverdue = (dueDate) => {
        const today = new Date();
        const due = new Date(dueDate);
        const diffTime = today - due;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays > 0 ? diffDays : 0;
    };

    const getNextDueInstallment = (schedule) => {
        return schedule.find(inst => inst.status === 'pending' || inst.status === 'overdue');
    };

    const filteredInstallments = installments.filter(installment => {
        const matchesSearch = installment.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                             installment.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase());

        if (filterStatus === 'all') return matchesSearch;
        return matchesSearch && installment.status === filterStatus;
    });

    const handlePayInstallment = (installmentId, scheduleItemId) => {
        const updatedInstallments = installments.map(installment => {
            if (installment.id === installmentId) {
                const updatedSchedule = installment.installmentSchedule.map(item => {
                    if (item.id === scheduleItemId) {
                        return {
                            ...item,
                            status: 'paid',
                            paidDate: new Date().toISOString().split('T')[0],
                            paidAmount: item.amount
                        };
                    }
                    return item;
                });

                const paidCount = updatedSchedule.filter(item => item.status === 'paid').length;
                const newPaidAmount = updatedSchedule
                    .filter(item => item.status === 'paid')
                    .reduce((sum, item) => sum + item.paidAmount, 0);
                const newRemainingAmount = installment.totalAmount - newPaidAmount;

                return {
                    ...installment,
                    installmentSchedule: updatedSchedule,
                    paidInstallments: paidCount,
                    remainingInstallments: installment.totalInstallments - paidCount,
                    paidAmount: newPaidAmount,
                    remainingAmount: newRemainingAmount,
                    status: newRemainingAmount <= 0 ? 'completed' : 'active'
                };
            }
            return installment;
        });

        setInstallments(updatedInstallments);
    };

    // دالة معالجة الدفع المتقدم (أكثر أو أقل من المبلغ المستحق)
    const handleAdvancedPayment = (paymentAmount) => {
        if (!selectedInstallment || !selectedScheduleItem) return;

        const updatedInstallments = installments.map(installment => {
            if (installment.id === selectedInstallment.id) {
                let remainingPayment = paymentAmount;
                const updatedSchedule = [...installment.installmentSchedule];

                // البحث عن القسط المحدد أولاً
                const targetIndex = updatedSchedule.findIndex(item => item.id === selectedScheduleItem.id);

                if (targetIndex !== -1) {
                    const targetItem = updatedSchedule[targetIndex];
                    const currentlyPaid = targetItem.paidAmount || 0;
                    const remainingForThisInstallment = targetItem.amount - currentlyPaid;

                    if (remainingPayment >= remainingForThisInstallment) {
                        // دفع كامل أو أكثر للقسط الحالي
                        updatedSchedule[targetIndex] = {
                            ...targetItem,
                            paidAmount: targetItem.amount,
                            status: 'paid',
                            paidDate: new Date().toISOString().split('T')[0]
                        };
                        remainingPayment -= remainingForThisInstallment;

                        // توزيع المبلغ الإضافي على الأقساط التالية
                        for (let i = targetIndex + 1; i < updatedSchedule.length && remainingPayment > 0; i++) {
                            const nextItem = updatedSchedule[i];
                            const nextCurrentlyPaid = nextItem.paidAmount || 0;
                            const nextRemaining = nextItem.amount - nextCurrentlyPaid;

                            if (nextRemaining > 0) {
                                const paymentForNext = Math.min(remainingPayment, nextRemaining);
                                updatedSchedule[i] = {
                                    ...nextItem,
                                    paidAmount: nextCurrentlyPaid + paymentForNext,
                                    status: (nextCurrentlyPaid + paymentForNext >= nextItem.amount) ? 'paid' : 'partial',
                                    paidDate: (nextCurrentlyPaid + paymentForNext >= nextItem.amount) ? new Date().toISOString().split('T')[0] : null
                                };
                                remainingPayment -= paymentForNext;
                            }
                        }
                    } else {
                        // دفع جزئي للقسط الحالي
                        updatedSchedule[targetIndex] = {
                            ...targetItem,
                            paidAmount: currentlyPaid + remainingPayment,
                            status: 'partial',
                            paidDate: null
                        };
                        remainingPayment = 0;
                    }
                }

                // حساب الإجماليات الجديدة
                const newPaidAmount = updatedSchedule.reduce((sum, item) => sum + (item.paidAmount || 0), 0);
                const newRemainingAmount = installment.totalAmount - newPaidAmount;
                const paidCount = updatedSchedule.filter(item => item.status === 'paid').length;

                return {
                    ...installment,
                    installmentSchedule: updatedSchedule,
                    paidInstallments: paidCount,
                    remainingInstallments: installment.totalInstallments - paidCount,
                    paidAmount: newPaidAmount,
                    remainingAmount: newRemainingAmount,
                    status: newRemainingAmount <= 0 ? 'completed' : 'active'
                };
            }
            return installment;
        });

        setInstallments(updatedInstallments);
        setShowPaymentModal(false);
        setPaymentData({ amount: 0, method: 'نقدي', notes: '' });
        setSelectedScheduleItem(null);
    };

    // دالة معالجة إرسال نموذج الدفع المتقدم
    const handlePaymentSubmit = async (e) => {
        e.preventDefault();

        if (!paymentData.amount || paymentData.amount <= 0) {
            alert('من فضلك ادخل مبلغ صحيح');
            return;
        }

        try {
            await handleAdvancedPayment(selectedInstallment.id, selectedScheduleItem.id, paymentData.amount, paymentData.method, paymentData.notes);

            // إعادة تعيين النموذج
            setPaymentData({ amount: 0, method: 'نقدي', notes: '' });
            setShowPaymentModal(false);
            setSelectedScheduleItem(null);

            alert('تم تسجيل الدفعة بنجاح');
        } catch (error) {
            console.error('Error processing payment:', error);
            alert('حدث خطأ في تسجيل الدفعة');
        }
    };

    // دالة البحث عن العملاء
    const filteredCustomers = customers.filter(customer =>
        customer.name.toLowerCase().includes(customerSearchTerm.toLowerCase())
    );

    // دالة اختيار العميل
    const handleCustomerSelect = (customer) => {
        setNewInstallment(prev => ({
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
        return `INST-${year}${month}${day}-${random}`;
    };

    // دالة حساب الأقساط
    const calculateInstallments = () => {
        const remainingAmount = newInstallment.totalAmount - newInstallment.downPayment;

        if (newInstallment.calculationMethod === 'by_amount' && newInstallment.installmentAmount > 0) {
            // حساب عدد الأقساط بناءً على مبلغ القسط
            const calculatedInstallments = Math.ceil(remainingAmount / newInstallment.installmentAmount);
            setNewInstallment(prev => ({
                ...prev,
                totalInstallments: calculatedInstallments
            }));
        } else if (newInstallment.calculationMethod === 'by_duration' && newInstallment.duration > 0) {
            // حساب مبلغ القسط بناءً على المدة
            let installmentsCount;
            if (newInstallment.frequency === 'monthly') {
                installmentsCount = newInstallment.duration;
            } else if (newInstallment.frequency === 'biweekly') {
                installmentsCount = newInstallment.duration * 2;
            } else if (newInstallment.frequency === 'weekly') {
                installmentsCount = newInstallment.duration * 4;
            }

            const calculatedAmount = Math.ceil(remainingAmount / installmentsCount);
            setNewInstallment(prev => ({
                ...prev,
                totalInstallments: installmentsCount,
                installmentAmount: calculatedAmount
            }));
        }
    };

    // تشغيل دالة الحساب عند تغيير القيم
    useEffect(() => {
        if (newInstallment.totalAmount > 0) {
            calculateInstallments();
        }
    }, [newInstallment.totalAmount, newInstallment.downPayment, newInstallment.installmentAmount, newInstallment.duration, newInstallment.calculationMethod, newInstallment.frequency]);    const getTotalStats = () => {
        return {
            total: installments.length,
            active: installments.filter(i => i.status === 'active').length,
            overdue: installments.filter(i => {
                const nextDue = getNextDueInstallment(i.installmentSchedule);
                return nextDue && nextDue.status === 'overdue';
            }).length,
            completed: installments.filter(i => i.status === 'completed').length
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
                                onClick={() => setShowCreateModal(true)}
                                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                            >
                                {currentContent.addInstallment}
                            </button>
                        </div>
                    </div>

                    {/* Statistics Cards */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
                        <div className="bg-blue-50 p-3 rounded-lg border border-blue-100">
                            <div className="flex items-center">
                                <div className="p-2 bg-blue-500 rounded-lg">
                                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v6a2 2 0 002 2h6a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                    </svg>
                                </div>
                                <div className={`${isArabic ? 'mr-3' : 'ml-3'} flex-1 min-w-0`}>
                                    <p className="text-blue-600 text-xs font-medium truncate">
                                        {currentContent.totalInstallments}
                                    </p>
                                    <p className="text-blue-900 text-lg font-bold">
                                        {stats.total}
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
                                        {currentContent.activeInstallments}
                                    </p>
                                    <p className="text-green-900 text-lg font-bold">
                                        {stats.active}
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
                                        {currentContent.overdueInstallments}
                                    </p>
                                    <p className="text-red-900 text-lg font-bold">
                                        {stats.overdue}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-gray-50 p-3 rounded-lg border border-gray-100">
                            <div className="flex items-center">
                                <div className="p-2 bg-gray-500 rounded-lg">
                                    <span className="text-white text-sm">✔️</span>
                                </div>
                                <div className={`${isArabic ? 'mr-3' : 'ml-3'} flex-1 min-w-0`}>
                                    <p className="text-gray-600 text-xs font-medium truncate">
                                        {currentContent.completedInstallments}
                                    </p>
                                    <p className="text-gray-900 text-lg font-bold">
                                        {stats.completed}
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
                            <option value="active">{currentContent.filters.active}</option>
                            <option value="overdue">{currentContent.filters.overdue}</option>
                            <option value="completed">{currentContent.filters.completed}</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Installments List */}
            <div className="p-4">
                {filteredInstallments.length === 0 ? (
                    <div className="text-center py-12">
                        <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v6a2 2 0 002 2h6a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                        </svg>
                        <h3 className="mt-2 text-sm font-medium text-gray-900">{currentContent.noInstallments}</h3>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {filteredInstallments.map((installment) => {
                            const nextDue = getNextDueInstallment(installment.installmentSchedule);
                            const progressPercentage = (installment.paidInstallments / installment.totalInstallments) * 100;

                            return (
                                <div
                                    key={installment.id}
                                    className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow"
                                >
                                    <div className="flex items-start justify-between mb-4">
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center">
                                                <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold ${installment.status === 'completed' ? 'bg-green-500' : installment.status === 'active' ? 'bg-blue-500' : 'bg-gray-500'}`}>
                                                    {installment.status === 'completed' ? '✔️' : '📋'}
                                                </div>
                                                <div className={`${isArabic ? 'mr-3' : 'ml-3'} flex-1 min-w-0`}>
                                                    <h3 className="text-lg font-semibold text-gray-900 truncate">
                                                        {installment.customerName}
                                                    </h3>
                                                    <p className="text-sm text-gray-500 truncate">
                                                        {installment.invoiceNumber} • {currentContent.frequency[installment.frequency]}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusBgColor(installment.status)} ${getStatusColor(installment.status)}`}>
                                            {currentContent.status[installment.status]}
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mb-4">
                                        <div>
                                            <span className="text-gray-500 block">{currentContent.installmentInfo.totalAmount}:</span>
                                            <span className="font-semibold text-gray-900">
                                                {formatCurrency(installment.totalAmount)} {currentContent.currency}
                                            </span>
                                        </div>
                                        <div>
                                            <span className="text-gray-500 block">{currentContent.installmentInfo.installmentAmount}:</span>
                                            <span className="font-semibold text-blue-600">
                                                {formatCurrency(installment.installmentAmount)} {currentContent.currency}
                                            </span>
                                        </div>
                                        <div>
                                            <span className="text-gray-500 block">{currentContent.installmentInfo.progress}:</span>
                                            <span className="font-semibold text-gray-900">
                                                {installment.paidInstallments} / {installment.totalInstallments}
                                            </span>
                                        </div>
                                        <div>
                                            <span className="text-gray-500 block">{currentContent.installmentInfo.remainingAmount}:</span>
                                            <span className="font-semibold text-red-600">
                                                {formatCurrency(installment.remainingAmount)} {currentContent.currency}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Progress Bar */}
                                    <div className="mb-4">
                                        <div className="flex justify-between text-xs text-gray-500 mb-1">
                                            <span>{currentContent.installmentInfo.progress}</span>
                                            <span>{Math.round(progressPercentage)}%</span>
                                        </div>
                                        <div className="w-full bg-gray-200 rounded-full h-2">
                                            <div
                                                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                                                style={{ width: `${progressPercentage}%` }}
                                            ></div>
                                        </div>
                                    </div>

                                    {/* Next Due Installment */}
                                    {nextDue && (
                                        <div className={`p-3 rounded-lg border mb-4 ${nextDue.status === 'overdue' ? 'bg-red-50 border-red-200' : 'bg-yellow-50 border-yellow-200'}`}>
                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <span className={`text-sm font-medium ${nextDue.status === 'overdue' ? 'text-red-700' : 'text-yellow-700'}`}>
                                                        {currentContent.installmentInfo.nextDue}: {nextDue.dueDate}
                                                    </span>
                                                    <span className={`block text-sm ${nextDue.status === 'overdue' ? 'text-red-600' : 'text-yellow-600'}`}>
                                                        {formatCurrency(nextDue.amount)} {currentContent.currency}
                                                    </span>
                                                    {nextDue.status === 'overdue' && (
                                                        <span className="text-red-700 text-xs">
                                                            🚨 متأخر {getDaysOverdue(nextDue.dueDate)} {currentContent.daysOverdue}
                                                        </span>
                                                    )}
                                                </div>
                                                <button
                                                    onClick={() => {
                                                        setSelectedInstallment(installment);
                                                        setSelectedScheduleItem(nextDue);
                                                        setPaymentData({
                                                            amount: nextDue.amount - (nextDue.paidAmount || 0),
                                                            method: 'نقدي',
                                                            notes: ''
                                                        });
                                                        setShowPaymentModal(true);
                                                    }}
                                                    className={`px-3 py-1 rounded text-white text-sm font-medium ${nextDue.status === 'overdue' ? 'bg-red-600 hover:bg-red-700' : 'bg-yellow-600 hover:bg-yellow-700'} transition-colors`}
                                                >
                                                    {currentContent.actions.pay}
                                                </button>
                                            </div>
                                        </div>
                                    )}

                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => {
                                                setSelectedInstallment({ installment, scheduleItem: null });
                                                setShowInstallmentModal(true);
                                            }}
                                            className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 transition-colors"
                                        >
                                            {currentContent.actions.view}
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>

            {/* Installment Details Modal */}
            {showInstallmentModal && selectedInstallment && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-auto">
                        <div className="p-6">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-xl font-bold text-gray-900">
                                    {currentContent.schedule.title}
                                </h2>
                                <button
                                    onClick={() => setShowInstallmentModal(false)}
                                    className="text-gray-400 hover:text-gray-600"
                                >
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>

                            {/* Customer Info */}
                            <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                                <h3 className="font-semibold text-gray-900 mb-2">{selectedInstallment.installment.customerName}</h3>
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                                    <div>
                                        <span className="text-gray-500">{currentContent.installmentInfo.totalAmount}:</span>
                                        <span className="font-semibold text-gray-900 mr-1">
                                            {formatCurrency(selectedInstallment.installment.totalAmount)} {currentContent.currency}
                                        </span>
                                    </div>
                                    <div>
                                        <span className="text-gray-500">{currentContent.installmentInfo.installmentAmount}:</span>
                                        <span className="font-semibold text-blue-600 mr-1">
                                            {formatCurrency(selectedInstallment.installment.installmentAmount)} {currentContent.currency}
                                        </span>
                                    </div>
                                    <div>
                                        <span className="text-gray-500">{currentContent.installmentInfo.frequency}:</span>
                                        <span className="font-semibold text-gray-900 mr-1">
                                            {currentContent.frequency[selectedInstallment.installment.frequency]}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Schedule Table */}
                            <div className="overflow-x-auto">
                                <table className="w-full text-sm">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-4 py-2 text-left font-medium text-gray-700">{currentContent.schedule.installmentNumber}</th>
                                            <th className="px-4 py-2 text-left font-medium text-gray-700">{currentContent.schedule.dueDate}</th>
                                            <th className="px-4 py-2 text-left font-medium text-gray-700">{currentContent.schedule.amount}</th>
                                            <th className="px-4 py-2 text-left font-medium text-gray-700">{currentContent.schedule.status}</th>
                                            <th className="px-4 py-2 text-left font-medium text-gray-700">{currentContent.schedule.paidDate}</th>
                                            <th className="px-4 py-2 text-left font-medium text-gray-700">{currentContent.actions.pay}</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200">
                                        {selectedInstallment.installment.installmentSchedule.map((item, index) => (
                                            <tr key={item.id} className="hover:bg-gray-50">
                                                <td className="px-4 py-3 font-medium">#{index + 1}</td>
                                                <td className="px-4 py-3">{item.dueDate}</td>
                                                <td className="px-4 py-3">{formatCurrency(item.amount)} {currentContent.currency}</td>
                                                <td className="px-4 py-3">
                                                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBgColor(item.status)} ${getStatusColor(item.status)}`}>
                                                        {currentContent.status[item.status]}
                                                    </span>
                                                </td>
                                                <td className="px-4 py-3">{item.paidDate || '-'}</td>
                                                <td className="px-4 py-3">
                                                    {item.status === 'pending' || item.status === 'overdue' ? (
                                                        <button
                                                            onClick={() => handlePayInstallment(selectedInstallment.installment.id, item.id)}
                                                            className={`px-3 py-1 rounded text-white text-xs font-medium ${item.status === 'overdue' ? 'bg-red-600 hover:bg-red-700' : 'bg-green-600 hover:bg-green-700'} transition-colors`}
                                                        >
                                                            {currentContent.actions.pay}
                                                        </button>
                                                    ) : (
                                                        <span className="text-green-600 text-xs">✅</span>
                                                    )}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Create Installment Modal */}
            {showCreateModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
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

                            <form className="space-y-4">
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

                                {/* المبلغ الإجمالي والمبلغ المقدم */}
                                <div className="grid grid-cols-2 gap-3">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            {currentContent.create.totalAmount} *
                                        </label>
                                        <input
                                            type="number"
                                            value={newInstallment.totalAmount}
                                            onChange={(e) => setNewInstallment({...newInstallment, totalAmount: parseFloat(e.target.value) || 0})}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            {currentContent.create.downPayment}
                                        </label>
                                        <input
                                            type="number"
                                            value={newInstallment.downPayment}
                                            onChange={(e) => setNewInstallment({...newInstallment, downPayment: parseFloat(e.target.value) || 0})}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        />
                                    </div>
                                </div>

                                {/* المبلغ المتبقي للتقسيط */}
                                {newInstallment.totalAmount > 0 && (
                                    <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
                                        <span className="text-blue-700 text-sm font-medium">
                                            {currentContent.create.remainingAmount}: {formatCurrency(newInstallment.totalAmount - newInstallment.downPayment)} {currentContent.currency}
                                        </span>
                                    </div>
                                )}

                                {/* طريقة الحساب */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        {currentContent.create.calculationMethod}
                                    </label>
                                    <div className="space-y-2">
                                        <label className="flex items-center">
                                            <input
                                                type="radio"
                                                name="calculationMethod"
                                                value="by_amount"
                                                checked={newInstallment.calculationMethod === 'by_amount'}
                                                onChange={(e) => setNewInstallment({...newInstallment, calculationMethod: e.target.value})}
                                                className="mr-2 text-blue-600"
                                            />
                                            <span className="text-gray-900">{currentContent.create.byAmount}</span>
                                        </label>
                                        <label className="flex items-center">
                                            <input
                                                type="radio"
                                                name="calculationMethod"
                                                value="by_duration"
                                                checked={newInstallment.calculationMethod === 'by_duration'}
                                                onChange={(e) => setNewInstallment({...newInstallment, calculationMethod: e.target.value})}
                                                className="mr-2 text-blue-600"
                                            />
                                            <span className="text-gray-900">{currentContent.create.byDuration}</span>
                                        </label>
                                    </div>
                                </div>

                                {/* تردد الدفع */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        {currentContent.create.frequency}
                                    </label>
                                    <select
                                        value={newInstallment.frequency}
                                        onChange={(e) => setNewInstallment({...newInstallment, frequency: e.target.value})}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    >
                                        <option value="monthly">{currentContent.frequency.monthly}</option>
                                        <option value="biweekly">{currentContent.frequency.biweekly}</option>
                                        <option value="weekly">{currentContent.frequency.weekly}</option>
                                    </select>
                                </div>

                                {/* الحقول حسب طريقة الحساب */}
                                {newInstallment.calculationMethod === 'by_amount' ? (
                                    <div className="grid grid-cols-2 gap-3">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                {currentContent.create.installmentAmount} *
                                            </label>
                                            <input
                                                type="number"
                                                value={newInstallment.installmentAmount}
                                                onChange={(e) => setNewInstallment({...newInstallment, installmentAmount: parseFloat(e.target.value) || 0})}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                {currentContent.create.totalInstallments}
                                            </label>
                                            <input
                                                type="number"
                                                value={newInstallment.totalInstallments}
                                                readOnly
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100"
                                            />
                                        </div>
                                    </div>
                                ) : (
                                    <div className="grid grid-cols-2 gap-3">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                {currentContent.create.duration} *
                                            </label>
                                            <input
                                                type="number"
                                                value={newInstallment.duration}
                                                onChange={(e) => setNewInstallment({...newInstallment, duration: parseInt(e.target.value) || 1})}
                                                min="1"
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                required
                                            />
                                            <small className="text-gray-500">
                                                {newInstallment.frequency === 'monthly' ? currentContent.create.months : currentContent.create.weeks}
                                            </small>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                {currentContent.create.installmentAmount}
                                            </label>
                                            <input
                                                type="number"
                                                value={newInstallment.installmentAmount}
                                                readOnly
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100"
                                            />
                                        </div>
                                    </div>
                                )}

                                {/* تاريخ البداية */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        {currentContent.create.startDate} *
                                    </label>
                                    <input
                                        type="date"
                                        value={newInstallment.startDate}
                                        onChange={(e) => setNewInstallment({...newInstallment, startDate: e.target.value})}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        required
                                    />
                                </div>

                                {/* رقم الفاتورة */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        {currentContent.create.invoiceNumber}
                                    </label>
                                    <div className="flex gap-2">
                                        <input
                                            type="text"
                                            value={newInstallment.invoiceNumber}
                                            onChange={(e) => setNewInstallment({...newInstallment, invoiceNumber: e.target.value})}
                                            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setNewInstallment({...newInstallment, invoiceNumber: generateInvoiceNumber()})}
                                            className="px-3 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors text-sm"
                                        >
                                            {currentContent.create.autoGenerate}
                                        </button>
                                    </div>
                                </div>

                                {/* الملاحظات */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        {currentContent.create.notes}
                                    </label>
                                    <textarea
                                        value={newInstallment.notes}
                                        onChange={(e) => setNewInstallment({...newInstallment, notes: e.target.value})}
                                        rows="3"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                </div>

                                <div className="flex gap-3 pt-4">
                                    <button
                                        type="button"
                                        onClick={() => {
                                            // هنا يمكن إضافة منطق حفظ التقسيط
                                            setShowCreateModal(false);
                                        }}
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

            {/* Advanced Payment Modal */}
            {showPaymentModal && selectedInstallment && selectedScheduleItem && (
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

                            {/* معلومات القسط المستحق */}
                            <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                                <p className="text-sm text-gray-600">العميل: <span className="font-semibold">{selectedInstallment.customerName}</span></p>
                                <p className="text-sm text-gray-600">تاريخ الاستحقاق: <span className="font-semibold">{selectedScheduleItem.dueDate}</span></p>
                                <p className="text-sm text-gray-600">{currentContent.payment.dueAmount}:
                                    <span className="font-semibold text-blue-600">
                                        {formatCurrency(selectedScheduleItem.amount - (selectedScheduleItem.paidAmount || 0))} {currentContent.currency}
                                    </span>
                                </p>
                                {selectedScheduleItem.paidAmount > 0 && (
                                    <p className="text-sm text-gray-600">مدفوع مسبقاً:
                                        <span className="font-semibold text-green-600">
                                            {formatCurrency(selectedScheduleItem.paidAmount)} {currentContent.currency}
                                        </span>
                                    </p>
                                )}
                            </div>

                            {/* تحذيرات الدفع */}
                            {paymentData.amount > (selectedScheduleItem.amount - (selectedScheduleItem.paidAmount || 0)) && (
                                <div className="mb-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
                                    <p className="text-blue-700 text-sm">
                                        💡 {currentContent.payment.overpayment}: {formatCurrency(paymentData.amount - (selectedScheduleItem.amount - (selectedScheduleItem.paidAmount || 0)))} {currentContent.currency}
                                    </p>
                                    <p className="text-blue-600 text-xs mt-1">
                                        {currentContent.payment.willDistribute}
                                    </p>
                                </div>
                            )}

                            {paymentData.amount < (selectedScheduleItem.amount - (selectedScheduleItem.paidAmount || 0)) && paymentData.amount > 0 && (
                                <div className="mb-4 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                                    <p className="text-yellow-700 text-sm">
                                        ⚠️ {currentContent.payment.partialPayment}
                                    </p>
                                    <p className="text-yellow-600 text-xs mt-1">
                                        {currentContent.payment.remainingForThisInstallment}: {formatCurrency((selectedScheduleItem.amount - (selectedScheduleItem.paidAmount || 0)) - paymentData.amount)} {currentContent.currency}
                                    </p>
                                </div>
                            )}

                            <form onSubmit={handlePaymentSubmit} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        {currentContent.payment.amount} *
                                    </label>

                                    {/* أزرار سريعة للمبالغ الشائعة */}
                                    <div className="flex gap-2 mb-2">
                                        <button
                                            type="button"
                                            onClick={() => setPaymentData({...paymentData, amount: selectedScheduleItem.amount - (selectedScheduleItem.paidAmount || 0)})}
                                            className="px-3 py-1 text-xs bg-blue-100 text-blue-700 rounded-full hover:bg-blue-200 transition-colors"
                                        >
                                            المبلغ كاملاً ({formatCurrency(selectedScheduleItem.amount - (selectedScheduleItem.paidAmount || 0))} {currentContent.currency})
                                        </button>
                                        {(selectedScheduleItem.amount - (selectedScheduleItem.paidAmount || 0)) >= 10000 && (
                                            <button
                                                type="button"
                                                onClick={() => setPaymentData({...paymentData, amount: (selectedScheduleItem.amount - (selectedScheduleItem.paidAmount || 0)) / 2})}
                                                className="px-3 py-1 text-xs bg-yellow-100 text-yellow-700 rounded-full hover:bg-yellow-200 transition-colors"
                                            >
                                                نصف المبلغ ({formatCurrency((selectedScheduleItem.amount - (selectedScheduleItem.paidAmount || 0)) / 2)} {currentContent.currency})
                                            </button>
                                        )}
                                    </div>

                                    <input
                                        type="number"
                                        value={paymentData.amount}
                                        onChange={(e) => setPaymentData({...paymentData, amount: parseFloat(e.target.value) || 0})}
                                        min="0"
                                        step="1000"
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
                                        <option value="نقدي">نقدي</option>
                                        <option value="تحويل بنكي">تحويل بنكي</option>
                                        <option value="بطاقة ائتمان">بطاقة ائتمان</option>
                                        <option value="شيك">شيك</option>
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
                                        onClick={() => {
                                            setShowPaymentModal(false);
                                            setSelectedScheduleItem(null);
                                        }}
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
        </div>
    );
};

export default InstallmentsPage;
