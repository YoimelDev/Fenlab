<!-- eslint-disable @typescript-eslint/no-explicit-any -->
<script setup lang="ts">
import { Head } from '@inertiajs/vue3'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue'
import { Kpi } from '@/Components/ui/kpi'
import { TableSection } from './Components/dataTable'
import { KpiData } from '@/types/fenlab'

defineProps<{
    sections: Record<string, any[]>
    kpiData: KpiData
}>()
</script>

<template>
    <Head title="Dashboard" />

    <AuthenticatedLayout>
        <div class="flex flex-wrap gap-10">
            <Kpi
                v-if="Object.keys(kpiData.analysis).length"
                variant="default"
                :is-positive="true"
                title="Análisis hechos mes actual vs mes anterior."
                :value="kpiData.analysis.currentMonth"
                :percentage="kpiData.analysis.percentage"
            />

            <Kpi
                v-if="Object.keys(kpiData.published).length"
                variant="primary"
                :is-positive="true"
                title="Operaciones publicadas mes actual vs mes anterior."
                :value="kpiData.published.currentMonth"
                :percentage="kpiData.published.variation"
            />

            <Kpi
                v-if="Object.keys(kpiData.approved).length"
                variant="primary"
                :is-positive="true"
                title="Operaciones aprobadas mes actual vs mes anterior."
                :value="kpiData.approved.currentMonth"
                :percentage="kpiData.approved.variation"
            />

            <Kpi
                v-if="Object.keys(kpiData.signed).length"
                variant="primary"
                :is-positive="true"
                title="Operaciones firmadas mes actual vs mes anterior."
                :value="kpiData.signed.currentMonth"
                :percentage="kpiData.signed.variation"
            />
        </div>

        <TableSection :sections="sections" />
    </AuthenticatedLayout>
</template>
