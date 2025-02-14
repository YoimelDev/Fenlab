<script setup lang="ts">
import { inject, ref } from 'vue'
import { Button, Dialog } from '@/Components/ui'
import { fenlabApi } from '@/api'
import type { PluginApi } from 'vue-loading-overlay'
import { toast } from '@/Components/ui'
import { IndividualAsset } from '@/Pages/MyAnalysis/types/individualAsset'
import NewPublicationDialog from '@/Pages/MyPublications/Components/NewPublicationDialog/NewPublicationDialog.vue'

const props = defineProps<{
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    publication: any
}>()

const isDialogOpen = ref(false)
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
        <Dialog v-model:open="isDialogOpen">
            <Button
                variant="ghost"
                size="xs"
                @click="isDialogOpen = true"
            >
                Publicar
            </Button>

            <NewPublicationDialog
                :asset="publication"
                @updated="() => isDialogOpen = false"
            />
        </Dialog>
    </div>
</template>
