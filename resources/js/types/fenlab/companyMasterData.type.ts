export interface CompanyMasterData {
    macro: Macro[];
    WACC: number;
    managementFee: number;
    // brokerFeeMinimo: number;
    brokerFee: FeeTramo[];
    fenciaFee: FeeTramo[];
    buyFenciaFee: FeeTramo[];
    // seguridad: Seguridad;
    // mesesVentaEstadoActual: number;
    // marketingAnualSobreValorInmueble: number;
    costeHipotecariaAbogado: number;
    costeHipotecariaProcurador: number;
    costeHipotecariaOtros: number;
    costeLanzamientoAbogado: number;
    costeLanzamientoProcurador: number;
    costeLanzamientoOtros: number;
    // deducibilidadIVA: number;
    // incentivoPorDefecto: number;
    // ajusteProindivisoTiempoVenta: number;
    // conpraCreditoNotaria: number; // Campo eliminado de la API
    // conpraCreditoRegistro: number; // Campo eliminado de la API
    // conpraCreditoGestion: number; // Campo eliminado de la API
    // adjudicacionRegistro: number; // Campo eliminado de la API
    // adjudicacionGestion: number; // Campo eliminado de la API
    successFee: SuccessFee;
}

export interface FeeTramo {
    tramo: string;
    fee: number;
    cap: number;
    hurdle?: number;
}

export interface SuccessFee {
    ventaCredito: number;
    subastaOrRemate: number;
    repossessedAsset: number;
}

export interface Macro {
    ano: number;
    IPC: number;
    HPA: number;
    // interesLegal: number;
}

export interface Seguridad {
    alta: number;
    media: number;
    baja: number;
}

// La interfaz BrokerFee y CesionRemate ya no se usan en la nueva estructura
// pero las mantenemos comentadas por si son necesarias en otras partes del código
/*
export interface BrokerFee {
    gestion: CesionRemate[];
    ventaAsIs: CesionRemate[];
    judicial: CesionRemate[];
    ventaCredito: CesionRemate[];
    posturaSubasta: CesionRemate[];
    cesionRemate: CesionRemate[];
}

export interface CesionRemate {
    tramo: string;
    fee: number;
    cap: number;
    hurdle?: number;
}
*/
