<script setup lang="ts">
import { inject, ref } from 'vue'
import { Button, Dialog } from '@/Components/ui'
import { fenlabApi } from '@/api'
import type { AssetData } from '../../types'
import type { PluginApi } from 'vue-loading-overlay'
import { toast } from '@/Components/ui'
import { IndividualAsset } from '@/Pages/MyAnalysis/types/individualAsset'
import PostDialog from './PostDialog.vue'

const props = defineProps<{
    asset: AssetData
}>()

const isDialogOpen = ref(false)
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
        <Dialog v-model:open="isDialogOpen">
            <Button
                variant="ghost"
                size="xs"
                @click="isDialogOpen = true"
            >
                Solicitar publicación
            </Button>

            <PostDialog
                :asset="asset"
                @updated="() => isDialogOpen = false"
            />
        </Dialog>
    </div>
</template>
