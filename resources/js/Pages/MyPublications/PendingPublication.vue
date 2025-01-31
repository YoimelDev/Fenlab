<script setup lang="ts">
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue'
import { Head } from '@inertiajs/vue3'
import { DataTable } from '@/Components/ui'
import { AssessmentIcon } from '@/Components/icons'
import { columns } from './Components/pendingPublicationTable'
import { type Publishable } from './types'
// import { NewPublicationDialog } from './Components/NewPublicationDialog'

defineProps<{
    projects: Publishable
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

                Mis Publicaciones | Pendientes de Publicar ( {{ projects.data.length }} )
            </h1>

            <!-- <NewPublicationDialog /> -->
        </header>
     
        <DataTable
            :columns="columns"
            :data="projects.data"
            column-filter="idCliente"
        />
    </AuthenticatedLayout>
</template>
