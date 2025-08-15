import React, { useState, useEffect } from 'react';
import BackButton from './BackButton';

const SettingsPage = () => {
    const [isArabic, setIsArabic] = useState(true);
    const [settings, setSettings] = useState({
        language: 'ar',
        currency: 'IQD',
        theme: 'light',
        notifications: true,
        autoSave: true,
        backupFrequency: 'daily'
    });

    const content = {
        ar: {
            title: 'الإعدادات',
            subtitle: 'إدارة إعدادات النظام',
            language: {
                title: 'اللغة',
                description: 'اختر لغة واجهة المستخدم',
                arabic: 'العربية',
                english: 'English'
            },
            currency: {
                title: 'العملة',
                description: 'اختر العملة المستخدمة في النظام',
                iqd: 'دينار عراقي (IQD)',
                usd: 'دولار أمريكي (USD)',
                eur: 'يورو (EUR)'
            },
            theme: {
                title: 'المظهر',
                description: 'اختر مظهر النظام',
                light: 'فاتح',
                dark: 'داكن',
                auto: 'تلقائي'
            },
            notifications: {
                title: 'الإشعارات',
                description: 'تفعيل أو إلغاء تفعيل الإشعارات'
            },
            autoSave: {
                title: 'الحفظ التلقائي',
                description: 'حفظ البيانات تلقائياً أثناء العمل'
            },
            backup: {
                title: 'النسخ الاحتياطي',
                description: 'تكرار إنشاء النسخ الاحتياطية',
                daily: 'يومياً',
                weekly: 'أسبوعياً',
                monthly: 'شهرياً'
            },
            actions: {
                save: 'حفظ الإعدادات',
                reset: 'إعادة تعيين',
                export: 'تصدير البيانات',
                import: 'استيراد البيانات'
            },
            success: 'تم حفظ الإعدادات بنجاح!'
        },
        en: {
            title: 'Settings',
            subtitle: 'Manage system settings',
            language: {
                title: 'Language',
                description: 'Choose user interface language',
                arabic: 'العربية',
                english: 'English'
            },
            currency: {
                title: 'Currency',
                description: 'Choose system currency',
                iqd: 'Iraqi Dinar (IQD)',
                usd: 'US Dollar (USD)',
                eur: 'Euro (EUR)'
            },
            theme: {
                title: 'Theme',
                description: 'Choose system appearance',
                light: 'Light',
                dark: 'Dark',
                auto: 'Auto'
            },
            notifications: {
                title: 'Notifications',
                description: 'Enable or disable notifications'
            },
            autoSave: {
                title: 'Auto Save',
                description: 'Automatically save data while working'
            },
            backup: {
                title: 'Backup',
                description: 'Backup frequency',
                daily: 'Daily',
                weekly: 'Weekly',
                monthly: 'Monthly'
            },
            actions: {
                save: 'Save Settings',
                reset: 'Reset',
                export: 'Export Data',
                import: 'Import Data'
            },
            success: 'Settings saved successfully!'
        }
    };

    const currentContent = content[isArabic ? 'ar' : 'en'];

    const handleSettingChange = (key, value) => {
        setSettings(prev => ({
            ...prev,
            [key]: value
        }));
    };

    const handleLanguageChange = (language) => {
        setSettings(prev => ({ ...prev, language }));
        setIsArabic(language === 'ar');
    };

    const handleSaveSettings = () => {
        // هنا يمكن حفظ الإعدادات في قاعدة البيانات أو localStorage
        localStorage.setItem('salesflow_settings', JSON.stringify(settings));
        alert(currentContent.success);
    };

    const handleResetSettings = () => {
        setSettings({
            language: 'ar',
            currency: 'IQD',
            theme: 'light',
            notifications: true,
            autoSave: true,
            backupFrequency: 'daily'
        });
        setIsArabic(true);
    };

    return (
        <div className={`min-h-screen bg-gray-50 ${isArabic ? 'rtl' : 'ltr'}`}>
            <BackButton />

            {/* Header */}
            <div className="bg-white shadow-sm border-b">
                <div className="px-4 py-6">
                    <div className="max-w-4xl mx-auto">
                        <h1 className="text-3xl font-bold text-gray-900">
                            {currentContent.title}
                        </h1>
                        <p className="text-gray-600 mt-2">
                            {currentContent.subtitle}
                        </p>
                    </div>
                </div>
            </div>

            {/* Settings Content */}
            <div className="px-4 py-6">
                <div className="max-w-4xl mx-auto">
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                        <div className="p-6 space-y-8">

                            {/* Language Settings */}
                            <div className="border-b border-gray-200 pb-6">
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                    {currentContent.language.title}
                                </h3>
                                <p className="text-gray-600 text-sm mb-4">
                                    {currentContent.language.description}
                                </p>
                                <div className="space-y-3">
                                    <label className="flex items-center">
                                        <input
                                            type="radio"
                                            name="language"
                                            value="ar"
                                            checked={settings.language === 'ar'}
                                            onChange={(e) => handleLanguageChange(e.target.value)}
                                            className="mr-3 text-blue-600"
                                        />
                                        <span className="text-gray-900">
                                            {currentContent.language.arabic}
                                        </span>
                                    </label>
                                    <label className="flex items-center">
                                        <input
                                            type="radio"
                                            name="language"
                                            value="en"
                                            checked={settings.language === 'en'}
                                            onChange={(e) => handleLanguageChange(e.target.value)}
                                            className="mr-3 text-blue-600"
                                        />
                                        <span className="text-gray-900">
                                            {currentContent.language.english}
                                        </span>
                                    </label>
                                </div>
                            </div>

                            {/* Currency Settings */}
                            <div className="border-b border-gray-200 pb-6">
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                    {currentContent.currency.title}
                                </h3>
                                <p className="text-gray-600 text-sm mb-4">
                                    {currentContent.currency.description}
                                </p>
                                <select
                                    value={settings.currency}
                                    onChange={(e) => handleSettingChange('currency', e.target.value)}
                                    className="w-full max-w-md px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                >
                                    <option value="IQD">{currentContent.currency.iqd}</option>
                                    <option value="USD">{currentContent.currency.usd}</option>
                                    <option value="EUR">{currentContent.currency.eur}</option>
                                </select>
                            </div>

                            {/* Theme Settings */}
                            <div className="border-b border-gray-200 pb-6">
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                    {currentContent.theme.title}
                                </h3>
                                <p className="text-gray-600 text-sm mb-4">
                                    {currentContent.theme.description}
                                </p>
                                <select
                                    value={settings.theme}
                                    onChange={(e) => handleSettingChange('theme', e.target.value)}
                                    className="w-full max-w-md px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                >
                                    <option value="light">{currentContent.theme.light}</option>
                                    <option value="dark">{currentContent.theme.dark}</option>
                                    <option value="auto">{currentContent.theme.auto}</option>
                                </select>
                            </div>

                            {/* Notifications */}
                            <div className="border-b border-gray-200 pb-6">
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                    {currentContent.notifications.title}
                                </h3>
                                <p className="text-gray-600 text-sm mb-4">
                                    {currentContent.notifications.description}
                                </p>
                                <label className="flex items-center">
                                    <input
                                        type="checkbox"
                                        checked={settings.notifications}
                                        onChange={(e) => handleSettingChange('notifications', e.target.checked)}
                                        className="mr-3 text-blue-600 rounded"
                                    />
                                    <span className="text-gray-900">
                                        {currentContent.notifications.title}
                                    </span>
                                </label>
                            </div>

                            {/* Auto Save */}
                            <div className="border-b border-gray-200 pb-6">
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                    {currentContent.autoSave.title}
                                </h3>
                                <p className="text-gray-600 text-sm mb-4">
                                    {currentContent.autoSave.description}
                                </p>
                                <label className="flex items-center">
                                    <input
                                        type="checkbox"
                                        checked={settings.autoSave}
                                        onChange={(e) => handleSettingChange('autoSave', e.target.checked)}
                                        className="mr-3 text-blue-600 rounded"
                                    />
                                    <span className="text-gray-900">
                                        {currentContent.autoSave.title}
                                    </span>
                                </label>
                            </div>

                            {/* Backup Frequency */}
                            <div className="pb-6">
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                    {currentContent.backup.title}
                                </h3>
                                <p className="text-gray-600 text-sm mb-4">
                                    {currentContent.backup.description}
                                </p>
                                <select
                                    value={settings.backupFrequency}
                                    onChange={(e) => handleSettingChange('backupFrequency', e.target.value)}
                                    className="w-full max-w-md px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                >
                                    <option value="daily">{currentContent.backup.daily}</option>
                                    <option value="weekly">{currentContent.backup.weekly}</option>
                                    <option value="monthly">{currentContent.backup.monthly}</option>
                                </select>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="px-6 py-4 bg-gray-50 rounded-b-xl border-t border-gray-200">
                            <div className="flex flex-col sm:flex-row gap-3">
                                <button
                                    onClick={handleSaveSettings}
                                    className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                                >
                                    {currentContent.actions.save}
                                </button>
                                <button
                                    onClick={handleResetSettings}
                                    className="flex-1 bg-gray-200 text-gray-800 py-3 px-6 rounded-lg hover:bg-gray-300 transition-colors font-medium"
                                >
                                    {currentContent.actions.reset}
                                </button>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-3 mt-3">
                                <button className="flex-1 bg-green-600 text-white py-3 px-6 rounded-lg hover:bg-green-700 transition-colors font-medium">
                                    {currentContent.actions.export}
                                </button>
                                <button className="flex-1 bg-orange-600 text-white py-3 px-6 rounded-lg hover:bg-orange-700 transition-colors font-medium">
                                    {currentContent.actions.import}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SettingsPage;
