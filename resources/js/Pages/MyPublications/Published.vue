<script setup lang="ts">
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue'
import { Head, router } from '@inertiajs/vue3'
import { DataTable } from '@/Components/ui'
import { AssessmentIcon } from '@/Components/icons'
import { columns } from './Components/publishedTable'
import { Published, Auction } from './types'
import { ref, computed, onMounted } from 'vue'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/Components/ui/select'

const props = defineProps<{
    published: Published
}>()

const published = ref<Auction[]>(props.published?.Auctions ?? [])

// Obtener las empresas únicas de los proyectos
const uniqueCompanies = computed(() => {
    const companies = new Set<string>()
    published.value.forEach(project => {
        if (project.companyName) {
            companies.add(project.companyName)
        }
    })
    return Array.from(companies).sort()
})

const selectedCompany = ref('')

// Manejar el cambio de empresa seleccionada
function handleCompanyChange(company: string) {
    selectedCompany.value = company

    // Redirigir a la misma ruta con el parámetro companyName
    router.get(route('my-publications.published'), {
        companyName: company || undefined
    }, {
        preserveState: true,
        preserveScroll: true,
        only: ['published']
    })
}

// Limpiar el filtro
function clearFilter() {
    selectedCompany.value = ''
    router.get(route('my-publications.published'), {}, {
        preserveState: true,
        preserveScroll: true,
        only: ['published']
    })
}

// Inicializar el valor seleccionado si viene en la URL
onMounted(() => {
    const url = new URL(window.location.href)
    const companyParam = url.searchParams.get('companyName')
    if (companyParam) {
        selectedCompany.value = companyParam
    }
})
</script>

<template>

    <Head title="Mis Publicaciones" />

    <AuthenticatedLayout>
        <header class="flex flex-col sm:flex-row justify-between items-center gap-4 mb-10">
            <h1 class="flex items-center gap-4 text-xl font-bold leading-5">
                <AssessmentIcon variant="black" class="text-black w-8 h-8" />
                Mis Publicaciones | Publicadas ( {{ published?.length }} )
            </h1>

            <div class="flex items-center gap-4">
                <Select v-model="selectedCompany" @update:modelValue="handleCompanyChange">
                    <SelectTrigger class="w-[250px]">
                        <SelectValue :placeholder="selectedCompany || 'Filtrar por empresa'" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem v-for="company in uniqueCompanies" :key="company" :value="company">
                            {{ company }}
                        </SelectItem>
                    </SelectContent>
                </Select>

                <button v-if="selectedCompany" @click="clearFilter" class="text-sm text-gray-500 hover:text-gray-700">
                    Limpiar filtro
                </button>
            </div>
        </header>

        <DataTable :columns="columns" :data="published"
            :column-filter="['id', 'fenlabId', 'prestashopId', 'companyName', 'productReference']" />
    </AuthenticatedLayout>
</template>
