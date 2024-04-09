import axios from "@/lib/axios"
import { WeatherService } from "@/types/weather"
import moment from "moment"

export default function weatherapiService(): WeatherService {
    /**
     * Get forecast based on selected location
     */
    async function getForecast(key: string): Promise<WeatherForecast | null> {
        try {
            const { data } = await axios.get(`forecast.json`, {
                params: {
                    q: key,
                    days: 5,
                    aqi: "no",
                    alerts: "no",
                },
            })

            return {
                headline: data.current.condition.text,
                forecasts: data.forecast.forecastday.map((item: any) => {
                    const day = item.hour.filter((hour: any) => hour.time.includes("06:00"))[0]

                    const nighttime = moment(`${item.date} ${item.astro.sunset}`, "YYYY-MM-DD HH:mm A")
                        .add(2, "hours")
                        .startOf("hour")
                        .format("YYYY-MM-DD HH:mm")

                    const night = item.hour.filter((hour: any) => hour.time.includes(nighttime))[0]

                    return {
                        date: item.date,
                        day: {
                            label: day.condition.text,
                            iconLink: day.condition.icon,
                        },
                        night: {
                            label: night.condition.text,
                            iconLink: night.condition.icon,
                        },
                        temperatures: {
                            min: {
                                unit: "C",
                                value: item.day.mintemp_c,
                            },
                            max: {
                                unit: "C",
                                value: item.day.maxtemp_c,
                            },
                        },
                    } as Forecast
                }),
            } as WeatherForecast
        } catch (error) {
            console.error(error)

            return null
        }
    }

    /**
     * Get location suggestions from WeatherAPI Autocomplete API
     */
    async function getSuggestions(query: string): Promise<WeatherLocation[]> {
        try {
            const response = await axios.get("search.json", {
                params: {
                    q: query,
                },
            })

            return response.data.map(
                (item: any) =>
                    ({
                        key: `${item.lat},${item.lon}`,
                        name: item.name,
                        region: item.region,
                        country: item.country,
                    }) as WeatherLocation,
            )
        } catch (error) {
            console.error(error)

            return []
        }
    }

    return { getSuggestions, getForecast }
}
