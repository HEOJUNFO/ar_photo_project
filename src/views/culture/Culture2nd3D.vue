<template>
    <div>
        <div v-show="showCaptureButton" class=" top-section2">
            <div class="text-container2">
                <p id="typed-text"></p>
            </div>
            <div class="side-image-container3">
                <img :src="characterContent?.src" alt="Side Image" />
            </div>
        </div>
        <div v-show="!showCaptureButton" class="top-section">
            <div class="side-image-container1">
                <button @click="showModal = true"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                        viewBox="0 0 16 16" fill="none">
                        <path d="M3.825 9L9.425 14.6L8 16L0 8L8 0L9.425 1.4L3.825 7H16V9H3.825Z" fill="#111111" />
                    </svg></button>
            </div>
            <div class="text-container1">
                <p>염색색상변경</p>
            </div>
            <div class="side-image-container2">
                <button @click="saveImage()">완료</button>
            </div>
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
            <button @click.stop="capture()">촬영</button>
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
import { onMounted, computed, ref, watch } from "vue";

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
            console.log(e)
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

            console.log(d)
            let hex = hexToRgb(d);
            hex[3] = 255;
            hex[0] -= 10;
            hex[1] -= 10;
            hex[2] -= 10;

            legendColors[1] = hex;
        },
        capture() {
            let video = document.getElementById("webcam");
            let image = document.getElementById("image");
            let img = document.getElementById("face");

            let canvas = document.createElement('canvas');
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            let ctx = canvas.getContext('2d');

            ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
            img.src = canvas.toDataURL();

            video.style.display = 'none';
            video.style.width = '80%'
            img.style.width = '80%'
            image.style.height = 'calc(64 * var(--vh))';
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
    setup() {
        const imageDataStore = useImageDataStore()
        const characterStore = useCharacterStore()
        const textIndex = ref(6)

        characterStore.setCharacterIndex(localStorage.getItem('characterID'))

        const currentCharacterContent = computed(() => {
            const char = characterStore.currentCharacter
            return char?.culture2[textIndex.value] || {}
        })

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
            let canvasElement = document.getElementById("canvas1");
            let imageData = canvasElement.toDataURL();
            imageDataStore.setImageData(imageData)
            imageDataStore.setEventName('culture2')
            router.push({ path: '/capturepreview' });

        }

        onMounted(() => {
            setVH();
            window.addEventListener('resize', setVH);
            setTimeout(typeText, 1000);
        })
        watch(() => currentCharacterContent.value.text, () => {
            setTimeout(typeText, 200);
        });
        return {
            saveImage,
            characterContent: currentCharacterContent,
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
    width: 60px;
    height: 60px;
    border-radius: 50%;
    background-color: #555;
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
    width: 100%;
    height: calc(100 * var(--vh));
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
    height: calc(26 * var(--vh));
    align-items: center;
    padding-bottom: calc(0.25 * var(--vh));
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
    border: 1px solid #000;
}

.top-section {
    display: flex;
    flex-direction: row;
    width: 100%;
    height: calc(10 * var(--vh));
    justify-content: center;
    align-items: center;
    z-index: 1;
    background: var(--Main-Pink, #F0D7CA);
}


.side-image-container1 {
    display: flex;
    align-items: center;
    position: absolute;
    left: 5vw;
}

.side-image-container2 {
    display: flex;
    align-items: center;
    position: absolute;
    right: 5vw;
}


.side-image-container1 button {
    height: 100%;
    width: 100%;
    display: block;
    border: none;
    background: none;
    outline: none;
}

.side-image-container2 button {
    height: 100%;
    width: 100%;
    display: block;
    border: none;
    background: none;
    outline: none;
    color: var(--Point-REd, var(--Point-Red, #D50F4A));
    font-family: "NanumSquare", sans-serif;
    font-size: 16px;
    font-style: normal;
    font-weight: 800;
    line-height: 24px;
    letter-spacing: -0.4px;
}

.text-container1 {
    justify-content: center;
    align-items: center;
}



.text-container1 p {
    color: var(--Text-Black, #111);
    font-family: "NanumSquare", sans-serif;
    font-size: 20px;
    font-style: normal;
    font-weight: 700;
    line-height: 28px;
    letter-spacing: -0.5px;
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

.top-section2 {
    overflow: visible;
    position: absolute;
    display: flex;
    flex-direction: row;
    width: 100%;
    height: calc(10 * var(--vh));
    justify-content: space-between;
    align-items: center;
    z-index: 10;
    margin-top: calc(5 * var(--vh));
}


.text-container2 {
    overflow: visible;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #fff;
    width: 75%;
    position: relative;
    border-radius: 16px;
    margin-left: 5%;
}

.text-container2::before {
    content: "";
    width: 0;
    height: 0;
    border-top: 10px solid transparent;
    border-bottom: 10px solid transparent;
    border-left: 15px solid #fff;
    position: absolute;
    right: -10px;
    top: 30%;
    transform: translateY(-50%);
}

.text-container2 p {
    overflow: hidden;
    padding: 15px;
    color: #000;
    font-family: "NanumSquare", sans-serif;
    font-size: 16px;
    font-style: normal;
    font-weight: 700;
    line-height: 24px;
    letter-spacing: -0.4px;
    margin: 0;
    border-radius: 10px;
    overflow-wrap: break-word;
    word-break: keep-all;
    text-align: center;
}



.side-image-container3 {
    margin-top: calc(-5 * var(--vh));
    margin-right: -10%;
    position: relative;
    overflow: hidden;
    width: 20%;
    display: flex;
    align-items: center;
}

.side-image-container3 img {
    background-color: #FFECD6;
    overflow: hidden;
    height: 70%;
    width: 70%;
    display: block;
    clip-path: circle(50%);
    object-fit: cover;
}
</style>
