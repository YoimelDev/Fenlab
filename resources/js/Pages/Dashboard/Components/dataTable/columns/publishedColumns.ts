
import { h } from 'vue'
import type { ColumnDef } from '@tanstack/vue-table'
import { Avatar, AvatarFallback, AvatarImage } from '@/Components/ui'

export const publishedColumns: ColumnDef<any>[] = [
    {
        header: () => h('div', { class: 'w-[78px]' }),
        accessorKey: 'image',
        cell: (row) => {
            const image = row.getValue() as string
            return h(Avatar, {}, {
                default: () => [
                    h(AvatarImage, { src: image, alt: 'Client logo' }),
                    h(AvatarFallback, {}, 'FL'),
                ],
            })
        },
    },
    {
        header: 'NOMBRE PROYECTO',
        accessorKey: 'project',
    },
    {
        header: 'ID FENLAB',
        accessorKey: 'client_id',
    },
    {
        header: () => h('div', { class: 'text-right' }, 'PRECIO MÍNIMO'),
        accessorKey: 'min_price',
        cell: (row) => h('div', { class: 'text-right' }, row.getValue() as string),
    },
]