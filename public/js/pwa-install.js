// PWA Install Component
// مكون تثبيت تطبيق الويب التقدمي

const PWAInstallPrompt = ({ isArabic }) => {
    const [deferredPrompt, setDeferredPrompt] = React.useState(null);
    const [showInstallPrompt, setShowInstallPrompt] = React.useState(false);
    const [isInstalled, setIsInstalled] = React.useState(false);
    const [isIOSDevice, setIsIOSDevice] = React.useState(false);

    const content = {
        ar: {
            installTitle: 'تثبيت SalesFlow',
            installSubtitle: 'احصل على تجربة أفضل مع تطبيق سطح المكتب',
            installDescription: 'ثبت SalesFlow على جهازك للحصول على:',
            features: [
                '🚀 وصول سريع من سطح المكتب',
                '🔄 عمل بدون اتصال إنترنت',
                '🔔 إشعارات فورية',
                '📱 تجربة مشابهة للتطبيقات الأصلية',
                '💾 توفير مساحة التخزين',
                '🔐 أمان إضافي لبياناتك'
            ],
            installButton: 'تثبيت التطبيق',
            laterButton: 'ربما لاحقاً',
            installed: 'تم التثبيت بنجاح! 🎉',
            iosInstructions: {
                title: 'تثبيت على iPhone/iPad',
                steps: [
                    '1. اضغط على زر المشاركة',
                    '2. اختر "إضافة إلى الشاشة الرئيسية"',
                    '3. اضغط "إضافة" في الزاوية العلوية'
                ],
                shareIcon: '⬆️',
                addIcon: '➕'
            },
            updateAvailable: 'تحديث جديد متوفر',
            updateNow: 'تحديث الآن',
            updateLater: 'تحديث لاحقاً'
        },
        en: {
            installTitle: 'Install SalesFlow',
            installSubtitle: 'Get a better experience with the desktop app',
            installDescription: 'Install SalesFlow on your device to get:',
            features: [
                '🚀 Quick access from desktop',
                '🔄 Works offline',
                '🔔 Instant notifications',
                '📱 Native app-like experience',
                '💾 Save storage space',
                '🔐 Additional security for your data'
            ],
            installButton: 'Install App',
            laterButton: 'Maybe Later',
            installed: 'Successfully Installed! 🎉',
            iosInstructions: {
                title: 'Install on iPhone/iPad',
                steps: [
                    '1. Tap the Share button',
                    '2. Select "Add to Home Screen"',
                    '3. Tap "Add" in the top corner'
                ],
                shareIcon: '⬆️',
                addIcon: '➕'
            },
            updateAvailable: 'New update available',
            updateNow: 'Update Now',
            updateLater: 'Update Later'
        }
    };

    const currentContent = content[isArabic ? 'ar' : 'en'];

    React.useEffect(() => {
        // فحص إذا كان الجهاز iOS
        const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
        setIsIOSDevice(isIOS);

        // فحص إذا كان التطبيق مثبت بالفعل
        const isStandalone = window.matchMedia('(display-mode: standalone)').matches ||
                           window.navigator.standalone ||
                           document.referrer.includes('android-app://');
        setIsInstalled(isStandalone);

        // الاستماع لحدث تثبيت PWA
        const handleBeforeInstallPrompt = (e) => {
            console.log('🔔 PWA: إمكانية التثبيت متوفرة');
            e.preventDefault();
            setDeferredPrompt(e);

            // إظهار التنبيه بعد 3 ثوان من تحميل الصفحة
            setTimeout(() => {
                if (!isStandalone) {
                    setShowInstallPrompt(true);
                }
            }, 3000);
        };

        // الاستماع لحدث تثبيت التطبيق
        const handleAppInstalled = () => {
            console.log('✅ PWA: تم تثبيت التطبيق');
            setIsInstalled(true);
            setShowInstallPrompt(false);
            setDeferredPrompt(null);

            // إظهار رسالة نجاح
            alert(currentContent.installed);
        };

        window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
        window.addEventListener('appinstalled', handleAppInstalled);

        return () => {
            window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
            window.removeEventListener('appinstalled', handleAppInstalled);
        };
    }, [isArabic]);

    // معالج تثبيت التطبيق
    const handleInstallClick = async () => {
        if (!deferredPrompt) {
            console.log('❌ PWA: لا يمكن التثبيت في الوقت الحالي');
            return;
        }

        console.log('🚀 PWA: بدء عملية التثبيت');

        // إظهار نافذة التثبيت
        deferredPrompt.prompt();

        // انتظار اختيار المستخدم
        const { outcome } = await deferredPrompt.userChoice;

        if (outcome === 'accepted') {
            console.log('✅ PWA: وافق المستخدم على التثبيت');
        } else {
            console.log('❌ PWA: رفض المستخدم التثبيت');
        }

        setDeferredPrompt(null);
        setShowInstallPrompt(false);
    };

    // إخفاء التنبيه
    const handleDismiss = () => {
        setShowInstallPrompt(false);

        // إعادة إظهار التنبيه بعد 24 ساعة
        localStorage.setItem('pwa-install-dismissed', Date.now().toString());
    };

    // فحص إذا كان المستخدم رفض التثبيت مؤخراً
    React.useEffect(() => {
        const dismissedTime = localStorage.getItem('pwa-install-dismissed');
        if (dismissedTime) {
            const timeDiff = Date.now() - parseInt(dismissedTime);
            const oneDayInMs = 24 * 60 * 60 * 1000;

            if (timeDiff < oneDayInMs) {
                setShowInstallPrompt(false);
            }
        }
    }, []);

    // عدم إظهار أي شيء إذا كان التطبيق مثبت
    if (isInstalled) {
        return null;
    }

    // تعليمات خاصة لأجهزة iOS
    if (isIOSDevice && showInstallPrompt) {
        return React.createElement('div', {
            className: 'fixed bottom-4 left-4 right-4 md:left-auto md:w-96 bg-white rounded-xl shadow-2xl border border-gray-200 z-50 p-6'
        }, [
            React.createElement('div', {
                key: 'ios-header',
                className: 'flex items-center justify-between mb-4'
            }, [
                React.createElement('h3', {
                    key: 'title',
                    className: 'text-lg font-bold text-gray-900'
                }, currentContent.iosInstructions.title),
                React.createElement('button', {
                    key: 'close',
                    onClick: handleDismiss,
                    className: 'text-gray-400 hover:text-gray-600'
                }, '✕')
            ]),
            React.createElement('div', {
                key: 'ios-steps',
                className: 'space-y-3 mb-4'
            }, currentContent.iosInstructions.steps.map((step, index) =>
                React.createElement('div', {
                    key: index,
                    className: 'flex items-center text-sm text-gray-700'
                }, [
                    React.createElement('span', {
                        key: 'step-text',
                        className: 'flex-1'
                    }, step),
                    index === 0 && React.createElement('span', {
                        key: 'share-icon',
                        className: 'text-lg mr-2'
                    }, currentContent.iosInstructions.shareIcon),
                    index === 1 && React.createElement('span', {
                        key: 'add-icon',
                        className: 'text-lg mr-2'
                    }, currentContent.iosInstructions.addIcon)
                ])
            )),
            React.createElement('button', {
                key: 'got-it',
                onClick: handleDismiss,
                className: 'w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors'
            }, 'فهمت')
        ]);
    }

    // تنبيه التثبيت العادي
    if (showInstallPrompt && deferredPrompt) {
        return React.createElement('div', {
            className: 'fixed bottom-4 left-4 right-4 md:left-auto md:w-96 bg-white rounded-xl shadow-2xl border border-gray-200 z-50 overflow-hidden'
        }, [
            React.createElement('div', {
                key: 'header',
                className: 'bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4'
            }, [
                React.createElement('div', {
                    key: 'header-content',
                    className: 'flex items-center justify-between'
                }, [
                    React.createElement('h3', {
                        key: 'title',
                        className: 'text-lg font-bold'
                    }, currentContent.installTitle),
                    React.createElement('button', {
                        key: 'close',
                        onClick: handleDismiss,
                        className: 'text-white/80 hover:text-white'
                    }, '✕')
                ]),
                React.createElement('p', {
                    key: 'subtitle',
                    className: 'text-white/90 text-sm mt-1'
                }, currentContent.installSubtitle)
            ]),
            React.createElement('div', {
                key: 'body',
                className: 'p-4'
            }, [
                React.createElement('p', {
                    key: 'description',
                    className: 'text-gray-600 text-sm mb-4'
                }, currentContent.installDescription),
                React.createElement('ul', {
                    key: 'features',
                    className: 'space-y-2 mb-6'
                }, currentContent.features.map((feature, index) =>
                    React.createElement('li', {
                        key: index,
                        className: 'text-sm text-gray-700 flex items-center'
                    }, feature)
                )),
                React.createElement('div', {
                    key: 'buttons',
                    className: 'grid grid-cols-2 gap-3'
                }, [
                    React.createElement('button', {
                        key: 'later',
                        onClick: handleDismiss,
                        className: 'bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2 px-4 rounded-lg transition-colors'
                    }, currentContent.laterButton),
                    React.createElement('button', {
                        key: 'install',
                        onClick: handleInstallClick,
                        className: 'bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors'
                    }, currentContent.installButton)
                ])
            ])
        ]);
    }

    return null;
};

// تصدير المكون
window.PWAInstallPrompt = PWAInstallPrompt;
