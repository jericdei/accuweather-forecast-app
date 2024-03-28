type DateTimeString = string
type DateTimeEpoch = number

type TemperatureUnit = "C" | "F"
type WindSpeedUnit = "km/h" | "mph"
type PrecipitationUnit = "mm" | "cm" | "in"
type SolarIrradianceUnit = "W/m²"
type CeilingUnit = "m" | "ft"
type PressureUnit = "mb" | "inHg"

type WeatherUnitType = {
    Value: number
    Unit: string
    UnitType: number
}

type WeatherDateTimeType = {
    Rise: DateTimeString
    EpochRise: DateTimeEpoch
    Set: DateTimeString
    EpochSet: DateTimeEpoch
}

type SunMoon = WeatherDateTimeType & {
    Phase?: string
    Age?: number
}

type Temperature = WeatherUnitType & {
    Phrase?: string
}

type Wind = {
    Speed: WeatherUnitType
    Direction: {
        Degrees: number
        Localized: string
        English: string
    }
}

type Precipitation = WeatherUnitType

type DayNightData = {
    Icon: number
    IconPhrase: string
    HasPrecipitation: boolean
    ShortPhrase: string
    LongPhrase: string
    PrecipitationProbability: number
    ThunderstormProbability: number
    RainProbability: number
    SnowProbability: number
    IceProbability: number
    Wind: Wind
    WindGust: Wind
    TotalLiquid: Precipitation
    Rain: Precipitation
    Snow: Precipitation
    Ice: Precipitation
    HoursOfPrecipitation: number
    HoursOfRain: number
    HoursOfSnow: number
    HoursOfIce: number
    CloudCover: number
    Evapotranspiration: Precipitation
    SolarIrradiance: WeatherUnitType
}

type AirAndPollen = {
    Name: string
    Value: number
    Category: string
    CategoryValue: number
    Type?: string
}

type DailyForecast = {
    Date: DateTimeString
    EpochDate: DateTimeEpoch
    Sun: SunMoon
    Moon: SunMoon
    Temperature: {
        Minimum: Temperature
        Maximum: Temperature
    }
    RealFeelTemperature: {
        Minimum: Temperature
        Maximum: Temperature
    }
    RealFeelTemperatureShade: {
        Minimum: Temperature
        Maximum: Temperature
    }
    HoursOfSun: number
    DegreeDaySummary: {
        Heating: Precipitation
        Cooling: Precipitation
    }
    AirAndPollen: AirAndPollen[]
    Day: DayNightData
    Night: DayNightData
    Sources: string[]
    MobileLink: string
    Link: string
}

type DailyForecastHeadline = {
    EffectiveDate: DateTimeString
    EffectiveEpochDate: DateTimeEpoch
    Severity: number
    Text: string
    Category: string
    EndDate: DateTimeString
    EndEpochDate: DateTimeEpoch
    MobileLink: string
    Link: string
}

type DailyForecastResponse = {
    Headline: DailyForecastHeadline
    DailyForecasts: DailyForecast[]
}

type AccuWeatherLocationData = {
    ID: string
    LocalizedName: string
}

type AccuWeatherLocation = {
    Version: number
    Key: string
    Type: string
    Rank: number
    LocalizedName: string
    Country: AccuWeatherLocationData
    AdministrativeArea: AccuWeatherLocationData
}
