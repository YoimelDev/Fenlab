<!-- eslint-disable @typescript-eslint/no-explicit-any -->
<script setup lang="ts">
import { ref, onBeforeUnmount, inject } from 'vue'
import {
    Button,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    Input,
    Label,
    ScrollArea,
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
    toast,
} from '@/Components/ui'
import { XlsIcon, UploadIcon, PdfIcon } from '@/Components/icons'
import { fenlabApi } from '@/api'
import type { PluginApi } from 'vue-loading-overlay'
import type { PublishData } from '@/types/fenlab'
import { AssetData } from '@/Pages/MyAnalysis/types'

const props = defineProps<{
    asset: AssetData
}>()
const emits = defineEmits(['updated'])
const $loading = inject<PluginApi>('$loading')

const docFiles = ref<File[]>([])
const imageFiles = ref<File[]>([])
const docFileInput = ref<HTMLInputElement | null>(null)
const imageFileInput = ref<HTMLInputElement | null>(null)

const docBinaries = ref<string[]>([])
const imageBinaries = ref<string[]>([])

function fileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => resolve(reader.result as string)
        reader.onerror = error => reject(error)
    })
}

function openDocFileDialog() { docFileInput.value?.click() }
async function handleDocFileChange(event: Event) {
    const target = event.target as HTMLInputElement
    if (target.files && target.files.length > 0) {
        docFiles.value = Array.from(target.files)
        docBinaries.value = await Promise.all(docFiles.value.map(file => fileToBase64(file)))
    }
}
function openImageFileDialog() { imageFileInput.value?.click() }
async function handleImageFileChange(event: Event) {
    const target = event.target as HTMLInputElement
    if (target.files && target.files.length > 0) {
        imageFiles.value.forEach(file => {
            const preview = (file as any).preview
            if (preview) URL.revokeObjectURL(preview)
        })
        const files = Array.from(target.files)
        imageFiles.value = files.map(file => {
            (file as any).preview = URL.createObjectURL(file)
            return file
        })
        imageBinaries.value = await Promise.all(files.map(file => fileToBase64(file)))
    }
}
onBeforeUnmount(() => {
    imageFiles.value.forEach(file => {
        const preview = (file as any).preview
        if (preview) URL.revokeObjectURL(preview)
    })
})

const formData = ref({ ...props.asset })
const selectedModality = ref('subasta')

const postData = async () => {
    const loader = $loading?.show()
    try {
        const payload = {
            precioReferencia: formData.value.model.npl.precioReferencia,
            opcion: selectedModality.value,
            precioMinimo: Number(formData.value.model.npl.credito.precioMinimo),
        }
        const { data } = await fenlabApi.post<PublishData>('', {
            method: 'put',
            path: `projects/${formData.value.projectId}/assets/${formData.value.id}/publish`,
            body: payload,
        })
        await fenlabApi.post('/import', data)

        const formDataToSend = new FormData()
        formDataToSend.append('ajax', '1')
        formDataToSend.append('action', 'uploadSingle')
        imageBinaries.value.forEach((image, index) => {
            formDataToSend.append(`iamges[${index}]`, image)
        })
        docBinaries.value.forEach((document, index) => {
            formDataToSend.append(`documents[${index}]`, document)
        })
        formDataToSend.append('reference', formData.value.idFencia)

        await fenlabApi.post('https://dev.fencia.es/module/fenciaimporter/import', formDataToSend, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })

        toast({
            variant: 'info',
            title: 'Datos guardados correctamente',
        })
    } catch (error: any) {
        toast({
            variant: 'danger',
            title: '¡Ups! Algo salió mal.',
            description: Array.isArray(error.response.data.message)
                ? error.response.data.message.join('\n')
                : error.response.data.message,
        })
    } finally {
        loader?.hide()
        emits('updated')
    }
}
</script>

