import useAccuWeather from "@/composables/accuweather"
import { expect, test } from "vitest"

// true = call the API
// false = use sample data
test("accuweather can get forecast", async () => {
    const { forecast, getForecast } = useAccuWeather()

    expect(forecast.value).toEqual(null)

    // Get sample data from json
    const sampleLocation = (await import("@/json/sample-search.json")).default[0] as AccuWeatherLocation

    await getForecast(sampleLocation)

    expect(forecast.value).not.toEqual(null)
})
