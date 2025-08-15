<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Public Routes
Route::get('/', function () {
    return Inertia::render('Public/LandingPage');
});

// Admin Routes
Route::prefix('admin')->group(function () {
    Route::get('/dashboard', function () {
        return Inertia::render('Admin/Dashboard');
    });

    Route::get('/analytics', function () {
        return Inertia::render('Admin/Analytics');
    });

    Route::get('/customers', function () {
        return Inertia::render('Admin/CustomersManagement');
    });

    Route::get('/employees', function () {
        return Inertia::render('Admin/EmployeesManagement');
    });

    Route::get('/financial-reports', function () {
        return Inertia::render('Admin/FinancialReports');
    });

    Route::get('/notifications', function () {
        return Inertia::render('Admin/Notifications');
    });

    Route::get('/plans', function () {
        return Inertia::render('Admin/PlansManagement');
    });

    Route::get('/settings', function () {
        return Inertia::render('Admin/Settings');
    });

    Route::get('/subscriptions', function () {
        return Inertia::render('Admin/SubscriptionsManagement');
    });

    Route::get('/support', function () {
        return Inertia::render('Admin/SupportTickets');
    });

    Route::get('/logs', function () {
        return Inertia::render('Admin/SystemLogs');
    });
});

// Client Routes
Route::prefix('client')->group(function () {
    Route::get('/dashboard', function () {
        return Inertia::render('Client/Dashboard');
    });

    Route::get('/customers', function () {
        return Inertia::render('Client/CustomerPage');
    });

    Route::get('/debts', function () {
        return Inertia::render('Client/DebtsPage');
    });

    Route::get('/expenses', function () {
        return Inertia::render('Client/ExpensesPage');
    });

    Route::get('/installments', function () {
        return Inertia::render('Client/InstallmentsPage');
    });

    Route::get('/invoices', function () {
        return Inertia::render('Client/InvoicesPage');
    });

    Route::get('/pos', function () {
        return Inertia::render('Client/POSPage');
    });

    Route::get('/products', function () {
        return Inertia::render('Client/ProductsPage');
    });

    Route::get('/reports', function () {
        return Inertia::render('Client/ReportsPage');
    });

    Route::get('/settings', function () {
        return Inertia::render('Client/SettingsPage');
    });
});
