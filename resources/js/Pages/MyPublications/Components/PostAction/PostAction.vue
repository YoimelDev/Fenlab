<script setup lang="ts">
import { ref } from 'vue'
import { Button, Dialog } from '@/Components/ui'
import { PostPubliDialog } from '../PostPubliDialog'
import { PostData } from '../../types/index'

defineProps<{
    postData: PostData
}>()

const isDialogOpen = ref(false)
</script>

<template>
    <div class="flex gap-2">
        <Dialog v-model:open="isDialogOpen">
            <Button variant="ghost" size="xs" @click="isDialogOpen = true">
                Ver Detalles
            </Button>

            <Button v-if="postData.data?.publicLinks?.[0]" variant="ghost" size="xs" as-child>
                <a :href="postData.data.publicLinks[0]" target="_blank" rel="noopener noreferrer">
                    Ver documentación
                </a>
            </Button>

            <PostPubliDialog :post-data="postData" @updated="() => isDialogOpen = false" />
        </Dialog>
    </div>
</template>
