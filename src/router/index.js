import {createRouter, createWebHashHistory} from "vue-router";

import Ios from "@views/Ios.vue"
import Landing from "@views/Landing.vue"
import Capture from "@views/Capture.vue"
import Intro from "@views/Intro.vue"
import CommoneOne3D from "@views/common/CommonOne3D.vue"
import StorageBox from "@views/StorageBox.vue"
import CaptureReview from "@views/CaptureReview.vue"
import StorageBox2 from "@views/StorageBox2.vue"
import Stage from "@views/Stage.vue"
import CommonFour from "@views/common/CommonFour.vue"
import Event1 from "@views/event/Event1.vue"
import Event2 from "@views/event/Event2.vue"
import Event3 from "@views/event/Event3.vue"
import Event4 from "@views/event/Event4.vue"
import Event5 from "@views/event/Event5.vue"
import Event6 from "@views/event/Event6.vue"
import Event7 from "@views/event/Event7.vue"
import Event8 from "@views/event/Event8.vue"
import Event9 from "@views/event/Event9.vue"
import Event10 from "@views/event/Event10.vue"
import EventOut from "@views/event/EventOut.vue"
import Culture2nd3D from "@views/culture/Culture2nd3D.vue"
import CapturePreview from "@views/CapturePreview.vue"
import Culture3D from "@views/culture/Culture3D.vue"
import Loading from "@views/Loading.vue"

import MindImage from "@views/MindImage.vue"

import busan2 from "@views/busan/busan2.vue"
import busan3 from "@views/busan/busan3.vue"
import coex from "@views/busan/coex.vue"


export const routes = [
    {path: '/', component: Landing, name: 'Landing'},
    {path: '/capture', component: Capture, name: 'Capture'},
    {path: '/intro', component: Intro, name: 'Intro'},
    {path: '/commonone3d', component: CommoneOne3D, name: 'CommoneOne3D'},
    {path: '/storagebox', component: StorageBox, name: 'StorageBox'},
    {path: '/capturereview', component: CaptureReview, name: 'CaptureReview'},
    {path: '/storagebox2',component:StorageBox2, name:'StorageBox2'},
    {path: '/stage',component:Stage, name:'Stage'},
    {path: '/commonfour',component:CommonFour, name:'CommonFour'},
    {path: '/event1',component:Event1, name:'Event1'},
    {path: '/event2',component:Event2, name:'Event2'},
    {path: '/event3',component:Event3, name:'Event3'},
    {path: '/event4',component:Event4, name:'Event4'},
    {path: '/event5',component:Event5, name:'Event5'},
    {path: '/event6',component:Event6, name:'Event6'},
    {path: '/event7',component:Event7, name:'Event7'},
    {path: '/event8',component:Event8, name:'Event8'},
    {path: '/event9',component:Event9, name:'Event9'},
    {path: '/event10',component:Event10, name:'Event10'},
    {path: '/eventout',component:EventOut, name:'EventOut'},
    {path: '/culture3',component:Culture2nd3D, name:'Culture2nd3D'},
    {path: '/capturepreview',component:CapturePreview, name:'CaptruePreview'},
    {path: '/culture3d',component:Culture3D, name:'Culture3D'},
    {path: '/loading',component:Loading, name:'Loading'},
    {path: '/ios',component:Ios, name:'Ios'},
    {path: '/mindimage',component:MindImage, name:'MindImage'},
    {path: '/busan2',component:busan2, name:'busan2'},
    {path: '/busan3',component:busan3, name:'busan3'},
    {path: '/coex',component:coex, name:'coex'},
    
]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

export default router;