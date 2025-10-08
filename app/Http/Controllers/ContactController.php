<?php

namespace App\Http\Controllers;

use App\Models\Contact;
use App\Http\Requests\StoreContactRequest;
use App\Http\Requests\UpdateContactRequest;
use Illuminate\Support\Facades\Mail;
use App\Mail\ContactEmail;
use App\Mail\UserRegisteredEmail;
use App\Mail\UserRegisteredMail;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Redirect;


class ContactController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreContactRequest $request)
    {
        try {
            Log::info("contact emails: " . env('CONTACT_EMAILS'));
            Log::info("request data: " . json_encode($request->all()));
            $emails = explode(',', env('CONTACT_EMAILS'));
            $userEmail = $request->input('email');

            // Enviar a los administradores
            Mail::to($emails)->send(new ContactEmail());

            // Enviar al usuario registrado
            Mail::to($userEmail)->send(new UserRegisteredMail($request->all()));
        } catch (\Exception $e) {
            Log::error("Failed to send contact email: " . $e->getMessage());
            Log::error("contact emails: " . env('CONTACT_EMAILS'));
            Log::error("request data: " . json_encode($request->all()));
            return Redirect::back()->withErrors(['error' => 'Failed to create contact: ' . $e->getMessage()])->withInput();
        }

        return response()->json(['message' => 'Contact created successfully'], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Contact $contact)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Contact $contact)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateContactRequest $request, Contact $contact)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Contact $contact)
    {
        //
    }
}
