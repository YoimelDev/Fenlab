import { h } from 'vue'
import type { ColumnDef } from '@tanstack/vue-table'
import { PostData, type PendingNotary } from '@/Pages/MyPublications/types'
import { Badge, badgeMap, type BadgeMode } from '@/Components/ui/badge'
import { PostAction } from '../PostAction'
import { formatCurrency } from '@/lib/utils'

export const columns: ColumnDef<PendingNotary>[] = [
    {
        header: 'ID FENCIA',
        accessorKey: 'fenlabId',
    },
    {
        header: 'NOMBRE PROYECTO',
        accessorKey: 'name',
        cell: (row) => {
            const name = row.getValue() as string
            return h('p', { class: 'font-bold' }, name)
        },
    },
    {
        header: 'PRECIO',
        accessorKey: 'offerValue',
        cell: (row) => {
            const price = row.getValue() as number

            if (price) {
                return h('p', { class: 'font-medium' }, formatCurrency(price))
            }
            return h('p', { class: 'font-medium' }, '-')
        },
    },
    {
        header: 'NOTARIA',
        accessorKey: 'notary',
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
        header: 'Fecha firma',
        accessorKey: 'scheduledDateNotary',
    },
    {
        id: 'actions',
        header: () => '',
        accessorKey: 'id',
        cell: (row) => {
            const postData: PostData = {
                postType: 'pendingNotary',
                data: row.row.original,
                endpoint: '/salesforce/accept-notary',
            }

            return h(PostAction, {
                postData,
            })
        },
    },
]
