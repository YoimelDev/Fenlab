<script setup lang="ts">
import { Head, Link } from '@inertiajs/vue3'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue'

import { 
    Kpi, 
    Button, 
    DataTable,
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from '@/Components/ui'

import { AssessmentIcon } from '@/Components/icons'
import { PlusIcon } from '@radix-icons/vue'

import { publications } from '@/data'
import { columns } from './Components/dataTable'

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
                            default-value=""
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
                                </TabsTrigger>
                            </TabsList>
                            <TabsContent value="activeData">
                                <h2>
                                    Datos activo
                                </h2>
                            </TabsContent>
                            <TabsContent value="documents">
                                <h2>
                                    Documentos
                                </h2>
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
