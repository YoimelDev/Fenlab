<script setup lang="ts">
import { ref } from 'vue'
import { MoreHorizontal } from 'lucide-vue-next'
import { 
    Button,
    Dialog,
    DialogTrigger,
    DropdownMenu, 
    DropdownMenuContent, 
    DropdownMenuItem,
    DropdownMenuTrigger,   
} from '@/Components/ui'
import PostDialog from './PostDialog.vue'
import type { AssetData } from '@/Pages/MyAnalysis/types'

defineProps<{
    asset: AssetData
}>()

const isDialogOpen = ref(false)
</script>

<template>
    <Dialog v-model:open="isDialogOpen">
        <DropdownMenu>
            <DropdownMenuTrigger as-child>
                <Button
                    variant="ghost"
                    class="w-8 h-8 p-0"
                >
                    <span class="sr-only">Open menu</span>
                    <MoreHorizontal class="w-4 h-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DialogTrigger class="w-full">
                    <DropdownMenuItem class="hover:cursor-pointer">
                        Publicar
                    </DropdownMenuItem>
                </DialogTrigger>
            </DropdownMenuContent>
        </DropdownMenu>

        <PostDialog 
            :asset="asset"
            @updated="() => isDialogOpen = false"
        />
    </Dialog>
</template>