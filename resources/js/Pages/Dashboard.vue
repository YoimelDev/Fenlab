<script setup lang="ts">
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue'
import { Head } from '@inertiajs/vue3'
</script>

<template>
    <Head title="Dashboard" />

    <AuthenticatedLayout>
        <h1 class="text-6xl">
            Dashboard
        </h1>
    </AuthenticatedLayout>
</template>
