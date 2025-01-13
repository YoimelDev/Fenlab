<!-- eslint-disable @typescript-eslint/no-explicit-any -->
<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { usePage } from '@inertiajs/vue3'
import { Kpi } from '@/Components/ui/kpi'
import { fenlabApi } from '@/api'
import { toast, Skeleton } from '@/Components/ui'
import type { KpiData } from '@/types/fenlab'
import type { PageProps } from '@/types'

const isLoading = ref(true)
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
    isLoading.value = true
    try {
        await Promise.all([
            fetchAnalysisKpi(),
            fetchSalesforceKpis(),
        ])
    } finally {
        isLoading.value = false
    }
}

onMounted(() => {
    loadKpis()
})
</script>

<template>
    <div class="relative">
        <TransitionGroup
            name="fade"
            mode="out-in"
            tag="div"
            class="flex flex-wrap gap-10"
        >
            <template
                v-if="isLoading"
            >
                <div
                    v-for="n in 4"
                    :key="`skeleton-${n}`"
                    class="w-[280px]"
                >
                    <Skeleton class="h-[120px] bg-olive" />
                </div>
            </template>
            <template v-else>
                <div
                    v-if="Object.keys(kpiData.analysis).length"
                    key="analysis"
                    class="w-[280px]"
                >
                    <Kpi
                        variant="default"
                        :is-positive="true"
                        title="Análisis hechos mes actual vs mes anterior."
                        :value="kpiData.analysis.currentMonth"
                        :percentage="kpiData.analysis.percentage"
                    />
                </div>

                <div
                    v-if="Object.keys(kpiData.published).length"
                    key="published"
                    class="w-[280px]"
                >
                    <Kpi
                        variant="primary"
                        :is-positive="true"
                        title="Operaciones publicadas mes actual vs mes anterior."
                        :value="kpiData.published.currentMonth"
                        :percentage="kpiData.published.variation"
                    />
                </div>

                <div
                    v-if="Object.keys(kpiData.approved).length"
                    key="approved"
                    class="w-[280px]"
                >
                    <Kpi
                        variant="primary"
                        :is-positive="true"
                        title="Operaciones aprobadas mes actual vs mes anterior."
                        :value="kpiData.approved.currentMonth"
                        :percentage="kpiData.approved.variation"
                    />
                </div>

                <div
                    v-if="Object.keys(kpiData.signed).length"
                    key="signed"
                    class="w-[280px]"
                >
                    <Kpi
                        variant="primary"
                        :is-positive="true"
                        title="Operaciones firmadas mes actual vs mes anterior."
                        :value="kpiData.signed.currentMonth"
                        :percentage="kpiData.signed.variation"
                    />
                </div>
            </template>
        </TransitionGroup>
    </div>
</template>

<style scoped>
.fade-move,
.fade-enter-active,
.fade-leave-active {
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.fade-enter-from {
    opacity: 0;
    transform: translateY(20px);
}

.fade-leave-to {
    opacity: 0;
    transform: translateY(-20px);
}

.fade-leave-active {
    position: absolute;
}
</style>