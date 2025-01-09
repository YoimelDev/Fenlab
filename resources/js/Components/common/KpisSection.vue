<!-- eslint-disable @typescript-eslint/no-explicit-any -->
<script setup lang="ts">
import { ref, onMounted, inject } from 'vue'
import { usePage } from '@inertiajs/vue3'
import { Kpi } from '@/Components/ui/kpi'
import { fenlabApi } from '@/api'
import { toast } from '@/Components/ui'
import type { KpiData } from '@/types/fenlab'
import type { PluginApi } from 'vue-loading-overlay'
import type { PageProps } from '@/types'

const $loading = inject<PluginApi>('$loading')
const kpiData = ref<KpiData>({
    analysis: {} as KpiData['analysis'],
    published: {} as KpiData['published'],
    approved: {} as KpiData['approved'],
    signed: {} as KpiData['signed'],
})

const page = usePage<PageProps>()
const salesforceEmail = page.props?.auth?.salesforceUser?.email

async function fetchAnalysisKpi() {
    try {
        const { data } = await fenlabApi.post('', {
            method: 'get',
            path: 'projects/kpi',
        })
        kpiData.value.analysis = data
    } catch (error: any) {
        toast({
            variant: 'danger',
            title: error.response?.data?.message?.join('\n') || 'Error al obtener KPI de análisis',
        })
    }
}

async function fetchSalesforceKpis() {
    try {
        const publishedResponse = await fenlabApi.get('/salesforce/published-kpi', {
            params: { email: salesforceEmail },
        })
        kpiData.value.published = publishedResponse.data
    } catch (error: any) {
        toast({
            variant: 'danger',
            title: error.response?.data?.message?.join('\n') || 'Error al obtener KPI de publicaciones',
        })
    }

    try {
        const approvedResponse = await fenlabApi.get('/salesforce/approved-kpi', {
            params: { email: salesforceEmail },
        })
        kpiData.value.approved = approvedResponse.data
    } catch (error: any) {
        toast({
            variant: 'danger',
            title: error.response?.data?.message?.join('\n') || 'Error al obtener KPI de aprobaciones',
        })
    }

    try {
        const signedResponse = await fenlabApi.get('/salesforce/signed-kpi', {
            params: { email: salesforceEmail },
        })
        kpiData.value.signed = signedResponse.data
    } catch (error: any) {
        toast({
            variant: 'danger',
            title: error.response?.data?.message?.join('\n') || 'Error al obtener KPI de firmas',
        })
    }
}

async function loadKpis() {
    const loader = $loading?.show()
    try {
        await Promise.all([
            fetchAnalysisKpi(),
            fetchSalesforceKpis(),
        ])
    } finally {
        loader?.hide()
    }
}

onMounted(() => {
    loadKpis()
})
</script>

<template>
    <div class="flex flex-wrap gap-10">
        <Kpi
            v-if="Object.keys(kpiData.analysis).length"
            variant="default"
            :is-positive="true"
            title="Análisis hechos mes actual vs mes anterior."
            :value="kpiData.analysis.currentMonth"
            :percentage="kpiData.analysis.percentage"
        />

        <Kpi
            v-if="Object.keys(kpiData.published).length"
            variant="primary"
            :is-positive="true"
            title="Operaciones publicadas mes actual vs mes anterior."
            :value="kpiData.published.currentMonth"
            :percentage="kpiData.published.variation"
        />

        <Kpi
            v-if="Object.keys(kpiData.approved).length"
            variant="primary"
            :is-positive="true"
            title="Operaciones aprobadas mes actual vs mes anterior."
            :value="kpiData.approved.currentMonth"
            :percentage="kpiData.approved.variation"
        />

        <Kpi
            v-if="Object.keys(kpiData.signed).length"
            variant="primary"
            :is-positive="true"
            title="Operaciones firmadas mes actual vs mes anterior."
            :value="kpiData.signed.currentMonth"
            :percentage="kpiData.signed.variation"
        />
    </div>
</template>