<script setup lang="ts">
import { type HTMLAttributes, computed } from 'vue'
import { TabsTrigger, type TabsTriggerProps, useForwardProps } from 'radix-vue'
import { cn } from '@/lib/utils'

const props = defineProps<TabsTriggerProps & { class?: HTMLAttributes['class'] }>()

const delegatedProps = computed(() => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { class: _, ...delegated } = props

    return delegated
})

const forwardedProps = useForwardProps(delegatedProps)
</script>

<template>
    <TabsTrigger
        v-bind="forwardedProps"
        :class="cn(
            'inline-flex items-center justify-center whitespace-nowrap px-3 py-1 text-sm text-[#686868] font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-electric-green focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border-b-2 border-b-transparent data-[state=active]:border-b-2 data-[state=active]:border-electric-green data-[state=active]:text-black',
            props.class,
        )"
    >
        <span class="truncate">
            <slot />
        </span>
    </TabsTrigger>
</template>
