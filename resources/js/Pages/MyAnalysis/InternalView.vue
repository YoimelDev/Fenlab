<script setup lang="ts">
import { inject, ref, computed } from 'vue'
import { Head, Link, router } from '@inertiajs/vue3'
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
import { ArrowIcon, InfoIcon, XlsIcon, DownloadIcon, ArrowUpIcon, CircleIcon, UploadIcon } from '@/Components/icons'
import { UpdateIcon } from '@radix-icons/vue'
import { Assets } from '@/Pages/MyAnalysis/Components/assets'
import { ProjectById } from '@/types/fenlab'
import { ProjectsAssets, ApiErrorResponse } from './types'
import { PluginApi } from 'vue-loading-overlay'
import { fenlabApi } from '@/api'
import { useDateFormat } from '@vueuse/core'

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

const currentStep = computed(() => {
    switch (props.project.status) {
        case 'Sin empezar':
            return 1
        case 'Análisis en curso':
            return 2
        case 'Análisis completo':
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

async function uploadFile(event: Event) {
    event.stopPropagation()
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
        const response = await fenlabApi.post<ApiErrorResponse>('', formData)
        if (!response.data.success) {
            const errorMessages = response.data.errors.list.map((err) => `${err.header}: ${err.error}`).join('\n')
            fileError.value = errorMessages
            return
        }
        toast({
            variant: 'info',
            title: 'Archivo subido correctamente',
        })
        filesData.value = []
        if (fileInput.value) fileInput.value.value = ''
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        fileError.value = error.response?.data?.message?.join('\n') || 'Error al subir el archivo'
    } finally {
        loader?.hide()
        router.reload()
    }
}
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
                <div class="my-4 p-2 bg-white">
                    <!-- Add error message display -->
                    <div v-if="fileError" class="mb-4 p-4 bg-red-50 border border-red-200 rounded-sm text-red-600"
                        style="white-space: pre-line">
                        {{ fileError }}
                    </div>

                    <div ref="dropZoneRef"
                        class="grid place-items-center p-5 border-2 border-dashed border-[#C1C1C1] rounded-sm"
                        :class="[isOverDropZone && 'border-electric-green', fileError && 'border-red-300']"
                        @click="openFileDialog" role="button">
                        <template v-if="filesData.length === 0">
                            <p class="flex items-center gap-2 mb-5 text-grey text-sm">
                                Arrastra aquí tu archivo excel cumplimentado
                                <CircleIcon variant="help" />
                            </p>
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

                        <input type="file" ref="fileInput" @change="handleFileChange" class="hidden"
                            accept=".xlsx,.xls">

                        <Button variant="green" size="xs" @click="uploadFile">
                            <UploadIcon class="mr-2" />
                            {{ filesData.length === 0 ? 'Cargar excel' : 'Subir archivo' }}
                        </Button>
                    </div>
                </div>

                <ArrowUpIcon v-if="project.outputBBDD" />

                <div v-if="project.outputBBDD" class="my-4">
                    <div class="relative flex items-center gap-4 w-full p-4 bg-white ">
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
                </div>

                <ArrowUpIcon v-if="project.firstExcel" />

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

                <ArrowUpIcon v-if="project.template" />

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