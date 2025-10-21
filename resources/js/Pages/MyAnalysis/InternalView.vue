<script setup lang="ts">
import { inject, ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { Head, Link, router, usePage } from '@inertiajs/vue3'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue'

import {
    Button,
    Badge,
    Stepper,
    StepperDescription,
    StepperItem,
    StepperSeparator,
    StepperTitle,
    StepperTrigger,
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
    badgeMap,
    BadgeMode,
    toast,
} from '@/Components/ui'

import { useDropZone } from '@vueuse/core'
import { ArrowIcon, InfoIcon, XlsIcon, ZipIcon, DownloadIcon, ArrowUpIcon, CircleIcon, UploadIcon } from '@/Components/icons'
import { UpdateIcon } from '@radix-icons/vue'
import { Assets } from '@/Pages/MyAnalysis/Components/assets'
import { ProjectById } from '@/types/fenlab'
import { ProjectsAssets, ExcelResponse } from './types'
import { PluginApi } from 'vue-loading-overlay'
import { fenlabApi } from '@/api'
import { useDateFormat } from '@vueuse/core'
import { PageProps } from '@/types'

const props = defineProps<{
    project: ProjectById
    assets: ProjectsAssets
}>()

const $loading = inject<PluginApi>('$loading')
const activeTab = ref('analysis')
const filesData = ref<{ file: File, name: string, size: number, type: string, lastModified: number }[]>([])
const dropZoneRef = ref<HTMLDivElement>()
const fileInput = ref<HTMLInputElement | null>(null)
const fileError = ref('')
const refreshInterval = ref<number | null>(null)

// Función para refrescar la página
const refreshPage = () => {
    // Solo refrescar si el análisis está en curso o si estamos en la pestaña de análisis
    if (props.project.status === 'Análisis en curso' || activeTab.value === 'analysis') {
        // El método reload() no acepta options de preserveScroll/preserveState
        // Usar visit() en su lugar
        router.visit(window.location.href, {
            preserveScroll: true,
            preserveState: false
        })
    }
}

// Configurar el intervalo de refresco cuando se monta el componente
onMounted(() => {
    // Refrescar cada 5 minutos (300000 ms)
    refreshInterval.value = window.setInterval(refreshPage, 120000) // Cambiar a 300000 para 5 minutos

    // También podríamos ajustar el intervalo según el estado
    if (props.project.status === 'Análisis en curso') {
        // Si el análisis está en curso, refrescar más frecuentemente (por ejemplo, cada 2 minutos)
        clearInterval(refreshInterval.value)
        refreshInterval.value = window.setInterval(refreshPage, 120000) // Cambiar a 120000 para 2 minutos
    }
})

// Limpiar el intervalo cuando el componente se desmonta para evitar fugas de memoria
onBeforeUnmount(() => {
    if (refreshInterval.value !== null) {
        clearInterval(refreshInterval.value)
    }
})

const steps = [
    {
        step: 1,
        title: 'Carga Cliente',
        description: useDateFormat(props.project.createdAt, 'DD/MM/YYYY'),
    },
    {
        step: 2,
        title: 'Análisis Fenlab',
        description: '',
    },
    {
        step: 3,
        title: 'Carga definitiva',
        description: '',
    },
]

const isAdmin = computed(() => {
    const page = usePage<PageProps>()
    console.log('ROL', page.props.auth.salesforceUser.rols)
    return page.props.auth.salesforceUser.rols === 'Admin'
})

const currentStep = computed(() => {
    switch (props.project.status) {
        case 'Sin empezar':
            return 1
        case 'Análisis completo':
        case 'Análisis en curso':
            return 2
        case 'Carga definitiva':
            return 3
        default:
            return 1
    }
})

const isStepDisabled = (step: number) => {
    const statusOrder = {
        'Sin empezar': 1,
        'Análisis en curso': 2,
        'Análisis completo': 2,
        'Carga definitiva': 3,
    }
    const currentStatusLevel = statusOrder[props.project.status as keyof typeof statusOrder]
    return step !== currentStatusLevel
}

function onDrop(files: File[] | null) {
    filesData.value = []
    if (files) {
        filesData.value = files.map(file => ({
            file,
            name: file.name,
            size: file.size,
            type: file.type,
            lastModified: file.lastModified,
        }))
        if (isAdmin.value && props.project.status === 'Análisis en curso') {
            // uploadIdealistaFile()
        } else {
            uploadFile()
        }
    }
}

const { isOverDropZone } = useDropZone(dropZoneRef, onDrop)

function handleFileChange(event: Event) {
    const target = event.target as HTMLInputElement
    if (target.files && target.files.length > 0) {
        onDrop(Array.from(target.files))
    }
}

const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

function openFileDialog() {
    if (fileInput.value) {
        fileInput.value.click()
    }
}

const excelType = computed(() => {
    return props.project.status === 'Análisis completo' ? 'second-excel' : 'first-excel'
})

async function uploadFile() {
    fileError.value = ''

    if (filesData.value.length === 0) {
        fileError.value = 'No se ha seleccionado ningún archivo.'
        return
    }

    const loader = $loading?.show()
    const formData = new FormData()
    formData.append('method', 'post')
    formData.append('path', `projects/${props.project.id}/${props.project.modelType}/${excelType.value}`)
    formData.append('file', filesData.value[0].file)

    try {
        const response = await fenlabApi.post<ExcelResponse>('', formData)
        if (!response.data.success) {
            const errorMessages = response.data.errors.list.map((err) => `${err.header}: ${err.error}`).join('\n')
            fileError.value = `Error en el archivo "${filesData.value[0].name}":\n${errorMessages}`
            // Reset file data after error
            filesData.value = []
            if (fileInput.value) fileInput.value.value = ''
            return
        }

        if (excelType.value === 'second-excel') {
            await fenlabApi.post('/import', response.data.prestashopData)
        }

        toast({
            variant: 'info',
            title: 'Archivo subido correctamente',
        })
        filesData.value = []
        if (fileInput.value) fileInput.value.value = ''
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        fileError.value = `Error al subir el archivo "${filesData.value[0].name}": ${error.response?.data?.message?.join('\n') || 'Error desconocido'}`
        // Reset file data after error
        filesData.value = []
        if (fileInput.value) fileInput.value.value = ''
    } finally {
        loader?.hide()
        router.reload()
    }
}

async function uploadIdealistaFile() {
    fileError.value = ''

    if (filesData.value.length === 0) {
        fileError.value = 'No se ha seleccionado ningún archivo.'
        return
    }

    const loader = $loading?.show()
    const formData = new FormData()
    formData.append('method', 'post')
    formData.append('path', `projects/${props.project.id}/idealista-excel`)
    formData.append('file', filesData.value[0].file)

    try {
        const response = await fenlabApi.post<ExcelResponse>('', formData)
        if (!response.data.success) {
            const errorMessages = response.data.errors.list.map((err) => `${err.header}: ${err.error}`).join('\n')
            fileError.value = `Error en el archivo "${filesData.value[0].name}":\n${errorMessages}`
            // Reset file data after error
            filesData.value = []
            if (fileInput.value) fileInput.value.value = ''
            return
        }

        // Call model API after successful idealista upload
        const modelResponse = await fenlabApi.post<ExcelResponse>('', {
            method: 'post',
            path: `projects/${props.project.id}/${props.project.modelType}/model`,
        })

        if (!modelResponse.data.success) {
            fileError.value = 'Error al procesar el modelo'
            // Reset file data after error
            filesData.value = []
            if (fileInput.value) fileInput.value.value = ''
            return
        }

        toast({
            variant: 'info',
            title: 'Archivo procesado correctamente',
        })
        filesData.value = []
        if (fileInput.value) fileInput.value.value = ''

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        fileError.value = `Error al procesar el archivo "${filesData.value[0].name}": ${error.response?.data?.message?.join('\n') || 'Error desconocido'}`
        // Reset file data after error
        filesData.value = []
        if (fileInput.value) fileInput.value.value = ''
    } finally {
        loader?.hide()
        router.reload()
    }
}

// Computed para determinar si la subida está bloqueada
const isUploadBlocked = computed(() => {
    return props.project.status === 'Análisis completo' && !props.project.outputBBDD
})

// Computed para el mensaje de bloqueo
const blockedMessage = computed(() => {
    if (isUploadBlocked.value) {
        return 'Análisis completado. No se permiten más cargas para este tipo de análisis.'
    }
    return ''
})
</script>

<template>

    <Head title="Mis Análisis" />

    <AuthenticatedLayout>
        <header class="flex flex-col sm:flex-row justify-between items-center gap-4 mb-10">
            <div class="flex items-center gap-4">
                <Button variant="ghost" as-child size="sm">
                    <Link :href="route('analysis')">
                    <ArrowIcon class="sm:mr-2 text-black" variant="left" />

                    <span class="hidden sm:inline capitalize">
                        {{ project.name }}
                    </span>
                    </Link>
                </Button>

                <Badge :variant="badgeMap[project.modelType as BadgeMode]" size="sm">
                    {{ project.modelType }}
                </Badge>

                <UpdateIcon v-if="currentStep == 2" class="h-4 w-4 text-black animate-spin" />

                <InfoIcon v-else />

                <Badge :variant="badgeMap[project.status as BadgeMode]" size="sm">
                    {{ project.status }}
                </Badge>
            </div>

            <!-- download button -->
            <!-- <Button
                v-if="activeTab === 'assets'"
                variant="outline"
                size="sm"
            >
                Descargar análisis

                <DownloadIcon class="ml-3 text-electric-green" />
            </Button> -->
        </header>


        <Stepper v-model="currentStep" :allow-click="false" class="flex w-full items-start gap-2 my-10">
            <StepperItem v-for="step in steps" :key="step.step" v-slot="{ state }"
                class="relative flex w-full flex-col items-center justify-center" :step="step.step">
                <StepperSeparator v-if="step.step !== steps[steps.length - 1].step"
                    class="absolute left-[calc(50%+20px)] right-[calc(-50%+10px)] top-5 block h-0.5 shrink-0 rounded-full bg-[#686868]/30 group-data-[state=completed]:bg-electric-green" />

                <StepperTrigger as-child>
                    <Button variant="green" size="icon" class="z-10 rounded-full shrink-0" :class="[
                        state === 'active',
                        state === 'inactive' && 'bg-[#686868]/50',
                        isStepDisabled(step.step) && 'opacity-50 cursor-not-allowed'
                    ]" :disabled="isStepDisabled(step.step)">
                        {{ step.step }}
                    </Button>
                </StepperTrigger>

                <div class="mt-5 flex flex-col items-center text-center">
                    <StepperTitle class="text-sm font-semibold transition lg:text-base">
                        {{ step.title }}
                    </StepperTitle>
                    <StepperDescription class="sr-only text-xs text-black transition md:not-sr-only lg:text-sm">
                        {{ step.description }}
                    </StepperDescription>
                </div>
            </StepperItem>
        </Stepper>

        <Tabs default-value="analysis" v-model:model-value="activeTab">
            <TabsList class="grid w-[274px] grid-cols-2">
                <TabsTrigger value="analysis">
                    Análisis
                </TabsTrigger>
                <TabsTrigger value="assets">
                    Activos
                </TabsTrigger>
            </TabsList>
            <TabsContent value="analysis">
                <div class="my-4 p-6 bg-white rounded-sm border border-[#E5E7EB] shadow-sm">
                    <p v-html="project.instructions" class="whitespace-pre-line text-gray-700 leading-relaxed" />
                </div>

                <div v-if="project.status === 'Análisis en curso'" class="my-4 p-8 bg-white">
                    <div class="flex items-center justify-center gap-3">
                        <UpdateIcon class="h-6 w-6 text-black animate-spin" />
                        <span class="text-grey">Análisis en curso</span>
                    </div>
                </div>
                <div v-else-if="project.status !== 'Carga definitiva'" class="my-4 p-2 bg-white">
                    <div v-if="fileError" class="mb-4 p-4 bg-red-50 border border-red-200 rounded-sm text-red-600"
                        style="white-space: pre-line">
                        {{ fileError }}
                    </div>

                    <!-- Mensaje de bloqueo cuando análisis completo sin outputBBDD -->
                    <div v-if="isUploadBlocked"
                        class="mb-4 p-4 bg-yellow-50 border border-yellow-200 rounded-sm text-yellow-700">
                        {{ blockedMessage }}
                    </div>

                    <div ref="dropZoneRef"
                        class="grid place-items-center p-5 border-2 border-dashed border-[#C1C1C1] rounded-sm" :class="[

                            isOverDropZone && !isUploadBlocked && 'border-electric-green',
                            fileError && 'border-red-300',
                            isUploadBlocked && 'border-gray-300 bg-gray-50 opacity-50 cursor-not-allowed'
                        ]" @click="!isUploadBlocked && openFileDialog()"
                        :role="!isUploadBlocked ? 'button' : undefined">
                        <template v-if="filesData.length === 0">
                            <p class="flex items-center gap-2 mb-5 text-grey text-sm"
                                :class="isUploadBlocked && 'text-gray-400'">
                                <span v-if="!isUploadBlocked">
                                    Arrastra aquí tu archivo excel cumplimentado o haz clic para seleccionarlo
                                </span>
                                <span v-else>
                                    Análisis completado - No se permiten más cargas
                                </span>
                                <CircleIcon variant="help" v-if="!isUploadBlocked" />
                            </p>
                            <Button variant="green" size="xs" @click.stop="!isUploadBlocked && openFileDialog()"
                                :disabled="isUploadBlocked" :class="isUploadBlocked && 'opacity-50 cursor-not-allowed'">
                                <UploadIcon class="mr-2" />
                                <span v-if="!isUploadBlocked">Adjuntar archivo</span>
                                <span v-else>Subida no disponible</span>
                            </Button>
                        </template>
                        <template v-else>
                            <div class="w-full mb-4">
                                <div v-for="file in filesData" :key="file.name"
                                    class="flex items-center justify-between p-2 bg-gray-50 rounded">
                                    <div class="flex items-center gap-2">
                                        <XlsIcon class="w-5 h-5" />
                                        <span class="text-sm font-medium">{{ file.name }}</span>
                                    </div>
                                    <span class="text-xs text-gray-500">{{ formatFileSize(file.size) }}</span>
                                </div>
                            </div>
                        </template>

                        <input type="file" ref="fileInput" @change="handleFileChange" class="hidden" accept=".xlsx,.xls"
                            :disabled="isUploadBlocked">
                    </div>
                </div>

                <div class="flex justify-center items-center">
                    <ArrowUpIcon v-if="project.cfConso" />
                </div>

                <div v-if="project.cfConso" class="my-4">
                    <div class="relative flex items-center gap-4 w-full p-4 bg-white ">
                        <XlsIcon v-if="project.cfConso.extension == 'xlsx'" />

                        <div>
                            <p class="text-black text-lg font-bold">
                                {{ project.cfConso.title }}
                            </p>
                            <p class="text-grey text-sm">
                                {{ project.cfConso.description }}
                            </p>
                        </div>

                        <Button v-if="project.cfConso.url" variant="ghost" size="xs" as-child>
                            <a class="absolute top-4 right-4" :href="project.cfConso.url" target="_blank"
                                rel="noopener noreferrer">
                                <DownloadIcon />
                            </a>
                        </Button>
                    </div>
                </div>

                <div class="flex justify-center items-center">
                    <ArrowUpIcon v-if="project.secondExcel" />
                </div>

                <div v-if="project.secondExcel" class="my-4">
                    <div class="relative flex items-center gap-4 w-full p-4 bg-white ">
                        <XlsIcon v-if="project.secondExcel.extension == 'xlsx'" />

                        <div>
                            <p class="text-black text-lg font-bold">
                                {{ project.secondExcel.title }}
                            </p>
                            <p class="text-grey text-sm">
                                {{ project.secondExcel.description }}
                            </p>
                        </div>

                        <Button v-if="project.secondExcel.url" variant="ghost" size="xs" as-child>
                            <a class="absolute top-4 right-4" :href="project.secondExcel.url" target="_blank"
                                rel="noopener noreferrer">
                                <DownloadIcon />
                            </a>
                        </Button>
                    </div>
                </div>

                <div class="flex justify-center items-center">
                    <ArrowUpIcon v-if="project.secondExcel" />
                </div>

                <section v-if="project.assetsZip || project.outputBBDD || project.strats"
                    class="my-4 bg-white border-2 border-[#e3d9a3] rounded-[5px]">
                    <h3 class="px-4 pt-4 text-lg font-bold">
                        Resultados del análisis
                    </h3>

                    <div v-if="project.assetsZip" class="relative flex items-center gap-4 w-full p-4">
                        <ZipIcon />
                        <div>
                            <p class="text-black text-lg font-bold">
                                {{ project.assetsZip.title }}
                            </p>
                            <p class="text-grey text-sm">
                                {{ project.assetsZip.description }}
                            </p>
                        </div>
                        <Button v-if="project.assetsZip.url" variant="ghost" size="xs" as-child>
                            <a class="absolute top-4 right-4" :href="project.assetsZip.url" target="_blank"
                                rel="noopener noreferrer">
                                <DownloadIcon />
                            </a>
                        </Button>
                    </div>

                    <div v-if="project.assetsPowerpointsZip" class="relative flex items-center gap-4 w-full p-4">
                        <ZipIcon />
                        <div>
                            <p class="text-black text-lg font-bold">
                                {{ project.assetsPowerpointsZip.title }}
                            </p>
                            <p class="text-grey text-sm">
                                {{ project.assetsPowerpointsZip.description }}
                            </p>
                        </div>
                        <Button v-if="project.assetsPowerpointsZip.url" variant="ghost" size="xs" as-child>
                            <a class="absolute top-4 right-4" :href="project.assetsPowerpointsZip.url" target="_blank"
                                rel="noopener noreferrer">
                                <DownloadIcon />
                            </a>
                        </Button>
                    </div>

                    <div v-if="project.outputBBDD" class="relative flex items-center gap-4 w-full p-4">
                        <XlsIcon v-if="project.outputBBDD.extension == 'xlsx'" />

                        <div>
                            <p class="text-black text-lg font-bold">
                                {{ project.outputBBDD.title }}
                            </p>
                            <p class="text-grey text-sm">
                                {{ project.outputBBDD.description }}
                            </p>
                        </div>

                        <Button v-if="project.outputBBDD.url" variant="ghost" size="xs" as-child>
                            <a class="absolute top-4 right-4" :href="project.outputBBDD.url" target="_blank"
                                rel="noopener noreferrer">
                                <DownloadIcon />
                            </a>
                        </Button>
                    </div>

                    <div v-if="project.strats" class="relative flex items-center gap-4 w-full p-4">
                        <XlsIcon v-if="project.strats.extension == 'xlsx'" />

                        <div>
                            <p class="text-black text-lg font-bold">
                                {{ project.strats.title }}
                            </p>
                            <p class="text-grey text-sm">
                                {{ project.strats.description }}
                            </p>
                        </div>

                        <Button v-if="project.strats.url" variant="ghost" size="xs" as-child>
                            <a class="absolute top-4 right-4" :href="project.strats.url" target="_blank"
                                rel="noopener noreferrer">
                                <DownloadIcon />
                            </a>
                        </Button>
                    </div>
                </section>

                <div class="flex justify-center items-center">
                    <ArrowUpIcon v-if="project.firstExcel" />
                </div>

                <div v-if="project.firstExcel" class="my-4">
                    <div class="relative flex items-center gap-4 w-full p-4 bg-white ">
                        <XlsIcon v-if="project.firstExcel.extension == 'xlsx'" />

                        <div>
                            <p class="text-black text-lg font-bold">
                                {{ project.firstExcel.title }}
                            </p>
                            <p class="text-grey text-sm">
                                {{ project.firstExcel.description }}
                            </p>
                        </div>

                        <Button v-if="project.firstExcel.url" variant="ghost" size="xs" as-child>
                            <a class="absolute top-4 right-4" :href="project.firstExcel.url" target="_blank"
                                rel="noopener noreferrer">
                                <DownloadIcon />
                            </a>
                        </Button>
                    </div>
                </div>

                <div class="flex justify-center items-center">
                    <ArrowUpIcon v-if="project.template" />
                </div>

                <div v-if="project.template" class="my-4">
                    <div class="relative flex items-center gap-4 w-full p-4 bg-white ">
                        <XlsIcon v-if="project.template.extension == 'xlsx'" />

                        <div>
                            <p class="text-black text-lg font-bold">
                                {{ project.template.title }}
                            </p>
                            <p class="text-grey text-sm">
                                {{ project.template.description }}
                            </p>
                        </div>

                        <Button v-if="project.template.url" variant="ghost" size="xs" as-child>
                            <a class="absolute top-4 right-4" :href="project.template.url" target="_blank"
                                rel="noopener noreferrer">
                                <DownloadIcon />
                            </a>
                        </Button>
                    </div>
                </div>
            </TabsContent>
            <TabsContent value="assets">
                <Assets :assets="assets.data" />
            </TabsContent>
        </Tabs>
    </AuthenticatedLayout>
</template>
