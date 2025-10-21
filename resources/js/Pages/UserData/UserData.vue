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
            <header>
                <div class="flex justify-between">
                    <!-- Master Data Financiera y botón de editar juntos a la derecha -->
                    <div class="flex flex-col items-start">
                        <div class="flex items-center gap-4 mb-2">
                            <h2 class="text-xl font-bold leading-5">
                                Master Data Financiera
                            </h2>
                            <EditMasterData :key="masterData?.WACC" :master-data="masterData"
                                @updated="getCompanyMasterData" />
                        </div>

                        <p class="flex items-center gap-2 text-grey text-sm">
                            <InfoIcon />
                            Editar estos datos implicará cambios para todos los miembros de tu organización
                        </p>
                    </div>
                    <!-- Datos del usuario a la izquierda -->
                    <div class="space-y-1">
                        <p v-if="props.auth.salesforceUser.name" class="text-lg font-medium text-gray-800">
                            {{ props.auth.salesforceUser.name }}
                        </p>

                        <p v-if="props.auth.salesforceUser.email" class="text-grey text-base">
                            {{ props.auth.salesforceUser.email }}
                        </p>

                        <p v-if="props.auth.salesforceUser.companyCommercialName" class="text-grey text-base">
                            {{ props.auth.salesforceUser.companyCommercialName }}
                        </p>
                    </div>


                </div>
            </header>

            <!-- Tablas organizadas como solicitado -->
            <!-- Primera fila: Fencia Fee, Broker Fee y Buy Fencia Fee -->
            <div class="mt-8 grid grid-cols-3 gap-8">
                <div>
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
                                <TableHead>Desde</TableHead>
                                <TableHead>Hasta</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            <TableRow class="[&_td]:px-3 [&_td]:bg-white !border-t border-[#ECECEC]"
                                v-for="data in masterData?.fenciaFee" :key="data.tramo">
                                <TableCell class="!bg-[#ECECEC] font-bold">
                                    {{ data.tramo }}
                                </TableCell>
                                <TableCell>{{ formatPercentage(data.fee) }}</TableCell>
                                <TableCell>{{ data.hurdle ? formatCurrency(data.hurdle) : "0" }}</TableCell>
                                <TableCell>{{ data.cap ? formatCurrency(data.cap) : "-" }}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </div>
                <div>
                    <h3 class="text-grey my-4">
                        Broker Fee (API) para Venta Vacío
                    </h3>
                    <Table class="max-w-[520px]">
                        <TableHeader>
                            <TableRow class="[&_th]:px-3 [&_th]:bg-white">
                                <TableHead class="!bg-[#ECECEC] z-50 relative">
                                    Tramo
                                </TableHead>
                                <TableHead>Fee (%)</TableHead>
                                <TableHead>Desde</TableHead>
                                <TableHead>Hasta</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            <TableRow class="[&_td]:px-3 [&_td]:bg-white !border-t border-[#ECECEC]"
                                v-for="data in masterData?.brokerFee" :key="data.tramo">
                                <TableCell class="!bg-[#ECECEC] font-bold">
                                    {{ data.tramo }}
                                </TableCell>
                                <TableCell>{{ formatPercentage(data.fee) }}</TableCell>
                                <TableCell>{{ data.hurdle ? formatCurrency(data.hurdle) : "0" }}</TableCell>
                                <TableCell>{{ data.cap ? formatCurrency(data.cap ?? 0) : "-" }}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </div>
                <div>
                    <h3 class="text-grey my-4">
                        Buy Fencia Fee
                    </h3>
                    <Table class="max-w-[520px]">
                        <TableHeader>
                            <TableRow class="[&_th]:px-3 [&_th]:bg-white">
                                <TableHead class="!bg-[#ECECEC] z-50 relative">
                                    Tramo
                                </TableHead>
                                <TableHead>Fee (%)</TableHead>
                                <TableHead>Desde</TableHead>
                                <TableHead>Hasta</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            <TableRow class="[&_td]:px-3 [&_td]:bg-white !border-t border-[#ECECEC]"
                                v-for="data in masterData?.buyFenciaFee" :key="data.tramo">
                                <TableCell class="!bg-[#ECECEC] font-bold">
                                    {{ data.tramo }}
                                </TableCell>
                                <TableCell>{{ formatPercentage(data.fee) }}</TableCell>
                                <TableCell>{{ data.hurdle ? formatCurrency(data.hurdle) : "0" }}</TableCell>
                                <TableCell>{{ data.cap ? formatCurrency(data.cap) : "-" }}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </div>
            </div>

            <!-- Segunda fila: Macro y Success Fee (con WACC y Management debajo de Success Fee) -->
            <div class="mt-8 grid grid-cols-2 gap-8">
                <div>
                    <h3 class="text-grey my-4">
                        IPC y Crecimiento Mercado (HPA)
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
                            <TableRow class="[&_td]:px-3 [&_td]:bg-white !border-t border-[#ECECEC]"
                                v-for="data in masterData?.macro" :key="data.ano">
                                <TableCell class="!bg-[#ECECEC] font-bold">
                                    Año {{ data.ano }}
                                </TableCell>
                                <TableCell>{{ formatPercentage(data.IPC) }}</TableCell>
                                <TableCell>{{ formatPercentage(data.HPA) }}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </div>

                <div>
                    <h3 class="text-grey my-4">
                        Success Fee – Gestión
                    </h3>

                    <Table class="max-w-[520px]">
                        <TableHeader>
                            <TableRow class="[&_th]:px-3 [&_th]:bg-white">
                                <TableHead class="!bg-[#ECECEC] z-50 relative">
                                    Tipo de operación
                                </TableHead>
                                <TableHead>Fee (%)</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            <TableRow class="[&_td]:px-3 [&_td]:bg-white !border-t border-[#ECECEC]">
                                <TableCell class="!bg-[#ECECEC] font-bold">
                                    Venta Crédito
                                </TableCell>
                                <TableCell>{{ formatPercentage(masterData?.successFee?.ventaCredito ?? 0) }}</TableCell>
                            </TableRow>
                            <TableRow class="[&_td]:px-3 [&_td]:bg-white !border-t border-[#ECECEC]">
                                <TableCell class="!bg-[#ECECEC] font-bold">
                                    Subasta/Remate
                                </TableCell>
                                <TableCell>{{ formatPercentage(masterData?.successFee?.subastaOrRemate ?? 0) }}
                                </TableCell>
                            </TableRow>
                            <TableRow class="[&_td]:px-3 [&_td]:bg-white !border-t border-[#ECECEC]">
                                <TableCell class="!bg-[#ECECEC] font-bold">
                                    Toma de posesión
                                </TableCell>
                                <TableCell>{{ formatCurrency(masterData?.successFee?.repossessedAsset ?? 0) }}
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>

                    <!-- WACC y Management Fee en formato tabla debajo de Success Fee -->
                    <div class="mt-8">
                        <h3 class="text-grey my-4">
                            Costes Operacionales
                        </h3>

                        <Table class="max-w-[520px]">
                            <TableHeader>
                                <TableRow class="[&_th]:px-3 [&_th]:bg-white">
                                    <TableHead class="!bg-[#ECECEC] z-50 relative">
                                        Concepto
                                    </TableHead>
                                    <TableHead>Valor (%)</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                <TableRow class="[&_td]:px-3 [&_td]:bg-white !border-t border-[#ECECEC]">
                                    <TableCell class="!bg-[#ECECEC] font-bold">
                                        WACC - Coste de Capital
                                    </TableCell>
                                    <TableCell v-percentage-text="masterData?.WACC">
                                        {{ masterData?.WACC }}
                                    </TableCell>
                                </TableRow>
                                <TableRow class="[&_td]:px-3 [&_td]:bg-white !border-t border-[#ECECEC]">
                                    <TableCell class="!bg-[#ECECEC] font-bold">
                                        <div class="leading-tight">
                                            Management Fee<br>
                                            (% s/ Mínimo entre Valor Inmueble y Deuda)<br>
                                            – Coste de Gestión Fija
                                        </div>
                                    </TableCell>
                                    <TableCell v-percentage-text="masterData?.managementFee">
                                        {{ masterData?.managementFee }}
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </div>
                </div>
            </div>

            <!-- Tercera fila: Coste proceso hipotecario + lanzamiento -->
            <!-- <div class="mt-8">
                <h3 class="text-grey my-4">
                    Coste proceso hipotecario + lanzamiento
                </h3>

                <Table class="max-w-[420px]">
                    <TableHeader>
                        <TableRow class="[&_th]:px-3 [&_th]:bg-white">
                            <TableHead class="!bg-[#ECECEC] z-50 relative">
                                Profesional
                            </TableHead>
                            <TableHead>Coste (€)</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <TableRow class="[&_td]:px-3 [&_td]:bg-white !border-t border-[#ECECEC]">
                            <TableCell class="!bg-[#ECECEC] font-bold">
                                Abogado
                            </TableCell>
                            <TableCell>{{ formatCurrency((masterData?.costeHipotecariaAbogado ?? 0) +
                                (masterData?.costeLanzamientoAbogado ?? 0)) }}</TableCell>
                        </TableRow>
                        <TableRow class="[&_td]:px-3 [&_td]:bg-white !border-t border-[#ECECEC]">
                            <TableCell class="!bg-[#ECECEC] font-bold">
                                Procurador
                            </TableCell>
                            <TableCell>{{ formatCurrency((masterData?.costeHipotecariaProcurador ?? 0) +
                                (masterData?.costeLanzamientoProcurador ?? 0)) }}</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </div> -->
        </section>
    </AuthenticatedLayout>
</template>
