import axios from "@/lib/axios"
import { AutoCompleteCompleteEvent, AutoCompleteItemSelectEvent } from "primevue/autocomplete"
import { ref } from "vue"

const useApi = false

export function useAutoComplete() {
    const suggestions = ref<AccuWeatherLocation[]>([])
    const selectedLocation = ref<AccuWeatherLocation | null>(null)

    async function getSuggestions(event: AutoCompleteCompleteEvent) {
        if (!useApi) {
            const { default: sampleSearch }: { default: AccuWeatherLocation[] } = await import(
                "@/json/sample-search.json"
            )

            suggestions.value = sampleSearch

            return
        }

        try {
            const response = await axios.get("locations/v1/cities/autocomplete", {
                params: {
                    q: event.query,
                },
            })

            suggestions.value = response.data
        } catch (error) {
            console.error(error)
        }
    }

    return { suggestions, getSuggestions, selectedLocation }
}

export function useAccuWeather() {
    const { selectedLocation } = useAutoComplete()

    const forecast = ref<DailyForecastResponse | null>(null)
    const forecastLoading = ref(false)

    async function getForecast(event: AutoCompleteItemSelectEvent) {
        forecastLoading.value = true
        selectedLocation.value = event.value

        if (!useApi) {
            const { default: sampleForecast } = await import("@/json/sample-forecast.json")

            forecast.value = sampleForecast as DailyForecastResponse

            forecastLoading.value = false

            return
        }

        try {
            const response = await axios.get(`forecasts/v1/daily/5day/${event.value.Key}`)

            forecast.value = response.data.DailyForecasts
        } catch (error) {
            console.error(error)
        } finally {
            forecastLoading.value = false
        }
    }

    return { selectedLocation, getForecast, forecast, forecastLoading }
}
