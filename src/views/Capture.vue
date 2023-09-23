<template>
    <div class="main">
        <div v-show="showOverlay" @click="showOverlay = false" class="overlay">
            <div class="bottom-section3">
                <button>프레임</button>
                <button><svg xmlns="http://www.w3.org/2000/svg" width="70" height="70" viewBox="0 0 70 70" fill="none">
                        <circle cx="35" cy="35" r="28" fill="#D50F4A" />
                        <circle cx="35" cy="35" r="33.5" stroke="white" stroke-opacity="0.8" stroke-width="3" />
                        <circle cx="35" cy="35" r="10.5" stroke="white" stroke-width="3" />
                    </svg></button>
                <button>스티커</button>
            </div>
        </div>
        <div class="top-section">
            <button>홈버튼</button>
            <button onclick="switchCamera()"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                    viewBox="0 0 24 24" fill="none">
                    <path
                        d="M12 24C9.44 24 7.135 23.27 5.085 21.81C3.035 20.35 1.58 18.44 0.72 16.08C0.62 15.78 0.65 15.5 0.81 15.24C0.97 14.98 1.21 14.8 1.53 14.7C1.85 14.6 2.155 14.635 2.445 14.805C2.735 14.975 2.94 15.21 3.06 15.51C3.78 17.33 4.95 18.8 6.57 19.92C8.19 21.04 10 21.6 12 21.6C13.72 21.6 15.32 21.175 16.8 20.325C18.28 19.475 19.44 18.3 20.28 16.8H18C17.66 16.8 17.375 16.685 17.145 16.455C16.915 16.225 16.8 15.94 16.8 15.6C16.8 15.26 16.915 14.975 17.145 14.745C17.375 14.515 17.66 14.4 18 14.4H22.8C23.14 14.4 23.425 14.515 23.655 14.745C23.885 14.975 24 15.26 24 15.6V20.4C24 20.74 23.885 21.025 23.655 21.255C23.425 21.485 23.14 21.6 22.8 21.6C22.46 21.6 22.175 21.485 21.945 21.255C21.715 21.025 21.6 20.74 21.6 20.4V19.2C20.46 20.72 19.05 21.9 17.37 22.74C15.69 23.58 13.9 24 12 24ZM12 2.4C10.28 2.4 8.68 2.825 7.2 3.675C5.72 4.525 4.56 5.7 3.72 7.2H6C6.34 7.2 6.625 7.315 6.855 7.545C7.085 7.775 7.2 8.06 7.2 8.4C7.2 8.74 7.085 9.025 6.855 9.255C6.625 9.485 6.34 9.6 6 9.6H1.2C0.86 9.6 0.575 9.485 0.345 9.255C0.115 9.025 0 8.74 0 8.4V3.6C0 3.26 0.115 2.975 0.345 2.745C0.575 2.515 0.86 2.4 1.2 2.4C1.54 2.4 1.825 2.515 2.055 2.745C2.285 2.975 2.4 3.26 2.4 3.6V4.8C3.54 3.28 4.95 2.1 6.63 1.26C8.31 0.42 10.1 0 12 0C14.56 0 16.865 0.73 18.915 2.19C20.965 3.65 22.42 5.56 23.28 7.92C23.38 8.22 23.35 8.5 23.19 8.76C23.03 9.02 22.79 9.2 22.47 9.3C22.15 9.4 21.845 9.365 21.555 9.195C21.265 9.025 21.06 8.79 20.94 8.49C20.22 6.67 19.05 5.2 17.43 4.08C15.81 2.96 14 2.4 12 2.4ZM12 15.6C11 15.6 10.15 15.25 9.45 14.55C8.75 13.85 8.4 13 8.4 12C8.4 11 8.75 10.15 9.45 9.45C10.15 8.75 11 8.4 12 8.4C13 8.4 13.85 8.75 14.55 9.45C15.25 10.15 15.6 11 15.6 12C15.6 13 15.25 13.85 14.55 14.55C13.85 15.25 13 15.6 12 15.6Z"
                        fill="white" />
                </svg></button>
            <button @click="back()">X</button>
        </div>
        <div class="webgl-container">
            <canvas class="webgl"></canvas>
        </div>

        <div class="bottom-section">
            <button @click="frameToggle()">프레임</button>
            <button onclick="captureImage()"><svg xmlns="http://www.w3.org/2000/svg" width="70" height="70"
                    viewBox="0 0 70 70" fill="none">
                    <circle cx="35" cy="35" r="28" fill="#D50F4A" />
                    <circle cx="35" cy="35" r="33.5" stroke="white" stroke-opacity="0.8" stroke-width="3" />
                    <circle cx="35" cy="35" r="10.5" stroke="white" stroke-width="3" />
                </svg></button>
            <button @click="stickerToggle()">스티커</button>
        </div>

        <div v-if="frameList">
            <div class="image-container">
                <img v-for="imageObj in FRAMES" :src="imageObj.src" :alt="imageObj.text" />
            </div>
        </div>

        <div v-if="stickerList">
            <div class="image-container">
                <img v-for="imageObj in STICKERS" :src="imageObj.src" :alt="imageObj.text" />
            </div>
        </div>

        <div v-if="showModal" class="modal">
            <p>뒤로 돌아갑니다.</p>
            <div class="modal-buttons">
                <button @click="closeModal">취소</button>
                <button @click="confirmBack">확인</button>
            </div>
        </div>
        <div class="frame">
            <img src="@resource/frame/spring.png" alt="봄" />
        </div>
    </div>
