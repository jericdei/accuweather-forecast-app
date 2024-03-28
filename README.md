# AccuWeather Forecast App

This is a simple Weather App using AccuWeather Forecast API for a Software Developer Examination from Regal Credit.

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

## Running Locally

### Requirements

Bun v1.0.26

```bash
# Install Bun
curl -fsSL https://bun.sh/install | bash
```

#### 1. Clone this repo

```bash
git clone git@github.com:jericdei/accuweather-forecast-app.git

cd accuweather-forecast-app
```

#### 2. Install Dependencies

```bash
bun install
```

#### 3. Configure environment variables

```bash
cp .env.example .env


# Populate the appropriate `.env` values
VITE_ACCUWEATHER_API_KEY={API_KEY}
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
