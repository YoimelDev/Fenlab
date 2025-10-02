<script setup lang="ts">
import { reactive, ref, watch } from 'vue'
import { fenlabApi } from '@/api'
import { useFormatting } from '@/composables/useFormatting'
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

// Obtener las funciones de formateo
const { formatCurrency, formatPercentage } = useFormatting()

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
    brokerFee: props.masterData?.brokerFee || [],
    // Asegurar que successFee existe y tiene todas sus propiedades
    successFee: {
        ventaCredito: props.masterData?.successFee?.ventaCredito ?? 0,
        subastaOrRemate: props.masterData?.successFee?.subastaOrRemate ?? 0,
        repossessedAsset: props.masterData?.successFee?.repossessedAsset ?? 0
    }
});

const emits = defineEmits(['updated'])

// Función para sincronizar hurdles con caps del tramo anterior
const syncBrokerFeeTiersValues = () => {
    // Primero, ordenamos los tramos según su nombre
    const sortedTiers = [...localMasterData.brokerFee].sort((a, b) => {
        // Caso especial para "En Adelante" que siempre debe ir al final
        if (a.tramo.includes('Adelante')) return 1;
        if (b.tramo.includes('Adelante')) return -1;

        const numA = parseInt(a.tramo.replace(/\D/g, ''), 10) || 0;
        const numB = parseInt(b.tramo.replace(/\D/g, ''), 10) || 0;
        return numA - numB;
    });

    // Convertir todos los caps a números
    sortedTiers.forEach(tier => {
        // Asegurar que cap es un número
        tier.cap = typeof tier.cap === 'string' ? parseFloat(tier.cap) : tier.cap;
    });

    // Sincronizamos los hurdles con los caps del tramo anterior
    for (let i = 1; i < sortedTiers.length; i++) {
        // Si es el último tramo "En Adelante", no necesita hurdle
        // if (sortedTiers[i].tramo.includes('Adelante')) continue;

        // Asignar el cap del tramo anterior como hurdle de este tramo
        sortedTiers[i].hurdle = sortedTiers[i - 1].cap;
    }

    // IMPORTANTE: Actualizamos los datos originales con los valores sincronizados
    // Esto es lo que faltaba en tu implementación original
    for (let i = 0; i < sortedTiers.length; i++) {
        const tier = sortedTiers[i];
        const originalTier = localMasterData.brokerFee.find(t => t.tramo === tier.tramo);
        if (originalTier) {
            originalTier.hurdle = tier.hurdle;
            originalTier.cap = tier.cap;
        }
    }
}

// Validar la configuración de tramos antes de enviar
const validateBrokerFeeTiers = () => {
    const tiers = localMasterData.brokerFee;

    // Ordenamos los tramos según su nombre
    const sortedTiers = [...tiers].sort((a, b) => {
        // Caso especial para "En Adelante" que siempre debe ir al final
        if (a.tramo.includes('Adelante')) return 1;
        if (b.tramo.includes('Adelante')) return -1;

        const numA = parseInt(a.tramo.replace(/\D/g, ''), 10) || 0;
        const numB = parseInt(b.tramo.replace(/\D/g, ''), 10) || 0;
        return numA - numB;
    });

    // Convertir todos los valores a números para comparaciones consistentes
    sortedTiers.forEach(tier => {
        // Asegurar que cap es un número
        tier.cap = typeof tier.cap === 'string' ? parseFloat(tier.cap) : tier.cap;

        // Asegurar que hurdle es un número si existe
        if (tier.hurdle !== undefined) {
            tier.hurdle = typeof tier.hurdle === 'string' ? parseFloat(tier.hurdle) : tier.hurdle;
        } else if (!tier.tramo.includes('Adelante')) {
            // Si no es "En Adelante" y falta hurdle, asignar un valor predeterminado
            tier.hurdle = 0;
        }
    });

    // Verificamos que cada tramo tenga hurdle ≤ cap (excepto el último "En Adelante")
    for (let i = 0; i < sortedTiers.length; i++) {
        const tier = sortedTiers[i];

        // Saltamos la validación para el tramo "En Adelante"
        if (tier.tramo.includes('Adelante')) continue;

        if ((tier.hurdle || 0) > (tier.cap || 0)) {
            return {
                valid: false,
                message: `Error en tramo ${tier.tramo}: El valor mínimo (${tier.hurdle}) no puede ser mayor que el valor máximo (${tier.cap})`
            };
        }
    }

    // Verificamos que cada hurdle sea igual al cap del tramo anterior
    for (let i = 1; i < sortedTiers.length; i++) {
        // Saltamos la validación para el tramo "En Adelante"
        if (sortedTiers[i].tramo.includes('Adelante')) continue;

        const prevCap = sortedTiers[i - 1].cap;
        const currentHurdle = sortedTiers[i].hurdle || 0;

        if (currentHurdle !== prevCap) {
            return {
                valid: false,
                message: `Error entre tramos ${sortedTiers[i - 1].tramo} y ${sortedTiers[i].tramo}: El valor máximo del tramo anterior (${prevCap}) debe ser igual al valor mínimo del siguiente (${currentHurdle})`
            };
        }
    }

    return { valid: true };
}

