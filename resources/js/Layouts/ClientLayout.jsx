import React from 'react';
import { Head, Link, usePage } from '@inertiajs/react';

export default function ClientLayout({ title, children }) {
    const { url } = usePage();

    const navigation = [
        { name: 'لوحة التحكم', href: '/dashboard', icon: '📊' },
        { name: 'المنتجات', href: '/products', icon: '📦' },
        { name: 'الفواتير', href: '/invoices', icon: '🧾' },
        { name: 'نقطة البيع', href: '/pos', icon: '🛒' },
        { name: 'الديون', href: '/debts', icon: '💰' },
        { name: 'الأقساط', href: '/installments', icon: '📅' },
        { name: 'المصروفات', href: '/expenses', icon: '💸' },
        { name: 'التقارير', href: '/reports', icon: '📈' },
        { name: 'الإعدادات', href: '/settings', icon: '⚙️' },
    ];

    return (
        <div className="min-h-screen bg-gray-100" dir="rtl">
            <Head title={title} />

            {/* Navigation */}
            <nav className="bg-white shadow-sm border-b border-gray-200">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <Link href="/dashboard" className="text-2xl font-bold text-blue-600">
                                    SalesFlow
                                </Link>
                            </div>
                        </div>

                        <div className="hidden md:flex items-center space-x-4 space-x-reverse">
                            {navigation.map((item) => (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                                        url.startsWith(item.href)
                                            ? 'bg-blue-100 text-blue-700'
                                            : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                                    }`}
                                >
                                    <span className="ml-2">{item.icon}</span>
                                    {item.name}
                                </Link>
                            ))}
                        </div>

                        {/* Mobile menu button */}
                        <div className="md:hidden flex items-center">
                            <button className="text-gray-600 hover:text-gray-900">
                                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Main content */}
            <main className="py-6">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="mb-6">
                        <h1 className="text-3xl font-bold text-gray-900 text-right">{title}</h1>
                    </div>
                    {children}
                </div>
            </main>
        </div>
    );
}
