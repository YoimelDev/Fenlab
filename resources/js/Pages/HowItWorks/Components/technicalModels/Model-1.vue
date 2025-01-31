<script setup lang="ts">
import { PdfIcon, BulbIcon, WorksIcon, DelivarableIcon } from '@/Components/icons'
import {
    Accordion, 
    AccordionContent, 
    AccordionItem, 
    AccordionTrigger,
    Badge,
} from '@/Components/ui'
</script>

<template>
    <section class="[&>div]:pl-5">
        <header class="mt-10">
            <h3 class="flex items-center gap-2 text-xl font-medium">
                Modelo de cashflow para préstamos Performing &amp; Re-performing secured &amp; unsecured
                <Badge
                    variant="secondary"
                    class="text-xs"
                >
                    PL/SPL S
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
                    <ol class="list-decimal text-sm font-aptos">
                        <ul class="list-disc pl-5">
                            <li class="mb-1">
                                <p class="text-justify font-aptos font-bold text-sm">
                                    Tenedores y gestores de portfolios:
                                </p>
                                <ul class="list-disc pl-5">
                                    <li class="mb-1">
                                        <p class="text-justify font-aptos text-sm">
                                            Preparar un proceso de venta.
                                        </p>
                                    </li>
                                    <li class="mb-1">
                                        <p class="text-justify font-aptos text-sm">
                                            Titulizar el portfolio.
                                        </p>
                                    </li>
                                    <li class="mb-1">
                                        <p class="text-justify font-aptos text-sm">
                                            Refinanciar el portfolio.
                                        </p>
                                    </li>
                                    <li class="mb-1">
                                        <p class="text-justify font-aptos text-sm">
                                            Calcular la rentabilidad esperada y el rendimiento del portfolio gestionado.
                                        </p>
                                    </li>
                                </ul>
                            </li>
                            <li class="mb-2">
                                <p class="text-justify font-aptos font-bold text-sm">
                                    Compradores de portfolios:
                                </p>
                                <ul class="list-disc pl-5">
                                    <li class="mb-1">
                                        <p class="text-justify font-aptos text-sm">
                                            Para calcular la rentabilidad esperada del portfolio y, consecuentemente, de la inversión.
                                        </p>
                                    </li>
                                    <li class="mb-1">
                                        <p class="text-justify font-aptos text-sm">
                                            Calcular la comisión de gestión del portfolio, en función de los costes de gestión (gestión de activos por préstamo, gestión jurídica, etc.).
                                        </p>
                                    </li>
                                    <li class="mb-1">
                                        <p class="text-justify font-aptos text-sm">
                                            Conocer las futuras necesidades de financiación y liquidez del portfolio.
                                        </p>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </ol>
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
                            <p class="text-justify font-aptos text-sm">
                                Análisis del desempeño histórico de cada préstamo incluido en el portfolio
                                para concluir sobre: (i) probabilidad de pago, (ii) probabilidad de impago,
                                (iii) recuperación parcial, (iv) recuperación total, (v) amortización anticipada.
                            </p>
                        </li>
                        <li class="mb-1">
                            <p class="text-justify font-aptos text-sm">
                                A partir del rendimiento histórico de cada préstamo, crea segmentos del
                                portfolio para simular el rendimiento futuro del portfolio, en relación con las
                                probabilidades atribuidas por vendedor o comprador.
                            </p>
                        </li>
                        <li class="mb-1">
                            <p class="text-justify font-aptos text-sm">
                                Simular el rendimiento futuro del portfolio por el método de Monte Carlo 1,
                                préstamo por préstamo.
                            </p>
                        </li>
                    </ul>
                
                    <ul class="list-inside pl-5 mt-5">
                        <li class="mb-1">
                            <p class="text-justify font-aptos text-xs">
                                Simulación de Montecarlo, también conocida como método de Montecarlo o simulación de probabilidad múltiple. Es una técnica matemática utilizada para estimar los posibles resultados de un suceso incierto.
                            </p>
                        </li>
                        <li class="mb-1">
                            <p class="text-justify font-aptos text-xs">
                                A diferencia de un modelo de previsión normal, la simulación de Montecarlo predice un conjunto de resultados basados en un rango estimado de valores frente a un conjunto de valores de entrada fijos. En otras palabras, una simulación de Montecarlo crea un modelo de posibles resultados utilizando una distribución de probabilidad, como una distribución uniforme o normal, para cualquier variable que tenga incertidumbre inherente. A continuación, recalcula los resultados repetidamente, utilizando cada vez un conjunto diferente de números aleatorios entre los valores mínimo y máximo. En un experimento Monte Carlo típico, este ejercicio puede repetirse miles de veces para generar muchos resultados probables.
                            </p>
                        </li>
                        <li class="mb-1">
                            <p class="text-justify font-aptos text-xs">
                                Las simulaciones Monte Carlo también se utilizan para predicciones a largo plazo debido a su precisión. A medida que aumenta el número de entradas, aumenta también el número de predicciones, lo que permite proyectar los resultados a largo plazo con mayor precisión. Cuando finaliza una simulación de Monte Carlo, se obtiene una serie de resultados posibles con la probabilidad de que se produzca cada uno de ellos.
                            </p>
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
                                Rendimiento mensual de cada préstamo hasta su vencimiento.
                            </p>
                        </li>
                        <li class="mb-1">
                            <p class="text-justify font-aptos text-sm">
                                Rendimiento mensual y anual consolidado del portfolio, desglosado por: Flujo de caja bruto, importe impagado, importe de amortización (también costes y flujo de caja neto si se incluye).
                            </p>
                        </li>
                        <li class="mb-1">
                            <p class="text-justify font-aptos text-sm">
                                Balance consolidado mensual y anual de la cartera por número de préstamos gestionados, resueltos, en mora, prepagados.
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
            <ul class="">
                <li class="mb-1">
                    <div
                        class="my-4"
                    >
                        <a
                            class="relative flex items-center gap-4 w-full p-4 bg-white transition-colors hover:bg-[#004DF21A]"
                            href="#"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <PdfIcon />

                            <div>
                                <p class="text-black text-lg">
                                    Modelo de flujo de caja (mensual y anual).
                                </p>
                            </div>
                        </a>
                    </div>
                </li>

                <li class="mb-1">
                    <div
                        class="my-4"
                    >
                        <a 
                            class="relative flex items-center gap-4 w-full p-4 bg-white transition-colors hover:bg-[#004DF21A]"
                            href="#"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <PdfIcon />

                            <div>
                                <p class="text-black text-lg">
                                    Modelo de balance (mensual y anual).
                                </p>
                            </div>
                        </a>
                    </div>
                </li>
            </ul>
        </div>
    </section>
</template>