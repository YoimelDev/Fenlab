import { h } from 'vue'
import type { ColumnDef } from '@tanstack/vue-table'
import type { PendingApproval } from '@/Pages/MyPublications/types'
import { Badge } from '@/Components/ui/badge'

export const columns: ColumnDef<PendingApproval>[] = [
    {
        header: 'NOMBRE PROYECTO',
        accessorKey: 'name',
        cell: (row) => h('div', { class: 'font-bold' }, row.getValue() as string),
    },
    {
        header: 'EMPRESA',
        accessorKey: 'companyName',
    },
    {
        header: 'ETAPA',
        accessorKey: 'stage',
        cell: (row) => {
            const stage = row.getValue() as string
            return h('div', { class: 'font-medium' },
                h(Badge, { variant: 'secondary' }, stage),
            )
        },
    },
    {
        header: 'ID EMPRESA',
        accessorKey: 'companyId',
    },
]