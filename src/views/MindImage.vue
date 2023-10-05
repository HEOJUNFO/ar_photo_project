<template>
    <div>
        <div class="top-section">
            <div class="text-container1">
                <p id="typed-text"></p>
            </div>
        </div>
        <div class="side-image-container">
            <img :src="characterContent.src" alt="Side Image" />
        </div>
        <div class="image-container">
            <img src="@resource/common/blue_bee.png" :style="{ filter: isBlue ? 'grayscale(0%)' : '' }" />
            <img src="@resource/common/green_bee.png" :style="{ filter: isGreen ? 'grayscale(0%)' : '' }" />
            <img src="@resource/common/red_bee.png" :style="{ filter: isRed ? 'grayscale(0%)' : '' }" />
        </div>
        <div v-show="finishModal" class="image-container3">
            <div class="reward-container">
                <img class="image1" src="@resource/common/label.png" />
                <p class="p1">봄의 숲 웹프레임 1종</p>
                <p class="p2">(서비스 내 사진촬영에서 확인 및 사용가능)</p>
                <img class="image2" src="@resource/icon/frame_02.png" />
                <button @click="nextPage()">상품획득 성공</button>
                <img class="guide" src="@resource/common/tap.png" alt="Image 1" />
            </div>
        </div>
        <div id="example-scanning-overlay" class="">
            <div class="inner">
                <div class="scanline"></div>
            </div>
        </div>
        <div id="sceneContainer">
            <a-scene
                mindar-image="uiScanning: no; imageTargetSrc: https://cdn.jsdelivr.net/gh/HEOJUNFO/tracking@main/newtarget.mind; "
                color-space="sRGB" renderer="colorManagement: true, physicallyCorrectLights" vr-mode-ui="enabled: false"
                device-orientation-permission-ui="enabled: false">
                <a-camera position="0 0 0" look-controls="enabled: false"></a-camera>

                <a-assets>
                    <a-asset-item id="blueBeeModel"
                        src="https://cdn.jsdelivr.net/gh/HEOJUNFO/tracking@main/blue_bee3.gltf"></a-asset-item>
                    <a-asset-item id="greenBeeModel"
                        src="https://cdn.jsdelivr.net/gh/HEOJUNFO/tracking@main/green_bee3.gltf"></a-asset-item>
                    <a-asset-item id="redBeeModel"
                        src="https://cdn.jsdelivr.net/gh/HEOJUNFO/tracking@main/red_bee3.gltf"></a-asset-item>
                </a-assets>

                <a-entity id="target" mindar-image-target="targetIndex: 0">
                    <a-gltf-model v-if="currentModel === 'blue'" rotation="0 0 0 " position="0 -0.25 0" scale="0.2 0.2 0.2"
                        src="#blueBeeModel" animation-mixer></a-gltf-model>
                    <a-gltf-model v-if="currentModel === 'green'" rotation="0 0 0 " position="0 -0.25 0" scale="0.2 0.2 0.2"
                        src="#greenBeeModel" animation-mixer></a-gltf-model>
                    <a-gltf-model v-if="currentModel === 'red'" rotation="0 0 0 " position="0 -0.25 0" scale="0.2 0.2 0.2"
                        src="#redBeeModel" animation-mixer></a-gltf-model>
                </a-entity>
            </a-scene>
        </div>
    </div>
</template>


<script>
import { onMounted, ref, computed } from 'vue';
import router from '../router';
import { useCharacterStore } from '../stores/characterStore.js'
import { onBeforeRouteLeave } from 'vue-router'
import { postData } from '../js/api';

