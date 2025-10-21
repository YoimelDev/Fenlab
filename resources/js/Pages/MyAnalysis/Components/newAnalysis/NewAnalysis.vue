<script setup lang="ts">
import { ref, onMounted, inject, watch, computed } from 'vue'
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
    Checkbox,
} from '@/Components/ui'
import { PluginApi } from 'vue-loading-overlay'
import { ArrowIcon, ShoppingBagIcon, SellIcon } from '@/Components/icons'
import { PlusIcon } from '@radix-icons/vue'

import { fenlabApi } from '@/api/fenlab.api'
import { CompanyMasterData, ProjectById } from '@/types/fenlab'
import { formatCurrency, formatPercentage } from '@/lib/utils'

const { toast } = useToast()
const step = ref(1)
const isDialogOpen = ref(false)
const $loading = inject<PluginApi>('$loading')

const masterData = ref<CompanyMasterData>()
const modelType = ref('NPL')
const activeSelection = ref('buy') // Cambiar el valor por defecto a 'buy'

// Variable para el checkbox de Fencia Fee (NPL_BUY)
const noUsarFenciaFee = ref(false)

interface Step4 {
    masterData: {
        wacc: number
        managementFee: number
        costeLanzamientoAbogado?: number
        costeLanzamientoProcurador?: number
        costeHipotecariaAbogado?: number
        costeHipotecariaProcurador?: number
        // Campos específicos de NPL_BUY
        costeHipotecariaOtros?: number
        costeLanzamientoOtros?: number
        deducibilidadIVA?: number
        conpraCreditoNotaria?: number
        conpraCreditoRegistro?: number
        conpraCreditoGestion?: number
        adjudicacionRegistro?: number
        adjudicacionGestion?: number
        mesesParaCobroSubasta?: number
    }
}

// Computed property para determinar el modelType correcto para la API
const apiModelType = computed(() => {
    if (modelType.value === 'NPL' && activeSelection.value === 'buy') {
        return 'NPL_BUY'
    }
    return modelType.value
})

// Computed property para determinar qué datos de fee mostrar
const displayFeeData = computed(() => {
    if (apiModelType.value === 'NPL_BUY') {
        // Usar buyFenciaFee para NPL_BUY
        return masterData.value?.buyFenciaFee
    }
    return masterData.value?.brokerFee
})

onMounted(() => {
    getCompanyMasterData()
})

// Observar cambios en el tipo de modelo o selección para recargar los datos correspondientes
watch([modelType, activeSelection], () => {
    if (step.value >= 3) { // Solo recargar cuando el usuario ya haya seleccionado el modelo
        getCompanyMasterData()
    }
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
        wacc: z.union([z.coerce.number().min(0, 'WACC debe ser mayor o igual a 0'), z.null()]).optional(),
        managementFee: z.union([z.coerce.number().min(0, 'Management fee debe ser mayor o igual a 0'), z.null()]).optional(),
        costeLanzamientoAbogado: z.coerce.number().min(0, 'Coste de abogado debe ser mayor o igual a 0').optional(),
        costeLanzamientoProcurador: z.coerce.number().min(0, 'Coste de procurador debe ser mayor o igual a 0').optional(),
        costeHipotecariaAbogado: z.coerce.number().min(0, 'Coste de abogado debe ser mayor o igual a 0').optional(),
        costeHipotecariaProcurador: z.coerce.number().min(0, 'Coste de procurador debe ser mayor o igual a 0').optional(),
        // Campos específicos de NPL_BUY
        costeHipotecariaOtros: z.union([z.coerce.number().min(0, 'Debe ser mayor o igual a 0'), z.string().transform(val => parseFloat(val))]).optional(),
        costeLanzamientoOtros: z.coerce.number().min(0, 'Debe ser mayor o igual a 0').optional(),
        deducibilidadIVA: z.coerce.number().min(0, 'Debe ser mayor o igual a 0').optional(),
        conpraCreditoNotaria: z.coerce.number().min(0, 'Debe ser mayor o igual a 0').optional(),
        conpraCreditoRegistro: z.coerce.number().min(0, 'Debe ser mayor o igual a 0').optional(),
        conpraCreditoGestion: z.coerce.number().min(0, 'Debe ser mayor o igual a 0').optional(),
        adjudicacionRegistro: z.coerce.number().min(0, 'Debe ser mayor o igual a 0').optional(),
        adjudicacionGestion: z.coerce.number().min(0, 'Debe ser mayor o igual a 0').optional(),
        mesesParaCobroSubasta: z.coerce.number().min(1, 'Debe ser mayor a 0').optional(),
    }),
})

