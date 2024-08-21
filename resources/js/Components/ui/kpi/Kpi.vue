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
}

const props = withDefaults(defineProps<Props>(), {
    as: 'section',
})
</script>

<template>
    <section :class="cn(kpiVariants({ variant }), props.class)">
        <h2 class="text-[10px] text-white font-medium leading-[10px]">
            TÍTULO
        </h2>

        <div class="flex flex-col gap-2">
            <p class="text-3xl text-white font-bold leading-8">
                10.000
            </p>
    
            <div class="flex items-center gap-1 text-xs font-bold">
                <ArrowTopRightIcon />
    
                <p 
                    class="!text-[#50CD5E]"
                    :class="{ '!text-[#FF4D4F]': !props.isPositive }"
                >
                    +35,74% <span class="text-white font-normal">vs mes anterior</span>
                </p>
            </div>
        </div>
    </section>
</template>