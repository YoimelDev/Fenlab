export interface IndividualAsset {
    id:                      string;
    idFencia:                string;
    idCliente:               string;
    tipologia:               string;
    subtipologia:            string;
    numeroHabitaciones:      number;
    numeroBanos:             number;
    anoConstruccion:         number;
    referenciaCatastral:     string;
    codigoPostal:            string;
    codigoMunicipio:         string;
    municipio:               string;
    provincia:               string;
    comunidadAutonoma:       string;
    superficieConstruida:    number;
    superficieParcela:       number;
    tipoDeVia:               string;
    nombreVia:               string;
    numeroVia:               number;
    planta:                  null;
    puerta:                  null;
    valorCatastral:          null;
    valorCliente:            number;
    valorVPO:                number;
    tipoOcupante:            string;
    vulnerabilidadOcupante:  null;
    contacto:                boolean;
    colabora:                boolean;
    viviendaHabitual:        null;
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
    wantCapex:               boolean;
    capex:                   number;
    mesesCapex:              number;
    marketing:               number;
    mesesVentaInmuebleVacio: number;
    reoInput:                null;
    reoModel:                NPLModel;
    nplInput:                NPLInput;
    nplModel:                NPLModel;
    fechaAprobacion:         null;
    precioReferencia:        null;
    opcionesDePublicacion:   [];
    idealista:               Idealista;
    assetPdf:                AssetPDF;
    status:                  string;
    publishedAt:             null;
    projectId:               string;
    createdAt:               Date;
    updatedAt:               Date;
}

export interface AssetPDF {
    extension:   string;
    title:       string;
    description: string;
    url:         string;
}

