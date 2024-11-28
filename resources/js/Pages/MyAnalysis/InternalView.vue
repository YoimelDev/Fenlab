<script setup lang="ts">
import { ref } from 'vue'
import { Head, Link } from '@inertiajs/vue3'
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
import { Assets } from '@/Pages/MyAnalysis/Components/assets'
import { ProjectById } from '@/types/fenlab'
import { ProjectsAssets } from './types'
import { fenlabApi } from '@/api'

const props = defineProps<{
    project: ProjectById
    assets: ProjectsAssets
}>()

const activeTab = ref('analysis')
const filesData = ref<{ file: File, name: string, size: number, type: string, lastModified: number }[]>([])
const dropZoneRef = ref<HTMLDivElement>()
const fileInput = ref<HTMLInputElement | null>(null)

const steps = [
    {
        step: 1,
        title: 'Carga Cliente',
        description: '19/08/2024',
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

// function openFileDialog() {
//     if (fileInput.value) {
//         fileInput.value.click()
//     }
// }

async function uploadFile() {
    if (filesData.value.length > 0) {
        const formData = new FormData()
        formData.append('method', 'post')
        formData.append('path', `projects/${props.project.id}/${props.project.modelType}/first-excel`)
        formData.append('file', filesData.value[0].file)

        try {
            await fenlabApi.post('', formData)

            toast({
                variant: 'info',
                title: 'Archivo subido correctamente',
            })
            
            // Clear the file input and filesData after successful upload
            filesData.value = []
            if (fileInput.value) fileInput.value.value = ''
            
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            toast({
                variant: 'danger',
                title: '¡Ups! Algo salió mal.',
                description: error.response.data.message.join('\n'),
            })
        }
    } else {
        toast({
            variant: 'danger',
            title: '¡Ups! Algo salió mal.',
            description: 'No se ha seleccionado ningún archivo.',
        })
    }
}
</script>

<template>
    <Head title="Mis Análisis" />

    <AuthenticatedLayout>
        <header class="flex flex-col sm:flex-row justify-between items-center gap-4 mb-10">
            <div class="flex items-center gap-4">
                <Button
                    variant="ghost"
                    as-child
                    size="sm"
                >
                    <Link
                        :href="route('analysis')"
                    >
                        <ArrowIcon
                            class="sm:mr-2 text-black"
                            variant="left"
                        />

                        <span class="hidden sm:inline capitalize">
                            {{ project.name }}
                        </span>
                    </Link>
                </Button>

                <Badge
                    :variant="badgeMap[project.modelType as BadgeMode]"
                    size="sm"
                >
                    {{ project.modelType }}
                </Badge>

                <InfoIcon />

                <Badge
                    :variant="badgeMap[project.status as BadgeMode]"
                    size="sm"
                >
                    {{ project.status }}
                </Badge>
            </div>

            <!-- download button -->
            <Button
                v-if="activeTab === 'assets'"
                variant="outline"
                size="sm"
            >
                Descargar análisis

                <DownloadIcon class="ml-3 text-electric-green" />
            </Button>
        </header>

       
        <Stepper class="flex w-full items-start gap-2 my-10">
            <StepperItem
                v-for="step in steps"
                :key="step.step"
                v-slot="{ state }"
                class="relative flex w-full flex-col items-center justify-center"
                :step="step.step"
            >
                <StepperSeparator
                    v-if="step.step !== steps[steps.length - 1].step"
                    class="absolute left-[calc(50%+20px)] right-[calc(-50%+10px)] top-5 block h-0.5 shrink-0 rounded-full bg-muted group-data-[state=completed]:bg-electric-green"
                />
            
                <StepperTrigger as-child>
                    <Button
                        variant="green"
                        size="icon"
                        class="z-10 rounded-full shrink-0"
                        :class="[state === 'active', state === 'inactive' && 'bg-[#686868]/50']"
                    >
                        {{ step.step }}
                    </Button>
                </StepperTrigger>
            
                <div class="mt-5 flex flex-col items-center text-center">
                    <StepperTitle
                        class="text-sm font-semibold transition lg:text-base"
                    >
                        {{ step.title }}
                    </StepperTitle>
                    <StepperDescription
                        class="sr-only text-xs text-black transition md:not-sr-only lg:text-sm"
                    >
                        {{ step.description }}
                    </StepperDescription>
                </div>
            </StepperItem>
        </Stepper>

        <Tabs
            default-value="analysis"
            v-model:model-value="activeTab"
        >
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
                    <div
                        ref="dropZoneRef"
                        class="grid place-items-center p-5 border-2 border-dashed border-[#C1C1C1] rounded-sm"
                        :class="[isOverDropZone && 'border-electric-green']"
                    >
                        <template v-if="filesData.length === 0">
                            <p class="flex items-center gap-2 mb-5 text-grey text-sm">
                                Arrastra aquí tu archivo excel cumplimentado 
                                <CircleIcon variant="help" />
                            </p>
                        </template>
                        <template v-else>
                            <div class="w-full mb-4">
                                <div
                                    v-for="file in filesData"
                                    :key="file.name"
                                    class="flex items-center justify-between p-2 bg-gray-50 rounded"
                                >
                                    <div class="flex items-center gap-2">
                                        <XlsIcon class="w-5 h-5" />
                                        <span class="text-sm font-medium">{{ file.name }}</span>
                                    </div>
                                    <span class="text-xs text-gray-500">{{ formatFileSize(file.size) }}</span>
                                </div>
                            </div>
                        </template>

                        <input
                            type="file"
                            ref="fileInput"
                            @change="handleFileChange"
                            class="hidden"
                            accept=".xlsx,.xls"
                        >

                        <Button
                            variant="green"
                            size="xs"
                            @click="uploadFile"
                        >
                            <UploadIcon class="mr-2" />
                            {{ filesData.length === 0 ? 'Cargar excel' : 'Subir archivo' }}
                        </Button>
                    </div>
                </div>

                <ArrowUpIcon 
                    v-if="project.firstExcel"
                />

                <div
                    v-if="project.firstExcel"
                    class="my-4"
                >    
                    <div class="relative flex items-center gap-4 w-full p-4 bg-white ">
                        <XlsIcon
                            v-if="project.firstExcel.extension == 'xlsx'"
                        />
    
                        <div>
                            <p class="text-black text-lg font-bold">
                                {{ project.firstExcel.title }}
                            </p>
                            <p class="text-grey text-sm">
                                {{ project.firstExcel.description }}
                            </p>
                        </div>

                        <Button
                            v-if="project.firstExcel.url"
                            variant="ghost"
                            size="xs"
                            as-child
                        >
                            <a
                                class="absolute top-4 right-4"
                                :href="project.firstExcel.url"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <DownloadIcon />
                            </a>
                        </Button>
                    </div>
                </div>
            </TabsContent>
            <TabsContent value="assets">
                <Assets 
                    :assets="assets.data"
                />
            </TabsContent>
        </Tabs>
    </AuthenticatedLayout>
</template>