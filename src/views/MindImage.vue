<template>
    <div id="sceneContainer">
        <a-scene mindar-image="imageTargetSrc: https://cdn.jsdelivr.net/gh/HEOJUNFO/tracking@main/newtarget.mind;"
            color-space="sRGB" renderer="colorManagement: true, physicallyCorrectLights" vr-mode-ui="enabled: false"
            device-orientation-permission-ui="enabled: false">
            <a-camera position="0 0 0" look-controls="enabled: false"></a-camera>

            <a-assets>
                <a-asset-item id="blueBeeModel"
                    src="https://cdn.jsdelivr.net/gh/HEOJUNFO/tracking@main/blue_bee.gltf"></a-asset-item>
            </a-assets>

            <a-entity id="target" mindar-image-target="targetIndex: 0">
                <a-gltf-model rotation="0 0 0 " position="0 -0.25 0" scale="0.2 0.2 0.2" src="#blueBeeModel"
                    animation-mixer>
                </a-gltf-model>
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
    setup() {


        onMounted(() => {
            document.addEventListener("DOMContentLoaded", function () {
                const sceneEl = document.querySelector('a-scene');
                let arSystem;
                sceneEl.addEventListener('loaded', function () {
                    arSystem = sceneEl.systems["mindar-image-system"];
                });
                const exampleTarget = document.querySelector('#target');



                exampleTarget.addEventListener("targetFound", event => {
                    // alert("target found");
                });

                exampleTarget.addEventListener("targetLost", event => {
                    // alert("target lost");
                });

            });
        });

    }
}
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

