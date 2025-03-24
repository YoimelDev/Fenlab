<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { Head, usePage } from '@inertiajs/vue3'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue'

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
    toast,
} from '@/Components/ui'

import { InfoIcon } from '@/Components/icons'

import { EditMasterData } from '@/Pages/UserData/Components/editMasterData'
import { PageProps } from '@/types'
import { CompanyMasterData } from '@/types/fenlab'
import { fenlabApi } from '@/api'
import { formatCurrency, formatPercentage } from '@/lib/utils'

const { props } = usePage<PageProps>()
const masterData = ref<CompanyMasterData | null>(null)

const getCompanyMasterData = async () => {
    try {
        const { data: response } = await fenlabApi.post<CompanyMasterData>('', {
            method: 'get',
            path: 'company-master-data',
        })

        masterData.value = response
    } catch {
        toast({
            variant: 'danger',
            title: '¡Ups! Algo salió mal.',
        })
    }
}

onMounted(() => {
    getCompanyMasterData()
})
</script>

<template>
    <Head title="Datos Usuario" />

    <AuthenticatedLayout>
        <section>
            <div class="space-y-4">
                <p
                    v-if="props.auth.salesforceUser.name"
                    class="text-xl font-bold"
                >
                    {{ props.auth.salesforceUser.name }}
                </p>

                <p
                    v-if="props.auth.salesforceUser.email"
                    class="text-grey text-xl font-light"
                >
                    {{ props.auth.salesforceUser.email }}
                </p>

                <p
                    v-if="props.auth.salesforceUser.companyCommercialName"
                    class="text-grey text-xl font-light"
                >
                    {{ props.auth.salesforceUser.companyCommercialName }}
                </p>
            </div>
        </section>

        <hr class="my-8">

        <section>
            <header>
                <div class="flex justify-between">
                    <h2 class="flex items-center gap-4 text-xl font-bold leading-5">
                        Master Data Financiera
                    </h2>

                    <EditMasterData
                        :key="masterData?.WACC"
                        :master-data="masterData"
                        @updated="getCompanyMasterData"
                    />
                </div>

                <p class="flex items-center gap-2 mt-4 text-grey">
                    <InfoIcon />

                    Editar estos datos implicará cambios para todos los miembros de tu organización
                </p>
            </header>

            <div class="mt-20">
                <h3 class="text-grey my-4">
                    Macro
                </h3>

                <Table class="max-w-[420px]">
                    <TableHeader>
                        <TableRow class="[&_th]:px-3 [&_th]:bg-white">
                            <TableHead class="!bg-[#ECECEC] z-50 relative">
                                AÑO
                            </TableHead>
                            <TableHead>IPC (%)</TableHead>
                            <TableHead>HPA (%)</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <TableRow
                            class="[&_td]:px-3 [&_td]:bg-white !border-t border-[#ECECEC]"
                            v-for="data in masterData?.macro"
                            :key="data.ano"
                        >
                            <TableCell class="!bg-[#ECECEC] font-bold">
                                Año {{ data.ano }}
                            </TableCell>
                            <TableCell>{{ formatPercentage(data.IPC) }}</TableCell>
                            <TableCell>{{ formatPercentage(data.HPA) }}</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </div>

            <div class="mt-10">
                <h3 class="text-grey my-4">
                    Broker Fee
                </h3>

                <Table class="max-w-[520px]">
                    <TableHeader>
                        <TableRow class="[&_th]:px-3 [&_th]:bg-white">
                            <TableHead class="!bg-[#ECECEC] z-50 relative">
                                Tramo
                            </TableHead>
                            <TableHead>Fee (%)</TableHead>
                            <TableHead>Cap</TableHead>
                            <TableHead>Hurdle</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <TableRow
                            class="[&_td]:px-3 [&_td]:bg-white !border-t border-[#ECECEC]"
                            v-for="data in masterData?.brokerFee.gestion"
                            :key="data.tramo"
                        >
                            <TableCell class="!bg-[#ECECEC] font-bold">
                                {{ data.tramo }}
                            </TableCell>
                            <TableCell>{{ formatPercentage(data.fee ) }}</TableCell>
                            <TableCell>{{ formatCurrency(data.cap ) }}</TableCell>
                            <TableCell>{{ formatCurrency(data.hurdle ?? 0) }}</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </div>

            <div class="mt-10">
                <h3 class="text-grey my-4">
                    Fencia Fee
                </h3>

                <Table class="max-w-[520px]">
                    <TableHeader>
                        <TableRow class="[&_th]:px-3 [&_th]:bg-white">
                            <TableHead class="!bg-[#ECECEC] z-50 relative">
                                Tramo
                            </TableHead>
                            <TableHead>Fee (%)</TableHead>
                            <TableHead>Cap</TableHead>
                            <TableHead>Hurdle</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <TableRow
                            class="[&_td]:px-3 [&_td]:bg-white !border-t border-[#ECECEC]"
                            v-for="data in masterData?.brokerFee.ventaCredito"
                            :key="data.tramo"
                        >
                            <TableCell class="!bg-[#ECECEC] font-bold">
                                {{ data.tramo }}
                            </TableCell>
                            <TableCell>{{ formatPercentage(data.fee ) }}</TableCell>
                            <TableCell>{{ formatCurrency(data.cap ) }}</TableCell>
                            <TableCell>{{ formatCurrency(data.hurdle ?? 0) }}</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </div>

            <div class="mt-10">
                <h3 class="text-grey my-2">
                    WACC - Coste de Capital
                </h3>

                <p
                    class="text-xl"
                    v-percentage-text="masterData?.WACC"
                >
                    {{ masterData?.WACC }}
                </p>
            </div>

            <div class="mt-10">
                <h3 class="text-grey my-2">
                    Management fee % s/ Valor inmueble
                </h3>

                <p
                    class="text-xl"
                    v-percentage-text="masterData?.managementFee"
                >
                    {{ masterData?.managementFee }}
                </p>
            </div>
        </section>
    </AuthenticatedLayout>
</template>
