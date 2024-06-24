import '@/shared/css/global.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { Quasar } from 'quasar'



// Import icon libraries
import '@quasar/extras/material-icons/material-icons.css'

// Import Quasar css
import 'quasar/dist/quasar.css'
import './shared/css/global.css'

import App from './App.vue'
import router from './router'

const app = createApp(App)
const pinia = createPinia()



app.use(router).use(pinia).use(Quasar).mount('#app')
