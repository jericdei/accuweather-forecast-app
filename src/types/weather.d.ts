export interface WeatherService {
    /**
     * Get location suggestions from Autocomplete API.
     *
     * @param query - search query
     */
    getSuggestions: (query: string) => Promise<WeatherLocation[]>

    /**
     * Get forecast based on selected location.
     *
     * @param key - location key
     */
    getForecast: (key: string) => Promise<WeatherForecast | null>
}
