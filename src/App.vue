<script setup lang="ts">
import MainLayout from "@/layouts/MainLayout.vue"
import AutoComplete, { AutoCompleteCompleteEvent, AutoCompleteItemSelectEvent } from "primevue/autocomplete"
import { ref } from "vue"
import ProgressSpinner from "primevue/progressspinner"
import ForecastItem from "@/components/ForecastItem.vue"
import { useServiceContainerContext } from "@/composables/service-container"
import { WeatherService } from "./types/weather"

const { weatherService } = useServiceContainerContext() as { weatherService: WeatherService }

const search = ref("")
const suggestions = ref<WeatherLocation[]>([])
const selectedLocation = ref<WeatherLocation | null>(null)
const forecastLoading = ref(false)
const forecast = ref<WeatherForecast | null>(null)

/**
 * Get address string from a location
 *
 * @param location Location to get address
 * @param withCity Whether to include city
 */
function getAddress(location: WeatherLocation, withCity: boolean = false) {
    let locations = [location.region, location.country]

    // Add city to the begining of the array if withCity is true
    if (withCity) {
        locations.unshift(location.name)
    }

    return locations.join(", ")
}

/**
 * Assign the selected location from the autocomplete and get the forecast.
 * @param event
 */
async function getLocationForecast(event: AutoCompleteItemSelectEvent) {
    forecastLoading.value = true

    selectedLocation.value = event.value

    forecast.value = await weatherService.getForecast(selectedLocation.value?.key as string)

    forecastLoading.value = false
}

async function populateSuggestions(event: AutoCompleteCompleteEvent) {
    suggestions.value = await weatherService.getSuggestions(event.query)
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
                    @complete="populateSuggestions"
                    @item-select="getLocationForecast"
                    option-label="name"
                >
                    <template #option="{ option }: { option: WeatherLocation }">
                        <div class="flex flex-col">
                            <span>{{ option.name }}</span>
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

                    <div class="mt-8">
                        <p class="text-center italic">
                            {{ forecast?.headline }}
                        </p>
                    </div>

                    <div class="mt-8 grid grid-cols-1 gap-8 md:grid-cols-3 lg:grid-cols-5">
                        <ForecastItem
                            v-for="item in forecast?.forecasts"
                            :key="item.date"
                            :item="item"
                        />
                    </div>
                </div>
            </div>
        </div>
    </MainLayout>
</template>
