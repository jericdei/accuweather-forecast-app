import Axios from "axios"

const axios = Axios.create({
    baseURL: "https://dataservice.accuweather.com",
})

// This will always add the API key as query params for every request
axios.interceptors.request.use((config) => {
    config.params = {
        ...config.params,
        apikey: import.meta.env.VITE_ACCUWEATHER_API_KEY,
    }

    return config
})

export default axios
