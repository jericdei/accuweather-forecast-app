<script setup lang="ts">
defineProps<{
    temperature: Temperature
}>()
</script>

<template>
    <div>
        <small>Min: {{ `${temperature.value} °${temperature.unit}` }}</small>
    </div>
</template>
