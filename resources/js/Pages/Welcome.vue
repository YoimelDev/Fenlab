<script setup lang="ts">
import { Head, Link } from '@inertiajs/vue3'
import { Button } from '@/Components/ui/button'
import { FenlabLogo } from '@/Components/icons'

defineProps<{
    canLogin?: boolean
    canRegister?: boolean
    laravelVersion: string
    phpVersion: string
}>()
</script>

<template>

    <Head title="Inicio" />

    <div
        class="relative min-h-screen flex flex-col items-center justify-center bg-[#F2F4F8] text-black/50 dark:bg-black dark:text-white/50 selection:bg-[#FF2D20] selection:text-white">
        <video src="../../images/video_welcome.webm" autoplay loop muted
            class="absolute top-0 left-0 w-full h-full object-cover z-0" />

        <div class="absolute top-0 left-0 w-full h-full bg-[#43844E] opacity-90 z-10" />

        <div class="container relative z-10 flex flex-col justify-center items-center gap-10">
            <header class="grid place-items-center gap-10">
                <FenlabLogo role="heading" aria-level="1" aria-describedby="Fenlab" class="text-white h-20" />

                <p class="text-white text-4xl font-light">
                    Software de analísis financiero e inmobiliario
                </p>
            </header>


            <nav class="flex flex-col flex-wrap gap-10 max-w-96 w-full">
                <Button class="bg-[#344F50] text-white hover:bg-white hover:text-black" as-child>
                    <Link :href="route('login')">
                    Inicia sesión
                    </Link>
                </Button>

                <Button class="bg-transparent text-white border-white hover:bg-white hover:text-black" as-child
                    variant="outline">
                    <Link v-if="canRegister" :href="route('register')">
                    Contáctanos
                    </Link>
                </Button>
            </nav>
        </div>
    </div>
</template>