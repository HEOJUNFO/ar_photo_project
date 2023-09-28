<template>
    <div id="sceneContainer">
        <a-scene
            mindar-image="imageTargetSrc: https://cdn.jsdelivr.net/gh/hiukim/mind-ar-js@1.2.2/examples/image-tracking/assets/card-example/card.mind;"
            vr-mode-ui="enabled: false" device-orientation-permission-ui="enabled: false">
            <a-camera position="0 0 0" look-controls="enabled: false"></a-camera>
            <a-entity mindar-image-target="targetIndex: 0">
                <a-plane color="blue" opacity="0.5" position="0 0 0" height="0.552" width="1" rotation="0 0 0"></a-plane>
            </a-entity>
        </a-scene>
    </div>
</template>


<script>
import { onMounted, ref, computed } from 'vue';
import router from '../router';
import { useCharacterStore } from '../stores/characterStore.js'

export default {
    name: 'ImageTracking',
};
</script>

<style scoped>
#sceneContainer {
    width: 100vw;
    height: 100vh;
    overflow: hidden;
}

a-scene {
    width: 100%;
    height: 100%;
}
</style>

