v-
<script setup>
import { onMounted } from 'vue'
import Plyr from 'plyr'
import 'plyr/dist/plyr.css'

defineProps({
    video: {
        type: String,
        required: true,
    },
})

onMounted(() => {
    new Plyr('#player')
})
</script>

<template>
    <div
        id="player"
        class="plyr__video-embed"
        style="height: 100%; --plyr-color-main: #367E43"
    >
        <iframe
            :src="video"
            allowfullscreen
            allowtransparency
            allow="autoplay"
        />
    </div>
</template>
