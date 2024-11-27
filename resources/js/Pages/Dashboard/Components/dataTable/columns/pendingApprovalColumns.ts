
import { h } from 'vue'
import type { ColumnDef } from '@tanstack/vue-table'
import { Badge, badgeMap, type BadgeMode } from '@/Components/ui/badge'

export const pendingApprovalColumns: ColumnDef<any>[] = [
    {
        header: () => h('div', { class: 'w-[78px]' }, 'MODALIDAD'),
        accessorKey: 'mode',
        cell: (row) => {
            const mode = row.getValue() as BadgeMode
            return h('div', { class: 'font-medium' },
                h(Badge, { variant: badgeMap[mode] }, mode),
            )
        },
    },
    {
        header: 'NOMBRE PROYECTO',
        accessorKey: 'project',
    },
    {
        header: 'ID FENLAB',
        accessorKey: 'client_id',
    },
    {
        header: () => h('div', { class: 'text-right' }, 'FECHA'),
        accessorKey: 'date',
        cell: (row) => h('div', { class: 'text-grey text-right' }, row.getValue() as string),
    },
]