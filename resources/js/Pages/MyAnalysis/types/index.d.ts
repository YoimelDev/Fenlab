export interface Analysis {
    id: number
    mode: 'REO' | 'NPL' | 'PL/SPL'
    project: string
    description: string
    assets: number
    status: 'Pendiente' | 'En curso' | 'Completado'
    date: string
}