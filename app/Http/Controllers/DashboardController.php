<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Cache;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    private array $errors = [];
    private SalesforceController $salesforceController;
    private const CACHE_TTL = 3600;

    public function __construct(SalesforceController $salesforceController)
    {
        $this->salesforceController = $salesforceController;
    }

    public function index(Request $request): Response
    {
        $token = $request->session()->get('loginToken');
        $salesforceEmail = $request->session()->get('salesforceUser.email');
        $apiUrl = env('VITE_FENLAB_API_URL');

        $sections = [
            'analysis' => $this->getAnalysis($token, $apiUrl),
            'pendingPublish' => $this->getPendingPublish($token, $apiUrl),
            'published' => $this->getSalesforceData('published-opportunities', $salesforceEmail)['Auctions'] ?? [],
            'pendingApproval' => $this->getSalesforceData('pending-approval', $salesforceEmail),
            'pendingPBC' => $this->getSalesforceData('pending-pbc', $salesforceEmail),
            'pendingNotary' => $this->getSalesforceData('pending-notary', $salesforceEmail),
        ];

        if (!empty($this->errors)) {
            session()->flash('error', implode(' | ', $this->errors));
        }

        return Inertia::render('Dashboard/Dashboard', [
            'sections' => $sections,
        ]);
    }

    private function getCacheKey(string $prefix, string $value): string
    {
        return substr($prefix . '_' . md5($value), 0, 250);
    }

    private function getAnalysis($token, $apiUrl)
    {
        $cacheKey = $this->getCacheKey('analysis', $token);

        return Cache::remember($cacheKey, self::CACHE_TTL, function () use ($token, $cacheKey) {
            try {
                $url = env('VITE_FENLAB_API_URL') . 'projects?perPage=5';
                $response = Http::withHeaders([
                    'Authorization' => 'Bearer ' . $token,
                    'Accept' => 'application/json',
                ])->get($url);

                if (!$response->successful()) {
                    $this->errors[] = $response->json('message') ?? 'Error al obtener análisis';
                    Cache::forget($cacheKey);
                    return [];
                }

                return $response->json('data') ?? [];
            } catch (\Exception $e) {
                $this->errors[] = 'Error al obtener análisis: ' . $e->getMessage();
                Cache::forget($cacheKey);
                return [];
            }
        });
    }

    private function getPendingPublish($token, $apiUrl)
    {
        $cacheKey = $this->getCacheKey('pending_publish', $token);

        return Cache::remember($cacheKey, self::CACHE_TTL, function () use ($token, $cacheKey) {
            try {
                $url = env('VITE_FENLAB_API_URL') . 'projects/assets/publishable?perPage=5';
                $response = Http::withHeaders([
                    'Authorization' => 'Bearer ' . $token,
                    'Accept' => 'application/json',
                ])->get($url);

                if (!$response->successful()) {
                    $this->errors[] = $response->json('message') ?? 'Error al obtener publicaciones pendientes';
                    Cache::forget($cacheKey);
                    return [];
                }

                $data = $response->json();
                session(['publishablePendingCount' => count($data['data'] ?? [])]);
                return $data['data'] ?? [];
            } catch (\Exception $e) {
                $this->errors[] = 'Error al obtener publicaciones pendientes: ' . $e->getMessage();
                Cache::forget($cacheKey);
                return [];
            }
        });
    }

    private function getSalesforceData($endpoint, $email)
    {
        $cacheKey = $this->getCacheKey('salesforce_' . $endpoint, $email);

        return Cache::remember($cacheKey, self::CACHE_TTL, function () use ($endpoint, $email, $cacheKey) {
            try {
                $request = new Request();
                $request->merge(['email' => $email]);

                $response = match ($endpoint) {
                    'published-opportunities' => $this->salesforceController->getPublishedOpportunities($request),
                    'pending-approval' => $this->salesforceController->getPendingApproval($request),
                    'pending-pbc' => $this->salesforceController->getPendingPBC($request),
                    'pending-notary' => $this->salesforceController->getPendingNotary($request),
                    default => response()->json([])
                };

                $data = $response->getData(true);

                if (isset($data['error'])) {
                    $this->errors[] = $data['error'];
                    Cache::forget($cacheKey);
                    return [];
                }

                return $data ?? [];
            } catch (\Exception $e) {
                $this->errors[] = "Error al obtener datos de Salesforce ({$endpoint}): " . $e->getMessage();
                Cache::forget($cacheKey);
                return [];
            }
        });
    }
}
