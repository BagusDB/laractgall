<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Image;
use App\Http\Resources\ImageCollection;
use Illuminate\Support\Facades\Redirect;

class ImageController extends Controller
{
    public function index(Request $request)
    {
        return Inertia::render('LandingPage', [
            'title' => 'Landing Page',
            'subtitle' => 'This is the landing page',
            'images' => new ImageCollection(Image::when($request->search, function ($query, $search) {
                $query->where('image_name', 'like', '%' . $search . '%')
                ->orWhere('image_description', 'like', '%' . $search . '%')
                ->orWhere('name', 'like', '%' . $search . '%');
            })
            ->leftjoin('users', 'image.id_user', '=', 'users.id')
            ->select('image.*', 'users.name')
            ->orderBy('id','desc')->paginate(9))
        ]);
    }

    public function store(Request $request)
    {
        $fileName = time().'.'.$request->image_path->extension();
        $request->image_path->move(public_path('uploads'), $fileName);

        $image = new Image();
        $image->image_path = $fileName;
        $image->image_name = $request->image_name;
        $image->image_description = $request->image_description;
        $image->id_user = auth()->user()->id;

        $image->save();

        return Redirect::route('dashboard')->with('message', 'Image uploaded successfully');
    }

    public function show(Request $request)
    {
        $image = Image::where('id_user', auth()->user()->id)->get();
        return Inertia::render('Upload', [
            'myImage' => $image,
            'title' => 'Upload Page',
            'subtitle' => 'This is the upload page',
            'auth' => $request->user(),
        ]);
    }

    public function edit(Request $request, Image $image)
    {
        return Inertia::render('EditImage', [
            'editImage' => $image->find($request->id),
            'title' => 'Edit Page',
            'subtitle' => 'This is the edit page',
            'auth' => $request->user(),
        ]);
    }

    public function update(Request $request, Image $image)
    {
        if ($request->image_path != null) {
            $fileName = time().'.'.$request->image_path->extension();
            $request->image_path->move(public_path('uploads'), $fileName);
        }

        $image = Image::where('id', $request->id)->first();

        Image::where('id', $request->id)->update([
            'image_name' => $request->image_name,
            'image_description' => $request->image_description,
            'image_path' => $fileName != null ? $fileName : $image->image_path,
        ]);

        return to_route('dashboard')->with('message', 'Image updated successfully');
    }

    public function destroy(Request $request, Image $image)
    {
        $image->find($request->id)->delete();
        return to_route('dashboard');
    }

    public function search(Request $request)
    {
        $image = new ImageCollection(Image::where('image_name', 'like', '%' . $request->search . '%')->paginate(8));
        return Inertia::render('LandingPage', [
            'title' => 'Landing Page',
            'subtitle' => 'This is the landing page',
            'images' => $image
        ]);
    }
}
