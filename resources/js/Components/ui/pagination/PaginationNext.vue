<script setup lang="ts">
import { type HTMLAttributes, computed } from 'vue'
import { PaginationNext, type PaginationNextProps } from 'radix-vue'
import { ArrowIcon } from '@/Components/icons'
import {
    Button,
} from '@/Components/ui/button'
import { cn } from '@/lib/utils'

const props = withDefaults(defineProps<PaginationNextProps & { class?: HTMLAttributes['class'] }>(), {
    asChild: true,
})

const delegatedProps = computed(() => {     
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { class: _, ...delegated } = props

    return delegated
})
</script>

<template>
    <PaginationNext v-bind="delegatedProps">
        <Button
            :class="cn('h-9 p-2 text-blue text-sm', props.class)"
            variant="ghost"
        >
            <slot>
                <span class="hidden sm:inline">
                    Siguiente
                </span>

                <ArrowIcon
                    class="sm:ml-2"
                    variant="right"
                />
            </slot>
        </Button>
    </PaginationNext>
</template>
