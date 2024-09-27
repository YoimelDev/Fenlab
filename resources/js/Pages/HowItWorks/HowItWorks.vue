<script setup lang="ts">
import { Head, Link } from '@inertiajs/vue3'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue'

import {
    Video,
    Accordion, 
    AccordionContent, 
    AccordionItem, 
    AccordionTrigger,
} from '@/Components/ui'

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

                    <Link
                        href="#"
                        class="text-blue font-medium"
                    >
                        Contacta con nosotros
                    </Link>
                </div>

                <p class="mt-4 text-sm">
                    Video tutorial de cómo realizar tus análisis financieros e inmobiliarios
                </p>
            </header>

            <div class="max-w-[744px] mt-8">
                <Video video="https://www.youtube.com/embed/a3ICNMQW7Ok?si=MVfZ94GRfG6fyb_n" />
            </div>
        </section>

        <section class="mt-16">
            <header>
                <div class="flex justify-between">
                    <h2 class="flex items-center gap-4 text-xl font-bold leading-5">
                        Explicación técnica modelos
                    </h2>
                </div>
            </header>

            <div class="mt-10">
                <h3 class="text-xl">
                    Nombre Modelo 1
                </h3>

                <p class="mt-4 text-sm">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean condimentum justo vitae urna elementum, ac pulvinar leo malesuada. Nunc ut dui non dolor dapibus finibus sit amet sit amet sem. Sed eleifend justo sit amet lectus tempus, eget dapibus ex dignissim. Pellentesque congue ex eu libero ullamcorper bibendum.
                </p>
            </div>

            <Accordion
                class="mt-10 space-y-4"
                type="single"
                collapsible
            >
                <AccordionItem value="item-1">
                    <AccordionTrigger>Pregunta 1</AccordionTrigger>
                    <AccordionContent>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean condimentum justo vitae urna elementum, ac pulvinar leo malesuada. Nunc ut dui non dolor dapibus finibus sit amet sit amet sem. Sed eleifend justo sit amet lectus tempus, eget dapibus ex dignissim. Pellentesque congue ex eu libero ullamcorper bibendum.
                    </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-2">
                    <AccordionTrigger>Pregunta 2</AccordionTrigger>
                    <AccordionContent>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean condimentum justo vitae urna elementum, ac pulvinar leo malesuada. Nunc ut dui non dolor dapibus finibus sit amet sit amet sem. Sed eleifend justo sit amet lectus tempus, eget dapibus ex dignissim. Pellentesque congue ex eu libero ullamcorper bibendum.
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </section>
    </AuthenticatedLayout>
</template>