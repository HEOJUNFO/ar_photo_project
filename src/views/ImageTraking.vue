<template>
    <div class="main">
        <div class="top-section">
            <div class="text-container1">
                <p id="typed-text"></p>
            </div>
        </div>
        <div class="side-image-container">
            <img :src="characterContent.src" alt="Side Image" />
        </div>
        <video class="video" ref="videoRef" autoplay muted playsinline></video>
        <canvas class="canvas" ref="canvasRef"></canvas>
        <div class="image-container">
            <img src="@resource/common/red_bee.png" :style="{ filter: isBlue ? 'grayscale(0%)' : '' }" />
            <img src="@resource/common/green_bee.png" :style="{ filter: isGreen ? 'grayscale(0%)' : '' }" />
            <img src="@resource/common/blue_bee.png" :style="{ filter: isRed ? 'grayscale(0%)' : '' }" />
        </div>
        <div class="image-container2">
            <svg ref="svgContainerRef" xmlns="http://www.w3.org/2000/svg" width="234" height="234" viewBox="0 0 234 234"
                fill="none">
                <path d="M229 55.1484V5H178.852" stroke="white" stroke-opacity="0.5" stroke-width="10"
                    stroke-linecap="round" stroke-linejoin="round" />
                <path d="M55.1484 5H5V55.1484" stroke="white" stroke-opacity="0.5" stroke-width="10" stroke-linecap="round"
                    stroke-linejoin="round" />
                <path d="M5 178.852V229H55.1484" stroke="white" stroke-opacity="0.5" stroke-width="10"
                    stroke-linecap="round" stroke-linejoin="round" />
                <path d="M178.852 229H229V178.852" stroke="white" stroke-opacity="0.5" stroke-width="10"
                    stroke-linecap="round" stroke-linejoin="round" />
            </svg>
            <img v-if="!scanning" src="@resource/common/blue_bee.png" style="filter: grayscale(100%); opacity: 0.5;" />
            <img v-if="scanning" src="@resource/common/blue_bee.png" style="filter: grayscale(0%); opacity: 0.5;" />

        </div>
        <div v-show="finishModal" class="image-container3">
            <div class="reward-container">
                <img class="image1" src="@resource/common/label.png" />
                <p class="p1">봄의 숲 웹프레임 1종</p>
                <p class="p2">(서비스 내 사진촬영에서 확인 및 사용가능)</p>
                <img class="image2" src="@resource/icon/frame_02.png" />
                <button @click="nextPage()">상품획득 성공</button>
            </div>
        </div>
    </div>
</template>

<script>
import { onMounted, ref, computed } from 'vue';
import router from '../router';
import { useCharacterStore } from '../stores/characterStore.js'


export default {
    name: 'ImageTracking',

    setup() {
        const audio = ref(null);

        import('@resource/sounds/bee.wav')
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
        const stopAudio = () => {
            audio.value.pause();
        };
        const audio2 = ref(null);

        import('@resource/sounds/acquired.wav')
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

        const audio3 = ref(null);

        import('@resource/sounds/success.wav')
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
        const eventId = ref('8')
        const isBlue = ref(false)
        const isGreen = ref(false)
        const isRed = ref(false)
        const finishModal = ref(false)
        const scanning = ref(false)

        const textIndex = ref(5)
        const characterStore = useCharacterStore()
        const svgContainerRef = ref(null)
        const videoRef = ref(null);
        const canvasRef = ref(null);

        const currentCharacter = computed(() => characterStore.currentCharacter)

        const currentCharacterContent = computed(() => {
            return currentCharacter.value.common2[textIndex.value] || {}
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

        const nextPage = () => {
            playAudio3();
            if (eventId.value === '8') {
                localStorage.setItem('clearId8', 'true')
                localStorage.setItem('normalItem5', 'true')
            }
            router.push('/eventout')
        }

        const setVH = () => {
            let vh = window.innerHeight * 0.01;
            document.documentElement.style.setProperty('--vh', `${vh}px`);
        }


        onMounted(async () => {

            setVH();
            window.addEventListener('resize', setVH);

            setTimeout(async () => {
                typeText()
            }, 100);

            const video = videoRef.value;
            const canvas = canvasRef.value;
            const svgContainer = svgContainerRef.value;
            const svgRect = svgContainer.getBoundingClientRect();
            let isScanTime = null
            let isScan = false
            if (!video || !canvas) return;

            const context = canvas.getContext('2d', { willReadFrequently: true });

            try {
                if (navigator.mediaDevices && typeof navigator.mediaDevices.getUserMedia === 'function') {

                    const stream = await navigator.mediaDevices.getUserMedia({
                        video: {
                            facingMode: 'environment'
                        }
                    });
                    video.srcObject = stream;

                }


                video.addEventListener('loadedmetadata', () => {
                    canvas.width = video.videoWidth;
                    canvas.height = video.videoHeight;
                    video.mute = true;
                    video.play().catch(error => console.error('Play error:', error));
                });


                const colors = new tracking.ColorTracker(['yellow']);

                tracking.track(video, colors, { camera: true });

                colors.on('track', event => {
                    context.clearRect(0, 0, canvas.width, canvas.height);
                    let isScan = false
                    event.data.forEach(rect => {
                        if (
                            rect.x > svgRect.left &&
                            rect.y > svgRect.top &&
                            rect.x + rect.width < svgRect.right &&
                            rect.y + rect.height < svgRect.bottom
                        ) {
                            context.strokeStyle = '#a64ceb';
                            context.strokeRect(rect.x, rect.y, rect.width, rect.height);
                            context.font = '11px Helvetica';
                            context.fillStyle = "#fff";
                            context.fillText('x: ' + rect.x + 'px', rect.x + rect.width + 5, rect.y + 11);
                            context.fillText('y: ' + rect.y + 'px', rect.x + rect.width + 5, rect.y + 22);

                            isScan = true
                            scanning.value = true
                            playAudio();

                        }

                    });
                    if (isScan) {
                        if (isScanTime === null) {
                            isScanTime = Date.now();

                        } else if (Date.now() - isScanTime >= 1500) {

                            if (!isBlue.value) {
                                playAudio2();
                                isBlue.value = true;
                                isScanTime = null;
                                return;
                            }
                            if (isBlue.value && !isGreen.value) {
                                playAudio2();
                                isGreen.value = true;
                                isScanTime = null;
                                return;
                            }
                            if (isGreen.value && isBlue.value && !isRed.value) {
                                playAudio2();
                                isRed.value = true;
                                isScanTime = null;
                                finishModal.value = true
                                return;
                            }

                        }
                    } else {
                        isScanTime = null;
                        scanning.value = false
                        stopAudio();
                    }
                });

            } catch (err) {
                console.error('Error accessing the camera', err);
            }

        });

        return {
            videoRef,
            canvasRef,
            svgContainerRef,
            characterContent: currentCharacterContent,
            isBlue,
            isGreen,
            isRed,
            finishModal,
            nextPage,
            scanning
        }
    }
};
</script>

<style scoped>
.main {
    position: relative;
    width: 100vw;
    height: calc(100 * var(--vh));
    overflow: hidden;
}

.video,
.canvas {
    position: absolute;
    width: 100%;
    height: calc(100 * var(--vh));
    object-fit: cover;
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
    max-width: 30ch;
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
    top: calc(15 * var(--vh));
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

.image-container2 {
    position: absolute;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}

.image-container2 svg,
.image-container2 img {
    position: absolute;
    top: calc(50 * var(--vh));
    left: 50%;
    transform: translate(-50%, -50%);
}

.image-container2 img {
    width: auto;
    height: calc(20 * var(--vh));
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
</style>

