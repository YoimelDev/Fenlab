<script setup lang="ts">
import { ref, onMounted, inject } from 'vue'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'

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
    Label,
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from '@/Components/ui'
import { PluginApi } from 'vue-loading-overlay'
import { ArrowIcon, ShoppingBagIcon, SellIcon } from '@/Components/icons'
import { PlusIcon } from '@radix-icons/vue'

import { fenlabApi } from '@/api/fenlab.api'
import { CompanyMasterData, ProjectById } from '@/types/fenlab'

const { toast } = useToast()
const step = ref(1)
const isDialogOpen = ref(false)
const $loading = inject<PluginApi>('$loading')

interface Step4 {
    masterData: {
        wacc: number
        managementFee: number
        costeLanzamientoAbogado: number
        costeLanzamientoProcurador: number
    }
}

const masterData = ref<CompanyMasterData>()
const modelType = ref('NPL')
const activeSelection = ref('sale')

onMounted(() => {
    getCompanyMasterData()
})

const step1Schema = z.object({
    name: z.string().nonempty({
        message: 'El nombre del proyecto es requerido',
    }),
    description: z.string().nonempty({
        message: 'La descripción del proyecto es requerida',
    }),
})

const step4Schema = z.object({
    masterData: z.object({
        wacc: z.number().min(0, 'WACC debe ser mayor o igual a 0'),
        managementFee: z.number().min(0, 'Management fee debe ser mayor o igual a 0'),
        costeLanzamientoAbogado: z.number().min(0, 'Coste de abogado debe ser mayor o igual a 0'),
        costeLanzamientoProcurador: z.number().min(0, 'Coste de procurador debe ser mayor o igual a 0'),
    }),
})

const { handleSubmit: handleStep1, errors: step1Errors, defineField  } = useForm({
    validationSchema: toTypedSchema(step1Schema),
})

const [ name ] = defineField('name')
const [ description ] = defineField('description')

const { handleSubmit: handleStep4, errors: step4Errors, defineField: fieldStep4, setFieldValue } = useForm<Step4>({
    validationSchema: toTypedSchema(step4Schema),
})

const [ wacc ] = fieldStep4('masterData.wacc')
const [ managementFee ] = fieldStep4('masterData.managementFee')
const [ costeLanzamientoAbogado ] = fieldStep4('masterData.costeLanzamientoAbogado')
const [ costeLanzamientoProcurador ] = fieldStep4('masterData.costeLanzamientoProcurador')

const handleNextStep = () => {
    const steps = {
        1: () => handleStep1(() => step.value++)(),
        2: () => step.value++,
        3: () => step.value++,
        4: () => handleStep4(submitAnalysis)(),
    }

    const currentStepHandler = steps[step.value as keyof typeof steps]
    currentStepHandler()
}

const getCompanyMasterData = async () => {
    try {
        const { data: response } = await fenlabApi.post<CompanyMasterData>('', {
            method: 'get',
            path: 'company-master-data',
        })

        masterData.value = response
        setFieldValue('masterData.wacc', response.WACC)
        setFieldValue('masterData.managementFee', response.managementFee)
        setFieldValue('masterData.costeLanzamientoAbogado', response.costeLanzamientoAbogado)
        setFieldValue('masterData.costeLanzamientoProcurador', response.costeLanzamientoProcurador)
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
        const { data }: { data: ProjectById } = await fenlabApi.post('', {
            method: 'post',
            path: 'projects',
            body: {
                name: name.value,
                description: description.value,
                modelPosition: activeSelection.value,
                modelType: modelType.value,
                masterData: {
                    wacc: wacc.value,
                    managementFee: managementFee.value,
                    costeLanzamientoAbogado: costeLanzamientoAbogado.value,
                    costeLanzamientoProcurador: costeLanzamientoProcurador.value,
                },
            },
        })

        toast({
            variant: 'info',
            title: '¡Análisis creado!',
        })

        window.location.href = `/my-analysis/${data.id}`
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        toast({
            variant: 'danger',
            title: '¡Ups! Algo salió mal.',
            description: Array.isArray(error.response.data.message) ?
                error.response.data.message.join('\n') :
                error.response.data.message,
        })
    } finally {
        loader?.hide()
        isDialogOpen.value = false
    }
}

</script>

