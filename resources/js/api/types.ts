// CompanyMasterData

export interface CompanyMasterData {
    macro:                            Macro[];
    WACC:                             number;
    managementFee:                    number;
    costeDesahucioAbogado:            number;
    costeDesahucioProcurador:         number;
    brokerFeeMinimo:                  number;
    brokerFee:                        BrokerFee[];
    seguridad:                        Seguridad;
    mesesVentas:                      number;
    marketingAnualSobreValorInmueble: number;
    costeHipotecariaAbogado:          number;
    costeHipotecariaProcurador:       number;
    costeHipotecariaOtros:            number;
    costeLanzamientoAbogado:          number;
    costeLanzamientoProcurador:       number;
    costeLanzamientoOtros:            number;
    deducibilidadIVA:                 number;
    incentivoPorDefecto:              number;
}

export interface BrokerFee {
    tramo:   string;
    fee:     number;
    cap:     number;
    hurdle?: number;
}

export interface Macro {
    ano:          number;
    IPC:          number;
    HPA:          number;
    interesLegal: number;
}

export interface Seguridad {
    alta:  number;
    media: number;
    baja:  number;
}


// DefaultMasterData

export interface DefaultMasterData {
    id:                                           string;
    WACC:                                         number;
    managementFee:                                number;
    costeDesahucioAbogado:                        number;
    costeDesahucioProcurador:                     number;
    brokerFeeMinimo:                              number;
    macro:                                        Macro[];
    brokerFee:                                    BrokerFee[];
    seguridad:                                    Seguridad;
    mesesVentas:                                  number;
    marketingAnualSobreValorInmueble:             number;
    incentivoPorDefecto:                          number;
    costeHipotecariaAbogado:                      number;
    costeHipotecariaProcurador:                   number;
    costeHipotecariaOtros:                        number;
    costeLanzamientoAbogado:                      number;
    costeLanzamientoProcurador:                   number;
    costeLanzamientoOtros:                        number;
    deducibilidadIVA:                             number;
    diasPromedioMes:                              number;
    cuotasImpagadasMinimasParaDemanda:            number;
    subtipologia:                                 Subtipologia[];
    faseDesahucio:                                FaseDesahucio[];
    costeProcesoDesahucio:                        CosteProcesoDesahucio;
    informeOcupacional:                           InformeOcupacional;
    otrasTasas:                                   number;
    mesesVencimientoForzado:                      number;
    tiempoMaximoModelo:                           number;
    valorCatastral:                               number;
    mesesAdicionalesPublicacionTestigosVenta:     number;
    mesesExtraLanzamientoPorVulnerabilidad:       number;
    tiempoPosesionVacio:                          number;
    cuotasMinimasParaDemandaOcupante:             number;
    subastasMesesTestimonioCobroFenciaFee:        number;
    remateMesesTestimonioCobroFenciaFee:          number;
    anoIBIyComunidadImpagadaPorDefecto:           number;
    registroCertificacionDeCargas:                RegistroCertificacionDeCargas;
    registroInscripcionFincaYCancelacionHipoteca: RegistroInscripcionFincaYCancelacionHipoteca[];
    registroInscripcionTestimonio:                number;
    registroOtrosCostesCancelacionCargas:         number;
    gestoriaAdjudicacion:                         number;
    plusvaliaMunicipalPostAdjudicacion:           number;
    casoJudicialNegativo:                         CasoJudicialNegativo;
    createdAt:                                    Date;
    updatedAt:                                    Date;
}

export interface BrokerFee {
    tramo:   string;
    fee:     number;
    cap:     number;
    hurdle?: number;
}

export interface CasoJudicialNegativo {
    ventaCredito:   CesionDeRemate[];
    posturaSubasta: CesionDeRemate[];
    cesionDeRemate: CesionDeRemate[];
}

export interface CesionDeRemate {
    condition:  string;
    value:      number;
    percentage: number;
}

export interface CosteProcesoDesahucio {
    tasaPorImpagoRentas: number;
    tasasPorOcupacion:   number;
}

export interface FaseDesahucio {
    fase:   string;
    avance: number;
}

export interface InformeOcupacional {
    coste:  number;
    margen: number;
}

export interface Macro {
    ano:          number;
    IPC:          number;
    HPA:          number;
    interesLegal: number;
}

export interface RegistroCertificacionDeCargas {
    asientoExpedicion:               number;
    certificacionDespachoDocumentos: number;
    certificacionDeCargasPorFinca:   number;
}

