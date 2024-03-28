<script setup lang="ts">
import MainLayout from "@/layouts/MainLayout.vue"
import AutoComplete, { AutoCompleteCompleteEvent, AutoCompleteItemSelectEvent } from "primevue/autocomplete"
import { ref } from "vue"
import axios from "@/lib/axios"
import ProgressSpinner from "primevue/progressspinner"
import ForecastItem from "@/components/ForecastItem.vue"

const search = ref("")
const suggestions = ref<AccuWeatherLocation[]>([])
const selectedLocation = ref<AccuWeatherLocation | null>(null)
const forecast = ref<DailyForecastResponse | null>(null)
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
            const { default: sampleSearch }: { default: AccuWeatherLocation[] } = await import(
                "@/json/sample-search.json"
            )

            suggestions.value = sampleSearch
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
            const { default: sampleForecast } = await import("@/json/sample-forecast.json")

            forecast.value = sampleForecast as DailyForecastResponse
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
                    <p class="p-32 text-center">Search for a location to get 5-day weather forecast.</p>
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
                        <ForecastItem
                            v-for="item in forecast?.DailyForecasts"
                            :key="item.Date"
                            :item="item"
                        />
                    </div>
                </div>
            </div>
        </div>
    </MainLayout>
</template>
