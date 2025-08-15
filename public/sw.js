// SalesFlow Service Worker
// تم التطوير خصيصاً لنظام إدارة المبيعات العراقي

const CACHE_NAME = 'salesflow-v1.0.0';
const OFFLINE_URL = '/offline.html';

// الملفات الأساسية للتخزين المؤقت
const STATIC_CACHE_URLS = [
    '/',
    '/admin',
    '/customers',
    '/pos',
    '/offline.html',
    '/manifest.json',
    '/css/app.css',
    '/js/app.js',
    // أيقونات PWA
    '/images/icon-192x192.png',
    '/images/icon-512x512.png',
    // خطوط عربية
    'https://fonts.bunny.net/css?family=figtree:400,500,600&display=swap',
    // مكتبات خارجية
    'https://cdn.tailwindcss.com',
    'https://unpkg.com/react@18/umd/react.development.js',
    'https://unpkg.com/react-dom@18/umd/react-dom.development.js',
    'https://unpkg.com/@babel/standalone/babel.min.js'
];

// استراتيجيات التخزين المؤقت
const CACHE_STRATEGIES = {
    // ملفات ثابتة - Cache First
    CACHE_FIRST: [
        '/css/',
        '/js/',
        '/images/',
        '/fonts/',
        'manifest.json'
    ],
    // صفحات ديناميكية - Network First
    NETWORK_FIRST: [
        '/api/',
        '/admin',
        '/customers',
        '/subscriptions',
        '/pos'
    ],
    // ملفات خارجية - Stale While Revalidate
    STALE_WHILE_REVALIDATE: [
        'fonts.bunny.net',
        'cdn.tailwindcss.com',
        'unpkg.com'
    ]
};

// تثبيت Service Worker
self.addEventListener('install', event => {
    console.log('🚀 SalesFlow Service Worker: تثبيت البرنامج...');

    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('📦 تخزين الملفات الأساسية...');
                return cache.addAll(STATIC_CACHE_URLS);
            })
            .then(() => {
                console.log('✅ تم تثبيت SalesFlow بنجاح');
                // فرض تفعيل Service Worker الجديد
                return self.skipWaiting();
            })
            .catch(error => {
                console.error('❌ خطأ في تثبيت Service Worker:', error);
            })
    );
});

// تفعيل Service Worker
self.addEventListener('activate', event => {
    console.log('🔄 SalesFlow Service Worker: تفعيل البرنامج...');

    event.waitUntil(
        caches.keys()
            .then(cacheNames => {
                // حذف الذاكرة المؤقتة القديمة
                return Promise.all(
                    cacheNames.map(cacheName => {
                        if (cacheName !== CACHE_NAME) {
                            console.log('🗑️ حذف الذاكرة المؤقتة القديمة:', cacheName);
                            return caches.delete(cacheName);
                        }
                    })
                );
            })
            .then(() => {
                console.log('✅ تم تفعيل SalesFlow بنجاح');
                // تولي السيطرة على جميع الصفحات المفتوحة
                return self.clients.claim();
            })
    );
});

// اعتراض طلبات الشبكة
self.addEventListener('fetch', event => {
    // تجاهل طلبات غير HTTP/HTTPS
    if (!event.request.url.startsWith('http')) {
        return;
    }

    // تجاهل طلبات Chrome Extensions
    if (event.request.url.includes('chrome-extension')) {
        return;
    }

    const url = new URL(event.request.url);
    const pathname = url.pathname;

    // تحديد استراتيجية التخزين المؤقت
    let strategy = 'NETWORK_FIRST'; // الافتراضي

    // فحص نوع الملف/المسار
    for (const [strategyName, patterns] of Object.entries(CACHE_STRATEGIES)) {
        if (patterns.some(pattern =>
            pathname.includes(pattern) || url.hostname.includes(pattern)
        )) {
            strategy = strategyName;
            break;
        }
    }

    // تطبيق الاستراتيجية المناسبة
    switch (strategy) {
        case 'CACHE_FIRST':
            event.respondWith(cacheFirstStrategy(event.request));
            break;
        case 'NETWORK_FIRST':
            event.respondWith(networkFirstStrategy(event.request));
            break;
        case 'STALE_WHILE_REVALIDATE':
            event.respondWith(staleWhileRevalidateStrategy(event.request));
            break;
        default:
            event.respondWith(networkFirstStrategy(event.request));
    }
});

