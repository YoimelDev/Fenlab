import { h } from 'vue'
import type { ColumnDef } from '@tanstack/vue-table'
import { type publication } from '@/Pages/MyPublications/types'
import { Badge, type BadgeVariants } from '@/Components/ui/badge'
import DropdownAction from './DataTableDropdown.vue'

type BadgeMode = 'REO' | 'NPL' | 'PL/SPL' | 'Pendiente' | 'En curso' | 'Completado';

const badgeMap: Record<BadgeMode, BadgeVariants['variant']> = {
    REO: 'default',
    NPL: 'primary',
    'PL/SPL': 'secondary',
    Pendiente: 'pending',
    'En curso': 'progress',
    Completado: 'success',
}

export const columns: ColumnDef<publication>[] = [
    {
        header: 'NOMBRE PROYECTO',
        accessorKey: 'name',
        cell: (row) => {
            const name = row.getValue() as string
            return h('p', { class: 'font-bold' }, name)
        },
        
    },
    {
        header: 'ID CLIENTE',
        accessorKey: 'client_id',
    },
    {
        header: 'ID FENCIA',
        accessorKey: 'fencia_id',
    },
    {
        header: 'ESTADO',
        accessorKey: 'status',
        cell: (row) => {
            const status = row.getValue() as BadgeMode
            return h(
                'div',
                { class: 'font-medium' },
                h(Badge, { variant: badgeMap[status] }, status),
            )
        },
    },
    {
        header: 'REF. CATASTRAL',
        accessorKey: 'cadastral_reference',
    },
    {
        header: 'PRECIO MÍNIMO',
        accessorKey: 'min_price',
    },
    {
        header: 'VALOR DE REFERENCIA',
        accessorKey: 'reference_value',
    },
    {
        id: 'actions',
        header: () => '',
        accessorKey: 'id',
        cell: () => {
            return h('div', { class: 'relative' }, h(DropdownAction, {}))
        },
    },
]