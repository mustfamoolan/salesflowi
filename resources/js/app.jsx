import React from 'react';
import ReactDOM from 'react-dom/client';
import './bootstrap';

// Import components
import LandingPage from './components/LandingPage';
import CustomerPage from './components/CustomerPage';
import ProductsPage from './components/ProductsPage';
import InvoicesPage from './components/InvoicesPage';
import Dashboard from './components/SimpleDashboard';
import DebtsPage from './components/DebtsPage';
import InstallmentsPage from './components/InstallmentsPage';
import ExpensesPage from './components/ExpensesPage';
import ReportsPage from './components/ReportsPage';
import POSPage from './components/POSPage';
import SettingsPage from './components/SettingsPage';

// Check if we're on the landing page
if (document.getElementById('landing-page')) {
    const root = ReactDOM.createRoot(document.getElementById('landing-page'));
    root.render(<LandingPage />);
}

// Check if we're on the customers page
if (document.getElementById('app')) {
    // Wait for app-ready event from the loading screen
    window.addEventListener('app-ready', () => {
        const root = ReactDOM.createRoot(document.getElementById('app'));
        root.render(<CustomerPage />);
    });
}

// Check if we're on the products page
if (document.getElementById('products-app')) {
    // Wait for products-app-ready event from the loading screen
    window.addEventListener('products-app-ready', () => {
        const root = ReactDOM.createRoot(document.getElementById('products-app'));
        root.render(<ProductsPage />);
    });
}

// Check if we're on the invoices page
if (document.getElementById('invoices-app')) {
    // Wait for invoices-app-ready event from the loading screen
    window.addEventListener('invoices-app-ready', () => {
        const root = ReactDOM.createRoot(document.getElementById('invoices-app'));
        root.render(<InvoicesPage />);
    });
}

// Check if we're on the dashboard page
if (document.getElementById('dashboard-root')) {
    const root = ReactDOM.createRoot(document.getElementById('dashboard-root'));
    root.render(<Dashboard />);
}

// Check if we're on the debts page
if (document.getElementById('debts-root')) {
    const root = ReactDOM.createRoot(document.getElementById('debts-root'));
    root.render(<DebtsPage />);
}

// Check if we're on the installments page
if (document.getElementById('installments-root')) {
    const root = ReactDOM.createRoot(document.getElementById('installments-root'));
    root.render(<InstallmentsPage />);
}

// Check if we're on the expenses page
if (document.getElementById('expenses-root')) {
    const root = ReactDOM.createRoot(document.getElementById('expenses-root'));
    root.render(<ExpensesPage />);
}

// Check if we're on the reports page
if (document.getElementById('reports-root')) {
    const root = ReactDOM.createRoot(document.getElementById('reports-root'));
    root.render(<ReportsPage />);
}

// Check if we're on the POS page
if (document.getElementById('pos-root')) {
    const root = ReactDOM.createRoot(document.getElementById('pos-root'));
    root.render(<POSPage />);
}

// Check if we're on the settings page
if (document.getElementById('settings-root')) {
    const root = ReactDOM.createRoot(document.getElementById('settings-root'));
    root.render(<SettingsPage />);
}
