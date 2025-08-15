import React, { useState } from 'react';
import { Head } from '@inertiajs/react';
import AdminLayout from '../../Layouts/AdminLayout';

const PlansManagement = ({ isArabic }) => {
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showViewModal, setShowViewModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedPlan, setSelectedPlan] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        price: '',
        description: '',
        features: [''],
        currency: 'USD',
        billingPeriod: 'monthly'
    });

    // Plans state management
    const [plans, setPlans] = useState([
        {
            id: 1,
            key: 'free',
            name: 'مجانية',
            price: '0',
            description: 'للمبتدئين والاستخدام الشخصي',
            features: ['5 عملاء كحد أقصى', 'فواتير أساسية', 'بدون تقارير', 'دعم محدود'],
            subscribers: 245,
            currency: 'USD',
            billingPeriod: 'monthly',
            status: 'active',
            createdAt: '2024-01-15'
        },
        {
            id: 2,
            key: 'basic',
            name: 'أساسية',
            price: '25000',
            description: 'للشركات الصغيرة والمتوسطة',
            features: ['عملاء غير محدود', 'فواتير وديون', 'تقارير أساسية', 'دعم إيميل'],
            subscribers: 892,
            currency: 'IQD',
            billingPeriod: 'monthly',
            status: 'active',
            createdAt: '2024-01-20'
        },
        {
            id: 3,
            key: 'advanced',
            name: 'متقدمة',
            price: '50000',
            description: 'للشركات المتنامية',
            features: ['كل ميزات الأساسية', 'نظام الأقساط الذكي', 'تقارير متقدمة', 'تصدير PDF/Excel'],
            subscribers: 1247,
            currency: 'IQD',
            billingPeriod: 'monthly',
            status: 'active',
            createdAt: '2024-02-01'
        },
        {
            id: 4,
            key: 'professional',
            name: 'احترافية',
            price: '75000',
            description: 'للشركات الكبيرة',
            features: ['كل الميزات', 'صلاحيات متعددة', 'API متقدم', 'دعم أولوية 24/7'],
            subscribers: 623,
            currency: 'IQD',
            billingPeriod: 'monthly',
            status: 'active',
            createdAt: '2024-02-15'
        }
    ]);

    const content = {
        ar: {
            title: 'إدارة باقات الاشتراك',
            subtitle: 'إنشاء وتعديل باقات الاشتراك للعملاء',
            createPlan: 'إنشاء باقة جديدة',
            plans: {
                free: {
                    name: 'مجانية',
                    price: '0',
                    description: 'للمبتدئين والاستخدام الشخصي',
                    features: ['5 عملاء كحد أقصى', 'فواتير أساسية', 'بدون تقارير', 'دعم محدود'],
                    subscribers: 245
                },
                basic: {
                    name: 'أساسية',
                    price: '5',
                    description: 'للشركات الصغيرة والمتوسطة',
                    features: ['عملاء غير محدود', 'فواتير وديون', 'تقارير أساسية', 'دعم إيميل'],
                    subscribers: 892
                },
                advanced: {
                    name: 'متقدمة',
                    price: '10',
                    description: 'للشركات المتنامية',
                    features: ['كل ميزات الأساسية', 'نظام الأقساط الذكي', 'تقارير متقدمة', 'تصدير PDF/Excel'],
                    subscribers: 1247
                },
                professional: {
                    name: 'احترافية',
                    price: '20',
                    description: 'للشركات الكبيرة',
                    features: ['كل الميزات', 'صلاحيات متعددة', 'API متقدم', 'دعم أولوية 24/7'],
                    subscribers: 623
                }
            },
            actions: {
                edit: 'تعديل',
                delete: 'حذف',
                duplicate: 'نسخ',
                viewSubscribers: 'عرض المشتركين'
            },
            stats: {
                totalPlans: 'إجمالي الباقات',
                totalSubscribers: 'إجمالي المشتركين',
                monthlyRevenue: 'الإيرادات الشهرية',
                popularPlan: 'الباقة الأكثر شعبية'
            },
            modals: {
                createPlan: 'إنشاء باقة جديدة',
                editPlan: 'تعديل الباقة',
                viewPlan: 'عرض تفاصيل الباقة',
                deletePlan: 'حذف الباقة',
                planName: 'اسم الباقة',
                planPrice: 'سعر الباقة',
                planDescription: 'وصف الباقة',
                planFeatures: 'مميزات الباقة',
                addFeature: 'إضافة ميزة',
                removeFeature: 'حذف الميزة',
                currency: 'العملة',
                billingPeriod: 'فترة الفوترة',
                monthly: 'شهرياً',
                yearly: 'سنوياً',
                save: 'حفظ',
                cancel: 'إلغاء',
                delete: 'حذف',
                confirmDelete: 'هل أنت متأكد من حذف هذه الباقة؟',
                deleteWarning: 'سيتم حذف الباقة نهائياً ولا يمكن التراجع عن هذا الإجراء.',
                enterPlanName: 'أدخل اسم الباقة',
                enterPrice: 'أدخل السعر',
                enterDescription: 'أدخل وصف الباقة',
                enterFeature: 'أدخل الميزة',
                subscribers: 'المشتركين',
                status: 'الحالة',
                createdAt: 'تاريخ الإنشاء',
                active: 'نشطة',
                inactive: 'غير نشطة'
            }
        },
        en: {
            title: 'Subscription Plans Management',
            subtitle: 'Create and manage subscription plans for customers',
            createPlan: 'Create New Plan',
            plans: {
                free: {
                    name: 'Free',
                    price: '0',
                    description: 'For beginners and personal use',
                    features: ['Up to 5 customers', 'Basic invoices', 'No reports', 'Limited support'],
                    subscribers: 245
                },
                basic: {
                    name: 'Basic',
                    price: '5',
                    description: 'For small and medium businesses',
                    features: ['Unlimited customers', 'Invoices & debts', 'Basic reports', 'Email support'],
                    subscribers: 892
                },
                advanced: {
                    name: 'Advanced',
                    price: '10',
                    description: 'For growing businesses',
                    features: ['All basic features', 'Smart installment system', 'Advanced reports', 'PDF/Excel export'],
                    subscribers: 1247
                },
                professional: {
                    name: 'Professional',
                    price: '20',
                    description: 'For large enterprises',
                    features: ['All features', 'Multi-user permissions', 'Advanced API', '24/7 priority support'],
                    subscribers: 623
                }
            },
            actions: {
                edit: 'Edit',
                delete: 'Delete',
                duplicate: 'Duplicate',
                viewSubscribers: 'View Subscribers'
            },
            stats: {
                totalPlans: 'Total Plans',
                totalSubscribers: 'Total Subscribers',
                monthlyRevenue: 'Monthly Revenue',
                popularPlan: 'Most Popular Plan'
            },
            modals: {
                createPlan: 'Create New Plan',
                editPlan: 'Edit Plan',
                viewPlan: 'View Plan Details',
                deletePlan: 'Delete Plan',
                planName: 'Plan Name',
                planPrice: 'Plan Price',
                planDescription: 'Plan Description',
                planFeatures: 'Plan Features',
                addFeature: 'Add Feature',
                removeFeature: 'Remove Feature',
                currency: 'Currency',
                billingPeriod: 'Billing Period',
                monthly: 'Monthly',
                yearly: 'Yearly',
                save: 'Save',
                cancel: 'Cancel',
                delete: 'Delete',
                confirmDelete: 'Are you sure you want to delete this plan?',
                deleteWarning: 'This plan will be permanently deleted and cannot be recovered.',
                enterPlanName: 'Enter plan name',
                enterPrice: 'Enter price',
                enterDescription: 'Enter plan description',
                enterFeature: 'Enter feature',
                subscribers: 'Subscribers',
                status: 'Status',
                createdAt: 'Created Date',
                active: 'Active',
                inactive: 'Inactive'
            }
        }
    };

    const currentContent = content[isArabic ? 'ar' : 'en'];

    // CRUD Functions
    const handleCreatePlan = () => {
        setFormData({
            name: '',
            price: '',
            description: '',
            features: [''],
            currency: 'IQD',
            billingPeriod: 'monthly'
        });
        setShowCreateModal(true);
    };

    const handleEditPlan = (plan) => {
        setSelectedPlan(plan);
        setFormData({
            name: plan.name,
            price: plan.price,
            description: plan.description,
            features: [...plan.features],
            currency: plan.currency,
            billingPeriod: plan.billingPeriod
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
            price: plan.price,
            description: plan.description,
            features: [...plan.features],
            currency: plan.currency,
            billingPeriod: plan.billingPeriod
        });
        setShowCreateModal(true);
    };

    const savePlan = () => {
        if (showEditModal) {
            // Edit existing plan
            const updatedPlans = plans.map(plan =>
                plan.id === selectedPlan.id
                    ? { ...plan, ...formData }
                    : plan
            );
            setPlans(updatedPlans);
            alert('تم تحديث الباقة بنجاح!');
        } else {
            // Create new plan
            const newPlan = {
                id: plans.length + 1,
                key: `plan_${plans.length + 1}`,
                ...formData,
                subscribers: 0,
                status: 'active',
                createdAt: new Date().toISOString().split('T')[0]
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

    const formatPrice = (price, currency) => {
        if (currency === 'IQD') {
            return `${Number(price).toLocaleString()} دينار`;
        }
        return `$${price}`;
    };

    const stats = [
        {
            title: currentContent.stats.totalPlans,
            value: plans.length.toString(),
            icon: '📋',
            color: 'bg-blue-500'
        },
        {
            title: currentContent.stats.totalSubscribers,
            value: plans.reduce((total, plan) => total + plan.subscribers, 0).toLocaleString(),
            icon: '👥',
            color: 'bg-green-500'
        },
        {
            title: currentContent.stats.monthlyRevenue,
            value: plans.reduce((total, plan) => {
                const revenue = plan.price === '0' ? 0 : parseInt(plan.price) * plan.subscribers;
                return total + revenue;
            }, 0).toLocaleString() + ' دينار',
            icon: '💰',
            color: 'bg-purple-500'
        },
        {
            title: currentContent.stats.popularPlan,
            value: plans.reduce((popular, plan) =>
                plan.subscribers > (popular.subscribers || 0) ? plan : popular, {}
            ).name || 'N/A',
            icon: '⭐',
            color: 'bg-orange-500'
        }
    ];

    const planColors = {
        free: 'border-gray-300 bg-gray-50',
        basic: 'border-blue-300 bg-blue-50',
        advanced: 'border-purple-300 bg-purple-50',
        professional: 'border-gold-300 bg-yellow-50'
    };

    return (
        <AdminLayout>
            <Head title="إدارة الخطط - SalesFlow" />
            <div className="plans-management">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">
                            {currentContent.title}
                    </h1>
                    <p className="text-gray-600">
                        {currentContent.subtitle}
                    </p>
                </div>
                <button
                    onClick={handleCreatePlan}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                >
                    + {currentContent.createPlan}
                </button>
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
                            </div>
                            <div className={`${stat.color} text-white p-3 rounded-lg text-2xl`}>
                                {stat.icon}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Plans Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
                {plans.map((plan) => (
                    <div key={plan.id} className={`bg-white rounded-lg shadow-sm border-2 ${planColors[plan.key] || 'border-gray-300 bg-gray-50'} p-6 relative`}>
                        {plan.subscribers > 1000 && (
                            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                                <span className="bg-purple-600 text-white px-3 py-1 rounded-full text-xs font-medium">
                                    الأكثر شعبية
                                </span>
                            </div>
                        )}

                        <div className="text-center mb-6">
                            <h3 className="text-xl font-bold text-gray-900 mb-2">
                                {plan.name}
                            </h3>
                            <div className="mb-4">
                                <span className="text-4xl font-bold text-gray-900">
                                    {formatPrice(plan.price, plan.currency)}
                                </span>
                                <span className="text-gray-600">/{plan.billingPeriod === 'monthly' ? 'شهر' : 'سنة'}</span>
                            </div>
                            <p className="text-sm text-gray-600">
                                {plan.description}
                            </p>
                        </div>

                        <div className="mb-6">
                            <ul className="space-y-3">
                                {plan.features.map((feature, index) => (
                                    <li key={index} className="flex items-center text-sm">
                                        <svg className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                        <span className="text-right">{feature}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="text-center mb-6">
                            <p className="text-sm text-gray-600">
                                <span className="font-medium text-gray-900">{plan.subscribers}</span> مشترك
                            </p>
                            <p className="text-xs text-gray-500 mt-1">
                                تم الإنشاء: {plan.createdAt}
                            </p>
                        </div>

                        <div className="space-y-2">
                            <button
                                onClick={() => handleViewPlan(plan)}
                                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition-colors"
                            >
                                عرض التفاصيل
                            </button>
                            <div className="grid grid-cols-3 gap-2">
                                <button
                                    onClick={() => handleEditPlan(plan)}
                                    className="text-green-600 hover:text-green-900 py-2 px-3 rounded-lg border border-green-300 hover:bg-green-50 transition-colors text-sm"
                                >
                                    {currentContent.actions.edit}
                                </button>
                                <button
                                    onClick={() => handleDuplicatePlan(plan)}
                                    className="text-gray-600 hover:text-gray-900 py-2 px-3 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors text-sm"
                                >
                                    {currentContent.actions.duplicate}
                                </button>
                                <button
                                    onClick={() => handleDeletePlan(plan)}
                                    className="text-red-600 hover:text-red-900 py-2 px-3 rounded-lg border border-red-300 hover:bg-red-50 transition-colors text-sm"
                                >
                                    {currentContent.actions.delete}
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Create/Edit Plan Modal */}
            {(showCreateModal || showEditModal) && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                        <div className="flex items-center justify-between p-6 border-b border-gray-200">
                            <h3 className="text-lg font-semibold text-gray-900">
                                {showEditModal ? currentContent.modals.editPlan : currentContent.modals.createPlan}
                            </h3>
                            <button
                                onClick={closeModals}
                                className="text-gray-400 hover:text-gray-600"
                            >
                                ✕
                            </button>
                        </div>
                        <div className="p-6 space-y-6">
                            {/* Plan Name */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    {currentContent.modals.planName}
                                </label>
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                                    placeholder={currentContent.modals.enterPlanName}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>

                            {/* Price and Currency */}
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        {currentContent.modals.planPrice}
                                    </label>
                                    <input
                                        type="number"
                                        value={formData.price}
                                        onChange={(e) => setFormData({...formData, price: e.target.value})}
                                        placeholder={currentContent.modals.enterPrice}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        {currentContent.modals.currency}
                                    </label>
                                    <select
                                        value={formData.currency}
                                        onChange={(e) => setFormData({...formData, currency: e.target.value})}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    >
                                        <option value="IQD">دينار عراقي (IQD)</option>
                                        <option value="USD">دولار أمريكي (USD)</option>
                                    </select>
                                </div>
                            </div>

                            {/* Billing Period */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    {currentContent.modals.billingPeriod}
                                </label>
                                <select
                                    value={formData.billingPeriod}
                                    onChange={(e) => setFormData({...formData, billingPeriod: e.target.value})}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                >
                                    <option value="monthly">{currentContent.modals.monthly}</option>
                                    <option value="yearly">{currentContent.modals.yearly}</option>
                                </select>
                            </div>

                            {/* Description */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    {currentContent.modals.planDescription}
                                </label>
                                <textarea
                                    value={formData.description}
                                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                                    placeholder={currentContent.modals.enterDescription}
                                    rows={3}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>

                            {/* Features */}
                            <div>
                                <div className="flex items-center justify-between mb-3">
                                    <label className="block text-sm font-medium text-gray-700">
                                        {currentContent.modals.planFeatures}
                                    </label>
                                    <button
                                        onClick={addFeature}
                                        className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                                    >
                                        + {currentContent.modals.addFeature}
                                    </button>
                                </div>
                                <div className="space-y-2">
                                    {formData.features.map((feature, index) => (
                                        <div key={index} className="flex items-center space-x-2 space-x-reverse">
                                            <input
                                                type="text"
                                                value={feature}
                                                onChange={(e) => updateFeature(index, e.target.value)}
                                                placeholder={currentContent.modals.enterFeature}
                                                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            />
                                            {formData.features.length > 1 && (
                                                <button
                                                    onClick={() => removeFeature(index)}
                                                    className="text-red-600 hover:text-red-700 p-2"
                                                >
                                                    🗑️
                                                </button>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="flex gap-3 p-6 border-t border-gray-200">
                            <button
                                onClick={savePlan}
                                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                            >
                                {currentContent.modals.save}
                            </button>
                            <button
                                onClick={closeModals}
                                className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-700 px-4 py-2 rounded-lg font-medium transition-colors"
                            >
                                {currentContent.modals.cancel}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* View Plan Modal */}
            {showViewModal && selectedPlan && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-lg max-w-lg w-full max-h-[90vh] overflow-y-auto">
                        <div className="flex items-center justify-between p-6 border-b border-gray-200">
                            <h3 className="text-lg font-semibold text-gray-900">
                                {currentContent.modals.viewPlan}
                            </h3>
                            <button
                                onClick={closeModals}
                                className="text-gray-400 hover:text-gray-600"
                            >
                                ✕
                            </button>
                        </div>
                        <div className="p-6 space-y-4">
                            <div className="text-center pb-4 border-b border-gray-100">
                                <h4 className="text-2xl font-bold text-gray-900 mb-2">{selectedPlan.name}</h4>
                                <div className="text-3xl font-bold text-blue-600 mb-2">
                                    {formatPrice(selectedPlan.price, selectedPlan.currency)}
                                    <span className="text-lg text-gray-500">/{selectedPlan.billingPeriod === 'monthly' ? 'شهر' : 'سنة'}</span>
                                </div>
                                <p className="text-gray-600">{selectedPlan.description}</p>
                            </div>

                            <div className="space-y-3">
                                <div className="flex justify-between">
                                    <span className="text-gray-500">{currentContent.modals.subscribers}:</span>
                                    <span className="text-gray-900 font-medium">{selectedPlan.subscribers}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-500">{currentContent.modals.status}:</span>
                                    <span className="text-green-600 font-medium">{currentContent.modals.active}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-500">{currentContent.modals.createdAt}:</span>
                                    <span className="text-gray-900">{selectedPlan.createdAt}</span>
                                </div>
                            </div>

                            <div className="pt-4 border-t border-gray-100">
                                <h5 className="font-medium text-gray-900 mb-3">{currentContent.modals.planFeatures}:</h5>
                                <ul className="space-y-2">
                                    {selectedPlan.features.map((feature, index) => (
                                        <li key={index} className="flex items-center text-sm">
                                            <svg className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                            </svg>
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                        <div className="flex gap-3 p-6 border-t border-gray-200">
                            <button
                                onClick={() => {
                                    closeModals();
                                    handleEditPlan(selectedPlan);
                                }}
                                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                            >
                                {currentContent.actions.edit}
                            </button>
                            <button
                                onClick={closeModals}
                                className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-700 px-4 py-2 rounded-lg font-medium transition-colors"
                            >
                                {currentContent.modals.cancel}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Delete Plan Modal */}
            {showDeleteModal && selectedPlan && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-lg max-w-md w-full">
                        <div className="flex items-center justify-between p-6 border-b border-gray-200">
                            <h3 className="text-lg font-semibold text-gray-900">
                                {currentContent.modals.deletePlan}
                            </h3>
                            <button
                                onClick={closeModals}
                                className="text-gray-400 hover:text-gray-600"
                            >
                                ✕
                            </button>
                        </div>
                        <div className="p-6">
                            <div className="text-center mb-4">
                                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
                                    <svg className="h-6 w-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                                    </svg>
                                </div>
                                <h4 className="text-lg font-medium text-gray-900 mb-2">
                                    {currentContent.modals.confirmDelete}
                                </h4>
                                <p className="text-sm text-gray-500 mb-4">
                                    {currentContent.modals.deleteWarning}
                                </p>
                                <p className="font-medium text-gray-900">
                                    باقة: {selectedPlan.name}
                                </p>
                            </div>
                        </div>
                        <div className="flex gap-3 p-6 border-t border-gray-200">
                            <button
                                onClick={confirmDelete}
                                className="flex-1 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                            >
                                {currentContent.modals.delete}
                            </button>
                            <button
                                onClick={closeModals}
                                className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-700 px-4 py-2 rounded-lg font-medium transition-colors"
                            >
                                {currentContent.modals.cancel}
                            </button>
                        </div>
                    </div>
                </div>
            )}
            </div>
        </AdminLayout>
    );
};

export default PlansManagement;
