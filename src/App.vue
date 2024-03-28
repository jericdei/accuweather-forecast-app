<script setup lang="ts">
import MainLayout from "@/layouts/MainLayout.vue"
import AutoComplete from "primevue/autocomplete"
import { ref } from "vue"
import ProgressSpinner from "primevue/progressspinner"
import ForecastItem from "@/components/ForecastItem.vue"
import useAccuWeather from "@/composables/accuweather"
import useAutoComplete from "@/composables/autocomplete"

const search = ref("")

const { suggestions, getSuggestions } = useAutoComplete()
const { getForecast, selectedLocation, forecastLoading, forecast } = useAccuWeather()

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

                    <div class="mt-8">
                        <p class="text-center italic">
                            {{ forecast?.Headline.Text }}
                        </p>
                    </div>

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
