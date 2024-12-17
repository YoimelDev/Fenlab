export interface publication {
    id: number
    name: string
    client_id: string
    fencia_id: string
    status: string
    cadastral_reference: string
    min_price: string
    reference_value: string
}

export interface Publishable {
    data: Datum[];
    meta: Meta;
}

export interface PublishableProject {
    id:          string;
    idCliente:   string;
    idFencia:    string;
    status:      string;
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
    numeroHabitaciones:      number;
    numeroBanos:             number;
    anoConstruccion:         number;
    tipoDeVia:               string;
    nombreVia:               string;
    numeroVia:               number;
    planta:                  null;
    codigoPostal:            string;
    municipio:               string;
    provincia:               string;
    comunidadAutonoma:       string;
    referenciaCatastral:     string;
    superficieConstruida:    number;
    superficieParcela:       number;
    tipoOcupante:            string;
    viviendaHabitual:        null;
    contacto:                boolean;
    colabora:                boolean;
    vulnerabilidadOcupante:  null;
    mesesPosesionConAcuerdo: number;
    incentivo:               number;
    fechaInicioAlquiler:     Date;
    fechaFinAlquiler:        Date;
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
    fechaAprobacion:  Date;
    precioReferencia: number;
    subasta:          Credito;
    credito:          Credito;
    remate:           Credito;
}

export interface Credito {
    isPublishable: boolean;
    precioMinimo:  number | null;
}

export interface Meta {
    currentPage: number;
    perPage:     number;
    totalItems:  number;
    totalPages:  number;
}

export interface PendingApproval {
    rejectedDate: string | null;
    approvedDate: string | null;
    stage: string;
    companyName: string;
    companyId: string;
    name: string;
    id: string;
}

export interface PendingPBC {
    PBCtype: string;
    recordType: string;
    approvedPBC2Date: string | null;
    approvedPBCDate: string | null;
    stage: string;
    companyId: string;
    name: string;
    id: string;
}

export interface PendingNotary {
    fenlabId: string;
    stage: string;
    companyId: string;
    name: string;
    id: string;
}

export interface ClosedAuctions {
    stage:       string;
    companyName: string;
    companyId:   string;
    name:        string;
    id:          string;
}
