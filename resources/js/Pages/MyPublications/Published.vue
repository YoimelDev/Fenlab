
<script setup lang="ts">
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue'
import { Head } from '@inertiajs/vue3'

import {
    DataTable,
} from '@/Components/ui'

import { AssessmentIcon } from '@/Components/icons'

import { columns } from './Components/publishedTable'
import { Published } from './types'

defineProps<{
    published: Published
}>()

</script>

<template>
    <Head title="Mis Publicaciones" />

    <AuthenticatedLayout>
        <header class="flex flex-col sm:flex-row justify-between items-center gap-4 mb-10">
            <h1 class="flex items-center gap-4 text-xl font-bold leading-5">
                <AssessmentIcon
                    variant="black"
                    class="text-black w-8 h-8"
                />

                Mis Publicaciones | Publicadas ( {{ published.Auctions.length }})
            </h1>
        </header>
     
        <DataTable
            :columns="columns"
            :data="published.Auctions"
            column-filter="id"
        />
    </AuthenticatedLayout>
</template>
