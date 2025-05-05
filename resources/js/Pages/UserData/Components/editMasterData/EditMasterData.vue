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
    Tabs,
    TabsList,
    TabsTrigger,
    TabsContent,
    Label
} from '@/Components/ui'

import { CompanyMasterData } from '@/types/fenlab'

const props = defineProps({
    masterData: {
        type: Object as () => CompanyMasterData | null,
        required: true,
    },
})

const isDialogOpen = ref(false)

// Asegurarse de que todos los objetos anidados estén inicializados
const localMasterData = reactive({
    ...props.masterData,
    // Asegurar que successFee existe y tiene todas sus propiedades
    successFee: {
        ventaCredito: props.masterData?.successFee?.ventaCredito ?? 0,
        subastaOrRemate: props.masterData?.successFee?.subastaOrRemate ?? 0,
        repossessedAsset: props.masterData?.successFee?.repossessedAsset ?? 0
    }
});

const emits = defineEmits(['updated'])

const postData = async () => {
    try {
        // Crear una copia del objeto sin la propiedad fenciaFee
        const dataToSend = { ...localMasterData };
        delete dataToSend.fenciaFee;

        await fenlabApi.post('', {
            method: 'post',
            path: 'company-master-data',
            body: dataToSend,
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
            <Button variant="ghost" class="text-blue text-sm font-medium" size="sm">
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
                <div class="flex flex-col gap-4 max-h-[600px] overflow-y-auto">
                    <Tabs default-value="macro">
                        <TabsList class="grid grid-cols-3">
                            <TabsTrigger value="macro">
                                Macro
                            </TabsTrigger>
                            <TabsTrigger value="brokerFee">
                                Broker Fee
                            </TabsTrigger>
                            <TabsTrigger value="successFee">
                                Success Fee
                            </TabsTrigger>
                        </TabsList>

                        <TabsContent value="macro">
                            <Table>
                                <TableHeader>
                                    <TableRow class="[&_th]:px-3 [&_th]:bg-white">
                                        <TableHead class="!bg-[#ECECEC] w-[140px] z-50 relative">
                                            <Label>AÑO</Label>
                                        </TableHead>
                                        <TableHead>
                                            <Label>IPC (%)</Label>
                                        </TableHead>
                                        <TableHead>
                                            <Label>HPA (%)</Label>
                                        </TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    <TableRow class="[&_td]:px-3 [&_td]:bg-white !border-t border-[#ECECEC]"
                                        v-for="data in localMasterData.macro" :key="data.ano">
                                        <TableCell class="!bg-[#ECECEC] font-bold w-[140px]">
                                            {{ data.ano }}
                                        </TableCell>
                                        <TableCell>
                                            <input v-percentage v-model="data.IPC"
                                                class="w-full h-full outline-none hover:bg-gray-100">
                                        </TableCell>
                                        <TableCell>
                                            <input v-percentage v-model="data.HPA" class="w-full h-full outline-none">
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </TabsContent>

                        <TabsContent value="brokerFee">
                            <div class="mt-6">
                                <Table class="mt-2">
                                    <TableHeader>
                                        <TableRow class="[&_th]:px-3 [&_th]:bg-white">
                                            <TableHead class="!bg-[#ECECEC] z-50 relative">
                                                Tramo
                                            </TableHead>
                                            <TableHead>Fee (%)</TableHead>
                                            <TableHead>Desde</TableHead>
                                            <TableHead>Hasta</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        <TableRow class="[&_td]:px-3 [&_td]:bg-white !border-t border-[#ECECEC]"
                                            v-for="data in localMasterData.brokerFee" :key="data.tramo">
                                            <TableCell class="!bg-[#ECECEC] font-bold">
                                                {{ data.tramo }}
                                            </TableCell>
                                            <TableCell>
                                                <input type="text" v-percentage v-model="data.fee"
                                                    class="w-full h-full outline-none hover:bg-gray-100">
                                            </TableCell>
                                            <TableCell>
                                                <input v-currency v-model="data.cap"
                                                    class="w-full h-full outline-none hover:bg-gray-100">
                                            </TableCell>
                                            <TableCell>
                                                <input v-currency v-model="data.hurdle"
                                                    class="w-full h-full outline-none hover:bg-gray-100">
                                            </TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </div>
                        </TabsContent>

                        <TabsContent value="successFee">
                            <div class="mt-6 grid grid-cols-1 gap-4">
                                <div class="space-y-2">
                                    <Label for="ventaCredito">Venta Crédito (%)</Label>
                                    <Input id="ventaCredito" type="text" class="mt-2" required v-percentage
                                        v-model.number="localMasterData.successFee.ventaCredito" />
                                </div>

                                <div class="space-y-2">
                                    <Label for="subastaOrRemate">Subasta o Remate (%)</Label>
                                    <Input id="subastaOrRemate" type="text" class="mt-2" required v-percentage
                                        v-model.number="localMasterData.successFee.subastaOrRemate" />
                                </div>

                                <div class="space-y-2">
                                    <Label for="repossessedAsset">Repossessed Asset (%)</Label>
                                    <Input id="repossessedAsset" type="text" class="mt-2" required v-percentage
                                        v-model.number="localMasterData.successFee.repossessedAsset" />
                                </div>
                            </div>
                        </TabsContent>
                    </Tabs>

                    <div class="space-y-2">
                        <Label for="wacc">WACC - Coste de Capital</Label>
                        <Input id="wacc" type="text" placeholder="WACC - Coste de Capital" class="mt-2" required
                            autofocus autocomplete="wacc" v-percentage v-model.number="localMasterData.WACC" />
                    </div>

                    <div class="space-y-2">
                        <Label for="managementFee">Management Fee (%)</Label>
                        <Input id="managementFee" type="text" placeholder="Management Fee" class="mt-2" required
                            v-percentage v-model.number="localMasterData.managementFee" />
                    </div>
                </div>
            </div>

            <DialogFooter class="flex justify-between mt-10">
                <Button class="gap-1 w-full" variant="green" size="sm" @click="postData">
                    Guardar
                </Button>
            </DialogFooter>
        </DialogContent>
    </Dialog>
</template>
