type WeatherLocation = {
    key: string
    name: string
    region: string
    country: string
}

type Temperature = {
    unit: string
    value: number
}

type DayNight = {
    label: string
    iconLink: string
}

type Forecast = {
    date: string
    day: DayNight
    night: DayNight
    temperatures: {
        min: Temperature
        max: Temperature
    }
}

type WeatherForecast = {
    headline: string
    forecasts: Forecast[]
}
