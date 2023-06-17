import { createApp } from 'vue'

import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import loadFonts from './plugins/webfontloader'
import 'ress'
import i18n from './i18n'
import elementPlusPlugins from './element-plus-plugins'

const pinia = createPinia()

loadFonts()

const app = createApp(App)
    .use(router)
    .use(i18n)
    .use(pinia)

elementPlusPlugins.forEach((pl) => app.use(pl))

app.mount('#app')
