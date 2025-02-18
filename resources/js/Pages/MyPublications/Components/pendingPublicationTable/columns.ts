import { h } from 'vue'
import type { ColumnDef } from '@tanstack/vue-table'
import { type PublishableProject } from '@/Pages/MyPublications/types'
import { Badge, badgeMap, type BadgeMode } from '@/Components/ui/badge'
import { PublicationActions } from '../PublicationActions'
import { formatCurrency } from '@/lib/utils'

export const columns: ColumnDef<PublishableProject>[] = [
    {
        header: 'ID CLIENTE',
        accessorKey: 'idCliente',
    },
    {
        header: 'ID FENCIA',
        accessorKey: 'idFencia',
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
        header: 'REF. CATASTRAL',
        accessorKey: 'model.referenciaCatastral',
    },
    {
        header: 'PRECIO MÍNIMO',
        accessorKey: 'model.npl.credito.precioMinimo',
        cell: (row) => {
            const price = row.getValue() as number

            if (price) {
                return h('p', { class: 'font-medium' }, formatCurrency(price))
            }
            return h('p', { class: 'font-medium' }, '-')
        },
    },
    {
        header: 'VALOR DE REFERENCIA',
        accessorKey: 'model.npl.precioReferencia',
        cell: (row) => {
            const price = row.getValue() as number

            if (price) {
                return h('p', { class: 'font-medium' }, formatCurrency(price))
            }
            return h('p', { class: 'font-medium' }, '-')
        },
    },
    {
        id: 'actions',
        header: () => '',
        accessorKey: 'id',
        cell: (row) => {
            return h(PublicationActions, {
                publication: row.row.original,
            })
        },
    },
]
