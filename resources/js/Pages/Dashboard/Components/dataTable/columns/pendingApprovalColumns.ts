import { h } from 'vue'
import type { ColumnDef } from '@tanstack/vue-table'
import type { PendingApproval } from '@/Pages/MyPublications/types'
import { Badge } from '@/Components/ui/badge'

export const pendingApprovalColumns: ColumnDef<PendingApproval>[] = [
    {
        header: 'NOMBRE PROYECTO',
        accessorKey: 'name',
        meta: '!w-[200px]',
        cell: (row) => h('div', { class: 'w-[160px] truncate font-medium' }, row.getValue() as string),
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
]