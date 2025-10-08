<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Sets the root template that's loaded on the first page visit.
     * This can be used to set the title template for all pages.
     */
    public function rootView(Request $request)
    {
        return 'app';
    }

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): string|null
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        return [
            ...parent::share($request),
            'auth' => [
                'user' => $request->user(),
                'salesforceUser' => $request->session()->get('salesforceUser'),
            ],
            'flash' => [
                'success' => fn () => $request->session()->pull('success'),
                'error' => fn () => $request->session()->pull('error'),
            ],
            'publishablePendingCount' => $request->session()->get('publishablePendingCount', 0),
        ];
    }

    /**
     * Defines the title callback.
     * Combines page title with app name: "Page Title - FenLAB"
     *
     * @return string
     */
    public function title(Request $request): string
    {
        $appName = config('app.name', 'Laravel');
        
        // Get the title passed from the page component
        $pageTitle = $request->header('X-Inertia-Page-Title');
        
        // If there's a page title, format as "Page Title - App Name"
        // Otherwise just use the app name
        return $pageTitle ? "{$pageTitle} - {$appName}" : $appName;
    }
}
