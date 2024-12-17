
<script setup lang="ts">
import { Head } from '@inertiajs/vue3'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue'
import { Kpi, DataTable } from '@/Components/ui'
import { AssessmentIcon } from '@/Components/icons'
import { kpiOverview } from '@/data'
import { columns } from './Components/pendingApprovalTable'
import { PendingApproval } from './types'

defineProps<{
    projects: PendingApproval[]
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
                Mis Publicaciones | Pendientes de Aprobación
            </h1>
        </header>

        <div class="flex flex-wrap gap-10">
            <Kpi
                v-for="(kpi, index) in kpiOverview"
                :key="kpi.title"
                :data="kpi"
                :variant="index === 0 ? 'default' : 'primary'"
                :is-positive="kpi.isPositive"
            />
        </div>
     
        <DataTable
            :columns="columns"
            :data="projects"
        />
    </AuthenticatedLayout>
</template>