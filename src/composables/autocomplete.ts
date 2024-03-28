import axios from "@/lib/axios"
import { ref } from "vue"

/**
 * Composable for AccuWeather Location AutoComplete API Service
 */
export default function useAutoComplete() {
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
        }
    }

    return { suggestions, getSuggestions, selectedLocation }
}
