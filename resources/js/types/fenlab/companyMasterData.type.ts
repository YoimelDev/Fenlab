
export interface CompanyMasterData {
    macro:                            Macro[];
    WACC:                             number;
    managementFee:                    number;
    brokerFeeMinimo:                  number;
    brokerFee:                        BrokerFee[];
    seguridad:                        Seguridad;
    mesesVentaEstadoActual:           number;
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