<!DOCTYPE html>
<html lang="ar">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>SalesFlow - نظام إدارة المبيعات والمخزون الذكي</title>

    <!-- Meta tags for SEO -->
    <meta name="description" content="SalesFlow - نظام إدارة المبيعات والمخزون الذكي للشركات في البصرة والعراق. حلول متكاملة لإدارة الفواتير والديون والأقساط والعملاء">
    <meta name="keywords" content="إدارة المبيعات, المخزون, الفواتير, الديون, الأقساط, البصرة, العراق, SaaS">
    <meta name="author" content="SalesFlow">

    <!-- Open Graph Meta Tags -->
    <meta property="og:title" content="SalesFlow - نظام إدارة المبيعات والمخزون الذكي">
    <meta property="og:description" content="حلول متكاملة لإدارة أعمالك في البصرة والعراق - نظام SaaS متطور لإدارة المبيعات والمخزون">
    <meta property="og:type" content="website">
    <meta property="og:url" content="{{ url('/') }}">

    <!-- Favicon -->
    <link rel="icon" type="image/x-icon" href="/favicon.ico">

    <!-- Google Fonts for Arabic -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@300;400;600;700&display=swap" rel="stylesheet">

    <!-- Vite CSS -->
    @vite(['resources/css/app.css'])

    <style>
        * {
            font-family: 'Cairo', Arial, sans-serif;
        }

        .rtl {
            direction: rtl;
            text-align: right;
        }

        .ltr {
            direction: ltr;
            text-align: left;
        }

        /* Enhanced scrollbar */
        ::-webkit-scrollbar {
            width: 12px;
        }

        ::-webkit-scrollbar-track {
            background: linear-gradient(180deg, #f1f5f9 0%, #e2e8f0 100%);
            border-radius: 6px;
        }

        ::-webkit-scrollbar-thumb {
            background: linear-gradient(180deg, #667eea 0%, #764ba2 100%);
            border-radius: 6px;
            border: 2px solid #f1f5f9;
        }

        ::-webkit-scrollbar-thumb:hover {
            background: linear-gradient(180deg, #4f46e5 0%, #6366f1 100%);
        }

        /* Smooth animations */
        * {
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        /* Enhanced loading animation */
        .loading {
            display: inline-block;
            width: 24px;
            height: 24px;
            border: 3px solid #f3f4f6;
            border-top: 3px solid #667eea;
            border-radius: 50%;
            animation: spin 1s linear infinite;
            box-shadow: 0 0 15px rgba(102, 126, 234, 0.3);
        }

        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }

        /* Page load animation */
        @keyframes pageLoad {
            0% {
                opacity: 0;
                transform: translateY(20px);
            }
            100% {
                opacity: 1;
                transform: translateY(0);
            }
        }

        .page-load {
            animation: pageLoad 0.8s ease-out;
        }

        /* Gradient backgrounds */
        .bg-gradient-hero {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
        }

        .bg-gradient-card {
            background: linear-gradient(145deg, #ffffff 0%, #f8fafc 100%);
        }

        /* Glass effect */
        .glass-effect {
            background: rgba(255, 255, 255, 0.25);
            backdrop-filter: blur(10px);
            -webkit-backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.2);
        }

        /* Floating animation for loading screen */
        .loading-float {
            animation: float 2s ease-in-out infinite;
        }

        @keyframes float {
            0%, 100% {
                transform: translateY(0px);
            }
            50% {
                transform: translateY(-10px);
            }
        }

        /* Smooth reveal animation */
        .reveal {
            opacity: 0;
            transform: translateY(30px);
            transition: all 0.6s ease-out;
        }

        .reveal.active {
            opacity: 1;
            transform: translateY(0);
        }
    </style>
</head>
<body class="bg-gray-50">
    <!-- Enhanced Loading Screen -->
    <div id="loading-screen" class="fixed inset-0 bg-gradient-hero z-50 flex items-center justify-center">
        <div class="text-center text-white">
            <div class="mb-8 loading-float">
                <div class="text-6xl mb-4">💼</div>
                <h2 class="text-2xl font-bold mb-2">SalesFlow</h2>
                <p class="text-white/80 mb-6">نظام إدارة المبيعات الذكي</p>
            </div>
            <div class="loading mb-4"></div>
            <p class="text-white/90 animate-pulse">جاري تحميل التطبيق...</p>
            <div class="mt-6 w-32 h-1 bg-white/20 rounded-full overflow-hidden mx-auto">
                <div class="w-full h-full bg-white rounded-full animate-shimmer"></div>
            </div>
        </div>
    </div>

    <!-- React App Container -->
    <div id="landing-page" class="page-load"></div>

    <!-- Vite JS -->
    @vite(['resources/js/app.jsx'])

    <script>
        // Enhanced loading screen with progress
        let loadingProgress = 0;
        const progressBar = document.querySelector('#loading-screen .animate-shimmer');

        const loadingInterval = setInterval(() => {
            loadingProgress += Math.random() * 30;
            if (progressBar) {
                progressBar.style.width = Math.min(loadingProgress, 90) + '%';
            }
            if (loadingProgress >= 90) {
                clearInterval(loadingInterval);
            }
        }, 200);

        // Hide loading screen when page is loaded
        window.addEventListener('load', function() {
            setTimeout(() => {
                loadingProgress = 100;
                if (progressBar) {
                    progressBar.style.width = '100%';
                }

                setTimeout(() => {
                    const loadingScreen = document.getElementById('loading-screen');
                    if (loadingScreen) {
                        loadingScreen.style.transform = 'translateY(-100%)';
                        loadingScreen.style.transition = 'transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
                        setTimeout(() => {
                            loadingScreen.style.display = 'none';
                        }, 800);
                    }
                }, 500);
            }, 1000);
        });

        // Enhanced scroll animations
        document.addEventListener('DOMContentLoaded', function() {
            // Smooth scroll for anchor links
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', function (e) {
                    e.preventDefault();
                    const target = document.querySelector(this.getAttribute('href'));
                    if (target) {
                        target.scrollIntoView({
                            behavior: 'smooth',
                            block: 'center'
                        });
                    }
                });
            });

            // Enhanced intersection observer
            const observerOptions = {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            };

            const observer = new IntersectionObserver((entries) => {
                entries.forEach((entry, index) => {
                    if (entry.isIntersecting) {
                        setTimeout(() => {
                            entry.target.classList.add('reveal', 'active');
                            entry.target.style.opacity = '1';
                            entry.target.style.transform = 'translateY(0)';
                        }, index * 100);
                    }
                });
            }, observerOptions);

            // Observe elements for animation
            document.querySelectorAll('.animate-on-scroll').forEach(el => {
                el.classList.add('reveal');
                observer.observe(el);
            });

            // Add parallax effect to hero section
            window.addEventListener('scroll', () => {
                const scrolled = window.pageYOffset;
                const parallax = document.querySelector('.particles');
                if (parallax) {
                    parallax.style.transform = `translateY(${scrolled * 0.5}px)`;
                }
            });

            // Add hover sound effect (optional)
            document.querySelectorAll('button').forEach(button => {
                button.addEventListener('mouseenter', () => {
                    button.style.transform = 'translateY(-2px)';
                });
                button.addEventListener('mouseleave', () => {
                    button.style.transform = 'translateY(0)';
                });
            });
        });

        // Add click tracking for analytics (placeholder)
        function trackClick(elementName) {
            console.log('Clicked:', elementName);
            // Here you can add Google Analytics or other tracking
        }

        // Add simple PWA functionality
        if ('serviceWorker' in navigator) {
            window.addEventListener('load', function() {
                navigator.serviceWorker.register('/sw.js')
                    .then(function(registration) {
                        console.log('SW registered: ', registration);
                    })
                    .catch(function(registrationError) {
                        console.log('SW registration failed: ', registrationError);
                    });
            });
        }
    </script>
</body>
</html>
