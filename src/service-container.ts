import weatherapiService from "@/services/weatherapiService"
import accuweatherService from "@/services/accuweatherService"

const provider = import.meta.env.VITE_API_PROVIDER
let weatherService

switch (provider) {
    case "accuweather":
        weatherService = accuweatherService()

        break
    default:
    case "weatherapi":
        weatherService = weatherapiService()
        break
}

export const serviceContainer = {
    weatherService,
}
