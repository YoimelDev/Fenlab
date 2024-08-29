<script setup lang="ts">
defineProps<{
    variant?: 'left' | 'right'
}>()
</script>

<template>
    <svg
        v-if="variant === 'left'"
        width="15"
        height="14"
        viewBox="0 0 15 14"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            d="M13.3333 6.99999H1.66663M1.66663 6.99999L7.49996 12.8333M1.66663 6.99999L7.49996 1.16666"
            stroke="#004DF2"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
        />
    </svg>       

    <svg
        v-else
        width="15"
        height="14"
        viewBox="0 0 15 14"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            d="M1.66675 6.99999H13.3334M13.3334 6.99999L7.50008 1.16666M13.3334 6.99999L7.50008 12.8333"
            stroke="#004DF2"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
        />
    </svg>
</template>