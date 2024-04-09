import "./style.css"
import "primevue/resources/themes/aura-light-noir/theme.css"

import { createApp } from "vue"
import App from "./App.vue"
import PrimeVue from "primevue/config"
import ToastService from "primevue/toastservice"
import { ServiceContainerProviderSymbol } from "./composables/service-container"
import { serviceContainer } from "./service-container"

createApp(App)
    .use(ToastService)
    .use(PrimeVue, { ripple: true })
    .provide(ServiceContainerProviderSymbol, serviceContainer)
    .mount("#app")
