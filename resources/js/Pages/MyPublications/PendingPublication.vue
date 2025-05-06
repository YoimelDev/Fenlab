<script setup lang="ts">
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue'
import { Head, router, usePage } from '@inertiajs/vue3'
import { DataTable } from '@/Components/ui'
import { AssessmentIcon } from '@/Components/icons'
import { columns } from './Components/pendingPublicationTable'
import { type Publishable } from './types'
import { ref, computed, onMounted, watch } from 'vue'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/Components/ui/select'
import { PageProps } from '@/types'

const props = defineProps<{
    projects: Publishable
}>()

const page = usePage<PageProps>();
const isAdmin = page.props?.auth?.salesforceUser?.rols === "Admin";

// No necesitamos crear un filtro de empresas aquí ya que parece que este componente
// no tiene un campo de empresa para filtrar en su estructura de datos.
// Si se necesita añadir, tendríamos que determinar qué campo usar para el filtro.

</script>

<template>

    <Head title="Mis Publicaciones" />

    <AuthenticatedLayout>
        <header class="flex flex-col sm:flex-row justify-between items-center gap-4 mb-10">
            <h1 class="flex items-center gap-4 text-xl font-bold leading-5">
                <AssessmentIcon variant="black" class="text-black w-8 h-8" />

                Mis Publicaciones | Pendientes de Publicar ( {{ projects.data.length }} )
            </h1>

            <!-- No se añade el filtro de empresas aquí ya que no hay un campo adecuado para filtrar -->
        </header>

        <DataTable :columns="columns" :data="projects.data" column-filter="idCliente" />
    </AuthenticatedLayout>
</template>
