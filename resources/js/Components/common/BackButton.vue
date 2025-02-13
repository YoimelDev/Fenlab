<script setup lang="ts">
import { Button } from '@/Components/ui'
import { ArrowLeftIcon } from '@radix-icons/vue'

const goBack = () => {
    window.history.back()
}
</script>

<template>
    <Button
        variant="green"
        size="sm"
        @click="goBack"
        class="flex items-center gap-2 w-fit"
    >
        <ArrowLeftIcon class="w-4 h-4" />
        Atrás
    </Button>
</template>
