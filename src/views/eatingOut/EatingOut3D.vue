<template>
    <div>
        <loading-container ref="loading" @closed="handleClose(), resetInactivityTimeout()">
        </loading-container>
        <div v-if="showOverlay" class="overlay" @touchstart="hideOverlay"><svg :class="{ 'dragging-guide': showOverlay }"
                xmlns=" http://www.w3.org/2000/svg" width="66" height="74" viewBox="0 0 66 74" fill="none">
                <g clip-path="url(#clip0_112_660)">
                    <mask id="mask0_112_660" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="66"
                        height="74">
                        <path d="M66 0H0V74H66V0Z" fill="white" />
                    </mask>
                    <g mask="url(#mask0_112_660)">
                        <path
                            d="M65.2022 45.0147L60.8288 31.3286C59.2564 26.4107 52.7865 25.1831 49.5078 29.1876C48.941 28.8022 48.3256 28.5035 47.6307 28.3011C47.9083 26.8423 48.05 25.3546 48.05 23.8554C48.0519 10.703 37.2765 0 24.0299 0C10.7833 0 0.0078125 10.703 0.0078125 23.8573C0.0078125 34.5256 7.15911 43.8334 17.3522 46.7722C16.7136 48.8593 16.7252 51.087 17.4143 53.2068L18.8935 57.7566C20.8677 63.8558 25.8604 68.4115 32.076 69.876C33.9881 73.2581 38.1422 74.8595 41.8906 73.5356L58.938 67.5134C63.03 66.0681 65.1343 61.7784 64.0705 57.8337C66.1476 53.8928 66.5649 49.2774 65.2022 45.0109V45.0147ZM4.37546 23.8573C4.37546 13.0926 13.1923 4.33594 24.0299 4.33594C34.8675 4.33594 43.6843 13.0926 43.6843 23.8573C43.6843 25.4741 43.4824 27.0755 43.0883 28.6287C42.176 29.0411 41.3956 29.6424 40.7803 30.3728C40.0174 29.8332 39.1827 29.4786 38.313 29.2955C38.9711 27.5881 39.3186 25.7535 39.3186 23.8573C39.3186 15.486 32.4623 8.67573 24.0318 8.67573C15.6013 8.67573 8.74311 15.486 8.74311 23.8573C8.74311 31.5406 14.5065 37.898 21.9625 38.9001L22.4614 40.4591C21.3394 41.0777 20.3436 41.889 19.5108 42.8564C10.7678 40.8002 4.37546 32.9936 4.37546 23.8573ZM17.7715 25.7805L20.427 34.0959C16.205 32.6294 13.1108 28.621 13.1108 23.8592C13.1108 17.8795 18.0083 13.0136 24.0299 13.0136C30.0514 13.0136 34.949 17.8795 34.949 23.8592C34.949 26.164 34.2308 28.3474 32.9166 30.1608L30.261 21.8473C29.1662 18.4191 25.4858 16.5267 22.0343 17.6135C18.5926 18.6985 16.6786 22.3619 17.7715 25.7824V25.7805ZM59.6466 58.3559C60.0212 59.3715 60.1629 60.3466 59.6194 61.4971C59.1904 62.4067 58.4275 63.0946 57.4744 63.4299L40.427 69.4521C38.4955 70.1343 36.3466 69.136 35.6381 67.2244C35.3683 66.4959 34.7277 65.9679 33.959 65.8369C28.8246 64.962 24.6452 61.3583 23.0515 56.4308L21.5723 51.879C20.6891 49.1618 21.7179 46.3309 23.8299 44.7411L26.3593 52.6556C26.7242 53.7965 27.951 54.4285 29.1022 54.0662C30.2513 53.704 30.8881 52.486 30.5231 51.3452L21.9353 24.4701C21.5704 23.3312 22.209 22.1075 23.3563 21.7452C24.5055 21.3829 25.7323 22.0131 26.0972 23.1578L31.2083 39.1545C31.5733 40.2953 32.8001 40.9274 33.9493 40.5651C35.0985 40.2028 35.7352 38.9849 35.3702 37.8441L34.883 36.3217C34.518 35.1808 35.1567 33.9591 36.3039 33.5968C37.4551 33.2345 38.6819 33.8646 39.0449 35.0074C39.5224 36.5009 39.6311 36.7687 39.9883 37.8903C40.3532 39.0311 41.58 39.6632 42.7292 39.3009C43.8803 38.9386 44.5151 37.7207 44.1502 36.5799L43.7115 35.2059C43.3465 34.0651 43.9852 32.8433 45.1324 32.481C46.2835 32.1187 47.5084 32.7508 47.8733 33.8916C48.7488 36.6319 48.0519 34.3792 48.7779 36.6473C49.1429 37.7882 50.3697 38.4203 51.5189 38.058C52.668 37.6957 53.3048 36.4778 52.9398 35.3369L52.4972 33.9533C52.1323 32.8124 52.7709 31.5907 53.9182 31.2284C55.0673 30.8661 56.2942 31.4962 56.661 32.639L61.0326 46.3252C62.1196 49.7265 61.677 53.4303 59.8193 56.4867C59.4777 57.0494 59.4117 57.7373 59.6388 58.354L59.6466 58.3559Z"
                            fill="white" />
                    </g>
                </g>
                <defs>
                    <clipPath id="clip0_112_660">
                        <rect width="66" height="74" fill="white" />
                    </clipPath>
                </defs>
            </svg> </div>
        <div class="top-section">
            <div class="text-container1">
                <p id="typed-text"></p>
            </div>
            <div class="side-image-container">
                <img :src="characterContent.src" alt="Side Image" />
            </div>
        </div>
        <div class="webgl-container">
            <canvas class="webgl"></canvas>
        </div>
        <div v-show="finishModal" class="image-container2">
            <div class="reward-container">
                <img src="@resource/common/success.png" />
                <img src="@resource/eatingout/seed.png" />
                <p>신비의 씨앗 획득</p>
            </div>
        </div>
    </div>
