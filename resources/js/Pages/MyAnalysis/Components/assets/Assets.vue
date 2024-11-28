<script setup lang="ts">
import { 
    DataTable,
} from '@/Components/ui'
import type { PropType } from 'vue'
import { columns } from './columns'
import { type AssetData } from '../../types/index'

defineProps({
    assets: {
        type: Array as PropType<AssetData[]>,
        required: true,
    },
})

</script>

<template>
    <DataTable
        :columns="columns"
        :data="assets"
        column-filter="client_id"
    />
</template>
