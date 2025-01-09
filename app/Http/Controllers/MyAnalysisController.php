<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class MyAnalysisController extends Controller
{
    private array $errors = [];

    /**
     * Show the analysis view.
     */
    public function index(Request $request)
    {
        $token = $request->session()->get('loginToken');
        $url = env('VITE_FENLAB_API_URL') . 'projects?sortBy=id&reverse=true&perPage=100';

        try {
            $response = Http::withHeaders([
                'Authorization' => 'Bearer ' . $token,
                'Accept' => 'application/json',
            ])->get($url);
            $analysis = $response->json('data') ?? [];
        } catch (\Exception $e) {
            $this->errors[] = 'Error al obtener análisis: ' . $e->getMessage();
            return [];
        }

        try {
            $projectsKPIurl = env('VITE_FENLAB_API_URL') . 'projects/kpi';
            $responseKPI = Http::withHeaders([
                'Authorization' => 'Bearer ' . $token,
                'Accept' => 'application/json',
            ])->get($projectsKPIurl);
            $projectsKPI = $responseKPI->json() ?? (object) [];
        } catch (\Exception $e) {
            $this->errors[] = 'Error al obtener kpi de proyectos: ' . $e->getMessage();
            return [];
        }

        try {
            $assetsKPIurl = env('VITE_FENLAB_API_URL') . 'projects/assets/kpi';
            $responseAssetsKPI = Http::withHeaders([
                'Authorization' => 'Bearer ' . $token,
                'Accept' => 'application/json',
            ])->get($assetsKPIurl);
            $assetsKPI = $responseAssetsKPI->json() ?? (object) [];
        } catch (\Exception $e) {
            $this->errors[] = 'Error al obtener kpi de activos: ' . $e->getMessage();
            return [];
        }

        if (!empty($this->errors)) {
            session()->flash('error', implode(' | ', $this->errors));
        }

        return Inertia::render('MyAnalysis/Analysis', [
            'analysis' => $analysis,
            'projectsKPI' => $projectsKPI,
            'assetsKPI' => $assetsKPI,
        ]);
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