</template>

<script>
import { useCharacterStore } from '../stores/characterStore.js'
import { useImageDataStore } from '../stores/imageData.js'
import Experience from '../ar/capture/Experience.js'
import { onMounted, computed, ref } from 'vue';
import { onBeforeRouteLeave } from 'vue-router'
import router from '../router';

export default {
    name: 'capture',
    setup() {
        let experience;
        const showModal = ref(false);
        const eventName = ref('capture')
        const frameList = ref(false)
        const showOverlay = ref(true)
        const stickerList = ref(false)

        const enableFilp = ref(true)

        const characterStore = useCharacterStore()
        const imageDataStore = useImageDataStore()

        const currentCharacter = computed(() => characterStore.currentCharacter)

        const currentCharacterContent = computed(() => {
            return currentCharacter.value.common4[textIndex.value] || {}
        })

        const FRAMES = [
            // { src: new URL('@resource/frame/spring.png', import.meta.url).href, text: '봄' },
            // { src: new URL('@resource/frame/summer.png', import.meta.url).href, text: '여름' },
            // { src: new URL('@resource/frame/fall.png', import.meta.url).href, text: '가을' },
            // { src: new URL('@resource/frame/winter.png', import.meta.url).href, text: '겨울' },
        ];

        const STICKERS = [
            // { src: new URL('@resource/character/Bell_EntireBody.png', import.meta.url).href },
            // { src: new URL('@resource/character/Bell_Normal.png', import.meta.url).href },
            // { src: new URL('@resource/character/Bell_Happy.png', import.meta.url).href },
            // { src: new URL('@resource/character/Bell_Sad.png', import.meta.url).href },
            // { src: new URL('@resource/character/Bell_Welcome.png', import.meta.url).href },
            // { src: new URL('@resource/character/Uno_EntireBody.png', import.meta.url).href },
            // { src: new URL('@resource/character/Uno_Normal.png', import.meta.url).href },
            // { src: new URL('@resource/character/Uno_Happy.png', import.meta.url).href },
            // { src: new URL('@resource/character/Uno_Sad.png', import.meta.url).href },
            // { src: new URL('@resource/character/Uno_Welcome.png', import.meta.url).href },
            // { src: new URL('@resource/character/Sorina_EntireBody.png', import.meta.url).href },
            // { src: new URL('@resource/character/Sorina_Normal.png', import.meta.url).href },
            // { src: new URL('@resource/character/Sorina_Happy.png', import.meta.url).href },
            // { src: new URL('@resource/character/Sorina_Sad.png', import.meta.url).href },
            // { src: new URL('@resource/character/Sorina_Welcome.png', import.meta.url).href },
        ]

        const stickerToggle = () => {
            stickerList.value = !stickerList.value
            frameList.value = false
        }

        const frameToggle = () => {
            stickerList.value = false
            frameList.value = !frameList.value
        }

        const saveImage = (image) => {
            imageDataStore.setImageData(image)
            imageDataStore.setEventName(eventName.value)
            router.push({ path: '/capturepreview' });
        }

        const confirmBack = () => {
            showModal.value = false;
            router.go(-1);
        };

        const closeModal = () => {
            showModal.value = false;
        };


        const back = () => {
            showModal.value = true;
        };

        const setVH = () => {
            document.body.style.overflow = 'hidden';
            let vh = window.innerHeight * 0.01;

            document.documentElement.style.setProperty('--vh', `${vh}px`);
        }

        onMounted(() => {
            setVH();

            window.addEventListener('resize', setVH);

            experience = new Experience(document.querySelector('canvas.webgl'), saveImage);
        });

        onBeforeRouteLeave(() => {

            experience.dispose()

            experience.destroy()
            experience.init()
        });

        return {
            enableFilp,
            back,
            showModal,
            confirmBack,
            closeModal,
            frameList,
            showOverlay,
            FRAMES,
            stickerList,
            stickerToggle,
            frameToggle,
            STICKERS
        }
    }
}
</script>

