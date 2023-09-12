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
import Culture3D from "../views/Culture3D.vue"
import Culture from "../views/Culture.vue"
import Culture2nd from "../views/Culture2nd.vue"
import Shopping2nd from "../views/Shopping2nd.vue"
import Shopping2nd3D from "../views/Shopping2nd3D.vue"
import Shopping2ndOut from "../views/Shopping2ndOut.vue"

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
    {path: '/culture3d', component: Culture3D, name: 'Culture3D'},
    {path: '/culture', component: Culture, name: 'Culture'},
    {path: '/culture2', component: Culture2nd, name: 'Culture2nd'},
    {path: '/shopping2', component: Shopping2nd, name: 'Shopping2nd'},
    {path: '/shopping3', component: Shopping2nd3D, name: 'Shopping2nd3D'},
    {path: '/shopping2out', component: Shopping2ndOut, name: 'Shopping2ndOut'},
]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

export default router;