import { createWebHistory, createRouter } from 'vue-router'
import HomeView from "@/pages/HomeView.vue";
import QrGeneratorView from "@/pages/QrGeneratorView.vue";
import PayBySquareQrGeneratorView from "@/pages/PayBySquareQrGeneratorView.vue";
import BirthNumberGeneratorView from "@/pages/BirthNumberGeneratorView.vue";
import IbanGeneratorView from "@/pages/IbanGeneratorView.vue";
import IbanExamplesView from "@/pages/IbanExamplesView.vue";
import BorderRadiusGeneratorView from "@/pages/BorderRadiusGeneratorView.vue";
import ConvertCaseView from "@/pages/ConvertCaseView.vue";

const routes = [
    {
        path: '/',
        component: HomeView,
        name: 'HomeView'
    },
    {
        path: '/qr-generator',
        component: QrGeneratorView,
        name: 'QrGeneratorView'
    },
    {
        path: '/pay-by-square-qr-generator',
        component: PayBySquareQrGeneratorView,
        name: 'PayBySquareQrGeneratorView'
    },
    {
        path: '/rodne-cislo-generator',
        component: BirthNumberGeneratorView,
        name: 'BirthNumberGeneratorView'
    },
    {
        path: '/iban-generator',
        component: IbanGeneratorView,
        name: 'IbanGeneratorView'
    },
    {
        path: '/iban-priklad',
        component: IbanExamplesView,
        name: 'IbanExamplesView'
    },
    {
        path: '/border-radius-generator',
        component: BorderRadiusGeneratorView,
        name: 'BorderRadiusGeneratorView'
    },
    {
        path: '/textovy-prevodnik',
        component: ConvertCaseView,
        name: 'ConvertCaseView'
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
