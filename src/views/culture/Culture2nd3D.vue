<template>
    <div>
        <loading-container>
        </loading-container>
        <div v-if="showCaptureButton" class="top-section">
            <button @click="home()"><svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40"
                    fill="none">
                    <circle cx="20" cy="20" r="19" fill="white" stroke="#D50F4A" stroke-width="2" />
                    <mask id="mask0_541_1822" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="8" y="8" width="24"
                        height="24">
                        <rect x="8" y="8" width="24" height="24" fill="#D9D9D9" />
                    </mask>
                    <g mask="url(#mask0_541_1822)">
                        <path
                            d="M14 27H17V22C17 21.7167 17.0958 21.4792 17.2875 21.2875C17.4792 21.0958 17.7167 21 18 21H22C22.2833 21 22.5208 21.0958 22.7125 21.2875C22.9042 21.4792 23 21.7167 23 22V27H26V18L20 13.5L14 18V27ZM12 27V18C12 17.6833 12.0708 17.3833 12.2125 17.1C12.3542 16.8167 12.55 16.5833 12.8 16.4L18.8 11.9C19.15 11.6333 19.55 11.5 20 11.5C20.45 11.5 20.85 11.6333 21.2 11.9L27.2 16.4C27.45 16.5833 27.6458 16.8167 27.7875 17.1C27.9292 17.3833 28 17.6833 28 18V27C28 27.55 27.8042 28.0208 27.4125 28.4125C27.0208 28.8042 26.55 29 26 29H22C21.7167 29 21.4792 28.9042 21.2875 28.7125C21.0958 28.5208 21 28.2833 21 28V23H19V28C19 28.2833 18.9042 28.5208 18.7125 28.7125C18.5208 28.9042 18.2833 29 18 29H14C13.45 29 12.9792 28.8042 12.5875 28.4125C12.1958 28.0208 12 27.55 12 27Z"
                            fill="#D50F4A" />
                    </g>
                </svg></button>
            <p>
                염색하기
            </p>
            <button @click="back()"><svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40"
                    fill="none">
                    <circle cx="20" cy="20" r="19" fill="white" stroke="#D50F4A" stroke-width="2" />
                    <mask id="mask0_541_1827" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="8" y="8" width="24"
                        height="24">
                        <rect x="8" y="8" width="24" height="24" fill="#D9D9D9" />
                    </mask>
                    <g mask="url(#mask0_541_1827)">
                        <path
                            d="M20 21.4L15.1 26.3C14.9167 26.4833 14.6833 26.575 14.4 26.575C14.1167 26.575 13.8833 26.4833 13.7 26.3C13.5167 26.1167 13.425 25.8833 13.425 25.6C13.425 25.3167 13.5167 25.0833 13.7 24.9L18.6 20L13.7 15.1C13.5167 14.9167 13.425 14.6833 13.425 14.4C13.425 14.1167 13.5167 13.8833 13.7 13.7C13.8833 13.5167 14.1167 13.425 14.4 13.425C14.6833 13.425 14.9167 13.5167 15.1 13.7L20 18.6L24.9 13.7C25.0833 13.5167 25.3167 13.425 25.6 13.425C25.8833 13.425 26.1167 13.5167 26.3 13.7C26.4833 13.8833 26.575 14.1167 26.575 14.4C26.575 14.6833 26.4833 14.9167 26.3 15.1L21.4 20L26.3 24.9C26.4833 25.0833 26.575 25.3167 26.575 25.6C26.575 25.8833 26.4833 26.1167 26.3 26.3C26.1167 26.4833 25.8833 26.575 25.6 26.575C25.3167 26.575 25.0833 26.4833 24.9 26.3L20 21.4Z"
                            fill="#D50F4A" />
                    </g>
                </svg></button>
        </div>
        <div v-if="!showCaptureButton" class="top-section">
            <button @click="back()"><svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40"
                    fill="none">
                    <circle cx="20" cy="20" r="19" fill="white" stroke="#D50F4A" stroke-width="2" />
                    <mask id="mask0_549_2172" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="8" y="8" width="24"
                        height="24">
                        <rect x="8" y="8" width="24" height="24" fill="#D9D9D9" />
                    </mask>
                    <g mask="url(#mask0_549_2172)">
                        <path
                            d="M15.825 21L20.725 25.9C20.925 26.1 21.0209 26.3333 21.0125 26.6C21.0042 26.8667 20.9 27.1 20.7 27.3C20.5 27.4833 20.2667 27.5792 20 27.5875C19.7334 27.5958 19.5 27.5 19.3 27.3L12.7 20.7C12.6 20.6 12.5292 20.4917 12.4875 20.375C12.4459 20.2583 12.425 20.1333 12.425 20C12.425 19.8667 12.4459 19.7417 12.4875 19.625C12.5292 19.5083 12.6 19.4 12.7 19.3L19.3 12.7C19.4834 12.5167 19.7125 12.425 19.9875 12.425C20.2625 12.425 20.5 12.5167 20.7 12.7C20.9 12.9 21 13.1375 21 13.4125C21 13.6875 20.9 13.925 20.7 14.125L15.825 19H27C27.2834 19 27.5209 19.0958 27.7125 19.2875C27.9042 19.4792 28 19.7167 28 20C28 20.2833 27.9042 20.5208 27.7125 20.7125C27.5209 20.9042 27.2834 21 27 21H15.825Z"
                            fill="#D50F4A" />
                    </g>
                </svg></button>
            <p>
                염색 색상 변경
            </p>
            <button @click="saveImage()"><svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40"
                    fill="none">
                    <circle cx="20" cy="20" r="19" fill="white" stroke="#D50F4A" stroke-width="2" />
                    <mask id="mask0_549_2183" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="8" y="8" width="24"
                        height="24">
                        <rect x="8" y="8" width="24" height="24" fill="#D9D9D9" />
                    </mask>
                    <g mask="url(#mask0_549_2183)">
                        <path
                            d="M17.55 23.15L26.025 14.675C26.225 14.475 26.4625 14.375 26.7375 14.375C27.0125 14.375 27.25 14.475 27.45 14.675C27.65 14.875 27.75 15.1125 27.75 15.3875C27.75 15.6625 27.65 15.9 27.45 16.1L18.25 25.3C18.05 25.5 17.8166 25.6 17.55 25.6C17.2833 25.6 17.05 25.5 16.85 25.3L12.55 21C12.35 20.8 12.2541 20.5625 12.2625 20.2875C12.2708 20.0125 12.375 19.775 12.575 19.575C12.775 19.375 13.0125 19.275 13.2875 19.275C13.5625 19.275 13.8 19.375 14 19.575L17.55 23.15Z"
                            fill="#D50F4A" />
                    </g>
                </svg></button>
        </div>
        <div class="webcam" id="image">
            <canvas class="canvas1" id="canvas1"
                :style="{ display: canvas1Display, position: 'relative', zIndex: 1 }"></canvas>
            <video class="video" id="webcam" playsinline="true"
                :style="{ display: videoDisplay, overflow: 'hidden' }"></video>
            <img v-show="!showCaptureButton" class="canvas1" id="face"
                src="https://cdn.glitch.global/eb18e63f-936a-4172-8bdd-9263c7a6a04a/0.jpg?v=1689605799161"
                crossorigin="anonymous" />
        </div>
        <div v-show="showCaptureButton" class="capture-container">
            <button @click.stop="capture(), playAudio2()"><svg xmlns="http://www.w3.org/2000/svg" width="70" height="70"
                    viewBox="0 0 70 70" fill="none">
                    <circle cx="35" cy="35" r="28" fill="#D50F4A" />
                    <circle opacity="0.3" cx="35" cy="35" r="33.5" stroke="#D50F4A" stroke-width="3" />
                    <circle cx="35" cy="35" r="10.5" stroke="white" stroke-width="3" />
                </svg></button>
        </div>
        <div v-show="!showCaptureButton" class="png-buttons-container">
            <button @click="colVal('none')" class="png-button"
                style="background-image: url('../../resource/shopping2/no_select_button.png'); width: 80px; height:  80px;"></button>
            <button @click="colVal('#A52A2A')" class="png-button"
                style="background-image: url('../resource/culture2/hair_01_redbrown.png')"></button>
            <button @click="colVal('#98623c')" class="png-button"
                style="background-image: url('../resource/culture2/hair_02_ashbrown.png')"></button>
            <button @click="colVal('#0047AB')" class="png-button"
                style="background-image: url('../resource/culture2/hair_03_corbaltblue.png')"></button>
            <button @click="colVal('#B2BEB5')" class="png-button"
                style="background-image: url('../resource/culture2/hair_04_ashgray.png')"></button>
            <button @click="colVal('#7B3F00')" class="png-button"
                style="background-image: url('../resource/culture2/hair_05_chocobrown.png')"></button>
            <button @click="colVal('#8f8395')" class="png-button"
                style="background-image: url('../resource/culture2/hair_06_ashpurple.png')"></button>
        </div>
        <div v-if="showModal" class="modal">
            <p>사진 촬영으로 돌아갑니다</p>
            <div class="modal-buttons">
                <button @click="showModal = false">취소</button>
                <button @click="back()">확인</button>
            </div>
        </div>
    </div>
