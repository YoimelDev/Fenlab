<script setup lang="ts">
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue'
import { Head, Link } from '@inertiajs/vue3'

import {
    Button,
    DataTable,
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    Input,
    Label,
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from '@/Components/ui'

import { AssessmentIcon, XlsIcon } from '@/Components/icons'
import { PlusIcon } from '@radix-icons/vue'

import { columns } from './Components/pendingPublicationTable'
import { type Publishable } from './types'

defineProps<{
    projects: Publishable
}>()

</script>

<template>
    <Head title="Mis Publicaciones" />

    <AuthenticatedLayout>
        <header class="flex flex-col sm:flex-row justify-between items-center gap-4 mb-10">
            <h1 class="flex items-center gap-4 text-xl font-bold leading-5">
                <AssessmentIcon
                    variant="black"
                    class="text-black w-8 h-8"
                />

                Mis Publicaciones | Pendientes de Publicar
            </h1>

            <Dialog>
                <DialogTrigger as-child>
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
                </DialogTrigger>

                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>
                            Título
                        </DialogTitle>
                    </DialogHeader>

                    <div class="content mt-10">
                        <Tabs
                            default-value="images"
                        >
                            <TabsList class="grid w-[422px] grid-cols-3">
                                <TabsTrigger value="activeData">
                                    Datos activo
                                </TabsTrigger>
                                <TabsTrigger value="documents">
                                    Documentos
                                </TabsTrigger>
                                <TabsTrigger value="images">
                                    Imágenes
                                </tabstrigger>
                            </TabsList>
                            <TabsContent value="activeData">
                                <div
                                    class="flex flex-col gap-4"
                                >
                                    <div class="space-y-2">
                                        <Label for="client_id">ID cliente</Label>
                                        <Input
                                            id="client_id"
                                            type="text"
                                            placeholder="ID cliente"
                                            class="mt-2"
                                            required
                                            autofocus
                                            autocomplete="client_id"
                                        />
                                    </div>
                    
                                    <div class="space-y-2">
                                        <Label for="fenlab_id">ID fenlab</Label>
                                        <Input
                                            id="fenlab_id"
                                            type="text"
                                            placeholder="ID fenlab"
                                            class="mt-2"
                                            required
                                            autofocus
                                            autocomplete="fenlab_id"
                                        />
                                    </div>
                    
                                    <div class="space-y-2">
                                        <Label for="cadastral_reference">Referencia catastral</Label>
                                        <Input
                                            id="cadastral_reference"
                                            type="text"
                                            placeholder="Referencia catastral"
                                            class="mt-2"
                                            required
                                            autofocus
                                            autocomplete="cadastral_reference"
                                        />
                                    </div>
                    
                                    <div class="space-y-2">
                                        <Label for="min_price">Precio mínimo</Label>
                                        <Input
                                            id="min_price"
                                            type="text"
                                            placeholder="Precio mínimo"
                                            class="mt-2"
                                            required
                                            autofocus
                                            autocomplete="min_price"
                                        />
                                    </div>
                    
                                    <div class="space-y-2">
                                        <Label for="reference_value">Valor de referencia</Label>
                                        <Input
                                            id="reference_value"
                                            type="text"
                                            placeholder="Valor de referencia"
                                            class="mt-2"
                                            required
                                            autofocus
                                            autocomplete="reference_value"
                                        />
                                    </div>
                    
                                    <div class="space-y-2">
                                        <Label for="transaction_modality">Modalidad de transacción</Label>
                                        <Input
                                            id="transaction_modality"
                                            type="text"
                                            placeholder="Modalidad de transacción"
                                            class="mt-2"
                                            required
                                            autofocus
                                            autocomplete="transaction_modality"
                                        />
                                    </div>
                                </div>
                            </TabsContent>
                            <TabsContent value="documents">
                                <div class="my-4 p-2 bg-white">
                                    <div class="grid place-items-center p-5 border-2 border-dashed border-[#C1C1C1] rounded-sm">
                                        <Button
                                            variant="green"
                                            size="xs"
                                        >
                                            <UploadIcon class="mr-2" />
                                            Cargar documento
                                        </Button>
                                    </div>                                  
                                </div>

                                <div class="relative flex items-center gap-4 w-full p-4 mb-4 bg-white ">
                                    <XlsIcon />
                
                                    <div>
                                        <p class="text-black text-lg font-bold">
                                            NombreArchivo_Nombre.xls
                                        </p>
                                    </div>
                                </div>

                                <div class="relative flex items-center gap-4 w-full p-4 mb-4 bg-white ">
                                    <XlsIcon />
                
                                    <div>
                                        <p class="text-black text-lg font-bold">
                                            NombreArchivo_Nombre.xls
                                        </p>
                                    </div>
                                </div>

                                <div class="relative flex items-center gap-4 w-full p-4 mb-4 bg-white ">
                                    <XlsIcon />
                
                                    <div>
                                        <p class="text-black text-lg font-bold">
                                            NombreArchivo_Nombre.xls
                                        </p>
                                    </div>
                                </div>
                            </TabsContent>
                            <TabsContent value="images">
                                <div class="my-4 p-2 bg-white">
                                    <div class="grid place-items-center p-5 border-2 border-dashed border-[#C1C1C1] rounded-sm">
                                        <Button
                                            variant="green"
                                            size="xs"
                                        >
                                            <UploadIcon class="mr-2" />
                                            Cargar imágenes
                                        </Button>
                                    </div>
                                </div>

                                <div class="flex flex-wrap justify-center gap-4">
                                    <img
                                        src="https://via.placeholder.com/200"
                                        alt="Placeholder"
                                    >

                                    <img
                                        src="https://via.placeholder.com/200"
                                        alt="Placeholder"
                                    >

                                    <img
                                        src="https://via.placeholder.com/200"
                                        alt="Placeholder"
                                    >

                                    <img
                                        src="https://via.placeholder.com/200"
                                        alt="Placeholder"
                                    >
                                </div>
                            </TabsContent>
                        </Tabs>
                    </div>
            
                    <DialogFooter class="flex justify-between mt-10">
                        <p>
                            Haz                            

                            <Link
                                href="#"
                                class="text-blue font-bold"
                            >
                                click aquí
                            </Link>

                            si prefieres que subamos la documentación por ti
                        </p>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </header>
     
        <DataTable
            :columns="columns"
            :data="projects.data"
        />
    </AuthenticatedLayout>
</template>