export interface RegistroInscripcionFincaYCancelacionHipoteca {
    cap:  number;
    min?: number;
    '%'?: number;
    max?: number;
}

export interface Seguridad {
    alta:  number;
    media: number;
    baja:  number;
}

export interface Subtipologia {
    name:           string;
    comunidadValor: number;
    suministrosMes: number;
    capexValor:     number;
    tiempoCapex:    number;
    capexMinimo:    number;
    tipologia:      string;
    __EMPTY_3?:     string;
}

// Project

export interface Project {
    id:                                    string;
    companyId:                             string;
    name:                                  string;
    description:                           string;
    status:                                string;
    modelType:                             string;
    timeToValidateFirstExcelInSeconds:     number;
    timeToValidateSecondExcelInSeconds:    null;
    timeToValidateIdealistaExcelInSeconds: number;
    timeToRunModelInSeconds:               number;
    firstExcel:                            FirstExcel;
    outputBBDD:                            FirstExcel;
    outputCF:                              FirstExcel;
    strats:                                FirstExcel;
    masterData:                            MasterData;
    createdAt:                             Date;
    updatedAt:                             Date;
    createdBy:                             string;
    updatedBy:                             string;
}

export interface FirstExcel {
    extension:   string;
    title:       string;
    description: string;
    url?:        string;
    s3Key?:      string;
}

export interface MasterData {
    macro:                            Macro[];
    WACC:                             number;
    managementFee:                    number;
    costeDesahucioAbogado:            number;
    costeDesahucioProcurador:         number;
    brokerFeeMinimo:                  number;
    brokerFee:                        BrokerFee[];
    seguridad:                        Seguridad;
    mesesVentas:                      number;
    marketingAnualSobreValorInmueble: number;
    costeHipotecariaAbogado:          number;
    costeHipotecariaProcurador:       number;
    costeHipotecariaOtros:            number;
    costeLanzamientoAbogado:          number;
    costeLanzamientoProcurador:       number;
    costeLanzamientoOtros:            number;
    deducibilidadIVA:                 number;
    incentivoPorDefecto:              number;
}

export interface BrokerFee {
    tramo:   string;
    fee:     number;
    cap:     number;
    hurdle?: number;
}

export interface Macro {
    ano:          number;
    IPC:          number;
    HPA:          number;
    interesLegal: number;
}

export interface Seguridad {
    alta:  number;
    media: number;
    baja:  number;
}


// Project Assets

export interface ProjectsAssets {
    data: AssetData[];
    meta: Meta;
}

export interface AssetData {
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
    precioReferencia: null;
    subasta:          Credito;
    credito:          Credito;
    remate:           Credito;
}

export interface Credito {
    isPublishable: boolean;
    precioMinimo:  null;
}

export interface Meta {
    currentPage: number;
    perPage:     number;
    totalItems:  number;
    totalPages:  number;
}

// Asset

export interface Assets {
    id:                      string;
    idFencia:                string;
    idCliente:               string;
    tipologia:               string;
    subtipologia:            string;
    numeroHabitaciones:      null;
    numeroBanos:             null;
    anoConstruccion:         null;
    referenciaCatastral:     string;
    codigoPostal:            string;
    municipio:               string;
    provincia:               string;
    comunidadAutonoma:       string;
    superficieConstruida:    number;
    superficieParcela:       number;
    tipoDeVia:               string;
    nombreVia:               string;
    numeroVia:               number;
    planta:                  string;
    puerta:                  string;
    valorCatastral:          null;
    valorCliente:            number;
    valorVPO:                number;
    tipoOcupante:            string;
    vulnerabilidadOcupante:  null;
    contacto:                boolean;
    colabora:                boolean;
    viviendaHabitual:        boolean;
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
    wantCapex:               boolean;
    capex:                   number;
    mesesCapex:              number;
    marketing:               number;
    mesesVentaInmuebleVacio: number;
    reoInput:                null;
    reoModel:                ReoModel;
    nplInput:                NPLInput;
    nplModel:                NPLModel;
    fechaAprobacion:         null;
    precioReferencia:        null;
    opcionesDePublicacion:   unknown[];
    idealista:               Idealista;
    assetPdf:                AssetPDF;
    status:                  string;
    publishedAt:             null;
    projectId:               string;
    createdAt:               Date;
    updatedAt:               Date;
}

export interface AssetPDF {
    s3Key:       string;
    extension:   string;
    title:       string;
    description: string;
}

