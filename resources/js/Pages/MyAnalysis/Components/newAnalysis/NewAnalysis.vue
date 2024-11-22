<script setup lang="ts">
import { ref, reactive, onMounted, inject } from 'vue'

import { 
    useToast,
    Button, 
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
import { PluginApi } from 'vue-loading-overlay'
import {  ArrowIcon, ShoppingBagIcon, SellIcon } from '@/Components/icons'
import { PlusIcon } from '@radix-icons/vue'

import { fenlabApi } from '@/api/fenlab.api'
import { CompanyMasterData } from '@/types/fenlab'

const props = defineProps<{
    getAnalysis: () => void
}>()

const { toast } = useToast()
const step = ref(1)
const isDialogOpen = ref(false)
const $loading = inject<PluginApi>('$loading')

const initialAnalysis = () => ({
    name: '',
    description: '',
    modelType: '',
    masterData: {
        wacc: '',
        managementFee: '',
        costeDesahucioAbogado: '',
        costeDesahucioProcurador: '',
    },
})

const masterData = ref<CompanyMasterData>()
const newAnalysis = reactive(initialAnalysis())
const activeSelection = ref('buy')

const resetNewAnalysis = () => {
    Object.assign(newAnalysis, initialAnalysis())
}

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

const submitAnalysis = async () => {
    const loader = $loading?.show()

    try {
        await fenlabApi.post('', {
            method: 'post',
            path: 'projects',
            body: { ...newAnalysis },
        })

        toast({
            variant: 'info',
            title: '¡Análisis creado!',
        })

        resetNewAnalysis()
        step.value = 1
        props.getAnalysis()

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        toast({
            variant: 'danger',
            title: '¡Ups! Algo salió mal.',
            description: error.response.data.message.join('\n'),
        })
    } finally {
        loader?.hide()    
        isDialogOpen.value = false     
    }
}

onMounted(() => {
    getCompanyMasterData()    
})

</script>

<template>
    <Dialog v-model:open="isDialogOpen">
        <DialogTrigger as-child>
            <Button 
                class="gap-1"
                variant="green"
                size="sm"
            >
                <PlusIcon
                    class="w-4 h-4"
                />

                Nuevo Análisis
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
                    v-show="step === 1"
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
                    v-show="step === 2"
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
                                Modeliza en posición comprador
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
                                Modeliza en posición vendedora
                            </p>
                        </div>
                    </div>
                </div>

                <div
                    v-show="step === 3"
                    class="flex flex-col gap-6"
                >
                    <div
                        role="button"
                        class="flex items-center gap-4 p-3 bg-white rounded-sm"
                        :class="{ 'text-electric-green [&>div]:text-electric-green bg-blue-sky border border-electric-green': newAnalysis.modelType === 'pl/spl s' }"
                        @click="newAnalysis.modelType = 'pl/spl s'"
                    >
                        <Badge variant="secondary">
                            PL/SPL S
                        </Badge>

                        <div class="flex-1 text-grey">
                            <h3 class="text-lg font-bold">
                                PL / RPL Secured
                            </h3>

                            <p class="text-sm">
                                Cashflow model perfoming & Re-perfoming loans Secured
                            </p>
                        </div>
                    </div>

                    <div 
                        role="button"
                        class="flex items-center gap-4 p-3 bg-white rounded-sm"
                        :class="{ 'text-electric-green [&_div]:text-electric-green bg-blue-sky border border-electric-green': newAnalysis.modelType === 'pl/spl u' }"
                        @click="newAnalysis.modelType = 'pl/spl u'"
                    >
                        <Badge
                            class="bg-[#EBE0F1]"
                            variant="secondary"
                        >
                            PL/SPL U
                        </Badge>

                        <div class="flex-1 text-grey">
                            <h3 class="text-lg font-bold">
                                PL / RPL Unsecured
                            </h3>

                            <p class="text-sm">
                                Cashflow model perfoming & Re-performing loans Unsecured
                            </p>
                        </div>
                    </div>

                    <div 
                        role="button"
                        class="flex items-center gap-4 p-3 bg-white rounded-sm"
                        :class="{ 'text-electric-green [&_div]:text-electric-green bg-blue-sky border border-electric-green': newAnalysis.modelType === 'NPL' }"
                        @click="newAnalysis.modelType = 'NPL'"
                    >
                        <Badge variant="primary">
                            NPL
                        </Badge>

                        <div class="flex-1 text-grey">
                            <h3 class="text-lg font-bold">
                                NPL Secured
                            </h3>

                            <p class="text-sm">
                                Modelo de recuperación judicial de non-perfoming loans secured
                            </p>
                        </div>
                    </div>

                    <div 
                        role="button"
                        class="flex items-center gap-4 p-3 bg-white rounded-sm"
                        :class="{ 'text-electric-green [&_div]:text-electric-green bg-blue-sky border border-electric-green': newAnalysis.modelType === 'REO' }"
                        @click="newAnalysis.modelType = 'REO'"
                    >
                        <Badge variant="default">
                            REO
                        </Badge>


                        <div class="flex-1 text-grey">
                            <h3 class="text-lg font-bold">
                                REO
                            </h3>

                            <p class="text-sm">
                                Modelo de recuperación judicial de activos inmobiliarios
                            </p>
                        </div>
                    </div>
                </div>

                <div
                    v-show="step === 4"
                    class="flex flex-col gap-2"
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
                                v-for="data in masterData?.macro"
                                :key="data.ano"
                            >
                                <TableCell class="!bg-[#ECECEC] font-bold">
                                    Año {{ data.ano }}
                                </TableCell>
                                <TableCell>{{ data.IPC }}</TableCell>
                                <TableCell>{{ data.HPA }}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>

                    <Input
                        id="wacc"
                        type="text"
                        placeholder="WACC - Coste de Capital"
                        class="mt-2"
                        v-model="newAnalysis.masterData.wacc"
                        required
                        autofocus
                        autocomplete="wacc"
                    />

                    <Input
                        id="managementFee"
                        type="text"
                        placeholder="Management fee % s/ Valor inmueble"
                        class="mt-2"
                        v-model="newAnalysis.masterData.managementFee"
                        required
                        autofocus
                        autocomplete="managementFee"
                    />

                    <div class="flex gap-6">
                        <Input
                            id="costeDesahucioAbogado"
                            type="text"
                            placeholder="Abogado"
                            class="mt-2"
                            v-model="newAnalysis.masterData.costeDesahucioAbogado"
                            required
                            autofocus
                            autocomplete="costeDesahucioAbogado"
                        />

                        <Input
                            id="costeDesahucioProcurador"
                            type="text"
                            placeholder="Procurador"
                            class="mt-2"
                            v-model="newAnalysis.masterData.costeDesahucioProcurador"
                            required
                            autofocus
                            autocomplete="costeDesahucioProcurador"
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
                    @click="step < 4 ? step++ : submitAnalysis()"
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
</template>