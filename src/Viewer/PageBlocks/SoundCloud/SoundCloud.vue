<template>
    <div ref="wrapper" />
</template>
<script lang="ts" setup>
import { ref, defineProps, onMounted } from 'vue'
import { createSoundcloudEmbed } from '@/utils/embeds'

const props = defineProps({
    url: {
        required: true,
        type: String
    }
})
const wrapper = ref<HTMLElement | null>(null)
onMounted(() => {
    createSoundcloudEmbed(props.url).then((html) => {
        wrapper.value!.innerHTML = html
    })
})

</script>
