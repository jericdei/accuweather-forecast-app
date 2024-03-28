<script setup lang="ts">
import MainLayout from "@/layouts/MainLayout.vue"
import AutoComplete, { AutoCompleteCompleteEvent, AutoCompleteItemSelectEvent } from "primevue/autocomplete"
import { ref } from "vue"
import axios from "@/lib/axios"
import ProgressSpinner from "primevue/progressspinner"
import moment from "moment"
import { leftFillNum } from "@/utils/helpers"
import Divider from "primevue/divider"

const search = ref("")
const suggestions = ref([])
const selectedLocation = ref<any>(null)
const forecast = ref<any[]>([])
const forecastLoading = ref(false)
const useApi = false

async function getSuggestions(event: AutoCompleteCompleteEvent) {
    try {
        if (useApi) {
            const response = await axios.get("locations/v1/cities/autocomplete", {
                params: {
                    q: event.query,
                },
            })

            suggestions.value = response.data
        } else {
            suggestions.value = (await import("@/json/sample-search.json")).default as any
        }
    } catch (error) {
        console.error(error)
    }
}

async function getForecast(event: AutoCompleteItemSelectEvent) {
    try {
        forecastLoading.value = true
        selectedLocation.value = event.value

        if (useApi) {
            const response = await axios.get(`forecasts/v1/daily/5day/${event.value.Key}`)

            forecast.value = response.data.DailyForecasts
        } else {
            forecast.value = (await import(`@/json/sample-forecast.json`)).DailyForecasts as any
        }
    } catch (error) {
        console.error(error)
    } finally {
        forecastLoading.value = false
    }
}

function getAddress(location: any, withCity: boolean = false) {
    if (!withCity) {
        return `${location.LocalizedName}, ${location.Country.LocalizedName}`
    }

    return `${location.LocalizedName}, ${location.AdministrativeArea.LocalizedName}, ${location.Country.LocalizedName}`
}
</script>

<template>
    <MainLayout>
        <h1 class="text-center text-2xl font-bold">Weather Forecast App</h1>

        <div class="mt-8">
            <div class="flex justify-center">
                <AutoComplete
                    v-model="search"
                    :suggestions="suggestions"
                    placeholder="Type here"
                    @complete="getSuggestions"
                    @item-select="getForecast"
                    option-label="LocalizedName"
                >
                    <template #option="{ option }">
                        <div class="flex flex-col">
                            <span>{{ option.LocalizedName }}</span>
                            <small>{{ getAddress(option, false) }}</small>
                        </div>
                    </template>
                </AutoComplete>
            </div>

            <div class="mt-16">
                <div v-if="!selectedLocation">
                    <p class="text-center">Search for a location to get 5-day weather forecast.</p>
                </div>

                <div
                    v-else-if="forecastLoading"
                    class="grid place-items-center"
                >
                    <ProgressSpinner />
                </div>

                <div v-else>
                    <h2 class="text-center text-lg font-bold">
                        5-day Weather Forecast for
                        {{ getAddress(selectedLocation, true) }}
                    </h2>

                    <div class="mt-8 grid grid-cols-1 gap-8 md:grid-cols-3 lg:grid-cols-5">
                        <div
                            v-for="item in forecast"
                            :key="item.Date"
                            class="rounded-lg bg-slate-800 p-4"
                        >
                            <p class="text-center font-bold">{{ moment(item.Date).format("dddd, MMM Do") }}</p>

                            <div class="mt-4">
                                <p class="text-center">Temperature:</p>

                                <div class="grid grid-cols-1 justify-items-center lg:grid-cols-2">
                                    <div>
                                        <small
                                            >Min:
                                            {{
                                                `${item.Temperature.Minimum.Value} °${item.Temperature.Minimum.Unit}`
                                            }}</small
                                        >
                                    </div>

                                    <div>
                                        <small
                                            >Max:
                                            {{
                                                `${item.Temperature.Maximum.Value} °${item.Temperature.Maximum.Unit}`
                                            }}</small
                                        >
                                    </div>
                                </div>
                            </div>

                            <div class="mt-4 flex flex-col">
                                <div class="flex flex-col items-center gap-4">
                                    <h3 class="font-medium">Day</h3>

                                    <img
                                        :src="`https://developer.accuweather.com/sites/default/files/${leftFillNum(item.Day.Icon, 2)}-s.png`"
                                    />

                                    <small>{{ item.Day.IconPhrase }}</small>
                                </div>

                                <Divider />

                                <div class="flex flex-col items-center gap-4">
                                    <h3 class="font-medium">Night</h3>

                                    <img
                                        :src="`https://developer.accuweather.com/sites/default/files/${leftFillNum(item.Night.Icon, 2)}-s.png`"
                                    />

                                    <small>{{ item.Night.IconPhrase }}</small>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </MainLayout>
</template>
