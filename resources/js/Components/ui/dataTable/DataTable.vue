<script setup lang="ts" generic="TData, TValue">
import { ref } from 'vue'
import type { ColumnDef } from '@tanstack/vue-table'
import {
    FlexRender,
    getCoreRowModel,
    getPaginationRowModel,
    ColumnFiltersState,
    getFilteredRowModel,
    SortingState,
    useVueTable,
} from '@tanstack/vue-table'

import { valueUpdater } from '@/lib/utils'

import {
    Input,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/Components/ui'

import {
    Pagination,
    PaginationEllipsis,
    PaginationList,
    PaginationListItem,
    PaginationNext,
    PaginationPrev,
} from '@/Components/ui/pagination'

import {
    Button,
} from '@/Components/ui/button'

const props = defineProps<{
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  columnFilter?: string
}>()

const sorting = ref<SortingState>([])
const columnFilters = ref<ColumnFiltersState>([])

const table = useVueTable({
    get data() { return props.data },
    get columns() { return props.columns },
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onColumnFiltersChange: updaterOrValue => valueUpdater(updaterOrValue, columnFilters),
    getFilteredRowModel: getFilteredRowModel(),
    initialState: {
        pagination: {
            pageSize: 10,
        },
    },
    state: {
        get sorting() { return sorting.value },
        get columnFilters() { return columnFilters.value },
    },
})
</script>

<template>
    <Input
        v-if="columnFilter"
        id="name"
        type="text"
        placeholder="Buscar por ID"
        class="mt-4 max-w-52"
        :model-value="table.getColumn(`${columnFilter}`)?.getFilterValue() as string"
        @update:model-value="table.getColumn(`${columnFilter}`)?.setFilterValue($event)"
    />

    <div 
        class="w-full h-fit mt-10 py-8 px-4 bg-white rounded-sm"
        :class="{ 'mt-4': columnFilter }"
    >
        <Table>
            <TableHeader>
                <TableRow
                    v-for="headerGroup in table.getHeaderGroups()"
                    :key="headerGroup.id"
                >
                    <TableHead
                        v-for="header in headerGroup.headers"
                        :key="header.id"
                        :class="header.column.columnDef.meta"
                    >
                        <FlexRender
                            v-if="!header.isPlaceholder"
                            :render="header.column.columnDef.header"
                            :props="header.getContext()"
                        />
                    </TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                <template v-if="table.getRowModel().rows?.length">
                    <TableRow
                        v-for="row in table.getRowModel().rows"
                        :key="row.id"
                        :data-state="row.getIsSelected() ? 'selected' : undefined"
                    >
                        <TableCell
                            v-for="cell in row.getVisibleCells()"
                            :key="cell.id"
                        >
                            <FlexRender
                                :render="cell.column.columnDef.cell"
                                :props="cell.getContext()"
                            />
                        </TableCell>
                    </TableRow>
                </template>
                <template v-else>
                    <TableRow>
                        <TableCell
                            :colspan="columns.length"
                            class="h-24 text-center"
                        >
                            No results.
                        </TableCell>
                    </TableRow>
                </template>
            </TableBody>
        </Table>
    </div>

    <Pagination
        v-slot="{ page }"
        :total="table.getPageCount() * 10"
        :sibling-count="1"
        show-edges
        :default-page="table.getState().pagination.pageIndex + 1"
        @update:page="(newPage) => table.setPageIndex(newPage - 1)"
    >
        <PaginationList
            v-slot="{ items }"
            class="max-w-[1104px] w-full flex justify-center items-center gap-1 mt-8"
        >
            <PaginationPrev
                @click="table.previousPage()"
                :disabled="!table.getCanPreviousPage()"
            />
    
            <template v-for="(item, index) in items">
                <PaginationListItem
                    v-if="item.type === 'page'"
                    :key="index"
                    :value="item.value"
                    as-child
                >
                    <Button
                        class="w-10 h-10 p-0 text-blue text-sm rounded-full"
                        :variant="item.value === page ? 'pagination' : 'ghost'"
                        @click="table.setPageIndex(item.value - 1)"
                    >
                        {{ item.value }}
                    </Button>
                </PaginationListItem>
                <PaginationEllipsis
                    v-else
                    :key="item.type"
                    :index="index"
                />
            </template>
    
            <PaginationNext
                @click="table.nextPage()"
                :disabled="!table.getCanNextPage()"
            />
        </PaginationList>
    </Pagination>
</template>