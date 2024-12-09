<script setup lang="ts">
import { Head } from '@inertiajs/vue3'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue'
import { Kpi } from '@/Components/ui/kpi'
import { TableSection } from './Components/dataTable'
import { kpiOverview } from '@/data'

defineProps<{
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    sections: Record<string, any[]>
}>()
</script>

<template>
    <Head title="Dashboard" />

    <AuthenticatedLayout>
        <div class="flex flex-wrap gap-10">
            <Kpi
                v-for="(kpi, index) in kpiOverview"
                :key="kpi.title"
                :data="kpi"
                :variant="index === 0 ? 'default' : 'primary'"
                :is-positive="kpi.isPositive"
            />
        </div>

        <TableSection :sections="sections" />
    </AuthenticatedLayout>
</template>
