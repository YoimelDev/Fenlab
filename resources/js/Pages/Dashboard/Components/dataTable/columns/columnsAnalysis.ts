import { h } from 'vue'
import type { ColumnDef } from '@tanstack/vue-table'
import { type Project } from '@/types/fenlab'
import { Badge, badgeMap, type BadgeMode } from '@/Components/ui/badge'

export const columnsAnalysis: ColumnDef<Project>[] = [
    {
        header: 'ID FENLAB',
        accessorKey: 'id',
        cell: (row) => {
            const id = row.getValue() as string
            return h('p', { class: 'w-[78px] truncate' }, id)
        },
    },
    {
        header: () => h('div', { class: 'w-[78px]' }, 'MODALIDAD'),
        accessorKey: 'modelType',
        meta: '!w-[78px]',
        cell: (row) => {
            const modelType = row.getValue() as BadgeMode
            return h(
                'div',
                { class: 'font-medium' },
                h(Badge, { variant: badgeMap[modelType] }, modelType),
            )
        },
    },
    {
        header: 'NOMBRE PROYECTO',
        accessorKey: 'name',
    },
    {
        header: () => h('div', { class: 'w-[78px]' }, 'ID FENLAB'),
        accessorKey: 'id',
        meta: '!w-[78px]',
        cell: (row) => {
            const id = row.getValue() as string
            return h('p', { class: 'w-[78px] truncate' }, id)
        },
    },
    {
        header: 'ESTADO',
        accessorKey: 'status',
        cell: (row) => {
            const status = row.getValue() as BadgeMode
            return h(
                'div',
                { class: 'font-medium' },
                h(Badge, { variant: badgeMap[status] }, status),
            )
        },
    },
]
