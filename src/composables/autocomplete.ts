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
        }
    }

    return { suggestions, getSuggestions, selectedLocation }
}
