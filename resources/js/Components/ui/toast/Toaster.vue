<script setup lang="ts">
import { isVNode } from 'vue'
import { useToast } from './use-toast'
import { Toast, ToastClose, ToastDescription, ToastProvider, ToastTitle, ToastViewport } from '.'
import { InfoCircledIcon } from '@/Components/icons'

const { toasts } = useToast()
</script>

<template>
    <ToastProvider>
        <Toast
            v-for="toast in toasts"
            :key="toast.id"
            v-bind="toast"
        >
            <div class="grid gap-1">             
                <div class="flex items-center gap-4">
                    <InfoCircledIcon class="w-4 h-4" />
                    <ToastTitle v-if="toast.title">
                        {{ toast.title }}
                    </ToastTitle>
                </div>
                <template v-if="toast.description">
                    <ToastDescription v-if="isVNode(toast.description)">
                        <component :is="toast.description" />
                    </ToastDescription>
                    <ToastDescription v-else>
                        {{ toast.description }}
                    </ToastDescription>
                </template>
                <ToastClose />
            </div>
            <component :is="toast.action" />
        </Toast>
        <ToastViewport />
    </ToastProvider>
</template>
