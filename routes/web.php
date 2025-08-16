<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});

Route::get('/dashboard', function () {
    return view('dashboard');
});

Route::get('/admin', function () {
    return view('admin');
});

Route::get('/customers', function () {
    return view('customers');
});

Route::get('/debts', function () {
    return view('debts');
});

Route::get('/installments', function () {
    return view('installments');
});

Route::get('/products', function () {
    return view('products');
});

Route::get('/invoices', function () {
    return view('invoices');
});

Route::get('/expenses', function () {
    return view('expenses');
});

Route::get('/reports', function () {
    return view('reports');
});

Route::get('/pos', function () {
    return view('pos');
});

Route::get('/settings', function () {
    return view('settings');
});

Route::get('/', function () {
    return view('landing');
});

Route::get('/customers', function () {
    return view('customers');
});

Route::get('/products', function () {
    return view('products');
});

Route::get('/invoices', function () {
    return view('invoices');
});
