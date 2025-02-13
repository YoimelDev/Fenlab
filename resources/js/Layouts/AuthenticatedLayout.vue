<script setup lang="ts">
import { useLocalStorage } from '@vueuse/core'
import { usePage, router } from '@inertiajs/vue3'
import { onMounted } from 'vue'
import { type PageProps } from '@/types'
import Menu from '@/Layouts/Components/Menu.vue'
import { Toaster, toast, useToast } from '@/Components/ui'

const isCollapsed = useLocalStorage<boolean>('collapse', false)
const page = usePage<PageProps>()
const { dismiss } = useToast()

router.on('start', () => {
    dismiss()
})

onMounted(() => {
    const flash = page.props.flash

    if (flash.error) {
        const errors = flash.error.split(' | ')
        errors.forEach((error: string) => {
            toast({
                variant: 'danger',
                title: '¡Ups! Algo salió mal.',
                description: error,
            })
        })
    }
    if (flash.success) {
        toast({
            variant: 'info',
            title: '¡Éxito!',
            description: flash.success,
        })
    }
})

</script>

<template>
    <Toaster />

    <div>
        <Menu />

        <!-- Page Content -->
        <main
            class="min-h-screen bg-chalk transition-padding duration-300"
            :class="{
                'pl-[100px]': isCollapsed,
                'pl-[256px]': !isCollapsed,
            }"
        >
            <div class="p-10 overflow-auto">
                <slot />
            </div>
        </main>
    </div>
</template>