</template>

<script>
import vision from "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.0";
import router from "../../router";
import { useImageDataStore } from '../../stores/imageData.js'
import { useCharacterStore } from '../../stores/characterStore.js'
import { onMounted, computed, ref, watch, inject } from "vue";
import LoadingContainer from '../../components/LoadingContainer.vue'

const { ImageSegmenter, SegmentationMask, FilesetResolver } = vision;
let runningMode = "VIDEO"
let imageSegmenter = null;
let labels = [];

let webcamRunning = false;
let legendColors = [
    [0, 0, 0, 0],
    [165, 42, 42, 255],
];

export default {
    data() {
        return {
            canvas1Display: 'none',
            videoDisplay: 'block',
            showCaptureButton: true,
            showModal: false,

        };
    },
    async created() {
        try {
            await this.createImageSegmenter();
        }
        catch (e) {
        }
        this.init();
    },
    methods: {
        back() {
            window.location.reload();
        },
        colVal(d) {
            if (d === 'none') {
                this.canvas1Display = 'none';
                let canvas = document.getElementById("canvas1");
                canvas.style.display = 'none';
                return;
            }
            const hexToRgb = hex =>
                hex.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i, (m, r, g, b) => '#' + r + r + g + g + b + b)
                    .substring(1).match(/.{2}/g)
                    .map(x => parseInt(x, 16))

            let hex = hexToRgb(d);
            hex[3] = 0;
            hex[0] -= 10;
            hex[1] -= 10;
            hex[2] -= 10;

            legendColors[1] = hex;
        },
        capture() {
            let video = document.getElementById("webcam");
            let image = document.getElementById("image");
            let img = document.getElementById("face");
            // let logo = document.getElementById("logo");

            let canvas = document.createElement('canvas');
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            let ctx = canvas.getContext('2d');

            ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
            // let logoXPosition = (canvas.width - logo.width) / 2;

            // ctx.drawImage(logo, logoXPosition, 0, logo.width, logo.height);


            img.src = canvas.toDataURL();

            video.style.display = 'none';
            video.style.width = '80%'
            img.style.width = '80%'
            image.style.height = 'calc(70 * var(--vh))';
            image.style.top = '0vh';

            webcamRunning = false;

            this.showCaptureButton = false;
        },
        async createImageSegmenter() {
            const vision = await FilesetResolver.forVisionTasks("https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm");
            imageSegmenter = await ImageSegmenter.createFromOptions(vision, {
                baseOptions: {
                    modelAssetPath: "https://cdn.glitch.global/eb18e63f-936a-4172-8bdd-9263c7a6a04a/hair_segmenter.tflite?v=1689603953377",
                    delegate: "CPU"
                },
                runningMode: runningMode,
                outputCategoryMask: true,
                outputConfidenceMasks: true
            });
            labels = imageSegmenter.getLabels();
        },
        init() {
            let video = document.getElementById("webcam");
            let canvasElement = document.getElementById("canvas1");

            const canvasCtx = canvasElement.getContext("2d", { willReadFrequently: true })

            webcamRunning = false;

            let lastWebcamTime = -1;
            async function predictWebcam() {
                const currentTime = video.currentTime;

                if (currentTime === lastWebcamTime) {
                    return;
                }
                lastWebcamTime = currentTime;

                if (imageSegmenter !== undefined) {
                    canvasCtx.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
                } else {
                    return;
                }

                if (runningMode === "IMAGE") {
                    runningMode = "VIDEO";
                    await imageSegmenter.setOptions({
                        runningMode: runningMode
                    });
                }
            }

            const imageContainers = document.getElementsByClassName("png-buttons-container");

            for (let i = 1; i < 7; i++) {

                imageContainers[0]
                    .getElementsByTagName("button")[i]
                    .addEventListener("click", handleClick);
            }

            let canvasClick;
            async function handleClick(event) {
                if (imageSegmenter === undefined) {
                    return;
                }
                canvasClick = document.getElementById("canvas1");
                canvasClick.style.display = 'block';
                canvasClick.style.width = '80%';
                let img = document.getElementById("face");

                const cxt = canvasClick.getContext("2d");

                canvasClick.width = document.getElementById("face").naturalWidth;
                canvasClick.height = document.getElementById("face").naturalHeight;

                cxt.clearRect(0, 0, canvasClick.width, canvasClick.height);
                cxt.drawImage(img, 0, 0, canvasClick.width, canvasClick.height);

                if (runningMode === "VIDEO") {
                    runningMode = "IMAGE";
                    await imageSegmenter.setOptions({
                        runningMode: runningMode
                    });
                }

                imageSegmenter.segment(img, callback);
            }
            function callback(result) {
                const cxt = canvasClick.getContext("2d");
                const { width, height } = result.categoryMask;
                let imageData = cxt.getImageData(0, 0, width, height).data;
                canvasClick.width = width;
                canvasClick.height = height;
                let category = "";
                const mask = result.categoryMask.getAsUint8Array();
                for (let i in mask) {
                    if (mask[i] > 0) {
                        category = labels[mask[i]];
                    }

                    if (mask[i] % legendColors.length == 1) {
                        const legendColor = legendColors[1];
                        imageData[i * 4] = (legendColor[0] + imageData[i * 4]) / 2;
                        imageData[i * 4 + 1] = (legendColor[1] + imageData[i * 4 + 1]) / 2;
                        imageData[i * 4 + 2] = (legendColor[2] + imageData[i * 4 + 2]) / 2;
                        imageData[i * 4 + 3] = (legendColor[3] + imageData[i * 4 + 3]) / 2;
                    }
                }
                const uint8Array = new Uint8ClampedArray(imageData.buffer);
                const dataNew = new ImageData(uint8Array, width, height);
                canvasClick.imageSmoothingEnabled = true;
                cxt.putImageData(dataNew, 0, 0);

            }

            function hasGetUserMedia() {
                return !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia);
            }

            async function enableCam(event) {
                if (imageSegmenter === undefined) {
                    return;
                }
                if (webcamRunning === true) {
                    webcamRunning = false;

                }
                else {
                    webcamRunning = true;

                }

                const constraints = {
                    video: true
                };
                video = document.getElementById("webcam");

                video.addEventListener('loadedmetadata', function () {

                    video.setAttribute('width', window.innerWidth);
                    video.setAttribute('height', window.innerHeight);
                    document.getElementById('canvas1').setAttribute('width', window.innerWidth);
                    document.getElementById('canvas1').setAttribute('height', window.innerHeight);
                });

                video.srcObject = await navigator.mediaDevices.getUserMedia(constraints);
                video.addEventListener("loadeddata", predictWebcam);
                video.play();
                video.style.display = 'block';
            }


            if (hasGetUserMedia()) {
                enableCam();
            }
            else {
                console.warn("getUserMedia() is not supported by your browser");
            }
        }
    },
    components: {
        LoadingContainer
    },
    setup() {
        const audio = ref(null);
        const audio2 = ref(null);

        import('@resource/sounds/generaltap.wav')
            .then(src => {
                audio.value = new Audio(src.default);
            })
            .catch(error => {
                console.error("Error importing audio file:", error);
            });

        const playAudio = () => {
            if (audio.value) {
                if (!audio.value.paused) {
                    audio.value.pause();
                    audio.value.currentTime = 0;
                }
                audio.value.play();
            } else {
                console.error("Audio not initialized yet.");
            }
        };

        import('@resource/sounds/shutter.wav')
            .then(src => {
                audio2.value = new Audio(src.default);
            })
            .catch(error => {
                console.error("Error importing audio file:", error);
            });

        const playAudio2 = () => {
            if (audio2.value) {
                if (!audio2.value.paused) {
                    audio2.value.pause();
                    audio2.value.currentTime = 0;
                }
                audio2.value.play();
            } else {
                console.error("Audio not initialized yet.");
            }
        };
        const imageDataStore = useImageDataStore()
        const characterStore = useCharacterStore()
        const textIndex = ref(6)

        characterStore.setCharacterIndex(localStorage.getItem('characterID'))

        const currentCharacterContent = computed(() => {
            const char = characterStore.currentCharacter
            return char?.culture2[textIndex.value] || {}
        })
        const stopAudio = inject('stopAudio');
        const home = () => {
            playAudio();
            stopAudio();
            router.push('/stage')
        }

        let typingTimeout;

        const typeText = () => {
            const content = currentCharacterContent.value.text;
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

        const saveImage = () => {
            playAudio();
            let canvasElement = document.getElementById("canvas1");
            let imageData = canvasElement.toDataURL();
            imageDataStore.setImageData(imageData)
            imageDataStore.setEventName('culture2')
            router.push({ path: '/capturepreview' });

        }

        onMounted(() => {
            setVH();
            window.addEventListener('resize', setVH);
            // setTimeout(typeText, 1000);
        })
        // watch(() => currentCharacterContent.value.text, () => {
        //     setTimeout(typeText, 200);
        // });
        return {
            saveImage,
            characterContent: currentCharacterContent,
            home,
            playAudio,
            playAudio2,
        }
    },
}

