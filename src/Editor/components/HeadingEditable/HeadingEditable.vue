<template>
    <div :class="$style.heading">
        ✏️
        <h1
            ref="element"
            :class="$style.contentEditable"
            contenteditable="true"
        />
    </div>
</template>
<script setup lang="ts">
import {
    ref, defineProps, defineEmits, onMounted, watch, VueElement
} from 'vue'

const props = defineProps<{ text: string }>()
const emitter = defineEmits<{ change:[value: string] }>()

const element = ref<VueElement | null>(null)
function updateValue() {
    element.value!.innerHTML = props.text
}
watch(() => props.text, updateValue)
onMounted(() => {
    element.value!.addEventListener('input', () => {
        emitter('change', element.value!.innerText)
    })
    updateValue()
})

</script>
<style module>
.heading {
    display: flex;
    align-items: center;
    padding-bottom: 20px;
}

.contentEditable {
    flex-basis: 100%;
}
</style>
