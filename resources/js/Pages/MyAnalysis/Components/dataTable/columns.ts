import { h } from 'vue'
import { Link } from '@inertiajs/vue3'
import type { ColumnDef } from '@tanstack/vue-table'
import { type Project } from '@/types/fenlab'
import { Badge, type BadgeVariants } from '@/Components/ui/badge'
import { useDateFormat } from '@vueuse/core'

type BadgeMode = 'REO' | 'NPL' | 'PL/SPL' | 'Pendiente' | 'En curso' | 'Completado';

const badgeMap: Record<BadgeMode, BadgeVariants['variant']> = {
    REO: 'default',
    NPL: 'primary',
    'PL/SPL': 'secondary',
    Pendiente: 'pending',
    'En curso': 'progress',
    Completado: 'success',
}

export const columns: ColumnDef<Project>[] = [
    {
        header: () => h('div', { class: 'w-[78px]' }, 'MODALIDAD'),
        accessorKey: 'modelType',
        meta: '!w-[78px]' ,
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
        cell: (row) => {
            const name = row.getValue() as string
            return h(Link, { href: '/my-analysis/1', class: 'font-medium' }, name)
        },
        
    },
    {
        header: () => h('div', { class: 'w-[500px]' }, 'DESCRIPCIÓN'),
        accessorKey: 'description',
        meta: '!w-[500px]',
        cell: (row) => {
            const description = row.getValue() as string
            return h('p', { class: 'w-[434px] truncate' }, description)
        },
        
    },
    {
        header: 'ACTIVOS',
        accessorKey: '_count.projectAssets',
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
    {
        header: () => h('div', { class: 'text-right' }, 'FECHA'),
        accessorKey: 'createdAt',
        cell: (row) => {
            const date = row.getValue() as string
            const formatted = useDateFormat(date, 'DD/MM/YYYY')
            return h('p', { class: 'text-grey text-right' }, formatted.value)
        },
    },
]