<template>
    <Dialog v-model:open="isDialogOpen">
        <DialogTrigger as-child>
            <Button
                class="gap-1"
                variant="green"
                size="sm"
            >
                <PlusIcon class="w-4 h-4" />

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
                    <div class="space-y-2">
                        <Label for="name">Nombre proyecto</Label>
                        <Input
                            id="name"
                            type="text"
                            placeholder="Nombre proyecto"
                            class="mt-2"
                            v-model="name"
                            :class="{ 'border-red-500': step1Errors.name }"
                            required
                            autofocus
                            autocomplete="name"
                        />
                        <span
                            v-if="step1Errors.name"
                            class="text-red-500 text-sm"
                        >{{ step1Errors.name }}</span>
                    </div>

                    <div class="space-y-2">
                        <Label for="description">Descripción</Label>
                        <Textarea
                            id="description"
                            class="resize-none h-[112px]"
                            placeholder="Descripción"
                            v-model="description"
                            :class="{ 'border-red-500': step1Errors.description }"
                        />
                        <span
                            v-if="step1Errors.description"
                            class="text-red-500 text-sm"
                        >{{ step1Errors.description }}</span>
                    </div>
                </div>

                <div
                    v-show="step === 2"
                    class="flex flex-col gap-6"
                >
                    <div
                        role="button"
                        class="flex items-center gap-4 p-3 bg-white rounded-sm opacity-50 cursor-not-allowed"
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
                        :class="{ 'text-electric-green [&_div]:text-electric-green bg-blue-sky border border-electric-green': activeSelection === 'sale' }"
                        @click="activeSelection = 'sale'"
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
                        class="flex items-center gap-4 p-3 bg-white rounded-sm opacity-50 cursor-not-allowed"
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
                        class="flex items-center gap-4 p-3 bg-white rounded-sm opacity-50 cursor-not-allowed"
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
                        :class="{ 'text-electric-green [&_div]:text-electric-green bg-blue-sky border border-electric-green': modelType === 'NPL' }"
                        @click="modelType = 'NPL'"
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
                        :class="{ 'text-electric-green [&_div]:text-electric-green bg-blue-sky border border-electric-green': modelType === 'REO' }"
                        @click="modelType = 'REO'"
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
                    class="flex flex-col gap-2 max-h-[600px] overflow-y-auto"
                >
                    <Tabs default-value="macro">
                        <TabsList class="grid grid-cols-3">
                            <TabsTrigger value="macro">
                                Macro
                            </TabsTrigger>
                            <TabsTrigger value="brokerGestion">
                                BrokerFee
                            </TabsTrigger>
                            <TabsTrigger value="brokerVenta">
                                FenciaFee
                            </TabsTrigger>
                        </TabsList>
                        <TabsContent value="macro">
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
                        </TabsContent>
                        <TabsContent value="brokerGestion">
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
                                        <TableCell>{{ data.fee }}</TableCell>
                                        <TableCell>{{ data.cap }}</TableCell>
                                        <TableCell>{{ data.hurdle }}</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </TabsContent>
                        <TabsContent value="brokerVenta">
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
                                        <TableCell>{{ data.fee }}</TableCell>
                                        <TableCell>{{ data.cap }}</TableCell>
                                        <TableCell>{{ data.hurdle }}</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </TabsContent>
                    </Tabs>

                    <div class="space-y-2 mt-4">
                        <Label for="wacc">WACC - Coste de Capital (%)</Label>
                        <Input
                            id="wacc"
                            type="number"
                            placeholder="5"
                            class="mt-2"
                            v-model.number="wacc"
                            :class="{ 'border-red-500': step4Errors['masterData.wacc'] }"
                            required
                            autofocus
                            autocomplete="wacc"
                            min="0"
                        />
                        <span
                            v-if="step4Errors['masterData.wacc']"
                            class="text-red-500 text-sm"
                        >
                            {{ step4Errors['masterData.wacc'] }}
                        </span>
                    </div>

                    <div class="space-y-2">
                        <Label for="managementFee">Management fee (%)</Label>
                        <Input
                            id="managementFee"
                            type="number"
                            placeholder="5"
                            class="mt-2"
                            v-model.number="managementFee"
                            :class="{ 'border-red-500': step4Errors['masterData.managementFee'] }"
                            required
                            autofocus
                            autocomplete="managementFee"
                            min="0"
                        />
                        <span
                            v-if="step4Errors['masterData.managementFee']"
                            class="text-red-500 text-sm"
                        >
                            {{ step4Errors['masterData.managementFee'] }}
                        </span>
                    </div>

                    <Label>Coste de lanzamiento</Label>
                    <div class="flex gap-6">
                        <div class="space-y-2 w-full">
                            <Label for="costeLanzamientoAbogado">Abogado</Label>
                            <Input
                                id="costeLanzamientoAbogado"
                                type="number"
                                placeholder="500"
                                class="mt-2"
                                v-model.number="costeLanzamientoAbogado"
                                :class="{ 'border-red-500': step4Errors['masterData.costeLanzamientoAbogado'] }"
                                required
                                autofocus
                                autocomplete="costeLanzamientoAbogado"
                                min="0"
                            />
                            <span
                                v-if="step4Errors['masterData.costeLanzamientoAbogado']"
                                class="text-red-500 text-sm"
                            >
                                {{ step4Errors['masterData.costeLanzamientoAbogado'] }}
                            </span>
                        </div>

                        <div class="space-y-2 w-full">
                            <Label for="costeLanzamientoProcurador">Procurador</Label>
                            <Input
                                id="costeLanzamientoProcurador"
                                type="number"
                                placeholder="500"
                                class="mt-2"
                                v-model.number="costeLanzamientoProcurador"
                                :class="{ 'border-red-500': step4Errors['masterData.costeLanzamientoProcurador'] }"
                                required
                                autofocus
                                autocomplete="costeLanzamientoProcurador"
                                min="0"
                            />
                            <span
                                v-if="step4Errors['masterData.costeLanzamientoProcurador']"
                                class="text-red-500 text-sm"
                            >
                                {{ step4Errors['masterData.costeLanzamientoProcurador'] }}
                            </span>
                        </div>
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
                    @click="handleNextStep"
                >
                    <span class="hidden sm:inline">
                        {{ step < 4 ? 'Siguiente' : 'Finalizar' }} </span>

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
