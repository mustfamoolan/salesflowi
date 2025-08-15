<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminController extends Controller
{
    public function dashboard()
    {
        return Inertia::render('Admin/Dashboard', [
            'isArabic' => true
        ]);
    }

    public function analytics()
    {
        return Inertia::render('Admin/Analytics', [
            'isArabic' => true
        ]);
    }

    public function customers()
    {
        return Inertia::render('Admin/CustomersManagement', [
            'isArabic' => true
        ]);
    }

    public function employees()
    {
        return Inertia::render('Admin/EmployeesManagement', [
            'isArabic' => true
        ]);
    }

    public function reports()
    {
        return Inertia::render('Admin/FinancialReports', [
            'isArabic' => true
        ]);
    }

    public function notifications()
    {
        return Inertia::render('Admin/Notifications', [
            'isArabic' => true
        ]);
    }

    public function settings()
    {
        return Inertia::render('Admin/Settings', [
            'isArabic' => true
        ]);
    }

    public function subscriptions()
    {
        return Inertia::render('Admin/SubscriptionsManagement', [
            'isArabic' => true
        ]);
    }

    public function plans()
    {
        return Inertia::render('Admin/PlansManagement', [
            'isArabic' => true
        ]);
    }

    public function support()
    {
        return Inertia::render('Admin/SupportTickets', [
            'isArabic' => true
        ]);
    }

    public function logs()
    {
        return Inertia::render('Admin/SystemLogs', [
            'isArabic' => true
        ]);
    }
}
