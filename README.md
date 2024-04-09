# Weather Forecast App

This is a simple Weather Forecasting App using different API providers.

## Available Providers

-   [AccuWeather](https://accuweather.com/) (`accuweather`): free 50 requests per day
-   [WeatherAPI](https://www.weatherapi.com/) (`weatherapi`): free 5M requests per month

## Features

-   Search for a location with Autocomplete
-   Display 5-day weather forecast for the specified location

## Libraries Used

-   UI Library: [Vue](https://vuejs.org/) 3 (Composition API) using `<script setup>`
-   Runtime/Bundler/Package Manager: [Bun](https://bun.sh/)
-   Language: [TypeScript](https://www.typescriptlang.org/)
-   Components: [PrimeVue](https://primevue.org/)
-   Styling: [Tailwind CSS](https://tailwindcss.com/)
-   Testing: [Vitest](https://vitest.dev/)
-   HTTP: [Axios](https://axios-http.com/)
-   Dates: [Moment](https://momentjs.com/)

## Deployment

This project is deployed in [Vercel](https://vercel.com/) and you can access it using the following link:

-   https://weather-forecast-app.vercel.app

## Running Locally

### Requirements

Bun v1.0.26

```bash
# Install Bun
curl -fsSL https://bun.sh/install | bash
```

#### 1. Clone this repository

```bash
git clone https://github.com/jericdei/weather-forecast-app.git

cd weather-forecast-app
```

#### 2. Install Dependencies

```bash
bun install
```

#### 3. Configure environment variables

```bash
cp .env.example .env


# Populate the appropriate `.env` values
VITE_API_PROVIDER=weatherpi # see list of providers
VITE_ACCUWEATHER_API_KEY={API_KEY}
VITE_WEATHERAPI_API_KEY={API_KEY}
```

#### 4. Start Dev Server

```bash
bun dev
```

## Testing

You can run the unit tests using this command

```bash
bun run test
```

## Building and Previewing

```bash
# Build
bun run build

# Start a server to preview the build
bun run preview
```

## Credits

-   [sur-ser](https://www.npmjs.com/~sur-ser), creator of [accuweather-api](https://www.npmjs.com/package/accuweather-api). Although I didn't use the package, I used some type declarations for API typesafety.
