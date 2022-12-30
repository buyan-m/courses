import { createApp } from 'vue'
import { createI18n } from 'vue-i18n'
import elementPlus from 'element-plus'
import App from './App.vue'
import router from './router'
import loadFonts from './plugins/webfontloader'
import 'element-plus/dist/index.css'
import 'ress'

const i18n = createI18n({
    locale: 'en',
    legacy: false
})

loadFonts()

createApp(App)
    .use(router)
    .use(i18n)
    .use(elementPlus)
    .mount('#app')
