<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class MyAnalysisController extends Controller
{
    /**
     * Show the analysis view.
     */
    public function index(Request $request)
    {
        $token = $request->session()->get('loginToken');
        $url = env('VITE_FENLAB_API_URL') . 'projects?sortBy=id&reverse=true&perPage=100';

        $response = Http::withHeaders([
            'Authorization' => 'Bearer ' . $token,
            'Accept' => 'application/json',
        ])->get($url);

        $analysis = $response->json('data') ?? [];

        return Inertia::render('MyAnalysis/Analysis', [
            'analysis' => $analysis,
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


    public function publishAsset(Request $request)
    {
        // Retrieve data from the request
        $data = $request->all();

        $headers = [
            'Título',
            'Referencia',
            'Marca',
            'Resumen',
            'Descripción',
            'Precio imp. incl.',
            'Proveedores',
            'Comunidad autónoma',
            'Provincia',
            'Municipio',
            'Código postal',
            'Metros construidos',
            'Metros suelo',
            'VPO',
            'Habitaciones',
            'Baños',
            'Año construcción',
            'Referencia catastral',
            'Estado ocupacional',
            'Compra de crédito',
            'Compra de crédito Deposito',
            'Postura en subasta',
            'Cesión de remate',
            'Cesión de remate Deposito',
            'Compraventa de inmuebles',
            'Compraventa de inmuebles Deposito',
            'Persona',
            'Titularidad',
            'Comisión',
            'Titulares',
            'Contacto',
            'Colabora',
            'Avalistas',
            'Cargas anteriores',
            'Cargas posteriores de terceros',
            'Cargas preferentes',
            'Referencia del préstamo (P1)',
            'Rango (P1)',
            'Fecha formalización (P1)',
            'Fecha vencimiento (P1)',
            'Principal dispuesto / Importe concedido (P1)',
            'Deuda actual (P1)',
            'Vencimiento anticipado (P1)',
            'Responsabilidad hipotecaria (P1)',
            'Referencia del préstamo (P2)',
            'Rango (P2)',
            'Fecha formalización (P2)',
            'Fecha vencimiento (P2)',
            'Principal dispuesto / Importe concedido (P2)',
            'Deuda actual (P2)',
            'Vencimiento anticipado (P2)',
            'Responsabilidad hipotecaria (P2)',
            'Referencia del préstamo (P3)',
            'Rango (P3)',
            'Fecha formalización (P3)',
            'Fecha vencimiento (P3)',
            'Principal dispuesto / Importe concedido (P3)',
            'Deuda actual (P3)',
            'Vencimiento anticipado (P3)',
            'Responsabilidad hipotecaria (P3)',
            'Judicializado',
            'Tipo de procedimiento judicial',
            'Juzgado competente',
            'Autos',
            'Rango judicializado',
            'Cantidad reclamada',
            'Tasación a efectos de subasta',
            'Vivienda habitual',
            'Fase judicial actual',
            'Fecha fase judicial actual',
            'ACTIVO',
            'ENCUESTA',
            'CATEGORÍA',
            'PRODUCTO VIRTUAL'
        ];

        // Generate CSV file
        $csvFileName = 'import.csv';
        $csvFilePath = storage_path('app/' . $csvFileName);
        $file = fopen($csvFilePath, 'w');
        // Add headers to the CSV
        fputcsv($file, $headers);
        // Add data to the CSV
        foreach ($data as $row) {
            fputcsv($file, $row);
        }
        fclose($file);
        // Send the CSV file to the API endpoint
        $response = Http::asForm()->attach(
            'datatape',
            file_get_contents($csvFilePath),
            $csvFileName
        )->post('https://dev.fencia.es/module/fenciaimporter/import', [
            'delimiter' => ',',
            'action' => 'import',
            'ajax' => '1'
        ]);

        // Handle the response
        if ($response->successful()) {
            return response()->json(['message' => 'File uploaded successfully'], 200);
        } else {
            return response()->json(['message' => 'File upload failed'], $response->status());
        }
    }
}
