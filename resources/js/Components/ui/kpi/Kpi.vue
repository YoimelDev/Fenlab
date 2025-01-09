<!-- eslint-disable vue/require-default-prop -->
<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { ArrowTopRightIcon } from '@radix-icons/vue'
import { type PrimitiveProps } from 'radix-vue'
import { type KpiVariants, kpiVariants  } from '.'
import { cn } from '@/lib/utils'

interface Props extends PrimitiveProps {
    variant?: KpiVariants['variant']
    class?: HTMLAttributes['class']
    isPositive: boolean
    title: string
    value: string | number
    percentage: string | number
}

const props = withDefaults(defineProps<Props>(), {
    as: 'section',
})
</script>

<template>
    <section :class="cn(kpiVariants({ variant }), props.class)">
        <h2 class="text-[10px] text-white font-medium leading-[10px]">
            {{ title }}
        </h2>

        <div class="flex flex-col gap-2">
            <p class="text-3xl text-white font-bold leading-8">
                {{ value }}
            </p>
    
            <div class="flex items-center gap-1 text-xs font-bold">
                <ArrowTopRightIcon
                    class="!text-[#50CD5E]"
                    :class="{ '!text-[#FF4D4F]': !props.isPositive }"
                />
    
                <p 
                    class="!text-[#50CD5E]"
                    :class="{ '!text-[#FF4D4F]': !props.isPositive }"
                >
                    {{ percentage }}% <span class="text-white font-normal">vs mes anterior</span>
                </p>
            </div>
        </div>
    </section>
</template>