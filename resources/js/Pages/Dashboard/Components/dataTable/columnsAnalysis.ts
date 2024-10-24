import { h } from 'vue'
import type { ColumnDef } from '@tanstack/vue-table'
import { type Project } from '@/types/fenlab'
import { Badge, type BadgeVariants } from '@/Components/ui/badge'

type BadgeMode = 'REO' | 'NPL' | 'PL/SPL' | 'Pendiente' | 'En curso' | 'Completado';

const badgeMap: Record<BadgeMode, BadgeVariants['variant']> = {
    REO: 'default',
    NPL: 'primary',
    'PL/SPL': 'secondary',
    Pendiente: 'pending',
    'En curso': 'progress',
    Completado: 'success',
}

export const columnsAnalysis: ColumnDef<Project>[] = [
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