<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Inertia\Inertia;
use Inertia\Response;

class MyPublicationsController extends Controller
{
    private array $errors = [];
    private SalesforceController $salesforceController;

    public function __construct(SalesforceController $salesforceController)
    {
        $this->salesforceController = $salesforceController;
    }

    public function pending(Request $request): Response 
    {
        try {
            $url = env('VITE_FENLAB_API_URL') . 'projects/assets/publishable';
            $token = $request->session()->get('loginToken');

            $response = Http::withHeaders([
                'Authorization' => 'Bearer ' . $token,
                'Accept' => 'application/json',
            ])->get($url);

            if (!$response->successful()) {
                $this->errors[] = $response->json('message') ?? 'Error al obtener publicaciones pendientes';
                $data = [];
            } else {
                $data = $response->json();
                session(['publishablePendingCount' => count($data['data'] ?? [])]);
            }
        } catch (\Exception $e) {
            $this->errors[] = 'Error al obtener publicaciones pendientes: ' . $e->getMessage();
            $data = [];
        }

        if (!empty($this->errors)) {
            session()->flash('error', implode(' | ', $this->errors));
        }

        return Inertia::render('MyPublications/PendingPublication', [
            'projects' => $data,
        ]);
    }

    public function published(Request $request): Response
    {
        $salesforceEmail = $request->session()->get('salesforceUser.email');
        try {
            $request->merge(['email' => $salesforceEmail]);
            $response = $this->salesforceController->getPublishedOpportunities($request);
            $data = $response->getData(true);

            if (isset($data['error'])) {
                $this->errors[] = $data['error'];
                $data = [];
            }
        } catch (\Exception $e) {
            $this->errors[] = 'Error al obtener publicaciones publicadas: ' . $e->getMessage();
            $data = [];
        }

        if (!empty($this->errors)) {
            session()->flash('error', implode(' | ', $this->errors));
        }

        return Inertia::render('MyPublications/Published');
    }

    public function pendingApproval(Request $request): Response
    {
        $salesforceEmail = $request->session()->get('salesforceUser.email');
        try {
            $request->merge(['email' => $salesforceEmail]);
            $response = $this->salesforceController->getPendingApproval($request);
            $data = $response->getData(true);

            if (isset($data['error'])) {
                $this->errors[] = $data['error'];
                $data = [];
            }
        } catch (\Exception $e) {
            $this->errors[] = 'Error al obtener aprobaciones pendientes: ' . $e->getMessage();
            $data = [];
        }

        if (!empty($this->errors)) {
            session()->flash('error', implode(' | ', $this->errors));
        }

        return Inertia::render('MyPublications/PendingApproval', [
            'projects' => $data
        ]);
    }

    public function pendingPBC(Request $request): Response
    {
        $salesforceEmail = $request->session()->get('salesforceUser.email');
        try {
            $request->merge(['email' => $salesforceEmail]);
            $response = $this->salesforceController->getPendingPBC($request);
            $data = $response->getData(true);

            if (isset($data['error'])) {
                $this->errors[] = $data['error'];
                $data = [];
            }
        } catch (\Exception $e) {
            $this->errors[] = 'Error al obtener PBC pendientes: ' . $e->getMessage();
            $data = [];
        }

        if (!empty($this->errors)) {
            session()->flash('error', implode(' | ', $this->errors));
        }

        return Inertia::render('MyPublications/PendingPBC', [
            'projects' => $data
        ]);
    }

    public function pendingNotary(Request $request): Response
    {
        $salesforceEmail = $request->session()->get('salesforceUser.email');
        try {
            $request->merge(['email' => $salesforceEmail]);
            $response = $this->salesforceController->getPendingNotary($request);
            $data = $response->getData(true);

            if (isset($data['error'])) {
                $this->errors[] = $data['error'];
                $data = [];
            }
        } catch (\Exception $e) {
            $this->errors[] = 'Error al obtener notarías pendientes: ' . $e->getMessage();
            $data = [];
        }

        if (!empty($this->errors)) {
            session()->flash('error', implode(' | ', $this->errors));
        }

        return Inertia::render('MyPublications/PendingNotary', [
            'projects' => $data
        ]);
    }

    public function closedAuctions(Request $request): Response
    {
        $salesforceEmail = $request->session()->get('salesforceUser.email');
        try {
            $request->merge(['email' => $salesforceEmail]);
            $response = $this->salesforceController->getClosedAuctions($request);
            $data = $response->getData(true);

            if (isset($data['error'])) {
                $this->errors[] = $data['error'];
                $data = [];
            }
        } catch (\Exception $e) {
            $this->errors[] = 'Error al obtener subastas cerradas: ' . $e->getMessage();
            $data = [];
        }

        if (!empty($this->errors)) {
            session()->flash('error', implode(' | ', $this->errors));
        }

        return Inertia::render('MyPublications/ClosedAuctions', [
            'projects' => $data
        ]);
    }
}