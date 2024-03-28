<script setup lang="ts">
import { leftFillNum } from "@/utils/helpers"

defineProps<{
    type: "Day" | "Night"
    data: DayNightData
}>()
</script>

<template>
    <div class="flex flex-col items-center gap-4">
        <h3 class="font-medium">{{ type }}</h3>

        <img :src="`https://developer.accuweather.com/sites/default/files/${leftFillNum(data.Icon, 2)}-s.png`" />

        <small>{{ data.IconPhrase }}</small>
    </div>
</template>