const { handleSubmit: handleStep1, errors: step1Errors, defineField } = useForm({
    validationSchema: toTypedSchema(step1Schema),
})

const [name] = defineField('name')
const [description] = defineField('description')

const { handleSubmit: handleStep4, errors: step4Errors, defineField: fieldStep4, setFieldValue } = useForm<Step4>({
    validationSchema: toTypedSchema(step4Schema),
})

const [wacc] = fieldStep4('masterData.wacc')
const [managementFee] = fieldStep4('masterData.managementFee')
const [costeLanzamientoAbogado] = fieldStep4('masterData.costeLanzamientoAbogado')
const [costeLanzamientoProcurador] = fieldStep4('masterData.costeLanzamientoProcurador')
const [costeHipotecariaAbogado] = fieldStep4('masterData.costeHipotecariaAbogado')
const [costeHipotecariaProcurador] = fieldStep4('masterData.costeHipotecariaProcurador')

// Campos específicos de NPL_BUY
const [costeHipotecariaOtros] = fieldStep4('masterData.costeHipotecariaOtros')
const [costeLanzamientoOtros] = fieldStep4('masterData.costeLanzamientoOtros')
const [deducibilidadIVA] = fieldStep4('masterData.deducibilidadIVA')
const [conpraCreditoNotaria] = fieldStep4('masterData.conpraCreditoNotaria')
const [conpraCreditoRegistro] = fieldStep4('masterData.conpraCreditoRegistro')
const [conpraCreditoGestion] = fieldStep4('masterData.conpraCreditoGestion')
const [adjudicacionRegistro] = fieldStep4('masterData.adjudicacionRegistro')
const [adjudicacionGestion] = fieldStep4('masterData.adjudicacionGestion')
const [mesesParaCobroSubasta] = fieldStep4('masterData.mesesParaCobroSubasta')

const handleNextStep = () => {
    const steps = {
        1: () => handleStep1(() => step.value++)(),
        2: () => {
            // Validar que se haya seleccionado buy o sell side
            if (activeSelection.value) {
                step.value++
            } else {
                toast({
                    variant: 'danger',
                    title: 'Selección requerida',
                    description: 'Por favor, selecciona Buy Side o Sell Side antes de continuar.'
                })
            }
        },
        3: () => {
            // Validar que no se haya seleccionado REO en Buy Side
            if (activeSelection.value === 'buy' && modelType.value === 'REO') {
                toast({
                    variant: 'danger',
                    title: 'Combinación no válida',
                    description: 'REO no está disponible para Buy Side. Por favor, selecciona NPL.'
                })
                return
            }

            step.value++
            // Recargar los datos cuando se pasa al paso 4, después de elegir el tipo de modelo
            getCompanyMasterData()
        },
        4: () => {
            console.log('Intentando enviar formulario...')
            console.log('apiModelType:', apiModelType.value)
            console.log('modelType:', modelType.value)
            console.log('activeSelection:', activeSelection.value)
            console.log('Errores de validación step4:', step4Errors.value)

            // Para NPL_BUY, bypasear la validación de VeeValidate y llamar directamente submitAnalysis
            if (apiModelType.value === 'NPL_BUY') {
                console.log('NPL_BUY detectado - bypasseando validación')
                submitAnalysis()
                return
            }

            // Log de valores de campos para NPL_BUY
            if (apiModelType.value === 'NPL_BUY') {
                console.log('Valores NPL_BUY:', {
                    costeHipotecariaAbogado: costeHipotecariaAbogado.value,
                    costeHipotecariaProcurador: costeHipotecariaProcurador.value,
                    costeHipotecariaOtros: costeHipotecariaOtros.value,
                    costeLanzamientoOtros: costeLanzamientoOtros.value,
                    deducibilidadIVA: deducibilidadIVA.value,
                    conpraCreditoNotaria: conpraCreditoNotaria.value,
                    conpraCreditoRegistro: conpraCreditoRegistro.value,
                    conpraCreditoGestion: conpraCreditoGestion.value,
                    adjudicacionRegistro: adjudicacionRegistro.value,
                    adjudicacionGestion: adjudicacionGestion.value,
                    mesesParaCobroSubasta: mesesParaCobroSubasta.value,
                })
            }

            // Para otros modelos, usar validación normal
            handleStep4(
                // Función de éxito
                (data) => {
                    console.log('Validación exitosa, ejecutando submitAnalysis...', data)
                    submitAnalysis()
                },
                // Función de error  
                (errors) => {
                    console.log('Errores de validación:', errors)
                }
            )()
        },
    }

    const currentStepHandler = steps[step.value as keyof typeof steps]
    currentStepHandler()
}

