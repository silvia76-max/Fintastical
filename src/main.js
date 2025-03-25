
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import '@/assets/css/main.css'
// eslint-disable-next-line no-unused-vars
import { SpeedInsights } from '@vercel/speed-insights/vue';


// eslint-disable-next-line no-unused-vars
const scriptUrl = '/Fintastical/assets/index-DbwUrwoj.js'

import '@/assets/css/main.css'



const app = createApp(App)
app.use(createPinia())
app.use(router)
app.mount('#app')