export interface Idealista {
    valorMercado:               number;
    valorMinimo:                number;
    alquiler:                   number;
    demanda:                    string;
    faseDeCiclo:                string;
    riesgoDeVenta:              string;
    ritmoVentaMercado:          string;
    diasDeVentaMercado:         number;
    category:                   string;
    typeOfCollateral:           string;
    typeOfAsset:                string;
    type:                       number;
    subtype:                    null;
    status:                     string;
    region:                     string;
    provincia:                  string;
    municipio:                  string;
    zipCode:                    number;
    typeOfRoad:                 string;
    addres:                     string;
    totalFloorArea:             string;
    surfaceUnits:               string;
    cadastralReference:         string;
    valorMaximo:                number;
    fiabiliadValorMercado:      number;
    grossyieldPorcentaje:       number;
    valoracionModelo:           number;
    valoracionModeloAccuracy:   number;
    valorAnterior:              null;
    fecaValorAnterior:          null;
    valorAnteriorActualizado:   null;
    variacionValorAnterior:     null;
    tipologiaValoracion:        string;
    subtipologiaValoracion:     string;
    supFinalValoracion:         number;
    referenciaCatastral:        string;
    usoCatastro:                string;
    tipoFromCat:                string;
    subtipFromCat:              string;
    supCatConstruidaTotal:      string;
    supCatConstruidaValoracion: number;
    anoConstruccionCat:         string;
    direccCat:                  string;
    codPost:                    number;
    codMunicipioINE:            number;
    seccCensal:                 number;
    alarmValorCarteraAnterior:  number;
    observaciones:              null;
    alertaAntecedente:          string;
    alertaLocalizacion:         null;
    alertaTipologia:            null;
    alertaSuperficies:          null;
    alertaValor:                null;
    unitarioMedio25Testigos:    number;
    unitarioMedio8Testigos:     number;
    testigo1Superficie:         number;
    testigo1Precio:             number;
    testigo1Unitario:           number;
    testigo1Link:               string;
    testigo1CumpleSuperficie:   boolean;
    testigo1CumpleDistancia:    boolean;
    testigo1CumpleZona:         boolean;
    testigo1HasLift:            null;
    testigo1Address:            string;
    testigo1DiasPublicado:      number;
    testigo1Distance:           number;
    testigo1Latitude:           number;
    testigo1Longitude:          number;
    testigo1AddressVisible:     boolean;
    testigo2Superficie:         number;
    testigo2Precio:             number;
    testigo2Unitario:           number;
    testigo2Link:               string;
    testigo2CumpleSuperficie:   boolean;
    testigo2CumpleDistancia:    boolean;
    testigo2CumpleZona:         boolean;
    testigo2HasLift:            boolean;
    testigo2Address:            string;
    testigo2DiasPublicado:      number;
    testigo2Distance:           number;
    testigo2Latitude:           number;
    testigo2Longitude:          number;
    testigo2AddressVisible:     boolean;
    testigo3Superficie:         number;
    testigo3Precio:             number;
    testigo3Unitario:           number;
    testigo3Link:               string;
    testigo3CumpleSuperficie:   boolean;
    testigo3CumpleDistancia:    boolean;
    testigo3CumpleZona:         boolean;
    testigo3HasLift:            boolean;
    testigo3Address:            string;
    testigo3DiasPublicado:      number;
    testigo3Distance:           number;
    testigo3Latitude:           number;
    testigo3Longitude:          number;
    testigo3AddressVisible:     boolean;
    testigo4Superficie:         number;
    testigo4Precio:             number;
    testigo4Unitario:           number;
    testigo4Link:               string;
    testigo4CumpleSuperficie:   boolean;
    testigo4CumpleDistancia:    boolean;
    testigo4CumpleZona:         boolean;
    testigo4HasLift:            null;
    testigo4Address:            string;
    testigo4DiasPublicado:      number;
    testigo4Distance:           number;
    testigo4Latitude:           number;
    testigo4Longitude:          number;
    testigo4AddressVisible:     boolean;
    testigo5Superficie:         number;
    testigo5Precio:             number;
    testigo5Unitario:           number;
    testigo5Link:               string;
    testigo5CumpleSuperficie:   boolean;
    testigo5CumpleDistancia:    boolean;
    testigo5CumpleZona:         boolean;
    testigo5HasLift:            boolean;
    testigo5Address:            string;
    testigo5DiasPublicado:      number;
    testigo5Distance:           number;
    testigo5Latitude:           number;
    testigo5Longitude:          number;
    testigo5AddressVisible:     boolean;
    testigo6Superficie:         number;
    testigo6Precio:             number;
    testigo6Unitario:           number;
    testigo6Link:               string;
    testigo6CumpleSuperficie:   boolean;
    testigo6CumpleDistancia:    boolean;
    testigo6CumpleZona:         boolean;
    testigo6HasLift:            boolean;
    testigo6Address:            string;
    testigo6DiasPublicado:      number;
    testigo6Distance:           number;
    testigo6Latitude:           number;
    testigo6Longitude:          number;
    testigo6AddressVisible:     boolean;
    testigo7Superficie:         number;
    testigo7Precio:             number;
    testigo7Unitario:           number;
    testigo7Link:               string;
    testigo7CumpleSuperficie:   boolean;
    testigo7CumpleDistancia:    boolean;
    testigo7CumpleZona:         boolean;
    testigo7HasLift:            boolean;
    testigo7Address:            string;
    testigo7DiasPublicado:      number;
    testigo7Distance:           number;
    testigo7Latitude:           number;
    testigo7Longitude:          number;
    testigo7AddressVisible:     boolean;
    testigo8Superficie:         number;
    testigo8Precio:             number;
    testigo8Unitario:           number;
    testigo8Link:               string;
    testigo8CumpleSuperficie:   boolean;
    testigo8CumpleDistancia:    boolean;
    testigo8CumpleZona:         boolean;
    testigo8HasLift:            boolean;
    testigo8Address:            string;
    testigo8DiasPublicado:      number;
    testigo8Distance:           number;
    testigo8Latitude:           number;
    testigo8Longitude:          number;
    testigo8AddressVisible:     boolean;
    testigosEmpleados:          number;
    fotoFachada:                string;
    mapa:                       string;
    lat:                        number;
    lng:                        number;
    geocodingMethod:            string;
    origenId:                   string;
    urlOnePager:                string;
    locationId:                 string;
    locationName:               string;
    locationLevel:              string;
    areaTypology:               string;
    population:                 number;
    unemployment:               null;
    familyIncome:               number;
    grossYield:                 number;
    saleUnitPrice:              number;
    salePrice:                  number;
    saleTradingMargin:          number;
    saleLeadsFinalZone:         number;
    saleStock:                  number;
    saleRating:                 number;
    saleEffortRate:             number;
    rentalUnitPrice:            number;
    rentalPrice:                number;
    rentalTradingMargin:        number;
    rentalDemand:               string;
    rentalLeadsFinalZone:       number;
    rentalStock:                number;
    rentalRating:               number;
    phaseOfTheRentalCycle:      string;
    rentalRisk:                 string;
    rentalMarketSpeed:          string;
    daysOnRentalMarket:         number;
    rentalEffortRate:           number;
    registerId:                 null;
    registerDate:               null;
    expirationDate:             null;
    consumptionRate:            null;
    consumption:                null;
    emissionRate:               null;
    emission:                   null;
    consumptionRatePredict:     string;
}

