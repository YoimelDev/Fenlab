<script setup lang="ts">
import { type HTMLAttributes, computed } from 'vue'
import {
    AccordionHeader,
    AccordionTrigger,
    type AccordionTriggerProps,
} from 'radix-vue'
import { MinusIcon, PlusIcon } from '@/Components/icons'
import { cn } from '@/lib/utils'

const props = defineProps<AccordionTriggerProps & { class?: HTMLAttributes['class'] }>()

const delegatedProps = computed(() => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { class: _, ...delegated } = props

    return delegated
})
</script>

<template>
    <AccordionHeader class="flex">
        <AccordionTrigger
            v-bind="delegatedProps"
            :class="
                cn(
                    'flex flex-1 items-center justify-between p-4 text-[#21272A] text-xl transition-all hover:underline [&[data-state=open]>svg]:rotate-180 [&[data-state=open]>svg:nth-child(2)]:hidden [&[data-state=closed]>svg:nth-child(3)]:hidden',
                    props.class,
                )
            "
        >
            <slot />
            <slot name="icon">
                <PlusIcon
                    class="h-4 w-4 shrink-0 text-[#21272A]"
                />

                <MinusIcon
                    class="h-4 w-4 shrink-0 text-[#21272A]"
                />
            </slot>
        </AccordionTrigger>
    </AccordionHeader>
</template>
