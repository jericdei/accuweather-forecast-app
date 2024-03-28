<script setup lang="ts">
defineProps<{
    temperature: Temperature
}>()
</script>

<template>
    <div>
        <small>Min: {{ `${temperature.Value} °${temperature.Unit}` }}</small>
    </div>
</template>
