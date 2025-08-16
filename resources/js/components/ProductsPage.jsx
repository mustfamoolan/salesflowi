import React, { useState, useEffect } from 'react';
import BackButton from './BackButton';

const ProductsPage = () => {
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
    const [showAddProduct, setShowAddProduct] = useState(false);
    const [showProductDetails, setShowProductDetails] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStock, setFilterStock] = useState('all'); // all, instock, lowstock, outofstock
    const [showAddCategory, setShowAddCategory] = useState(false);
    const [newCategoryName, setNewCategoryName] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');

    // New modals for product actions
    const [showEditProduct, setShowEditProduct] = useState(false);
    const [showAddStock, setShowAddStock] = useState(false);
    const [showSellProduct, setShowSellProduct] = useState(false);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [addStockQuantity, setAddStockQuantity] = useState(0);
    const [saleData, setSaleData] = useState({
        quantity: 1,
        saleType: 'cash', // cash, debt, installment
        customerName: '',
        customerPhone: '',
        downPayment: 0,
        installmentMonths: 1,
        calculationMethod: 'by_amount', // by_amount, by_duration
        frequency: 'monthly', // monthly, biweekly, weekly
        installmentAmount: 0,
        totalInstallments: 1,
        duration: 1,
        startDate: '',
        invoiceNumber: '',
        notes: ''
    });
    const [editProductData, setEditProductData] = useState({});

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

    // Categories data
    const [categories, setCategories] = useState([
        { id: 1, name: 'إلكترونيات', productsCount: 2, color: '#3B82F6' },
        { id: 2, name: 'أثاث', productsCount: 1, color: '#10B981' },
        { id: 3, name: 'ملابس', productsCount: 0, color: '#F59E0B' },
        { id: 4, name: 'كتب', productsCount: 0, color: '#8B5CF6' },
        { id: 5, name: 'رياضة', productsCount: 0, color: '#EF4444' }
    ]);

    // Mock data for products
    const [products, setProducts] = useState([
        {
            id: 1,
            name: 'لابتوب ديل XPS 13',
            category: 'إلكترونيات',
            price: 1200000,
            cost: 1000000,
            quantity: 5,
            minQuantity: 2,
            barcode: '123456789012',
            description: 'لابتوب عالي الأداء للأعمال',
            supplier: 'شركة التقنية المتقدمة',
            lastUpdated: '2025-08-05',
            totalSold: 15,
            image: '/images/laptop.jpg'
        },
        {
            id: 2,
            name: 'هاتف آيفون 15 برو',
            category: 'إلكترونيات',
            price: 1800000,
            cost: 1500000,
            quantity: 0,
            minQuantity: 3,
            barcode: '987654321098',
            description: 'أحدث هاتف من آبل',
            supplier: 'موزع آبل الرسمي',
            lastUpdated: '2025-08-04',
            totalSold: 8,
            image: '/images/iphone.jpg'
        },
        {
            id: 3,
            name: 'طاولة مكتب خشبية',
            category: 'أثاث',
            price: 350000,
            cost: 250000,
            quantity: 1,
            minQuantity: 2,
            barcode: '456789012345',
            description: 'طاولة مكتب من الخشب الطبيعي',
            supplier: 'معرض الأثاث الحديث',
            lastUpdated: '2025-08-03',
            totalSold: 12,
            image: '/images/desk.jpg'
        }
    ]);

    const [newProduct, setNewProduct] = useState({
        name: '',
        category: '',
        price: 0,
        cost: 0,
        quantity: 0,
        minQuantity: 0,
        barcode: '',
        description: '',
        supplier: ''
    });

    const content = {
        ar: {
            title: 'إدارة المنتجات',
            subtitle: 'قائمة المنتجات وإدارة المخزون',
            search: 'البحث عن منتج...',
            addProduct: 'إضافة منتج جديد',
            totalProducts: 'إجمالي المنتجات',
            inStock: 'متوفر',
            lowStock: 'مخزون منخفض',
            outOfStock: 'نفذ المخزون',
            categories: 'الأقسام',
            addCategory: 'إضافة قسم',
            filters: {
                all: 'الكل',
                instock: 'متوفر',
                lowstock: 'مخزون منخفض',
                outofstock: 'نفذ المخزون'
            },
            productInfo: {
                name: 'اسم المنتج',
                category: 'الفئة',
                price: 'سعر البيع',
                cost: 'سعر التكلفة',
                quantity: 'الكمية',
                minQuantity: 'الحد الأدنى',
                barcode: 'الباركود',
                description: 'الوصف',
                supplier: 'المورد',
                lastUpdated: 'آخر تحديث',
                totalSold: 'إجمالي المبيعات',
                profit: 'الربح'
            },
            actions: {
                view: 'عرض',
                edit: 'تعديل',
                delete: 'حذف',
                addStock: 'إضافة مخزون',
                sellProduct: 'بيع المنتج',
                addInstallment: 'إضافة تقسيط'
            },
            form: {
                title: 'بيانات المنتج',
                namePlaceholder: 'اسم المنتج',
                categoryPlaceholder: 'اختر القسم',
                selectCategory: 'اختر القسم',
                pricePlaceholder: 'سعر البيع',
                costPlaceholder: 'سعر التكلفة',
                quantityPlaceholder: 'الكمية الحالية',
                minQuantityPlaceholder: 'الحد الأدنى للمخزون',
                barcodePlaceholder: 'رقم الباركود',
                descriptionPlaceholder: 'وصف المنتج',
                supplierPlaceholder: 'اسم المورد',
                save: 'حفظ',
                cancel: 'إلغاء'
            },
            categoryForm: {
                title: 'إضافة قسم جديد',
                namePlaceholder: 'اسم القسم',
                save: 'حفظ',
                cancel: 'إلغاء'
            },
            addStockForm: {
                title: 'إضافة مخزون',
                currentStock: 'المخزون الحالي',
                addQuantity: 'الكمية المُضافة',
                newTotal: 'إجمالي جديد',
                quantityPlaceholder: 'أدخل الكمية',
                add: 'إضافة',
                cancel: 'إلغاء'
            },
            sellForm: {
                title: 'بيع المنتج',
                quantity: 'الكمية',
                saleType: 'نوع البيع',
                cash: 'نقدي',
                debt: 'دين',
                installment: 'تقسيط',
                customer: 'اختر العميل',
                customerSearch: 'ابحث عن عميل...',
                customerName: 'اسم العميل',
                customerPhone: 'رقم الهاتف',
                downPayment: 'الدفعة المقدمة',
                installmentMonths: 'عدد الأشهر',
                calculationMethod: 'طريقة الحساب',
                byAmount: 'حسب مبلغ القسط',
                byDuration: 'حسب المدة',
                frequency: 'تردد الدفع',
                installmentAmount: 'مبلغ القسط',
                totalInstallments: 'عدد الأقساط',
                duration: 'المدة',
                startDate: 'تاريخ البداية',
                invoiceNumber: 'رقم الفاتورة',
                autoGenerate: 'توليد تلقائي',
                notes: 'ملاحظات',
                total: 'الإجمالي',
                sell: 'بيع',
                cancel: 'إلغاء'
            },
            deleteConfirm: {
                title: 'تأكيد الحذف',
                message: 'هل أنت متأكد من حذف هذا المنتج؟',
                warning: 'هذا الإجراء لا يمكن التراجع عنه',
                delete: 'حذف',
                cancel: 'إلغاء'
            },
            editForm: {
                title: 'تعديل المنتج',
                save: 'حفظ التغييرات',
                cancel: 'إلغاء'
            },
            createInstallment: {
                title: 'إضافة تقسيط جديد',
                customer: 'العميل',
                customerSearch: 'ابحث عن عميل...',
                totalAmount: 'المبلغ الإجمالي',
                downPayment: 'الدفعة المقدمة',
                remainingAmount: 'المبلغ المتبقي للتقسيط',
                calculationMethod: 'طريقة الحساب',
                byAmount: 'حسب مبلغ القسط',
                byDuration: 'حسب المدة',
                frequency: 'تردد الدفع',
                installmentAmount: 'مبلغ القسط',
                totalInstallments: 'عدد الأقساط',
                duration: 'المدة',
                months: 'أشهر',
                weeks: 'أسابيع',
                startDate: 'تاريخ البداية',
                invoiceNumber: 'رقم الفاتورة',
                autoGenerate: 'توليد تلقائي',
                notes: 'ملاحظات',
                save: 'حفظ التقسيط',
                cancel: 'إلغاء'
            },
            frequency: {
                monthly: 'شهري',
                biweekly: 'كل أسبوعين',
                weekly: 'أسبوعي'
            },
            currency: 'د.ع',
            noProducts: 'لا يوجد منتجات',
            addFirstProduct: 'أضف أول منتج لك',
            stockStatus: {
                inStock: 'متوفر',
                lowStock: 'مخزون منخفض',
                outOfStock: 'نفذ المخزون'
            }
        },
        en: {
            title: 'Product Management',
            subtitle: 'Product list and inventory management',
            search: 'Search for product...',
            addProduct: 'Add New Product',
            totalProducts: 'Total Products',
            inStock: 'In Stock',
            lowStock: 'Low Stock',
            outOfStock: 'Out of Stock',
            categories: 'Categories',
            addCategory: 'Add Category',
            filters: {
                all: 'All',
                instock: 'In Stock',
                lowstock: 'Low Stock',
                outofstock: 'Out of Stock'
            },
            productInfo: {
                name: 'Product Name',
                category: 'Category',
                price: 'Selling Price',
                cost: 'Cost Price',
                quantity: 'Quantity',
                minQuantity: 'Min Quantity',
                barcode: 'Barcode',
                description: 'Description',
                supplier: 'Supplier',
                lastUpdated: 'Last Updated',
                totalSold: 'Total Sold',
                profit: 'Profit'
            },
            actions: {
                view: 'View',
                edit: 'Edit',
                delete: 'Delete',
                addStock: 'Add Stock',
                sellProduct: 'Sell Product',
                addInstallment: 'Add Installment'
            },
            form: {
                title: 'Product Data',
                namePlaceholder: 'Product Name',
                categoryPlaceholder: 'Select Category',
                selectCategory: 'Select Category',
                pricePlaceholder: 'Selling Price',
                costPlaceholder: 'Cost Price',
                quantityPlaceholder: 'Current Quantity',
                minQuantityPlaceholder: 'Minimum Stock Level',
                barcodePlaceholder: 'Barcode Number',
                descriptionPlaceholder: 'Product Description',
                supplierPlaceholder: 'Supplier Name',
                save: 'Save',
                cancel: 'Cancel'
            },
            categoryForm: {
                title: 'Add New Category',
                namePlaceholder: 'Category Name',
                save: 'Save',
                cancel: 'Cancel'
            },
            addStockForm: {
                title: 'Add Stock',
                currentStock: 'Current Stock',
                addQuantity: 'Add Quantity',
                newTotal: 'New Total',
                quantityPlaceholder: 'Enter quantity',
                add: 'Add',
                cancel: 'Cancel'
            },
            sellForm: {
                title: 'Sell Product',
                quantity: 'Quantity',
                saleType: 'Sale Type',
                cash: 'Cash',
                debt: 'Debt',
                installment: 'Installment',
                customer: 'Select Customer',
                customerSearch: 'Search for customer...',
                customerName: 'Customer Name',
                customerPhone: 'Phone Number',
                downPayment: 'Down Payment',
                installmentMonths: 'Months',
                calculationMethod: 'Calculation Method',
                byAmount: 'By Installment Amount',
                byDuration: 'By Duration',
                frequency: 'Payment Frequency',
                installmentAmount: 'Installment Amount',
                totalInstallments: 'Total Installments',
                duration: 'Duration',
                startDate: 'Start Date',
                invoiceNumber: 'Invoice Number',
                autoGenerate: 'Auto Generate',
                notes: 'Notes',
                total: 'Total',
                sell: 'Sell',
                cancel: 'Cancel'
            },
            deleteConfirm: {
                title: 'Confirm Delete',
                message: 'Are you sure you want to delete this product?',
                warning: 'This action cannot be undone',
                delete: 'Delete',
                cancel: 'Cancel'
            },
            editForm: {
                title: 'Edit Product',
                save: 'Save Changes',
                cancel: 'Cancel'
            },
            createInstallment: {
                title: 'Add New Installment',
                customer: 'Customer',
                customerSearch: 'Search for customer...',
                totalAmount: 'Total Amount',
                downPayment: 'Down Payment',
                remainingAmount: 'Remaining Amount for Installment',
                calculationMethod: 'Calculation Method',
                byAmount: 'By Installment Amount',
                byDuration: 'By Duration',
                frequency: 'Payment Frequency',
                installmentAmount: 'Installment Amount',
                totalInstallments: 'Total Installments',
                duration: 'Duration',
                months: 'months',
                weeks: 'weeks',
                startDate: 'Start Date',
                invoiceNumber: 'Invoice Number',
                autoGenerate: 'Auto Generate',
                notes: 'Notes',
                save: 'Save Installment',
                cancel: 'Cancel'
            },
            frequency: {
                monthly: 'Monthly',
                biweekly: 'Biweekly',
                weekly: 'Weekly'
            },
            currency: 'IQD',
            noProducts: 'No products',
            addFirstProduct: 'Add your first product',
            stockStatus: {
                inStock: 'In Stock',
                lowStock: 'Low Stock',
                outOfStock: 'Out of Stock'
            }
        }
    };

    const currentContent = isArabic ? content.ar : content.en;

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat(isArabic ? 'ar-IQ' : 'en-US').format(amount);
    };

    const getStockStatus = (product) => {
        if (product.quantity === 0) return 'outOfStock';
        if (product.quantity <= product.minQuantity) return 'lowStock';
        return 'inStock';
    };

    const getStockColor = (product) => {
        const status = getStockStatus(product);
        if (status === 'outOfStock') return 'text-red-600';
        if (status === 'lowStock') return 'text-yellow-600';
        return 'text-green-600';
    };

    const getStockIcon = (product) => {
        const status = getStockStatus(product);
        if (status === 'outOfStock') return '❌';
        if (status === 'lowStock') return '⚠️';
        return '✅';
    };

    const filteredProducts = products.filter(product => {
        const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                             product.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
                             product.barcode.includes(searchTerm);

        const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;

        if (filterStock === 'all') return matchesSearch && matchesCategory;

        const status = getStockStatus(product);
        return matchesSearch && matchesCategory && filterStock === status;
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewProduct(prev => ({
            ...prev,
            [name]: name === 'price' || name === 'cost' || name === 'quantity' || name === 'minQuantity'
                   ? parseFloat(value) || 0
                   : value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const product = {
            ...newProduct,
            id: products.length + 1,
            lastUpdated: new Date().toISOString().split('T')[0],
            totalSold: 0,
            image: '/images/default-product.jpg'
        };

        setProducts([...products, product]);
        setNewProduct({
            name: '',
            category: '',
            price: 0,
            cost: 0,
            quantity: 0,
            minQuantity: 0,
            barcode: '',
            description: '',
            supplier: ''
        });
        setShowAddProduct(false);
    };

    const handleProductClick = (product) => {
        setSelectedProduct(product);
        setShowProductDetails(true);
    };

    const calculateProfit = (product) => {
        return (product.price - product.cost) * product.totalSold;
    };

    // دوال إدارة الأقسام
    const handleAddCategory = (e) => {
        e.preventDefault();
        if (newCategoryName.trim()) {
            const newCategory = {
                id: Date.now(),
                name: newCategoryName.trim(),
                productsCount: 0,
                color: `#${Math.floor(Math.random()*16777215).toString(16)}`
            };
            setCategories([...categories, newCategory]);
            setNewCategoryName('');
            setShowAddCategory(false);
        }
    };

    const updateCategoryProductCount = () => {
        const updatedCategories = categories.map(category => ({
            ...category,
            productsCount: products.filter(product => product.category === category.name).length
        }));
        setCategories(updatedCategories);
    };

    // تحديث عدد المنتجات في الأقسام عند تغيير المنتجات
    useEffect(() => {
        updateCategoryProductCount();
    }, [products]);

    // إغلاق قائمة العملاء عند النقر خارجها
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (showCustomerDropdown && !event.target.closest('.customer-dropdown-container')) {
                setShowCustomerDropdown(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [showCustomerDropdown]);

    // وظائف الأزرار الجديدة
    const handleEditProduct = () => {
        setEditProductData({ ...selectedProduct });
        setShowEditProduct(true);
        setShowProductDetails(false);
    };

    const handleAddStock = () => {
        setAddStockQuantity(0);
        setShowAddStock(true);
        setShowProductDetails(false);
    };

    const handleSellProduct = () => {
        setSaleData({
            quantity: 1,
            saleType: 'cash',
            customerName: '',
            customerPhone: '',
            downPayment: 0,
            installmentMonths: 1,
            calculationMethod: 'by_amount',
            frequency: 'monthly',
            installmentAmount: 0,
            totalInstallments: 1,
            duration: 1,
            startDate: new Date().toISOString().split('T')[0],
            invoiceNumber: '',
            notes: ''
        });
        setCustomerSearchTerm('');
        setShowCustomerDropdown(false);
        setShowSellProduct(true);
        setShowProductDetails(false);
    };

    const handleDeleteProduct = () => {
        setShowDeleteConfirm(true);
        setShowProductDetails(false);
    };

    const confirmDeleteProduct = () => {
        setProducts(products.filter(product => product.id !== selectedProduct.id));
        setShowDeleteConfirm(false);
        setSelectedProduct(null);
    };

    const saveEditProduct = (e) => {
        e.preventDefault();
        setProducts(products.map(product =>
            product.id === selectedProduct.id ? editProductData : product
        ));
        setShowEditProduct(false);
        setSelectedProduct(null);
    };

    const saveAddStock = (e) => {
        e.preventDefault();
        if (addStockQuantity > 0) {
            setProducts(products.map(product =>
                product.id === selectedProduct.id
                    ? { ...product, quantity: product.quantity + parseInt(addStockQuantity) }
                    : product
            ));
            setShowAddStock(false);
            setSelectedProduct(null);
        }
    };

    const processSale = (e) => {
        e.preventDefault();

        // التحقق من وجود معلومات العميل للديون والأقساط
        if ((saleData.saleType === 'debt' || saleData.saleType === 'installment') && !saleData.customerName) {
            alert('يرجى اختيار العميل أولاً');
            return;
        }

        // التحقق من صحة بيانات الأقساط
        if (saleData.saleType === 'installment') {
            if (saleData.calculationMethod === 'by_amount' && saleData.installmentAmount <= 0) {
                alert('يرجى إدخال مبلغ القسط');
                return;
            }
            if (saleData.calculationMethod === 'by_duration' && saleData.duration <= 0) {
                alert('يرجى إدخال مدة التقسيط');
                return;
            }
            if (!saleData.startDate) {
                alert('يرجى اختيار تاريخ البداية');
                return;
            }
        }

        if (saleData.quantity > 0 && saleData.quantity <= selectedProduct.quantity) {
            // تحديث كمية المنتج
            setProducts(products.map(product =>
                product.id === selectedProduct.id
                    ? {
                        ...product,
                        quantity: product.quantity - parseInt(saleData.quantity),
                        totalSold: product.totalSold + parseInt(saleData.quantity)
                    }
                    : product
            ));

            // إنشاء رسالة النجاح
            let successMessage = `تم بيع ${saleData.quantity} من ${selectedProduct.name} بنجاح!`;
            if (saleData.saleType === 'debt') {
                successMessage += `\nالعميل: ${saleData.customerName}`;
                successMessage += `\nنوع البيع: دين`;
                successMessage += `\nالمبلغ: ${formatCurrency(calculateSaleTotal())} ${currentContent.currency}`;
            } else if (saleData.saleType === 'installment') {
                successMessage += `\nالعميل: ${saleData.customerName}`;
                successMessage += `\nنوع البيع: تقسيط`;
                successMessage += `\nإجمالي المبلغ: ${formatCurrency(calculateSaleTotal())} ${currentContent.currency}`;
                successMessage += `\nالدفعة المقدمة: ${formatCurrency(saleData.downPayment)} ${currentContent.currency}`;
                successMessage += `\nمبلغ القسط: ${formatCurrency(saleData.installmentAmount)} ${currentContent.currency}`;
                successMessage += `\nعدد الأقساط: ${saleData.totalInstallments}`;
                successMessage += `\nتردد الدفع: ${currentContent.frequency[saleData.frequency]}`;

                // هنا يمكن إضافة منطق لحفظ التقسيط في قاعدة البيانات
                console.log('بيانات التقسيط:', {
                    customerName: saleData.customerName,
                    customerPhone: saleData.customerPhone,
                    productName: selectedProduct.name,
                    quantity: saleData.quantity,
                    totalAmount: calculateSaleTotal(),
                    downPayment: saleData.downPayment,
                    installmentAmount: saleData.installmentAmount,
                    totalInstallments: saleData.totalInstallments,
                    frequency: saleData.frequency,
                    startDate: saleData.startDate,
                    invoiceNumber: saleData.invoiceNumber,
                    notes: saleData.notes
                });
            }

            alert(successMessage);
            setShowSellProduct(false);
            setSelectedProduct(null);
            setCustomerSearchTerm('');
        }
    };

    const handleEditInputChange = (e) => {
        const { name, value } = e.target;
        setEditProductData(prev => ({
            ...prev,
            [name]: name === 'price' || name === 'cost' || name === 'quantity' || name === 'minQuantity'
                   ? parseFloat(value) || 0
                   : value
        }));
    };

    const handleSaleInputChange = (e) => {
        const { name, value } = e.target;
        setSaleData(prev => ({
            ...prev,
            [name]: name === 'quantity' || name === 'downPayment' || name === 'installmentMonths'
                   ? parseInt(value) || 0
                   : value
        }));
    };

    const calculateSaleTotal = () => {
        return selectedProduct ? selectedProduct.price * saleData.quantity : 0;
    };

    // دوال التعامل مع العملاء
    const filteredCustomers = customers.filter(customer =>
        customer.name.toLowerCase().includes(customerSearchTerm.toLowerCase())
    );

    const handleCustomerSelect = (customer) => {
        setSaleData(prev => ({
            ...prev,
            customerName: customer.name,
            customerPhone: customer.phone
        }));
        setCustomerSearchTerm(customer.name);
        setShowCustomerDropdown(false);
    };

    const generateInvoiceNumber = () => {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');
        const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
        return `INV-${year}${month}${day}-${random}`;
    };

    // حساب تفاصيل الأقساط للبيع
    useEffect(() => {
        if (saleData.saleType === 'installment' && selectedProduct) {
            const totalAmount = selectedProduct.price * saleData.quantity;
            const remainingAmount = totalAmount - saleData.downPayment;

            if (saleData.calculationMethod === 'by_amount' && saleData.installmentAmount > 0) {
                const totalInstallments = Math.ceil(remainingAmount / saleData.installmentAmount);
                setSaleData(prev => ({
                    ...prev,
                    totalInstallments: totalInstallments
                }));
            } else if (saleData.calculationMethod === 'by_duration' && saleData.duration > 0) {
                const installmentAmount = remainingAmount / saleData.duration;
                setSaleData(prev => ({
                    ...prev,
                    installmentAmount: installmentAmount,
                    totalInstallments: saleData.duration
                }));
            }
        }
    }, [saleData.saleType, saleData.downPayment, saleData.installmentAmount, saleData.duration, saleData.calculationMethod, selectedProduct?.price, saleData.quantity]);

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
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                                    </svg>
                                </div>
                                <div className={`${isArabic ? 'mr-3' : 'ml-3'} flex-1 min-w-0`}>
                                    <p className="text-blue-600 text-xs font-medium truncate">
                                        {currentContent.totalProducts}
                                    </p>
                                    <p className="text-blue-900 text-lg font-bold">
                                        {products.length}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-green-50 p-3 rounded-lg border border-green-100">
                            <div className="flex items-center">
                                <div className="p-2 bg-green-500 rounded-lg">
                                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <div className={`${isArabic ? 'mr-3' : 'ml-3'} flex-1 min-w-0`}>
                                    <p className="text-green-600 text-xs font-medium truncate">
                                        {currentContent.inStock}
                                    </p>
                                    <p className="text-green-900 text-lg font-bold">
                                        {products.filter(p => getStockStatus(p) === 'inStock').length}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-yellow-50 p-3 rounded-lg border border-yellow-100">
                            <div className="flex items-center">
                                <div className="p-2 bg-yellow-500 rounded-lg">
                                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.664-.833-2.464 0L5.35 16.5c-.77.833.192 2.5 1.732 2.5z" />
                                    </svg>
                                </div>
                                <div className={`${isArabic ? 'mr-3' : 'ml-3'} flex-1 min-w-0`}>
                                    <p className="text-yellow-600 text-xs font-medium truncate">
                                        {currentContent.lowStock}
                                    </p>
                                    <p className="text-yellow-900 text-lg font-bold">
                                        {products.filter(p => getStockStatus(p) === 'lowStock').length}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-red-50 p-3 rounded-lg border border-red-100">
                            <div className="flex items-center">
                                <div className="p-2 bg-red-500 rounded-lg">
                                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </div>
                                <div className={`${isArabic ? 'mr-3' : 'ml-3'} flex-1 min-w-0`}>
                                    <p className="text-red-600 text-xs font-medium truncate">
                                        {currentContent.outOfStock}
                                    </p>
                                    <p className="text-red-900 text-lg font-bold">
                                        {products.filter(p => getStockStatus(p) === 'outOfStock').length}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Categories Slider */}
                    <div className="mt-4">
                        <div className="flex items-center gap-3 overflow-x-auto pb-2" style={{scrollbarWidth: 'none', msOverflowStyle: 'none'}}>
                            {/* All Categories Button */}
                            <button
                                onClick={() => setSelectedCategory('all')}
                                className={`flex-shrink-0 px-4 py-2 rounded-full border transition-colors ${
                                    selectedCategory === 'all'
                                        ? 'bg-blue-600 text-white border-blue-600'
                                        : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                                }`}
                            >
                                {currentContent.filters.all}
                            </button>

                            {/* Category Buttons */}
                            {categories.map(category => (
                                <button
                                    key={category.id}
                                    onClick={() => setSelectedCategory(category.name)}
                                    className={`flex-shrink-0 px-4 py-2 rounded-full border transition-colors flex items-center gap-2 ${
                                        selectedCategory === category.name
                                            ? 'text-white border-transparent'
                                            : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                                    }`}
                                    style={{
                                        backgroundColor: selectedCategory === category.name ? category.color : 'white',
                                        borderColor: selectedCategory === category.name ? category.color : '#d1d5db'
                                    }}
                                >
                                    <div
                                        className="w-3 h-3 rounded-full"
                                        style={{ backgroundColor: selectedCategory === category.name ? 'white' : category.color }}
                                    ></div>
                                    {category.name}
                                    <span className={`text-xs px-2 py-1 rounded-full ${
                                        selectedCategory === category.name
                                            ? 'bg-white bg-opacity-20 text-white'
                                            : 'bg-gray-100 text-gray-600'
                                    }`}>
                                        {category.productsCount}
                                    </span>
                                </button>
                            ))}

                            {/* Add Category Button */}
                            <button
                                onClick={() => setShowAddCategory(true)}
                                className="flex-shrink-0 px-4 py-2 rounded-full border-2 border-dashed border-gray-300 text-gray-500 hover:border-green-400 hover:text-green-600 transition-colors flex items-center gap-2"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                </svg>
                                {currentContent.addCategory}
                            </button>
                        </div>
                    </div>

                    {/* Search and Filters */}
                    <div className="flex flex-col sm:flex-row gap-3 mt-4">
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
                            value={filterStock}
                            onChange={(e) => setFilterStock(e.target.value)}
                            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                            <option value="all">{currentContent.filters.all}</option>
                            <option value="inStock">{currentContent.filters.instock}</option>
                            <option value="lowStock">{currentContent.filters.lowstock}</option>
                            <option value="outOfStock">{currentContent.filters.outofstock}</option>
                        </select>

                        <button
                            onClick={() => setShowAddProduct(true)}
                            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center"
                        >
                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                            </svg>
                            {currentContent.addProduct}
                        </button>
                    </div>
                </div>
            </div>

            {/* Product List */}
            <div className="p-4">
                {filteredProducts.length === 0 ? (
                    <div className="text-center py-12">
                        <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                        </svg>
                        <h3 className="mt-2 text-sm font-medium text-gray-900">{currentContent.noProducts}</h3>
                        <p className="mt-1 text-sm text-gray-500">{currentContent.addFirstProduct}</p>
                        <div className="mt-6">
                            <button
                                onClick={() => setShowAddProduct(true)}
                                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center mx-auto"
                            >
                                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                </svg>
                                {currentContent.addProduct}
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {filteredProducts.map(product => (
                            <div
                                key={product.id}
                                onClick={() => handleProductClick(product)}
                                className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md hover:border-blue-300 transition-all duration-200 cursor-pointer p-4"
                            >
                                <div className="flex items-center justify-between">
                                    {/* Right Side - Product Info */}
                                    <div className="flex-1">
                                        <h3 className="font-bold text-lg text-gray-900 mb-2">{product.name}</h3>
                                        <span className="inline-block px-3 py-1 bg-blue-50 text-blue-700 text-xs rounded-full font-medium mb-3">
                                            {product.category}
                                        </span>

                                        <div className="flex items-center gap-2 mb-3">
                                            <span className={`text-sm ${getStockColor(product)}`}>{getStockIcon(product)}</span>
                                            <span className={`text-sm font-medium ${getStockColor(product)}`}>
                                                {product.quantity} {currentContent.stockStatus[getStockStatus(product)]}
                                            </span>
                                        </div>

                                        <div className="text-xs text-gray-500">
                                            {isArabic ? 'الباركود:' : 'Barcode:'} {product.barcode}
                                        </div>
                                    </div>

                                    {/* Left Side - Price and Action */}
                                    <div className="text-center">
                                        <div className="text-xl font-bold text-gray-900 mb-2">
                                            {formatCurrency(product.price)}
                                        </div>
                                        <div className="text-xs text-gray-500 mb-3">
                                            {currentContent.currency}
                                        </div>
                                        <button className="bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700 transition-colors text-xs font-medium">
                                            {currentContent.actions.view}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Add Product Modal */}
            {showAddProduct && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-screen overflow-y-auto">
                        <div className="p-6">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-xl font-bold text-gray-900">
                                    {currentContent.form.title}
                                </h2>
                                <button
                                    onClick={() => setShowAddProduct(false)}
                                    className="text-gray-400 hover:text-gray-600"
                                >
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            {currentContent.productInfo.name} *
                                        </label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={newProduct.name}
                                            onChange={handleInputChange}
                                            placeholder={currentContent.form.namePlaceholder}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            {currentContent.productInfo.category} *
                                        </label>
                                        <select
                                            name="category"
                                            value={newProduct.category}
                                            onChange={handleInputChange}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            required
                                        >
                                            <option value="">{currentContent.form.selectCategory}</option>
                                            {categories.map(category => (
                                                <option key={category.id} value={category.name}>
                                                    {category.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            {currentContent.productInfo.price} *
                                        </label>
                                        <input
                                            type="number"
                                            name="price"
                                            value={newProduct.price}
                                            onChange={handleInputChange}
                                            placeholder={currentContent.form.pricePlaceholder}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            min="0"
                                            step="0.01"
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            {currentContent.productInfo.cost}
                                        </label>
                                        <input
                                            type="number"
                                            name="cost"
                                            value={newProduct.cost}
                                            onChange={handleInputChange}
                                            placeholder={currentContent.form.costPlaceholder}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            min="0"
                                            step="0.01"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            {currentContent.productInfo.quantity} *
                                        </label>
                                        <input
                                            type="number"
                                            name="quantity"
                                            value={newProduct.quantity}
                                            onChange={handleInputChange}
                                            placeholder={currentContent.form.quantityPlaceholder}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            min="0"
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            {currentContent.productInfo.minQuantity}
                                        </label>
                                        <input
                                            type="number"
                                            name="minQuantity"
                                            value={newProduct.minQuantity}
                                            onChange={handleInputChange}
                                            placeholder={currentContent.form.minQuantityPlaceholder}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            min="0"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            {currentContent.productInfo.barcode}
                                        </label>
                                        <input
                                            type="text"
                                            name="barcode"
                                            value={newProduct.barcode}
                                            onChange={handleInputChange}
                                            placeholder={currentContent.form.barcodePlaceholder}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            {currentContent.productInfo.supplier}
                                        </label>
                                        <input
                                            type="text"
                                            name="supplier"
                                            value={newProduct.supplier}
                                            onChange={handleInputChange}
                                            placeholder={currentContent.form.supplierPlaceholder}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        {currentContent.productInfo.description}
                                    </label>
                                    <textarea
                                        name="description"
                                        value={newProduct.description}
                                        onChange={handleInputChange}
                                        placeholder={currentContent.form.descriptionPlaceholder}
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
                                        onClick={() => setShowAddProduct(false)}
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

            {/* Product Details Modal */}
            {showProductDetails && selectedProduct && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl">
                        <div className="p-6">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-xl font-bold text-gray-900">
                                    {selectedProduct.name}
                                </h2>
                                <button
                                    onClick={() => setShowProductDetails(false)}
                                    className="text-gray-400 hover:text-gray-600"
                                >
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>

                            <div className="grid grid-cols-2 gap-4 mb-6">
                                <div>
                                    <p className="text-sm text-gray-500">{currentContent.productInfo.category}</p>
                                    <p className="font-semibold">{selectedProduct.category}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">{currentContent.productInfo.price}</p>
                                    <p className="font-semibold">{formatCurrency(selectedProduct.price)} {currentContent.currency}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">{currentContent.productInfo.cost}</p>
                                    <p className="font-semibold">{formatCurrency(selectedProduct.cost)} {currentContent.currency}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">{currentContent.productInfo.quantity}</p>
                                    <p className={`font-semibold ${getStockColor(selectedProduct)}`}>
                                        {selectedProduct.quantity} {getStockIcon(selectedProduct)}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">{currentContent.productInfo.minQuantity}</p>
                                    <p className="font-semibold">{selectedProduct.minQuantity}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">{currentContent.productInfo.barcode}</p>
                                    <p className="font-semibold font-mono">{selectedProduct.barcode}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">{currentContent.productInfo.totalSold}</p>
                                    <p className="font-semibold">{selectedProduct.totalSold}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">{currentContent.productInfo.profit}</p>
                                    <p className="font-semibold text-green-600">
                                        {formatCurrency(calculateProfit(selectedProduct))} {currentContent.currency}
                                    </p>
                                </div>
                            </div>

                            {selectedProduct.description && (
                                <div className="mb-6">
                                    <p className="text-sm text-gray-500 mb-1">{currentContent.productInfo.description}</p>
                                    <p className="text-gray-700">{selectedProduct.description}</p>
                                </div>
                            )}

                            <div className="flex gap-2 flex-wrap">
                                <button
                                    onClick={handleEditProduct}
                                    className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors text-sm"
                                >
                                    {currentContent.actions.edit}
                                </button>
                                <button
                                    onClick={handleAddStock}
                                    className="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors text-sm"
                                >
                                    {currentContent.actions.addStock}
                                </button>
                                <button
                                    onClick={handleSellProduct}
                                    className="bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors text-sm"
                                >
                                    {currentContent.actions.sellProduct}
                                </button>
                                <button
                                    onClick={handleDeleteProduct}
                                    className="bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-colors text-sm"
                                >
                                    {currentContent.actions.delete}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Add Category Modal */}
            {showAddCategory && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
                        <div className="p-6">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-xl font-bold text-gray-900">
                                    {currentContent.categoryForm.title}
                                </h2>
                                <button
                                    onClick={() => {
                                        setShowAddCategory(false);
                                        setNewCategoryName('');
                                    }}
                                    className="text-gray-400 hover:text-gray-600"
                                >
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>

                            <form onSubmit={handleAddCategory} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        اسم القسم *
                                    </label>
                                    <input
                                        type="text"
                                        value={newCategoryName}
                                        onChange={(e) => setNewCategoryName(e.target.value)}
                                        placeholder={currentContent.categoryForm.namePlaceholder}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        required
                                    />
                                </div>

                                <div className="flex gap-3 pt-4">
                                    <button
                                        type="submit"
                                        className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors"
                                    >
                                        {currentContent.categoryForm.save}
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setShowAddCategory(false);
                                            setNewCategoryName('');
                                        }}
                                        className="flex-1 bg-gray-200 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors"
                                    >
                                        {currentContent.categoryForm.cancel}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}

            {/* Edit Product Modal */}
            {showEditProduct && selectedProduct && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-screen overflow-y-auto">
                        <div className="p-6">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-xl font-bold text-gray-900">
                                    {currentContent.editForm.title}
                                </h2>
                                <button
                                    onClick={() => setShowEditProduct(false)}
                                    className="text-gray-400 hover:text-gray-600"
                                >
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>

                            <form onSubmit={saveEditProduct} className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            {currentContent.productInfo.name} *
                                        </label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={editProductData.name || ''}
                                            onChange={handleEditInputChange}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            {currentContent.productInfo.category} *
                                        </label>
                                        <select
                                            name="category"
                                            value={editProductData.category || ''}
                                            onChange={handleEditInputChange}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            required
                                        >
                                            {categories.map(category => (
                                                <option key={category.id} value={category.name}>
                                                    {category.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            {currentContent.productInfo.price} *
                                        </label>
                                        <input
                                            type="number"
                                            name="price"
                                            value={editProductData.price || 0}
                                            onChange={handleEditInputChange}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            min="0"
                                            step="0.01"
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            {currentContent.productInfo.cost}
                                        </label>
                                        <input
                                            type="number"
                                            name="cost"
                                            value={editProductData.cost || 0}
                                            onChange={handleEditInputChange}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            min="0"
                                            step="0.01"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            {currentContent.productInfo.quantity} *
                                        </label>
                                        <input
                                            type="number"
                                            name="quantity"
                                            value={editProductData.quantity || 0}
                                            onChange={handleEditInputChange}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            min="0"
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            {currentContent.productInfo.minQuantity}
                                        </label>
                                        <input
                                            type="number"
                                            name="minQuantity"
                                            value={editProductData.minQuantity || 0}
                                            onChange={handleEditInputChange}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            min="0"
                                        />
                                    </div>
                                </div>

                                <div className="flex gap-3 pt-4">
                                    <button
                                        type="submit"
                                        className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
                                    >
                                        {currentContent.editForm.save}
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setShowEditProduct(false)}
                                        className="flex-1 bg-gray-200 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors"
                                    >
                                        {currentContent.editForm.cancel}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}

            {/* Add Stock Modal */}
            {showAddStock && selectedProduct && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
                        <div className="p-6">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-xl font-bold text-gray-900">
                                    {currentContent.addStockForm.title}
                                </h2>
                                <button
                                    onClick={() => setShowAddStock(false)}
                                    className="text-gray-400 hover:text-gray-600"
                                >
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>

                            <div className="mb-4 p-4 bg-gray-50 rounded-lg">
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-sm text-gray-600">{currentContent.addStockForm.currentStock}:</span>
                                    <span className="font-bold">{selectedProduct.quantity}</span>
                                </div>
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-sm text-gray-600">{currentContent.addStockForm.addQuantity}:</span>
                                    <span className="font-bold">{addStockQuantity}</span>
                                </div>
                                <hr className="my-2" />
                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-gray-600">{currentContent.addStockForm.newTotal}:</span>
                                    <span className="font-bold text-green-600">{selectedProduct.quantity + addStockQuantity}</span>
                                </div>
                            </div>

                            <form onSubmit={saveAddStock} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        {currentContent.addStockForm.addQuantity} *
                                    </label>
                                    <input
                                        type="number"
                                        value={addStockQuantity}
                                        onChange={(e) => setAddStockQuantity(parseInt(e.target.value) || 0)}
                                        placeholder={currentContent.addStockForm.quantityPlaceholder}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        min="1"
                                        required
                                    />
                                </div>

                                <div className="flex gap-3 pt-4">
                                    <button
                                        type="submit"
                                        className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors"
                                    >
                                        {currentContent.addStockForm.add}
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setShowAddStock(false)}
                                        className="flex-1 bg-gray-200 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors"
                                    >
                                        {currentContent.addStockForm.cancel}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}

            {/* Sell Product Modal */}
            {showSellProduct && selectedProduct && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-screen overflow-y-auto">
                        <div className="p-6">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-xl font-bold text-gray-900">
                                    {currentContent.sellForm.title} - {selectedProduct.name}
                                </h2>
                                <button
                                    onClick={() => setShowSellProduct(false)}
                                    className="text-gray-400 hover:text-gray-600"
                                >
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>

                            <form onSubmit={processSale} className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            {currentContent.sellForm.quantity} *
                                        </label>
                                        <input
                                            type="number"
                                            name="quantity"
                                            value={saleData.quantity}
                                            onChange={handleSaleInputChange}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            min="1"
                                            max={selectedProduct.quantity}
                                            required
                                        />
                                        <p className="text-xs text-gray-500 mt-1">
                                            متوفر: {selectedProduct.quantity}
                                        </p>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            {currentContent.sellForm.saleType} *
                                        </label>
                                        <select
                                            name="saleType"
                                            value={saleData.saleType}
                                            onChange={handleSaleInputChange}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            required
                                        >
                                            <option value="cash">{currentContent.sellForm.cash}</option>
                                            <option value="debt">{currentContent.sellForm.debt}</option>
                                            <option value="installment">{currentContent.sellForm.installment}</option>
                                        </select>
                                    </div>
                                </div>

                                {/* Customer Info for Debt and Installment */}
                                {(saleData.saleType === 'debt' || saleData.saleType === 'installment') && (
                                    <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                                        <div className="mb-4">
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                {currentContent.sellForm.customer} *
                                            </label>
                                            <div className="relative customer-dropdown-container">
                                                <input
                                                    type="text"
                                                    value={customerSearchTerm}
                                                    onChange={(e) => {
                                                        setCustomerSearchTerm(e.target.value);
                                                        setShowCustomerDropdown(true);
                                                    }}
                                                    onFocus={() => setShowCustomerDropdown(true)}
                                                    placeholder={currentContent.sellForm.customerSearch}
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

                                        {/* عرض معلومات العميل المحدد */}
                                        {saleData.customerName && (
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-3 bg-white rounded-lg border border-gray-200">
                                                <div>
                                                    <label className="block text-sm text-gray-600 mb-1">اسم العميل</label>
                                                    <p className="font-medium text-gray-900">{saleData.customerName}</p>
                                                </div>
                                                <div>
                                                    <label className="block text-sm text-gray-600 mb-1">رقم الهاتف</label>
                                                    <p className="font-medium text-gray-900">{saleData.customerPhone}</p>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                )}

                                {/* Installment Details */}
                                {saleData.saleType === 'installment' && (
                                    <div className="space-y-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                                        {/* المبلغ الإجمالي والدفعة المقدمة */}
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    المبلغ الإجمالي
                                                </label>
                                                <input
                                                    type="number"
                                                    value={calculateSaleTotal()}
                                                    readOnly
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    {currentContent.sellForm.downPayment}
                                                </label>
                                                <input
                                                    type="number"
                                                    name="downPayment"
                                                    value={saleData.downPayment}
                                                    onChange={handleSaleInputChange}
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                    min="0"
                                                    max={calculateSaleTotal()}
                                                />
                                            </div>
                                        </div>

                                        {/* المبلغ المتبقي للتقسيط */}
                                        {saleData.downPayment >= 0 && (
                                            <div className="bg-white p-3 rounded-lg border border-blue-200">
                                                <span className="text-blue-700 text-sm font-medium">
                                                    المبلغ المتبقي للتقسيط: {formatCurrency(calculateSaleTotal() - saleData.downPayment)} {currentContent.currency}
                                                </span>
                                            </div>
                                        )}

                                        {/* طريقة الحساب */}
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                {currentContent.sellForm.calculationMethod}
                                            </label>
                                            <div className="space-y-2">
                                                <label className="flex items-center">
                                                    <input
                                                        type="radio"
                                                        name="calculationMethod"
                                                        value="by_amount"
                                                        checked={saleData.calculationMethod === 'by_amount'}
                                                        onChange={handleSaleInputChange}
                                                        className="mr-2 text-blue-600"
                                                    />
                                                    <span className="text-gray-900">{currentContent.sellForm.byAmount}</span>
                                                </label>
                                                <label className="flex items-center">
                                                    <input
                                                        type="radio"
                                                        name="calculationMethod"
                                                        value="by_duration"
                                                        checked={saleData.calculationMethod === 'by_duration'}
                                                        onChange={handleSaleInputChange}
                                                        className="mr-2 text-blue-600"
                                                    />
                                                    <span className="text-gray-900">{currentContent.sellForm.byDuration}</span>
                                                </label>
                                            </div>
                                        </div>

                                        {/* تردد الدفع */}
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                {currentContent.sellForm.frequency}
                                            </label>
                                            <select
                                                name="frequency"
                                                value={saleData.frequency}
                                                onChange={handleSaleInputChange}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            >
                                                <option value="monthly">{currentContent.frequency.monthly}</option>
                                                <option value="biweekly">{currentContent.frequency.biweekly}</option>
                                                <option value="weekly">{currentContent.frequency.weekly}</option>
                                            </select>
                                        </div>

                                        {/* الحقول حسب طريقة الحساب */}
                                        {saleData.calculationMethod === 'by_amount' ? (
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                                        {currentContent.sellForm.installmentAmount} *
                                                    </label>
                                                    <input
                                                        type="number"
                                                        name="installmentAmount"
                                                        value={saleData.installmentAmount}
                                                        onChange={handleSaleInputChange}
                                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                        min="1"
                                                        required
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                                        {currentContent.sellForm.totalInstallments}
                                                    </label>
                                                    <input
                                                        type="number"
                                                        value={saleData.totalInstallments}
                                                        readOnly
                                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100"
                                                    />
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                                        {currentContent.sellForm.duration} *
                                                    </label>
                                                    <input
                                                        type="number"
                                                        name="duration"
                                                        value={saleData.duration}
                                                        onChange={handleSaleInputChange}
                                                        min="1"
                                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                        required
                                                    />
                                                    <small className="text-gray-500">
                                                        {saleData.frequency === 'monthly' ? 'أشهر' : 'أسابيع'}
                                                    </small>
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                                        {currentContent.sellForm.installmentAmount}
                                                    </label>
                                                    <input
                                                        type="number"
                                                        value={saleData.installmentAmount}
                                                        readOnly
                                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100"
                                                    />
                                                </div>
                                            </div>
                                        )}

                                        {/* تاريخ البداية */}
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                {currentContent.sellForm.startDate}
                                            </label>
                                            <input
                                                type="date"
                                                name="startDate"
                                                value={saleData.startDate}
                                                onChange={handleSaleInputChange}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                required
                                            />
                                        </div>

                                        {/* رقم الفاتورة */}
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                {currentContent.sellForm.invoiceNumber}
                                            </label>
                                            <div className="flex gap-2">
                                                <input
                                                    type="text"
                                                    name="invoiceNumber"
                                                    value={saleData.invoiceNumber}
                                                    onChange={handleSaleInputChange}
                                                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => setSaleData(prev => ({...prev, invoiceNumber: generateInvoiceNumber()}))}
                                                    className="px-3 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors text-sm"
                                                >
                                                    {currentContent.sellForm.autoGenerate}
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        {currentContent.sellForm.notes}
                                    </label>
                                    <textarea
                                        name="notes"
                                        value={saleData.notes}
                                        onChange={handleSaleInputChange}
                                        rows="3"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                </div>

                                {/* Total */}
                                <div className="p-4 bg-gray-50 rounded-lg">
                                    <div className="flex justify-between items-center text-lg font-bold">
                                        <span>{currentContent.sellForm.total}:</span>
                                        <span>{formatCurrency(calculateSaleTotal())} {currentContent.currency}</span>
                                    </div>
                                    {saleData.saleType === 'installment' && saleData.downPayment > 0 && (
                                        <div className="flex justify-between items-center text-sm text-gray-600 mt-2">
                                            <span>المبلغ المتبقي:</span>
                                            <span>{formatCurrency(calculateSaleTotal() - saleData.downPayment)} {currentContent.currency}</span>
                                        </div>
                                    )}
                                </div>

                                <div className="flex gap-3 pt-4">
                                    <button
                                        type="submit"
                                        className="flex-1 bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors"
                                    >
                                        {currentContent.sellForm.sell}
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setShowSellProduct(false)}
                                        className="flex-1 bg-gray-200 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors"
                                    >
                                        {currentContent.sellForm.cancel}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}

            {/* Delete Confirmation Modal */}
            {showDeleteConfirm && selectedProduct && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
                        <div className="p-6">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-xl font-bold text-red-600">
                                    {currentContent.deleteConfirm.title}
                                </h2>
                                <button
                                    onClick={() => setShowDeleteConfirm(false)}
                                    className="text-gray-400 hover:text-gray-600"
                                >
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>

                            <div className="mb-6">
                                <p className="text-gray-700 mb-2">
                                    {currentContent.deleteConfirm.message}
                                </p>
                                <p className="text-sm text-red-600 font-medium">
                                    {currentContent.deleteConfirm.warning}
                                </p>
                                <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                                    <p className="font-semibold">{selectedProduct.name}</p>
                                    <p className="text-sm text-gray-600">{selectedProduct.category}</p>
                                </div>
                            </div>

                            <div className="flex gap-3">
                                <button
                                    onClick={confirmDeleteProduct}
                                    className="flex-1 bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-colors"
                                >
                                    {currentContent.deleteConfirm.delete}
                                </button>
                                <button
                                    onClick={() => setShowDeleteConfirm(false)}
                                    className="flex-1 bg-gray-200 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors"
                                >
                                    {currentContent.deleteConfirm.cancel}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProductsPage;
