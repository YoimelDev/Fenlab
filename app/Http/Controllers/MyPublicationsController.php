<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Inertia\Inertia;
use Inertia\Response;

class MyPublicationsController extends Controller
{
    public function pending(Request $request): Response 
    {
        $url = env('VITE_FENLAB_API_URL') . 'projects/assets/publishable';
        $token = $request->session()->get('loginToken');

        $response = Http::withHeaders([
            'Authorization' => 'Bearer ' . $token,
            'Accept' => 'application/json',
        ])->get($url);

        return Inertia::render('MyPublications/PendingPublication', [
            'projects' => $response->json(),
        ]);
    }

    public function published(Request $request): Response
    {
        return Inertia::render('MyPublications/Published');
    }

    public function pendingApproval(Request $request): Response
    {
        $url = env('VITE_FENLAB_API_URL') . 'salesforce/pending-approval';
        $token = $request->session()->get('loginToken');

        $response = Http::withHeaders([
            'Authorization' => 'Bearer ' . $token,
            'Accept' => 'application/json',
        ])->get($url);

        return Inertia::render('MyPublications/PendingApproval', [
            'projects' => $response->json(),
        ]);
    }

    public function pendingPBC(Request $request): Response
    {
        $url = env('VITE_FENLAB_API_URL') . 'salesforce/pending-pbc';
        $token = $request->session()->get('loginToken');

        $response = Http::withHeaders([
            'Authorization' => 'Bearer ' . $token,
            'Accept' => 'application/json',
        ])->get($url);

        return Inertia::render('MyPublications/PendingPBC', [
            'projects' => $response->json(),
        ]);
    }

    public function pendingNotary(Request $request): Response
    {
        $url = env('VITE_FENLAB_API_URL') . 'salesforce/pending-notary';
        $token = $request->session()->get('loginToken');

        $response = Http::withHeaders([
            'Authorization' => 'Bearer ' . $token,
            'Accept' => 'application/json',
        ])->get($url);

        return Inertia::render('MyPublications/PendingNotary', [
            'projects' => $response->json(),
        ]);
    }

    public function closedAuctions(Request $request): Response
    {
        $url = env('VITE_FENLAB_API_URL') . 'salesforce/closed-auctions';
        $token = $request->session()->get('loginToken');

        $response = Http::withHeaders([
            'Authorization' => 'Bearer ' . $token,
            'Accept' => 'application/json',
        ])->get($url);

        return Inertia::render('MyPublications/ClosedAuctions', [
            'projects' => $response->json(),
        ]);
    }
}