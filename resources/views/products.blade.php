<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>إدارة المنتجات - SalesFlow</title>

    <!-- Mobile Optimization -->
    <meta name="mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="default">
    <meta name="theme-color" content="#667eea">

    <!-- Preconnect for performance -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>

    <!-- Fonts -->
    <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@300;400;600;700;900&display=swap" rel="stylesheet">

    <!-- Vite -->
    @vite(['resources/css/app.css', 'resources/js/app.jsx'])

    <style>
        body {
            font-family: 'Cairo', sans-serif;
            background: #f8fafc;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
        }

        .mobile-optimized {
            -webkit-tap-highlight-color: rgba(0,0,0,0);
            -webkit-user-select: none;
            -moz-user-select: none;
            -ms-user-select: none;
            user-select: none;
        }

        /* Touch-friendly buttons */
        button, .btn {
            min-height: 44px;
            min-width: 44px;
        }

        /* Smooth scrolling on iOS */
        * {
            -webkit-overflow-scrolling: touch;
        }

        /* Loading screen */
        .loading-screen {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            z-index: 9999;
            color: white;
        }

        .loading-logo {
            font-size: 2rem;
            font-weight: 900;
            margin-bottom: 2rem;
            animation: pulse 2s infinite;
        }

        .loading-progress {
            width: 200px;
            height: 4px;
            background: rgba(255, 255, 255, 0.2);
            border-radius: 2px;
            overflow: hidden;
            margin-bottom: 1rem;
        }

        .loading-bar {
            height: 100%;
            background: linear-gradient(90deg, #ffffff, #f0f8ff);
            border-radius: 2px;
            animation: loading 2s ease-in-out;
            width: 0%;
        }

        .loading-text {
            font-size: 0.9rem;
            opacity: 0.8;
            animation: fadeInOut 1.5s infinite;
        }

        @keyframes pulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.05); }
        }

        @keyframes loading {
            0% { width: 0%; }
            50% { width: 70%; }
            100% { width: 100%; }
        }

        @keyframes fadeInOut {
            0%, 100% { opacity: 0.6; }
            50% { opacity: 1; }
        }

        .fade-out {
            animation: fadeOut 0.5s ease-out forwards;
        }

        @keyframes fadeOut {
            from { opacity: 1; }
            to { opacity: 0; }
        }
    </style>
</head>
<body class="antialiased mobile-optimized">
    <!-- Loading Screen -->
    <div id="loading-screen" class="loading-screen">
        <div class="loading-logo">
            SalesFlow
        </div>
        <div class="loading-progress">
            <div class="loading-bar"></div>
        </div>
        <div class="loading-text">
            جاري تحميل إدارة المنتجات...
        </div>
    </div>

    <!-- App Container -->
    <div id="products-app" style="display: none;">
        <!-- Products Page Component will be rendered here -->
    </div>

    <script>
        // Loading screen management
        document.addEventListener('DOMContentLoaded', function() {
            const loadingScreen = document.getElementById('loading-screen');
            const app = document.getElementById('products-app');

            // Simulate loading time
            setTimeout(() => {
                loadingScreen.classList.add('fade-out');
                setTimeout(() => {
                    loadingScreen.style.display = 'none';
                    app.style.display = 'block';

                    // Trigger app load
                    window.dispatchEvent(new Event('products-app-ready'));
                }, 500);
            }, 1500);
        });

        // Mobile viewport handling
        function setViewportHeight() {
            let vh = window.innerHeight * 0.01;
            document.documentElement.style.setProperty('--vh', `${vh}px`);
        }

        setViewportHeight();
        window.addEventListener('resize', setViewportHeight);
        window.addEventListener('orientationchange', setViewportHeight);

        // Prevent zoom on iOS
        document.addEventListener('gesturestart', function(e) {
            e.preventDefault();
        });

        // Handle touch events for better mobile experience
        let touchStartY = 0;
        document.addEventListener('touchstart', function(e) {
            touchStartY = e.touches[0].clientY;
        });

        document.addEventListener('touchmove', function(e) {
            const touchY = e.touches[0].clientY;
            const touchDiff = touchStartY - touchY;

            // Prevent overscroll
            if (document.body.scrollTop === 0 && touchDiff < 0) {
                e.preventDefault();
            }
        });
    </script>
</body>
</html>