export interface NPLInput {
    hipotecas:             Hipoteca[];
    valorAEfectosSubasta:  number;
    IBIyComunidadImpagada: number;
    cargasAnteriores:      number;
    cargasPosteriores:     number;
    persona:               string;
    titulares:             number;
    vulnerabilidad:        boolean;
    tipoProcedimiento:     string;
    faseJudicialProceso:   string;
}

export interface Hipoteca {
    cantidadReclamada:          CantidadReclamada;
    responsabilidadHipotecaria: CantidadReclamada;
    rango:                      number;
    judicializado:              boolean;
    referencia:                 string;
    principalConcedido:         number;
    fechaFormalizacion:         Date;
    fechaVencimiento:           Date;
    vencimientoAnticipado:      boolean;
    rangoJudicializado:         number;
}

export interface CantidadReclamada {
    principal:  number;
    ordinarios: number;
    demora:     number;
    costas:     number;
}

export interface NPLModel {
    direccionCompleta:                                        string;
    deudaPropia:                                              number;
    valoracionInmueble:                                       number;
    fuenteValoracion:                                         string;
    maxRecovery:                                              number;
    LTV:                                                      number;
    estimacionValorCatastral:                                 number;
    IBI:                                                      number;
    subtipologia:                                             string;
    comunidad:                                                number;
    otrasTasas:                                               number;
    suministros:                                              number;
    seguridadCoste:                                           number;
    seguridad:                                                boolean;
    capex:                                                    number;
    mesesCapex:                                               number;
    marketing:                                                number;
    mesesVenta:                                               number;
    anosAsumidosDeDeudaIBIyComunidad:                         number;
    cargasPreferentesIBIComunidad:                            number;
    cargasPrevias:                                            boolean;
    cargasPosteriores:                                        boolean;
    judicializadoHipotecario:                                 boolean;
    rangoJudicializado:                                       number;
    partidoJudicial:                                          string;
    tiempoEstimadoFaseActual:                                 null;
    diasRealTranscurridoFaseInformada:                        null;
    ajustePorDiasTranscurridoFase:                            number;
    diasHastaTestimonio:                                      number;
    mesesHastaTestimonio:                                     number;
    adjudicacionMinima:                                       number;
    valorAdjudicacionMinima:                                  number;
    cashOut:                                                  number;
    profitStatus:                                             null;
    profitAmount:                                             null;
    ponderacionCostesJudicialesHipotecarioSegunAvanceProceso: number;
    tipoOcupante:                                             string;
    posesion:                                                 boolean;
    mesesFinAlquiler:                                         null;
    rentaActualAjustada:                                      number;
    cuotasImpagadas:                                          null;
    acuerdoExtrajudicial:                                     boolean;
    mesesDesahucioJudicial:                                   number;
    activacionProcesoLanzamiento:                             boolean;
    tiempoHastaPosesionAlquilerVigenteNoAcuerdo:              null;
    mesesPosesion:                                            number;
    posesionEmpleada:                                         string;
    mesesPosesionPlusHipotecario:                             number;
    tramosAdjudicacion:                                       { [key: string]: number };
    fijoAdjudicacion:                                         number;
    registroAdjudicacion:                                     number;
    tramosCancelacion:                                        { [key: string]: number };
    fijoCancelacion:                                          number;
    cancelacionHipotecasPropias:                              number;
    impuestoSujetoOperacion:                                  string;
    impuestoPercent:                                          number;
    impuestoTotal:                                            number;
    deductibilidadDelIVA:                                     number;
    escenarioJudicial:                                        EscenarioJudicial;
    escenarioVentaDeCredito:                                  EscenarioVentaDeCredito;
    escenarioPosturaEnSubasta:                                Escenario;
    escenarioCesionRemate:                                    Escenario;
}

