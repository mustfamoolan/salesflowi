import './bootstrap';
import '../css/app.css';

import { createRoot } from 'react-dom/client';
import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';

const appName = import.meta.env.VITE_APP_NAME || 'SalesFlow';

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) => resolvePageComponent(`./Pages/${name}.jsx`, import.meta.glob('./Pages/**/*.jsx')),
    setup({ el, App, props }) {
        const root = createRoot(el);

        root.render(<App {...props} />);
    },
    progress: {
        color: '#6366f1',
        showSpinner: true,
    },
});

// Custom CSS for animations and styles
const customCSS = `
    /* Base animations */
    .animate-fade-in-up {
        animation: fadeInUp 0.6s ease-out;
    }

    .animate-slide-in-right {
        animation: slideInRight 0.8s ease-out;
    }

    .animate-slide-in-left {
        animation: slideInLeft 0.8s ease-out;
    }

    .animate-bounce-custom {
        animation: bounceCustom 2s infinite;
    }

    .animate-float {
        animation: float 6s ease-in-out infinite;
    }

    .animate-pulse-custom {
        animation: pulseCustom 2s infinite;
    }

    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    @keyframes slideInRight {
        from {
            opacity: 0;
            transform: translateX(-30px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }

    @keyframes slideInLeft {
        from {
            opacity: 0;
            transform: translateX(30px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }

    @keyframes bounceCustom {
        0%, 20%, 50%, 80%, 100% {
            transform: translateY(0);
        }
        40% {
            transform: translateY(-10px);
        }
        60% {
            transform: translateY(-5px);
        }
    }

    @keyframes float {
        0%, 100% {
            transform: translateY(0px);
        }
        50% {
            transform: translateY(-20px);
        }
    }

    @keyframes pulseCustom {
        0%, 100% {
            opacity: 1;
        }
        50% {
            opacity: 0.5;
        }
    }

    /* Gradient text */
    .bg-gradient-text {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
    }

    .bg-gradient-primary {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    }

    .bg-gradient-hero {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
    }

    /* Glass morphism */
    .glass {
        background: rgba(255, 255, 255, 0.25);
        backdrop-filter: blur(10px);
        border: 1px solid rgba(255, 255, 255, 0.18);
    }

    /* Button styles */
    .btn-primary {
        @apply bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold py-3 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg;
    }

    .btn-secondary {
        @apply bg-white text-gray-700 border-2 border-gray-300 hover:border-indigo-400 hover:text-indigo-600 font-semibold py-3 px-8 rounded-xl transition-all duration-300 shadow-md;
    }

    /* Card hover effects */
    .card-hover {
        transition: all 0.3s ease;
    }

    .card-hover:hover {
        transform: translateY(-5px);
        box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
    }

    /* Shadow styles */
    .shadow-soft {
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
    }

    .shadow-glow {
        box-shadow: 0 0 20px rgba(102, 126, 234, 0.4);
    }

    /* Text sizes */
    .text-hero {
        @apply text-4xl md:text-5xl lg:text-6xl font-bold;
    }

    .text-subtitle {
        @apply text-lg md:text-xl;
    }

    /* Particles */
    .particles {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        overflow: hidden;
        pointer-events: none;
    }

    .particle {
        background: linear-gradient(135deg, #667eea, #764ba2);
        border-radius: 50%;
        opacity: 0.6;
        animation: particle 6s linear infinite;
    }

    @keyframes particle {
        0% {
            transform: translateY(100vh) rotate(0deg);
            opacity: 0;
        }
        10% {
            opacity: 0.6;
        }
        90% {
            opacity: 0.6;
        }
        100% {
            transform: translateY(-100px) rotate(360deg);
            opacity: 0;
        }
    }

    /* Feature icons */
    .feature-icon {
        transition: all 0.3s ease;
    }

    /* Video and modal styles */
    .video-thumbnail {
        transition: all 0.3s ease;
    }

    .video-thumbnail:hover {
        transform: scale(1.02);
    }

    .play-button {
        transition: all 0.3s ease;
    }

    .video-modal {
        animation: fadeIn 0.3s ease-out;
    }

    .video-modal-content {
        animation: slideInUp 0.3s ease-out;
    }

    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }

    @keyframes slideInUp {
        from {
            opacity: 0;
            transform: translateY(50px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    /* FAQ styles */
    .faq-item {
        transition: all 0.3s ease;
    }

    .faq-item:hover {
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    }

    /* Mobile optimizations */
    .mobile-optimized {
        -webkit-overflow-scrolling: touch;
    }

    @media (max-width: 640px) {
        .text-hero {
            @apply text-3xl;
        }

        .btn-primary, .btn-secondary {
            @apply py-2 px-6 text-sm;
        }
    }

    /* RTL support */
    [dir="rtl"] .text-right {
        text-align: right;
    }

    [dir="rtl"] .space-x-reverse > * + * {
        margin-right: 0.5rem;
        margin-left: 0;
    }

    /* Loading animations */
    .loading-spinner {
        border: 2px solid #f3f3f3;
        border-top: 2px solid #3498db;
        border-radius: 50%;
        width: 20px;
        height: 20px;
        animation: spin 1s linear infinite;
    }

    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }

    /* Custom scrollbar */
    ::-webkit-scrollbar {
        width: 8px;
    }

    ::-webkit-scrollbar-track {
        background: #f1f1f1;
        border-radius: 10px;
    }

    ::-webkit-scrollbar-thumb {
        background: linear-gradient(135deg, #667eea, #764ba2);
        border-radius: 10px;
    }

    ::-webkit-scrollbar-thumb:hover {
        background: linear-gradient(135deg, #5a67d8, #6b46c1);
    }

    /* Inertia Progress Bar */
    .inertia-progress {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        height: 3px;
        background: linear-gradient(135deg, #667eea, #764ba2);
        transform-origin: left;
        z-index: 50;
    }
`;

// Add custom CSS to document head
if (typeof document !== 'undefined') {
    const styleElement = document.createElement('style');
    styleElement.innerHTML = customCSS;
    document.head.appendChild(styleElement);
}
