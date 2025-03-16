/* eslint-disable no-undef */
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import '@/assets/css/main.css'
// eslint-disable-next-line no-unused-vars
import { SpeedInsights } from '@vercel/speed-insights/vue';


if (process.env.NODE_ENV === 'test') {

  window.__VUE_DEVTOOLS_GLOBAL_HOOK__ = undefined;
}

const app = createApp(App)
app.use(createPinia())
app.use(router)
app.mount('#app')
