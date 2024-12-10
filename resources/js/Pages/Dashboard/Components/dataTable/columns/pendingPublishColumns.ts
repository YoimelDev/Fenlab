
import { h } from 'vue'
import type { ColumnDef } from '@tanstack/vue-table'
import { Badge, badgeMap, type BadgeMode } from '@/Components/ui/badge'
import { PublishableProject } from '@/Pages/MyPublications/types'

export const pendingPublishColumns: ColumnDef<PublishableProject>[] = [
    {
        header: 'ID CLIENTE',
        accessorKey: 'idCliente',
    },
    {
        header: () => h('div', { class: 'w-[78px]' }, 'ID FENCIA'),
        accessorKey: 'idFencia',
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
    {
        header: 'PRECIO MÍNIMO',
        accessorKey: 'model.npl.credito.precioMinimo',
    },
]