<script setup lang="ts">
defineProps<{
    type: "Day" | "Night"
    data: DayNight
}>()
</script>

<template>
    <div class="flex flex-col items-center gap-4">
        <h3 class="font-medium">{{ type }}</h3>

        <!-- TODO: implement icon for accuweather -->
        <!-- <img :src="`https://developer.accuweather.com/sites/default/files/${leftFillNum(data.icon, 2)}-s.png`" /> -->
        <img :src="data.iconLink" />

        <small>{{ data.label }}</small>
    </div>
</template>
