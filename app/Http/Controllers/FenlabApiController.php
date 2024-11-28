<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreFenlabApiRequest;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Http;

class FenlabApiController extends Controller
{
    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreFenlabApiRequest $request): JsonResponse
    {
        $request->validated();

        $url = env('VITE_FENLAB_API_URL') . $request->path;
        $token = $request->session()->get('loginToken');
        $method = $request->method;
        
        $httpRequest = Http::withHeaders([
            'Authorization' => 'Bearer ' . $token,
            'Accept' => 'application/json',
        ]);

        if ($request->hasFile('file')) {
            $response = $httpRequest->attach(
                'file',
                $request->file('file')->getContent(),
                $request->file('file')->getClientOriginalName()
            )->$method($url);
        } else {
            $body = $request->body ?? [];
            $response = $httpRequest->$method($url, $body);
        }

        return response()->json($response->json(), $response->status());
    }
}
