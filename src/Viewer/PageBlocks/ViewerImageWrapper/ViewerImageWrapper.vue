<template>
    <div :class="$style.wrapper">
        <img
            :src="src"
            alt="ugc"
            :class="$style.image"
        >
        <div
            v-if="caption"
            :class="$style.caption"
        >
            {{ caption }}
        </div>
    </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    props: {
        src: {
            type: String,
            required: true
        },
        caption: {
            type: String,
            default: () => ''
        }
    }
})
</script>
<style module>
.wrapper {
    border: var(--el-border);
    line-height: 0;
    margin-bottom: 20px
}
.image {
    width: 100%;
}
.caption {
    font-style: italic;
    line-height: 20px;
    padding: 10px 20px;
}
</style>
