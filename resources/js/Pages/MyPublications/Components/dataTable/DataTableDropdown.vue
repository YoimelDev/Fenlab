<script setup lang="ts">
import { MoreHorizontal } from 'lucide-vue-next'
import { 
    Button,
    DropdownMenu, 
    DropdownMenuContent, 
    DropdownMenuItem,
    DropdownMenuTrigger,   
} from '@/Components/ui'
</script>

<template>
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
            <DropdownMenuItem class="hover:cursor-pointer">
                Opcion 1
            </DropdownMenuItem>
            <DropdownMenuItem class="hover:cursor-pointer">
                Opcion 2
            </DropdownMenuItem>
        </DropdownMenuContent>
    </DropdownMenu>
</template>