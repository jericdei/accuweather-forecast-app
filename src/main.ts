import "./style.css"
import "primevue/resources/themes/aura-light-noir/theme.css"

import { createApp } from "vue"
import App from "./App.vue"
import PrimeVue from "primevue/config"
import ToastService from "primevue/toastservice"

createApp(App).use(ToastService).use(PrimeVue, { ripple: true }).mount("#app")
