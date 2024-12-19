import { h } from 'vue'
import type { ColumnDef } from '@tanstack/vue-table'
import { AssetData } from '@/Pages/MyAnalysis/types'
import DropdownAction from './DataTableDropdown.vue'

export const columns: ColumnDef<AssetData>[] = [
    {
        header: () => h('div', { class: 'w-[78px]' }, 'ID cliente'),
        accessorKey: 'idCliente',
        meta: '!w-[78px]',
        cell: (row) => {
            const client_id = row.getValue() as string
            return h('p', { class: 'w-[224px] truncate' }, client_id)
        },
    },
    {
        header: 'ID fenlab',
        accessorKey: 'idFencia',
    },
    {
        header: () => 'Referencia catastral',
        accessorKey: 'model.referenciaCatastral',
    },
    {
        header: 'Precio mínimo',
        accessorKey: 'model.npl.credito.precioMinimo',
        cell: (row) => {
            const value = row.getValue() as string | number | null
            return value ?? '-'
        },
    },
    {
        header: 'Valor de referencia',
        accessorKey: 'model.npl.precioReferencia',
        cell: (row) => {
            const value = row.getValue() as string | number | null
            return value ?? '-'
        },
    },
    {
        header: 'Modalidad de transacción',
        accessorKey: 'model.type',
        cell: (row) => {
            const npl = row.row.original.model.npl
            if (npl.subasta?.isPublishable) return 'Subasta'
            if (npl.credito?.isPublishable) return 'Crédito'
            if (npl.remate?.isPublishable) return 'Remate'
            return '-'
        },
    },
    {
        id: 'actions',
        header: () => '',
        accessorKey: 'id',
        cell: (row) => {
            if (row.row.original.model.npl.credito.isPublishable === false) return

            return h('div', { class: 'relative' }, h(DropdownAction, {
                asset: row.row.original,
            }))
        },
    },
]