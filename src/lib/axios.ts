import Axios from "axios"

const axios = Axios.create({
    headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
    },
})

// This will always add the API key as query params for every request
axios.interceptors.request.use((config) => {
    switch (import.meta.env.VITE_API_PROVIDER) {
        case "accuweather":
            config.baseURL = "https://dataservice.accuweather.com"
            config.params.apikey = import.meta.env.VITE_ACCUWEATHER_API_KEY
            break
        default:
        case "weatherapi":
            config.baseURL = "https://api.weatherapi.com/v1"
            config.params.key = import.meta.env.VITE_WEATHERAPI_API_KEY
            break
    }

    return config
})

export default axios
