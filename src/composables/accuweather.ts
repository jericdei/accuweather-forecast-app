import axios from "@/lib/axios"
import { AutoCompleteItemSelectEvent } from "primevue/autocomplete"
import { ref } from "vue"
import useAutoComplete from "@/composables/autocomplete"

const useApi = import.meta.env.VITE_USE_API === "true"

export default function useAccuWeather() {
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

            forecast.value = response.data
        } catch (error) {
            console.error(error)
        } finally {
            forecastLoading.value = false
        }
    }

    return { selectedLocation, getForecast, forecast, forecastLoading }
}
