<template>
    <div>
        <img
            :src="src"
            alt="ugc"
            :class="$style.image"
        >
    </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    props: {
        src: {
            type: String,
            required: true
        }
    }
})
</script>
<style module>
.image {
    width: 100%;
}
</style>
