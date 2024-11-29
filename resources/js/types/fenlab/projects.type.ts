export interface Projects {
    data: Project[];
    meta: Meta;
}

export interface Project {
    id: string;
    name: string;
    modelType: ModelType;
    description: string;
    _count: Count;
    status: Status;
    createdAt: Date;
}

interface Count {
    projectAssets: number;
}

export type ModelType = 'NPL' | 'REO' | 'PL/SPL';

export type Status = 'Sin empezar' | 'Análisis en curso' | 'Análisis completo' | 'Carga definitiva' | 'Pendiente' | 'En curso' | 'Completado';

interface Meta {
    currentPage: number;
    perPage: number;
    totalItems: number;
    totalPages: number;
}

export interface ProjectById {
    id: string;
    companyId: string;
    name: string;
    description: string;
    status: Status;
    modelType: ModelType;
    timeToValidateFirstExcelInSeconds: number;
    timeToValidateSecondExcelInSeconds: null;
    timeToValidateIdealistaExcelInSeconds: number;
    timeToRunModelInSeconds: number;
    firstExcel: FirstExcel;
    outputBBDD: FirstExcel;
    outputCF: FirstExcel;
    strats: FirstExcel;
    masterData: MasterData;
    createdAt: Date;
    updatedAt: Date;
    createdBy: string;
    updatedBy: string;
}

interface FirstExcel {
    extension: string;
    title: string;
    description: string;
    url?: string;
    s3Key?: string;
}

interface MasterData {
    macro: Macro[];
    WACC: number;
    managementFee: number;
    costeDesahucioAbogado: number;
    costeDesahucioProcurador: number;
    brokerFeeMinimo: number;
    brokerFee: BrokerFee[];
    seguridad: Seguridad;
    mesesVentas: number;
    marketingAnualSobreValorInmueble: number;
    costeHipotecariaAbogado: number;
    costeHipotecariaProcurador: number;
    costeHipotecariaOtros: number;
    costeLanzamientoAbogado: number;
    costeLanzamientoProcurador: number;
    costeLanzamientoOtros: number;
    deducibilidadIVA: number;
    incentivoPorDefecto: number;
}

interface BrokerFee {
    tramo: string;
    fee: number;
    cap: number;
    hurdle?: number;
}

interface Macro {
    ano: number;
    IPC: number;
    HPA: number;
    interesLegal: number;
}

interface Seguridad {
    alta: number;
    media: number;
    baja: number;
}