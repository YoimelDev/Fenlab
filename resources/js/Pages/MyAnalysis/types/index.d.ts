export interface Analysis {
    id: number
    link: string
    mode: 'REO' | 'NPL' | 'PL/SPL'
    project: string
    description: string
    assets: number
    status: 'Pendiente' | 'En curso' | 'Completado'
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