</template>

<script>
import Experience from '../../three/EatingOut/Experience.js'
import { onMounted, ref, computed } from 'vue';
import router from '../../router';
import { useCharacterStore } from '../../stores/characterStore.js'
import { onBeforeRouteLeave } from 'vue-router'
import LoadingContainer from '../../components/LoadingContainer.vue'


export default {
    name: 'EatingOut3d',
    components: {
        LoadingContainer,

    },
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

        import('@resource/sounds/water.wav')
            .then(src => {
                audio3.value = new Audio(src.default);
            })
            .catch(error => {
                console.error("Error importing audio file:", error);
            });

        const playAudio3 = () => {
            if (audio3.value) {
                audio3.value.play();
            } else {
                console.error("Audio not initialized yet.");
            }
        };

        let experience;
        const characterStore = useCharacterStore()
        const index = ref(0)
        const textIndex = ref(5)
        const count = ref(0)
        const showOverlay = ref(false)
        const finishModal = ref(false)


        const currentCharacter = computed(() => characterStore.currentCharacter)

        const currentCharacterContent = computed(() => {
            return currentCharacter.value.eatingOut[textIndex.value] || {}
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

        const handleClose = () => {
            setTimeout(() => {
                typeText()
            }, 1000);
        }

        const hideOverlay = () => {
            showOverlay.value = false
        }

        let inactivityTimeout;


        const resetInactivityTimeout = () => {

            clearTimeout(inactivityTimeout);

            inactivityTimeout = setTimeout(() => {
                showOverlay.value = true;
            }, 7000);
        }

        const next = () => {
            if (count.value < 2) {
                playAudio3()
                count.value++

            } else {

                playAudio()
                finishModal.value = true
                playAudio2()
                setTimeout(() => {

                    router.push({ path: '/stickerreward', query: { eventName: "eatingOut" } });
                }, 1500);

            }
        }

        const setVH = () => {
            let vh = window.innerHeight * 0.01;
            document.documentElement.style.setProperty('--vh', `${vh}px`);
        }

        onMounted(() => {
            setVH();

            window.addEventListener('resize', setVH);

            experience = new Experience(document.querySelector('canvas.webgl'), next);

            resetInactivityTimeout();
            document.addEventListener('touchstart', resetInactivityTimeout);
            document.addEventListener('mousedown', resetInactivityTimeout);

        });

        onBeforeRouteLeave(() => {
            experience.destroy()
            experience.init()

            document.removeEventListener('touchstart', resetInactivityTimeout);
            document.removeEventListener('mousedown', resetInactivityTimeout);
        });

        return {
            index,
            characterContent: currentCharacterContent,
            next,
            hideOverlay,
            showOverlay,
            handleClose,
            resetInactivityTimeout,
            finishModal,
        }
    }
}
</script>

<style scoped>
.webgl-container {
    height: calc(100 * var(--vh));
    width: 100%;
    position: relative;
    overflow: hidden;
}

.webgl {
    position: fixed;
    left: 0;
    outline: none;
}

.top-section {
    overflow: visible;
    position: absolute;
    display: flex;
    flex-direction: row;
    width: 100%;
    height: calc(10 * var(--vh));
    justify-content: space-between;
    align-items: center;
    z-index: 1;
    margin-top: calc(2.5 * var(--vh));
}


.text-container1 {
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

.text-container1::before {
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

.text-container1 p {
    overflow: hidden;
    padding: 15px;
    color: #000;
    font-family: "NanumSquare", sans-serif;
    font-size: 12px;
    font-style: normal;
    font-weight: 700;
    line-height: 20px;
    letter-spacing: -0.4px;
    margin: 0;
    border-radius: 10px;
    overflow-wrap: break-word;
    word-break: keep-all;
    text-align: center;
}

.side-image-container {
    width: 20%;
    display: flex;
    align-items: center;
}

.side-image-container img {
    height: 100%;
    width: 100%;
    display: block;
}

.overlay {
    position: fixed;

    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0);
    z-index: 1000;
}

.overlay svg {
    position: absolute;
    left: 50%;
    top: calc(22.5 * var(--vh));
}

@keyframes dragDropGuide {

    0% {
        transform: translateY(0) translateX(-50%);
        opacity: 1;
    }

    20% {
        transform: translateY(300px) translateX(-50%);
        opacity: 1;
    }

    80% {
        transform: translateY(300px) translateX(-50%);
        opacity: 1;
    }

    100% {
        transform: translateY(300px) translateX(-50%);
        opacity: 0;
    }
}

.dragging-guide {
    animation: dragDropGuide 2s infinite;
}


.image-container2 {
    position: fixed;
    width: 100%;
    height: calc(100 * var(--vh));
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    top: calc(25 * var(--vh));
    z-index: 10;
}

.reward-container {
    position: relative;
    width: 100%;
    height: calc(100 * var(--vh));
    justify-content: center;
    display: flex;
}


.reward-container img:first-child {
    position: absolute;
    width: 80%;
    height: auto;
    left: 50%;
    transform: translateX(-50%);
}

.reward-container img:nth-child(2) {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    width: 70%;
    height: auto;
    top: calc(10 * var(--vh));
}

.reward-container p {
    position: absolute;
    top: calc(10 * var(--vh));
    color: var(--Text-Black, #111);
    text-align: center;
    font-family: "NanumSquare", sans-serif;
    font-size: 18px;
    font-style: normal;
    font-weight: 800;
    line-height: 28px;
    letter-spacing: -0.5px;
    max-width: 11ch;
    overflow-wrap: break-word;
    word-break: keep-all;

}
</style>