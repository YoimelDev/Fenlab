import { h } from 'vue'
import type { ColumnDef } from '@tanstack/vue-table'
import { Badge, badgeMap, type BadgeMode } from '@/Components/ui/badge'
import { Auction } from '@/Pages/MyPublications/types'
import { RecordType, recordTypeLabels } from '@/constants/recordTypes'
import { formatCurrency } from '@/lib/utils'
import { usePage } from '@inertiajs/vue3'
import { PageProps } from '@/types'

const page = usePage<PageProps>()
const isAdmin = page.props?.auth?.salesforceUser?.rols === 'Admin'

const baseColumns: ColumnDef<Auction>[] = [
    {
        header: 'ID FENCIA',
        accessorKey: 'id',
    },
    {
        header: 'DETALLE',
        accessorKey: 'name',
    },
    {
        header: 'PRECIO MÍNIMO',
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
        header: 'Precio de referencia',
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
        header: 'Ofertas ',
        accessorKey: 'numberOfBids',
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
        header: 'TIPO',
        accessorKey: 'recordType',
        cell: (row) => {
            const type = row.getValue() as RecordType
            return h('p', { class: 'text-grey' }, recordTypeLabels[type] || type)
        },
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
]

if (isAdmin) {
    baseColumns.splice(1, 0, {
        header: 'EMPRESA',
        accessorKey: 'companyName',
    })
}

export const columns = baseColumns
