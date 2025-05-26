import { RecordType } from "@/constants/recordTypes";

export interface publication {
    id: number;
    name: string;
    client_id: string;
    fencia_id: string;
    status: string;
    cadastral_reference: string;
    min_price: string;
    reference_value: string;
}

export interface Publishable {
    data: Datum[];
    meta: Meta;
}

export interface PublishableProject {
    id: string;
    idCliente: string;
    idFencia: string;
    status: string;
    publishedAt: null;
    projectId: string;
    createdAt: Date;
    updatedAt: Date;
    model: Model;
}

export interface Model {
    type: string;
    direccionCompleta: string;
    tipologia: string;
    subtipologia: string;
    numeroHabitaciones: number;
    numeroBanos: number;
    anoConstruccion: number;
    tipoDeVia: string;
    nombreVia: string;
    numeroVia: number;
    planta: null;
    codigoPostal: string;
    municipio: string;
    provincia: string;
    comunidadAutonoma: string;
    referenciaCatastral: string;
    superficieConstruida: number;
    superficieParcela: number;
    tipoOcupante: string;
    viviendaHabitual: null;
    contacto: boolean;
    colabora: boolean;
    vulnerabilidadOcupante: null;
    mesesPosesionConAcuerdo: number;
    incentivo: number;
    fechaInicioAlquiler: Date;
    fechaFinAlquiler: Date;
    rentaInicio: number;
    rentaActual: number;
    impagoAcumulado: number;
    IBI: number;
    comunidad: number;
    otrasTasas: number;
    suministros: number;
    seguridad: boolean;
    seguridadCoste: number;
    marketing: number;
    capex: number;
    mesesCapex: number;
    mesesVentaInmuebleVacio: number;
    valorCatastral: null;
    npl: NPL;
}

export interface NPL {
    fechaAprobacion: Date;
    precioReferencia: number;
    subasta: Credito;
    credito: Credito;
    remate: Credito;
}

export interface Credito {
    isPublishable: boolean;
    precioMinimo: number | null;
}

export interface Meta {
    currentPage: number;
    perPage: number;
    totalItems: number;
    totalPages: number;
}

export interface Published {
    Auctions: Auction[];
    "Upcoming Auctions": UpcomingAuction[];
}

export interface Auction {
    id: string;
    fenlabId: null;
    prestashopId: string;
    name: string;
    companyId: CompanyID;
    stage: Sta;
    startDate: Date;
    endDate: Date;
    recordType: DType;
    companyName?: string;
    numberOfBids?: number;
}

export enum CompanyID {
    The001J6000005Ty4WIAC = "001J6000005Ty4wIAC",
}

export enum DType {
    AssetPurchase = "Asset Purchase",
}

export enum Sta {
    Open = "Open",
}

export interface UpcomingAuction {
    id: string;
    prestashopId: string;
    name: string;
    companyId: CompanyID;
    status: Sta;
    startDate: Date;
    endDate: Date;
    allowedType: DType;
}

export interface PendingApproval {
    PBCstatus: string;
    publicLinks: string[];
    referencePrice: number;
    offerValue: null;
    minimumPrice: null;
    rejectedDate: null;
    approvedDate: null;
    offerDate: null;
    startDate: Date;
    stage: string;
    auctionRecordType: RecordType;
    titular: string;
    name: string;
    clientId: string;
    fenlabId: string;
    fenciaId: null;
    salesforceId: string;
}

export interface PendingPBC {
    PBCtype: string;
    publicLinks: string[];
    auctionRecordType: RecordType;
    offerValue: null;
    approvedPBC2Date: null;
    approvedPBCDate: null;
    stage: string;
    titular: string;
    companyId: string;
    name: string;
    fenlabId: string;
    prestashopId: null;
    salesforceId: string;
}

export interface PendingNotary {
    publicLinks: string[];
    notaryAddress: NotaryAddress;
    notary: null;
    scheduledDateNotary: null;
    signStatus: string;
    recordType: RecordType;
    offerValue: null;
    startDate: Date;
    stage: string;
    titular: string;
    companyId: string;
    name: string;
    fenlabId: string;
    prestashopId: null;
    salesforceId: string;
}

export interface NotaryAddress {
    city: string;
    country: string;
    countryCode: string;
    geocodeAccuracy: null;
    latitude: null;
    longitude: null;
    postalCode: string;
    state: null;
    stateCode: null;
    street: string;
}

export interface ClosedAuctions {
    stage: string;
    companyName: string;
    companyId: string;
    name: string;
    id: string;
}

export interface PostData {
    postType: "pendingApproval" | "pendingPBC" | "pendingNotary";
    data: PendingApproval | PendingPBC | PendingNotary;
    endpoint: string;
}
