<script setup lang="ts">
import { reactive, ref } from 'vue'
import { fenlabApi } from '@/api'
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
    toast,
} from '@/Components/ui'

import { CompanyMasterData } from '@/types/fenlab'

const props = defineProps({
    masterData: {
        type: Object as () => CompanyMasterData | null,
        required: true,
    },
})

const isDialogOpen = ref(false)
const localMasterData = reactive({ ...props.masterData })

const emits = defineEmits(['updated'])

const postData = async () => {
    try {
        await fenlabApi.post('', {
            method: 'post',
            path: 'company-master-data',
            body: { ...localMasterData },
        })

        toast({
            variant: 'info',
            title: 'Datos guardados correctamente',
        }) 
        emits('updated')
    } catch {
        toast({
            variant: 'danger',
            title: '¡Ups! Algo salió mal.',
        })
    } finally {
        isDialogOpen.value = false
    }
}
</script>

<template>
    <Dialog v-model:open="isDialogOpen">
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
                                v-for="data in localMasterData.macro"
                                :key="data.ano"
                            >
                                <TableCell class="!bg-[#ECECEC] font-bold w-[140px]">
                                    {{ data.ano }}
                                </TableCell>
                                <TableCell>
                                    <input
                                        v-model="data.IPC"
                                        class="w-full h-full outline-none hover:bg-gray-100"
                                    >
                                </TableCell>
                                <TableCell>
                                    <input
                                        v-model="data.HPA"
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
                        v-model.number="localMasterData.WACC"
                    />
                </div>
            </div>
    
            <DialogFooter class="flex justify-between mt-10">
                <Button 
                    class="gap-1 w-full"
                    variant="green"
                    size="sm"
                    @click="postData"
                >
                    Guardar
                </Button>
            </DialogFooter>
        </DialogContent>
    </Dialog>
</template>