</script>

<style scoped>
.capture-container {
    position: absolute;
    top: calc(85 * var(--vh));
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 2;
}

.capture-container button {
    width: 100%;
    height: auto;
    border-radius: 50%;
    background-color: rgba(0, 0, 0, 0);
    border: none;
    color: #fff;
    cursor: pointer;
    transition: background-color 0.3s;
    display: flex;
    align-items: center;
    justify-content: center;
    outline: none;
}

.webcam {
    display: flex;
    justify-content: center;
    position: relative;
    height: calc(90 * var(--vh));
    width: 100%;
    overflow: hidden;
    background-color: #565656;
}

.video {
    width: 100%;
    height: 100%;
    display: block;
    object-fit: cover;
    position: absolute;
}

.canvas1 {
    width: 100%;
    height: 100%;
    display: block;
    object-fit: cover;
    position: absolute;
}

.png-buttons-container {
    display: grid;
    grid-template-columns: repeat(7, 80px);
    overflow-x: auto;
    overflow-y: hidden;
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: calc(20 * var(--vh));
    align-items: center;
}

.png-button {
    width: 60px;
    height: 60px;
    border: none;
    background-size: cover;
    background-repeat: no-repeat;
    background-color: rgba(0, 0, 0, 0);
    cursor: pointer;
}

