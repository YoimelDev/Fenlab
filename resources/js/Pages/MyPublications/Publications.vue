<script setup lang="ts">
import { ref, reactive } from 'vue'
import { Head } from '@inertiajs/vue3'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue'

import { 
    Kpi, 
    Button, 
    DataTable,
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    Input,
    Textarea,
    Badge, 
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/Components/ui'

import { AssessmentIcon, ArrowIcon, ShoppingBagIcon, SellIcon } from '@/Components/icons'
import { PlusIcon } from '@radix-icons/vue'

import { dataAnalysis, publications } from '@/data'
import { columns } from './Components/dataTable'

const step = ref(1)

const newAnalysis = reactive({
    name: '',
    description: '',
    wacc: '',
    management_fee: '',
    lawyer: '',
    prosecutor: '',
})

const activeSelection = ref('buy')
const activeSelectionBadge = ref('pl/spl s')

</script>

<template>
    <Head title="Mis Publicaciones" />

    <AuthenticatedLayout>
        <header class="flex flex-col sm:flex-row justify-between items-center gap-4 max-w-[1104px] mb-10">
            <h1 class="flex items-center gap-4 text-xl font-bold leading-5">
                <AssessmentIcon
                    variant="black"
                    class="text-black w-8 h-8"
                />

                Mis Publicaciones | Pendientes de Publicar
            </h1>

            <Button 
                class="gap-1"
                variant="green"
                size="sm"
            >
                <PlusIcon
                    class="w-4 h-4"
                />

                Nueva Publicación
            </Button>

            <Dialog>
                <DialogTrigger as-child>
                    <Button 
                        class="gap-1 hidden"
                        variant="green"
                        size="sm"
                    >
                        <PlusIcon
                            class="w-4 h-4"
                        />
    
                        Nueva Publicación
                    </Button>
                </DialogTrigger>

                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>
                            Nuevo análisis
                        </DialogTitle>
                        <DialogDescription>
                            Paso {{ step }}
                        </DialogDescription>
                    </DialogHeader>

                    <div class="content">
                        <div
                            v-if="step === 1"
                            class="flex flex-col gap-10"
                        >
                            <Input
                                id="name"
                                type="text"
                                placeholder="Nombre proyecto"
                                class="mt-2"
                                v-model="newAnalysis.name"
                                required
                                autofocus
                                autocomplete="name"
                            />

                            <Textarea
                                id="description"
                                class="resize-none h-[112px]"
                                placeholder="Descripción"
                                v-model="newAnalysis.description"
                            />
                        </div>

                        <div
                            v-if="step === 2"
                            class="flex flex-col gap-6"
                        >
                            <div
                                role="button"
                                class="flex items-center gap-4 p-3 bg-white rounded-sm"
                                :class="{ 'text-electric-green [&_div]:text-electric-green bg-blue-sky border border-electric-green': activeSelection === 'buy' }"
                                @click="activeSelection = 'buy'"
                            >
                                <ShoppingBagIcon />

                                <div class="text-grey">
                                    <h3 class="text-lg font-bold">
                                        Buy Side
                                    </h3>

                                    <p class="text-sm">
                                        Texto descriptivo lorem ipsum
                                    </p>
                                </div>
                            </div>

                            <div 
                                role="button"
                                class="flex items-center gap-4 p-3 bg-white rounded-sm"
                                :class="{ 'text-electric-green [&_div]:text-electric-green bg-blue-sky border border-electric-green': activeSelection === 'sell' }"
                                @click="activeSelection = 'sell'"
                            >
                                <SellIcon />

                                <div class="text-grey">
                                    <h3 class="text-lg font-bold">
                                        Sale Side
                                    </h3>

                                    <p class="text-sm">
                                        Texto descriptivo lorem ipsum
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div
                            v-if="step === 3"
                            class="flex flex-col gap-6"
                        >
                            <div
                                role="button"
                                class="flex items-center gap-4 p-3 bg-white rounded-sm"
                                :class="{ 'text-electric-green [&>div]:text-electric-green bg-blue-sky border border-electric-green': activeSelectionBadge === 'pl/spl s' }"
                                @click="activeSelectionBadge = 'pl/spl s'"
                            >
                                <Badge variant="secondary">
                                    PL/SPL S
                                </Badge>

                                <div class="text-grey">
                                    <h3 class="text-lg font-bold">
                                        PL / RPL Secured
                                    </h3>

                                    <p class="text-sm">
                                        Texto descriptivo lorem ipsum
                                    </p>
                                </div>
                            </div>

                            <div 
                                role="button"
                                class="flex items-center gap-4 p-3 bg-white rounded-sm"
                                :class="{ 'text-electric-green [&_div]:text-electric-green bg-blue-sky border border-electric-green': activeSelectionBadge === 'pl/spl u' }"
                                @click="activeSelectionBadge = 'pl/spl u'"
                            >
                                <Badge
                                    class="bg-[#EBE0F1]"
                                    variant="secondary"
                                >
                                    PL/SPL U
                                </Badge>

                                <div class="text-grey">
                                    <h3 class="text-lg font-bold">
                                        PL / RPL Unsecured
                                    </h3>

                                    <p class="text-sm">
                                        Texto descriptivo lorem ipsum
                                    </p>
                                </div>
                            </div>

                            <div 
                                role="button"
                                class="flex items-center gap-4 p-3 bg-white rounded-sm"
                                :class="{ 'text-electric-green [&_div]:text-electric-green bg-blue-sky border border-electric-green': activeSelectionBadge === 'npl' }"
                                @click="activeSelectionBadge = 'npl'"
                            >
                                <Badge variant="primary">
                                    NPL
                                </Badge>

                                <div class="text-grey">
                                    <h3 class="text-lg font-bold">
                                        NPL Secured
                                    </h3>

                                    <p class="text-sm">
                                        Texto descriptivo lorem ipsum
                                    </p>
                                </div>
                            </div>

                            <div 
                                role="button"
                                class="flex items-center gap-4 p-3 bg-white rounded-sm"
                                :class="{ 'text-electric-green [&_div]:text-electric-green bg-blue-sky border border-electric-green': activeSelectionBadge === 'reo' }"
                                @click="activeSelectionBadge = 'reo'"
                            >
                                <Badge variant="default">
                                    REO
                                </Badge>


                                <div class="text-grey">
                                    <h3 class="text-lg font-bold">
                                        REO
                                    </h3>

                                    <p class="text-sm">
                                        Texto descriptivo lorem ipsum
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div
                            v-if="step === 4"
                            class="flex flex-col gap-10"
                        >
                            <Table>
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
                                        v-for="data in dataAnalysis"
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

                            <Input
                                id="wacc"
                                type="text"
                                placeholder="WACC - Coste de Capital"
                                class="mt-2"
                                v-model="newAnalysis.wacc"
                                required
                                autofocus
                                autocomplete="wacc"
                            />

                            <Input
                                id="management_fee"
                                type="text"
                                placeholder="Management fee % s/ Valor inmueble"
                                class="mt-2"
                                v-model="newAnalysis.management_fee"
                                required
                                autofocus
                                autocomplete="management_fee"
                            />

                            <div class="flex gap-6">
                                <Input
                                    id="lawyer"
                                    type="text"
                                    placeholder="Abogado"
                                    class="mt-2"
                                    v-model="newAnalysis.lawyer"
                                    required
                                    autofocus
                                    autocomplete="lawyer"
                                />

                                <Input
                                    id="prosecutor"
                                    type="text"
                                    placeholder="Procurador"
                                    class="mt-2"
                                    v-model="newAnalysis.prosecutor"
                                    required
                                    autofocus
                                    autocomplete="prosecutor"
                                />
                            </div>
                        </div>
                    </div>
            
                    <DialogFooter class="flex justify-between mt-10">
                        <Button
                            class="w-full"
                            :class="step === 1 ? 'invisible' : ''"
                            variant="ghost"
                            size="sm"
                            @click="step--"
                        >
                            <ArrowIcon
                                class="sm:mr-2 text-blue"
                                variant="left"
                            />

                            <span class="hidden sm:inline">
                                Anterior
                            </span>
                        </Button>

                        <Button
                            class="w-full"
                            size="sm"
                            @click="step < 4 ? step++ : null"
                        >
                            <span class="hidden sm:inline">
                                {{ step < 4 ? 'Siguiente' : 'Finalizar' }}
                            </span>
        
                            <ArrowIcon
                                v-if="step < 4"
                                class="sm:ml-2 text-white"
                                variant="right"
                            />
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </header>

        <div class="flex flex-wrap gap-10">
            <Kpi
                variant="default"
                :is-positive="true"
            />

            <Kpi
                variant="primary"
                :is-positive="false"
            />

            <Kpi
                variant="primary"
                :is-positive="false"
            />

            <Kpi
                variant="primary"
                :is-positive="false"
            />
        </div>
     
        <DataTable
            :columns="columns"
            :data="publications"
        />
    </AuthenticatedLayout>
</template>
