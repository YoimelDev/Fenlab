<script setup lang="ts">
import { Input, Label } from '@/Components/ui'
import type { PendingPBC } from '../../types'

defineProps<{
    information: PendingPBC;
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
            v-if="information.prestashopId"
            class="space-y-2"
        >
            <Label>ID de Prestashop</Label>
            <Input
                :default-value="information.prestashopId"
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
            v-if="information.PBCtype"
            class="space-y-2"
        >
            <Label>Tipo PBC</Label>
            <Input
                :default-value="information.PBCtype"
                disabled
            />
        </div>
        <div
            v-if="information.offerValue"
            class="space-y-2"
        >
            <Label>Valor de Oferta</Label>
            <Input
                :default-value="information.offerValue"
                disabled
            />
        </div>
        <div
            v-if="information.approvedPBCDate"
            class="space-y-2"
        >
            <Label>Fecha Aprobación PBC</Label>
            <Input
                :default-value="information.approvedPBCDate"
                disabled
            />
        </div>
        <div
            v-if="information.approvedPBC2Date"
            class="space-y-2"
        >
            <Label>Fecha Aprobación PBC2</Label>
            <Input
                :default-value="information.approvedPBC2Date"
                disabled
            />
        </div>
        <div
            v-if="information.auctionRecordType"
            class="space-y-2"
        >
            <Label>Tipo de Registro</Label>
            <Input
                :default-value="information.auctionRecordType"
                disabled
            />
        </div>
        <div
            v-if="information.companyId"
            class="space-y-2"
        >
            <Label>ID de Compañía</Label>
            <Input
                :default-value="information.companyId"
                disabled
            />
        </div>
        <div
            v-if="information.publicLinks?.length"
            class="col-span-2 space-y-2"
        >
            <Label>Enlaces Públicos</Label>
            <div class="space-y-2">
                <Input
                    v-for="(link, index) in information.publicLinks"
                    :key="index"
                    :default-value="link"
                    disabled
                />
            </div>
        </div>
    </div>
</template>
