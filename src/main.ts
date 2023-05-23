import { createApp } from 'vue'

import elementPlus from 'element-plus'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import loadFonts from './plugins/webfontloader'
import 'element-plus/dist/index.css'
import 'ress'
import i18n from './i18n'

const pinia = createPinia()

loadFonts()

createApp(App)
    .use(router)
    .use(i18n)
    .use(pinia)
    .use(elementPlus)
    .mount('#app')
