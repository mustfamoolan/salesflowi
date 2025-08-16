<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>SalesFlow - الإعدادات</title>
    @vite(['resources/css/app.css', 'resources/js/app.jsx'])
    <style>
        #loading-screen {
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
        }

        .loading-spinner {
            width: 50px;
            height: 50px;
            border: 4px solid rgba(255, 255, 255, 0.3);
            border-top: 4px solid white;
            border-radius: 50%;
            animation: spin 1s linear infinite;
            margin-bottom: 20px;
        }

        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }

        .loading-text {
            color: white;
            font-size: 18px;
            font-weight: 600;
            text-align: center;
        }
    </style>
</head>
<body class="bg-gray-100">
    <!-- Loading Screen -->
    <div id="loading-screen">
        <div class="loading-spinner"></div>
        <div class="loading-text">
            <div>🔧 جاري تحميل الإعدادات...</div>
            <div style="font-size: 14px; margin-top: 10px; opacity: 0.8;">
                إدارة إعدادات النظام
            </div>
        </div>
    </div>

    <!-- Main Content -->
    <div id="settings-root"></div>

    <script>
        // Hide loading screen after 2 seconds
        setTimeout(() => {
            document.getElementById('loading-screen').style.display = 'none';
        }, 2000);
    </script>
</body>
</html>
