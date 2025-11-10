<script setup lang="ts">
import {
    DataTable,
} from '@/Components/ui'
import { computed, type PropType } from 'vue'
import { getColumnsForModelType } from './columns'
import { type AssetData } from '../../types/index'
import type { ModelType } from '@/types/fenlab'

const props = defineProps({
    assets: {
        type: Array as PropType<AssetData[]>,
        required: true,
    },
    modelType: {
        type: String as PropType<ModelType>,
        required: false,
    },
})

// Determinar el tipo de modelo basándose en la prop o en el primer asset
const modelType = computed(() => {
    // Si se pasó el modelType como prop, usarlo directamente
    if (props.modelType) {
        // Normalizar el tipo para las columnas
        if (props.modelType === 'NPL_BUY') return 'NPL_BUY';
        if (props.modelType === 'REO') return 'REO';
        if (props.modelType === 'NPL') return 'NPL';
        // Por defecto PL/SPL se trata como NPL
        return 'NPL';
    }
    
    // Fallback: detectar del primer asset
    if (props.assets && props.assets.length > 0) {
        const firstAsset = props.assets[0];
        // Determinar el tipo según si tiene npl o reo
        if (firstAsset.npl) {
            // Si tiene precioCompra o modalidadCompra, es NPL Buy
            if (firstAsset.precioCompra !== null || firstAsset.modalidadCompra !== null) {
                return 'NPL_BUY';
            }
            return 'NPL';
        } else if (firstAsset.reo) {
            return 'REO';
        }
    }
    return 'NPL' // Por defecto
})

// Obtener las columnas correspondientes al tipo de modelo
const columns = computed(() => getColumnsForModelType(modelType.value))

</script>

<template>
    <DataTable :columns="columns" :data="assets" column-filter="clientId" />
</template>
