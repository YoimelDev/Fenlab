<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { Link } from '@inertiajs/vue3'
import { PictureIcon, AssessmentIcon } from '@/Components/icons'
import { ArrowRightIcon } from '@radix-icons/vue'
import { 
    DataTable, 
    Button,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/Components/ui'
import { columnsAnalysis } from './columnsAnalysis'
import { fenlabApi } from '@/api/fenlab.api'
import { Projects, Project } from '@/types/fenlab'
import { invoices } from '@/data'
import { type BadgeMode, badgeMap, Badge, Avatar, AvatarFallback, AvatarImage } from '@/Components/ui'
const analysis = ref<Project[]>([])

const getAnalysis = async () => {
    const { data: response } = await fenlabApi.post<Projects>('', {
        method: 'get',
        path: 'projects',
        body: {
            perPage: 5,
        },
    })

    analysis.value = response.data
}

onMounted(() => {
    getAnalysis()
})
</script>

<template>
    <div class="grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-10 mt-8">
        <section class="h-fit py-8 px-4 bg-white rounded-sm [&>div]:m-0 [&>div]:p-0">
            <header class="flex justify-between items-center mb-6">
                <h2 class="flex items-center gap-4 text-xl font-bold leading-5">
                    <AssessmentIcon
                        variant="black"
                        class="text-black w-8 h-8"
                    />

                    Mis Análisis
                </h2>

                <Button
                    as-child
                    variant="ghost"
                    class="text-blue text-sm font-medium"
                    size="sm"
                >
                    <Link
                        :href="route('analysis')"
                    >
                        <ArrowRightIcon class="text-blue w-6 h-6" />
                    </Link>
                </Button>
            </header>

            <DataTable
                :activate-pagination="false"
                :columns="columnsAnalysis"
                :data="analysis"
            />
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
                        <TableHead>ID FENLAB</TableHead>
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
                        <TableHead>ID FENLAB</TableHead>
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
                        <TableHead>ID FENLAB</TableHead>
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
                        <TableHead>ID FENLAB</TableHead>
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
                        <TableHead>ID FENLAB</TableHead>
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