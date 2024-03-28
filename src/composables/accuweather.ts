import axios from "@/lib/axios"
import { ref } from "vue"

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
