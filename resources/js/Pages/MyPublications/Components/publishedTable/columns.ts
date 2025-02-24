import { h } from 'vue'
import type { ColumnDef } from '@tanstack/vue-table'
import { Badge, badgeMap, type BadgeMode } from '@/Components/ui/badge'
import { useDateFormat } from '@vueuse/core'
import { Auction } from '@/Pages/MyPublications/types'
import { RecordType, recordTypeLabels } from '@/constants/recordTypes'
import { formatCurrency } from '@/lib/utils'

export const columns: ColumnDef<Auction>[] = [
    {
        header: 'ID',
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
        header: () => h('div', { class: 'w-[78px]' }, 'TIPO'),
        accessorKey: 'recordType',
        cell: (row) => {
            const type = row.getValue() as RecordType
            return h('p', { class: 'text-grey' }, recordTypeLabels[type] || type)
        },
    },
    {
        header: 'PUBLICACIÓN',
        accessorKey: 'startDate',
        cell: (row) => {
            const date = row.getValue() as string
            const formatted = useDateFormat(date, 'DD/MM/YYYY')
            return h('p', { class: 'text-grey' }, formatted.value)
        },
    },
    {
        header: 'FINALIZA',
        accessorKey: 'endDate',
        cell: (row) => {
            const date = row.getValue() as string
            const formatted = useDateFormat(date, 'DD/MM/YYYY')
            return h('p', { class: 'text-grey' }, formatted.value)
        },
    },
]
