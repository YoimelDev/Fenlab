<script setup lang="ts">
import { ref, onMounted, type Component } from 'vue'
import { Link } from '@inertiajs/vue3'
import { PictureIcon, AssessmentIcon } from '@/Components/icons'
import { ArrowRightIcon } from '@radix-icons/vue'
import { DataTable, Button } from '@/Components/ui'
import { columnsAnalysis, pendingPublishColumns, pendingApprovalColumns, publishedColumns } from './columns'
import { fenlabApi } from '@/api/fenlab.api'
import { type Project } from '@/types/fenlab'
import type { ColumnDef } from '@tanstack/vue-table'

interface Section {
    id: string
    title: string
    icon: Component
    iconVariant?: string
    data: Project[]
    columns: ColumnDef<Project, unknown>[]
    linkTo?: string
    getData: () => Promise<Project[]>
}

const sections = ref<Section[]>([
    {
        id: 'analysis',
        title: 'Mis Análisis',
        icon: AssessmentIcon,
        iconVariant: 'black',
        data: [] as Project[],
        columns: columnsAnalysis as ColumnDef<Project, unknown>[],
        linkTo: 'analysis',
        getData: async () => {
            const { data: response } = await fenlabApi.post('', {
                method: 'get',
                path: 'projects',
                body: { perPage: 5 },
            })
            return response.data
        },
    },
    {
        id: 'pending-publish',
        title: 'Pendientes de publicar',
        icon: PictureIcon,
        data: [],
        columns: pendingPublishColumns as ColumnDef<Project, unknown>[],
        getData: async () => {
            const { data } = await fenlabApi.get('/salesforce/pending-publish')
            return data
        },
    },
    {
        id: 'published',
        title: 'Publicados',
        icon: PictureIcon,
        data: [],
        columns: publishedColumns as ColumnDef<Project, unknown>[],
        getData: () => Promise.resolve([]),  // Replace with actual API call
    },
    {
        id: 'pending-approval',
        title: 'Pendientes Aprobación',
        icon: PictureIcon,
        data: [],
        columns: pendingApprovalColumns as ColumnDef<Project, unknown>[],
        getData: async () => {
            const { data } = await fenlabApi.get('/salesforce/pending-approval')
            return data
        },
    },
    {
        id: 'pending-pbc',
        title: 'Pendientes Aprobación PBC',
        icon: PictureIcon,
        data: [],
        columns: pendingApprovalColumns as ColumnDef<Project, unknown>[],
        getData: async () => {
            const { data } = await fenlabApi.get('/salesforce/pending-pbc')
            return data
        },
    },
    {
        id: 'pending-notary',
        title: 'Pendientes Firma',
        icon: PictureIcon,
        data: [],
        columns: pendingApprovalColumns as ColumnDef<Project, unknown>[],
        getData: async () => {
            const { data } = await fenlabApi.get('/salesforce/pending-notary')
            return data
        },
    },
])

onMounted(async () => {
    for (const section of sections.value) {
        section.data = await section.getData()
    }
})
</script>

<template>
    <div class="grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-10 mt-8">
        <section
            v-for="section in sections"
            :key="section.id"
            class="h-fit py-8 px-4 bg-white rounded-sm [&>div]:m-0 [&>div]:p-0"
        >
            <header class="flex justify-between items-center mb-6">
                <h2 class="flex items-center gap-4 text-xl font-bold leading-5">
                    <component
                        :is="section.icon"
                        :variant="section.iconVariant"
                        class="text-black w-8 h-8"
                    />
                    {{ section.title }}
                </h2>

                <Button
                    v-if="section.linkTo"
                    as-child
                    variant="ghost"
                    class="text-blue text-sm font-medium"
                    size="sm"
                >
                    <Link :href="route(section.linkTo)">
                        <ArrowRightIcon class="text-blue w-6 h-6" />
                    </Link>
                </Button>
                <ArrowRightIcon
                    v-else
                    class="text-blue w-6 h-6"
                />
            </header>

            <DataTable
                :activate-pagination="false"
                :columns="section.columns"
                :data="section.data"
            />
        </section>
    </div>
</template>