<script setup lang="ts">
import { inject } from 'vue'
import { Button } from '@/Components/ui'
import { fenlabApi } from '@/api'
import type { AssetData } from '../../types'
import type { PluginApi } from 'vue-loading-overlay'
import { toast } from '@/Components/ui'
import { router } from '@inertiajs/vue3'
import { IndividualAsset } from '@/Pages/MyAnalysis/types/individualAsset'

const props = defineProps<{
    asset: AssetData
}>()

const $loading = inject<PluginApi>('$loading')

async function downloadAsset() {
    const loader = $loading?.show()
    try {
        const { data } = await fenlabApi.post<IndividualAsset>('', {
            method: 'get',
            path: `projects/${props.asset.projectId}/assets/${props.asset.id}`,
        })     
        const pdfURL = data.assetPdf.url

        window.open(pdfURL, '_blank', 'noopener')
        
        toast({
            variant: 'info',
            title: 'Asset downloaded successfully',
        })
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
        toast({
            variant: 'danger',
            title: 'Error downloading asset',
        })
    } finally {
        loader?.hide()
    }
}

async function publishAsset() {
    const loader = $loading?.show()
    try {
        await fenlabApi.post('', {
            method: 'put',
            path: `projects/${props.asset.projectId}/assets/${props.asset.id}/publish`,
        })

        toast({
            variant: 'info',
            title: 'Asset published successfully',
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
            @click="downloadAsset"
        >
            Descargar
        </Button>
        <Button
            variant="ghost"
            size="xs"
            @click="publishAsset"
        >
            Publicar
        </Button>
    </div>
</template>
