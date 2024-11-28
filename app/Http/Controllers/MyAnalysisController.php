<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class MyAnalysisController extends Controller
{
    /**
     * Show the analysis view.
     */
    public function index()
    {
        return Inertia::render('MyAnalysis/Analysis');
    }

    /**
     * Show the internal view.
     */
    public function showInternalView($id, Request $request)
    {
        $url = env('VITE_FENLAB_API_URL') . 'projects/' . $id;
        $token = $request->session()->get('loginToken');

        $response = Http::withHeaders([
            'Authorization' => 'Bearer ' . $token,
            'Accept' => 'application/json',
        ])->get($url);

        $urlAssets = env('VITE_FENLAB_API_URL') . 'projects/' . $id . '/assets';
        $assets = Http::withHeaders([
            'Authorization' => 'Bearer ' . $token,
            'Accept' => 'application/json',
        ])->get($urlAssets);
        
        return Inertia::render('MyAnalysis/InternalView', [
            'project' => $response->json(),
            'assets' => $assets->json(),
        ]);
    }
}