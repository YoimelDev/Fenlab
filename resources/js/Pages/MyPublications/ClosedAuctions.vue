<script setup lang="ts">
import { AssessmentIcon } from '@/Components/icons'
import { DataTable } from '@/Components/ui'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue'
import { Head, router, usePage } from '@inertiajs/vue3'
import { columns } from './Components/closedAuctionsTable'
import { ClosedAuctions } from './types'
import { ref, computed, onMounted, watch } from 'vue'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/Components/ui/select'
import { PageProps } from '@/types'

const props = defineProps<{
    projects: ClosedAuctions[]
}>()

const page = usePage<PageProps>();
const isAdmin = page.props?.auth?.salesforceUser?.rols === "Admin";

// Usar computed para el datatable para que se actualice automáticamente
const tableData = computed<ClosedAuctions[]>(() => props.projects ?? [])

// Mantener una lista de todas las empresas que hemos visto
const allCompanies = ref<Set<string>>(new Set())

// Extraer y establecer las empresas inmediatamente cuando se monta el componente
onMounted(() => {
    // Inicializar con los datos actuales
    if (props.projects) {
        props.projects.forEach(project => {
            if (project.companyName) {
                allCompanies.value.add(project.companyName)
            }
        })
    }

    // Verificar si hay un parámetro companyName en la URL
    const url = new URL(window.location.href)
    const companyParam = url.searchParams.get('companyName')
    if (companyParam) {
        selectedCompany.value = companyParam
        // Asegurarse de que la empresa seleccionada esté en la lista
        allCompanies.value.add(companyParam)
    }
})

// Mantener actualizadas las empresas cada vez que llegan nuevos datos
watch(() => props.projects, (newProjects) => {
    if (newProjects) {
        newProjects.forEach(project => {
            if (project.companyName) {
                allCompanies.value.add(project.companyName)
            }
        })
    }
}, { immediate: true })

// Obtener las empresas únicas, combinando lo que tenemos actualmente y lo que teníamos antes
const uniqueCompanies = computed(() => {
    return Array.from(allCompanies.value).sort()
})

const selectedCompany = ref('')

// Manejar el cambio de empresa seleccionada
function handleCompanyChange(company: string) {
    selectedCompany.value = company

    // Redirigir a la misma ruta con el parámetro companyName
    router.get(route('my-publications.closed-auctions'), {
        companyName: company || undefined
    }, {
        preserveState: true,
        preserveScroll: true,
        only: ['projects']
    })
}

// Limpiar el filtro
function clearFilter() {
    selectedCompany.value = ''
    router.get(route('my-publications.closed-auctions'), {}, {
        preserveState: true,
        preserveScroll: true,
        only: ['projects']
    })
}
</script>

<template>

    <Head title="Mis Publicaciones" />

    <AuthenticatedLayout>
        <header class="flex flex-col sm:flex-row justify-between items-center gap-4 mb-10">
            <h1 class="flex items-center gap-4 text-xl font-bold leading-5">
                <AssessmentIcon variant="black" class="text-black w-8 h-8" />
                Mis Publicaciones | Operaciones Cerradas ( {{ tableData.length }} )
            </h1>

            <div class="flex items-center gap-4">
                <Select v-if="isAdmin" v-model="selectedCompany" @update:modelValue="handleCompanyChange">
                    <SelectTrigger class="w-[250px] border border-black rounded-md">
                        <SelectValue :placeholder="selectedCompany || 'Filtrar por empresa'" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem v-for="company in uniqueCompanies" :key="company" :value="company">
                            {{ company }}
                        </SelectItem>
                    </SelectContent>
                </Select>

                <button v-if="selectedCompany" @click="clearFilter"
                    class="px-3 py-1 text-sm border border-black rounded-md hover:bg-gray-100">
                    Limpiar filtro
                </button>
            </div>
        </header>

        <DataTable :columns="columns" :data="tableData"
            :column-filter="['clientId', 'fenlabId', 'fenciaId', 'salesforceId', 'companyName', 'name', 'productReference']" />
    </AuthenticatedLayout>
</template>
