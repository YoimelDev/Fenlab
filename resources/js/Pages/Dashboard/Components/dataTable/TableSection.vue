<script setup lang="ts">
import { ref, type Component } from 'vue'
import { Link } from '@inertiajs/vue3'
import { PictureIcon, AssessmentIcon } from '@/Components/icons'
import { ArrowRightIcon } from '@radix-icons/vue'
import { DataTable, Button } from '@/Components/ui'
import { columnsAnalysis, pendingPublishColumns, pendingApprovalColumns, publishedColumns, pendingPBCColumns, pendingNotaryColumns } from './columns'
import type { ColumnDef } from '@tanstack/vue-table'
import type { Project } from '@/types/fenlab'

const props = defineProps<{
    sections: Record<string, Project[]>
}>()

interface Section {
    id: string
    title: string
    icon: Component
    iconVariant?: string
    data: Project[]
    columns: ColumnDef<Project, unknown>[]
    linkTo?: string
}

const sections = ref<Section[]>([
    {
        id: 'analysis',
        title: 'Mis Análisis',
        icon: AssessmentIcon,
        iconVariant: 'black',
        data: props.sections.analysis,
        columns: columnsAnalysis as ColumnDef<Project, unknown>[],
        linkTo: 'analysis',
    },
    {
        id: 'pending-publish',
        title: 'Pendientes de publicar',
        icon: PictureIcon,
        data: props.sections.pendingPublish,
        columns: pendingPublishColumns as ColumnDef<Project, unknown>[],
        linkTo: 'my-publications.pending',
    },
    {
        id: 'published',
        title: 'Publicados',
        icon: PictureIcon,
        data: props.sections.published,
        columns: publishedColumns as ColumnDef<Project, unknown>[],
        linkTo: 'my-publications.published',
    },
    {
        id: 'pending-approval',
        title: 'Pendientes Aprobación',
        icon: PictureIcon,
        data: props.sections.pendingApproval,
        columns: pendingApprovalColumns as ColumnDef<Project, unknown>[],
        linkTo: 'my-publications.pending-approval',
    },
    {
        id: 'pending-pbc',
        title: 'Pendientes Aprobación PBC',
        icon: PictureIcon,
        data: props.sections.pendingPBC,
        columns: pendingPBCColumns as ColumnDef<Project, unknown>[],
        linkTo: 'my-publications.pending-pbc',
    },
    {
        id: 'pending-notary',
        title: 'Pendientes Firma',
        icon: PictureIcon,
        data: props.sections.pendingNotary,
        columns: pendingNotaryColumns as ColumnDef<Project, unknown>[],
        linkTo: 'my-publications.pending-notary',
    },
])
</script>

<template>
    <div class="grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-10 mt-8 auto-rows-fr">
        <section
            v-for="section in sections"
            :key="section.id"
            class="min-h-0 py-8 px-4 bg-white rounded-sm [&>div]:m-0 [&>div]:p-0"
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
                :data="section.data ?? []"
            />
        </section>
    </div>
</template>