<style scoped>
.main {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.webgl-container {
    height: calc(70 * var(--vh));
    width: calc((4/6) * 70 * var(--vh));
    top: calc(10 * var(--vh));
    position: absolute;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;

}

.webgl {
    position: relative;
    outline: none;
}

.top-section {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    width: 100%;
    height: calc(10 * var(--vh));
    justify-content: space-between;
    align-items: center;
    z-index: 1;
    background: var(--Main-Pink, #F0D7CA);
}

.top-section button {
    background-color: rgba(0, 0, 0, 0);
    border: none;
    width: 100%;
    height: 100%;

}

.top-section button svg {
    width: auto;
    height: calc(5* var(--vh));

}

.bottom-section {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    width: 100%;
    height: calc(20 * var(--vh));
    justify-content: space-between;
    align-items: center;
    z-index: 2;
    background: var(--Main-Pink, #F0D7CA);
    position: absolute;
    bottom: 0;
}


.bottom-section button {
    background-color: rgba(0, 0, 0, 0);
    border: none;
    width: 100%;
    height: 100%;
}

.bottom-section button svg {
    width: auto;
    height: calc(10* var(--vh));

}



.image-container {
    overflow-x: scroll;
    display: flex;
    flex-direction: row;
    justify-content: left;
    align-items: center;
    width: 100%;
    height: calc(10 * var(--vh));
    position: absolute;
    z-index: 2;
    top: calc(70 * var(--vh));
    margin-left: 5%;

}

.image-container img {
    width: auto;
    height: 100%;
    margin-right: 5%;
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

.overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    z-index: 3;
}


.bottom-section3 {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    width: 100%;
    height: calc(20 * var(--vh));
    justify-content: space-between;
    align-items: center;
    z-index: 2;
    background: rgba(0, 0, 0, 0.5);
    position: absolute;
    bottom: 0;
}


.bottom-section3 button {
    background-color: rgba(0, 0, 0, 0);
    border: none;
    width: 100%;
    height: 100%;
}

.bottom-section3 button svg {
    width: auto;
    height: calc(10* var(--vh));

}

.frame {
    position: absolute;
    top: calc(10* var(--vh));
    width: 100%;
    height: auto;
}

.frame img {
    width: 100%;
    height: 100%;
}
</style>