<script setup lang="ts">
import { 
    DataTable,
} from '@/Components/ui'

import {  dataAnalysisAssets } from '@/data'
import { columns } from './columns'
</script>

<template>
    <DataTable
        :columns="columns"
        :data="dataAnalysisAssets"
        column-filter="client_id"
    />
</template>
