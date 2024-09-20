<script setup lang="ts">
import { Head, Link } from '@inertiajs/vue3'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue'

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/Components/ui'

import { InfoIcon, PersonIcon } from '@/Components/icons'

import { dataAnalysis_2 } from '@/data'
</script>

<template>
    <Head title="Datos Usuario" />

    <AuthenticatedLayout>
        <section>
            <header>
                <div class="flex justify-between">
                    <h2 class="flex items-center gap-4 text-xl font-bold leading-5">
                        <PersonIcon
                            class="text-black "
                        />
                        Cómo funciona
                    </h2>
                </div>
            </header>

            <div class="mt-20 space-y-4">
                <p class="text-xl font-bold">
                    Nombre de usuario
                </p>

                <p class="text-grey text-xl font-light">
                    email@email.com
                </p>

                <p class="text-grey text-xl font-light">
                    Empresa
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

                    <Link
                        href="#"
                        class="text-blue"
                    >
                        Editar
                    </Link>
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
                            v-for="data in dataAnalysis_2"
                            :key="data.id"
                        >
                            <TableCell class="!bg-[#ECECEC] font-bold">
                                {{ data.year }}
                            </TableCell>
                            <TableCell>{{ data.ipc }}</TableCell>
                            <TableCell>{{ data.hpa }}</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </div>

            <div class="mt-10">
                <h3 class="text-grey my-2">
                    WACC - Coste de Capital
                </h3>

                <p class="text-xl">
                    144.039
                </p>
            </div>

            <div class="mt-10">
                <h3 class="text-grey my-2">
                    Management fee % s/ Valor inmueble
                </h3>

                <p class="text-xl">
                    144.039
                </p>
            </div>
        </section>
    </AuthenticatedLayout>
</template>