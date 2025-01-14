<!-- eslint-disable @typescript-eslint/no-explicit-any -->
<script setup lang="ts">
import { ref, inject } from 'vue'
import { usePage } from '@inertiajs/vue3'
import { fenlabApi } from '@/api'
import {
    Button,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    Textarea,
    Label,
    toast,
    RadioGroup,
    RadioGroupItem,
} from '@/Components/ui'
import type { PluginApi } from 'vue-loading-overlay'
import type { PageProps } from '@/types'
import { PostData } from '../../types/index'

type bodyData = {
    fenlabId: string
    email: string
    status: string
    isApproved: boolean
    comments?: string
}

const props = defineProps<{
    postData: PostData
}>()

const $loading = inject<PluginApi>('$loading')
const page = usePage<PageProps>()
const salesforceEmail = page.props?.auth?.salesforceUser?.email
const formData = ref({
    fenlabId: props.postData.data.id,
    email: salesforceEmail,
    isApproved: false,
    status: '',
    comments: '',
})

const emits = defineEmits(['updated'])

const postSalesforce = async () => {
    const loader = $loading?.show()
    
    try {
        const bodyData: bodyData = {
            fenlabId: formData.value.fenlabId,
            email: formData.value.email,
            status: formData.value.status,
            isApproved: formData.value.status === 'approved',
        }

        if (formData.value.status === 'rejected') {
            bodyData.comments = formData.value.comments
        }

        await fenlabApi.post(props.postData.endpoint, bodyData)

        toast({
            variant: 'info',
            title: 'Datos guardados correctamente',
        })
    } catch (error: any) {
        console.log(error.response.data.error)
        
        toast({
            variant: 'danger',
            title: '¡Ups! Algo salió mal.',
            description: error.response.data.error,
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
                Detalles de la publicación
            </DialogTitle>
        </DialogHeader>

        <div class="space-y-4 my-4 p-4 bg-white/100 rounded-sm border border-[#E5E7EB] shadow-sm">
            <div class="space-y-2">
                <Label>Estado de la publicación</Label>
                <RadioGroup
                    v-model="formData.status"
                    class="flex flex-col space-y-2"
                >
                    <div class="flex items-center space-x-2">
                        <RadioGroupItem
                            id="approved"
                            value="approved"
                        />
                        <Label for="approved">Aprobar</Label>
                    </div>

                    <div
                        v-if="postData.postType === 'pendingNotary'"
                        class="flex items-center space-x-2"
                    >
                        <RadioGroupItem
                            id="date_change"
                            value="date_change"
                        />
                        <Label for="date_change">Solicitar cambio de fecha</Label>
                    </div>

                    <div
                        v-if="postData.postType === 'pendingPBC'"
                        class="flex items-center space-x-2"
                    >
                        <RadioGroupItem
                            id="pending"
                            value="pending"
                        />
                        <Label for="pending">Solicitar documentación adicional</Label>
                    </div>

                    <div
                        v-if="postData.postType !== 'pendingNotary'"
                        class="flex items-center space-x-2"
                    >
                        <RadioGroupItem
                            id="rejected"
                            value="rejected"
                        />
                        <Label for="rejected">Rechazar</Label>
                    </div>
                </RadioGroup>
            </div>

            <div
                v-if="formData.status === 'rejected' || formData.status === 'pending'"
                class="space-y-2"
            >
                <Label for="comments">Comentarios</Label>
                <Textarea
                    id="comments"
                    class="h-24"
                    v-model="formData.comments"
                    placeholder="Añade un comentario..."
                />
            </div>
        </div>

        <DialogFooter>
            <Button
                variant="green"
                @click="postSalesforce"
            >
                Enviar datos
            </Button>
        </DialogFooter>
    </DialogContent>
</template>