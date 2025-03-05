<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Controllers\SalesforceController;
use App\Http\Requests\Auth\LoginRequest;
use App\Models\ApiToken;
use Carbon\Carbon;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Inertia\Response;

class AuthenticatedSessionController extends Controller
{
    protected $salesforceController;

    public function __construct(SalesforceController $salesforceController)
    {
        $this->salesforceController = $salesforceController;
    }

    /**
     * Display the login view.
     */
    public function create(): Response
    {
        return Inertia::render('Auth/Login', [
            'canResetPassword' => Route::has('password.request'),
            'status' => session('status'),
        ]);
    }

    /**
     * Handle an incoming authentication request.
     */
    public function store(LoginRequest $request): RedirectResponse
    {
        try {
            $request->authenticate();

            $sfToken = $this->salesforceController->getSfToken()->original['token'] ?? null;
            if (!$sfToken) {
                throw new \Exception("Failed to obtain Salesforce token");
            }

            $userResponse = $this->salesforceController->getFenlabUser($request)->original ?? null;
            if (!$userResponse) {
                throw new \Exception("Failed to get Salesforce user data");
            }

            $loginToken = $this->loginAws($userResponse);
            if (!$loginToken) {
                throw new \Exception("Failed to authenticate with AWS");
            }

            $request->session()->put('salesforceUser', $userResponse);
            $request->session()->put('loginToken', $loginToken);
            $request->session()->regenerate();

            return redirect()->intended(route('dashboard', absolute: false));
        } catch (\Exception $e) {
            Auth::guard('web')->logout();

            Log::error("Authentication failed: " . $e->getMessage());

            return redirect()->route('login')
                ->withErrors(['email' => 'Authentication failed: ' . $e->getMessage()]);
        }
    }

    public function loginAws($user)
    {

        $url = env('VITE_FENLAB_API_URL') . 'auth/login';
        $apiKey = env('VITE_FENLAB_API_KEY');

        $user['rols'] = strtolower($user['rols']);

        $body = [
            "username" => $user['email'],
            "role" => $user['rols'],
            "companyId" => $user['companyId'],
            "company" => $user['companyCommercialName'],
            "shortCompany" => $user['companyCommercialName'],
        ];

        $response = Http::withHeaders([
            'API_KEY' => $apiKey,
            'Accept' => 'application/json',
        ])->post($url, $body);

        if ($response->successful()) {
            $data = $response->json(); // Intenta decodificar como JSON
            if ($data && isset($data['token'])) {
                return $data['token'];
            }
            return null;
        } else {
            Log::error("AWS login failed with status code: " . $response->status());
            return null;
        }
    }

    /**
     * Destroy an authenticated session.
     */
    public function destroy(Request $request): RedirectResponse
    {
        Auth::guard('web')->logout();

        $request->session()->invalidate();

        $request->session()->regenerateToken();

        return redirect('/');
    }
}
