
<script setup lang="ts">
import { Head } from '@inertiajs/vue3'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue'

import { 
    DataTable,
} from '@/Components/ui'

import { AssessmentIcon } from '@/Components/icons'

import { columns } from './Components/publishedTable'
import KpisSection from '@/Components/common/KpisSection.vue'

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

                Mis Publicaciones | Publicadas
            </h1>
        </header>

        <KpisSection />
     
        <DataTable
            :columns="columns"
            :data="[]"
        />
    </AuthenticatedLayout>
</template>
