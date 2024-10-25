import { h } from 'vue'
import type { ColumnDef } from '@tanstack/vue-table'
import { type publication } from '@/Pages/MyPublications/types'
import { Badge, badgeMap, type BadgeMode } from '@/Components/ui/badge'
import DropdownAction from './DataTableDropdown.vue'

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