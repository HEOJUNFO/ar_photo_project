import {createRouter, createWebHashHistory} from "vue-router";

import Landing from "../views/Landing.vue"
import Capture from "../views/Capture.vue"
import Intro from "../views/Intro.vue"
import Intro3D from "../views/Intro3D.vue"
import Help from "../views/Help.vue"
import Terms from "../views/Terms.vue"
import CapturePreview from "../views/CapturePreview.vue"
import Shopping3D from "../views/shopping/Shopping3D.vue"
import Culture3D from "../views/culture/Culture3D.vue"
import Culture from "../views/culture/Culture.vue"
import Culture2nd from "../views/culture/Culture2nd.vue"
import Culture2nd3D from "../views/culture/Culture2nd3D.vue"
import Shopping2nd from "../views/shopping/Shopping2nd.vue"
import Shopping2nd3D from "../views/shopping/Shopping2nd3D.vue"
import Shopping from "../views/shopping/Shopping.vue"
import StickerReward from "../views/StickerReward.vue"
import Outro from "../views/Outro.vue"
import EatingOut from "../views/eatingOut/EatingOut.vue"
import EatingOut3D from "../views/eatingOut/EatingOut3D.vue"
import EatingOut2nd from "../views/eatingOut/EatingOut2nd.vue"
import EatingOut2nd3D from "../views/eatingOut/EatingOut2nd3D.vue"

export const routes = [
    {path: '/', component: Landing, name: 'Landing'},
    {path: '/capture', component: Capture, name: 'Capture'},
    {path: '/intro', component: Intro, name: 'Intro'},
    {path: '/intro3d', component: Intro3D, name: 'Intro3D'},
    {path: '/help', component: Help, name: 'Help'},
    {path: '/terms', component: Terms, name: 'Terms'},
    {path: '/capturepreview', component: CapturePreview, name: 'CapturePreview'},
    {path: '/shopping3d', component: Shopping3D, name: 'Shopping3D'},
    {path: '/culture3d', component: Culture3D, name: 'Culture3D'},
    {path: '/culture', component: Culture, name: 'Culture'},
    {path: '/culture2', component: Culture2nd, name: 'Culture2nd'},
    {path: '/culture3', component: Culture2nd3D, name: 'Culture2nd3D'},
    {path: '/shopping2', component: Shopping2nd, name: 'Shopping2nd'},
    {path: '/shopping3', component: Shopping2nd3D, name: 'Shopping2nd3D'},
    {path: '/shopping', component: Shopping, name: 'Shopping'},
    {path: '/stickerreward', component: StickerReward, name: 'StickerReward'},
    {path: '/outro', component: Outro, name: 'Outro'},
    {path: '/eatingout', component: EatingOut, name: 'EatingOut'},
    {path: '/eatingout3d', component: EatingOut3D, name: 'EatingOut3D'},
    {path: '/eatingout2', component: EatingOut2nd, name: 'EatingOut2nd'},
    {path: '/eatingout3', component: EatingOut2nd3D, name: 'EatingOut2nd3D'},
]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

export default router;