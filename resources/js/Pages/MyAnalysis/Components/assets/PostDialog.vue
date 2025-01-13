<script setup lang="ts">
import { ref, inject } from 'vue'
import { fenlabApi } from '@/api'
import {
    Button,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    Input,
    Label,
    toast,
    RadioGroup, 
    RadioGroupItem,
} from '@/Components/ui'
import type { AssetData } from '@/Pages/MyAnalysis/types'
import type { PluginApi } from 'vue-loading-overlay'

const props = defineProps<{
    asset: AssetData
}>()

interface modalities {
    subasta: string
    credito: string
    remate: string
}

const $loading = inject<PluginApi>('$loading')
const formData = ref({ ...props.asset })
const selectedModality = ref<keyof modalities>('subasta')

const emits = defineEmits(['updated'])

const postData = async () => {
    const loader = $loading?.show()
    
    try {
        await fenlabApi.post('', {
            method: 'put',
            path: `projects/${formData.value.projectId}/assets/${formData.value.id}/publish`,
            body: {
                precioReferencia: formData.value.model.npl.precioReferencia,
                opcionesDePublicacion: [
                    {
                        opcion: selectedModality.value,
                        publicable: formData.value.model.npl[selectedModality.value].isPublishable,
                        precioMinimo: formData.value.model.npl[selectedModality.value].precioMinimo, 
                    },
                ],
            },
        })

        toast({
            variant: 'info',
            title: 'Datos guardados correctamente',
        })
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        toast({
            variant: 'danger',
            title: '¡Ups! Algo salió mal.',
            description: error.response.data.message.join('\n'),
        })
    } finally {
        loader?.hide()
        emits('updated')
        // router.reload()
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

        <div class="content">
            <div class="flex flex-col gap-4">
                <div class="space-y-2">
                    <Label for="idCliente">ID cliente</Label>
                    <Input
                        id="idCliente"
                        type="text"
                        placeholder="ID cliente"
                        class="mt-2"
                        disabled
                        required
                        v-model="formData.idCliente"
                    />
                </div>

                <div class="space-y-2">
                    <Label for="idFencia">ID fenlab</Label>
                    <Input
                        id="idFencia"
                        type="text"
                        placeholder="ID fenlab"
                        class="mt-2"
                        disabled
                        required
                        v-model="formData.idFencia"
                    />
                </div>

                <div class="space-y-2">
                    <Label for="referenciaCatastral">Referencia catastral</Label>
                    <Input
                        id="referenciaCatastral"
                        type="text"
                        placeholder="Referencia catastral"
                        disabled
                        class="mt-2"
                        required
                        v-model="formData.model.referenciaCatastral"
                    />
                </div>

                <div class="space-y-2">
                    <Label for="min_price">Precio mínimo (€)</Label>
                    <Input
                        id="min_price"
                        type="text"
                        placeholder="Precio mínimo"
                        class="mt-2"
                        required
                        v-model="formData.model.npl.credito.precioMinimo"
                    />
                </div>

                <div class="space-y-2">
                    <Label for="reference_value">Valor de referencia (€)</Label>
                    <Input
                        id="reference_value"
                        type="text"
                        placeholder="Valor de referencia"
                        disabled
                        class="mt-2"
                        required
                        v-model.number="formData.model.npl.precioReferencia"
                    />
                </div>

                <div class="space-y-2">
                    <Label for="transaction_modality">Modalidad de transacción</Label>

                    <RadioGroup
                        v-model="selectedModality"
                        default-value="subasta"
                    >
                        <div class="flex items-center space-x-2">
                            <RadioGroupItem
                                id="r1"
                                value="subasta"
                            />
                            <Label for="r1">Subasta</Label>
                        </div>
                        <div class="flex items-center space-x-2">
                            <RadioGroupItem
                                id="r2"
                                value="crédito"
                            />
                            <Label for="r2">Crédito</Label>
                        </div>
                        <div class="flex items-center space-x-2">
                            <RadioGroupItem
                                id="r3"
                                value="remate"
                            />
                            <Label for="r3">Remate</Label>
                        </div>
                    </RadioGroup>
                </div>
            </div>
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