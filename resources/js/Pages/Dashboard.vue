<script setup lang="ts">
import { Head } from '@inertiajs/vue3'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue'
import { Kpi } from '@/Components/ui/kpi'
import TableSection from '@/Components/TableSection.vue'
import { kpiOverview } from '@/data'
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

        <TableSection />
    </AuthenticatedLayout>
</template>
