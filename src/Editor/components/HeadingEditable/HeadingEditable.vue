<template>
    <h1
        ref="element"
        contenteditable="true"
    />
</template>
<script setup lang="ts">
import {
    ref, defineProps, defineEmits, onMounted, watch, VueElement
} from 'vue'

const props = defineProps<{ text: string }>()
const emitter = defineEmits<{(e: 'change', value: string): void }>()

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
