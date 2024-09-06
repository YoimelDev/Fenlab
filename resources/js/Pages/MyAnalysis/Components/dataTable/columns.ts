import { h } from 'vue'
import { Link } from '@inertiajs/vue3'
import type { ColumnDef } from '@tanstack/vue-table'
import { type Analysis } from '@/Pages/MyAnalysis/types'
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

export const columns: ColumnDef<Analysis>[] = [
    {
        header: () => h('div', { class: 'w-[78px]' }, 'MODALIDAD'),
        accessorKey: 'mode',
        meta: '!w-[78px]' ,
        cell: (row) => {
            const mode = row.getValue() as BadgeMode
            return h(
                'div',
                { class: 'font-medium' },
                h(Badge, { variant: badgeMap[mode] }, mode),
            )
        },
    },
    {
        header: 'NOMBRE PROYECTO',
        accessorKey: 'project',
        cell: (row) => {
            const project = row.getValue() as string
            return h(Link, { href: '/my-analysis/1', class: 'font-medium' }, project)
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
        accessorKey: 'assets',
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
        accessorKey: 'date',
        cell: (row) => {
            const date = row.getValue() as string
            return h('p', { class: 'text-grey text-right' }, date)
        },
    },
]