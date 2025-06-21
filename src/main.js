import { createApp } from 'vue'
import App from './App.vue'
import mitt from "mitt";
import router from "@/routes/index.js";
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"
// import bootstrap icons
import "bootstrap-icons/font/bootstrap-icons.css"
import {createI18n} from "vue-i18n";
import {enTrans} from "@/translations/en.js";
import {skTrans} from "@/translations/sk.js";
import {createPinia} from "pinia";

const emitter = mitt()
const initApp = createApp(App)
const pinia = createPinia();

const i18n = createI18n({
    locale: 'en',
    messages: {
        en: enTrans,
        sk: skTrans
    }
})

async function setLocaleBasedOnLocation() {
    try {
        const response = await fetch('https://ipapi.co/json/')
        const data = await response.json()
        const country = data.country
        if (country === 'SK') {
            i18n.global.locale = 'sk'
        } else {
            i18n.global.locale = 'en'
        }
    } catch (error) {
        console.error('Could not determine location:', error)
        i18n.global.locale = 'en' // Default to English in case of error
    }
}

async function createVueApp() {
    await setLocaleBasedOnLocation()
    initApp.use(router)
    initApp.use(i18n) // Don't forget to use the i18n plugin
    initApp.use(pinia); // ✅ REGISTER PINIA FIRST

    initApp.provide('emitter', emitter)
    initApp.mount('#app')
}

createVueApp().then((r) => console.log('App mounted', r))