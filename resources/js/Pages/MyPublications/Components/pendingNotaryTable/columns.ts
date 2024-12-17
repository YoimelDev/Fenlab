import { h } from 'vue'
import type { ColumnDef } from '@tanstack/vue-table'
import { type PendingNotary } from '@/Pages/MyPublications/types'
import { Badge, badgeMap, type BadgeMode } from '@/Components/ui/badge'

export const columns: ColumnDef<PendingNotary>[] = [
    {
        header: 'NOMBRE PROYECTO',
        accessorKey: 'name',
        cell: (row) => {
            const name = row.getValue() as string
            return h('p', { class: 'font-bold' }, name)
        },
    },
    {
        header: 'ID FENLAB',
        accessorKey: 'fenlabId',
    },
    {
        header: 'ETAPA',
        accessorKey: 'stage',
        cell: (row) => {
            const stage = row.getValue() as BadgeMode
            return h(
                'div',
                { class: 'font-medium' },
                h(Badge, { variant: badgeMap[stage] }, stage),
            )
        },
    },
    {
        header: 'ID COMPAÑÍA',
        accessorKey: 'companyId',
    },
]