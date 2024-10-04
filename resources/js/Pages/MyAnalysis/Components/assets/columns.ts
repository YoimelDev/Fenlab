import { h } from 'vue'
import type { ColumnDef } from '@tanstack/vue-table'
import { type DataAnalysisAsset } from '@/Pages/MyAnalysis/types'
import DropdownAction from './DataTableDropdown.vue'


export const columns: ColumnDef<DataAnalysisAsset>[] = [
    {
        header: () => h('div', { class: 'w-[78px]' }, 'ID cliente'),
        accessorKey: 'client_id',
        meta: '!w-[78px]' ,
        cell: (row) => {
            const client_id = row.getValue() as string
            return h('p', { class: 'w-[224px] truncate' }, client_id)
        },
    },
    {
        header: 'ID fenlab',
        accessorKey: 'fenlab_id',        
    },
    {
        header: () => 'Referencia catastral',
        accessorKey: 'cadastral_reference',        
    },
    {
        header: 'Precio mínimo',
        accessorKey: 'min_price',
    },
    {
        header: 'Valor de referencia',
        accessorKey: 'reference_value',
    },
    {
        header: 'Modalidad de transacción',
        accessorKey: 'transaction_modality',
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