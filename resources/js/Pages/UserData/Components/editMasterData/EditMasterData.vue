<script setup lang="ts">
import {    
    Input,
    Button, 
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/Components/ui'

import { dataAnalysis } from '@/data'

// // Crear una copia reactiva de dataAnalysis
// const dataAnalysis = ref(initialDataAnalysis.map(data => ({ ...data })));

// const saveChanges = () => {
//     // Aquí puedes manejar la lógica para guardar los cambios, por ejemplo, enviarlos a un servidor
//     console.log('Datos guardados:', dataAnalysis.value);
// };
</script>

<template>
    <Dialog>
        <DialogTrigger>
            <Button
                variant="ghost"
                class="text-blue text-sm font-medium"
                size="sm"
            >
                Editar
            </Button>
        </DialogTrigger>

        <DialogContent>
            <DialogHeader>
                <DialogTitle>
                    Master data financiera
                </DialogTitle>
            </DialogHeader>

            <div class="content">
                <div
                    class="flex flex-col gap-4"
                >
                    <Table>
                        <TableHeader>
                            <TableRow class="[&_th]:px-3 [&_th]:bg-white">
                                <TableHead class="!bg-[#ECECEC] w-[140px] z-50 relative">
                                    AÑO
                                </TableHead>
                                <TableHead>IPC (%)</TableHead>
                                <TableHead>HPA (%)</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            <TableRow
                                class="[&_td]:px-3 [&_td]:bg-white !border-t border-[#ECECEC]"
                                v-for="data in dataAnalysis"
                                :key="data.id"
                            >
                                <TableCell class="!bg-[#ECECEC] font-bold w-[140px]">
                                    {{ data.year }}
                                </TableCell>
                                <TableCell>
                                    <input
                                        v-model="data.ipc"
                                        class="w-full h-full outline-none hover:bg-gray-100"
                                    >
                                </TableCell>
                                <TableCell>
                                    <input
                                        v-model="data.hpa"
                                        class="w-full h-full outline-none"
                                    >
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>

                    <Input
                        id="wacc"
                        type="text"
                        placeholder="WACC - Coste de Capital"
                        class="mt-2"
                        required
                        autofocus
                        autocomplete="wacc"
                    />
                </div>
            </div>
    
            <DialogFooter class="flex justify-between mt-10">
                <Button 
                    class="gap-1 w-full"
                    variant="green"
                    size="sm"
                >
                    Guardar
                </Button>
            </DialogFooter>
        </DialogContent>
    </Dialog>
</template>