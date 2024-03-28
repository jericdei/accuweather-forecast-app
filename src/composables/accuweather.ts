import axios from "@/lib/axios"
import { ref } from "vue"

const useApi = import.meta.env.VITE_USE_API === "true"

/**
 * Composable for AccuWeather Forecast API Service
 */
export default function useAccuWeather() {
    const forecast = ref<DailyForecastResponse | null>(null)
    const forecastLoading = ref(false)

    /**
     * Get forecast based on selected
     * @param event
     * @returns
     */
    async function getForecast(location: AccuWeatherLocation) {
        forecastLoading.value = true

        if (!useApi) {
            const { default: sampleForecast } = await import("@/json/sample-forecast.json")

            forecast.value = sampleForecast as DailyForecastResponse

            forecastLoading.value = false

            return
        }

        try {
            const response = await axios.get(`forecasts/v1/daily/5day/${location.Key}`)

            forecast.value = response.data
        } catch (error) {
            console.error(error)
        } finally {
            forecastLoading.value = false
        }
    }

    return { getForecast, forecast, forecastLoading }
}