.png-button:hover {
    border: none;
    border-radius: 100px;
    outline: 1px solid #D50F4A;
    outline-offset: 2px;
}


.top-section {
    display: flex;
    width: 100%;
    height: calc(10 * var(--vh));
    justify-content: space-between;
    align-items: center;
    z-index: 1;
    background: #fff
}

.top-section p {
    color: var(--Point-REd, var(--Point-Red, #D50F4A));
    text-align: center;
    font-family: "NanumSquare", sans-serif;
    font-size: 20px;
    font-style: normal;
    font-weight: 700;
    line-height: 28px;
    letter-spacing: -0.5px;
}

.top-section button {
    background-color: rgba(0, 0, 0, 0);
    border: none;
    width: 15%;
    height: 100%;

}

.top-section button svg {
    width: auto;
    height: calc(5* var(--vh));

}

.modal {
    position: fixed;
    top: 50%;
    left: 50%;
    width: 60%;
    height: calc(10 * var(--vh));
    display: flex;
    align-items: center;
    justify-content: space-between;
    border: none;
    background-color: #fff;
    border-radius: 16px;
    flex-direction: column;
    z-index: 3;
    padding-top: 10%;
    transform: translate(-50%, -50%);
}

.modal p {
    color: #111;
    text-align: center;
    font-family: "NanumSquare", sans-serif;
    font-size: 15px;
    font-style: normal;
    font-weight: 800;
    line-height: 28px;
    letter-spacing: -0.5px;
}

.modal-buttons {
    margin-top: 10%;
    display: flex;
    justify-content: center;
    width: 100%;
}

.modal button {
    width: 50%;
    padding: 10px;
    border: none;
    cursor: pointer;
}



.modal button:first-child {
    border-radius: 0px 0px 0px 16px;
    background: var(--Background_Grey, #D9D9D9);
    color: var(--Text-Gray, #767676);
    text-align: center;
    font-family: "NanumSquare", sans-serif;
    font-size: 16px;
    font-style: normal;
    font-weight: 700;
    line-height: 24px;
    letter-spacing: -0.4px;
}

.modal button:last-child {
    border-radius: 0px 0px 16px 0px;
    background: var(--Main-Pink, #F0D7CA);
    color: var(--Text-Black, #111);
    text-align: center;
    font-family: "NanumSquare", sans-serif;
    font-size: 16px;
    font-style: normal;
    font-weight: 700;
    line-height: 24px;
    letter-spacing: -0.4px;
}
</style>