export default {
    name: 'ImageTracking',
    setup() {
        const audio = ref(null);
        const audio2 = ref(null);
        const audio3 = ref(null);

        import('@resource/sounds/acquired.wav')
            .then(src => {
                audio.value = new Audio(src.default);
            })
            .catch(error => {
                console.error("Error importing audio file:", error);
            });

        const playAudio = () => {
            if (audio.value) {
                audio.value.play();
            } else {
                console.error("Audio not initialized yet.");
            }
        };

        import('@resource/sounds/success.wav')
            .then(src => {
                audio2.value = new Audio(src.default);
            })
            .catch(error => {
                console.error("Error importing audio file:", error);
            });

        const playAudio2 = () => {
            if (audio2.value) {
                audio2.value.play();
            } else {
                console.error("Audio not initialized yet.");
            }
        };

        import('@resource/sounds/fly_bee.wav')
            .then(src => {
                audio3.value = new Audio(src.default);
            })
            .catch(error => {
                console.error("Error importing audio file:", error);
            });

        const playAudio3 = () => {
            if (audio3.value) {
                if (!audio3.value.paused) {
                    audio3.value.pause();
                    audio3.value.currentTime = 0;
                }
                audio3.value.play();
            } else {
                console.error("Audio not initialized yet.");
            }
        };
        const isBlue = ref(false)
        const isGreen = ref(false)
        const isRed = ref(false)
        const isScanningPaused = ref(false);
        const currentModel = ref('blue');
        const finishModal = ref(false);
        const eventId = ref('8')
        const uiScanning = ref(false);

        let sceneEl = null;
        let arSystem = null;

        const textIndex = ref(5)
        const characterStore = useCharacterStore()
        const currentCharacter = computed(() => characterStore.currentCharacter)

        const currentCharacterContent = computed(() => {
            return currentCharacter.value.common2[textIndex.value] || {}
        })


        let typingTimeout;

        const typeText = () => {
            const content = "부암동가든 안에 숨어있는 꿀벌 3마리를 찾아 스캔해줘"
            const textContainer = document.getElementById("typed-text");
            let index = 0;

            clearTimeout(typingTimeout);

            textContainer.textContent = "";

            function typing() {
                if (index < content.length) {
                    textContainer.textContent += content.charAt(index);
                    index++;
                    typingTimeout = setTimeout(typing, 50);
                }
            }
            typing();
        };

        const setVH = () => {
            let vh = window.innerHeight * 0.01;
            document.documentElement.style.setProperty('--vh', `${vh}px`);
        }

        const toggleColorFlag = () => {
            if (isScanningPaused.value) return;

            if (!isBlue.value) {
                playAudio3();
                isBlue.value = true;
                currentModel.value = 'blue';
                setTimeout(() => {
                    currentModel.value = 'none';
                }, 2000);
            } else if (!isGreen.value) {
                playAudio3();
                isGreen.value = true;
                currentModel.value = 'green';
                setTimeout(() => {
                    currentModel.value = 'none';
                }, 2000);
            } else if (!isRed.value) {
                playAudio3();
                isRed.value = true;
                currentModel.value = 'red';
                setTimeout(() => {
                    currentModel.value = 'none';
                }, 2000);

                setTimeout(() => {
                    playAudio();
                    finishModal.value = true;
                    const scanningOverlay = document.querySelector('#example-scanning-overlay');
                    scanningOverlay.style.display = 'none';
                }, 1500);
            }
        }


        const nextPage = () => {
            playAudio2();

            postData('content_reword', 'content8')
            localStorage.setItem('clearId7', 'true')
            localStorage.setItem('normalItem3', 'true')

            setTimeout(() => {
                router.push('/eventout')
            }, 500);
        }

        onMounted(() => {

            setVH();
            window.addEventListener('resize', setVH);


            setTimeout(async () => {
                typeText()
            }, 100);
            sceneEl = document.querySelector('a-scene');
            sceneEl.addEventListener('loaded', function () {
                arSystem = sceneEl.systems["mindar-image-system"];

            });


            const exampleTarget = document.querySelector('#target');




            exampleTarget.addEventListener("targetFound", event => {

                if (!isScanningPaused.value) {

                    toggleColorFlag();

                    isScanningPaused.value = true;

                    const scanningOverlay = document.querySelector('#example-scanning-overlay');
                    scanningOverlay.style.display = 'none';
                    setTimeout(() => {
                        isScanningPaused.value = false;
                        scanningOverlay.style.display = 'flex';
                    }, 5000);
                }
            });

            exampleTarget.addEventListener("targetLost", event => {

                // currentModel.value = 'none';

            });


        });



        return {
            isBlue,
            isGreen,
            isRed,
            currentModel,
            characterContent: currentCharacterContent,
            finishModal,
            nextPage,
            uiScanning
        }
    }
}
</script>

<style scoped>
#sceneContainer {
    width: 100%;
    height: calc(100 * var(--vh));
    overflow: hidden;
}

a-scene {
    width: 100%;
    height: 100%;
}


.image-container {
    overflow: hidden;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    width: 100%;
    height: calc(10 * var(--vh));
    position: absolute;
    z-index: 2;
    top: calc(17.5 * var(--vh));
}

.image-container img {
    width: auto;
    height: calc(5 * var(--vh));
    background-color: #57A3E5;
    border: 2px solid #fff;
    border-radius: 100px;
    padding: 10px;
    filter: grayscale(100%);
}



.top-section {
    overflow: visible;
    position: absolute;
    display: flex;
    flex-direction: row;
    width: 100%;
    height: calc(10 * var(--vh));
    justify-content: center;
    align-items: center;
    z-index: 1;
    margin-top: calc(5 * var(--vh));
}


