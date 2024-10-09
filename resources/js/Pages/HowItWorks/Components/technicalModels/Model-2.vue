<script setup lang="ts">
import {
    Accordion, 
    AccordionContent, 
    AccordionItem, 
    AccordionTrigger,
} from '@/Components/ui'
</script>

<template>
    <section class="[&>div]:pl-5">
        <header class="mt-10">
            <h3 class="text-xl">
                Modelo de recuperación Non performing loans secured
            </h3>
        </header>

        <Accordion
            class="mt-10 space-y-4"
            type="single"
            collapsible
        >
            <AccordionItem value="item-1">
                <AccordionTrigger>¿Para quién puede ser útil?</AccordionTrigger>
                <AccordionContent>
                    <ul class="list-disc pl-5">
                        <li class="mb-1">
                            <p class="text-justify font-aptos text-sm">
                                Preparar un proceso de venta o compra de un portfolio.
                            </p>
                        </li>
                        <li class="mb-1">
                            <p class="text-justify font-aptos text-sm">
                                Refinanciar un portfolio.
                            </p>
                        </li>
                        <li class="mb-1">
                            <p class="text-justify font-aptos text-sm">
                                Calcular la rentabilidad futura del portfolio bajo gestión judicial y el valor actual neto de cada préstamo.
                            </p>
                        </li>
                        <li class="mb-1">
                            <p class="text-justify font-aptos text-sm">
                                Comprender y determinar los parámetros económicos para orientar un acuerdo amistoso en la gestión.
                            </p>
                        </li>
                        <li class="mb-1">
                            <p class="text-justify font-aptos text-sm">
                                Conociendo el valor actual neto de cada préstamo, considere alternativas de solución que maximicen potencialmente la rentabilidad esperada (venta granular, estrategia de decreto de adjudicación,...).
                            </p>
                        </li>
                        <li class="mb-1">
                            <p class="text-justify font-aptos text-sm">
                                Conocer el proceso previsto de desinversión del portfolio para reducir costes y asignar el equipo directivo de la forma más eficiente.
                            </p>
                        </li>
                    </ul>
                </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2">
                <AccordionTrigger>¿Cómo funciona?</AccordionTrigger>
                <AccordionContent>
                    <ul class="list-disc pl-5">
                        <li class="mb-1">
                            <p class="text-justify font-aptos text-sm">
                                Análisis préstamo por préstamo de la rentabilidad esperada de la recuperación judicial de la cartera, creando un modelo de flujo de caja para cada préstamo.
                            </p>
                        </li>
                        <li class="mb-1">
                            <p class="text-justify font-aptos text-sm">
                                Calcular el valor actual neto de cada préstamo.
                            </p>
                        </li>
                        <li class="mb-1">
                            <p class="text-justify font-aptos text-sm">
                                Analizar tres escenarios potenciales que podrían mejorar el valor actual neto de cada préstamo en el escenario no favorable.
                            </p>
                        </li>
                        <li class="mb-1">
                            <p class="text-justify font-aptos font-bold text-sm">
                                Parámetros utilizados:
                            </p>
                            <ul class="list-disc pl-5">
                                <li class="mb-1">
                                    <p class="text-justify font-aptos text-sm">
                                        Tiempos judiciales: Tiempos judiciales estimados para cada procedimiento judicial en función del Juzgado y de la fase judicial hasta la adjudicación.
                                    </p>
                                </li>
                                <li class="mb-1">
                                    <p class="text-justify font-aptos text-sm">
                                        Parámetros de revalorización por ubicación.
                                    </p>
                                </li>
                                <li class="mb-1">
                                    <p class="text-justify font-aptos text-sm">
                                        Evolución del Índice de Precios de Consumo.
                                    </p>
                                </li>
                                <li class="mb-1">
                                    <p class="text-justify font-aptos text-sm">
                                        Tiempo estimado para la venta del activo por ubicación.
                                    </p>
                                </li>
                                <li class="mb-1">
                                    <p class="text-justify font-aptos text-sm">
                                        Descuento estimado para la venta del activo por ubicación.
                                    </p>
                                </li>
                                <li class="mb-1">
                                    <p class="text-justify font-aptos text-sm">
                                        El riesgo de ocupación del activo por zona y el coste estimado de alarma del activo según el nivel de riesgo.
                                    </p>
                                </li>
                                <li class="mb-1">
                                    <p class="text-justify font-aptos text-sm">
                                        Estimación de los costes del impuesto sobre bienes inmuebles y de los gastos de comunidad en función del valor catastral estimado.
                                    </p>
                                </li>
                                <li class="mb-1">
                                    <p class="text-justify font-aptos text-sm">
                                        Máxima responsabilidad hipotecaria para determinar el importe máximo cubierto por el activo.
                                    </p>
                                </li>
                                <li class="mb-1">
                                    <p class="text-justify font-aptos text-sm">
                                        Estimación de los porcentajes legales de adjudicación de bienes en subasta judicial.
                                    </p>
                                </li>
                                <li class="mb-1">
                                    <p class="text-justify font-aptos text-sm">
                                        Estimación de los costes fiscales de la adjudicación de bienes en subasta judicial.
                                    </p>
                                </li>
                                <li class="mb-1">
                                    <p class="text-justify font-aptos text-sm">
                                        Cobro estimado en la subasta judicial para saber de antemano si será rentable o perjudicial.
                                    </p>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3">
                <AccordionTrigger>¿Qué entregables recibe el Cliente?</AccordionTrigger>
                <AccordionContent>
                    <ul class="list-disc pl-5">
                        <li class="mb-1">
                            <p class="text-justify font-aptos text-sm">
                                Entregable consolidado de toda la cartera préstamo por préstamo.
                            </p>
                        </li>
                        <li class="mb-1">
                            <p class="text-justify font-aptos text-sm">
                                Entregable individual de cada préstamo con su flujo de caja en el escenario
                                judicial, el valor actual neto, y la comparación con otras alternativas que
                                maximicen este valor actual neto.
                            </p>
                        </li>
                    </ul>
                </AccordionContent>
            </AccordionItem>
        </Accordion>

        <div class="mt-10">
            <h3 class="text-xl">
                Muestras para descargar
            </h3>
        </div>

        <div class="mt-5">
            <ul class="list-disc pl-5">
                <li class="mb-1">
                    <a
                        href="#"
                        class="text-blue"
                    >
                        Entregable consolidado de toda la cartera préstamo por préstamo.
                    </a>
                </li>

                <li class="mb-1">
                    <a
                        href="#"
                        class="text-blue"
                    >
                        Salida individual.
                    </a>
                </li>
            </ul>
        </div>
    </section>
</template>