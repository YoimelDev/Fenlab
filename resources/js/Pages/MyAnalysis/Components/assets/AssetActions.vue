<script setup lang="ts">
import { ref } from 'vue'
import { Button, Dialog } from '@/Components/ui'
import type { AssetData } from '../../types'
import PostDialog from './PostDialog.vue'

const props = defineProps<{
    asset: AssetData
}>()

const isDialogOpen = ref(false)
</script>

<template>
    <Dialog v-model:open="isDialogOpen">
        <Button variant="ghost" size="xs" @click="isDialogOpen = true">
            Solicitar publicación
        </Button>

        <PostDialog :asset="asset" @updated="() => isDialogOpen = false" />
    </Dialog>
</template>
