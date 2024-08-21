<script setup lang="ts">
import { Head } from '@inertiajs/vue3'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue'
import { Kpi } from '@/Components/ui/kpi'
</script>

<template>
    <Head title="Dashboard" />

    <AuthenticatedLayout>
        <div class="flex flex-wrap gap-10">
            <Kpi
                variant="default"
                :is-positive="true"
            />

            <Kpi
                variant="primary"
                :is-positive="false"
            />

            <Kpi
                variant="primary"
                :is-positive="false"
            />

            <Kpi
                variant="primary"
                :is-positive="false"
            />
        </div>
    </AuthenticatedLayout>
</template>
