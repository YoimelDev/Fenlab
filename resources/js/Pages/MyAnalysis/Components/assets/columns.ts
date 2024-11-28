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
    },
    {
        header: 'Valor de referencia',
        accessorKey: 'model.npl.precioReferencia',
    },
    {
        header: 'Modalidad de transacción',
        accessorKey: 'model.type',
    },
    {
        id: 'actions',
        header: () => '',
        accessorKey: 'id',
        cell: (row) => {
            return h('div', { class: 'relative' }, h(DropdownAction, {
                asset: row.row.original,
            }))
        },
    },
]