const getCompanyMasterData = async () => {
    try {
        // Define el path basado en el tipo de modelo seleccionado (usa apiModelType)
        const path = `company-master-data/${apiModelType.value}`;

        const { data: response } = await fenlabApi.post<CompanyMasterData>('', {
            method: 'get',
            path: path,
        })

        masterData.value = response

        console.log(response);

        setFormValues(response)
    } catch {
        toast({
            variant: 'danger',
            title: '¡Ups! Algo salió mal.',
        })
    }
}

// Modifica la función setFieldValue para asegurar que los valores sean numéricos
const setFormValues = (response: CompanyMasterData) => {
    setFieldValue('masterData.wacc', Number(response.WACC))
    setFieldValue('masterData.managementFee', Number(response.managementFee))

    if (modelType.value === 'REO') {
        setFieldValue('masterData.costeLanzamientoAbogado', Number(response.costeLanzamientoAbogado || 0))
        setFieldValue('masterData.costeLanzamientoProcurador', Number(response.costeLanzamientoProcurador || 0))
    } else { // NPL
        setFieldValue('masterData.costeHipotecariaAbogado', Number(response.costeHipotecariaAbogado || 0))
        setFieldValue('masterData.costeHipotecariaProcurador', Number(response.costeHipotecariaProcurador || 0))
    }

    // Campos específicos de NPL_BUY
    if (apiModelType.value === 'NPL_BUY') {
        const data = response as any // Usar any temporalmente para acceder a los nuevos campos
        setFieldValue('masterData.costeHipotecariaOtros', Number(data.costeHipotecariaOtros || 0))
        setFieldValue('masterData.costeLanzamientoOtros', Number(data.costeLanzamientoOtros || 0))
        setFieldValue('masterData.deducibilidadIVA', Number(data.deducibilidadIVA || 0))
        setFieldValue('masterData.conpraCreditoNotaria', Number(data.conpraCreditoNotaria || 0))
        setFieldValue('masterData.conpraCreditoRegistro', Number(data.conpraCreditoRegistro || 0))
        setFieldValue('masterData.conpraCreditoGestion', Number(data.conpraCreditoGestion || 0))
        setFieldValue('masterData.adjudicacionRegistro', Number(data.adjudicacionRegistro || 0))
        setFieldValue('masterData.adjudicacionGestion', Number(data.adjudicacionGestion || 0))
        setFieldValue('masterData.mesesParaCobroSubasta', Number(data.mesesParaCobroSubasta || 3))
    }
}

