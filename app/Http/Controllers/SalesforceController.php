<?php

namespace App\Http\Controllers;

use App\Models\ApiToken;
use Carbon\Carbon;
use Illuminate\Support\Facades\Http;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class SalesforceController extends Controller
{
    private const TOKEN_TYPE = 'sf';
    private const TOKEN_EXPIRY_HOURS = 2;
    
    private string $baseUrl;
    private string $apiUrl;

    public function __construct()
    {
        $this->baseUrl = rtrim(env('SF_FENLAB_API_URL'), '/');
        $this->apiUrl = rtrim(env('SF_API_URL'), '/');
    }

    private function getValidToken(): string
    {
        $existingToken = ApiToken::where('type', self::TOKEN_TYPE)->first();
        
        if ($existingToken && $existingToken->expires_at > now()) {
            return $existingToken->token;
        }


        $clientSecret = env('SF_CLIENT_SECRET');
        $clientId = env('SF_CLIENT_ID');
        $apiUrl = env('SF_API_URL');
        $apiUsername = env('SF_USERNAME');
        $apiPassword = env('SF_PASSWORD');


        $urlWithParams = $apiUrl . "/services/oauth2/token?grant_type=password&client_id=" . $clientId . "&client_secret=" . $clientSecret . "&username=" . $apiUsername . "&password=" . $apiPassword;

        $response = Http::post($urlWithParams);

        if (!$response->successful()) {
            throw new \RuntimeException('Failed to obtain Salesforce token');
        }

        $data = $response->json();
        $issued_at = Carbon::createFromTimestamp($data["issued_at"] / 1000);
        
        ApiToken::updateOrCreate(
            ['type' => self::TOKEN_TYPE],
            [
                'token' => $data['access_token'],
                'issued_at' => $issued_at,
                'expires_at' => $issued_at->copy()->addHours(self::TOKEN_EXPIRY_HOURS)
            ]
        );

        return $data['access_token'];
    }

    public function getSfToken(): JsonResponse
    {
        try {
            $token = $this->getValidToken();
            return response()->json(['token' => $token]);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 401);
        }
    }

    private function makeApiRequest(string $endpoint, array $data, string $method = 'post'): JsonResponse
    {
        try {
            $token = $this->getValidToken();
            
            $response = Http::withToken($token)
                ->withBody(json_encode($data))
                ->$method($this->baseUrl . $endpoint);

            if (!$response->successful()) {
                $responseData = $response->json();

                if (is_array($responseData) && !empty($responseData)) {
                    if (isset($responseData[0]['message'])) {
                        return response()->json(['error' => $responseData[0]['message']], $response->status());
                    }
                }

                return response()->json(['error' => $response->body()], $response->status());
            }

            return response()->json($response->json());
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 401);
        }
    }

    // API Endpoints
    public function getFenlabUser(Request $request): JsonResponse
    {
        return $this->makeApiRequest(
            '/services/apexrest/company/fenlab/validate',
            ['email' => $request->email]
        );
    }

    // Auction related endpoints
    public function getPendingApproval(Request $request): JsonResponse
    {
        return $this->makeApiRequest(
            '/services/apexrest/company/fenlab/pending-approval',
            ['email' => $request->email],
            'get'
        );
    }

    public function approveAuction(Request $request): JsonResponse
    {
        return $this->makeApiRequest(
            '/services/apexrest/fenlab/approveAuction',
            $request->all()
        );
    }

    public function getClosedAuctions(Request $request): JsonResponse
    {
        return $this->makeApiRequest(
            '/services/apexrest/company/fenlab/closedAuctions',
            ['email' => $request->email],
            'get'
        );
    }

    // PBC related endpoints
    public function getPendingPBC(Request $request): JsonResponse
    {
        return $this->makeApiRequest(
            '/services/apexrest/company/fenlab/pendingPBC',
            ['email' => $request->email],
            'get'
        );
    }

    public function approvePBC(Request $request): JsonResponse
    {
        return $this->makeApiRequest(
            '/services/apexrest/fenlab/approvePBC',
            $request->all()
        );
    }

    // Notary related endpoints
    public function getPendingNotary(Request $request): JsonResponse
    {
        return $this->makeApiRequest(
            '/services/apexrest/company/fenlab/pendingNotary',
            ['email' => $request->email],
            'get'
        );
    }

    public function acceptNotary(Request $request): JsonResponse
    {
        return $this->makeApiRequest(
            '/services/apexrest/fenlab/acceptNotary',
            $request->all()
        );
    }

    // KPI Endpoints
    public function getPublishedKPI(Request $request): JsonResponse
    {
        return $this->makeApiRequest(
            '/services/apexrest/opportunity/fenlab/published',
            ['email' => $request->email],
            'get'
        );
    }

    public function getApprovedKPI(Request $request): JsonResponse
    {
        return $this->makeApiRequest(
            '/services/apexrest/opportunity/fenlab/approved',
            ['email' => $request->email],
            'get'
        );
    }

    public function getSignedKPI(Request $request): JsonResponse
    {
        return $this->makeApiRequest(
            '/services/apexrest/opportunity/fenlab/signed',
            ['email' => $request->email],
            'get'
        );
    }

    public function getPublishedOpportunities(Request $request): JsonResponse
    {
        return $this->makeApiRequest(
            '/services/apexrest/opportunity/fenlab/opened',
            ['email' => $request->email],
            'get'
        );
    }
}