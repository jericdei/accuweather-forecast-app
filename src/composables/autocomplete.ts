import axios from "@/lib/axios"
import { AxiosError } from "axios"
import { ref } from "vue"
import { useToast } from "primevue/usetoast"

/**
 * Composable for AccuWeather Location AutoComplete API Service
 */
export default function useAutoComplete() {
    const toast = useToast()

    const suggestions = ref<AccuWeatherLocation[]>([])
    const selectedLocation = ref<AccuWeatherLocation | null>(null)

    /**
     * Get location suggestions from AccuWeather Location API
     *
     * @param event PrimeVue AutoCompleteCompleteEvent
     */
    async function getSuggestions(query: string) {
        try {
            const response = await axios.get("locations/v1/cities/autocomplete", {
                params: {
                    q: query,
                },
            })

            suggestions.value = response.data
        } catch (error) {
            console.error(error)

            let message = "Something went wrong. Please refresh the page and try again."

            if (error instanceof AxiosError) {
                message =
                    error.message === "Network Error"
                        ? "A network error occurred. This could be an API Key limit, CORS, or an internet connection issue."
                        : error.response?.data.Message
            }

            toast.add({
                severity: "error",
                summary: "Error",
                detail: message,
                group: "br",
                life: 3000,
            })
        }
    }

    return { suggestions, getSuggestions, selectedLocation }
}
