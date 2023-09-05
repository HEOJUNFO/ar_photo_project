import {createRouter, createWebHashHistory} from "vue-router";

import Landing from "../views/Landing.vue"
import Capture from "../views/Capture.vue"
import Intro from "../views/Intro.vue"
import Intro3D from "../views/Intro3D.vue"
import Help from "../views/Help.vue"
import Terms from "../views/Terms.vue"
import CapturePreview from "../views/CapturePreview.vue"
import Shopping from "../views/Shopping.vue"
import ShoppingReward from "../views/ShoppingReward.vue"

export const routes = [
    {path: '/', component: Landing, name: 'Landing'},
    {path: '/capture', component: Capture, name: 'Capture'},
    {path: '/intro', component: Intro, name: 'Intro'},
    {path: '/intro3d', component: Intro3D, name: 'Intro3D'},
    {path: '/help', component: Help, name: 'Help'},
    {path: '/terms', component: Terms, name: 'Terms'},
    {path: '/capturepreview', component: CapturePreview, name: 'CapturePreview'},
    {path: '/shopping', component: Shopping, name: 'Shopping'},
    {path: '/shoppingreward', component: ShoppingReward, name: 'ShoppingReward'},
]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

export default router;