// Reemplaza tu función postData existente
const postData = async () => {
    try {
        // Sincronizar los hurdles antes de validar
        syncBrokerFeeTiersValues();

        // Validar tramos antes de enviar
        const validation = validateBrokerFeeTiers();
        if (!validation.valid) {
            toast({
                variant: 'danger',
                title: 'Error de validación',
                description: validation.message
            });
            return;
        }

        // Forzar cap del último tramo "En Adelante" a 999999999
        localMasterData.brokerFee.forEach(tier => {
            if (tier.tramo.includes('Adelante')) {
                tier.cap = 999999999;
            }
        });

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

        isDialogOpen.value = false;
        emits('updated');
    } catch (error) {
        console.error("Error al guardar datos:", error);
        toast({
            variant: 'danger',
            title: '¡Ups! Algo salió mal.',
            description: 'Por favor, intente nuevamente.'
        });
    }
}

// Observar cambios en los caps para sincronizar hurdles automáticamente
watch(
    () => localMasterData.brokerFee?.map(tier => tier.cap),
    () => {
        if (localMasterData.brokerFee?.length > 0) {
            syncBrokerFeeTiersValues();
        }
    },
    { deep: true }
);
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
                                            <TableHead>Desde (€)</TableHead>
                                            <TableHead>Hasta (€)</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        <TableRow class="[&_td]:px-3 [&_td]:bg-white !border-t border-[#ECECEC]"
                                            v-for="(data, index) in localMasterData.brokerFee" :key="data.tramo">
                                            <TableCell class="!bg-[#ECECEC] font-bold">
                                                {{ data.tramo }}
                                            </TableCell>
                                            <TableCell>
                                                <input type="text" v-percentage v-model="data.fee"
                                                    class="w-full h-full outline-none hover:bg-gray-100">
                                            </TableCell>
                                            <TableCell>
                                                <input v-currency v-model="data.hurdle"
                                                    class="w-full h-full outline-none hover:bg-gray-100"
                                                    :disabled="index >= 0 || data.tramo.includes('Adelante')"
                                                    :title="index > 0 ? 'Este valor se sincroniza automáticamente' :
                                                        data.tramo.includes('Adelante') ? 'No aplicable para este tramo' : ''">
                                            </TableCell>
                                            <TableCell>
                                                <input v-currency v-model="data.cap"
                                                    :disabled="data.tramo.includes('Adelante')"
                                                    class="w-full h-full outline-none hover:bg-gray-100"
                                                    :title="data.tramo.includes('Adelante') ? 'No aplicable para este tramo' : ''"
                                                    :value="data.tramo.includes('Adelante') ? '999999999' : data.cap">
                                            </TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </div>
                        </TabsContent>
                    </Tabs>
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
