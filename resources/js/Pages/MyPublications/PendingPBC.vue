
<script setup lang="ts">
import { AssessmentIcon } from '@/Components/icons'
import { DataTable } from '@/Components/ui'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue'
import { Head } from '@inertiajs/vue3'
import { columns } from './Components/pendingPBCTable'
import { PendingPBC } from './types'

defineProps<{
    projects: PendingPBC[]
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
                Mis Publicaciones | Aprobación PBC
            </h1>
        </header>
     
        <DataTable
            :columns="columns"
            :data="projects"
        />
    </AuthenticatedLayout>
</template>