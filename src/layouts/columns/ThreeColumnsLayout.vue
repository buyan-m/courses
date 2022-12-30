<template>
    <v-row>
        <v-col
            cols="12"
            sm="2"
        >
            <v-sheet
                rounded="lg"
                min-height="268"
            >
                <slot name="secondary" />
            </v-sheet>
        </v-col>

        <v-col
            cols="12"
            sm="8"
        >
            <v-sheet
                min-height="70vh"
                rounded="lg"
            >
                <slot name="primary" />
            </v-sheet>
        </v-col>

        <v-col
            cols="12"
            sm="2"
        >
            <v-sheet
                rounded="lg"
                min-height="268"
            >
                <slot name="tertiary" />
            </v-sheet>
        </v-col>
    </v-row>
</template>
<script lang="ts">
export default {}
</script>
