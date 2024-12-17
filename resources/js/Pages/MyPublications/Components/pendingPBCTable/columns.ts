import { h } from 'vue'
import type { ColumnDef } from '@tanstack/vue-table'
import { type PendingPBC } from '@/Pages/MyPublications/types'
import { Badge, badgeMap, type BadgeMode } from '@/Components/ui/badge'

export const columns: ColumnDef<PendingPBC>[] = [
    {
        header: 'NOMBRE PROYECTO',
        accessorKey: 'name',
        cell: (row) => {
            const name = row.getValue() as string
            return h('p', { class: 'font-bold' }, name)
        },
    },
    {
        header: 'TIPO PBC',
        accessorKey: 'PBCtype',
    },
    {
        header: 'TIPO DE REGISTRO',
        accessorKey: 'recordType',
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
        header: 'FECHA APROBACIÓN PBC',
        accessorKey: 'approvedPBCDate',
        cell: (row) => {
            const date = row.getValue()
            return date ? date : '-'
        },
    },
    {
        header: 'FECHA APROBACIÓN PBC2',
        accessorKey: 'approvedPBC2Date',
        cell: (row) => {
            const date = row.getValue()
            return date ? date : '-'
        },
    },
]