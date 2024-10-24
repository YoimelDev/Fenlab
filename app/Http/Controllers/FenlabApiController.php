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
        $body = $request->body ?? [];

        $response = Http::withHeaders([
            'Authorization' => 'Bearer ' . $token,
            'Accept' => 'application/json',
        ])->$method($url, $body);

        return response()->json($response->json(), $response->status());
    }
}
