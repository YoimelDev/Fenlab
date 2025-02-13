<script setup lang="ts">
import { FenlabLogo } from '@/Components/icons'
import { useSlots } from 'vue'
const slots = useSlots()
const isTerms = !!slots.terms
</script>

<template>
    <div class="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-white">
        <div class="relative hidden lg:flex justify-center items-center">
            <video
                src="../../images/video_welcome.webm"
                autoplay
                loop
                muted
                class="absolute top-0 left-0 w-full h-full object-cover z-0"
            />

            <div class="absolute top-0 left-0 w-full h-full bg-[#43844E] opacity-90 z-10" />

            <header class="grid place-items-center gap-10 z-10">
                <FenlabLogo
                    role="heading"
                    aria-level="1"
                    aria-describedby="Fenlab"
                    class="text-white h-20"
                />

                <p class="text-white text-2xl font-light">
                    Gain insights, drive success
                </p>
            </header>
        </div>

        <div
            class="flex flex-col justify-center gap-12 max-w-[720px] w-full mx-auto"
            :class="isTerms ? 'px-6 ' : 'px-4 lg:px-20'"
        >
            <slot />

            <slot name="terms" />
        </div>
    </div>
</template>
