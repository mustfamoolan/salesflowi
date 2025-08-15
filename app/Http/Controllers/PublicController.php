<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class PublicController extends Controller
{
    public function landing()
    {
        return Inertia::render('Public/LandingPage', [
            'isArabic' => true
        ]);
    }
}
