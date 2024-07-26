import {createRouter, createWebHashHistory} from "vue-router";

import Ios from "@views/Ios.vue"
import Landing from "@views/Landing.vue"


import photo from "@views/event/photo.vue"
import review from "@views/event/review.vue"
import event from "@views/event/event.vue"




export const routes = [
    {path: '/', component: Landing, name: 'Landing'},
    {path: '/ios',component:Ios, name:'Ios'},
    {path: '/photo',component:photo, name:'photo'},
    {path: '/review',component:review, name:'review'},
    {path: '/event',component:event, name:'event'},

]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

export default router;