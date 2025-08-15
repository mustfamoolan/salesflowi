import React from 'react';
import { Head } from '@inertiajs/react';
import PublicLayout from '../../Layouts/PublicLayout';

const LandingPageSimple = () => {
    return (
        <PublicLayout title="SalesFlow">
            <Head>
                <title>SalesFlow - نظام إدارة المبيعات الذكي</title>
            </Head>
            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100" dir="rtl">
                <div className="container mx-auto px-4 py-16">
                    <div className="text-center">
                        <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-6">
                            مرحباً بك في
                            <span className="text-blue-600"> SalesFlow</span>
                        </h1>
                        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                            نظام إدارة المبيعات والمخزون الذكي - حلول متكاملة لإدارة أعمالك
                        </p>
                        <div className="space-y-4">
                            <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg transition-colors">
                                ابدأ تجربتك المجانية
                            </button>
                            <div className="text-sm text-gray-500">
                                ✅ سهل الاستخدام | ✅ دعم عربي كامل | ✅ بدون تكاليف إعداد
                            </div>
                        </div>
                    </div>

                    <div className="mt-16 grid md:grid-cols-3 gap-8">
                        <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                            <div className="text-3xl mb-4">📊</div>
                            <h3 className="text-xl font-bold mb-2">إدارة المبيعات</h3>
                            <p className="text-gray-600">تتبع مبيعاتك وفواتيرك بسهولة</p>
                        </div>

                        <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                            <div className="text-3xl mb-4">📦</div>
                            <h3 className="text-xl font-bold mb-2">إدارة المخزون</h3>
                            <p className="text-gray-600">متابعة المخزون وتنبيهات النفاد</p>
                        </div>

                        <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                            <div className="text-3xl mb-4">👥</div>
                            <h3 className="text-xl font-bold mb-2">إدارة العملاء</h3>
                            <p className="text-gray-600">متابعة العملاء والديون والأقساط</p>
                        </div>
                    </div>
                </div>
            </div>
        </PublicLayout>
    );
};

export default LandingPageSimple;
