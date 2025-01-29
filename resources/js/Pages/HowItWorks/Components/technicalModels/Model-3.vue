<script setup lang="ts">
import { DownloadIcon, PdfIcon, BulbIcon, WorksIcon, DelivarableIcon } from '@/Components/icons'
import {
    Accordion, 
    AccordionContent, 
    AccordionItem, 
    AccordionTrigger,
    Button,
    Badge,
} from '@/Components/ui'
</script>

<template>
    <section class="[&>div]:pl-5">
        <header class="mt-10">
            <h3 class="flex items-center gap-2 text-xl font-medium">
                Modelo de recuperación de activos inmobiliarios 
                <Badge
                    variant="default"
                    class="text-xs"
                >
                    REO
                </Badge>
            </h3>
        </header>

        <Accordion
            class="mt-10 space-y-4"
            type="single"
            collapsible
        >
            <AccordionItem value="item-1">
                <AccordionTrigger>
                    <p class="flex items-center gap-2">
                        <BulbIcon /> ¿Para quién puede ser útil?
                    </p>
                </AccordionTrigger>
                <AccordionContent>
                    <ul class="list-disc pl-5">
                        <li class="mb-1">
                            Preparar un proceso de venta o compra de un portfolio.
                        </li>
                        <li class="mb-1">
                            Refinanciar un portfolio.
                        </li>
                        <li class="mb-1">
                            Calcular la rentabilidad futura de la cartera bajo gestión judicial y el valor actual neto de cada activo.
                        </li>
                        <li class="mb-1">
                            Comprender y determinar los parámetros económicos para orientar un acuerdo amistoso en el proceso de recuperación y venta del activo.
                        </li>
                        <li class="mb-1">
                            Conocido el valor actual neto de cada activo, considere alternativas de solución que maximicen potencialmente la rentabilidad esperada (venta con el okupa, inquilino, ...).
                        </li>
                        <li class="mb-1">
                            Conocer el proceso previsto de desinversión de cartera para reducir costes y asignar el equipo directivo de la forma más eficiente.
                        </li>
                    </ul>
                </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2">
                <AccordionTrigger>
                    <p class="flex items-center gap-2">
                        <WorksIcon /> ¿Cómo funciona?
                    </p>                    
                </AccordionTrigger>
                <AccordionContent>
                    <ul class="list-disc pl-5">
                        <li class="mb-1">
                            Análisis activo por activo de la rentabilidad esperada en el proceso de recuperación judicial, creando un modelo de flujo de caja para cada activo.
                        </li>
                        <li class="mb-1">
                            Calcular el valor actual neto de cada activo.
                        </li>
                        <li class="mb-1">
                            Analizar el escenario potencial que podría mejorar el valor actual neto de cada activo en el escenario no favorable.
                        </li>
                        <li class="mb-1">
                            <p class="text-justify font-aptos font-bold text-sm">
                                Parámetros utilizados:
                            </p>
                            <ul class="list-disc pl-5">
                                <li class="mb-1">
                                    Tiempos judiciales: Tiempos judiciales estimados para cada procedimiento judicial en función del Juzgado y de la fase judicial hasta el embargo.
                                </li>
                                <li class="mb-1">
                                    Parámetros de revalorización por ubicación.
                                </li>
                                <li class="mb-1">
                                    Evolución del Índice de Precios de Consumo.
                                </li>
                                <li class="mb-1">
                                    Tiempo estimado para la venta del activo por ubicación.
                                </li>
                                <li class="mb-1">
                                    Descuento estimado para la venta del activo por ubicación.
                                </li>
                                <li class="mb-1">
                                    El riesgo de ocupación del activo por zona y el coste estimado de alarma del activo según el nivel de riesgo.
                                </li>
                                <li class="mb-1">
                                    Impuestos y gastos de comunidad conocidos por el propietario.
                                </li>
                                <li class="mb-1">
                                    Estimación de los costes fiscales de la adjudicación de bienes en subasta judicial.
                                </li>
                                <li class="mb-1">
                                    Cobro estimado en la subasta judicial para saber de antemano si será rentable o perjudicial.
                                </li>
                            </ul>
                        </li>
                    </ul>
                </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3">
                <AccordionTrigger>
                    <p class="flex items-center gap-2">
                        <DelivarableIcon /> ¿Qué entregables recibe el Cliente?
                    </p>                   
                </AccordionTrigger>
                <AccordionContent>
                    <ul class="list-disc pl-5">
                        <li class="mb-1">
                            <p class="text-justify font-aptos text-sm">
                                Entregable consolidado de toda la cartera activo por activo.
                            </p>
                        </li>
                        <li class="mb-1">
                            <p class="text-justify font-aptos text-sm">
                                Entregable individual de cada activo con su flujo de caja en el escenario
                                judicial, el valor actual neto, y la comparación con una venta exprés que
                                maximice este valor actual neto.
                            </p>
                        </li>
                    </ul>
                </AccordionContent>
            </AccordionItem>
        </Accordion>

        <div class="mt-10">
            <h3 class="text-xl font-medium">
                Muestras para descargar
            </h3>
        </div>

        <div class="mt-5">
            <ul>
                <li class="mb-1">
                    <div
                        class="my-4"
                    >
                        <div class="relative flex items-center gap-4 w-full p-4 bg-white ">
                            <PdfIcon />

                            <div>
                                <p class="text-black text-lg">
                                    Análisis consolidado de toda la cartera activo por activo.
                                </p>
                            </div>

                            <Button
                                variant="ghost"
                                size="xs"
                                as-child
                            >
                                <a
                                    class="absolute top-4 right-4"
                                    href="#"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <DownloadIcon />
                                </a>
                            </Button>
                        </div>
                    </div>
                </li>

                <li class="mb-1">
                    <div
                        class="my-4"
                    >
                        <div class="relative flex items-center gap-4 w-full p-4 bg-white ">
                            <PdfIcon />

                            <div>
                                <p class="text-black text-lg">
                                    Salida individual.
                                </p>
                            </div>

                            <Button
                                variant="ghost"
                                size="xs"
                                as-child
                            >
                                <a
                                    class="absolute top-4 right-4"
                                    href="#"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <DownloadIcon />
                                </a>
                            </Button>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    </section>
</template>