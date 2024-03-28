import axios from "@/lib/axios"
import { AutoCompleteCompleteEvent } from "primevue/autocomplete"
import { ref } from "vue"

const useApi = import.meta.env.VITE_USE_API === "true"

export default function useAutoComplete() {
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
