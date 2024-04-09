<script setup lang="ts">
import moment from "moment"
import Divider from "primevue/divider"
import ForecastTemperature from "./ForecastTemperature.vue"
import ForecastWeather from "./ForecastWeather.vue"

defineProps<{
    item: Forecast
}>()
</script>

<template>
    <div class="rounded-lg bg-slate-800 p-4">
        <p class="text-center font-bold">{{ moment(item.date).format("dddd, MMM Do") }}</p>

        <div class="mt-4">
            <p class="text-center">Temperature:</p>

            <div class="grid grid-cols-1 justify-items-center lg:grid-cols-2">
                <ForecastTemperature :temperature="item.temperatures.min" />
                <ForecastTemperature :temperature="item.temperatures.max" />
            </div>
        </div>

        <div class="mt-4 flex flex-col">
            <ForecastWeather
                type="Day"
                :data="item.day"
            />

            <Divider />

            <ForecastWeather
                type="Night"
                :data="item.night"
            />
        </div>
    </div>
</template>
