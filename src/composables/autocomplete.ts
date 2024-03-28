import axios from "@/lib/axios"
import { AutoCompleteCompleteEvent } from "primevue/autocomplete"
import { ref } from "vue"

const useApi = import.meta.env.VITE_USE_API === "true"

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
    async function getSuggestions(event: AutoCompleteCompleteEvent) {
        // Just use the sample JSON to not waste API calls
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
