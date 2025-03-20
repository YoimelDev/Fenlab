import { h } from 'vue'
import type { ColumnDef } from '@tanstack/vue-table'
import type { PendingApproval, PostData } from '@/Pages/MyPublications/types'
import { PostAction } from '../PostAction'
import { formatCurrency } from '@/lib/utils'
import { Badge, badgeMap, type BadgeMode } from '@/Components/ui/badge'
import { usePage } from '@inertiajs/vue3'
import { PageProps } from '@/types'

const page = usePage<PageProps>()
const isAdmin = page.props?.auth?.salesforceUser?.rols === 'Admin'

const baseColumns: ColumnDef<PendingApproval>[] = [
    {
        header: 'ID FENCIA',
        accessorKey: 'fenlabId',
    },
    {
        header: 'NOMBRE PROYECTO',
        accessorKey: 'name',
        cell: (row) => h('div', { class: 'font-bold' }, row.getValue() as string),
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
        header: 'Ofertante',
        accessorKey: 'offerName',
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
        header: 'ESTADO',
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

if (isAdmin) {
    baseColumns.splice(1, 0, {
        header: 'EMPRESA',
        accessorKey: 'titular',
    })
}

export const columns = baseColumns
