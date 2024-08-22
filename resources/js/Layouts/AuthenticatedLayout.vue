<script setup lang="ts">
import { useLocalStorage } from '@vueuse/core'

import Menu from '@/Layouts/Components/Menu.vue'

const isCollapsed = useLocalStorage<boolean>('collapse', false)
</script>

<template>
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
            <div class="container p-10 overflow-auto">
                <slot />
            </div>
        </main>
    </div>
</template>
