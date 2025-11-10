export interface Analysis {
    id: number;
    link: string;
    mode: "REO" | "NPL" | "PL/SPL";
    project: string;
    description: string;
    assets: number;
    status:
        | "Sin empezar"
        | "Análisis en curso"
        | "Análisis completo"
        | "Carga definitiva";
    date: string;
}

export interface DataAnalysisAsset {
    client_id: string;
    fenlab_id: string;
    cadastral_reference: string;
    min_price: string;
    reference_value: string;
    transaction_modality: string;
}

export interface ProjectsAssets {
    data: AssetData[];
    meta: Meta;
}

export interface PublishableData {
    isPublishable: boolean;
    precioMinimo: number | null;
}

export interface ProjectAsset {
    assetPdf: {
        url: string;
        extension: string;
        title: string;
        description: string;
    };
    assetPowerpoint?: {
        url: string;
        extension: string;
        title: string;
        description: string;
    };
}

export interface AssetData {
    id?: string;
    projectId?: string;
    clientId: string;
    fenciaId: string | null;
    status: string | null;
    provincia: string | null;
    deuda: number | null;
    valorMercado: number | null;
    faseJudicial: string | null;
    precioPropuesto: number | null;
    tipoOcupante: string | null;
    pdf: ProjectAsset["assetPdf"];
    deck?: ProjectAsset["assetPowerpoint"];
    fechaAprobacion: Date | null;
    precioReferencia: number | null;
    modalidadCompra: string | null;
    precioCompra: number | null;
    tirBruta: number | null;
    reo?: {
        fechaAprobacion: Date | null;
        precioReferencia: number | null;
        isPublishable: boolean;
        precioMinimo: number | null;
    };
    npl?: {
        fechaAprobacion: Date | null;
        precioReferencia: number | null;
        subasta: PublishableData;
        credito: PublishableData;
        remate: PublishableData;
    };
}

export interface Model {
    type: string;
    direccionCompleta: string;
    tipologia: string;
    subtipologia: string;
    numeroHabitaciones: null | number;
    numeroBanos: null | number;
    anoConstruccion: null | number;
    tipoDeVia: string;
    nombreVia: string;
    numeroVia: number;
    planta: string | null;
    codigoPostal: string;
    municipio: string;
    provincia: string;
    comunidadAutonoma: string;
    referenciaCatastral: string;
    superficieConstruida: number;
    superficieParcela: number;
    tipoOcupante: string;
    viviendaHabitual: boolean | null;
    contacto: boolean | null;
    colabora: boolean | null;
    vulnerabilidadOcupante: boolean | null;
    mesesPosesionConAcuerdo: number | null;
    incentivo: number;
    fechaInicioAlquiler: string | null;
    fechaFinAlquiler: string | null;
    rentaInicio: number;
    rentaActual: number | null;
    impagoAcumulado: number | null;
    IBI: number;
    comunidad: number;
    otrasTasas: number;
    suministros: number;
    seguridad: boolean | null;
    seguridadCoste: number;
    marketing: number;
    capex: number;
    mesesCapex: number | null;
    mesesVentaInmuebleVacio: number;
    valorCatastral: null | number;
    // Campos adicionales para NPL
    deudaActual?: number;
    valorMercado?: number;
    faseJudicial?: string;
    npl?: NPL;
    // Campos adicionales para REO
    reo?: REO;
}

export interface NPL {
    fechaAprobacion: null | string;
    precioReferencia: number | null;
    subasta: Credito;
    credito: Credito;
    remate: Credito;
}

export interface REO {
    fechaAprobacion: null | string;
    precioReferencia: number | null;
    isPublishable: boolean;
    precioMinimo: string | number | null;
}

export interface Credito {
    isPublishable: boolean;
    precioMinimo: string | number | null;
}

export interface Meta {
    currentPage: number;
    perPage: number;
    totalItems: number;
    totalPages: number;
}

export interface ExcelResponse {
    success: boolean;
    errors: ApiErrors;
    prestashopData: PrestashopDatum[];
}

export interface ApiErrors {
    totalCount: number;
    list: ErrorItem[];
}

export interface ErrorItem {
    rowId: string;
    header: string;
    error: string;
}

export interface PrestashopDatum {
    titulo: string;
    referencia: string;
    marca: string;
    resumen: string;
    descripcion: string;
    precioImpuestoIncluido: string;
    proveedores: string;
    comunidadAutonoma: string;
    provincia: string;
    municipio: string;
    codigoPostal: string;
    metrosConstruidos: string;
    metrosSuelo: string;
    vpo: string;
    habitaciones: string;
    banos: string;
    anoConstruccion: number;
    referenciaCatastral: string;
    estadoOcupado: string;
    compraDeCredito: string;
    compraDeCreditoDeposito: string;
    posturaEnSubasta: string;
    cesionRemate: string;
    cesionRemateDeposito: string;
    compraVentaDeInmueble: string;
    compraVentaDeInmuebleDeposito: string;
    persona: string;
    titularidad: string;
    comision: string;
    titulares: string;
    contacto: string;
    colabora: string;
    avalistas: string;
    cargasAnteriores: string;
    cargasPosteriores: string;
    cargasPreferentes: string;
    referenciaPrestamo1: string;
    rango1: string;
    fechaFormalizacion1: string;
    fechaVencimiento1: string;
    principalDispuesto1: string;
    deudaActual1: string;
    vencimientoAnticipado1: string;
    responsabilidadHipotecaria1: string;
    referenciaPrestamo2: string;
    rango2: string;
    fechaFormalizacion2: string;
    fechaVencimiento2: string;
    principalDispuesto2: string;
    deudaActual2: string;
    vencimientoAnticipado2: string;
    responsabilidadHipotecaria2: string;
    referenciaPrestamo3: string;
    rango3: string;
    fechaFormalizacion3: string;
    fechaVencimiento3: string;
    principalDispuesto3: string;
    deudaActual3: string;
    vencimientoAnticipado3: string;
    responsabilidadHipotecaria3: string;
    judicializado: string;
    tipoProcedimientoJudicial: string;
    juzgadoCompetente: string;
    autos: string;
    rangoJudicializado: string;
    cantidadReclamada: string;
    tasacionEfectosSubasta: string;
    viviendaHabitual: string;
    faseJudicialActual: string;
    fechaFaseJudicialActual: string;
    activo: string;
    encuesta: string;
    categoria: string;
    productoVirtual: string;
}