const submitAnalysis = async () => {
    console.log('submitAnalysis ejecutándose...')
    const loader = $loading?.show()

    try {
        // Crear el objeto de fee en el formato requerido
        // Usar buyFenciaFee para NPL_BUY, brokerFee para otros
        const feeFormatted: Record<string, { fee: number, cap: number }> = {};

        const feeSource = displayFeeData.value;

        if (feeSource) {
            const feeData = [...feeSource];
            // Asegurar que el último tramo siempre tenga un cap
            if (feeData.length > 0) {
                const lastIndex = feeData.length - 1;
                if (feeData[lastIndex].tramo === 'En Adelante' && !feeData[lastIndex].cap) {
                    feeData[lastIndex].cap = 999999999999;
                }
            }
            feeData.forEach((item, index) => {
                const tramoKey = item.tramo === 'En Adelante' ? (index + 1).toString() : item.tramo;
                feeFormatted[tramoKey] = {
                    fee: item.fee,
                    cap: item.cap || 999999999999
                };
            });
        }

        // Construir los datos macro desde la estructura actual
        const macroFormatted = masterData.value?.macro || [];

        // Convertir explícitamente a número
        const abogadoValue = parseFloat(String(costeLanzamientoAbogado.value)) || 0;
        const procuradorValue = parseFloat(String(costeLanzamientoProcurador.value)) || 0;
        const waccValue = apiModelType.value === 'NPL_BUY' ? 0 : parseFloat(String(wacc.value)) || 0;
        const managementFeeValue = apiModelType.value === 'NPL_BUY' ? 0 : parseFloat(String(managementFee.value)) || 0;

        // Luego usar estos valores en el objeto de datos
        const { data }: { data: ProjectById } = await fenlabApi.post('', {
            method: 'post',
            path: 'projects',
            body: {
                name: name.value,
                description: description.value,
                modelType: apiModelType.value, // Usar apiModelType en lugar de modelType
                masterData: {
                    macro: macroFormatted,
                    ...(apiModelType.value !== 'NPL_BUY' ? {
                        WACC: waccValue,
                        managementFee: managementFeeValue,
                    } : {}),
                    ...(modelType.value === 'REO' ? {
                        costeLanzamientoAbogado: parseFloat(String(costeLanzamientoAbogado.value)) || 0,
                        costeLanzamientoProcurador: parseFloat(String(costeLanzamientoProcurador.value)) || 0,
                    } : {
                        costeHipotecariaAbogado: parseFloat(String(costeHipotecariaAbogado.value)) || 0,
                        costeHipotecariaProcurador: parseFloat(String(costeHipotecariaProcurador.value)) || 0,
                    }),
                    costeLanzamientoOtros: masterData.value?.costeLanzamientoOtros || 0,
                    ...(apiModelType.value === 'NPL_BUY' ? {
                        buyFenciaFee: feeFormatted,
                    } : {
                        brokerFee: feeFormatted,
                    }),

                    // Campos específicos de NPL_BUY
                    ...(apiModelType.value === 'NPL_BUY' ? {
                        costeHipotecariaOtros: parseFloat(String(costeHipotecariaOtros.value)) || 0,
                        deducibilidadIVA: parseFloat(String(deducibilidadIVA.value)) || 0,
                        conpraCreditoNotaria: parseFloat(String(conpraCreditoNotaria.value)) || 0,
                        conpraCreditoRegistro: parseFloat(String(conpraCreditoRegistro.value)) || 0,
                        conpraCreditoGestion: parseFloat(String(conpraCreditoGestion.value)) || 0,
                        adjudicacionRegistro: parseFloat(String(adjudicacionRegistro.value)) || 0,
                        adjudicacionGestion: parseFloat(String(adjudicacionGestion.value)) || 0,
                        mesesParaCobroSubasta: parseFloat(String(mesesParaCobroSubasta.value)) || 3,
                    } : {}),

                    // Incluir successFee solo si el modelo es NPL o NPL_BUY
                    ...(apiModelType.value.includes('NPL') && masterData.value?.successFee ? {
                        successFee: masterData.value.successFee
                    } : {})
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
    }
}
</script>

<template>
    <Dialog v-model:open="isDialogOpen">
        <DialogTrigger as-child>
            <Button class="gap-1" variant="green" size="sm">
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
                <div v-show="step === 1" class="flex flex-col gap-10">
                    <div class="space-y-2">
                        <Label for="name">Nombre proyecto</Label>
                        <Input id="name" type="text" placeholder="Nombre proyecto" class="mt-2" v-model="name"
                            :class="{ 'border-red-500': step1Errors.name }" required autofocus autocomplete="name" />
                        <span v-if="step1Errors.name" class="text-red-500 text-sm">{{ step1Errors.name }}</span>
                    </div>

                    <div class="space-y-2">
                        <Label for="description">Descripción</Label>
                        <Textarea id="description" class="resize-none h-[112px]" placeholder="Descripción"
                            v-model="description" :class="{ 'border-red-500': step1Errors.description }" />
                        <span v-if="step1Errors.description" class="text-red-500 text-sm">{{ step1Errors.description
                            }}</span>
                    </div>
                </div>

                <div v-show="step === 2" class="flex flex-col gap-6">
                    <div role="button" class="flex items-center gap-4 p-3 bg-white rounded-sm cursor-pointer"
                        :class="{ 'text-electric-green [&_div]:text-electric-green bg-blue-sky border border-electric-green': activeSelection === 'buy' }"
                        @click="activeSelection = 'buy'">
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

                    <div role="button" class="flex items-center gap-4 p-3 bg-white rounded-sm cursor-pointer"
                        :class="{ 'text-electric-green [&_div]:text-electric-green bg-blue-sky border border-electric-green': activeSelection === 'sale' }"
                        @click="activeSelection = 'sale'">
                        <SellIcon />

                        <div class="text-grey">
                            <h3 class="text-lg font-bold">
                                Sell Side
                            </h3>

                            <p class="text-sm">
                                Modeliza en posición vendedora
                            </p>
                        </div>
                    </div>
                </div>

                <div v-show="step === 3" class="flex flex-col gap-6">
                    <div role="button"
                        class="flex items-center gap-4 p-3 bg-white rounded-sm opacity-50 cursor-not-allowed">
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

                    <div role="button"
                        class="flex items-center gap-4 p-3 bg-white rounded-sm opacity-50 cursor-not-allowed">
                        <Badge class="bg-[#EBE0F1]" variant="secondary">
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

                    <div role="button" class="flex items-center gap-4 p-3 bg-white rounded-sm"
                        :class="{ 'text-electric-green [&_div]:text-electric-green bg-blue-sky border border-electric-green': modelType === 'NPL' }"
                        @click="modelType = 'NPL'">
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

                    <div role="button" class="flex items-center gap-4 p-3 bg-white rounded-sm" :class="[
                        activeSelection === 'buy' ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer',
                        { 'text-electric-green [&_div]:text-electric-green bg-blue-sky border border-electric-green': modelType === 'REO' && activeSelection !== 'buy' }
                    ]" @click="activeSelection !== 'buy' && (modelType = 'REO')">
                        <Badge variant="default">
                            REO
                        </Badge>

                        <div class="flex-1 text-grey">
                            <h3 class="text-lg font-bold">
                                REO
                            </h3>

                            <p class="text-sm">
                                {{ activeSelection === 'buy' ? 'No disponible en Buy Side' : 'Modelo de recuperación judicial de activos inmobiliarios' }}
                            </p>
                        </div>
                    </div>
                </div>

                <div v-show="step === 4" class="flex flex-col gap-2 max-h-[600px] overflow-y-auto">
                    <Tabs default-value="macro">
                        <TabsList :class="apiModelType === 'NPL_BUY' ? 'grid grid-cols-3' : 'grid grid-cols-3'">
                            <TabsTrigger value="macro">
                                Macro
                            </TabsTrigger>
                            <TabsTrigger value="brokerGestion">
                                {{ apiModelType === 'NPL_BUY' ? 'Intermediación' : 'Broker Fee' }}
                            </TabsTrigger>
                            <!-- Para NPL_BUY mostramos Campos Adicionales en lugar de Success Fee -->
                            <TabsTrigger value="successFee"
                                v-if="apiModelType.includes('NPL') && apiModelType !== 'NPL_BUY'">
                                Success Fee
                            </TabsTrigger>
                            <TabsTrigger value="additionalFields" v-if="apiModelType === 'NPL_BUY'">
                                Campos Adicionales
                            </TabsTrigger>
                        </TabsList>
                        <TabsContent value="macro">
                            <!-- WACC y Management Fee solo para modelos que no sean NPL_BUY -->
                            <div v-if="apiModelType !== 'NPL_BUY'">
                                <div class="space-y-2 mb-6">
                                    <Label for="wacc">WACC - Coste de Capital (%)</Label>
                                    <Input id="wacc" type="text" placeholder="5" class="mt-2" v-percentage
                                        v-model="wacc" :class="{ 'border-red-500': step4Errors['masterData.wacc'] }"
                                        required autofocus autocomplete="wacc" min="0" />
                                    <span v-if="step4Errors['masterData.wacc']" class="text-red-500 text-sm">
                                        {{ step4Errors['masterData.wacc'] }}
                                    </span>
                                </div>

                                <div class="space-y-2 mb-8">
                                    <Label for="managementFee">Management fee (%)</Label>
                                    <Input id="managementFee" type="text" placeholder="5" class="mt-2" v-percentage
                                        v-model="managementFee"
                                        :class="{ 'border-red-500': step4Errors['masterData.managementFee'] }" required
                                        autofocus autocomplete="managementFee" min="0" />
                                    <span v-if="step4Errors['masterData.managementFee']" class="text-red-500 text-sm">
                                        {{ step4Errors['masterData.managementFee'] }}
                                    </span>
                                </div>
                            </div>

                            <!-- Sección de costes legales -->
                            <div class="mb-6">
                                <h3 class="text-base font-semibold mb-4 text-gray-800">
                                    {{ modelType === 'REO' ? 'Coste de lanzamiento' : "Coste proceso hipotecario + lanzamiento" }}
                                </h3>
                                <div class="flex gap-6">
                                    <div class="space-y-2 w-full" v-if="modelType === 'REO'">
                                        <Label for="costeLanzamientoAbogado">Abogado</Label>
                                        <Input id="costeLanzamientoAbogado" type="text" placeholder="500" class="mt-2"
                                            v-currency v-model="costeLanzamientoAbogado"
                                            :class="{ 'border-red-500': step4Errors['masterData.costeLanzamientoAbogado'] }"
                                            required autofocus autocomplete="costeLanzamientoAbogado" min="0" />
                                        <span v-if="step4Errors['masterData.costeLanzamientoAbogado']"
                                            class="text-red-500 text-sm">
                                            {{ step4Errors['masterData.costeLanzamientoAbogado'] }}
                                        </span>
                                    </div>

                                    <div class="space-y-2 w-full" v-if="modelType === 'NPL'">
                                        <Label for="costeHipotecariaAbogado">Abogado</Label>
                                        <Input id="costeHipotecariaAbogado" type="text" placeholder="500" class="mt-2"
                                            v-currency v-model="costeHipotecariaAbogado"
                                            :class="{ 'border-red-500': step4Errors['masterData.costeHipotecariaAbogado'] }"
                                            required autofocus autocomplete="costeHipotecariaAbogado" min="0" />
                                        <span v-if="step4Errors['masterData.costeHipotecariaAbogado']"
                                            class="text-red-500 text-sm">
                                            {{ step4Errors['masterData.costeHipotecariaAbogado'] }}
                                        </span>
                                    </div>

                                    <div class="space-y-2 w-full" v-if="modelType === 'REO'">
                                        <Label for="costeLanzamientoProcurador">Procurador</Label>
                                        <Input id="costeLanzamientoProcurador" type="text" placeholder="500"
                                            class="mt-2" v-currency v-model="costeLanzamientoProcurador"
                                            :class="{ 'border-red-500': step4Errors['masterData.costeLanzamientoProcurador'] }"
                                            required autofocus autocomplete="costeLanzamientoProcurador" min="0" />
                                        <span v-if="step4Errors['masterData.costeLanzamientoProcurador']"
                                            class="text-red-500 text-sm">
                                            {{ step4Errors['masterData.costeLanzamientoProcurador'] }}
                                        </span>
                                    </div>

                                    <div class="space-y-2 w-full" v-if="modelType === 'NPL'">
                                        <Label for="costeHipotecariaProcurador">Procurador</Label>
                                        <Input id="costeHipotecariaProcurador" type="text" placeholder="500"
                                            class="mt-2" v-currency v-model="costeHipotecariaProcurador"
                                            :class="{ 'border-red-500': step4Errors['masterData.costeHipotecariaProcurador'] }"
                                            required autofocus autocomplete="costeHipotecariaProcurador" min="0" />
                                        <span v-if="step4Errors['masterData.costeHipotecariaProcurador']"
                                            class="text-red-500 text-sm">
                                            {{ step4Errors['masterData.costeHipotecariaProcurador'] }}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <!-- Tabla Macro (solo lectura para todos los modelos) -->
                            <div class="mt-6">
                                <h3 class="text-lg font-semibold mb-4">Datos Macro</h3>
                                <Table>
                                    <TableHeader>
                                        <TableRow class="[&_th]:px-3 [&_th]:bg-white">
                                            <TableHead class="!bg-[#ECECEC] z-50 relative">AÑO</TableHead>
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
                        </TabsContent>
                        <TabsContent value="brokerGestion">
                            <!-- Tabla de solo lectura para todos los modelos -->
                            <Table class="max-w-[520px]">
                                <TableHeader>
                                    <TableRow class="[&_th]:px-3 [&_th]:bg-white">
                                        <TableHead class="!bg-[#ECECEC] z-50 relative">Tramo</TableHead>
                                        <TableHead>Fee (%)</TableHead>
                                        <TableHead>Desde</TableHead>
                                        <TableHead>Hasta</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    <TableRow class="[&_td]:px-3 [&_td]:bg-white !border-t border-[#ECECEC]"
                                        v-for="data in displayFeeData" :key="data.tramo">
                                        <TableCell class="!bg-[#ECECEC] font-bold">
                                            {{ data.tramo }}
                                        </TableCell>
                                        <TableCell>{{ formatPercentage(data.fee) }}</TableCell>
                                        <TableCell>{{ data.hurdle ? formatCurrency(data.hurdle) : "0" }}</TableCell>
                                        <TableCell>{{ data.cap ? formatCurrency(data.cap) : "-" }}</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>

                            <!-- Checkbox solo para NPL_BUY -->
                            <div v-if="apiModelType === 'NPL_BUY'" class="mt-4 flex items-center space-x-2">
                                <Checkbox id="noUsarFenciaFee" v-model:checked="noUsarFenciaFee" />
                                <Label for="noUsarFenciaFee"
                                    class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                    No usar Fencia Fee
                                </Label>
                            </div>
                        </TabsContent>
                        <TabsContent value="successFee" v-if="apiModelType.includes('NPL')">
                            <div class="mt-6">
                                <Table class="max-w-[520px]">
                                    <TableHeader>
                                        <TableRow class="[&_th]:px-3 [&_th]:bg-white">
                                            <TableHead class="!bg-[#ECECEC] z-50 relative">Tipo</TableHead>
                                            <TableHead>Fee (%)</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody v-if="masterData?.successFee">
                                        <TableRow class="[&_td]:px-3 [&_td]:bg-white !border-t border-[#ECECEC]">
                                            <TableCell class="!bg-[#ECECEC] font-bold">Venta Crédito</TableCell>
                                            <TableCell>{{ formatPercentage(masterData.successFee.ventaCredito) }}
                                            </TableCell>
                                        </TableRow>
                                        <TableRow class="[&_td]:px-3 [&_td]:bg-white !border-t border-[#ECECEC]">
                                            <TableCell class="!bg-[#ECECEC] font-bold">Subasta o Remate</TableCell>
                                            <TableCell>{{ formatPercentage(masterData.successFee.subastaOrRemate) }}
                                            </TableCell>
                                        </TableRow>
                                        <TableRow class="[&_td]:px-3 [&_td]:bg-white !border-t border-[#ECECEC]">
                                            <TableCell class="!bg-[#ECECEC] font-bold">Toma de posesión</TableCell>
                                            <TableCell>{{ formatCurrency(masterData.successFee.repossessedAsset) }}
                                            </TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </div>
                        </TabsContent>

                        <!-- Nuevo tab para Campos Adicionales de NPL_BUY -->
                        <TabsContent value="additionalFields" v-if="apiModelType === 'NPL_BUY'">
                            <div class="space-y-6 mt-4">
                                <!-- Primera fila -->
                                <div class="grid grid-cols-3 gap-4">
                                    <div class="space-y-2">
                                        <Label for="costeHipotecariaOtros">Coste Hipotecaria Otros</Label>
                                        <Input id="costeHipotecariaOtros" type="text" placeholder="200" class="mt-2"
                                            v-currency v-model="costeHipotecariaOtros"
                                            :class="{ 'border-red-500': step4Errors['masterData.costeHipotecariaOtros'] }"
                                            min="0" />
                                        <span v-if="step4Errors['masterData.costeHipotecariaOtros']"
                                            class="text-red-500 text-sm">
                                            {{ step4Errors['masterData.costeHipotecariaOtros'] }}
                                        </span>
                                    </div>

                                    <div class="space-y-2">
                                        <Label for="costeLanzamientoOtros">Coste Lanzamiento Otros</Label>
                                        <Input id="costeLanzamientoOtros" type="text" placeholder="100" class="mt-2"
                                            v-currency v-model="costeLanzamientoOtros"
                                            :class="{ 'border-red-500': step4Errors['masterData.costeLanzamientoOtros'] }"
                                            min="0" />
                                        <span v-if="step4Errors['masterData.costeLanzamientoOtros']"
                                            class="text-red-500 text-sm">
                                            {{ step4Errors['masterData.costeLanzamientoOtros'] }}
                                        </span>
                                    </div>

                                    <div class="space-y-2">
                                        <Label for="deducibilidadIVA">Deducibilidad IVA (%)</Label>
                                        <Input id="deducibilidadIVA" type="text" placeholder="100" class="mt-2"
                                            v-percentage v-model="deducibilidadIVA"
                                            :class="{ 'border-red-500': step4Errors['masterData.deducibilidadIVA'] }"
                                            min="0" />
                                        <span v-if="step4Errors['masterData.deducibilidadIVA']"
                                            class="text-red-500 text-sm">
                                            {{ step4Errors['masterData.deducibilidadIVA'] }}
                                        </span>
                                    </div>
                                </div>

                                <!-- Segunda fila -->
                                <div class="grid grid-cols-3 gap-4">
                                    <div class="space-y-2">
                                        <Label for="conpraCreditoNotaria">Compra Crédito Notaría</Label>
                                        <Input id="conpraCreditoNotaria" type="text" placeholder="600" class="mt-2"
                                            v-currency v-model="conpraCreditoNotaria"
                                            :class="{ 'border-red-500': step4Errors['masterData.conpraCreditoNotaria'] }"
                                            min="0" />
                                        <span v-if="step4Errors['masterData.conpraCreditoNotaria']"
                                            class="text-red-500 text-sm">
                                            {{ step4Errors['masterData.conpraCreditoNotaria'] }}
                                        </span>
                                    </div>

                                    <div class="space-y-2">
                                        <Label for="conpraCreditoRegistro">Compra Crédito Registro</Label>
                                        <Input id="conpraCreditoRegistro" type="text" placeholder="500" class="mt-2"
                                            v-currency v-model="conpraCreditoRegistro"
                                            :class="{ 'border-red-500': step4Errors['masterData.conpraCreditoRegistro'] }"
                                            min="0" />
                                        <span v-if="step4Errors['masterData.conpraCreditoRegistro']"
                                            class="text-red-500 text-sm">
                                            {{ step4Errors['masterData.conpraCreditoRegistro'] }}
                                        </span>
                                    </div>

                                    <div class="space-y-2">
                                        <Label for="conpraCreditoGestion">Compra Crédito Gestión</Label>
                                        <Input id="conpraCreditoGestion" type="text" placeholder="350" class="mt-2"
                                            v-currency v-model="conpraCreditoGestion"
                                            :class="{ 'border-red-500': step4Errors['masterData.conpraCreditoGestion'] }"
                                            min="0" />
                                        <span v-if="step4Errors['masterData.conpraCreditoGestion']"
                                            class="text-red-500 text-sm">
                                            {{ step4Errors['masterData.conpraCreditoGestion'] }}
                                        </span>
                                    </div>
                                </div>

                                <!-- Tercera fila -->
                                <div class="grid grid-cols-3 gap-4">
                                    <div class="space-y-2">
                                        <Label for="adjudicacionRegistro">Adjudicación Registro</Label>
                                        <Input id="adjudicacionRegistro" type="text" placeholder="500" class="mt-2"
                                            v-currency v-model="adjudicacionRegistro"
                                            :class="{ 'border-red-500': step4Errors['masterData.adjudicacionRegistro'] }"
                                            min="0" />
                                        <span v-if="step4Errors['masterData.adjudicacionRegistro']"
                                            class="text-red-500 text-sm">
                                            {{ step4Errors['masterData.adjudicacionRegistro'] }}
                                        </span>
                                    </div>

                                    <div class="space-y-2">
                                        <Label for="adjudicacionGestion">Adjudicación Gestión</Label>
                                        <Input id="adjudicacionGestion" type="text" placeholder="175" class="mt-2"
                                            v-currency v-model="adjudicacionGestion"
                                            :class="{ 'border-red-500': step4Errors['masterData.adjudicacionGestion'] }"
                                            min="0" />
                                        <span v-if="step4Errors['masterData.adjudicacionGestion']"
                                            class="text-red-500 text-sm">
                                            {{ step4Errors['masterData.adjudicacionGestion'] }}
                                        </span>
                                    </div>

                                    <div class="space-y-2">
                                        <Label for="mesesParaCobroSubasta">Meses para Cobro Subasta</Label>
                                        <Input id="mesesParaCobroSubasta" type="number" placeholder="3" class="mt-2"
                                            v-model="mesesParaCobroSubasta"
                                            :class="{ 'border-red-500': step4Errors['masterData.mesesParaCobroSubasta'] }"
                                            min="1" />
                                        <span v-if="step4Errors['masterData.mesesParaCobroSubasta']"
                                            class="text-red-500 text-sm">
                                            {{ step4Errors['masterData.mesesParaCobroSubasta'] }}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </TabsContent>
                    </Tabs>
                </div>
            </div>

            <DialogFooter class="flex justify-between mt-10">
                <Button class="w-full" :class="step === 1 ? 'invisible' : ''" variant="ghost" size="sm" @click="step--">
                    <ArrowIcon class="sm:mr-2 text-blue" variant="left" />

                    <span class="hidden sm:inline">
                        Anterior
                    </span>
                </Button>

                <Button class="w-full" size="sm" @click="handleNextStep">
                    <span class="hidden sm:inline">
                        {{ step < 4 ? 'Siguiente' : 'Finalizar' }} </span>

                            <ArrowIcon v-if="step < 4" class="sm:ml-2 text-white" variant="right" />
                </Button>
            </DialogFooter>
        </DialogContent>
    </Dialog>
</template>
