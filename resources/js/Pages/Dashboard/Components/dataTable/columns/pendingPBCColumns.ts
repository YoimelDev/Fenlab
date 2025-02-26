import { h } from 'vue'
import type { ColumnDef } from '@tanstack/vue-table'
import type { PendingPBC } from '@/Pages/MyPublications/types'
import { Badge, badgeMap, type BadgeMode } from '@/Components/ui/badge'


export const pendingPBCColumns: ColumnDef<PendingPBC>[] = [
    {
        header: 'ID FENCIA',
        accessorKey: 'fenlabId',
        cell: (row) => {
            const id = row.getValue() as string
            return h('p', { class: 'w-[78px] truncate' }, id)
        },
    },
    {
        header: 'TIPO PBC',
        accessorKey: 'PBCtype',
    },
    {
        header: 'MODALIDAD',
        accessorKey: 'stage',
        cell: (row) => {
            const modelType = row.getValue() as BadgeMode
            return h(
                'div',
                { class: 'font-medium' },
                h(Badge, { variant: badgeMap[modelType] }, modelType),
            )
        },
    },
]
