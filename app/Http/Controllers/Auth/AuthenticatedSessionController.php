<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
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
        $request->authenticate();

        $token = $this->getSfToken();

        $user = $this->getFenlabUser($token, $request->email);

        $loginToken = $this->loginAws($user);

        $request->session()->put('salesforceUser', $user);
        $request->session()->put('loginToken', $loginToken);
        $request->session()->regenerate();

        return redirect()->intended(route('dashboard', absolute: false));
    }


    public function getFenlabUser($token, $email)
    {
        $urlCheckUser = env('SF_FENLAB_API_URL') . "services/apexrest/company/fenlab/validate";
        // Cuerpo de la solicitud
        $body = [
            'email' => $email,
        ];
        $response = Http::withHeaders([
            'Authorization' => 'Bearer ' . $token,
            'Accept' => 'application/json',
        ])->post($urlCheckUser, $body);

        if ($response->successful()) {
            $data = $response->json(); // Intenta decodificar como JSON
            if ($data) {
                return $data;
            }
        } else {
            return response()->json([
                'message' => 'Unauthorized'
            ]);
        }
    }


    public function getSfToken()
    {
        $existingToken = ApiToken::where('type', 'sf')->first();
        if (!$existingToken || $existingToken->expires_at <= now()) {
            $clientSecret = env('SF_CLIENT_SECRET');
            $clientId = env('SF_CLIENT_ID');
            $apiUrl = env('SF_API_URL');
            $apiUsername = env('SF_USERNAME');
            $apiPassword = env('SF_PASSWORD');


            $urlWithParams = $apiUrl . "/services/oauth2/token?grant_type=password&client_id=" . $clientId . "&client_secret=" . $clientSecret . "&username=" . $apiUsername . "&password=" . $apiPassword;

            $response = Http::post($urlWithParams);

            // Verificar si la respuesta es JSON
            if ($response->successful()) {
                $data = $response->json(); // Intenta decodificar como JSON
                if ($data) {
                    // Procesar datos
                    $issued_at = Carbon::createFromTimestamp($data["issued_at"] / 1000);
                    // Sumar las 2 horas para la expiración:
                    $expires_at = $issued_at->copy()->addHours(2);

                    ApiToken::updateOrCreate(['type' => 'sf'], [
                        'type' => 'sf',
                        'token' => $data['access_token'],
                        'issued_at' => $issued_at,
                        'expires_at' => $expires_at
                    ]);

                    return $data['access_token'];
                }
            } else {
                return response()->json([
                    'message' => 'Unauthorized'
                ]);
            }
        } else {
            return $existingToken->token;
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
            "companyId" => $user['companyId']
        ];

        $response = Http::withHeaders([
            'API_KEY' => $apiKey,
            'Accept' => 'application/json',
        ])->post($url, $body);

        if ($response->successful()) {
            $data = $response->json(); // Intenta decodificar como JSON
            if ($data) {
                return $data['token'];
            }
        } else {
            return response()->json([
                'message' => 'Unauthorized'
            ]);
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