<template>
    <DialogContent>
        <DialogHeader>
            <DialogTitle>
                ID cliente
            </DialogTitle>
        </DialogHeader>

        <div class="content mt-10">
            <Tabs default-value="activeData">
                <TabsList class="grid w-[422px] grid-cols-1">
                    <TabsTrigger value="activeData">
                        Datos activo
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="activeData">
                    <ScrollArea
                        class="h-[50vh] space-y-4 my-4 p-4 bg-white/100 rounded-sm border border-[#E5E7EB] shadow-sm"
                    >
                        <div class="flex flex-col gap-4">
                            <div class="space-y-2">
                                <Label for="client_id">ID cliente</Label>
                                <Input
                                    id="client_id"
                                    type="text"
                                    placeholder="ID cliente"
                                    class="mt-2"
                                    required
                                    autofocus
                                    disabled
                                    v-model="formData.idCliente"
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
                                    disabled
                                    v-model="formData.idFencia"
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
                                    disabled
                                    v-model="formData.model.referenciaCatastral"
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
                                    v-model="formData.model.npl.credito.precioMinimo"
                                    v-currency
                                />
                            </div>
                            <div class="space-y-2">
                                <Label for="reference_value">Valor de referencia</Label>
                                <Input
                                    id="reference_value"
                                    type="text"
                                    placeholder="Valor de referencia"
                                    class="mt-2"
                                    disabled
                                    required
                                    v-model.number="formData.model.npl.precioReferencia"
                                    v-currency
                                />
                            </div>
                            <div class="space-y-2">
                                <Label for="transaction_modality">Modalidad de transacción</Label>
                                <div class="flex items-center space-x-2">
                                    <input
                                        type="radio"
                                        id="r1"
                                        value="subasta"
                                        v-model="selectedModality"
                                    >
                                    <Label for="r1">Subasta</Label>
                                </div>
                                <div class="flex items-center space-x-2">
                                    <input
                                        type="radio"
                                        id="r2"
                                        value="crédito"
                                        v-model="selectedModality"
                                    >
                                    <Label for="r2">Crédito</Label>
                                </div>
                                <div class="flex items-center space-x-2">
                                    <input
                                        type="radio"
                                        id="r3"
                                        value="remate"
                                        v-model="selectedModality"
                                    >
                                    <Label for="r3">Remate</Label>
                                </div>
                            </div>
                        </div>

                        <div class="my-4 p-2 bg-white">
                            <div
                                class="grid place-items-center p-5 border-2 border-dashed border-[#C1C1C1] rounded-sm cursor-pointer"
                                @click="openDocFileDialog"
                            >
                                <template v-if="docFiles.length === 0">
                                    <Button
                                        variant="green"
                                        size="xs"
                                    >
                                        <UploadIcon class="mr-2" />
                                        Cargar documento
                                    </Button>
                                </template>
                                <template v-else>
                                    <div class="w-full">
                                        <div
                                            v-for="file in docFiles"
                                            :key="file.name"
                                            class="flex justify-between p-2 bg-gray-50 rounded mb-2"
                                        >
                                            <div class="flex items-center gap-2">
                                                <PdfIcon
                                                    v-if="file.name.endsWith('.pdf')"
                                                    class="w-5 h-5"
                                                />
                                                <XlsIcon
                                                    v-else
                                                    class="w-5 h-5"
                                                />

                                                <span class="text-sm font-medium">{{ file.name }}</span>
                                            </div>
                                        </div>
                                    </div>
                                </template>
                            </div>
                            <input
                                type="file"
                                ref="docFileInput"
                                @change="handleDocFileChange"
                                class="hidden"
                                accept=".xlsx,.xls,.pdf"
                                multiple
                            >
                        </div>

                        <div class="my-4 p-2 bg-white">
                            <div
                                class="grid place-items-center p-5 border-2 border-dashed border-[#C1C1C1] rounded-sm cursor-pointer"
                                @click="openImageFileDialog"
                            >
                                <template v-if="imageFiles.length === 0">
                                    <Button
                                        variant="green"
                                        size="xs"
                                    >
                                        <UploadIcon class="mr-2" />
                                        Cargar imágenes
                                    </Button>
                                </template>
                                <template v-else>
                                    <div class="flex flex-wrap justify-center gap-4">
                                        <div
                                            v-for="file in imageFiles"
                                            :key="file.name"
                                            class="w-24 h-24 border rounded overflow-hidden"
                                        >
                                            <img
                                                :src="(file as any).preview"
                                                alt="Preview"
                                                class="object-cover w-full h-full"
                                            >
                                        </div>
                                    </div>
                                </template>
                            </div>
                            <input
                                type="file"
                                ref="imageFileInput"
                                @change="handleImageFileChange"
                                class="hidden"
                                accept="image/*"
                                multiple
                            >
                        </div>
                    </ScrollArea>
                </TabsContent>
            </Tabs>
        </div>

        <DialogFooter class="flex justify-between mt-10">
            <Button
                class="gap-1 w-full"
                variant="green"
                size="sm"
                @click="postData"
            >
                Publicar
            </Button>
        </DialogFooter>
    </DialogContent>
</template>
