import axios from "@/lib/axios"
import { AxiosError } from "axios"
import { ref } from "vue"
import { useToast } from "primevue/usetoast"

/**
 * Composable for AccuWeather Forecast API Service
 */
export default function useAccuWeather() {
    const toast = useToast()

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

            let message = "Something went wrong. Please refresh the page and try again."

            if (error instanceof AxiosError) {
                if (error.response?.status === 503) {
                    message = "API key is expired."
                } else {
                    message = error.response?.data.Message
                }
            }

            toast.add({
                severity: "error",
                summary: "Error",
                detail: message,
                group: "br",
                life: 3000,
            })
        } finally {
            forecastLoading.value = false
        }
    }

    return { getForecast, forecast, forecastLoading }
}
