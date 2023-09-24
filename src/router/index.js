import {createRouter, createWebHashHistory} from "vue-router";

import Landing from "@views/Landing.vue"
import Capture from "@views/Capture.vue"
import Intro from "@views/Intro.vue"
import StickerReward from "@views/StickerReward.vue"
import FrameReward from "@views/FrameReward.vue"
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


export const routes = [
    {path: '/', component: Landing, name: 'Landing'},
    {path: '/capture', component: Capture, name: 'Capture'},
    {path: '/intro', component: Intro, name: 'Intro'},
    {path: '/stickerreward', component: StickerReward, name: 'StickerReward'},
    {path : '/framereward', component: FrameReward, name: 'FrameReward'},
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
]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

export default router;