import { h } from 'vue'
import type { ColumnDef } from '@tanstack/vue-table'
import { PostData, type PendingNotary } from '@/Pages/MyPublications/types'
import { Badge, badgeMap, type BadgeMode } from '@/Components/ui/badge'
import { PostAction } from '../PostAction'
import { RecordType, recordTypeLabels } from '@/constants/recordTypes'

export const columns: ColumnDef<PendingNotary>[] = [
    {
        header: 'NOMBRE PROYECTO',
        accessorKey: 'name',
        cell: (row) => {
            const name = row.getValue() as string
            return h('p', { class: 'font-bold' }, name)
        },
    },
    {
        header: 'ID FENLAB',
        accessorKey: 'fenlabId',
    },
    {
        header: 'MODALIDAD',
        accessorKey: 'recordType',
        cell: (row) => {
            const type = row.getValue() as RecordType
            return h('p', { class: 'text-grey' }, recordTypeLabels[type] || type)
        },
    },
    {
        header: 'NOTARIA',
        accessorKey: 'notary',
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
        header: 'ID COMPAÑÍA',
        accessorKey: 'companyId',
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
