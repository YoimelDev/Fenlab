
<script setup lang="ts">
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue'
import { Head } from '@inertiajs/vue3'

import {
    DataTable,
} from '@/Components/ui'

import { AssessmentIcon } from '@/Components/icons'

import { columns } from './Components/publishedTable'
import { Published, Auction } from './types'
import { ref } from 'vue'

const props = defineProps<{
    published: Published
}>()

const published = ref<Auction[]>(props.published?.Auctions ?? [])

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

                Mis Publicaciones | Publicadas ( {{ published?.length }} )
            </h1>
        </header>

        <DataTable
            :columns="columns"
            :data="published"
            :column-filter="['id', 'companyName']"
        />
    </AuthenticatedLayout>
</template>
