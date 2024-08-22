<script setup lang="ts">
defineProps<{
    variant?: 'default' | 'black'
}>()
</script>

<template>
    <svg
        v-if="variant !== 'black'"
        width="18"
        height="18"
        viewBox="0 0 18 18"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            d="M16 0H2C0.9 0 0 0.9 0 2V16C0 17.1 0.9 18 2 18H16C17.1 18 18 17.1 18 16V2C18 0.9 17.1 0 16 0ZM16 16H2V2H16V16ZM4 7H6V14H4V7ZM8 4H10V14H8V4ZM12 10H14V14H12V10Z"
            fill="#686868"
        />
    </svg>

    <svg
        v-else
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            d="M21.3333 0H2.66667C1.2 0 0 1.2 0 2.66667V21.3333C0 22.8 1.2 24 2.66667 24H21.3333C22.8 24 24 22.8 24 21.3333V2.66667C24 1.2 22.8 0 21.3333 0ZM8 18.6667H5.33333V9.33333H8V18.6667ZM13.3333 18.6667H10.6667V5.33333H13.3333V18.6667ZM18.6667 18.6667H16V13.3333H18.6667V18.6667Z"
            fill="black"
        />
    </svg>
</template>