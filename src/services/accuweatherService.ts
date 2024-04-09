import axios from "@/lib/axios"
import { WeatherService } from "@/types/weather"

export default function weatherapiService(): WeatherService {
    /**
     * Get forecast based on selected location
     */
    async function getForecast(key: string) {
        try {
            const response = await axios.get(`forecasts/v1/daily/5day/${key}`)

            return response.data
        } catch (error) {
            console.error(error)
        }
    }

    /**
     * Get location suggestions from WeatherAPI Autocomplete API
     */
    async function getSuggestions(query: string): Promise<WeatherLocation[]> {
        try {
            const response = await axios.get("locations/v1/cities/autocomplete", {
                params: {
                    q: query,
                },
            })

            return response.data.map(
                (item: any) =>
                    ({
                        key: item.Key,
                        name: item.LocalizedName,
                        region: item.AdministrativeArea.LocalizedName,
                        country: item.Country.LocalizedName,
                    }) as WeatherLocation,
            )
        } catch (error) {
            console.error(error)

            return []
        }
    }

    return { getSuggestions, getForecast }
}
