import { h } from 'vue'
import type { ColumnDef } from '@tanstack/vue-table'
import type { PendingApproval, PostData } from '@/Pages/MyPublications/types'
import { Badge } from '@/Components/ui/badge'
import { PostAction } from '../PostAction'

export const columns: ColumnDef<PendingApproval>[] = [
    {
        header: 'NOMBRE PROYECTO',
        accessorKey: 'name',
        cell: (row) => h('div', { class: 'font-bold' }, row.getValue() as string),
    },
    {
        header: 'PRECIO MINIMO',
        accessorKey: 'minimumPrice',
    },
    {
        header: 'PRECIO DE REFERENCIA',
        accessorKey: 'referencePrice',
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
