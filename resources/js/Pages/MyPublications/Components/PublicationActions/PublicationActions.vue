<script setup lang="ts">
import { inject } from 'vue'
import { Button } from '@/Components/ui'
import { fenlabApi } from '@/api'
import type { PublishableProject } from '../../types'
import type { PluginApi } from 'vue-loading-overlay'
import { toast } from '@/Components/ui'
import { router } from '@inertiajs/vue3'
import { IndividualAsset } from '@/Pages/MyAnalysis/types/individualAsset'

const props = defineProps<{
    publication: PublishableProject
}>()

const $loading = inject<PluginApi>('$loading')

async function downloadPublication() {
    const loader = $loading?.show()
    try {
        const { data } = await fenlabApi.post<IndividualAsset>('', {
            method: 'get',
            path: `projects/${props.publication.projectId}/assets/${props.publication.id}`,
        })     
        const pdfURL = data.assetPdf.url

        window.open(pdfURL, '_blank', 'noopener')
        
        toast({
            variant: 'info',
            title: 'Publicación descargada exitosamente',
        })
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
        toast({
            variant: 'danger',
            title: 'Error al descargar la publicación',
        })
    } finally {
        loader?.hide()
    }
}

async function publishPublication() {
    const loader = $loading?.show()
    try {
        await fenlabApi.post('', {
            method: 'put',
            path: `projects/${props.publication.projectId}/assets/${props.publication.id}/publish`,
        })

        toast({
            variant: 'info',
            title: 'Publicación publicada exitosamente',
        })
        router.reload()
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        toast({
            variant: 'danger',
            title: error.response.data.message.join('\n'),
        })
    } finally {
        loader?.hide()
    }
}
</script>

<template>
    <div class="flex gap-2">
        <Button
            variant="ghost"
            size="xs"
            @click="downloadPublication"
        >
            Descargar
        </Button>
        <Button
            variant="ghost"
            size="xs"
            @click="publishPublication"
        >
            Publicar
        </Button>
    </div>
</template>
