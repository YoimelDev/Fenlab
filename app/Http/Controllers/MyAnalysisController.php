<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

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

    /**
     * Publishes asset data by converting to CSV and sending to API
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function publishAsset(Request $request)
    {
        try {
            // Retrieve and normalize data
            $assetData = $request->all();

            if (empty($assetData)) {
                return response()->json(['message' => 'No asset data provided'], 400);
            }

            $assets = isset($assetData[0]) ? $assetData : [$assetData];

            // Format each asset
            $formattedRows = array_map(function ($asset) {
                return $this->formatAssetData($asset);
            }, $assets);

            // Generate unique CSV filename with timestamp
            $timestamp = date('Y-m-d_His');
            $csvFileName = 'import_' . $timestamp . '.csv';
            $csvFilePath = storage_path('app/' . $csvFileName);

            // Generate CSV file using proper error handling
            try {
                if (($file = fopen($csvFilePath, 'w')) === false) {
                    throw new \Exception("Could not open file for writing: $csvFilePath");
                }

                // Configure CSV output
                $delimiter = ',';
                $enclosure = '"';
                $eol = "\n";
                $headers = $this->getCsvHeaders();

                // Write headers
                if (!$this->writeCSVRow($file, $headers, $delimiter, $enclosure, $eol)) {
                    throw new \Exception("Failed to write CSV headers");
                }

                // Write data rows
                foreach ($formattedRows as $index => $row) {
                    if (!$this->writeCSVRow($file, $row, $delimiter, $enclosure, $eol)) {
                        throw new \Exception("Failed to write CSV row for asset #" . ($index + 1));
                    }
                }

                fclose($file);

                // Verify file was created and has content
                if (!file_exists($csvFilePath) || filesize($csvFilePath) === 0) {
                    throw new \Exception("CSV file was not created properly");
                }
            } catch (\Exception $e) {
                // Clean up any partial file that may have been created
                if (isset($file) && is_resource($file)) {
                    fclose($file);
                }

                if (file_exists($csvFilePath)) {
                    unlink($csvFilePath);
                }

                Log::error('CSV generation failed: ' . $e->getMessage());
                return response()->json(['message' => 'Failed to generate CSV file: ' . $e->getMessage()], 500);
            }

            // Send to API
            try {
                $fileContents = file_get_contents($csvFilePath);

                if ($fileContents === false) {
                    throw new \Exception("Could not read generated CSV file");
                }

                $response = Http::timeout(30)->attach(
                    'datatape',
                    $fileContents,
                    $csvFileName
                )->post('https://dev.fencia.es/module/fenciaimporter/import?ajax=1&action=import&delimiter=,');

                // Clean up the temporary file
                unlink($csvFilePath);

                // Handle API response
                if ($response->successful()) {
                    return response()->json([
                        'message' => 'File uploaded successfully',
                        'assets_count' => count($assets)
                    ], 200);
                } else {
                    $errorCode = $response->status();
                    $errorBody = $response->body();
                    Log::error("API request failed with status $errorCode: $errorBody");

                    return response()->json([
                        'message' => 'API request failed with status: ' . $errorCode,
                        'details' => $response->json() ?: $errorBody
                    ], $errorCode);
                }
            } catch (\Exception $e) {
                // Clean up the temporary file if it still exists
                if (file_exists($csvFilePath)) {
                    unlink($csvFilePath);
                }

                Log::error('API request exception: ' . $e->getMessage());
                return response()->json(['message' => 'API request failed: ' . $e->getMessage()], 500);
            }
        } catch (\Exception $e) {
            Log::error('Asset publication failed: ' . $e->getMessage());
            return response()->json(['message' => 'Asset publication failed: ' . $e->getMessage()], 500);
        }
    }

    /**
     * Uploads documents and images to the server
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function uploadDocuments(Request $request)
    {
        try {
            $request->validate([
                'reference' => 'required|string',
                'images.*' => 'file|image',
                'documents.*' => 'file',
            ]);

            $reference = $request->reference;
            $multipartData = [
                'ajax' => 1,
                'action' => 'uploadSingle',
                'reference' => $reference,
            ];

            if ($request->hasFile('images')) {
                foreach ($request->file('images') as $index => $file) {
                    $multipartData["images[$index]"] = $file;
                }
            }

            if ($request->hasFile('documents')) {
                foreach ($request->file('documents') as $index => $file) {
                    $multipartData["documents[$index]"] = $file;
                }
            }

            $response = Http::withHeaders([
                'content-type' => 'multipart/form-data',
            ])->post('https://dev.fencia.es/module/fenciaimporter/import', $multipartData);

            Log::info('Document upload response', ['status' => $response->status(), 'body' => $response->body()]);

            if ($response->successful()) {
                return response()->json(['message' => 'Files uploaded successfully'], 200);
            } else {
                return response()->json([
                    'message' => 'Error uploading files',
                    'details' => $response->body()
                ], $response->status());
            }
        } catch (\Throwable $th) {
            Log::error('Document upload error', ['message' => $th->getMessage()]);
            return response()->json(['message' => 'Error: ' . $th->getMessage()], 500);
        }
    }

    /**
     * Helper method to write a CSV row with proper escaping and error handling
     *
     * @param resource $file
     * @param array $data
     * @param string $delimiter
     * @param string $enclosure
     * @param string $eol
     * @return bool
     */
    private function writeCSVRow($file, array $data, $delimiter, $enclosure, $eol)
    {
        $row = implode($delimiter, array_map(function ($value) use ($enclosure) {
            // Convert to string and handle null values
            $value = $value ?? '';

            // Properly escape enclosure characters and wrap field in enclosures
            return $enclosure . str_replace($enclosure, $enclosure . $enclosure, $value) . $enclosure;
        }, $data)) . $eol;

        return fwrite($file, $row) !== false;
    }

    /**
     * Format asset data for CSV export
     *
     * @param array $assetData
     * @return array
     */
    private function formatAssetData($assetData)
    {
        $formattedData = [
            $assetData['titulo'] ?? '',
            $assetData['referencia'] ?? '',
            $assetData['marca'] ?? '',
            $assetData['resumen'] ?? '',
            $assetData['descripcion'] ?? '',
            $assetData['precioImpuestoIncluido'] ?? '',
            $assetData['proveedores'] ?? '',
            $assetData['comunidadAutonoma'] ?? '',
            $assetData['provincia'] ?? '',
            $assetData['municipio'] ?? '',
            $assetData['codigoPostal'] ?? '',
            $assetData['metrosConstruidos'] ?? '',
            $assetData['metrosSuelo'] ?? '',
            $assetData['vpo'] ?? 'NO',
            $assetData['habitaciones'] ?? '',
            $assetData['banos'] ?? '',
            $assetData['anoConstruccion'] ?? '',
            $assetData['referenciaCatastral'] ?? '',
            $assetData['estadoOcupado'] ?? '',
            $assetData['compraDeCredito'] ?? '',
            $assetData['compraDeCreditoDeposito'] ?? '',
            $assetData['posturaEnSubasta'] ?? '',
            $assetData['cesionRemate'] ?? '',
            $assetData['cesionRemateDeposito'] ?? '',
            $assetData['compraVentaDeInmueble'] ?? '',
            $assetData['compraVentaDeInmuebleDeposito'] ?? '',
            $assetData['persona'] ?? '',
            $assetData['titularidad'] ?? '',
            $assetData['comision'] ?? '',
            $assetData['titulares'] ?? '',
            $assetData['contacto'] ?? '',
            $assetData['colabora'] ?? '',
            $assetData['avalistas'] ?? '',
            $assetData['cargasAnteriores'] ?? '',
            $assetData['cargasPosteriores'] ?? '',
            $assetData['cargasPreferentes'] ?? '',
            $assetData['referenciaPrestamo1'] ?? '',
            $assetData['rango1'] ?? '',
            $assetData['fechaFormalizacion1'] ?? '',
            $assetData['fechaVencimiento1'] ?? '',
            $assetData['principalDispuesto1'] ?? '',
            $assetData['deudaActual1'] ?? '',
            $assetData['vencimientoAnticipado1'] ?? '',
            $assetData['responsabilidadHipotecaria1'] ?? '',
            $assetData['referenciaPrestamo2'] ?? '',
            $assetData['rango2'] ?? '',
            $assetData['fechaFormalizacion2'] ?? '',
            $assetData['fechaVencimiento2'] ?? '',
            $assetData['principalDispuesto2'] ?? '',
            $assetData['deudaActual2'] ?? '',
            $assetData['vencimientoAnticipado2'] ?? '',
            $assetData['responsabilidadHipotecaria2'] ?? '',
            $assetData['referenciaPrestamo3'] ?? '',
            $assetData['rango3'] ?? '',
            $assetData['fechaFormalizacion3'] ?? '',
            $assetData['fechaVencimiento3'] ?? '',
            $assetData['principalDispuesto3'] ?? '',
            $assetData['deudaActual3'] ?? '',
            $assetData['vencimientoAnticipado3'] ?? '',
            $assetData['responsabilidadHipotecaria3'] ?? '',
            $assetData['judicializado'] ?? '',
            $assetData['tipoProcedimientoJudicial'] ?? '',
            $assetData['juzgadoCompetente'] ?? '',
            $assetData['autos'] ?? '',
            $assetData['rangoJudicializado'] ?? '',
            $assetData['cantidadReclamada'] ?? '',
            $assetData['tasacionEfectosSubasta'] ?? '',
            $assetData['viviendaHabitual'] ?? '',
            $assetData['faseJudicialActual'] ?? '',
            $assetData['fechaFaseJudicialActual'] ?? '',
            $assetData['activo'] ?? 'SI',
            $assetData['encuesta'] ?? 'SI',
            $assetData['categoria'] ?? 'Próximas Subastas',
            $assetData['productoVirtual'] ?? 'SI',
            $assetData['subasta'] ?? '',
            $assetData['tramosEntrePujas'] ?? '',
            $assetData['diasDeSubasta'] ?? ''
        ];

        // Pad array to match header count
        return array_pad($formattedData, count($this->getCsvHeaders()), '');
    }

    /**
     * Get CSV headers
     *
     * @return array
     */
    private function getCsvHeaders()
    {
        return [
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
            'PRODUCTO VIRTUAL',
            'SUBASTA',
            'TRAMO ENTRE PUJAS',
            'DIAS DE SUBASTA'
        ];
    }
}
