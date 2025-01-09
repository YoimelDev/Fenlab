<!-- eslint-disable @typescript-eslint/no-explicit-any -->
<script setup lang="ts">
import { Head } from '@inertiajs/vue3'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue'
import { TableSection } from './Components/dataTable'
import { KpiData } from '@/types/fenlab'
import KpisSection from '@/Components/common/KpisSection.vue'

defineProps<{
    sections: Record<string, any[]>
    kpiData: KpiData
}>()
</script>

<template>
    <Head title="Dashboard" />

    <AuthenticatedLayout>
        <KpisSection />

        <TableSection :sections="sections" />
    </AuthenticatedLayout>
</template>
