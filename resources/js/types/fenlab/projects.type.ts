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
    instructions: string;
    status: Status;
    modelType: ModelType;
    timeToValidateFirstExcelInSeconds: number;
    timeToValidateSecondExcelInSeconds: null;
    timeToValidateIdealistaExcelInSeconds: number;
    timeToRunModelInSeconds: number;
    firstExcel: FirstExcel;
    secondExcel: FirstExcel;
    template: FirstExcel;
    outputBBDD: FirstExcel;
    outputCF: FirstExcel;
    strats: FirstExcel;
    assetsZip: FirstExcel;
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
    brokerFeeMinimo: number;
    brokerFee: BrokerFee[];
    seguridad: Seguridad;
    mesesVentaEstadoActual: number;
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

export interface KpiData {
    analysis:  KPI;
    published: KPI;
    approved:  KPI;
    signed:    KPI;
}

export interface KPI {
    currentMonth: number;
    lastMonth:    number;
    percentage:   number;
    variation:    number;
}

export interface PublishData {
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