.text-container1 {
    overflow: visible;
    display: flex;
    align-items: center;
    background-color: #fff;
    width: 90%;
    position: relative;
    border: 2px dashed #D50F4A;
    border-radius: 16px;
}

.text-container1 p {
    overflow: hidden;
    padding: 20px 10px 20px 10px;
    color: #000;
    font-family: "NanumSquare", sans-serif;
    font-size: 15px;
    font-style: normal;
    font-weight: 700;
    line-height: 24px;
    letter-spacing: -0.4px;
    margin: 0;
    border-radius: 10px;
    max-width: 26ch;
    overflow-wrap: break-word;
    word-break: keep-all;
    text-align: left;
}

.side-image-container {
    width: 20%;
    display: flex;
    align-items: center;
    position: absolute;
    right: 2.5%;
    top: calc(2.5 * var(--vh));
    z-index: 2;
}

.side-image-container img {
    background-color: #fff;
    overflow: hidden;
    height: 70%;
    width: 70%;
    display: block;
    clip-path: circle(50%);
    object-fit: cover;
    border: 1px solid #D50F4A;
    border-radius: 100px;
}

.image-container3 {
    position: absolute;
    width: 90%;
    height: auto;
    z-index: 10;
    background-color: #fff;
    border-radius: 16px;
    left: 50%;
    top: calc(50 * var(--vh));
    transform: translate(-50%, -50%);
    padding-bottom: calc(3 * var(--vh));
}


.reward-container {
    width: 100%;
    height: 100%;
    justify-content: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: calc(-3 * var(--vh));

}


.image1 {
    position: relative;
    width: 100%;
    height: auto;
}

.image2 {
    position: relative;
    width: 60%;
    height: auto;
}

.p1 {
    position: relative;
    color: var(--Text-Black, #111);
    text-align: center;
    font-family: "NanumSquare", sans-serif;
    font-size: 18px;
    font-style: normal;
    font-weight: 800;
    line-height: 28px;
    letter-spacing: -0.5px;
    max-width: 20ch;
    overflow-wrap: break-word;
    word-break: keep-all;

}

.p2 {
    color: var(--Text-Gray, #767676);
    text-align: center;
    font-family: "NanumSquare", sans-serif;
    font-size: 12px;
    font-style: normal;
    font-weight: 700;
    line-height: 16px;
    letter-spacing: -0.3px;
}

.reward-container button {
    width: 80%;
    padding: 10px;
    border-radius: 100px;
    border: 2px solid var(--Point-Red-Dark, #922142);
    background: var(--Point-Red, #D50F4A);
    color: var(--Text-White, #FFF);
    text-align: center;
    font-family: "NanumSquare", sans-serif;
    font-size: 16px;
    font-style: normal;
    font-weight: 700;
    line-height: 24px;
    letter-spacing: -0.4px;
    text-align: center;
    z-index: 1;
    position: relative;
    box-shadow: 0px 3px #922142;
    margin-top: calc(2 * var(--vh));
}

#example-scanning-overlay {
    width: 100%;
    height: calc(100 * var(--vh));
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background: transparent;
    z-index: 2;
}

#example-scanning-overlay .inner {
    width: 80%;
    height: calc(45 * var(--vh));
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    background: linear-gradient(to right, white 10px, transparent 10px) 0 0, linear-gradient(to right, white 10px, transparent 10px) 0 100%, linear-gradient(to left, white 10px, transparent 10px) 100% 0, linear-gradient(to left, white 10px, transparent 10px) 100% 100%, linear-gradient(to bottom, white 10px, transparent 10px) 0 0, linear-gradient(to bottom, white 10px, transparent 10px) 100% 0, linear-gradient(to top, white 10px, transparent 10px) 0 100%, linear-gradient(to top, white 10px, transparent 10px) 100% 100%;
    background-repeat: no-repeat;
    background-size: 40px 40px;
}

#example-scanning-overlay .inner .scanline {
    position: absolute;
    width: 100%;
    height: 10px;
    background: white;
    animation: move 2s linear infinite;
}

@keyframes move {
    0% {
        transform: translateY(-20vh);
    }

    100% {
        transform: translateY(20vh);
    }
}

.guide {
    width: auto;
    height: 15%;
    position: absolute;
    top: 85%;
    left: 70%;
    transform: translateX(-50%);
    z-index: 3;
    animation: beat .35s infinite alternate;
    pointer-events: none;
}

@keyframes beat {
    from {
        transform: scale(1);
    }

    to {
        transform: scale(1.5);
    }
}
</style>

