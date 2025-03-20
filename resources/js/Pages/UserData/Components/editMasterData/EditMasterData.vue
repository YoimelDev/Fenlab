<script setup lang="ts">
import { reactive, ref } from 'vue'
import { fenlabApi } from '@/api'
import {
    Input,
    Button,
    ScrollArea,
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
                <div class="flex flex-col gap-4">
                    <ScrollArea
                        class="h-96 space-y-4 my-4 p-4 bg-white/100 rounded-sm border border-[#E5E7EB] shadow-sm"
                    >
                        <Tabs default-value="macro">
                            <TabsList class="grid grid-cols-2">
                                <TabsTrigger value="macro">
                                    Macro
                                </TabsTrigger>
                                <TabsTrigger value="brokerFee">
                                    Broker Fee
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
                            </TabsContent>

                            <TabsContent value="brokerFee">
                                <div
                                    v-if="localMasterData.brokerFee?.gestion"
                                    class="mt-6"
                                >
                                    <Table class="mt-2">
                                        <TableHeader>
                                            <TableRow class="[&_th]:px-3 [&_th]:bg-white">
                                                <TableHead class="!bg-[#ECECEC] z-50 relative">
                                                    Tramo
                                                </TableHead>
                                                <TableHead>Fee (%)</TableHead>
                                                <TableHead>Cap</TableHead>
                                                <TableHead>Hurdle</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            <TableRow
                                                class="[&_td]:px-3 [&_td]:bg-white !border-t border-[#ECECEC]"
                                                v-for="data in localMasterData.brokerFee.gestion"
                                                :key="data.tramo"
                                            >
                                                <TableCell class="!bg-[#ECECEC] font-bold">
                                                    {{ data.tramo }}
                                                </TableCell>
                                                <TableCell>
                                                    <input
                                                        v-model.number="data.fee"
                                                        class="w-full h-full outline-none hover:bg-gray-100"
                                                    >
                                                </TableCell>
                                                <TableCell>
                                                    <input
                                                        v-model.number="data.cap"
                                                        class="w-full h-full outline-none hover:bg-gray-100"
                                                    >
                                                </TableCell>
                                                <TableCell>
                                                    <input
                                                        v-model.number="data.hurdle"
                                                        class="w-full h-full outline-none hover:bg-gray-100"
                                                    >
                                                </TableCell>
                                            </TableRow>
                                        </TableBody>
                                    </Table>
                                </div>
                                <div v-else>
                                    <!-- ...optional no data message... -->
                                </div>
                            </TabsContent>
                        </Tabs>
                    </ScrollArea>

                    <div class="space-y-2">
                        <Label for="wacc">WACC - Coste de Capital</Label>
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
