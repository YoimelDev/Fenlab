export interface Analysis {
    id: number
    link: string
    mode: 'REO' | 'NPL' | 'PL/SPL'
    project: string
    description: string
    assets: number
    status: 'Sin empezar' | 'Análisis en curso' | 'Análisis completo' | 'Carga definitiva'
    date: string
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

export interface AssetData {
    id:          string;
    idCliente:   string;
    idFencia:    string;
    status:      'Sin empezar' | 'Análisis en curso' | 'Análisis completo' | 'Carga definitiva';
    publishedAt: null;
    projectId:   string;
    createdAt:   Date;
    updatedAt:   Date;
    model:       Model;
}

export interface Model {
    type:                    string;
    direccionCompleta:       string;
    tipologia:               string;
    subtipologia:            string;
    numeroHabitaciones:      null;
    numeroBanos:             null;
    anoConstruccion:         null;
    tipoDeVia:               string;
    nombreVia:               string;
    numeroVia:               number;
    planta:                  string;
    codigoPostal:            string;
    municipio:               string;
    provincia:               string;
    comunidadAutonoma:       string;
    referenciaCatastral:     string;
    superficieConstruida:    number;
    superficieParcela:       number;
    tipoOcupante:            string;
    viviendaHabitual:        boolean;
    contacto:                boolean;
    colabora:                boolean;
    vulnerabilidadOcupante:  null;
    mesesPosesionConAcuerdo: number;
    incentivo:               number;
    fechaInicioAlquiler:     null;
    fechaFinAlquiler:        null;
    rentaInicio:             number;
    rentaActual:             number;
    impagoAcumulado:         number;
    IBI:                     number;
    comunidad:               number;
    otrasTasas:              number;
    suministros:             number;
    seguridad:               boolean;
    seguridadCoste:          number;
    marketing:               number;
    capex:                   number;
    mesesCapex:              number;
    mesesVentaInmuebleVacio: number;
    valorCatastral:          null;
    npl:                     NPL;
}

export interface NPL {
    fechaAprobacion:  null;
    precioReferencia: number;
    subasta:          Credito;
    credito:          Credito;
    remate:           Credito;
}

export interface Credito {
    isPublishable: boolean;
    precioMinimo:  string | number;
}

export interface Meta {
    currentPage: number;
    perPage:     number;
    totalItems:  number;
    totalPages:  number;
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
    titulo:                        string;
    referencia:                    string;
    marca:                         string;
    resumen:                       string;
    descripcion:                   string;
    precioImpuestoIncluido:        string;
    proveedores:                   string;
    comunidadAutonoma:             string;
    provincia:                     string;
    municipio:                     string;
    codigoPostal:                  string;
    metrosConstruidos:             string;
    metrosSuelo:                   string;
    vpo:                           string;
    habitaciones:                  string;
    banos:                         string;
    anoConstruccion:               number;
    referenciaCatastral:           string;
    estadoOcupado:                 string;
    compraDeCredito:               string;
    compraDeCreditoDeposito:       string;
    posturaEnSubasta:              string;
    cesionRemate:                  string;
    cesionRemateDeposito:          string;
    compraVentaDeInmueble:         string;
    compraVentaDeInmuebleDeposito: string;
    persona:                       string;
    titularidad:                   string;
    comision:                      string;
    titulares:                     string;
    contacto:                      string;
    colabora:                      string;
    avalistas:                     string;
    cargasAnteriores:              string;
    cargasPosteriores:             string;
    cargasPreferentes:             string;
    referenciaPrestamo1:           string;
    rango1:                        string;
    fechaFormalizacion1:           string;
    fechaVencimiento1:             string;
    principalDispuesto1:           string;
    deudaActual1:                  string;
    vencimientoAnticipado1:        string;
    responsabilidadHipotecaria1:   string;
    referenciaPrestamo2:           string;
    rango2:                        string;
    fechaFormalizacion2:           string;
    fechaVencimiento2:             string;
    principalDispuesto2:           string;
    deudaActual2:                  string;
    vencimientoAnticipado2:        string;
    responsabilidadHipotecaria2:   string;
    referenciaPrestamo3:           string;
    rango3:                        string;
    fechaFormalizacion3:           string;
    fechaVencimiento3:             string;
    principalDispuesto3:           string;
    deudaActual3:                  string;
    vencimientoAnticipado3:        string;
    responsabilidadHipotecaria3:   string;
    judicializado:                 string;
    tipoProcedimientoJudicial:     string;
    juzgadoCompetente:             string;
    autos:                         string;
    rangoJudicializado:            string;
    cantidadReclamada:             string;
    tasacionEfectosSubasta:        string;
    viviendaHabitual:              string;
    faseJudicialActual:            string;
    fechaFaseJudicialActual:       string;
    activo:                        string;
    encuesta:                      string;
    categoria:                     string;
    productoVirtual:               string;
}
