<script setup lang="ts">
import { Head, Link } from '@inertiajs/vue3'
import { Button } from '@/components/ui/button'

defineProps<{
    canLogin?: boolean
    canRegister?: boolean
    laravelVersion: string
    phpVersion: string
}>()
</script>

<template>
    <Head title="Welcome" />
    
    <div class="bg-[#F2F4F8] text-black/50 dark:bg-black dark:text-white/50">
        <div
            class="relative min-h-screen flex flex-col items-center justify-center selection:bg-[#FF2D20] selection:text-white"
        >
            <div class="container flex items-center gap-20">
                <div class="text-[#21272A] flex-1">
                    <h1 class="text-4xl font-bold tracking-tight lg:text-[54px] leading-[60px]">
                        Fenlab: <br>
                        Software de análisis <br>
                        financiero e inmobiliario
                    </h1>

                    <ul class="my-12 ml-6 list-disc text-lg">
                        <li>
                            Cashflow Model of Performing and Re-Performing loans secured & unsecured
                        </li>

                        <li>
                            Non Performing Loans secured Model
                        </li>

                        <li>
                            REO Model
                        </li>
                    </ul>

                    <nav class="flex gap-4">
                        <Button as-child>
                            <Link :href="route('login')">
                                Inicia sesión
                            </Link>
                        </Button>

                        <Button 
                            as-child
                            variant="outline"
                        >
                            <Link
                                v-if="canRegister"
                                :href="route('register')"
                            >
                                Regístrate
                            </Link>
                        </Button>
                    </nav>
                </div>

                <picture class="relative w-full h-[505px] flex-1">
                    <img
                        src="../../images/Desktop.png"
                        alt="Fenlab"
                        class="absolute left-20 w-full h-full"
                    >
                </picture>
            </div>
        </div>
    </div>
</template>
