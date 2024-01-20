<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Image;
use App\Http\Resources\ImageCollection;

class DashboardController extends Controller
{
    public function index(Request $request)
    {
        $image = new ImageCollection(Image::where('id_user',auth()->user()->id)->orderBy('updated_at','desc')->paginate(6));
        return Inertia::render('Dashboard', [
            'title' => 'Dashboard',
            'subtitle' => 'This is the dashboard',
            'auth' => $request->user(),
            'images' => $image
        ]);
    }
}