export interface Idealista {
    cadastralReference:           string;
    municipio:                    string;
    provincia:                    string;
    valoracionFencia:             number;
    alquiler:                     null;
    valorMaximo:                  null;
    '3BValue':                    null;
    valorMinimo:                  null;
    demanda:                      null;
    demandaFinalZona:             string;
    faseDeCiclo:                  string;
    riesgoDeVenta:                string;
    ritmoVentaMercado:            string;
    diasDeVentaMercado:           null;
    grossyieldPorcentaje:         null;
    valoracionModelo:             null;
    valoracionModeloAccuracy:     null;
    valorAnterior:                null;
    fecaValorAnterior:            null;
    tipoFromCat:                  string;
    unitarioMedio25Testigos:      number;
    unitarioMedio8Testigos:       number;
    superficie:                   number;
    testigo1Superficie:           number;
    testigo1Precio:               number;
    testigo1Unitario:             number;
    testigo1Link:                 null;
    testigo1CumpleSuperficie:     null;
    testigo1CumpleDistancia:      null;
    testigo1CumpleZona:           null;
    testigo1HasLift:              null;
    testigo1Address:              string;
    testigo1DiasPublicado:        null;
    testigo1Distance:             number;
    testigo1Latitude:             number;
    testigo1Longitude:            number;
    testigo1AddressVisible:       boolean;
    testigo2Superficie:           number;
    testigo2Precio:               number;
    testigo2Unitario:             number;
    testigo2Link:                 string;
    testigo2CumpleSuperficie:     boolean;
    testigo2CumpleDistancia:      boolean;
    testigo2CumpleZona:           boolean;
    testigo2HasLift:              boolean;
    testigo2Address:              string;
    testigo2DiasPublicado:        number;
    testigo2Distance:             number;
    testigo2Latitude:             number;
    testigo2Longitude:            number;
    testigo2AddressVisible:       boolean;
    testigo3Superficie:           number;
    testigo3Precio:               number;
    testigo3Unitario:             number;
    testigo3Link:                 string;
    testigo3CumpleSuperficie:     boolean;
    testigo3CumpleDistancia:      boolean;
    testigo3CumpleZona:           boolean;
    testigo3HasLift:              boolean;
    testigo3Address:              null;
    testigo3DiasPublicado:        null;
    testigo3Distance:             null;
    testigo3Latitude:             null;
    testigo3Longitude:            null;
    testigo3AddressVisible:       boolean;
    testigo4Superficie:           number;
    testigo4Precio:               number;
    testigo4Unitario:             number;
    testigo4Link:                 string;
    testigo4CumpleSuperficie:     boolean;
    testigo4CumpleDistancia:      null;
    testigo4CumpleZona:           null;
    testigo4HasLift:              boolean;
    testigo4Address:              string;
    testigo4DiasPublicado:        number;
    testigo4Distance:             null;
    testigo4Latitude:             null;
    testigo4Longitude:            null;
    testigo4AddressVisible:       boolean;
    testigo5Superficie:           number;
    testigo5Precio:               number;
    testigo5Unitario:             number;
    testigo5Link:                 string;
    testigo5CumpleSuperficie:     boolean;
    testigo5CumpleDistancia:      null;
    testigo5CumpleZona:           null;
    testigo5HasLift:              boolean;
    testigo5Address:              string;
    testigo5DiasPublicado:        number;
    testigo5Distance:             null;
    testigo5Latitude:             null;
    testigo5Longitude:            null;
    testigo5AddressVisible:       boolean;
    testigo6Superficie:           number;
    testigo6Precio:               number;
    testigo6Unitario:             number;
    testigo6Link:                 string;
    testigo6CumpleSuperficie:     boolean;
    testigo6CumpleDistancia:      null;
    testigo6CumpleZona:           null;
    testigo6HasLift:              boolean;
    testigo6Address:              string;
    testigo6DiasPublicado:        number;
    testigo6Distance:             null;
    testigo6Latitude:             null;
    testigo6Longitude:            null;
    testigo6AddressVisible:       boolean;
    testigo7Superficie:           number;
    testigo7Precio:               number;
    testigo7Unitario:             number;
    testigo7Link:                 string;
    testigo7CumpleSuperficie:     boolean;
    testigo7CumpleDistancia:      null;
    testigo7CumpleZona:           null;
    testigo7HasLift:              boolean;
    testigo7Address:              string;
    testigo7DiasPublicado:        number;
    testigo7Distance:             null;
    testigo7Latitude:             null;
    testigo7Longitude:            null;
    testigo7AddressVisible:       boolean;
    testigo8Superficie:           number;
    testigo8Precio:               number;
    testigo8Unitario:             number;
    testigo8Link:                 string;
    testigo8CumpleSuperficie:     boolean;
    testigo8CumpleDistancia:      null;
    testigo8CumpleZona:           null;
    testigo8HasLift:              boolean;
    testigo8Address:              string;
    testigo8DiasPublicado:        number;
    testigo8Distance:             null;
    testigo8Latitude:             null;
    testigo8Longitude:            null;
    testigo8AddressVisible:       boolean;
    testigosEmpleados:            number;
    fotoFachada:                  string;
    mapa:                         string;
    anoConstruccion:              number;
    lat:                          number;
    lng:                          number;
    idCapa:                       null;
    geocodingMethod:              null;
    referenciaCatastralIdealista: null;
    fiabilidad:                   number;
    origenId:                     string;
    locationId:                   string;
    locationName:                 string;
    locationLevel:                string;
    typology:                     string;
    population:                   number;
    unemployment:                 null;
    familyIncome:                 null;
    grossYield:                   null;
    saleUnitPrice:                number;
    salePrice:                    number;
    saleTradingMargin:            null;
    saleLeadsFinalZone:           number;
    saleStock:                    number;
    saleRating:                   number;
    saleEffortRate:               null;
    rentalUnitPrice:              number;
    rentalPrice:                  number;
    rentalTradingMargin:          number;
    rentalDemand:                 string;
    rentalDemandFinalZone:        string;
    rentalLeadsFinalZone:         number;
    rentalStock:                  number;
    rentalRating:                 number;
    phaseOfTheRentalCycle:        string;
    rentalRisk:                   string;
    rentalMarketSpeed:            string;
    diasEnMercadoAlquiler:        number;
    rentalEffortRate:             number;
}

export interface NPLInput {
    hipotecas:               Hipoteca[];
    valorAEfectosSubasta:    number;
    cargasPreferentes:       boolean;
    cargasAnteriores:        number;
    cargasPosteriores:       number;
    persona:                 string;
    avalistas:               boolean;
    faseJudicialProceso:     string;
    fechaFaseJudicialActual: Date;
    rangoJudicializado:      number;
}

export interface Hipoteca {
    cantidadReclamada:          CantidadReclamada;
    responsabilidadHipotecaria: CantidadReclamada;
    rango:                      number;
    judicializado:              boolean;
    principalConcedido:         number;
    fechaFormalizacion:         Date;
    fechaVencimiento:           Date;
    vencimientoAnticipado:      boolean;
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
    fechaFinAlquiler:                                         FechaFinAlquiler;
    mesesFinAlquiler:                                         number;
    rentaActualAjustada:                                      number;
    cuotasImpagadas:                                          number;
    acuerdoExtrajudicial:                                     boolean;
    mesesDesahucioJudicial:                                   number;
    activacionProcesoLanzamiento:                             boolean;
    tiempoHastaPosesionAlquilerVigenteNoAcuerdo:              number;
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
    '5':   The1;
    total: The1;
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

export interface FechaFinAlquiler {
    $date: Date;
}
