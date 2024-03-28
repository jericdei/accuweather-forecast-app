<script setup lang="ts">
import moment from "moment"
import Divider from "primevue/divider"
import ForecastTemperature from "./ForecastTemperature.vue"
import ForecastWeather from "./ForecastWeather.vue"

defineProps<{
    item: DailyForecast
}>()
</script>

<template>
    <div class="rounded-lg bg-slate-800 p-4">
        <p class="text-center font-bold">{{ moment(item.Date).format("dddd, MMM Do") }}</p>

        <div class="mt-4">
            <p class="text-center">Temperature:</p>

            <div class="grid grid-cols-1 justify-items-center lg:grid-cols-2">
                <ForecastTemperature :temperature="item.Temperature.Minimum" />
                <ForecastTemperature :temperature="item.Temperature.Maximum" />
            </div>
        </div>

        <div class="mt-4 flex flex-col">
            <ForecastWeather
                type="Day"
                :data="item.Day"
            />

            <Divider />

            <ForecastWeather
                type="Night"
                :data="item.Night"
            />
        </div>
    </div>
</template>
