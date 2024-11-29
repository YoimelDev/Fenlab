<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreFenlabApiRequest;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Storage;

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
            $file = $request->file('file');
            $fileName = $file->getClientOriginalName();
            $path = $file->storeAs('temp', $fileName, 'local');
            $fullPath = storage_path('app/' . $path);

            $httpRequest->asMultipart();

            try {
                $response = $httpRequest->attach(
                    'file',
                    file_get_contents($fullPath),
                    $fileName
                )->$method($url);
            } finally {
                Storage::disk('local')->delete($path);
            }
        } else {
            $body = $request->body ?? [];
            if ($body) {
                $response = $httpRequest->$method($url, $body);
            } else
                $response = $httpRequest->$method($url);
        }

        return response()->json($response->json(), $response->status());
    }
}
