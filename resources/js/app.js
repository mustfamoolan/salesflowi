import React from 'react';
import ReactDOM from 'react-dom/client';
import './bootstrap';

// Import components
import LandingPage from './components/LandingPage';
import SettingsPage from './components/SettingsPage';
import AdminPanel from './components/AdminPanel/AdminPanel';

// Check if we're on the landing page
if (document.getElementById('landing-page')) {
    const root = ReactDOM.createRoot(document.getElementById('landing-page'));
    root.render(<LandingPage />);
}

// Check if we're on the settings page
if (document.getElementById('settings-page')) {
    const root = ReactDOM.createRoot(document.getElementById('settings-page'));
    root.render(<SettingsPage />);
}

// Check if we're on the admin panel page
if (document.getElementById('admin-panel-root')) {
    const root = ReactDOM.createRoot(document.getElementById('admin-panel-root'));
    root.render(<AdminPanel />);
}
