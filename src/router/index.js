import {createRouter, createWebHashHistory} from "vue-router";

import Landing from "../views/Landing.vue"
import Capture from "../views/Capture.vue"
import Intro from "../views/Intro.vue"
import Intro3D from "../views/Intro3D.vue"
import Help from "../views/Help.vue"

export const routes = [
    {path: '/', component: Landing, name: 'Landing'},
    {path: '/capture', component: Capture, name: 'Capture'},
    {path: '/intro', component: Intro, name: 'Intro'},
    {path: '/intro3d', component: Intro3D, name: 'Intro3D'},
    {path: '/help', component: Help, name: 'Help'},
]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

export default router;