// استراتيجية Cache First (للملفات الثابتة)
async function cacheFirstStrategy(request) {
    try {
        const cache = await caches.open(CACHE_NAME);
        const cachedResponse = await cache.match(request);

        if (cachedResponse) {
            console.log('📋 استخدام النسخة المخزنة:', request.url);
            return cachedResponse;
        }

        const networkResponse = await fetch(request);

        if (networkResponse.ok) {
            cache.put(request, networkResponse.clone());
            console.log('💾 تخزين ملف جديد:', request.url);
        }

        return networkResponse;
    } catch (error) {
        console.log('🔌 غير متصل بالإنترنت، استخدام النسخة المخزنة');
        return await caches.match(request) || await caches.match(OFFLINE_URL);
    }
}

// استراتيجية Network First (للصفحات الديناميكية)
async function networkFirstStrategy(request) {
    try {
        const networkResponse = await fetch(request);

        if (networkResponse.ok) {
            const cache = await caches.open(CACHE_NAME);
            cache.put(request, networkResponse.clone());
            console.log('🌐 تحديث من الشبكة:', request.url);
        }

        return networkResponse;
    } catch (error) {
        console.log('🔌 غير متصل، استخدام النسخة المخزنة:', request.url);
        const cachedResponse = await caches.match(request);

        if (cachedResponse) {
            return cachedResponse;
        }

        // إذا كانت صفحة HTML، عرض صفحة عدم الاتصال
        if (request.headers.get('accept').includes('text/html')) {
            return await caches.match(OFFLINE_URL);
        }

        throw error;
    }
}

// استراتيجية Stale While Revalidate (للمكتبات الخارجية)
async function staleWhileRevalidateStrategy(request) {
    const cache = await caches.open(CACHE_NAME);
    const cachedResponse = await cache.match(request);

    const fetchPromise = fetch(request).then(networkResponse => {
        if (networkResponse.ok) {
            cache.put(request, networkResponse.clone());
            console.log('🔄 تحديث في الخلفية:', request.url);
        }
        return networkResponse;
    }).catch(() => {
        console.log('⚠️ فشل في تحديث:', request.url);
    });

    // إرجاع النسخة المخزنة فوراً إن وجدت، وإلا انتظار الشبكة
    return cachedResponse || fetchPromise;
}

// التعامل مع رسائل من التطبيق الرئيسي
self.addEventListener('message', event => {
    if (event.data && event.data.type === 'SKIP_WAITING') {
        console.log('⏭️ تفعيل التحديث الجديد فوراً');
        self.skipWaiting();
    }

    if (event.data && event.data.type === 'CACHE_STATUS') {
        // إرسال حالة الذاكرة المؤقتة
        event.ports[0].postMessage({
            type: 'CACHE_STATUS_RESPONSE',
            cacheSize: 'معلومات الذاكرة المؤقتة'
        });
    }
});

// إشعارات Push (للمستقبل)
self.addEventListener('push', event => {
    if (!event.data) return;

    const data = event.data.json();
    const options = {
        body: data.body || 'إشعار جديد من SalesFlow',
        icon: '/images/icon-192x192.png',
        badge: '/images/badge-72x72.png',
        dir: 'rtl',
        lang: 'ar',
        tag: 'salesflow-notification',
        requireInteraction: false,
        actions: [
            {
                action: 'open',
                title: 'فتح التطبيق',
                icon: '/images/action-open.png'
            },
            {
                action: 'close',
                title: 'إغلاق',
                icon: '/images/action-close.png'
            }
        ]
    };

    event.waitUntil(
        self.registration.showNotification(
            data.title || 'SalesFlow',
            options
        )
    );
});

// التعامل مع النقر على الإشعارات
self.addEventListener('notificationclick', event => {
    event.notification.close();

    if (event.action === 'open' || !event.action) {
        event.waitUntil(
            clients.openWindow('/admin')
        );
    }
});

// تنظيف الذاكرة المؤقتة بشكل دوري
self.addEventListener('periodicsync', event => {
    if (event.tag === 'cache-cleanup') {
        event.waitUntil(cleanupOldCache());
    }
});

// دالة تنظيف الذاكرة المؤقتة القديمة
async function cleanupOldCache() {
    const cache = await caches.open(CACHE_NAME);
    const requests = await cache.keys();
    const now = Date.now();
    const maxAge = 7 * 24 * 60 * 60 * 1000; // أسبوع واحد

    for (const request of requests) {
        const response = await cache.match(request);
        const dateHeader = response.headers.get('date');

        if (dateHeader) {
            const responseDate = new Date(dateHeader);
            if (now - responseDate.getTime() > maxAge) {
                console.log('🧹 حذف ملف قديم من الذاكرة المؤقتة:', request.url);
                await cache.delete(request);
            }
        }
    }
}

console.log('🎯 SalesFlow Service Worker جاهز للعمل!');
