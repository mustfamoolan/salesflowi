import React, { useState, useEffect } from 'react';
import BackButton from './BackButton';

const ReportsPage = () => {
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
    const [selectedReport, setSelectedReport] = useState('sales');
    const [dateRange, setDateRange] = useState('month');
    const [startDate, setStartDate] = useState('2025-08-01');
    const [endDate, setEndDate] = useState('2025-08-05');
    const [isGenerating, setIsGenerating] = useState(false);

    // Mock data for reports
    const mockData = {
        sales: {
            totalSales: 15750000,
            totalOrders: 45,
            averageOrderValue: 350000,
            topProducts: [
                { name: 'جهاز كمبيوتر محمول', sales: 5000000, quantity: 5 },
                { name: 'طابعة ليزر', sales: 3000000, quantity: 10 },
                { name: 'ماوس لاسلكي', sales: 2000000, quantity: 20 },
                { name: 'لوحة مفاتيح', sales: 1500000, quantity: 15 }
            ],
            dailySales: [
                { date: '2025-08-01', amount: 2500000 },
                { date: '2025-08-02', amount: 3200000 },
                { date: '2025-08-03', amount: 1800000 },
                { date: '2025-08-04', amount: 4200000 },
                { date: '2025-08-05', amount: 4050000 }
            ]
        },
        financial: {
            totalRevenue: 15750000,
            totalExpenses: 4225000,
            netProfit: 11525000,
            profitMargin: 73.2,
            expenses: [
                { category: 'رواتب', amount: 2500000, percentage: 59.2 },
                { category: 'إيجار', amount: 1000000, percentage: 23.7 },
                { category: 'مواصلات', amount: 300000, percentage: 7.1 },
                { category: 'صيانة', amount: 200000, percentage: 4.7 },
                { category: 'أخرى', amount: 225000, percentage: 5.3 }
            ]
        },
        customers: {
            totalCustomers: 156,
            newCustomers: 8,
            activeCustomers: 45,
            topCustomers: [
                { name: 'أحمد محمد العلي', purchases: 3500000, orders: 12 },
                { name: 'فاطمة حسن الكريم', purchases: 2800000, orders: 8 },
                { name: 'محمد علي الربيعي', purchases: 2200000, orders: 6 },
                { name: 'سارة أحمد الكاظم', purchases: 1900000, orders: 9 }
            ]
        },
        inventory: {
            totalProducts: 245,
            lowStockProducts: 12,
            outOfStockProducts: 3,
            totalValue: 25000000,
            topMovingProducts: [
                { name: 'ماوس لاسلكي', sold: 20, remaining: 15 },
                { name: 'طابعة ليزر', sold: 10, remaining: 8 },
                { name: 'لوحة مفاتيح', sold: 15, remaining: 25 },
                { name: 'سماعة رأس', sold: 8, remaining: 12 }
            ]
        },
        debts: {
            totalDebts: 8500000,
            totalDebtors: 23,
            averageDebt: 369565,
            overdueDebts: 2100000,
            overdueDebtors: 6,
            debtsByStatus: [
                { status: 'جاري', amount: 6400000, count: 17, percentage: 75.3 },
                { status: 'متأخر', amount: 2100000, count: 6, percentage: 24.7 }
            ],
            topDebtors: [
                { name: 'أحمد محمد العلي', amount: 1200000, dueDate: '2025-08-15', status: 'جاري' },
                { name: 'فاطمة حسن الكريم', amount: 850000, dueDate: '2025-07-30', status: 'متأخر' },
                { name: 'محمد علي الربيعي', amount: 750000, dueDate: '2025-08-20', status: 'جاري' },
                { name: 'سارة أحمد الكاظم', amount: 650000, dueDate: '2025-07-25', status: 'متأخر' }
            ],
            monthlyCollection: [
                { month: 'يناير', collected: 2500000, target: 3000000 },
                { month: 'فبراير', collected: 2800000, target: 3000000 },
                { month: 'مارس', collected: 3200000, target: 3000000 },
                { month: 'أبريل', collected: 2700000, target: 3000000 },
                { month: 'مايو', collected: 2900000, target: 3000000 }
            ]
        },
        installments: {
            totalAmount: 12500000,
            activeInstallments: 18,
            activeCustomers: 18,
            upcomingPayments: 1450000,
            averageAmount: 694444,
            paymentFrequency: [
                { type: 'شهري', amount: 8500000, count: 12, percentage: 68.0 },
                { type: 'كل أسبوعين', amount: 3000000, count: 4, percentage: 24.0 },
                { type: 'أسبوعي', amount: 1000000, count: 2, percentage: 8.0 }
            ],
            completionStatus: [
                { status: 'مكتمل', count: 8, amount: 4500000, completionRate: 100 },
                { status: 'جاري', count: 10, amount: 6800000, completionRate: 68 },
                { status: 'متأخر', count: 3, amount: 1200000, completionRate: 25 }
            ],
            topCustomers: [
                { name: 'أحمد محمد العلي', totalInstallments: 5, totalAmount: 2500000, paidAmount: 1800000, remainingAmount: 700000 },
                { name: 'فاطمة حسن الكريم', totalInstallments: 3, totalAmount: 1800000, paidAmount: 1200000, remainingAmount: 600000 },
                { name: 'محمد علي الربيعي', totalInstallments: 4, totalAmount: 2000000, paidAmount: 1500000, remainingAmount: 500000 },
                { name: 'سارة أحمد الكاظم', totalInstallments: 2, totalAmount: 1500000, paidAmount: 1200000, remainingAmount: 300000 }
            ]
        },
        expenses: {
            totalExpenses: 6200000,
            fixedExpenses: 4500000,
            variableExpenses: 1700000,
            budgetVariance: 200000,
            categories: [
                { name: 'رواتب والأجور', amount: 2800000, budget: 3000000, variance: -200000, type: 'ثابت' },
                { name: 'إيجار', amount: 1200000, budget: 1200000, variance: 0, type: 'ثابت' },
                { name: 'كهرباء وماء', amount: 500000, budget: 450000, variance: 50000, type: 'ثابت' },
                { name: 'مواصلات', amount: 600000, budget: 500000, variance: 100000, type: 'متغير' },
                { name: 'صيانة', amount: 400000, budget: 300000, variance: 100000, type: 'متغير' },
                { name: 'تسويق وإعلان', amount: 300000, budget: 400000, variance: -100000, type: 'متغير' },
                { name: 'مصروفات إدارية', amount: 400000, budget: 350000, variance: 50000, type: 'متغير' }
            ],
            monthlyTrends: [
                { month: 'يناير', actual: 6100000, budget: 6000000, variance: 100000 },
                { month: 'فبراير', actual: 5800000, budget: 6000000, variance: -200000 },
                { month: 'مارس', actual: 6300000, budget: 6000000, variance: 300000 },
                { month: 'أبريل', actual: 5900000, budget: 6000000, variance: -100000 },
                { month: 'مايو', actual: 6200000, budget: 6000000, variance: 200000 }
            ]
        }
    };

    const content = {
        ar: {
            title: 'التقارير والإحصائيات',
            subtitle: 'تحليل شامل لأداء العمل',
            generateReport: 'إنتاج التقرير',
            exportPDF: 'تصدير PDF',
            exportExcel: 'تصدير Excel',
            printReport: 'طباعة التقرير',
            dateRange: {
                label: 'الفترة الزمنية',
                today: 'اليوم',
                week: 'هذا الأسبوع',
                month: 'هذا الشهر',
                quarter: 'هذا الربع',
                year: 'هذا العام',
                custom: 'فترة مخصصة'
            },
            reportTypes: {
                sales: 'تقرير المبيعات',
                financial: 'التقرير المالي',
                customers: 'تقرير العملاء',
                inventory: 'تقرير المخزون',
                debts: 'تقرير الديون',
                installments: 'تقرير الأقساط',
                expenses: 'تقرير المصروفات'
            },
            salesReport: {
                title: 'تقرير المبيعات',
                totalSales: 'إجمالي المبيعات',
                totalOrders: 'إجمالي الطلبات',
                averageOrder: 'متوسط قيمة الطلب',
                topProducts: 'أفضل المنتجات مبيعاً',
                dailySales: 'المبيعات اليومية',
                productName: 'اسم المنتج',
                salesAmount: 'مبلغ المبيعات',
                quantity: 'الكمية',
                date: 'التاريخ',
                amount: 'المبلغ'
            },
            financialReport: {
                title: 'التقرير المالي',
                totalRevenue: 'إجمالي الإيرادات',
                totalExpenses: 'إجمالي المصروفات',
                netProfit: 'صافي الربح',
                profitMargin: 'هامش الربح',
                expenseBreakdown: 'تفصيل المصروفات',
                category: 'الفئة',
                percentage: 'النسبة'
            },
            customersReport: {
                title: 'تقرير العملاء',
                totalCustomers: 'إجمالي العملاء',
                newCustomers: 'عملاء جدد',
                activeCustomers: 'عملاء نشطين',
                topCustomers: 'أفضل العملاء',
                customerName: 'اسم العميل',
                purchases: 'المشتريات',
                orders: 'الطلبات'
            },
            inventoryReport: {
                title: 'تقرير المخزون',
                totalProducts: 'إجمالي المنتجات',
                lowStock: 'مخزون منخفض',
                outOfStock: 'نفد المخزون',
                totalValue: 'إجمالي قيمة المخزون',
                topMoving: 'أكثر المنتجات حركة',
                sold: 'مباع',
                remaining: 'متبقي'
            },
            debtsReport: {
                title: 'تقرير الديون',
                totalDebts: 'إجمالي الديون',
                totalDebtors: 'إجمالي المدينين',
                averageDebt: 'متوسط الدين',
                overdueDebts: 'ديون متأخرة',
                overdueDebtors: 'مدينين متأخرين',
                debtsByStatus: 'الديون حسب الحالة',
                topDebtors: 'أكبر المدينين',
                debtorName: 'اسم المدين',
                debtAmount: 'مبلغ الدين',
                dueDate: 'تاريخ الاستحقاق',
                status: 'الحالة',
                monthlyCollection: 'التحصيل الشهري',
                collected: 'محصل',
                target: 'المستهدف',
                month: 'الشهر',
                current: 'جاري',
                overdue: 'متأخر'
            },
            installmentsReport: {
                title: 'تقرير الأقساط',
                totalAmount: 'إجمالي المبلغ',
                totalInstallments: 'إجمالي الأقساط',
                activeInstallments: 'أقساط نشطة',
                activeCustomers: 'عملاء نشطين',
                totalCustomers: 'إجمالي العملاء',
                paidInstallments: 'أقساط مدفوعة',
                remainingInstallments: 'أقساط متبقية',
                overdueInstallments: 'أقساط متأخرة',
                upcomingPayments: 'دفعات قادمة',
                averageAmount: 'متوسط المبلغ',
                paymentFrequency: 'تكرار الدفع',
                installmentsByFrequency: 'الأقساط حسب التردد',
                completionStatus: 'حالة الإكمال',
                completionRate: 'معدل الإنجاز',
                topCustomers: 'أفضل العملاء',
                customerName: 'اسم العميل',
                installmentAmount: 'مبلغ القسط',
                paidAmount: 'المبلغ المدفوع',
                remainingAmount: 'المبلغ المتبقي',
                frequency: 'التردد',
                count: 'العدد',
                monthly: 'شهري',
                biweekly: 'كل أسبوعين',
                weekly: 'أسبوعي'
            },
            expensesReport: {
                title: 'تقرير المصروفات',
                totalExpenses: 'إجمالي المصروفات',
                fixedExpenses: 'مصروفات ثابتة',
                variableExpenses: 'مصروفات متغيرة',
                budgetVariance: 'انحراف الميزانية',
                expenseCategories: 'فئات المصروفات',
                expensesByCategory: 'المصروفات حسب الفئة',
                monthlyExpenses: 'المصروفات الشهرية',
                monthlyTrends: 'اتجاهات شهرية',
                budgetComparison: 'مقارنة الميزانية',
                actualExpenses: 'المصروفات الفعلية',
                budgetedExpenses: 'المصروفات المخططة',
                category: 'الفئة',
                budget: 'مخطط',
                actual: 'فعلي',
                variance: 'الفرق',
                fixed: 'ثابت',
                variable: 'متغير',
                type: 'النوع'
            },
            currency: 'د.ع',
            generating: 'جاري إنتاج التقرير...',
            noData: 'لا توجد بيانات للفترة المحددة'
        },
        en: {
            title: 'Reports & Analytics',
            subtitle: 'Comprehensive business performance analysis',
            generateReport: 'Generate Report',
            exportPDF: 'Export PDF',
            exportExcel: 'Export Excel',
            printReport: 'Print Report',
            dateRange: {
                label: 'Date Range',
                today: 'Today',
                week: 'This Week',
                month: 'This Month',
                quarter: 'This Quarter',
                year: 'This Year',
                custom: 'Custom Range'
            },
            reportTypes: {
                sales: 'Sales Report',
                financial: 'Financial Report',
                customers: 'Customers Report',
                inventory: 'Inventory Report',
                debts: 'Debts Report',
                installments: 'Installments Report',
                expenses: 'Expenses Report'
            },
            salesReport: {
                title: 'Sales Report',
                totalSales: 'Total Sales',
                totalOrders: 'Total Orders',
                averageOrder: 'Average Order Value',
                topProducts: 'Top Selling Products',
                dailySales: 'Daily Sales',
                productName: 'Product Name',
                salesAmount: 'Sales Amount',
                quantity: 'Quantity',
                date: 'Date',
                amount: 'Amount'
            },
            financialReport: {
                title: 'Financial Report',
                totalRevenue: 'Total Revenue',
                totalExpenses: 'Total Expenses',
                netProfit: 'Net Profit',
                profitMargin: 'Profit Margin',
                expenseBreakdown: 'Expense Breakdown',
                category: 'Category',
                percentage: 'Percentage'
            },
            customersReport: {
                title: 'Customers Report',
                totalCustomers: 'Total Customers',
                newCustomers: 'New Customers',
                activeCustomers: 'Active Customers',
                topCustomers: 'Top Customers',
                customerName: 'Customer Name',
                purchases: 'Purchases',
                orders: 'Orders'
            },
            inventoryReport: {
                title: 'Inventory Report',
                totalProducts: 'Total Products',
                lowStock: 'Low Stock',
                outOfStock: 'Out of Stock',
                totalValue: 'Total Inventory Value',
                topMoving: 'Top Moving Products',
                sold: 'Sold',
                remaining: 'Remaining'
            },
            debtsReport: {
                title: 'Debts Report',
                totalDebts: 'Total Debts',
                totalDebtors: 'Total Debtors',
                averageDebt: 'Average Debt',
                overdueDebts: 'Overdue Debts',
                overdueDebtors: 'Overdue Debtors',
                debtsByStatus: 'Debts by Status',
                topDebtors: 'Top Debtors',
                debtorName: 'Debtor Name',
                debtAmount: 'Debt Amount',
                dueDate: 'Due Date',
                status: 'Status',
                monthlyCollection: 'Monthly Collection',
                collected: 'Collected',
                target: 'Target',
                month: 'Month',
                current: 'Current',
                overdue: 'Overdue'
            },
            installmentsReport: {
                title: 'Installments Report',
                totalAmount: 'Total Amount',
                totalInstallments: 'Total Installments',
                activeInstallments: 'Active Installments',
                activeCustomers: 'Active Customers',
                totalCustomers: 'Total Customers',
                paidInstallments: 'Paid Installments',
                remainingInstallments: 'Remaining Installments',
                overdueInstallments: 'Overdue Installments',
                upcomingPayments: 'Upcoming Payments',
                averageAmount: 'Average Amount',
                paymentFrequency: 'Payment Frequency',
                installmentsByFrequency: 'Installments by Frequency',
                completionStatus: 'Completion Status',
                completionRate: 'Completion Rate',
                topCustomers: 'Top Customers',
                customerName: 'Customer Name',
                installmentAmount: 'Installment Amount',
                paidAmount: 'Paid Amount',
                remainingAmount: 'Remaining Amount',
                frequency: 'Frequency',
                count: 'Count',
                monthly: 'Monthly',
                biweekly: 'Biweekly',
                weekly: 'Weekly'
            },
            expensesReport: {
                title: 'Expenses Report',
                totalExpenses: 'Total Expenses',
                fixedExpenses: 'Fixed Expenses',
                variableExpenses: 'Variable Expenses',
                budgetVariance: 'Budget Variance',
                expenseCategories: 'Expense Categories',
                expensesByCategory: 'Expenses by Category',
                monthlyExpenses: 'Monthly Expenses',
                monthlyTrends: 'Monthly Trends',
                budgetComparison: 'Budget Comparison',
                actualExpenses: 'Actual Expenses',
                budgetedExpenses: 'Budgeted Expenses',
                category: 'Category',
                budget: 'Budget',
                actual: 'Actual',
                variance: 'Variance',
                fixed: 'Fixed',
                variable: 'Variable',
                type: 'Type'
            },
            currency: 'IQD',
            generating: 'Generating report...',
            noData: 'No data available for the selected period'
        }
    };

    const currentContent = isArabic ? content.ar : content.en;

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat(isArabic ? 'ar-IQ' : 'en-US').format(amount);
    };

    const handleGenerateReport = () => {
        setIsGenerating(true);
        // Simulate report generation
        setTimeout(() => {
            setIsGenerating(false);
        }, 2000);
    };

    const handleExportPDF = () => {
        alert('سيتم تصدير التقرير كملف PDF');
    };

    const handleExportExcel = () => {
        alert('سيتم تصدير التقرير كملف Excel');
    };

    const handlePrint = () => {
        window.print();
    };

    const renderSalesReport = () => {
        const data = mockData.sales;
        return (
            <div className="space-y-6">
                {/* Summary Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-green-50 p-4 rounded-lg border border-green-100">
                        <h3 className="text-sm font-medium text-green-600 mb-1">{currentContent.salesReport.totalSales}</h3>
                        <p className="text-2xl font-bold text-green-900">{formatCurrency(data.totalSales)} {currentContent.currency}</p>
                    </div>
                    <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                        <h3 className="text-sm font-medium text-blue-600 mb-1">{currentContent.salesReport.totalOrders}</h3>
                        <p className="text-2xl font-bold text-blue-900">{data.totalOrders}</p>
                    </div>
                    <div className="bg-purple-50 p-4 rounded-lg border border-purple-100">
                        <h3 className="text-sm font-medium text-purple-600 mb-1">{currentContent.salesReport.averageOrder}</h3>
                        <p className="text-2xl font-bold text-purple-900">{formatCurrency(data.averageOrderValue)} {currentContent.currency}</p>
                    </div>
                </div>

                {/* Top Products */}
                <div className="bg-white p-6 rounded-lg border border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">{currentContent.salesReport.topProducts}</h3>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-4 py-2 text-left font-medium text-gray-700">{currentContent.salesReport.productName}</th>
                                    <th className="px-4 py-2 text-left font-medium text-gray-700">{currentContent.salesReport.salesAmount}</th>
                                    <th className="px-4 py-2 text-left font-medium text-gray-700">{currentContent.salesReport.quantity}</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {data.topProducts.map((product, index) => (
                                    <tr key={index} className="hover:bg-gray-50">
                                        <td className="px-4 py-3 font-medium">{product.name}</td>
                                        <td className="px-4 py-3">{formatCurrency(product.sales)} {currentContent.currency}</td>
                                        <td className="px-4 py-3">{product.quantity}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Daily Sales */}
                <div className="bg-white p-6 rounded-lg border border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">{currentContent.salesReport.dailySales}</h3>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-4 py-2 text-left font-medium text-gray-700">{currentContent.salesReport.date}</th>
                                    <th className="px-4 py-2 text-left font-medium text-gray-700">{currentContent.salesReport.amount}</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {data.dailySales.map((day, index) => (
                                    <tr key={index} className="hover:bg-gray-50">
                                        <td className="px-4 py-3 font-medium">{day.date}</td>
                                        <td className="px-4 py-3">{formatCurrency(day.amount)} {currentContent.currency}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
    };

    const renderFinancialReport = () => {
        const data = mockData.financial;
        return (
            <div className="space-y-6">
                {/* Summary Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="bg-green-50 p-4 rounded-lg border border-green-100">
                        <h3 className="text-sm font-medium text-green-600 mb-1">{currentContent.financialReport.totalRevenue}</h3>
                        <p className="text-2xl font-bold text-green-900">{formatCurrency(data.totalRevenue)} {currentContent.currency}</p>
                    </div>
                    <div className="bg-red-50 p-4 rounded-lg border border-red-100">
                        <h3 className="text-sm font-medium text-red-600 mb-1">{currentContent.financialReport.totalExpenses}</h3>
                        <p className="text-2xl font-bold text-red-900">{formatCurrency(data.totalExpenses)} {currentContent.currency}</p>
                    </div>
                    <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                        <h3 className="text-sm font-medium text-blue-600 mb-1">{currentContent.financialReport.netProfit}</h3>
                        <p className="text-2xl font-bold text-blue-900">{formatCurrency(data.netProfit)} {currentContent.currency}</p>
                    </div>
                    <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-100">
                        <h3 className="text-sm font-medium text-yellow-600 mb-1">{currentContent.financialReport.profitMargin}</h3>
                        <p className="text-2xl font-bold text-yellow-900">{data.profitMargin}%</p>
                    </div>
                </div>

                {/* Expense Breakdown */}
                <div className="bg-white p-6 rounded-lg border border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">{currentContent.financialReport.expenseBreakdown}</h3>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-4 py-2 text-left font-medium text-gray-700">{currentContent.financialReport.category}</th>
                                    <th className="px-4 py-2 text-left font-medium text-gray-700">{currentContent.salesReport.amount}</th>
                                    <th className="px-4 py-2 text-left font-medium text-gray-700">{currentContent.financialReport.percentage}</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {data.expenses.map((expense, index) => (
                                    <tr key={index} className="hover:bg-gray-50">
                                        <td className="px-4 py-3 font-medium">{expense.category}</td>
                                        <td className="px-4 py-3">{formatCurrency(expense.amount)} {currentContent.currency}</td>
                                        <td className="px-4 py-3">{expense.percentage}%</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
    };

    const renderCustomersReport = () => {
        const data = mockData.customers;
        return (
            <div className="space-y-6">
                {/* Summary Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                        <h3 className="text-sm font-medium text-blue-600 mb-1">{currentContent.customersReport.totalCustomers}</h3>
                        <p className="text-2xl font-bold text-blue-900">{data.totalCustomers}</p>
                    </div>
                    <div className="bg-green-50 p-4 rounded-lg border border-green-100">
                        <h3 className="text-sm font-medium text-green-600 mb-1">{currentContent.customersReport.newCustomers}</h3>
                        <p className="text-2xl font-bold text-green-900">{data.newCustomers}</p>
                    </div>
                    <div className="bg-purple-50 p-4 rounded-lg border border-purple-100">
                        <h3 className="text-sm font-medium text-purple-600 mb-1">{currentContent.customersReport.activeCustomers}</h3>
                        <p className="text-2xl font-bold text-purple-900">{data.activeCustomers}</p>
                    </div>
                </div>

                {/* Top Customers */}
                <div className="bg-white p-6 rounded-lg border border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">{currentContent.customersReport.topCustomers}</h3>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-4 py-2 text-left font-medium text-gray-700">{currentContent.customersReport.customerName}</th>
                                    <th className="px-4 py-2 text-left font-medium text-gray-700">{currentContent.customersReport.purchases}</th>
                                    <th className="px-4 py-2 text-left font-medium text-gray-700">{currentContent.customersReport.orders}</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {data.topCustomers.map((customer, index) => (
                                    <tr key={index} className="hover:bg-gray-50">
                                        <td className="px-4 py-3 font-medium">{customer.name}</td>
                                        <td className="px-4 py-3">{formatCurrency(customer.purchases)} {currentContent.currency}</td>
                                        <td className="px-4 py-3">{customer.orders}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
    };

    const renderInventoryReport = () => {
        const data = mockData.inventory;
        return (
            <div className="space-y-6">
                {/* Summary Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                        <h3 className="text-sm font-medium text-blue-600 mb-1">{currentContent.inventoryReport.totalProducts}</h3>
                        <p className="text-2xl font-bold text-blue-900">{data.totalProducts}</p>
                    </div>
                    <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-100">
                        <h3 className="text-sm font-medium text-yellow-600 mb-1">{currentContent.inventoryReport.lowStock}</h3>
                        <p className="text-2xl font-bold text-yellow-900">{data.lowStockProducts}</p>
                    </div>
                    <div className="bg-red-50 p-4 rounded-lg border border-red-100">
                        <h3 className="text-sm font-medium text-red-600 mb-1">{currentContent.inventoryReport.outOfStock}</h3>
                        <p className="text-2xl font-bold text-red-900">{data.outOfStockProducts}</p>
                    </div>
                    <div className="bg-green-50 p-4 rounded-lg border border-green-100">
                        <h3 className="text-sm font-medium text-green-600 mb-1">{currentContent.inventoryReport.totalValue}</h3>
                        <p className="text-2xl font-bold text-green-900">{formatCurrency(data.totalValue)} {currentContent.currency}</p>
                    </div>
                </div>

                {/* Top Moving Products */}
                <div className="bg-white p-6 rounded-lg border border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">{currentContent.inventoryReport.topMoving}</h3>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-4 py-2 text-left font-medium text-gray-700">{currentContent.salesReport.productName}</th>
                                    <th className="px-4 py-2 text-left font-medium text-gray-700">{currentContent.inventoryReport.sold}</th>
                                    <th className="px-4 py-2 text-left font-medium text-gray-700">{currentContent.inventoryReport.remaining}</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {data.topMovingProducts.map((product, index) => (
                                    <tr key={index} className="hover:bg-gray-50">
                                        <td className="px-4 py-3 font-medium">{product.name}</td>
                                        <td className="px-4 py-3">{product.sold}</td>
                                        <td className="px-4 py-3">{product.remaining}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
    };

    const renderDebtsReport = () => {
        const data = mockData.debts;
        return (
            <div className="space-y-6">
                {/* Summary Cards */}
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                    <div className="bg-red-50 p-4 rounded-lg border border-red-100">
                        <h3 className="text-sm font-medium text-red-600 mb-1">{currentContent.debtsReport.totalDebts}</h3>
                        <p className="text-2xl font-bold text-red-900">{formatCurrency(data.totalDebts)} {currentContent.currency}</p>
                    </div>
                    <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                        <h3 className="text-sm font-medium text-blue-600 mb-1">{currentContent.debtsReport.totalDebtors}</h3>
                        <p className="text-2xl font-bold text-blue-900">{data.totalDebtors}</p>
                    </div>
                    <div className="bg-purple-50 p-4 rounded-lg border border-purple-100">
                        <h3 className="text-sm font-medium text-purple-600 mb-1">{currentContent.debtsReport.averageDebt}</h3>
                        <p className="text-2xl font-bold text-purple-900">{formatCurrency(data.averageDebt)} {currentContent.currency}</p>
                    </div>
                    <div className="bg-orange-50 p-4 rounded-lg border border-orange-100">
                        <h3 className="text-sm font-medium text-orange-600 mb-1">{currentContent.debtsReport.overdueDebts}</h3>
                        <p className="text-2xl font-bold text-orange-900">{formatCurrency(data.overdueDebts)} {currentContent.currency}</p>
                    </div>
                    <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-100">
                        <h3 className="text-sm font-medium text-yellow-600 mb-1">{currentContent.debtsReport.overdueDebtors}</h3>
                        <p className="text-2xl font-bold text-yellow-900">{data.overdueDebtors}</p>
                    </div>
                </div>

                {/* Debts by Status */}
                <div className="bg-white p-6 rounded-lg border border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">{currentContent.debtsReport.debtsByStatus}</h3>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-4 py-2 text-left font-medium text-gray-700">{currentContent.debtsReport.status}</th>
                                    <th className="px-4 py-2 text-left font-medium text-gray-700">{currentContent.salesReport.amount}</th>
                                    <th className="px-4 py-2 text-left font-medium text-gray-700">العدد</th>
                                    <th className="px-4 py-2 text-left font-medium text-gray-700">{currentContent.financialReport.percentage}</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {data.debtsByStatus.map((debt, index) => (
                                    <tr key={index} className="hover:bg-gray-50">
                                        <td className="px-4 py-3 font-medium">
                                            <span className={`px-2 py-1 rounded-full text-xs ${
                                                debt.status === 'جاري' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                                            }`}>
                                                {debt.status}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3">{formatCurrency(debt.amount)} {currentContent.currency}</td>
                                        <td className="px-4 py-3">{debt.count}</td>
                                        <td className="px-4 py-3">{debt.percentage}%</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Top Debtors */}
                <div className="bg-white p-6 rounded-lg border border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">{currentContent.debtsReport.topDebtors}</h3>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-4 py-2 text-left font-medium text-gray-700">{currentContent.debtsReport.debtorName}</th>
                                    <th className="px-4 py-2 text-left font-medium text-gray-700">{currentContent.debtsReport.debtAmount}</th>
                                    <th className="px-4 py-2 text-left font-medium text-gray-700">{currentContent.debtsReport.dueDate}</th>
                                    <th className="px-4 py-2 text-left font-medium text-gray-700">{currentContent.debtsReport.status}</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {data.topDebtors.map((debtor, index) => (
                                    <tr key={index} className="hover:bg-gray-50">
                                        <td className="px-4 py-3 font-medium">{debtor.name}</td>
                                        <td className="px-4 py-3">{formatCurrency(debtor.amount)} {currentContent.currency}</td>
                                        <td className="px-4 py-3">{debtor.dueDate}</td>
                                        <td className="px-4 py-3">
                                            <span className={`px-2 py-1 rounded-full text-xs ${
                                                debtor.status === 'جاري' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                                            }`}>
                                                {debtor.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Monthly Collection */}
                <div className="bg-white p-6 rounded-lg border border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">{currentContent.debtsReport.monthlyCollection}</h3>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-4 py-2 text-left font-medium text-gray-700">{currentContent.debtsReport.month}</th>
                                    <th className="px-4 py-2 text-left font-medium text-gray-700">{currentContent.debtsReport.collected}</th>
                                    <th className="px-4 py-2 text-left font-medium text-gray-700">{currentContent.debtsReport.target}</th>
                                    <th className="px-4 py-2 text-left font-medium text-gray-700">معدل التحصيل</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {data.monthlyCollection.map((month, index) => (
                                    <tr key={index} className="hover:bg-gray-50">
                                        <td className="px-4 py-3 font-medium">{month.month}</td>
                                        <td className="px-4 py-3">{formatCurrency(month.collected)} {currentContent.currency}</td>
                                        <td className="px-4 py-3">{formatCurrency(month.target)} {currentContent.currency}</td>
                                        <td className="px-4 py-3">
                                            <span className={`px-2 py-1 rounded-full text-xs ${
                                                (month.collected / month.target) >= 0.9 ? 'bg-green-100 text-green-800' :
                                                (month.collected / month.target) >= 0.7 ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'
                                            }`}>
                                                {((month.collected / month.target) * 100).toFixed(1)}%
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
    };

    const renderInstallmentsReport = () => {
        const data = mockData.installments;
        return (
            <div className="space-y-6">
                {/* Summary Cards */}
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                    <div className="bg-indigo-50 p-4 rounded-lg border border-indigo-100">
                        <h3 className="text-sm font-medium text-indigo-600 mb-1">{currentContent.installmentsReport.totalAmount}</h3>
                        <p className="text-2xl font-bold text-indigo-900">{formatCurrency(data.totalAmount)} {currentContent.currency}</p>
                    </div>
                    <div className="bg-green-50 p-4 rounded-lg border border-green-100">
                        <h3 className="text-sm font-medium text-green-600 mb-1">{currentContent.installmentsReport.activeInstallments}</h3>
                        <p className="text-2xl font-bold text-green-900">{data.activeInstallments}</p>
                    </div>
                    <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                        <h3 className="text-sm font-medium text-blue-600 mb-1">{currentContent.installmentsReport.activeCustomers}</h3>
                        <p className="text-2xl font-bold text-blue-900">{data.activeCustomers}</p>
                    </div>
                    <div className="bg-orange-50 p-4 rounded-lg border border-orange-100">
                        <h3 className="text-sm font-medium text-orange-600 mb-1">{currentContent.installmentsReport.upcomingPayments}</h3>
                        <p className="text-2xl font-bold text-orange-900">{formatCurrency(data.upcomingPayments)} {currentContent.currency}</p>
                    </div>
                    <div className="bg-purple-50 p-4 rounded-lg border border-purple-100">
                        <h3 className="text-sm font-medium text-purple-600 mb-1">{currentContent.installmentsReport.averageAmount}</h3>
                        <p className="text-2xl font-bold text-purple-900">{formatCurrency(data.averageAmount)} {currentContent.currency}</p>
                    </div>
                </div>

                {/* Payment Frequency */}
                <div className="bg-white p-6 rounded-lg border border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">{currentContent.installmentsReport.paymentFrequency}</h3>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-4 py-2 text-left font-medium text-gray-700">{currentContent.installmentsReport.frequency}</th>
                                    <th className="px-4 py-2 text-left font-medium text-gray-700">{currentContent.installmentsReport.count}</th>
                                    <th className="px-4 py-2 text-left font-medium text-gray-700">{currentContent.salesReport.amount}</th>
                                    <th className="px-4 py-2 text-left font-medium text-gray-700">{currentContent.financialReport.percentage}</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {data.paymentFrequency.map((freq, index) => (
                                    <tr key={index} className="hover:bg-gray-50">
                                        <td className="px-4 py-3 font-medium">{freq.type}</td>
                                        <td className="px-4 py-3">{freq.count}</td>
                                        <td className="px-4 py-3">{formatCurrency(freq.amount)} {currentContent.currency}</td>
                                        <td className="px-4 py-3">{freq.percentage}%</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Completion Status */}
                <div className="bg-white p-6 rounded-lg border border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">{currentContent.installmentsReport.completionStatus}</h3>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-4 py-2 text-left font-medium text-gray-700">{currentContent.debtsReport.status}</th>
                                    <th className="px-4 py-2 text-left font-medium text-gray-700">{currentContent.installmentsReport.count}</th>
                                    <th className="px-4 py-2 text-left font-medium text-gray-700">{currentContent.salesReport.amount}</th>
                                    <th className="px-4 py-2 text-left font-medium text-gray-700">{currentContent.installmentsReport.completionRate}</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {data.completionStatus.map((status, index) => (
                                    <tr key={index} className="hover:bg-gray-50">
                                        <td className="px-4 py-3 font-medium">
                                            <span className={`px-2 py-1 rounded-full text-xs ${
                                                status.status === 'مكتمل' ? 'bg-green-100 text-green-800' :
                                                status.status === 'جاري' ? 'bg-blue-100 text-blue-800' : 'bg-yellow-100 text-yellow-800'
                                            }`}>
                                                {status.status}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3">{status.count}</td>
                                        <td className="px-4 py-3">{formatCurrency(status.amount)} {currentContent.currency}</td>
                                        <td className="px-4 py-3">{status.completionRate}%</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Top Customers */}
                <div className="bg-white p-6 rounded-lg border border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">{currentContent.installmentsReport.topCustomers}</h3>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-4 py-2 text-left font-medium text-gray-700">{currentContent.customersReport.customerName}</th>
                                    <th className="px-4 py-2 text-left font-medium text-gray-700">{currentContent.installmentsReport.totalInstallments}</th>
                                    <th className="px-4 py-2 text-left font-medium text-gray-700">{currentContent.salesReport.amount}</th>
                                    <th className="px-4 py-2 text-left font-medium text-gray-700">{currentContent.installmentsReport.paidAmount}</th>
                                    <th className="px-4 py-2 text-left font-medium text-gray-700">{currentContent.installmentsReport.remainingAmount}</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {data.topCustomers.map((customer, index) => (
                                    <tr key={index} className="hover:bg-gray-50">
                                        <td className="px-4 py-3 font-medium">{customer.name}</td>
                                        <td className="px-4 py-3">{customer.totalInstallments}</td>
                                        <td className="px-4 py-3">{formatCurrency(customer.totalAmount)} {currentContent.currency}</td>
                                        <td className="px-4 py-3">{formatCurrency(customer.paidAmount)} {currentContent.currency}</td>
                                        <td className="px-4 py-3">{formatCurrency(customer.remainingAmount)} {currentContent.currency}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
    };

    const renderExpensesReport = () => {
        const data = mockData.expenses;
        return (
            <div className="space-y-6">
                {/* Summary Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="bg-red-50 p-4 rounded-lg border border-red-100">
                        <h3 className="text-sm font-medium text-red-600 mb-1">{currentContent.expensesReport.totalExpenses}</h3>
                        <p className="text-2xl font-bold text-red-900">{formatCurrency(data.totalExpenses)} {currentContent.currency}</p>
                    </div>
                    <div className="bg-orange-50 p-4 rounded-lg border border-orange-100">
                        <h3 className="text-sm font-medium text-orange-600 mb-1">{currentContent.expensesReport.fixedExpenses}</h3>
                        <p className="text-2xl font-bold text-orange-900">{formatCurrency(data.fixedExpenses)} {currentContent.currency}</p>
                    </div>
                    <div className="bg-purple-50 p-4 rounded-lg border border-purple-100">
                        <h3 className="text-sm font-medium text-purple-600 mb-1">{currentContent.expensesReport.variableExpenses}</h3>
                        <p className="text-2xl font-bold text-purple-900">{formatCurrency(data.variableExpenses)} {currentContent.currency}</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                        <h3 className="text-sm font-medium text-gray-600 mb-1">{currentContent.expensesReport.budgetVariance}</h3>
                        <p className={`text-2xl font-bold ${data.budgetVariance > 0 ? 'text-red-900' : 'text-green-900'}`}>
                            {data.budgetVariance > 0 ? '+' : ''}{formatCurrency(data.budgetVariance)} {currentContent.currency}
                        </p>
                    </div>
                </div>

                {/* Expense Categories */}
                <div className="bg-white p-6 rounded-lg border border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">{currentContent.expensesReport.expenseCategories}</h3>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-4 py-2 text-left font-medium text-gray-700">{currentContent.expensesReport.category}</th>
                                    <th className="px-4 py-2 text-left font-medium text-gray-700">{currentContent.expensesReport.type}</th>
                                    <th className="px-4 py-2 text-left font-medium text-gray-700">{currentContent.salesReport.amount}</th>
                                    <th className="px-4 py-2 text-left font-medium text-gray-700">{currentContent.expensesReport.budget}</th>
                                    <th className="px-4 py-2 text-left font-medium text-gray-700">{currentContent.expensesReport.variance}</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {data.categories.map((category, index) => (
                                    <tr key={index} className="hover:bg-gray-50">
                                        <td className="px-4 py-3 font-medium">{category.name}</td>
                                        <td className="px-4 py-3">
                                            <span className={`px-2 py-1 rounded-full text-xs ${
                                                category.type === 'ثابت' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
                                            }`}>
                                                {category.type}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3">{formatCurrency(category.amount)} {currentContent.currency}</td>
                                        <td className="px-4 py-3">{formatCurrency(category.budget)} {currentContent.currency}</td>
                                        <td className="px-4 py-3">
                                            <span className={`${category.variance > 0 ? 'text-red-600' : 'text-green-600'}`}>
                                                {category.variance > 0 ? '+' : ''}{formatCurrency(category.variance)} {currentContent.currency}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Monthly Trends */}
                <div className="bg-white p-6 rounded-lg border border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">{currentContent.expensesReport.monthlyTrends}</h3>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-4 py-2 text-left font-medium text-gray-700">{currentContent.debtsReport.month}</th>
                                    <th className="px-4 py-2 text-left font-medium text-gray-700">{currentContent.expensesReport.actualExpenses}</th>
                                    <th className="px-4 py-2 text-left font-medium text-gray-700">{currentContent.expensesReport.budgetedExpenses}</th>
                                    <th className="px-4 py-2 text-left font-medium text-gray-700">{currentContent.expensesReport.variance}</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {data.monthlyTrends.map((month, index) => (
                                    <tr key={index} className="hover:bg-gray-50">
                                        <td className="px-4 py-3 font-medium">{month.month}</td>
                                        <td className="px-4 py-3">{formatCurrency(month.actual)} {currentContent.currency}</td>
                                        <td className="px-4 py-3">{formatCurrency(month.budget)} {currentContent.currency}</td>
                                        <td className="px-4 py-3">
                                            <span className={`${month.variance > 0 ? 'text-red-600' : 'text-green-600'}`}>
                                                {month.variance > 0 ? '+' : ''}{formatCurrency(month.variance)} {currentContent.currency}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
    };

    const renderReportContent = () => {
        switch(selectedReport) {
            case 'sales':
                return renderSalesReport();
            case 'financial':
                return renderFinancialReport();
            case 'customers':
                return renderCustomersReport();
            case 'inventory':
                return renderInventoryReport();
            case 'debts':
                return renderDebtsReport();
            case 'installments':
                return renderInstallmentsReport();
            case 'expenses':
                return renderExpensesReport();
            default:
                return renderSalesReport();
        }
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
                        <div className="flex items-center gap-3">
                            <button
                                onClick={handleExportPDF}
                                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors text-sm"
                            >
                                {currentContent.exportPDF}
                            </button>
                            <button
                                onClick={handleExportExcel}
                                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors text-sm"
                            >
                                {currentContent.exportExcel}
                            </button>
                            <button
                                onClick={handlePrint}
                                className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors text-sm"
                            >
                                {currentContent.printReport}
                            </button>
                        </div>
                    </div>

                    {/* Report Controls */}
                    <div className="bg-gray-50 p-4 rounded-lg">
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                            {/* Report Type */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    نوع التقرير
                                </label>
                                <select
                                    value={selectedReport}
                                    onChange={(e) => setSelectedReport(e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                >
                                    {Object.entries(currentContent.reportTypes).map(([key, value]) => (
                                        <option key={key} value={key}>{value}</option>
                                    ))}
                                </select>
                            </div>

                            {/* Date Range */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    {currentContent.dateRange.label}
                                </label>
                                <select
                                    value={dateRange}
                                    onChange={(e) => setDateRange(e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                >
                                    {Object.entries(currentContent.dateRange).filter(([key]) => key !== 'label').map(([key, value]) => (
                                        <option key={key} value={key}>{value}</option>
                                    ))}
                                </select>
                            </div>

                            {/* Custom Date Range */}
                            {dateRange === 'custom' && (
                                <>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            من تاريخ
                                        </label>
                                        <input
                                            type="date"
                                            value={startDate}
                                            onChange={(e) => setStartDate(e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            إلى تاريخ
                                        </label>
                                        <input
                                            type="date"
                                            value={endDate}
                                            onChange={(e) => setEndDate(e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        />
                                    </div>
                                </>
                            )}

                            {/* Generate Button */}
                            <div className="flex items-end">
                                <button
                                    onClick={handleGenerateReport}
                                    disabled={isGenerating}
                                    className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-blue-400"
                                >
                                    {isGenerating ? currentContent.generating : currentContent.generateReport}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Report Content */}
            <div className="p-4">
                <div className="bg-white rounded-lg border border-gray-200 p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-bold text-gray-900">
                            {currentContent.reportTypes[selectedReport]}
                        </h2>
                        <span className="text-sm text-gray-500">
                            {startDate} - {endDate}
                        </span>
                    </div>

                    {isGenerating ? (
                        <div className="text-center py-12">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                            <p className="mt-4 text-gray-600">{currentContent.generating}</p>
                        </div>
                    ) : (
                        renderReportContent()
                    )}
                </div>
            </div>
        </div>
    );
};

export default ReportsPage;
