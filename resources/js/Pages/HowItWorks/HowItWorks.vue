<script setup lang="ts">
import { Head } from '@inertiajs/vue3'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue'

import {
    Video,
} from '@/Components/ui'
import { Model1, Model2, Model3 } from '@/Pages/HowItWorks/Components'

import { HelpIcon } from '@/Components/icons'
</script>

<template>
    <Head title="Cómo funciona" />

    <AuthenticatedLayout>
        <section>
            <header>
                <div class="flex justify-between">
                    <h2 class="flex items-center gap-4 text-xl font-bold leading-5">
                        <HelpIcon
                            class="text-black "
                        />
                        Cómo funciona
                    </h2>

                    <!-- <Link
                        href="#"
                        class="text-blue font-medium"
                    >
                        Contacta con nosotros
                    </Link> -->
                </div>

                <p class="mt-4 text-sm">
                    Video tutorial de cómo realizar tus análisis financieros e inmobiliarios
                </p>
            </header>

            <div class="max-w-[744px] mt-8">
                <Video video="https://www.youtube.com/embed/a3ICNMQW7Ok?si=MVfZ94GRfG6fyb_n" />
            </div>
        </section>

        <section class="mt-16 [&_header>h3]:underline [&_h4]:underline">
            <header>
                <div class="flex justify-between">
                    <h1 class="flex items-center gap-4 text-2xl font-bold leading-5">
                        Explicación técnica modelos
                    </h1>
                </div>
            </header>

            <Model1 />
            <Model2 />
            <Model3 />
        </section>
    </AuthenticatedLayout>
</template>