import { WeatherService } from "@/types/weather"
import { inject } from "vue"

export const ServiceContainerProviderSymbol = Symbol("service-container")

export function useServiceContainerContext() {
    return inject<{ weatherService: WeatherService }>(ServiceContainerProviderSymbol)
}
