import {createRouter, createWebHashHistory} from "vue-router";

import Ios from "@views/Ios.vue"
import Landing from "@views/Landing.vue"


import busan2 from "@views/busan/busan2.vue"
import busan3 from "@views/busan/busan3.vue"
import coex from "@views/busan/coex.vue"




export const routes = [
    {path: '/', component: Landing, name: 'Landing'},
    {path: '/ios',component:Ios, name:'Ios'},
    {path: '/busan2',component:busan2, name:'busan2'},
    {path: '/busan3',component:busan3, name:'busan3'},
    {path: '/coex',component:coex, name:'coex'},

]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

export default router;