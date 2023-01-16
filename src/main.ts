import { createApp } from 'vue'

// @ts-ignore
// import { createI18n } from 'vue-i18n/dist/vue-i18n.esm-bundler'
import elementPlus from 'element-plus'
import App from './App.vue'
import router from './router'
import loadFonts from './plugins/webfontloader'
import 'element-plus/dist/index.css'
import 'ress'
import i18n from './i18n'

loadFonts()

createApp(App)
    .use(router)
    .use(i18n)
    .use(elementPlus)
    .mount('#app')
