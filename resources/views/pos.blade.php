<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>نقطة البيع - SalesFlow</title>
    @vite(['resources/css/app.css', 'resources/js/app.jsx'])
    <script src="https://unpkg.com/react@18/umd/react.development.js"></script>
    <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
    <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
</head>
<body class="bg-gray-100">
    <div id="pos-root"></div>

    <!-- Loading Screen -->
    <div id="loading-screen" class="fixed inset-0 bg-white z-50 flex items-center justify-center">
        <div class="text-center">
            <div class="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto"></div>
            <p class="mt-4 text-lg font-medium text-gray-700">جاري تحميل نقطة البيع...</p>
        </div>
    </div>

    <script type="text/babel">
        // Import POSPage component (you'll need to adjust the path)
        import POSPage from './resources/js/components/POSPage.jsx';

        const root = ReactDOM.createRoot(document.getElementById('pos-root'));
        root.render(<POSPage />);

        // Hide loading screen after component loads
        setTimeout(() => {
            document.getElementById('loading-screen').style.display = 'none';
        }, 1000);
    </script>
</body>
</html>
