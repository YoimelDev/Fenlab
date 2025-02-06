<script setup lang="ts">
import type { PendingApproval, PendingPBC, PendingNotary } from '../../types'
import PendingApprovalInfo from './PendingApprovalInfo.vue'
import PendingPBCInfo from './PendingPBCInfo.vue'
import PendingNotaryInfo from './PendingNotaryInfo.vue'
import { ScrollArea } from '@/Components/ui'

defineProps<{
    information: PendingApproval | PendingPBC | PendingNotary;
    postType: 'pendingApproval' | 'pendingPBC' | 'pendingNotary';
}>()
</script>

<template>
    <ScrollArea
        class="h-96 space-y-4 my-4 p-4 bg-white/100 rounded-sm border border-[#E5E7EB] shadow-sm"
    >
        <PendingApprovalInfo
            v-if="postType === 'pendingApproval'"
            :information="information as PendingApproval"
        />
        <PendingPBCInfo
            v-else-if="postType === 'pendingPBC'"
            :information="information as PendingPBC"
        />
        <PendingNotaryInfo
            v-else-if="postType === 'pendingNotary'"
            :information="information as PendingNotary"
        />
    </ScrollArea>
</template>
