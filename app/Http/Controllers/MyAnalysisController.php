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
        // Retrieve and normalize data
        $assetData = $request->all();
        $assets = isset($assetData[0]) ? $assetData : [$assetData];

        // Format each asset
        $formattedRows = array_map(function ($asset) {
            return $this->formatAssetData($asset);
        }, $assets);

        // Generate unique CSV filename with timestamp
        $timestamp = date('Y-m-d_His');
        $csvFileName = 'import_' . $timestamp . '.csv';
        $csvFilePath = storage_path('app/' . $csvFileName);
        $file = fopen($csvFilePath, 'w');

        // Configure CSV output
        $delimiter = ',';
        $enclosure = '"';
        $eol = "\n"; // Add explicit end of line character

        // Write headers and data with custom EOL
        fwrite($file, implode($delimiter, array_map(function ($value) use ($enclosure) {
            return $enclosure . str_replace($enclosure, $enclosure . $enclosure, $value) . $enclosure;
        }, $this->getCsvHeaders())) . $eol);

        foreach ($formattedRows as $row) {
            fwrite($file, implode($delimiter, array_map(function ($value) use ($enclosure) {
                return $enclosure . str_replace($enclosure, $enclosure . $enclosure, $value) . $enclosure;
            }, $row)) . $eol);
        }
        fclose($file);
        // dd(file_get_contents($csvFilePath), $csvFileName);
        // Send to API
        $response = Http::attach(
            'datatape',
            file_get_contents($csvFilePath),
            $csvFileName
        )->post('https://dev.fencia.es/module/fenciaimporter/import?ajax=1&action=import&delimiter=,');

        // Handle response
        if ($response->successful()) {
            return response()->json(['message' => 'File uploaded successfully'], 200);
        } else {
            return response()->json(['message' => 'File upload failed'], $response->status());
        }
    }

    private function formatAssetData($assetData)
    {
        $formattedData = [
            $assetData['titulo'] ?? '',
            $assetData['referencia'] ?? '',
            $assetData['marca'] ?? '',
            $assetData['resumen'] ?? '',
            $assetData['descripcion'] ?? '',
            $assetData['precioImpuestoIncluido'] . ' €',
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
            $assetData['productoVirtual'] ?? 'SI'
        ];

        // Remove empty values from end of array
        $formattedData = array_reverse(array_filter(array_reverse($formattedData), function ($value) {
            return $value !== '';
        }));

        // Pad array to match header count
        return array_pad($formattedData, count($this->getCsvHeaders()), '');
    }

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
            'PRODUCTO VIRTUAL'
        ];
    }
}
