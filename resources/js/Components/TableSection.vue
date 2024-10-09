<script setup lang="ts">
import { ArrowRightIcon } from '@radix-icons/vue'
import { PictureIcon, AssessmentIcon } from '@/Components/icons'

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/Components/ui/table'
import { type BadgeVariants, Badge, Avatar, AvatarFallback, AvatarImage } from '@/Components/ui'
import { invoices } from '@/data'

type BadgeMode = 'REO' | 'NPL' | 'PL/SPL' | 'Pendiente' | 'En curso' | 'Completado';

const badgeMap: Record<BadgeMode, BadgeVariants['variant']> = {
    REO: 'default',
    NPL: 'primary',
    'PL/SPL': 'secondary',
    Pendiente: 'pending',
    'En curso': 'progress',
    Completado: 'success',
}
</script>

<template>
    <div class="grid grid-cols-1 xl:grid-cols-3 gap-10 mt-8">
        <section class="h-fit py-8 px-4 bg-white rounded-sm">
            <header class="flex justify-between items-center mb-6">
                <h2 class="flex items-center gap-4 text-xl font-bold leading-5">
                    <AssessmentIcon
                        variant="black"
                        class="text-black w-8 h-8"
                    />

                    Mis Análisis
                </h2>

                <ArrowRightIcon class="text-blue w-6 h-6" />
            </header>

            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead class="w-[78px]">
                            MODALIDAD
                        </TableHead>
                        <TableHead>NOMBRE PROYECTO</TableHead>
                        <TableHead>ID CLIENTE</TableHead>
                        <TableHead class="text-right">
                            ESTADO
                        </TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <TableRow
                        v-for="invoice in invoices"
                        :key="invoice.client_id"
                    >
                        <TableCell class="font-medium">
                            <Badge :variant="badgeMap[invoice.mode as BadgeMode]">
                                {{ invoice.mode }}
                            </Badge>
                        </TableCell>
                        <TableCell>{{ invoice.project }}</TableCell>
                        <TableCell>{{ invoice.client_id }}</TableCell>
                        <TableCell class="text-grey text-right">
                            <Badge :variant="badgeMap[invoice.status as BadgeMode]">
                                {{ invoice.status }}
                            </Badge>
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </section> 
        
        <section class="py-8 px-4 bg-white rounded-sm">
            <header class="flex justify-between items-center mb-6">
                <h2 class="flex items-center gap-4 text-xl font-bold leading-5">
                    <PictureIcon class="text-black w-8 h-8" />

                    Pendientes de publicar
                </h2>

                <ArrowRightIcon class="text-blue w-6 h-6" />
            </header>

            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead class="w-[78px]" />
                        <TableHead>NOMBRE PROYECTO</TableHead>
                        <TableHead>ID CLIENTE</TableHead>
                        <TableHead class="text-right">
                            PRECIO MÍNIMO
                        </TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <TableRow
                        v-for="invoice in invoices"
                        :key="invoice.client_id"
                    >
                        <TableCell class="font-medium">
                            <Avatar>
                                <AvatarImage
                                    :src="invoice.image"
                                    alt="Client logo"
                                />
                                <AvatarFallback>FL</AvatarFallback>
                            </Avatar>
                        </TableCell>
                        <TableCell>{{ invoice.project }}</TableCell>
                        <TableCell>{{ invoice.client_id }}</TableCell>
                        <TableCell class="text-right">
                            {{ invoice.min_price }}
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </section>

        <section class="py-8 px-4 bg-white rounded-sm">
            <header class="flex justify-between items-center mb-6">
                <h2 class="flex items-center gap-4 text-xl font-bold leading-5">
                    <PictureIcon class="text-black w-8 h-8" />

                    Publicados
                </h2>

                <ArrowRightIcon class="text-blue w-6 h-6" />
            </header>

            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead class="w-[78px]" />
                        <TableHead>NOMBRE PROYECTO</TableHead>
                        <TableHead>ID CLIENTE</TableHead>
                        <TableHead class="text-right">
                            PRECIO MÍNIMO
                        </TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <TableRow
                        v-for="invoice in invoices"
                        :key="invoice.client_id"
                    >
                        <TableCell class="font-medium">
                            <Avatar>
                                <AvatarImage
                                    :src="invoice.image"
                                    alt="Client logo"
                                />
                                <AvatarFallback>FL</AvatarFallback>
                            </Avatar>
                        </TableCell>
                        <TableCell>{{ invoice.project }}</TableCell>
                        <TableCell>{{ invoice.client_id }}</TableCell>
                        <TableCell class="text-right">
                            {{ invoice.min_price }}
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </section>

        <section class="py-8 px-4 bg-white rounded-sm">
            <header class="flex justify-between items-center mb-6">
                <h2 class="flex items-center gap-4 text-xl font-bold leading-5">
                    <PictureIcon class="text-black w-8 h-8" />

                    Pendientes Aprobación
                </h2>

                <ArrowRightIcon class="text-blue w-6 h-6" />
            </header>

            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead class="w-[78px]">
                            MODALIDAD
                        </TableHead>
                        <TableHead>NOMBRE PROYECTO</TableHead>
                        <TableHead>ID CLIENTE</TableHead>
                        <TableHead class="text-right">
                            FECHA
                        </TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <TableRow
                        v-for="invoice in invoices"
                        :key="invoice.client_id"
                    >
                        <TableCell class="font-medium">
                            <Badge :variant="badgeMap[invoice.mode as BadgeMode]">
                                {{ invoice.mode }}
                            </Badge>
                        </TableCell>
                        <TableCell>{{ invoice.project }}</TableCell>
                        <TableCell>{{ invoice.client_id }}</TableCell>
                        <TableCell class="text-grey text-right">
                            {{ invoice.date }}
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </section>

        <section class="py-8 px-4 bg-white rounded-sm">
            <header class="flex justify-between items-center mb-6">
                <h2 class="flex items-center gap-4 text-xl font-bold leading-5">
                    <PictureIcon class="text-black w-8 h-8" />

                    Pendientes Aprobación PBC
                </h2>

                <ArrowRightIcon class="text-blue w-6 h-6" />
            </header>

            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead class="w-[78px]">
                            MODALIDAD
                        </TableHead>
                        <TableHead>NOMBRE PROYECTO</TableHead>
                        <TableHead>ID CLIENTE</TableHead>
                        <TableHead class="text-right">
                            FECHA
                        </TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <TableRow
                        v-for="invoice in invoices"
                        :key="invoice.client_id"
                    >
                        <TableCell class="font-medium">
                            <Badge :variant="badgeMap[invoice.mode as BadgeMode]">
                                {{ invoice.mode }}
                            </Badge>
                        </TableCell>
                        <TableCell>{{ invoice.project }}</TableCell>
                        <TableCell>{{ invoice.client_id }}</TableCell>
                        <TableCell class="text-grey text-right">
                            {{ invoice.date }}
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </section>

        <section class="py-8 px-4 bg-white rounded-sm">
            <header class="flex justify-between items-center mb-6">
                <h2 class="flex items-center gap-4 text-xl font-bold leading-5">
                    <PictureIcon class="text-black w-8 h-8" />

                    Pendientes Firma
                </h2>

                <ArrowRightIcon class="text-blue w-6 h-6" />
            </header>

            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead class="w-[78px]">
                            MODALIDAD
                        </TableHead>
                        <TableHead>NOMBRE PROYECTO</TableHead>
                        <TableHead>ID CLIENTE</TableHead>
                        <TableHead class="text-right">
                            FECHA
                        </TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <TableRow
                        v-for="invoice in invoices"
                        :key="invoice.client_id"
                    >
                        <TableCell class="font-medium">
                            <Badge :variant="badgeMap[invoice.mode as BadgeMode]">
                                {{ invoice.mode }}
                            </Badge>
                        </TableCell>
                        <TableCell>{{ invoice.project }}</TableCell>
                        <TableCell>{{ invoice.client_id }}</TableCell>
                        <TableCell class="text-grey text-right">
                            {{ invoice.date }}
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </section>
    </div>
</template>