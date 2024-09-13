<script setup lang="ts">
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
} from '@/Components/ui'

import { ArrowIcon, InfoIcon, XlsIcon, PdfIcon, DownloadIcon, ArrowUpIcon, CircleIcon, UploadIcon } from '@/Components/icons'

const steps = [
    {
        step: 1,
        title: 'Texo paso 1',
        description: '19/08/2024',
    },
    {
        step: 2,
        title: 'Texo paso 2',
        description: '',
    },
    {
        step: 3,
        title: 'Texo paso 3',
        description: '',
    },
]

</script>

<template>
    <Head title="Mis Análisis" />

    <AuthenticatedLayout>
        <header class="flex items-center gap-4">
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

                    <span class="hidden sm:inline">
                        Proyecto Zeus
                    </span>
                </Link>
            </Button>

            <Badge
                variant="default"
                size="sm"
            >
                REO
            </Badge>

            <InfoIcon />

            <Badge
                variant="pending"
                size="sm"
            >
                ESTADO 1
            </Badge>
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
                    <div class="grid place-items-center p-5 border-2 border-dashed border-[#C1C1C1] rounded-sm">
                        <p class="flex items-center gap-2 mb-5 text-grey text-sm">
                            Arrastra aquí tu archivo excel cumplimentado 

                            <CircleIcon variant="help" />
                        </p>

                        <Button
                            variant="green"
                            size="xs"
                        >
                            <UploadIcon class="mr-2" />
                            Cargar excel
                        </Button>
                    </div>
                </div>

                <ArrowUpIcon />

                <div class="my-4">
                    <div class="flex gap-4 my-2">
                        <p class="px-2 text-black text-[10px] font-medium bg-white rounded-sm">
                            Texto paso 2
                        </p>
                        <p class="text-black text-[10px] font-medium">
                            01/17/2024
                        </p>
                    </div>
    
                    <div class="relative flex items-center gap-4 w-full p-4 mb-4 bg-white ">
                        <XlsIcon />
    
                        <div>
                            <p class="text-black text-lg font-bold">
                                NombreArchivo_Nombre.xls
                            </p>
                            <p class="text-grey text-sm">
                                Texto descripción del documento.
                            </p>
                        </div>

                        <DownloadIcon class="absolute top-4 right-4" />
                    </div>

                    <div class="relative flex items-center gap-4 w-full p-4 bg-white ">
                        <PdfIcon />
    
                        <div>
                            <p class="text-black text-lg font-bold">
                                Fichas de Activos Analizados
                            </p>
                            <p class="text-grey text-sm">
                                Texto descripción del documento.
                            </p>
                        </div>

                        <DownloadIcon class="absolute top-4 right-4" />
                    </div>
                </div>

                <ArrowUpIcon />

                <div class="my-4">
                    <div class="flex gap-4 my-2">
                        <p class="px-2 text-black text-[10px] font-medium bg-white rounded-sm">
                            Texto paso 1
                        </p>
                        <p class="text-black text-[10px] font-medium">
                            01/17/2024
                        </p>
                    </div>
    
                    <div class="relative flex items-center gap-4 w-full p-4 bg-white ">
                        <XlsIcon />
    
                        <div>
                            <p class="text-black text-lg font-bold">
                                NombreArchivo.xls
                            </p>
                            <p class="text-grey text-sm">
                                Texto descripción del documento.
                            </p>
                        </div>

                        <DownloadIcon class="absolute top-4 right-4" />
                    </div>
                </div>
            </TabsContent>
            <TabsContent value="assets">
                <h2>
                    Activos
                </h2>
            </TabsContent>
        </Tabs>
    </AuthenticatedLayout>
</template>