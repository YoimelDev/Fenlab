<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { useVModel } from '@vueuse/core'
import { cn } from '@/lib/utils'

const props = defineProps<{
  defaultValue?: string | number
  modelValue?: string | number
  class?: HTMLAttributes['class']
}>()

const emits = defineEmits<{
  (e: 'update:modelValue', payload: string | number): void
}>()

const modelValue = useVModel(props, 'modelValue', emits, {
    passive: true,
    defaultValue: props.defaultValue,
})
</script>

<template>
    <input
        v-model="modelValue"
        :class="cn('flex w-full h-12 rounded-t-sm bg-[#F2F4F8] border-b border-[#C1C7CD] py-3 px-4 text-sm  transition-border file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-[#697077] outline-none focus:border-b-[3px] disabled:cursor-not-allowed disabled:opacity-50', props.class)"
    >
</template>
