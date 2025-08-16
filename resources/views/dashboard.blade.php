<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Dashboard - SalesFlow</title>
    @vite(['resources/css/app.css', 'resources/js/app.jsx'])
</head>
<body class="bg-gray-100">
    <div id="dashboard-root"></div>

    <!-- Loading Screen -->
    <div id="loading-screen" class="fixed inset-0 bg-white z-50 flex items-center justify-center">
        <div class="text-center">
            <div class="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto"></div>
            <p class="mt-4 text-lg font-medium text-gray-700">جاري تحميل لوحة التحكم...</p>
        </div>
    </div>

    <script>
        // Hide loading screen when page loads
        window.addEventListener('load', function() {
            setTimeout(() => {
                const loading = document.getElementById('loading-screen');
                if (loading) {
                    loading.style.display = 'none';
                }
            }, 1000);
        });
    </script>

        // Hide loading screen after component loads
        setTimeout(() => {
            document.getElementById('loading-screen').style.display = 'none';
        }, 1000);
    </script>
</body>
</html>
