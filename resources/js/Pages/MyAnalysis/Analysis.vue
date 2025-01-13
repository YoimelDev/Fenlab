<script setup lang="ts">
import { Head } from '@inertiajs/vue3'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue'

import { 
    Kpi, 
    DataTable,
} from '@/Components/ui'

import { AssessmentIcon } from '@/Components/icons'
import { columns } from './Components/dataTable'
import { Project, KPI } from '@/types/fenlab'
import { NewAnalysis } from './Components/newAnalysis'

defineProps<{ 
    analysis: Project[]
    projectsKPI: KPI
    assetsKPI: KPI
 }>()

</script>

<template>
    <Head title="Mis Análisis" />

    <AuthenticatedLayout>
        <header class="flex flex-col sm:flex-row justify-between items-center gap-4 mb-10">
            <h1 class="flex items-center gap-4 text-xl font-bold leading-5">
                <AssessmentIcon
                    variant="black"
                    class="text-black w-8 h-8"
                />

                Mis Análisis
            </h1>

            <NewAnalysis />
        </header>

        <div class="flex flex-wrap gap-10">
            <Kpi
                v-if="projectsKPI && Object.keys(projectsKPI ?? {}).length"
                variant="default"
                :is-positive="true"
                title="Volumen de análisis hechos mes actual vs mes anterior."
                :value="projectsKPI?.currentMonth"
                :percentage="projectsKPI?.percentage"
            />

            <Kpi
                v-if="assetsKPI && Object.keys(assetsKPI ?? {}).length"
                variant="primary"
                :is-positive="true"
                title="Volumen activos modelados mes actual vs mes anterior."
                :value="assetsKPI?.currentMonth"
                :percentage="assetsKPI?.percentage"
            />
        </div>
     
        <DataTable
            :key="analysis.length"
            :columns="columns"
            :data="analysis"
        />
    </AuthenticatedLayout>
</template>
