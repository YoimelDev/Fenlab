<script setup lang="ts">
import { Head } from '@inertiajs/vue3'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue'
import { Kpi } from '@/Components/ui/kpi'
import { Button } from '@/Components/ui/button'

import { AssessmentIcon } from '@/Components/icons'
import { PlusIcon } from '@radix-icons/vue'

import { columns } from './Components/dataTable'
import { DataTable } from '@/Components/ui/dataTable'

import { projects } from '@/data'
</script>

<template>
    <Head title="Mis Análisis" />

    <AuthenticatedLayout>
        <header class="flex justify-between items-center mb-10">
            <h1 class="flex items-center gap-4 text-xl font-bold leading-5">
                <AssessmentIcon
                    variant="black"
                    class="text-black w-8 h-8"
                />

                Mis Análisis
            </h1>

            <Button 
                class="gap-1"
                variant="green"
                size="sm"
            >
                <PlusIcon
                    class="w-4 h-4"
                />

                Nuevo Análisis
            </Button>
        </header>

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

     
        <DataTable
            :columns="columns"
            :data="projects"
        />
    </AuthenticatedLayout>
</template>