export interface Escenario {
    mesesVenta:                number;
    result:                    number;
    precioVenta:               number;
    percentageOverDeudaPropia: number;
    cashFlow:                  CashFlow[];
    tramos:                    { [key: string]: number };
    brokerFee:                 number;
    brokerFeePercent:          number;
    yearlyCashFlow:            EscenarioCesionRemateYearlyCashFlow;
    npv:                       number;
}

export interface CashFlow {
    abogadoHipotecario:     number;
    procuradorHipotecario:  number;
    otrosCostesHipotecario: number;
    managmentFee:           number;
    brokerFee:              number;
    venta:                  number;
    total:                  number;
}

export interface EscenarioCesionRemateYearlyCashFlow {
    '1':   The1;
    '2':   The1;
    '3':   The1;
    '4':   The1;
    total: The1;
    '5'?:  The1;
}

export interface The1 {
    ingresos: Ingresos;
    costes:   { [key: string]: number };
    total:    number;
}

export interface Ingresos {
    total: number;
    venta: number;
    renta: number;
}

export interface EscenarioJudicial {
    mesesTotal:                        number;
    alquilerALargoPlazoForzadoAVenta:  boolean;
    ajusteDescuentoAlquilerLargoPlazo: number;
    precioVentaFuturoVacio:            number;
    precioVentaFuturoAjustado:         number;
    brokerFee:                         number;
    brokerFeePercent:                  number;
    tramos:                            { [key: string]: number };
    cashFlow:                          { [key: string]: number }[];
    npv:                               number;
    result:                            number;
    yearlyCashFlow:                    EscenarioCesionRemateYearlyCashFlow;
}

export interface EscenarioVentaDeCredito {
    mesesVenta:                number;
    result:                    number;
    precioVenta:               number;
    percentageOverDeudaPropia: number;
    cashFlow:                  CashFlow[];
    tramos:                    { [key: string]: number };
    brokerFee:                 number;
    brokerFeePercent:          number;
    yearlyCashFlow:            EscenarioVentaDeCreditoYearlyCashFlow;
    npv:                       number;
}

export interface EscenarioVentaDeCreditoYearlyCashFlow {
    '1':   The1;
    total: The1;
}

export type ReoModel = object
