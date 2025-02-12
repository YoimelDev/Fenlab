import { h } from 'vue'
import type { ColumnDef } from '@tanstack/vue-table'
import { PostData, type PendingPBC } from '@/Pages/MyPublications/types'
import { Badge, badgeMap, type BadgeMode } from '@/Components/ui/badge'
import { PostAction } from '../PostAction'
import { RecordType, recordTypeLabels } from '@/constants/recordTypes'

export const columns: ColumnDef<PendingPBC>[] = [
    {
        header: 'NOMBRE PROYECTO',
        accessorKey: 'name',
        cell: (row) => {
            const name = row.getValue() as string
            return h('p', { class: 'font-bold' }, name)
        },
    },
    {
        header: 'TIPO PBC',
        accessorKey: 'PBCtype',
    },
    {
        header: 'MODALIDAD',
        accessorKey: 'auctionRecordType',
        cell: (row) => {
            const type = row.getValue() as RecordType
            return h('p', { class: 'text-grey' }, recordTypeLabels[type] || type)
        },
    },
    {
        header: 'ETAPA',
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
        header: 'FECHA APROBACIÓN PBC',
        accessorKey: 'approvedPBCDate',
        cell: (row) => {
            const date = row.getValue()
            return date ? date : '-'
        },
    },
    {
        header: 'FECHA APROBACIÓN PBC2',
        accessorKey: 'approvedPBC2Date',
        cell: (row) => {
            const date = row.getValue()
            return date ? date : '-'
        },
    },
    {
        id: 'actions',
        header: () => '',
        accessorKey: 'id',
        cell: (row) => {
            const postData: PostData = {
                postType: 'pendingPBC',
                data: row.row.original,
                endpoint: '/salesforce/approve-pbc',
            }

            return h(PostAction, {
                postData,
            })
        },
    },
]
