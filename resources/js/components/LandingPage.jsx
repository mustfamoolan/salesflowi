import React, { useState, useEffect } from 'react';

const LandingPage = () => {
    const [isArabic, setIsArabic] = useState(true);
    const [selectedPlan, setSelectedPlan] = useState('advanced');
    const [animatedElements, setAnimatedElements] = useState([]);
    const [showVideo, setShowVideo] = useState(false);
    const [showContactForm, setShowContactForm] = useState(false);
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [showSignupModal, setShowSignupModal] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);
    const [contactForm, setContactForm] = useState({
        name: '',
        email: '',
        phone: '',
        business: '',
        message: '',
        plan: 'advanced'
    });
    const [loginForm, setLoginForm] = useState({
        email: '',
        password: ''
    });
    const [signupForm, setSignupForm] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        business: '',
        phone: ''
    });

    useEffect(() => {
        // Add intersection observer for animations
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('animate-fade-in-up');
                    }
                });
            },
            { threshold: 0.1 }
        );

        const elements = document.querySelectorAll('.animate-on-scroll');
        elements.forEach((el) => observer.observe(el));

        return () => observer.disconnect();
    }, []);

    // Create floating particles
    const createParticles = () => {
        const particles = [];
        for (let i = 0; i < 15; i++) {
            particles.push(
                <div
                    key={i}
                    className="particle absolute"
                    style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                        width: `${Math.random() * 10 + 5}px`,
                        height: `${Math.random() * 10 + 5}px`,
                        animationDelay: `${Math.random() * 6}s`,
                        animationDuration: `${Math.random() * 4 + 3}s`
                    }}
                />
            );
        }
        return particles;
    };

    // Handle contact form
    const handleContactSubmit = (e) => {
        e.preventDefault();
        // Here you would typically send the data to your backend
        console.log('Contact form submitted:', contactForm);
        alert(isArabic ? 'تم إرسال رسالتك بنجاح! سنتواصل معك قريباً.' : 'Your message has been sent successfully! We will contact you soon.');
        setShowContactForm(false);
        setContactForm({
            name: '',
            email: '',
            phone: '',
            business: '',
            message: '',
            plan: selectedPlan
        });
    };

    const handleInputChange = (e) => {
        setContactForm({
            ...contactForm,
            [e.target.name]: e.target.value
        });
    };

    const handleLoginChange = (e) => {
        setLoginForm({
            ...loginForm,
            [e.target.name]: e.target.value
        });
    };

    const handleSignupChange = (e) => {
        setSignupForm({
            ...signupForm,
            [e.target.name]: e.target.value
        });
    };

    const handleLogin = (e) => {
        e.preventDefault();
        // هنا يتم التحقق من بيانات تسجيل الدخول مع الخادم
        console.log('Login attempt:', loginForm);

        // محاكاة تسجيل دخول ناجح
        if (loginForm.email && loginForm.password) {
            setUser({
                name: 'أحمد محمد',
                email: loginForm.email,
                business: 'متجر الإلكترونيات'
            });
            setIsLoggedIn(true);
            setShowLoginModal(false);
            setLoginForm({ email: '', password: '' });

            // التوجه إلى لوحة العميل
            setTimeout(() => {
                window.location.href = '/dashboard';
            }, 1000);
        }
    };

    const handleSignup = (e) => {
        e.preventDefault();
        // هنا يتم إنشاء حساب جديد
        console.log('Signup attempt:', signupForm);

        if (signupForm.password !== signupForm.confirmPassword) {
            alert(isArabic ? 'كلمات المرور غير متطابقة' : 'Passwords do not match');
            return;
        }

        // محاكاة إنشاء حساب ناجح
        if (signupForm.name && signupForm.email && signupForm.password) {
            setUser({
                name: signupForm.name,
                email: signupForm.email,
                business: signupForm.business
            });
            setIsLoggedIn(true);
            setShowSignupModal(false);
            setSignupForm({
                name: '',
                email: '',
                password: '',
                confirmPassword: '',
                business: '',
                phone: ''
            });

            // التوجه إلى لوحة العميل
            setTimeout(() => {
                window.location.href = '/dashboard';
            }, 1000);
        }
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
        setUser(null);
    };

    const content = {
        ar: {
            title: 'SalesFlow',
            subtitle: 'نظام إدارة المبيعات والمخزون الذكي',
            description: 'حلول متكاملة لإدارة أعمالك في البصرة والعراق - نظام SaaS متطور لإدارة المبيعات، المخزون، الديون، الأقساط، والعملاء',
            features: {
                title: 'ميزات النظام',
                list: [
                    '📊 إدارة شاملة للمبيعات والفواتير',
                    '📦 تتبع المخزون وتنبيهات النفاد',
                    '💳 نظام الديون والأقساط الذكي',
                    '👥 إدارة العملاء المتقدمة',
                    '📱 تصميم متجاوب للموبايل',
                    '📈 تقارير تفصيلية وإحصائيات',
                    '🔄 نسخ احتياطي تلقائي',
                    '🌐 دعم اللغة العربية كاملاً'
                ]
            },
            plans: {
                title: 'خطط الاشتراك',
                free: {
                    name: 'مجانية',
                    price: '0',
                    features: ['عدد محدود من العملاء', 'فواتير أساسية', 'بدون تقارير', 'دعم محدود']
                },
                basic: {
                    name: 'أساسية',
                    price: '5',
                    features: ['عملاء غير محدود', 'فواتير وديون', 'تقارير أساسية', 'دعم إيميل']
                },
                advanced: {
                    name: 'متقدمة',
                    price: '10',
                    features: ['كل ميزات الأساسية', 'نظام الأقساط الذكي', 'تقارير متقدمة', 'تصدير PDF/Excel']
                },
                professional: {
                    name: 'احترافية',
                    price: '20',
                    features: ['كل الميزات', 'صلاحيات متعددة', 'تقارير متقدمة', 'دعم أولوية']
                }
            },
            cta: {
                start: 'ابدأ تجربتك المجانية',
                contact: 'تواصل معنا',
                demo: 'شاهد العرض التوضيحي',
                login: 'تسجيل الدخول',
                signup: 'إنشاء حساب',
                dashboard: 'الذهاب للوحة التحكم'
            },
            video: {
                title: 'شاهد SalesFlow في العمل',
                subtitle: 'جولة سريعة لمدة 5 دقائق توضح كيفية استخدام النظام',
                watchText: 'شاهد الفيديو',
                duration: '5 دقائق'
            },
            testimonials: {
                title: 'ماذا يقول عملاؤنا',
                subtitle: 'آراء حقيقية من تجار وأصحاب أعمال في البصرة والعراق',
                list: [
                    {
                        name: 'أحمد العلي',
                        business: 'متجر الأجهزة الكهربائية',
                        text: 'SalesFlow غير طريقة إدارتي للمتجر بالكامل. الآن أستطيع متابعة المبيعات والمخزون بكل سهولة',
                        rating: 5
                    },
                    {
                        name: 'فاطمة محمد',
                        business: 'محل الأزياء النسائية',
                        text: 'النظام سهل جداً والدعم الفني ممتاز. أنصح كل التجار في البصرة باستخدامه',
                        rating: 5
                    },
                    {
                        name: 'كريم الحسن',
                        business: 'مطعم البصرة',
                        text: 'مع SalesFlow أصبح بإمكاني تتبع الطلبات والمصروفات بدقة. وفر علي وقت كثير',
                        rating: 5
                    }
                ]
            },
            faq: {
                title: 'الأسئلة الشائعة',
                subtitle: 'أجوبة على أكثر الأسئلة شيوعاً حول SalesFlow',
                list: [
                    {
                        question: 'هل يمكنني استخدام النظام بدون إنترنت؟',
                        answer: 'نعم، النظام يعمل بدون إنترنت ويتم مزامنة البيانات عند الاتصال.'
                    },
                    {
                        question: 'كم من الوقت يستغرق إعداد النظام؟',
                        answer: 'يمكنك البدء في استخدام النظام خلال دقائق، مع دليل سريع للإعداد.'
                    },
                    {
                        question: 'هل هناك رسوم إضافية للدعم الفني؟',
                        answer: 'الدعم الفني مجاني لكل العملاء، مع دعم أولوية للخطط المتقدمة.'
                    },
                    {
                        question: 'هل يمكنني ترقية أو تخفيض خطتي في أي وقت؟',
                        answer: 'نعم، يمكنك تغيير خطتك في أي وقت والدفع بالتناسب.'
                    }
                ]
            },
            footer: {
                location: 'البصرة، العراق',
                rights: 'جميع الحقوق محفوظة'
            },
            contact: {
                title: 'تواصل معنا',
                subtitle: 'نحن هنا لمساعدتك في بدء رحلتك مع SalesFlow',
                form: {
                    name: 'الاسم الكامل',
                    email: 'البريد الإلكتروني',
                    phone: 'رقم الهاتف',
                    business: 'نوع العمل',
                    plan: 'الخطة المرغوبة',
                    message: 'رسالتك',
                    send: 'إرسال الرسالة',
                    cancel: 'إلغاء'
                },
                placeholders: {
                    name: 'أدخل اسمك الكامل',
                    email: 'example@email.com',
                    phone: '+964 XXX XXX XXXX',
                    business: 'متجر، مطعم، شركة، إلخ',
                    message: 'أخبرنا كيف يمكننا مساعدتك...'
                }
            },
            auth: {
                login: {
                    title: 'تسجيل الدخول',
                    subtitle: 'مرحباً بعودتك إلى SalesFlow',
                    email: 'البريد الإلكتروني',
                    password: 'كلمة المرور',
                    submit: 'تسجيل الدخول',
                    forgotPassword: 'نسيت كلمة المرور؟',
                    noAccount: 'ليس لديك حساب؟',
                    signupLink: 'إنشاء حساب جديد'
                },
                signup: {
                    title: 'إنشاء حساب جديد',
                    subtitle: 'انضم إلى آلاف التجار الذين يثقون بـ SalesFlow',
                    name: 'الاسم الكامل',
                    email: 'البريد الإلكتروني',
                    password: 'كلمة المرور',
                    confirmPassword: 'تأكيد كلمة المرور',
                    business: 'نوع العمل',
                    phone: 'رقم الهاتف',
                    submit: 'إنشاء الحساب',
                    hasAccount: 'لديك حساب بالفعل؟',
                    loginLink: 'تسجيل الدخول',
                    terms: 'بإنشاء الحساب، أنت توافق على',
                    termsLink: 'الشروط والأحكام',
                    and: 'و',
                    privacyLink: 'سياسة الخصوصية'
                },
                welcome: 'مرحباً',
                logout: 'تسجيل الخروج'
            }
        },
        en: {
            title: 'SalesFlow',
            subtitle: 'Smart Sales & Inventory Management System',
            description: 'Comprehensive business management solutions for Basra and Iraq - Advanced SaaS system for sales, inventory, debts, installments, and customer management',
            features: {
                title: 'System Features',
                list: [
                    '📊 Comprehensive sales and invoice management',
                    '📦 Inventory tracking with stock alerts',
                    '💳 Smart debt and installment system',
                    '👥 Advanced customer management',
                    '📱 Mobile responsive design',
                    '📈 Detailed reports and analytics',
                    '🔄 Automatic backup system',
                    '🌐 Full Arabic language support'
                ]
            },
            plans: {
                title: 'Subscription Plans',
                free: {
                    name: 'Free',
                    price: '0',
                    features: ['Limited customers', 'Basic invoices', 'No reports', 'Limited support']
                },
                basic: {
                    name: 'Basic',
                    price: '5',
                    features: ['Unlimited customers', 'Invoices & debts', 'Basic reports', 'Email support']
                },
                advanced: {
                    name: 'Advanced',
                    price: '10',
                    features: ['All basic features', 'Smart installment system', 'Advanced reports', 'PDF/Excel export']
                },
                professional: {
                    name: 'Professional',
                    price: '20',
                    features: ['All features', 'Multi-user permissions', 'Advanced analytics', 'Priority support']
                }
            },
            cta: {
                start: 'Start Free Trial',
                contact: 'Contact Us',
                demo: 'Watch Demo',
                login: 'Login',
                signup: 'Sign Up',
                dashboard: 'Go to Dashboard'
            },
            video: {
                title: 'Watch SalesFlow in Action',
                subtitle: 'A quick 5-minute tour showing how to use the system',
                watchText: 'Watch Video',
                duration: '5 minutes'
            },
            testimonials: {
                title: 'What Our Customers Say',
                subtitle: 'Real feedback from merchants and business owners in Basra and Iraq',
                list: [
                    {
                        name: 'Ahmed Al-Ali',
                        business: 'Electronics Store',
                        text: 'SalesFlow completely transformed how I manage my store. Now I can track sales and inventory with ease',
                        rating: 5
                    },
                    {
                        name: 'Fatima Mohammed',
                        business: 'Women\'s Fashion Store',
                        text: 'The system is very easy to use and technical support is excellent. I recommend it to all merchants in Basra',
                        rating: 5
                    },
                    {
                        name: 'Kareem Al-Hassan',
                        business: 'Basra Restaurant',
                        text: 'With SalesFlow I can accurately track orders and expenses. It saved me a lot of time',
                        rating: 5
                    }
                ]
            },
            faq: {
                title: 'Frequently Asked Questions',
                subtitle: 'Answers to the most common questions about SalesFlow',
                list: [
                    {
                        question: 'Can I use the system without internet?',
                        answer: 'Yes, the system works offline and syncs data when connected.'
                    },
                    {
                        question: 'How long does it take to set up the system?',
                        answer: 'You can start using the system within minutes with a quick setup guide.'
                    },
                    {
                        question: 'Are there additional fees for technical support?',
                        answer: 'Technical support is free for all customers, with priority support for advanced plans.'
                    },
                    {
                        question: 'Can I upgrade or downgrade my plan anytime?',
                        answer: 'Yes, you can change your plan anytime and pay proportionally.'
                    }
                ]
            },
            footer: {
                location: 'Basra, Iraq',
                rights: 'All rights reserved'
            },
            contact: {
                title: 'Contact Us',
                subtitle: 'We are here to help you start your SalesFlow journey',
                form: {
                    name: 'Full Name',
                    email: 'Email Address',
                    phone: 'Phone Number',
                    business: 'Business Type',
                    plan: 'Desired Plan',
                    message: 'Your Message',
                    send: 'Send Message',
                    cancel: 'Cancel'
                },
                placeholders: {
                    name: 'Enter your full name',
                    email: 'example@email.com',
                    phone: '+964 XXX XXX XXXX',
                    business: 'Store, Restaurant, Company, etc',
                    message: 'Tell us how we can help you...'
                }
            },
            auth: {
                login: {
                    title: 'Login',
                    subtitle: 'Welcome back to SalesFlow',
                    email: 'Email Address',
                    password: 'Password',
                    submit: 'Login',
                    forgotPassword: 'Forgot Password?',
                    noAccount: 'Don\'t have an account?',
                    signupLink: 'Sign up now'
                },
                signup: {
                    title: 'Create New Account',
                    subtitle: 'Join thousands of merchants who trust SalesFlow',
                    name: 'Full Name',
                    email: 'Email Address',
                    password: 'Password',
                    confirmPassword: 'Confirm Password',
                    business: 'Business Type',
                    phone: 'Phone Number',
                    submit: 'Create Account',
                    hasAccount: 'Already have an account?',
                    loginLink: 'Login',
                    terms: 'By creating an account, you agree to our',
                    termsLink: 'Terms of Service',
                    and: 'and',
                    privacyLink: 'Privacy Policy'
                },
                welcome: 'Welcome',
                logout: 'Logout'
            }
        }
    };

    const currentContent = content[isArabic ? 'ar' : 'en'];

    return (
        <div className={`min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 ${isArabic ? 'rtl' : 'ltr'}`} dir={isArabic ? 'rtl' : 'ltr'}>
            {/* Header */}
            <header className="glass sticky top-0 z-50 backdrop-blur-md">
                <div className="container mx-auto px-4 py-3 flex justify-between items-center">
                    <div className="flex items-center">
                        <div className="text-2xl md:text-3xl font-bold bg-gradient-text">
                            💼 {currentContent.title}
                        </div>
                        <span className="hidden lg:block text-xs bg-indigo-100 px-2 py-1 rounded-full mr-3 text-gray-600">
                            {isArabic ? 'البصرة، العراق' : 'Basra, Iraq'}
                        </span>
                    </div>

                    <div className="flex items-center space-x-1">
                        {/* Language Toggle - Always visible but smaller on mobile */}
                        <button
                            onClick={() => setIsArabic(!isArabic)}
                            className="text-xs md:text-sm px-2 md:px-3 py-1 md:py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors duration-200"
                        >
                            {isArabic ? 'EN' : 'ع'}
                        </button>

                        {!isLoggedIn ? (
                            <>
                                {/* Desktop View */}
                                <div className="hidden md:flex items-center space-x-2">
                                    <button
                                        onClick={() => setShowLoginModal(true)}
                                        className="text-gray-700 hover:text-indigo-600 font-medium transition-colors duration-200 px-3 py-2"
                                    >
                                        {currentContent.cta.login}
                                    </button>
                                    <button
                                        onClick={() => setShowSignupModal(true)}
                                        className="btn-primary text-sm px-4 py-2"
                                    >
                                        {currentContent.cta.signup}
                                    </button>
                                </div>

                                {/* Mobile View */}
                                <div className="md:hidden flex items-center space-x-1">
                                    <button
                                        onClick={() => setShowLoginModal(true)}
                                        className="text-xs px-2 py-1 text-gray-700 hover:text-indigo-600 font-medium transition-colors duration-200"
                                        title={currentContent.cta.login}
                                    >
                                        {isArabic ? 'دخول' : 'Login'}
                                    </button>
                                    <button
                                        onClick={() => setShowSignupModal(true)}
                                        className="text-xs px-2 py-1 bg-indigo-600 hover:bg-indigo-700 text-white rounded transition-colors duration-200"
                                        title={currentContent.cta.signup}
                                    >
                                        {isArabic ? 'حساب' : 'Sign Up'}
                                    </button>
                                </div>
                            </>
                        ) : (
                            <>
                                {/* Desktop Logged In View */}
                                <div className="hidden md:flex items-center space-x-3">
                                    <div className="text-right">
                                        <p className="text-sm font-medium text-gray-700">
                                            {currentContent.auth.welcome}, {user?.name}
                                        </p>
                                        <p className="text-xs text-gray-500">{user?.business}</p>
                                    </div>
                                    <div className="flex space-x-2">
                                        <button
                                            onClick={() => window.location.href = '/dashboard'}
                                            className="btn-primary text-sm px-4 py-2"
                                        >
                                            {currentContent.cta.dashboard}
                                        </button>
                                        <button
                                            onClick={handleLogout}
                                            className="btn-secondary text-sm px-3 py-2"
                                        >
                                            {currentContent.auth.logout}
                                        </button>
                                    </div>
                                </div>

                                {/* Mobile Logged In View */}
                                <div className="md:hidden flex items-center space-x-1">
                                    <div className="text-xs text-gray-700 truncate max-w-20">
                                        {user?.name?.split(' ')[0]}
                                    </div>
                                    <button
                                        onClick={() => window.location.href = '/dashboard'}
                                        className="text-xs px-2 py-1 bg-indigo-600 hover:bg-indigo-700 text-white rounded transition-colors duration-200"
                                    >
                                        {isArabic ? 'لوحة' : 'Panel'}
                                    </button>
                                    <button
                                        onClick={handleLogout}
                                        className="text-xs px-2 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded transition-colors duration-200"
                                        title={currentContent.auth.logout}
                                    >
                                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                        </svg>
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </header>            {/* Hero Section */}
            <section className="relative py-24 overflow-hidden">
                {/* Floating Particles Background */}
                <div className="particles">
                    {createParticles()}
                </div>

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-hero opacity-10"></div>

                <div className="container mx-auto px-6 text-center relative z-10">
                    <div className="animate-on-scroll">
                        <span className="inline-block bg-indigo-100 text-indigo-800 px-6 py-2 rounded-full text-sm font-semibold mb-6 animate-bounce-custom">
                            {isArabic ? '🚀 الآن في البصرة!' : '🚀 Now in Basra!'}
                        </span>

                        <h1 className="text-hero bg-gradient-text mb-8 animate-fade-in-up">
                            {currentContent.subtitle}
                        </h1>

                        <p className="text-subtitle text-gray-700 mb-12 max-w-4xl mx-auto leading-relaxed animate-slide-in-right">
                            {currentContent.description}
                        </p>

                        <div className="flex flex-col sm:flex-row gap-6 justify-center animate-slide-in-left">
                            <button
                                className="btn-primary shadow-glow animate-float"
                                onClick={() => setShowContactForm(true)}
                            >
                                <span className="flex items-center justify-center">
                                    <span className="mr-2">🚀</span>
                                    {currentContent.cta.start}
                                </span>
                            </button>
                            <button
                                className="btn-secondary shadow-soft"
                                onClick={() => setShowVideo(true)}
                            >
                                <span className="flex items-center justify-center">
                                    <span className="mr-2">▶️</span>
                                    {currentContent.cta.demo}
                                </span>
                            </button>
                        </div>

                        {/* Stats Cards */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 animate-on-scroll">
                            <div className="glass p-6 rounded-2xl shadow-soft card-hover">
                                <div className="text-2xl font-bold text-indigo-600 mb-2">1000+</div>
                                <div className="text-gray-600 text-sm">{isArabic ? 'عميل راضي' : 'Happy Clients'}</div>
                            </div>
                            <div className="glass p-6 rounded-2xl shadow-soft card-hover">
                                <div className="text-2xl font-bold text-green-600 mb-2">99.9%</div>
                                <div className="text-gray-600 text-sm">{isArabic ? 'وقت التشغيل' : 'Uptime'}</div>
                            </div>
                            <div className="glass p-6 rounded-2xl shadow-soft card-hover">
                                <div className="text-2xl font-bold text-purple-600 mb-2">24/7</div>
                                <div className="text-gray-600 text-sm">{isArabic ? 'دعم فني' : 'Support'}</div>
                            </div>
                            <div className="glass p-6 rounded-2xl shadow-soft card-hover">
                                <div className="text-2xl font-bold text-orange-600 mb-2">30</div>
                                <div className="text-gray-600 text-sm">{isArabic ? 'يوم تجربة' : 'Day Trial'}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-24 relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-indigo-50"></div>
                <div className="container mx-auto px-6 relative z-10">
                    <div className="text-center mb-16 animate-on-scroll">
                        <span className="inline-block bg-gradient-primary text-white px-6 py-2 rounded-full text-sm font-semibold mb-4">
                            {isArabic ? '✨ ميزات متطورة' : '✨ Advanced Features'}
                        </span>
                        <h2 className="text-4xl font-bold bg-gradient-text mb-6">
                            {currentContent.features.title}
                        </h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            {isArabic
                                ? 'اكتشف كيف يمكن لـ SalesFlow تحويل طريقة إدارة أعمالك'
                                : 'Discover how SalesFlow can transform your business management'
                            }
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {currentContent.features.list.map((feature, index) => {
                            const [icon, ...textParts] = feature.split(' ');
                            const text = textParts.join(' ');

                            return (
                                <div
                                    key={index}
                                    className="group p-8 rounded-2xl bg-white shadow-soft hover:shadow-glow transition-all duration-500 card-hover animate-on-scroll border border-gray-100"
                                    style={{ animationDelay: `${index * 100}ms` }}
                                >
                                    <div className="feature-icon text-4xl mb-4 group-hover:animate-bounce-custom">
                                        {icon}
                                    </div>
                                    <div className="text-gray-700 leading-relaxed font-medium">
                                        {text}
                                    </div>
                                    <div className="mt-4 w-12 h-1 bg-gradient-primary rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Additional Feature Highlight */}
                    <div className="mt-20 grid md:grid-cols-2 gap-12 items-center animate-on-scroll">
                        <div className="order-2 md:order-1">
                            <h3 className="text-3xl font-bold text-gray-800 mb-6">
                                {isArabic ? 'لماذا SalesFlow؟' : 'Why SalesFlow?'}
                            </h3>
                            <div className="space-y-4">
                                <div className="flex items-center">
                                    <div className="w-3 h-3 bg-green-500 rounded-full mr-4 animate-pulse-custom"></div>
                                    <span className="text-gray-700">{isArabic ? 'سهولة الاستخدام' : 'Easy to use'}</span>
                                </div>
                                <div className="flex items-center">
                                    <div className="w-3 h-3 bg-blue-500 rounded-full mr-4 animate-pulse-custom"></div>
                                    <span className="text-gray-700">{isArabic ? 'أمان عالي' : 'High security'}</span>
                                </div>
                                <div className="flex items-center">
                                    <div className="w-3 h-3 bg-purple-500 rounded-full mr-4 animate-pulse-custom"></div>
                                    <span className="text-gray-700">{isArabic ? 'دعم محلي' : 'Local support'}</span>
                                </div>
                            </div>
                        </div>
                        <div className="order-1 md:order-2">
                            <div className="relative">
                                <div className="absolute inset-0 bg-gradient-primary rounded-2xl transform rotate-6 opacity-20"></div>
                                <div className="relative bg-white p-8 rounded-2xl shadow-soft">
                                    <div className="text-6xl text-center mb-4 animate-float">📊</div>
                                    <div className="text-center">
                                        <h4 className="text-xl font-bold text-gray-800 mb-2">
                                            {isArabic ? 'تحكم كامل' : 'Full Control'}
                                        </h4>
                                        <p className="text-gray-600">
                                            {isArabic
                                                ? 'تحكم في كل جانب من جوانب عملك'
                                                : 'Control every aspect of your business'
                                            }
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Video Demo Section */}
            <section className="py-24 bg-white relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 to-purple-50 opacity-50"></div>
                <div className="container mx-auto px-6 relative z-10">
                    <div className="text-center mb-16 animate-on-scroll">
                        <span className="inline-block bg-red-100 text-red-800 px-6 py-2 rounded-full text-sm font-semibold mb-4">
                            {isArabic ? '🎥 فيديو توضيحي' : '🎥 Demo Video'}
                        </span>
                        <h2 className="text-4xl font-bold text-gray-800 mb-6">
                            {currentContent.video.title}
                        </h2>
                        <p className="text-gray-600 max-w-2xl mx-auto text-lg">
                            {currentContent.video.subtitle}
                        </p>
                    </div>

                    <div className="max-w-4xl mx-auto animate-on-scroll">
                        <div className="relative group cursor-pointer video-thumbnail" onClick={() => setShowVideo(true)}>
                            {/* Video Thumbnail */}
                            <div className="relative bg-gradient-to-br from-gray-900 to-gray-700 rounded-2xl overflow-hidden shadow-2xl">
                                <img
                                    src="https://img.youtube.com/vi/tcCf6fFvY2w/maxresdefault.jpg"
                                    alt="SalesFlow Demo Video"
                                    className="w-full h-auto aspect-video object-cover group-hover:scale-105 transition-transform duration-500"
                                />

                                {/* Play Button Overlay */}
                                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center group-hover:bg-opacity-30 transition-all duration-300">
                                    <div className="bg-white bg-opacity-90 rounded-full p-6 group-hover:bg-opacity-100 group-hover:scale-110 transition-all duration-300 shadow-2xl play-button">
                                        <svg className="w-12 h-12 text-indigo-600 ml-1" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M8 5v14l11-7z"/>
                                        </svg>
                                    </div>
                                </div>

                                {/* Duration Badge */}
                                <div className="absolute bottom-4 right-4 bg-black bg-opacity-75 text-white px-3 py-1 rounded-full text-sm font-medium">
                                    {currentContent.video.duration}
                                </div>
                            </div>

                            {/* Video Info */}
                            <div className="mt-6 text-center">
                                <button className="inline-flex items-center justify-center bg-gradient-primary text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-glow hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                                    <svg className="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M8 5v14l11-7z"/>
                                    </svg>
                                    {currentContent.video.watchText}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Pricing Section */}
            <section className="py-20 bg-gray-50">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
                        {currentContent.plans.title}
                    </h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {Object.entries(currentContent.plans).filter(([key]) => key !== 'title').map(([key, plan]) => (
                            <div
                                key={key}
                                className={`bg-white rounded-lg shadow-lg p-8 text-center transform hover:scale-105 transition-transform ${
                                    key === 'advanced' ? 'ring-4 ring-indigo-200 relative' : ''
                                }`}
                            >
                                {key === 'advanced' && (
                                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                                        <span className="bg-indigo-600 text-white px-4 py-2 rounded-full text-sm font-semibold">
                                            الأكثر شعبية
                                        </span>
                                    </div>
                                )}
                                <h3 className="text-2xl font-bold text-gray-800 mb-4">{plan.name}</h3>
                                <div className="text-4xl font-bold text-indigo-600 mb-6">
                                    ${plan.price}
                                    <span className="text-lg text-gray-500">/{isArabic ? 'شهر' : 'month'}</span>
                                </div>
                                <ul className="space-y-3 text-gray-600 mb-8">
                                    {plan.features.map((feature, index) => (
                                        <li key={index} className="flex items-center">
                                            <span className="text-green-500 mr-2">✓</span>
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                                <button
                                    className={`w-full py-3 rounded-lg font-semibold transition-colors ${
                                        key === 'advanced'
                                            ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                                            : 'border-2 border-indigo-600 text-indigo-600 hover:bg-indigo-600 hover:text-white'
                                    }`}
                                    onClick={() => setSelectedPlan(key)}
                                >
                                    {isArabic ? 'اختر الخطة' : 'Choose Plan'}
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonials Section */}
            <section className="py-24 bg-gray-50">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-16 animate-on-scroll">
                        <span className="inline-block bg-green-100 text-green-800 px-6 py-2 rounded-full text-sm font-semibold mb-4">
                            {isArabic ? '⭐ شهادات العملاء' : '⭐ Customer Testimonials'}
                        </span>
                        <h2 className="text-4xl font-bold text-gray-800 mb-6">
                            {currentContent.testimonials.title}
                        </h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            {currentContent.testimonials.subtitle}
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {currentContent.testimonials.list.map((testimonial, index) => (
                            <div
                                key={index}
                                className="bg-white p-8 rounded-2xl shadow-soft card-hover animate-on-scroll"
                                style={{ animationDelay: `${index * 200}ms` }}
                            >
                                <div className="flex mb-4">
                                    {[...Array(testimonial.rating)].map((_, i) => (
                                        <span key={i} className="text-yellow-400 text-xl">⭐</span>
                                    ))}
                                </div>
                                <p className="text-gray-700 mb-6 leading-relaxed italic">
                                    "{testimonial.text}"
                                </p>
                                <div className="border-t pt-4">
                                    <h4 className="font-semibold text-gray-800">{testimonial.name}</h4>
                                    <p className="text-gray-600 text-sm">{testimonial.business}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="py-24 bg-white">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-16 animate-on-scroll">
                        <span className="inline-block bg-blue-100 text-blue-800 px-6 py-2 rounded-full text-sm font-semibold mb-4">
                            {isArabic ? '❓ أسئلة وأجوبة' : '❓ FAQ'}
                        </span>
                        <h2 className="text-4xl font-bold text-gray-800 mb-6">
                            {currentContent.faq.title}
                        </h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            {currentContent.faq.subtitle}
                        </p>
                    </div>

                    <div className="max-w-4xl mx-auto">
                        {currentContent.faq.list.map((faq, index) => (
                            <div
                                key={index}
                                className="faq-item border border-gray-200 rounded-xl mb-4 overflow-hidden card-hover animate-on-scroll"
                                style={{ animationDelay: `${index * 100}ms` }}
                            >
                                <div className="bg-gray-50 p-6 cursor-pointer" onClick={(e) => {
                                    const content = e.target.closest('.faq-item').querySelector('.faq-content');
                                    content.style.display = content.style.display === 'block' ? 'none' : 'block';
                                }}>
                                    <h3 className="text-lg font-semibold text-gray-800 flex items-center justify-between">
                                        {faq.question}
                                        <span className="text-2xl text-indigo-600">+</span>
                                    </h3>
                                </div>
                                <div className="faq-content p-6 bg-white" style={{ display: 'none' }}>
                                    <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-indigo-600">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl font-bold text-white mb-6">
                        {isArabic ? 'جاهز لبدء رحلتك مع SalesFlow؟' : 'Ready to start your SalesFlow journey?'}
                    </h2>
                    <p className="text-xl text-indigo-100 mb-8 max-w-2xl mx-auto">
                        {isArabic
                            ? 'انضم إلى آلاف التجار في البصرة والعراق الذين يثقون بـ SalesFlow لإدارة أعمالهم'
                            : 'Join thousands of merchants in Basra and Iraq who trust SalesFlow to manage their business'
                        }
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button
                            className="bg-white text-indigo-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-colors"
                            onClick={() => setShowContactForm(true)}
                        >
                            {currentContent.cta.start}
                        </button>
                        <button
                            className="border-2 border-white text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-white hover:text-indigo-600 transition-colors"
                            onClick={() => setShowContactForm(true)}
                        >
                            {currentContent.cta.contact}
                        </button>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-gray-800 text-white py-12">
                <div className="container mx-auto px-4">
                    <div className="grid md:grid-cols-3 gap-8">
                        <div>
                            <h3 className="text-2xl font-bold mb-4">💼 SalesFlow</h3>
                            <p className="text-gray-300">
                                {isArabic
                                    ? 'نظام إدارة المبيعات والمخزون الرائد في العراق'
                                    : 'Leading sales and inventory management system in Iraq'
                                }
                            </p>
                        </div>
                        <div>
                            <h4 className="text-lg font-semibold mb-4">
                                {isArabic ? 'روابط سريعة' : 'Quick Links'}
                            </h4>
                            <ul className="space-y-2 text-gray-300">
                                <li><a href="#" className="hover:text-white transition-colors">{isArabic ? 'الميزات' : 'Features'}</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">{isArabic ? 'الأسعار' : 'Pricing'}</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">{isArabic ? 'الدعم' : 'Support'}</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">{isArabic ? 'تواصل معنا' : 'Contact'}</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-lg font-semibold mb-4">
                                {isArabic ? 'معلومات التواصل' : 'Contact Info'}
                            </h4>
                            <div className="text-gray-300 space-y-2">
                                <p>📍 {currentContent.footer.location}</p>
                                <p>📞 +964 XXX XXX XXXX</p>
                                <p>✉️ info@salesflow.iq</p>
                            </div>
                        </div>
                    </div>
                    <hr className="border-gray-700 my-8" />
                    <div className="text-center text-gray-400">
                        <p>&copy; 2025 SalesFlow. {currentContent.footer.rights}</p>
                    </div>
                </div>
            </footer>

            {/* Video Modal */}
            {showVideo && (
                <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4 video-modal" onClick={() => setShowVideo(false)}>
                    <div className="relative max-w-4xl w-full bg-white rounded-2xl shadow-2xl overflow-hidden video-modal-content" onClick={(e) => e.stopPropagation()}>
                        {/* Modal Header */}
                        <div className="flex items-center justify-between p-6 border-b border-gray-200">
                            <div>
                                <h3 className="text-xl font-bold text-gray-800">
                                    {currentContent.video.title}
                                </h3>
                                <p className="text-gray-600 text-sm mt-1">
                                    {currentContent.video.subtitle}
                                </p>
                            </div>
                            <button
                                onClick={() => setShowVideo(false)}
                                className="text-gray-400 hover:text-gray-600 transition-colors p-2 hover:bg-gray-100 rounded-full"
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        {/* Video Container */}
                        <div className="relative aspect-video">
                            <iframe
                                src="https://www.youtube.com/embed/tcCf6fFvY2w?autoplay=1&rel=0&modestbranding=1"
                                title="SalesFlow Demo Video"
                                className="w-full h-full"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            ></iframe>
                        </div>

                        {/* Modal Footer */}
                        <div className="p-6 bg-gray-50 border-t border-gray-200">
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <button
                                    className="btn-primary"
                                    onClick={() => {
                                        setShowVideo(false);
                                        setShowContactForm(true);
                                    }}
                                >
                                    {isArabic ? 'ابدأ تجربتك المجانية' : 'Start Free Trial'}
                                </button>
                                <button
                                    className="btn-secondary"
                                    onClick={() => {
                                        setShowVideo(false);
                                        setShowContactForm(true);
                                    }}
                                >
                                    {isArabic ? 'تواصل معنا' : 'Contact Us'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Contact Form Modal */}
            {showContactForm && (
                <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4 video-modal" onClick={() => setShowContactForm(false)}>
                    <div className="relative max-w-2xl w-full bg-white rounded-2xl shadow-2xl overflow-hidden video-modal-content" onClick={(e) => e.stopPropagation()}>
                        {/* Modal Header */}
                        <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gradient-primary text-white">
                            <div>
                                <h3 className="text-2xl font-bold">
                                    {currentContent.contact.title}
                                </h3>
                                <p className="text-white/80 text-sm mt-1">
                                    {currentContent.contact.subtitle}
                                </p>
                            </div>
                            <button
                                onClick={() => setShowContactForm(false)}
                                className="text-white/80 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-full"
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        {/* Contact Form */}
                        <form onSubmit={handleContactSubmit} className="p-6 space-y-6">
                            <div className="grid md:grid-cols-2 gap-6">
                                {/* Name Field */}
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        {currentContent.contact.form.name} *
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={contactForm.name}
                                        onChange={handleInputChange}
                                        placeholder={currentContent.contact.placeholders.name}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                                        required
                                    />
                                </div>

                                {/* Email Field */}
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        {currentContent.contact.form.email} *
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={contactForm.email}
                                        onChange={handleInputChange}
                                        placeholder={currentContent.contact.placeholders.email}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                                        required
                                    />
                                </div>

                                {/* Phone Field */}
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        {currentContent.contact.form.phone}
                                    </label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={contactForm.phone}
                                        onChange={handleInputChange}
                                        placeholder={currentContent.contact.placeholders.phone}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                                    />
                                </div>

                                {/* Business Type Field */}
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        {currentContent.contact.form.business}
                                    </label>
                                    <input
                                        type="text"
                                        name="business"
                                        value={contactForm.business}
                                        onChange={handleInputChange}
                                        placeholder={currentContent.contact.placeholders.business}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                                    />
                                </div>
                            </div>

                            {/* Plan Selection */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    {currentContent.contact.form.plan}
                                </label>
                                <select
                                    name="plan"
                                    value={contactForm.plan}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                                >
                                    {Object.entries(currentContent.plans).filter(([key]) => key !== 'title').map(([key, plan]) => (
                                        <option key={key} value={key}>
                                            {plan.name} - ${plan.price}/{isArabic ? 'شهر' : 'month'}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Message Field */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    {currentContent.contact.form.message}
                                </label>
                                <textarea
                                    name="message"
                                    value={contactForm.message}
                                    onChange={handleInputChange}
                                    placeholder={currentContent.contact.placeholders.message}
                                    rows="4"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all resize-none"
                                ></textarea>
                            </div>

                            {/* Form Actions */}
                            <div className="flex flex-col sm:flex-row gap-4 pt-4">
                                <button
                                    type="submit"
                                    className="btn-primary flex-1 justify-center"
                                >
                                    <span className="flex items-center justify-center">
                                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                                        </svg>
                                        {currentContent.contact.form.send}
                                    </span>
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setShowContactForm(false)}
                                    className="btn-secondary flex-1 justify-center"
                                >
                                    {currentContent.contact.form.cancel}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Login Modal */}
            {showLoginModal && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-2 sm:p-4">
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm sm:max-w-md transform animate-fade-in-up max-h-[95vh] overflow-y-auto">
                        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-200 bg-gradient-primary text-white rounded-t-2xl">
                            <div>
                                <h3 className="text-lg sm:text-2xl font-bold">
                                    {currentContent.auth.login.title}
                                </h3>
                                <p className="text-white/80 text-xs sm:text-sm mt-1">
                                    {currentContent.auth.login.subtitle}
                                </p>
                            </div>
                            <button
                                onClick={() => setShowLoginModal(false)}
                                className="text-white/80 hover:text-white transition-colors p-1 hover:bg-white/10 rounded-full"
                            >
                                <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        <form onSubmit={handleLogin} className="p-4 sm:p-6 space-y-4 sm:space-y-6">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    {currentContent.auth.login.email} *
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    value={loginForm.email}
                                    onChange={handleLoginChange}
                                    placeholder="admin@salesflow.com"
                                    className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    {currentContent.auth.login.password} *
                                </label>
                                <input
                                    type="password"
                                    name="password"
                                    value={loginForm.password}
                                    onChange={handleLoginChange}
                                    placeholder="••••••••"
                                    className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                                    required
                                />
                            </div>

                            <div className="flex items-center justify-between">
                                <label className="flex items-center">
                                    <input type="checkbox" className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                                    <span className="mr-2 text-xs sm:text-sm text-gray-600">
                                        {isArabic ? 'تذكرني' : 'Remember me'}
                                    </span>
                                </label>
                                <button type="button" className="text-xs sm:text-sm text-indigo-600 hover:text-indigo-800 transition-colors">
                                    {currentContent.auth.login.forgotPassword}
                                </button>
                            </div>

                            <button
                                type="submit"
                                className="w-full btn-primary justify-center py-2 sm:py-3 text-sm"
                            >
                                <span className="flex items-center justify-center">
                                    <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                                    </svg>
                                    {currentContent.auth.login.submit}
                                </span>
                            </button>

                            <div className="text-center">
                                <p className="text-xs sm:text-sm text-gray-600">
                                    {currentContent.auth.login.noAccount}{' '}
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setShowLoginModal(false);
                                            setShowSignupModal(true);
                                        }}
                                        className="text-indigo-600 hover:text-indigo-800 font-medium transition-colors"
                                    >
                                        {currentContent.auth.login.signupLink}
                                    </button>
                                </p>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Signup Modal */}
            {showSignupModal && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-2 sm:p-4">
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm sm:max-w-md transform animate-fade-in-up max-h-[95vh] overflow-y-auto">
                        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-200 bg-gradient-primary text-white rounded-t-2xl">
                            <div>
                                <h3 className="text-lg sm:text-2xl font-bold">
                                    {currentContent.auth.signup.title}
                                </h3>
                                <p className="text-white/80 text-xs sm:text-sm mt-1">
                                    {currentContent.auth.signup.subtitle}
                                </p>
                            </div>
                            <button
                                onClick={() => setShowSignupModal(false)}
                                className="text-white/80 hover:text-white transition-colors p-1 hover:bg-white/10 rounded-full"
                            >
                                <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        <form onSubmit={handleSignup} className="p-4 sm:p-6 space-y-3 sm:space-y-4">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1 sm:mb-2">
                                    {currentContent.auth.signup.name} *
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    value={signupForm.name}
                                    onChange={handleSignupChange}
                                    placeholder={isArabic ? 'أحمد محمد العلي' : 'Ahmed Mohammed Al-Ali'}
                                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1 sm:mb-2">
                                    {currentContent.auth.signup.email} *
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    value={signupForm.email}
                                    onChange={handleSignupChange}
                                    placeholder="ahmed@example.com"
                                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1 sm:mb-2">
                                    {currentContent.auth.signup.phone}
                                </label>
                                <input
                                    type="tel"
                                    name="phone"
                                    value={signupForm.phone}
                                    onChange={handleSignupChange}
                                    placeholder="+964 XXX XXX XXXX"
                                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1 sm:mb-2">
                                    {currentContent.auth.signup.business}
                                </label>
                                <input
                                    type="text"
                                    name="business"
                                    value={signupForm.business}
                                    onChange={handleSignupChange}
                                    placeholder={isArabic ? 'متجر الإلكترونيات' : 'Electronics Store'}
                                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1 sm:mb-2">
                                    {currentContent.auth.signup.password} *
                                </label>
                                <input
                                    type="password"
                                    name="password"
                                    value={signupForm.password}
                                    onChange={handleSignupChange}
                                    placeholder="••••••••"
                                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1 sm:mb-2">
                                    {currentContent.auth.signup.confirmPassword} *
                                </label>
                                <input
                                    type="password"
                                    name="confirmPassword"
                                    value={signupForm.confirmPassword}
                                    onChange={handleSignupChange}
                                    placeholder="••••••••"
                                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                                    required
                                />
                            </div>

                            <div className="text-xs sm:text-sm text-gray-600 bg-gray-50 p-2 sm:p-3 rounded-lg">
                                {currentContent.auth.signup.terms}{' '}
                                <button type="button" className="text-indigo-600 hover:text-indigo-800 transition-colors">
                                    {currentContent.auth.signup.termsLink}
                                </button>{' '}
                                {currentContent.auth.signup.and}{' '}
                                <button type="button" className="text-indigo-600 hover:text-indigo-800 transition-colors">
                                    {currentContent.auth.signup.privacyLink}
                                </button>
                            </div>

                            <button
                                type="submit"
                                className="w-full btn-primary justify-center py-2 sm:py-3 text-sm"
                            >
                                <span className="flex items-center justify-center">
                                    <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                                    </svg>
                                    {currentContent.auth.signup.submit}
                                </span>
                            </button>

                            <div className="text-center">
                                <p className="text-xs sm:text-sm text-gray-600">
                                    {currentContent.auth.signup.hasAccount}{' '}
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setShowSignupModal(false);
                                            setShowLoginModal(true);
                                        }}
                                        className="text-indigo-600 hover:text-indigo-800 font-medium transition-colors"
                                    >
                                        {currentContent.auth.signup.loginLink}
                                    </button>
                                </p>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default LandingPage;
