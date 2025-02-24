import { h } from 'vue'
import type { ColumnDef } from '@tanstack/vue-table'
import type { PendingApproval, PostData } from '@/Pages/MyPublications/types'
import { Badge } from '@/Components/ui/badge'
import { PostAction } from '../PostAction'
import { formatCurrency } from '@/lib/utils'

export const columns: ColumnDef<PendingApproval>[] = [
    {
        header: 'NOMBRE PROYECTO',
        accessorKey: 'name',
        cell: (row) => h('div', { class: 'font-bold' }, row.getValue() as string),
    },
    {
        header: 'ID FENLAB',
        accessorKey: 'fenlabId',
    },
    {
        header: 'PRECIO MINIMO',
        accessorKey: 'minimumPrice',
        cell: (row) => {
            const price = row.getValue() as number

            if (price) {
                return h('p', { class: 'font-medium' }, formatCurrency(price))
            }
            return h('p', { class: 'font-medium' }, '-')
        },
    },
    {
        header: 'Mejor oferta',
        accessorKey: 'maximumBid',
        cell: (row) => {
            const price = row.getValue() as number

            if (price) {
                return h('p', { class: 'font-medium' }, formatCurrency(price))
            }
            return h('p', { class: 'font-medium' }, '-')
        },
    },
    {
        header: 'Depósito',
        accessorKey: 'deposit',
    },
    {
        header: 'Ofertante',
        accessorKey: 'offerName',
    },
    {
        header: 'PRECIO DE REFERENCIA',
        accessorKey: 'referencePrice',
        cell: (row) => {
            const price = row.getValue() as number

            if (price) {
                return h('p', { class: 'font-medium' }, formatCurrency(price))
            }
            return h('p', { class: 'font-medium' }, '-')
        },
    },
    {
        header: 'EMPRESA',
        accessorKey: 'companyName',
    },
    {
        header: 'ETAPA',
        accessorKey: 'PBCstatus',
        cell: (row) => {
            const stage = row.getValue() as string
            return h('div', { class: 'font-medium' },
                h(Badge, { variant: 'secondary' }, stage),
            )
        },
    },
    {
        header: 'ID EMPRESA',
        accessorKey: 'companyId',
    },
    {
        id: 'actions',
        header: () => '',
        accessorKey: 'id',
        cell: (row) => {
            const postData: PostData = {
                postType: 'pendingApproval',
                data: row.row.original,
                endpoint: '/salesforce/approve-auction',
            }

            return h(PostAction, {
                postData,
            })
        },
    },
]
