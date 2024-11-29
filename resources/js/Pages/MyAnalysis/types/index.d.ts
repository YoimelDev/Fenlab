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