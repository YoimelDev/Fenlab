<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { Head } from '@inertiajs/vue3'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue'

import { 
    Kpi, 
    DataTable,
} from '@/Components/ui'

import { AssessmentIcon } from '@/Components/icons'
import { fenlabApi } from '@/api/fenlab.api'
import { columns } from './Components/dataTable'
import { Projects, Project } from '@/types/fenlab'
import { kpiMyAnalysis } from '@/data'
import { NewAnalysis } from './Components/newAnalysis'

const analysis = ref<Project[]>([])

const getAnalysis = async () => {
    const { data: response } = await fenlabApi.post<Projects>('/', {
        method: 'get',
        path: 'projects',
        body: {
            perPage: 100,
        },
    })

    analysis.value = response.data
}

onMounted(() => {
    getAnalysis()
})

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
                v-for="(kpi, index) in kpiMyAnalysis"
                :key="kpi.title"
                :data="kpi"
                :variant="index === 0 ? 'default' : 'primary'"
                :is-positive="kpi.isPositive"
            />
        </div>
     
        <DataTable
            :columns="columns"
            :data="analysis"
        />
    </AuthenticatedLayout>
</template>
