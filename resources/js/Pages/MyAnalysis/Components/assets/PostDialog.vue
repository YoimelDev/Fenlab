<script setup lang="ts">
import { ref } from 'vue'
import { router } from '@inertiajs/vue3'
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
} from '@/Components/ui'
import type { AssetData } from '@/Pages/MyAnalysis/types'

const props = defineProps<{
    asset: AssetData
}>()

const formData = ref({ ...props.asset })

const emits = defineEmits(['updated'])

const postData = async () => {
    try {
        await fenlabApi.post('', {
            method: 'put',
            path: `projects/${formData.value.projectId}/assets/${formData.value.id}/publish`,
            body: { ...formData.value },
        })

        toast({
            variant: 'info',
            title: 'Datos guardados correctamente',
        }) 
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch(error: any) {
        toast({
            variant: 'danger',
            title: '¡Ups! Algo salió mal.',
            description: error.response.data.message.join('\n'),
        })
    } finally {
        emits('updated')
        router.reload()
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
                        class="mt-2"
                        required
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
                        v-model.number="formData.model.npl.precioReferencia"
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
                        v-model="formData.model.type"
                    />
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