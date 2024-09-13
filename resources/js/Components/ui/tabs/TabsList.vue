<script setup lang="ts">
import { type HTMLAttributes, computed } from 'vue'
import { TabsList, type TabsListProps } from 'radix-vue'
import { cn } from '@/lib/utils'

const props = defineProps<TabsListProps & { class?: HTMLAttributes['class'] }>()

const delegatedProps = computed(() => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { class: _, ...delegated } = props

    return delegated
})
</script>

<template>
    <TabsList
        v-bind="delegatedProps"
        :class="cn(
            'inline-flex items-center justify-center p-0 text-muted-foreground bg-transparent border-b border-grey',
            props.class,
        )"
    >
        <slot />
    </TabsList>
</template>
