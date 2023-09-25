import {createRouter, createWebHashHistory} from "vue-router";

import Landing from "@views/Landing.vue"
import Capture from "@views/Capture.vue"
import Intro from "@views/Intro.vue"
import CommoneOne3D from "@views/common/CommonOne3D.vue"
import StorageBox from "@views/StorageBox.vue"
import Mission1 from "@views/test/Mission1.vue"
import MissionOut from "@views/test/MissionOut.vue"
import Mission2 from "@views/test/Mission2.vue"
import Mission3 from "@views/test/Mission3.vue"
import CaptureReview from "@views/CaptureReview.vue"
import StorageBox2 from "@views/StorageBox2.vue"
import Stage from "@views/Stage.vue"
import ImageTraking from "@views/ImageTraking.vue"
import CommonFour from "@views/common/CommonFour.vue"
import Event1 from "@views/event/Event1.vue"
import Event2 from "@views/event/Event2.vue"
import Event3 from "@views/event/Event3.vue"
import Event4 from "@views/event/Event4.vue"
import Event5 from "@views/event/Event5.vue"
import Event6 from "@views/event/Event6.vue"
import EventOut from "@views/event/EventOut.vue"
import Culture2nd3D from "@views/culture/Culture2nd3D.vue"
import CapturePreview from "@views/CapturePreview.vue"


export const routes = [
    {path: '/', component: Landing, name: 'Landing'},
    {path: '/capture', component: Capture, name: 'Capture'},
    {path: '/intro', component: Intro, name: 'Intro'},
    {path: '/commonone3d', component: CommoneOne3D, name: 'CommoneOne3D'},
    {path: '/storagebox', component: StorageBox, name: 'StorageBox'},
    {path: '/mission1', component: Mission1, name: 'Mission1'},
    {path: '/missionout', component: MissionOut, name: 'MissionOut'},
    {path: '/mission2', component: Mission2, name: 'Mission2'},
    {path: '/mission3', component: Mission3, name: 'Mission3'},
    {path: '/capturereview', component: CaptureReview, name: 'CaptureReview'},
    {path: '/storagebox2',component:StorageBox2, name:'StorageBox2'},
    {path: '/stage',component:Stage, name:'Stage'},
    {path: '/imagetraking',component:ImageTraking, name:'ImageTraking'},
    {path: '/commonfour',component:CommonFour, name:'CommonFour'},
    {path: '/event1',component:Event1, name:'Event1'},
    {path: '/event2',component:Event2, name:'Event2'},
    {path: '/event3',component:Event3, name:'Event3'},
    {path: '/event4',component:Event4, name:'Event4'},
    {path: '/event5',component:Event5, name:'Event5'},
    {path: '/event6',component:Event6, name:'Event6'},
    {path: '/eventout',component:EventOut, name:'EventOut'},
    {path: '/culture3',component:Culture2nd3D, name:'Culture2nd3D'},
    {path: '/capturepreview',component:CapturePreview, name:'CaptruePreview'},

    
]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

export default router;