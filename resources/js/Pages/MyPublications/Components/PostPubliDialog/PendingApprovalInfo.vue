<script setup lang="ts">
import { Input, Label } from '@/Components/ui'
import type { PendingApproval } from '../../types'
import { recordTypeLabels } from '@/constants/recordTypes'

defineProps<{
    information: PendingApproval;
}>()
</script>

<template>
    <div class="grid grid-cols-2 gap-4">
        <div
            v-if="information.salesforceId"
            class="space-y-2"
        >
            <Label>ID de Salesforce</Label>
            <Input
                :default-value="information.salesforceId"
                disabled
            />
        </div>
        <div
            v-if="information.fenciaId"
            class="space-y-2"
        >
            <Label>ID de Fencia</Label>
            <Input
                :default-value="information.fenciaId"
                disabled
            />
        </div>
        <div
            v-if="information.fenlabId"
            class="space-y-2"
        >
            <Label>ID de Fenlab</Label>
            <Input
                :default-value="information.fenlabId"
                disabled
            />
        </div>
        <div
            v-if="information.clientId"
            class="space-y-2"
        >
            <Label>ID del Cliente</Label>
            <Input
                :default-value="information.clientId"
                disabled
            />
        </div>
        <div
            v-if="information.name"
            class="space-y-2"
        >
            <Label>Nombre</Label>
            <Input
                :default-value="information.name"
                disabled
            />
        </div>
        <div
            v-if="information.titular"
            class="space-y-2"
        >
            <Label>Titular</Label>
            <Input
                :default-value="information.titular"
                disabled
            />
        </div>
        <div
            v-if="information.stage"
            class="space-y-2"
        >
            <Label>Etapa</Label>
            <Input
                :default-value="information.stage"
                disabled
            />
        </div>
        <div
            v-if="information.PBCstatus"
            class="space-y-2"
        >
            <Label>Estado PBC</Label>
            <Input
                :default-value="information.PBCstatus"
                disabled
            />
        </div>
        <div
            v-if="information.startDate"
            class="space-y-2"
        >
            <Label>Fecha de Inicio</Label>
            <Input
                :default-value="information.startDate.toString()"
                disabled
            />
        </div>
        <div
            v-if="information.minimumPrice"
            class="space-y-2"
        >
            <Label>Precio Mínimo</Label>
            <Input
                :default-value="information.minimumPrice"
                disabled
            />
        </div>
        <div
            v-if="information.referencePrice"
            class="space-y-2"
        >
            <Label>Precio de Referencia</Label>
            <Input
                :default-value="information.referencePrice"
                disabled
            />
        </div>
        <div
            v-if="information.auctionRecordType"
            class="space-y-2"
        >
            <Label>Tipo de Registro</Label>
            <Input
                :default-value="recordTypeLabels[information.auctionRecordType]"
                disabled
            />
        </div>
    </div>
</template>
