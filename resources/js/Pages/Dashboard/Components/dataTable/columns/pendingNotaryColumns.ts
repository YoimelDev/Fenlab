import { h } from 'vue'
import type { ColumnDef } from '@tanstack/vue-table'
import type { PendingNotary } from '@/Pages/MyPublications/types'
import { Badge } from '@/Components/ui/badge'

export const pendingNotaryColumns: ColumnDef<PendingNotary>[] = [
    {
        header: 'ID FENCIA',
        accessorKey: 'fenlabId',
        cell: (row) => {
            const id = row.getValue() as string
            return h('p', { class: 'w-[78px] truncate' }, id)
        },
    },
    {
        header: 'FECHA FIRMA',
        accessorKey: 'scheduledDateNotary',
    },
    {
        header: 'ESTADO',
        accessorKey: 'stage',
        cell: (row) => {
            const stage = row.getValue() as string
            return h('div', { class: 'font-medium' },
                h(Badge, { variant: 'secondary' }, stage),
            )
        },
    },
]
